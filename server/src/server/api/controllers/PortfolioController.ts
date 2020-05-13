import { NextFunction, Request, Response } from 'express';
import { IPortfolio, Portfolio } from '../../models/mongoose';
import { NotFoundError } from '../../utilities';

class PortfolioController {
    public index = async (
        req: Request,
        res: Response,
        next: NextFunction,
      ): Promise<Response<any>> => {
        const portfolios : Array<IPortfolio> = await Portfolio.find().exec();
        return res.status(200).json(portfolios);
      };
    
    public show = async (
        req: Request,
        res: Response,
        next: NextFunction,
      ): Promise<Response<any>> => {
        const { id } = req.params;
        const portfolio : IPortfolio = await Portfolio.findById(id).exec();
        return res.status(200).json(portfolio);
      };

    
    public showPortfolioFromMemberID = async (
      req: Request,
      res: Response,
      next: NextFunction,
    ) => {
      try {
        const { id } = req.params;
        const portfolio = await Portfolio.find( { "referredMember" : id } );
        return res.status(200).json(portfolio);
      } catch (err) {
        next(err);
      }
    };


    
    update = async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
  
      try {
        const portfolioUpdate = {
          referredValues : req.body.referredValues,
          totalWorth: req.body.totalWorth,
          totalItems: req.body.totalItems,
        };

        // TO DO eventueel berekeningen in backend doen
        const portfolio = await Portfolio.findOneAndUpdate({ _id: id }, portfolioUpdate, {
          new: true,
        }).exec();
  
        if (!portfolio) {
          throw new NotFoundError();
        }
        return res.status(200).json(portfolio);
      } catch (err) {
        next(err);
      }
    };
}

export default PortfolioController;
