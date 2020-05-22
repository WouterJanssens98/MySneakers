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
        const portfolio : IPortfolio = await Portfolio.findById(id)
        .populate({
          path : 'values',
          populate : {
            path : 'shoe'
          }
        })
        .exec();
        return res.status(200).json(portfolio);
      };  


    
    public showPortfolioFromUserID = async (
      req: Request,
      res: Response,
      next: NextFunction,
    ) => {
      try {
        const { id } = req.params;
        const portfolio = await Portfolio.find( { "referredUser" : id } )
        .populate({
          path : 'values',
          populate : {
            path : 'shoe'
          }
        })
        .exec();
        return res.status(200).json(portfolio);
      } catch (err) {
        next(err);
      }
    };

    
    public update = async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
  
      try {
        const portfolioUpdate = {
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

    

    store = async (req: Request, res: Response, next: NextFunction) => {
      console.log(req.body);
      const { id } = req.params;
      try {
        const portfolioCreate = new Portfolio({
          referredUser: id
        });
        const portfolio = await portfolioCreate.save();
        return res.status(201).json(portfolio);
      } catch (err) {
        console.log(err);
        next(err);
      }
    };

    
    add = async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      const user = req.body.referredUser;
      const portfolio = await Portfolio.update( 
        { "referredUser" : user }, 
        {$push : {
          referredValues : id
        }} );
        return res.status(201).json(portfolio);
    };



}

export default PortfolioController;
