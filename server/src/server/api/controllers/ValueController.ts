import { NextFunction, Request, Response } from 'express';
import { IValue, Value } from '../../models/mongoose'

class ValueController {
 
    /*
    public index = async (
        req: Request,
        res: Response,
        next: NextFunction,
      ): Promise<Response<any>> => {
        const portfolios : Array<IPortfolio> = await Portfolio.find().exec();
        return res.status(200).json(portfolios);
      };
    */
    

    public show = async (
        req: Request,
        res: Response,
        next: NextFunction,
      ): Promise<Response<any>> => {
        const { id } = req.params;
        const value : IValue = await Value.findById(id).exec();
        return res.status(200).json(value);
      };

    
    public showValueFromShoeID = async (
      req: Request,
      res: Response,
      next: NextFunction,
    ) => {
      try {
        const { referredProduct } = req.params;
        const value = await Value.find()
          .where('referredProduct', referredProduct)
        return res.status(200).json(value);
      } catch (err) {
        next(err);
      }
    };
}

export default ValueController;
