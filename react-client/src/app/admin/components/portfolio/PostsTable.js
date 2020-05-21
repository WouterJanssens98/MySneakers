import { default as React } from 'react';
import { default as classnames } from 'classnames';
import { default as moment } from 'moment';
import { useApi } from '../../../services/';

const PostsTable = ({children, posts, onDelete, onEdit}) => {

  const { getValueFromID, getShoeFromID } = useApi();

  // const { data, setData } = useState();

  

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

  const getValue = async (id) => {

  }
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Shoe</th>
          <th>Size</th>
          <th>Price</th>
          <th>Created</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>

     
        {posts && posts['values'].map(post => (
          
          <tr
            key={post._id}
          >
            <td>
            {post['shoe']['0']['shoeName']}
            </td>
            
            <td> {post['shoeSize']}</td>
            <td>
            € {post['stockxValue']}
            </td>
            <td className="d-flex justify-content-around">
              <a href="#" aria-label="edit" onClick={ev => handleEdit(ev, post.id)}><i className="fas fa-edit"></i></a>
              <a href="#" className={classnames(post._deletedAt === null ? 'soft-deleted' : 'soft-undeleted')} aria-label="delete" onClick={ev => handleDelete(ev, post.id, post._deletedAt === null ? 'softdelete' : 'softundelete', 'delete')}><i className="fas fa-trash-alt"></i></a>
              <a href="#" aria-label="delete-forever" onClick={ev => handleDelete(ev, post.id, 'delete')}><i className="fas fa-trash"></i></a>              
            </td>
          </tr>
        ))}


      </tbody>
    </table>
  );
};

export default PostsTable;