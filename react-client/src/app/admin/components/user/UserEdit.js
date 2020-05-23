import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { useApi } from '../../../services/';
import { useHistory } from 'react-router-dom';
import * as Routes from '../../../routes';


const UserEdit = ({className, children, viewModel, onSave = null, onUpdate = null}) => {
  let history = useHistory();
  const { updateUser } = useApi();
  const [postForm, setPostForm] = useState({
    email: '',
    role: '',
    id : ' '
  });

  

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (postForm) {
      console.log("updating...")
      const update = await updateUser(postForm.id, postForm.email, postForm.role);
      console.log(update);
      history.push(Routes.BACKOFFICE_USERS)
  }
}

  const handleInputChange = (ev) => {
    setPostForm({
      ...postForm,
      [ev.target.name]: ev.target.value,
      id : viewModel['id']
    });
  }

  const handleSelectChange = (ev) => {
    console.log(postForm)
    setPostForm({
      ...postForm,
      [ev.target.name]: ev.target.options[ev.target.selectedIndex].value,
      id : viewModel['id']
      
    });
  }
  

  return (
    <div className={classnames(className)}>
      <div className="card shadow mb-4">
        <div className="card-header py-3">
  <h6 className="m-0 font-weight-bold text-primary">{!!viewModel && !!viewModel.post ? <Fragment>Update the post: {viewModel.post.title}</Fragment> : <Fragment>Update user details</Fragment>}</h6>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="text" className="form-control" id="email" name="email" required value={postForm['email']} onChange={handleInputChange}/>
            </div>
            <div className="form-group">
              <label for="form-input-control-error-email" htmlFor="email">Role</label>
              <div>
              <select className="form-control" id="role" name="role" class="ui selection dropdown" value={postForm['role']} onChange={handleSelectChange}  id = "myList">
                          <option value=""  disabled hidden></option>
                          <option value = "user">user</option>
                          <option value = "admin">admin</option>
              </select>
              </div>
            </div>
            <button type="submit" className="btn btn-primary">{!!viewModel && !!viewModel.post ? 'Update' : 'Save'} post</button>
          </form>          
        </div>
      </div>
    </div>
  );
};

UserEdit.prototypes = {
  className: PropTypes.string,
  viewModel: PropTypes.object
};

export default UserEdit;