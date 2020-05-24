import { default as React } from 'react';
import { default as classnames } from 'classnames';
import { default as moment } from 'moment';
import * as Routes from '../../../routes';

const PostsTable = ({children, posts, onDelete, onEdit}) => {

  const handleDelete = (event, postId, deleteMode = 0) => {
    if (typeof onDelete === 'function') {
      onDelete(postId, deleteMode);
    }
  };

  const handleEdit = (event, postId) => {
    if (typeof onEdit === 'function') {
      onEdit(postId);
    }
  };

  return (
    <table className="table">
      <thead>
        <tr>
          <th></th>
          <th>Photo</th>
          <th>Name</th>
          <th>Product SKU</th>
          <th>Created</th>
        </tr>
      </thead>
      <tbody>
        {posts && posts.map(post => (
          <tr
            key={post._id}
          > 
          <td>

          </td>
            <td>
              <a href={Routes.POST_DETAIL.replace(':id', post._id)}><img width="40%" src={post.imageUrl}></img></a>
            </td>
            <td>
             {post.shoeName}
            </td>
            <td>{post.productSku}</td>
            <td>
              {moment(posts._createdAt).format('DD/MM/YYYY')}
            </td>
           
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PostsTable;