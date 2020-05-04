import { NextFunction, Request, Response } from 'express';
import { IShoe, Shoe } from '../../models/mongoose'

class ShoeController {
    public index = async (
        req: Request,
        res: Response,
        next: NextFunction,
      ): Promise<Response<any>> => {
        const shoes: Array<IShoe> = await Shoe.find().exec();
        return res.status(200).json(shoes);
      };
    
    public show = async (
        req: Request,
        res: Response,
        next: NextFunction,
      ): Promise<Response<any>> => {
        const { id } = req.params;
        const shoes: IShoe = await Shoe.findById(id).exec();
        return res.status(200).json(shoes);
      };
}

export default ShoeController;
