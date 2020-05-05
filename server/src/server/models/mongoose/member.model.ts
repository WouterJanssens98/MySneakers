import { default as mongoose, Document, Schema } from 'mongoose';

interface IMember extends Document {
    firstName: string;
    lastName: string;
    shoeSize : number ;
    email: string;
    _createdAt: number;
    _modifiedAt: number;
    _deletedAt: number;
}

const memberSchema: Schema = new Schema(
  {
    firstName: { type: String, required: true, unique: false, max: 128 },
    lastName: { type: String, required: true, unique: false, max: 128 },
    shoeSize : { type : Number, required : true, unique : false , max :128},
    email : { type : String , required : true, unique: true, max : 128},
    _createdAt: { type: Number, required: true, default: Date.now() },
    _modifiedAt: { type: Number, required: false, default: null },
    _deletedAt: { type: Number, required: false, default: null },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

const Member = mongoose.model<IMember>('Member', memberSchema);

export { IMember, Member, memberSchema };
