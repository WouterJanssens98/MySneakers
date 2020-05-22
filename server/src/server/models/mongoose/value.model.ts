import { default as mongoose, Document, Schema } from 'mongoose';
import { IShoe } from './shoe.model';

interface IValue extends Document {
  referredShoe : IShoe['_id'] ;
  shoeSize : string;
  stockxValue : number;
  _createdAt: number;
  _modifiedAt: number;
  _deletedAt: number;
}

const valueSchema: Schema = new Schema(
  {
    referredShoe: {
      type: Schema.Types.ObjectId,
      ref: 'Shoe',
      required: true,
      unique : false
    },
    shoeSize : { type : String, required : true, unique : false , max :128},
    stockxValue : { type : Number , required : false, unique: false, max : 9999},
    _createdAt: { type: Number, required: true, default: Date.now() },
    _modifiedAt: { type: Number, required: false, default: null },
    _deletedAt: { type: Number, required: false, default: null },
   
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

valueSchema.virtual('id').get(function(this: IValue) {
  return this._id;
});
valueSchema.virtual('shoe', {
  ref: 'Shoe',
  localField: 'referredShoe',
  foreignField: '_id',
  justOne: false,
});





const Value = mongoose.model<IValue>('Value', valueSchema);

export { IValue, Value, valueSchema };
