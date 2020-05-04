import { default as mongoose, Schema, Document, PaginateModel } from 'mongoose';
import { default as mongoosePaginate } from 'mongoose-paginate';
import { default as slug } from 'slug';
import { ICategory } from './category.model';

interface IPost extends Document {
  title: string;
  slug: string;
  synopsis: string;
  body: string;
  imageUrl: string;
  _createdAt: number;
  _modifiedAt: number;
  _deletedAt: number;

  _categoryId: ICategory['_id'];

  slugify(): void;
}

interface IPostModel extends PaginateModel<IPost> {}

const postSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
      max: 128,
    },
    slug: {
      type: String,
      required: true,
      lowercase: true,
    },
    synopsis: {
      type: String,
      required: true,
      max: 512,
    },
    body: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: false,
    },
    _createdAt: { type: Number, required: true, default: Date.now() },
    _modifiedAt: { type: Number, required: false, default: null },
    _deletedAt: { type: Number, required: false, default: null },
    _categoryId: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

postSchema.methods.slugify = function() {
  this.slug = slug(this.title);
};

postSchema.pre<IPost>('validate', function(next) {
  if (!this.slug) {
    this.slugify();
  }
  return next();
});

postSchema.virtual('id').get(function(this: IPost) {
  return this._id;
});
postSchema.virtual('category', {
  ref: 'Category',
  localField: '_categoryId',
  foreignField: '_id',
  justOne: true,
});

postSchema.plugin(mongoosePaginate);
const Post = mongoose.model<IPost, IPostModel>('Post', postSchema);

export { IPost, Post, postSchema };
