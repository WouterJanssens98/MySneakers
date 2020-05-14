import { default as mongoose, Document, Schema } from 'mongoose';
import { IValue } from './value.model';
import { IMember } from './member.model';

interface IPortfolio extends Document {
  referredValues : Array<IValue['_id']>;
  referredMember : IMember['_id'] ;
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
      ref: 'Values',
      required: false,
    }],
    referredMember: {
      type: Schema.Types.ObjectId,
      ref: 'Member',
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
  ref: 'Values',
  localField: 'referredValues',
  foreignField: '_id',
  justOne: false,
});

portfolioSchema.virtual('member', {
  ref: 'Member',
  localField: 'referredMember',
  foreignField: '_id',
  justOne: true,
});

const Portfolio = mongoose.model<IPortfolio>('Portfolio', portfolioSchema);

export { IPortfolio, Portfolio, portfolioSchema };
