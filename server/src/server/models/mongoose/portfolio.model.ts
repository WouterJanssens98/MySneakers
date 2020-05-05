import { default as mongoose, Document, Schema } from 'mongoose';
import { IValue } from './value.model';
import { IUser } from './user.model';
import { IMember } from './member.model';

interface IPortfolio extends Document {
  referredProducts : Array<IValue['_id']>;
  referredProfile : IMember['_id'] ;
  totalWorth : number ;
  totalItems : number ; 
  _createdAt: number;
  _modifiedAt: number;
  _deletedAt: number;
}

const portfolioSchema: Schema = new Schema(
  {
    shoeName: { type: String, required: true, unique: true, max: 128 },
    shoeBrand : { type : String, required : true, unique : false , max :128},
    productSku : { type : String , required : true, unique: true, max : 128},
    _createdAt: { type: Number, required: true, default: Date.now() },
    _modifiedAt: { type: Number, required: false, default: null },
    _deletedAt: { type: Number, required: false, default: null },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

const Portfolio = mongoose.model<IPortfolio>('Portfolio', portfolioSchema);

export { IPortfolio, Portfolio, portfolioSchema };
