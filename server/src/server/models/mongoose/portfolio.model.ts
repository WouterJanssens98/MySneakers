import { default as mongoose, Document, Schema } from 'mongoose';
import { IValue } from './value.model';
import { IUser} from './user.model';

interface IPortfolio extends Document {
  referredValues : Array<IValue['_id']>;
  referredUser : IUser['_id'];
  totalWorth : number ;
  totalItems : number ; 
  _createdAt: number;
  _modifiedAt: number;
  _deletedAt: number;
}

const portfolioSchema: Schema = new Schema(
  {
    referredValues: [{
      type: Schema.Types.ObjectId,
      ref: 'Value',
      required: false,
    }],
    referredUser: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    totalWorth : { type : String, required : true, unique : false , default: '0 EUR', max :128},
    totalItems : { type : Number , required : true, unique: false, default: 0, max : 128},
    _createdAt: { type: Number, required: true, default: Date.now() },
    _modifiedAt: { type: Number, required: false, default: null },
    _deletedAt: { type: Number, required: false, default: null },
    
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);


portfolioSchema.virtual('id').get(function(this: IPortfolio) {
  return this._id;
});
portfolioSchema.virtual('values', {
  ref: 'Value',
  localField: 'referredValues',
  foreignField: '_id',
  justOne: false,
});


portfolioSchema.virtual('user', {
  ref: 'User',
  localField: 'referredUser',
  foreignField: '_id',
  justOne: true,
});


const Portfolio = mongoose.model<IPortfolio>('Portfolio', portfolioSchema);

export { IPortfolio, Portfolio, portfolioSchema };
