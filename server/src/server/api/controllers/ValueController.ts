import { NextFunction, Request, Response } from 'express';
import { IValue, Value } from '../../models/mongoose'
import { NotFoundError } from '../../utilities';

class ValueController {
 
    
    public index = async (
        req: Request,
        res: Response,
        next: NextFunction,
      ): Promise<Response<any>> => {
        const values : Array<IValue> = await Value.find().exec();
        return res.status(200).json(values);
      };
    
    /*
      
    public show = async (
      req: Request,
      res: Response,
      next: NextFunction,
    ): Promise<Response<any>> => {
      const { id } = req.params;
      const value : IValue = await Value.findById(id).exec();
      return res.status(200).json(value);
    };

    */

    public show = async (req: Request, res: Response, next: NextFunction) => {
        try {
          const { id } = req.params;
          const value = await Value.findById(id).exec();
          return res.status(200).json(value);
        } catch (err) {
          next(err);
        }
      };


    // show value(s) from specific shoe objectId
    public showValueFromShoeID = async (
      req: Request,
      res: Response,
      next: NextFunction,
    ) => {
      try {
        const { id } = req.params;
        const value = await Value.find()
          .where('referredShoe', id)
        return res.status(200).json(value);
      } catch (err) {
        next(err);
      }
    };

    store = async (req: Request, res: Response, next: NextFunction) => {
      console.log(req.body);
      try {
        const valueCreate = new Value({
          referredShoe : req.body.referredShoe,
          shoeSize: req.body.shoeSize,
          stockxValue: req.body.stockxValue,
        });
        const value = await valueCreate.save();
        return res.status(201).json(value);
      } catch (err) {
        console.log(err);
        next(err);
      }
    };
  
  
    update = async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
  
      try {
        const valueUpdate = {
          referredShoe : req.body.referredShoe,
          shoeSize: req.body.shoeSize,
          stockxValue: req.body.stockxValue,
        };
        const value = await Value.findOneAndUpdate({ _id: id }, valueUpdate, {
          new: true,
        }).exec();
  
        if (!value) {
          throw new NotFoundError();
        }
        return res.status(200).json(value);
      } catch (err) {
        next(err);
      }
    };
  
    destroy = async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
  
      try {
        let value = null;
  
        let { mode } = req.query;
  
        switch (mode) {
          case 'delete':
          default:
            value = await Value.findOneAndRemove({ _id: id });
            break;
          case 'softdelete':
            value = await Value.findByIdAndUpdate(
              { _id: id },
              { _deletedAt: Date.now() },
            );
            break;
          case 'softundelete':
            value = await Value.findByIdAndUpdate(
              { _id: id },
              { _deletedAt: null },
            );
            break;
        }
  
        if (!value) {
          throw new NotFoundError();
        } else {
          return res.status(200).json({
            message: `Successful ${mode} the value with id: ${id}!`,
            value,
            mode,
          });
        }
      } catch (err) {
        next(err);
      }
    };
  
}

export default ValueController;
