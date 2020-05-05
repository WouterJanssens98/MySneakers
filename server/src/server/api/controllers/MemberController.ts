import { NextFunction, Request, Response } from 'express';
import { IMember, Member } from '../../models/mongoose'

class MemberController {

    
    public index = async (
        req: Request,
        res: Response,
        next: NextFunction,
      ): Promise<Response<any>> => {
        const members : Array<IMember> = await Member.find().exec();
        return res.status(200).json(members);
      };
    
    public show = async (
        req: Request,
        res: Response,
        next: NextFunction,
      ): Promise<Response<any>> => {
        const { id } = req.params;
        const members : IMember = await Member.findById(id).exec();
        return res.status(200).json(members);
      };

}

export default MemberController;
