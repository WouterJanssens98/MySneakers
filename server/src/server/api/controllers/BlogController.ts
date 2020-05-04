import { NextFunction, Request, Response } from 'express';
import { IBlog, Blog } from '../../models/mongoose';

class BlogController {
  index = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { limit, skip } = req.query;
      let blogs;

      if (limit && skip) {
        const options = {
          limit: parseInt(limit, 10) || 10,
          page: parseInt(skip, 10) || 1,
          sort: { _createdAt: -1 },
        };
        blogs = await Blog.paginate({}, options);
      } else {
        blogs = await Blog.find()
          .sort({ _createdAt: -1 })
          .exec();
      }

      return res.status(200).json(blogs);
    } catch (err) {
      next(err);
    }
  };

  show = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const blog = await Blog.findById(id)
        .populate('posts')
        .exec();
      return res.status(200).json(blog);
    } catch (err) {
      next(err);
    }
  };
}

export default BlogController;
