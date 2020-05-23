import { default as React } from 'react';
import { useState, useEffect } from 'react';
import { default as classnames } from 'classnames';
import { default as moment } from 'moment';
import { useApi } from '../../../services/';
import { apiConfig } from '../../../config';
import * as Routes from '../../../routes';
import { useHistory, Link } from 'react-router-dom';




const PostsTable = ({children, posts, onDelete, onEdit}) => {

  const { updatePortfolio } = useApi();
  const [worth, setWorth] = useState(null);
  const [items, setItems] = useState(null);
  const [highest, setHighest] = useState(null)
  /*
  useEffect( () => {
    if(worth !== null){
      console.log("Worth is not null!")
      
    }else {
      console.log("Worth is null!")
    }
  }, [worth, items])
  */

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

  
  const setValue = async () => {
    const table = document.getElementsByClassName("table");
    const amount = document.querySelectorAll('.test').length
    let sumVal = 0;
    const test = table[0]
    const highestPrice = []
    for(var i = 1; i < amount; i++)
            {
                sumVal = sumVal + parseInt(test.rows[i].cells[2].innerHTML);
                highestPrice.push(parseInt(test.rows[i].cells[2].innerHTML))
            }
            
    const data = {
      totalItems : amount,
      totalWorth : sumVal
    };
    setHighest(Math.max(...highestPrice))
    setWorth(sumVal)
    setItems(amount)

    var x = document.getElementById("statistics");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }

    const response = await updatePortfolio(posts.id, String(sumVal),amount)
  }


  return (
    <div>
    <div style = {{display: "none"}} id="statistics">
          <div class="ui statistics">
        <div class="ui teal statistic">
          <div class="value">
            {items}
            </div>
          <div class="label">Shoes</div>
        </div>
        <div class="ui yellow statistic">
          <div class="value">
          € {worth}
          </div>
          <div class="label">Total Portfolio Value</div>
        </div>
        <div class="ui orange statistic">
          <div class="value">
          € {highest ? highest : 0}
          </div>
          <div class="label">Highest valued item</div>
        </div>
    </div>

    <br></br>

    </div>
    <div id="portfolioData">

        <a onClick={setValue} class="ui animated button">
        <div class="visible content">Show Portfolio Statistics</div>
        
        <div class="hidden content"><i aria-hidden="true" class="arrow up icon"></i></div>
        </a>
  
       
        <Link className="btn btn-primary" to={Routes.SEARCH}>Add Sneakers</Link>
        

    </div>
    <div>
    </div>
    <table className="table">
      <thead>
        <tr>
          <th>Shoe</th>
          <th>Size</th>
          <th>Price (euro)</th>
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
            <td class="test" value={post['stockxValue']}>
            {post['stockxValue']}
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
    </div>
  );
};

export default PostsTable;

