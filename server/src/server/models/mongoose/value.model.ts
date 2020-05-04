import { default as mongoose, Document, Schema } from 'mongoose';
import { IShoe } from './shoe.model';

interface IValue extends Document {
  referredProduct : IShoe['_id'] ;
  shoeSize : string;
  goatValue : number; 
  stockxValue : number;
  _createdAt: number;
  _modifiedAt: number;
  _deletedAt: number;
}

const valueSchema: Schema = new Schema(
  {
    referredProduct: { type: String, required: true, unique: true, max: 128 },
    shoeSize : { type : String, required : true, unique : false , max :128},
    goatValue : { type : Number , required : false, unique: false, max : 128},
    stockxValue : { type : Number , required : false, unique: false, max : 128},
    _createdAt: { type: Number, required: true, default: Date.now() },
    _modifiedAt: { type: Number, required: false, default: null },
    _deletedAt: { type: Number, required: false, default: null },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

const Value = mongoose.model<IValue>('Value', valueSchema);

export { IValue, Value, valueSchema };
