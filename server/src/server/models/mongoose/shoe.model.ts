import { default as mongoose, Document, Schema } from 'mongoose';

interface IShoe extends Document {
  shoeName: string;
  shoeBrand : string;
  productSku : string;
  _createdAt: number;
  _modifiedAt: number;
  _deletedAt: number;
}

const shoeSchema: Schema = new Schema(
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

const Shoe = mongoose.model<IShoe>('Shoe', shoeSchema);

export { IShoe, Shoe, shoeSchema };
