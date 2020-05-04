import { NextFunction, Request, Response } from 'express';
import { User, IUser } from '../../models/mongoose';

import { AuthService, IConfig } from '../../services';
import { NotFoundError } from '../../utilities';

class UserController {
  private authService: AuthService;
  private config: IConfig;

  constructor(config: IConfig, authService: AuthService) {
    this.config = config;
    this.authService = authService;
  }

  public index = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<any>> => {
    try {
      const { limit, skip } = req.query;
      let users = null;
      if (limit && skip) {
        const options = {
          page: parseInt(skip, 10) || 1,
          limit: parseInt(limit, 10) || 10,
          sort: { created_at: -1 },
        };
        users = await User.paginate({}, options);
      } else {
        users = await User.find()
          .sort({ created_at: -1 })
          .exec();
      }

      return res.status(200).json(users);
    } catch (err) {
      next(err);
    }
  };

  show = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const post = await User.findById(id).exec();
      return res.status(200).json(post);
    } catch (err) {
      next(err);
    }
  };

  destroy = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {
      let user = null;

      let { mode } = req.query;

      switch (mode) {
        case 'delete':
        default:
          user = await User.findOneAndRemove({ _id: id });
          break;
        case 'softdelete':
          user = await User.findByIdAndUpdate(
            { _id: id },
            { _deletedAt: Date.now() },
          );
          break;
        case 'softundelete':
          user = await User.findByIdAndUpdate(
            { _id: id },
            { _deletedAt: null },
          );
          break;
      }

      if (!user) {
        throw new NotFoundError();
      } else {
        return res.status(200).json({
          message: `Successful ${mode} the User with id: ${id}!`,
          user,
          mode,
        });
      }
    } catch (err) {
      next(err);
    }
  };

  signupLocal = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    const { email, password } = req.body;

    let foundUser = await User.findOne({ email: email });
    if (foundUser) {
      return res.status(403).json({ error: 'Email is already in use' });
    }

    const newUser: IUser = new User({
      email: email,
    });

    const user: IUser = await newUser.save();

    const token = this.authService.createToken(user);
    return res.status(200).json({
      email: user.email,
      token: `${token}`,
      strategy: 'local',
      role: user.role,
      avatar: user.profile.avatar,
    });
  };

  signInLocal = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    this.authService.passport.authenticate(
      'local',
      { session: this.config.auth.jwt.session },
      (err, user, info) => {
        if (err) {
          return next(err);
        }
        if (!user) {
          return next(new NotFoundError());
        }
        const token = this.authService.createToken(user);
        return res.status(200).json({
          email: user.email,
          token: `${token}`,
          strategy: 'local',
          role: user.role,
          avatar: user.profile.avatar,
        });
      },
    )(req, res, next);
  };
}

export default UserController;
