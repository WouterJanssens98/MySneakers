import { default as React } from 'react';
import { useState, useEffect } from 'react';
import { default as classnames } from 'classnames';
import { default as moment } from 'moment';
import { useApi } from '../../../services/';
import { apiConfig } from '../../../config';
import * as Routes from '../../../routes';
import { useHistory, Link } from 'react-router-dom';


const PostsTable = ({children, posts, onDelete, onEdit}) => {
  const { updatePortfolio, findPortfolio } = useApi();
  const [worth, setWorth] = useState(null);
  const [items, setItems] = useState(null);
  const [highest, setHighest] = useState(0)
  // const [correctPosts, setPosts] = useState(posts)

    
 
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

  const handleRemove = async (item) => {
    const url = `${apiConfig.baseURL}/portfolio/remove/${item}`;
    const userID = JSON.parse(localStorage.getItem('mern:authUser')).id;
    console.log(userID)
    
    const details = {
    referredUser : userID
    };

    const myHeaders = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
    }
    const options = {
      method: 'POST',
      headers: myHeaders,
      body : JSON.stringify(details)
    };

    const response = await fetch(`${url}`, options);
    const resData = await response.json();
    window.location.reload();
    }

  const setValue = async () => {
    const table = document.getElementsByClassName("table");
    const amount = document.querySelectorAll('.test').length
    let sumVal = 0;
    const test = table[0]
    const highestPrice = []
    for(var i = 1; i < amount+1; i++)
            {
                sumVal = sumVal + parseInt(test.rows[i].cells[2].innerHTML);
                highestPrice.push(parseInt(test.rows[i].cells[2].innerHTML))
            }
            
    const data = {
      totalItems : amount,
      totalWorth : sumVal
    };
        
    setWorth(sumVal)
    setItems(amount)
    if(amount === 0){
      setHighest("0")
    }else{
      setHighest(Math.max(...highestPrice))
    };

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
          € {highest}
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
          <th>Price (€)</th>
          <th>Action</th>
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
            <td>
              <a href="#" aria-label="delete-forever" onClick={ev => handleRemove(post.id)}><i className="fas fa-trash"></i></a>              
            </td>
          </tr>
        ))}


      </tbody>
    </table>
    </div>
  );
};

export default PostsTable;

