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
  ShoeController
} from '../controllers';

class ApiRouter {
  public router: Router;
  private blogController: BlogController;
  private helloController: HelloController;
  private messageController: MessageController;
  private postController: PostController;
  private userController: UserController;
  private shoeController : ShoeController;
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
    this.router.get('/users/:id', this.userController.show);
    this.router.delete('/users/:id', this.userController.destroy);
    this.router.post('/auth/signin/', this.userController.signInLocal);
    this.router.post('/auth/signup/', this.userController.signupLocal);

    /*
     * Shoe routes
     */
    this.router.get('/shoes',this.shoeController.index)
    this.router.get('/shoes/:id',this.shoeController.show)

  }
}

export default ApiRouter;
