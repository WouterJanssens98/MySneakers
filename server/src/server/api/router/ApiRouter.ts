import {
  default as express,
  Application,
  Request,
  Response,
  Router,
} from 'express';
import { IConfig, AuthService, Role } from '../../services';
import {
  BlogController,
  HelloController,
  MessageController,
  PostController,
  UserController,
  ShoeController,
  PortfolioController,
  ValueController,
  MemberController
} from '../controllers';
import { Value } from 'src/server/models/mongoose';

class ApiRouter {
  public router: Router;
  private blogController: BlogController;
  private helloController: HelloController;
  private messageController: MessageController;
  private postController: PostController;
  private userController: UserController;
  private shoeController : ShoeController;
  private portfolioController : PortfolioController;
  private valueController : ValueController ;
  private memberController: MemberController;
  private config: IConfig;
  private authService: AuthService;

  constructor(config: IConfig, authService: AuthService) {
    this.config = config;
    this.authService = authService;

    this.router = express.Router();

    this.registerControllers();
    this.registerRoutes();
  }

  private registerControllers(): void {
    this.blogController = new BlogController();
    this.helloController = new HelloController();
    this.messageController = new MessageController();
    this.postController = new PostController();
    this.userController = new UserController(this.config, this.authService);
    this.shoeController = new ShoeController();
    this.portfolioController = new PortfolioController();
    this.valueController = new ValueController();
    this.memberController = new MemberController();
  }

  private registerRoutes(): void {
    /*
     * Hello routes
     */
    this.router.get('/hello', this.helloController.index);
    /*
     * Message routes
     */
    this.router.get('/messages', this.messageController.index);
    this.router.get('/messages/:id', this.messageController.show);
    /*
     * Blog routes
     */
    this.router.get('/blogs', this.blogController.index);
    this.router.get('/blogs/:id', this.blogController.show);
    /*
     * Post routes
     */
    this.router.get('/posts', this.postController.index);
    this.router.get('/posts/create', this.postController.create); // Must be before the route /posts/:id
    this.router.get('/posts/:id', this.postController.show);
    this.router.post('/posts', this.postController.store);
    this.router.get('/posts/:id/edit', this.postController.edit);
    this.router.put('/posts/:id', this.postController.update);
    this.router.delete('/posts/:id', this.postController.destroy);
    /*
     * Users routes
     */
    this.router.get('/users', this.userController.index);
    this.router.put('/users/:id', this.userController.update);
    this.router.get('/users/:id', this.userController.show);
    this.router.delete('/users/:id', this.userController.destroy);
    this.router.post('/auth/signin/', this.userController.signInLocal);
    this.router.post('/auth/signup/', this.userController.signupLocal);


    /// PROJECT ROUTES ///



    /*
     * Shoe routes
     */
    this.router.get('/shoes',this.shoeController.index)
    this.router.get('/shoes/:id',this.shoeController.show)
    this.router.get('/shoes/model/:id', this.shoeController.detail)
    
    

    /*
     * Portfolio routes
     */
    this.router.get('/portfolio/user/:id', this.portfolioController.showPortfolioFromUserID)
    this.router.get('/portfolio', this.portfolioController.index)
    this.router.get('/portfolio/:id', this.portfolioController.show)
    this.router.post('/portfolio/:id', this.portfolioController.store)
    this.router.post('/portfolio/add/:id', this.portfolioController.add)
    this.router.post('/portfolio/remove/:id', this.portfolioController.remove)
    this.router.put('/portfolio/:id' , this.portfolioController.update)
    

    /*
     * Value routes
     */

    this.router.get('/values', this.valueController.index)
    this.router.get('/values/:id', this.valueController.show)
    this.router.get('/values/shoe/:id', this.valueController.showValueFromShoeID)
    this.router.post('/values', this.valueController.store);
    this.router.put('/values/:id', this.valueController.update);
    this.router.delete('/values/:id', this.valueController.destroy);

    /*
     * Member routes
     */

    this.router.get('/member', this.memberController.index)
    this.router.get('/member/:id', this.memberController.show)

  }
}

export default ApiRouter;
