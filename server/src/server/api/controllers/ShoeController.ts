import { NextFunction, Request, Response } from 'express';
import { IShoe, Shoe } from '../../models/mongoose'

class ShoeController {


    // show all shoes
    public index = async (
        req: Request,
        res: Response,
        next: NextFunction,
      ): Promise<Response<any>> => {
        const shoes: Array<IShoe> = await Shoe.find().exec();
        return res.status(200).json(shoes);
      };
    

    // show shoes from a specific brand
    public show = async (
        req: Request,
        res: Response,
        next: NextFunction,
      ): Promise<Response<any>> => {
        const { brand } = req.params;
        const shoesFromBrand: Array<IShoe> = await Shoe.find( {shoeBrand : brand}).exec();
        return res.status(200).json(shoesFromBrand);
      };



    // show a specific shoe
    public detail = async (
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
