import { default as React } from 'react';
import { default as classnames } from 'classnames';
import { default as moment } from 'moment';

const UserTable = ({children, posts, onDelete, onEdit}) => {

  const handleDelete = (event, userId, deleteMode = 0) => {
    if (typeof onDelete === 'function') {
      onDelete(userId, deleteMode);
    }
  };

  const handleEdit = (userId) => {
    if (typeof onEdit === 'function') {
      onEdit(userId);
    }
  };

  return (
    <table className="table">
      <thead>
        <tr>
          <th></th>
          <th>Unique User ID</th>
          <th>Email</th>
          <th>Role</th>
          <th>Created</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {posts && posts.map(post => (
          <tr
            key={post._id}
          >
            <td></td>
            <td>{post.id}</td>
            <td>{post.email}</td>
            <td>{post.role}</td>
            <td>
              {moment(posts._createdAt).format('DD/MM/YYYY')}
            </td>
            <td className="d-flex justify-content-around">
              <a href="#" aria-label="edit" onClick={ev => handleEdit(post.id)}><i className="fas fa-edit"></i></a>
              <a href="#" aria-label="delete-forever" onClick={ev => handleDelete(ev, post.id, 'delete')}><i className="fas fa-trash"></i></a>              
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;