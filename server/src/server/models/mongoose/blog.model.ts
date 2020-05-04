import { default as mongoose, Schema, Document, PaginateModel } from 'mongoose';
import { default as mongoosePaginate } from 'mongoose-paginate';
import { default as slug } from 'slug';
import { IPost } from './post.model';

interface IBlog extends Document {
  title: string;
  slug: string;
  synopsis: string;
  _createdAt: number;
  _modifiedAt: number;
  _deletedAt: number;

  _postIds: Array<IPost['_id']>;

  slugify(): void;
}

interface IBlogModel extends PaginateModel<IBlog> {}

const blogSchema: Schema = new Schema(
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
    _createdAt: { type: Number, required: true, default: Date.now() },
    _modifiedAt: { type: Number, required: false, default: null },
    _deletedAt: { type: Number, required: false, default: null },
    _postIds: [{ type: Schema.Types.ObjectId, ref: 'Post', required: false }],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

blogSchema.methods.slugify = function() {
  this.slug = slug(this.title);
};

blogSchema.pre<IBlog>('validate', function(next) {
  if (!this.slug) {
    this.slugify();
  }
  return next();
});

blogSchema.virtual('id').get(function(this: IBlog) {
  return this._id;
});
blogSchema.virtual('posts', {
  ref: 'Post',
  localField: '_postIds',
  foreignField: '_id',
  justOne: false,
});

blogSchema.plugin(mongoosePaginate);
const Blog = mongoose.model<IBlog, IBlogModel>('Blog', blogSchema);

export { IBlog, Blog, blogSchema };
