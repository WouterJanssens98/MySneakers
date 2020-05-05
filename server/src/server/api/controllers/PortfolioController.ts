import { NextFunction, Request, Response } from 'express';
import { IPortfolio, Portfolio } from '../../models/mongoose'

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
        const portfolios : IPortfolio = await Portfolio.findById(id).exec();
        return res.status(200).json(portfolios);
      };

    
    public showPortfolioFromMemberID = async (
      req: Request,
      res: Response,
      next: NextFunction,
    ) => {
      try {
        const { referredProfile } = req.params;
        const portfolio = await Portfolio.find()
          .where('referredProfile', referredProfile)
        return res.status(200).json(portfolio);
      } catch (err) {
        next(err);
      }
    };
}

export default PortfolioController;
