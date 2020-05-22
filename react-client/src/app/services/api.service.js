import { default as React, useContext, createContext } from 'react';

import { apiConfig } from '../config';

const ApiContext = createContext();
const useApi = () => useContext(ApiContext);

const ApiProvider = ({children}) => {
  const BASE_URL = `${apiConfig.baseURL}`;


  const createPortfolio = async (id) => {
    let url = `${BASE_URL}/portfolio/${id}`;

    const options = {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    };
    const response = await fetch(url, options);
    return response.json();
  }

  const updatePortfolio = async (id,worth,items) => {
    let url = `${BASE_URL}/portfolio/${id}`;

    const options = {
      method: "PUT",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "totalWorth" : worth,
        "totalItems" : items
      })
    };
    const response = await fetch(url, options);
    console.log("Successfully updated portfolio values!")
    return response.json();
  }


  const findAllPosts = async (query = null) => {
    let url = `${BASE_URL}/shoes`;
    
    if (query !== null) {
      url += (url.indexOf('?') === -1 ? '?' : '&') + queryParams(query);
    }
    console.log(url);
    const response = await fetch(url);
    return response.json();
  }

  const findMatchingPosts = async (query) => {
    let url = `${BASE_URL}/shoes/${query}`;
    const response = await fetch(url);
    console.log(response);
    return response.json();
  }

  

  const findAllUsers = async (query = null) => {
    let url = `${BASE_URL}/users`;
    console.log(url);
    const response = await fetch(url);
    return response.json();
  }

  
  const findPortfolio = async (id) => {
    let url = `${BASE_URL}/portfolio/user/${id}`;
    const response = await fetch(url);
    const portfolio  = await response.json()
    return portfolio[0];
  
  }


  const getValueFromID = async (id) => {
    let url = `${BASE_URL}/values/${id}`;
    const response = await fetch(url);
    const test = await response.json();
    const value =  test['stockxValue'];
    console.log(value.type)
    return value;
  }

  const getShoeFromID = async (id) => {
    let url = `${BASE_URL}//shoes/model/${id}`;
    const response = await fetch(url);
    return response.json();
  }



  const findPost = async (id) => {
    let url = `${BASE_URL}/shoes/model/${id}`;
    const response = await fetch(url);
    return response.json();
  }

  const createPostViewModel = async (post) => {
    let url = `${BASE_URL}/posts/create`;
    const response = await fetch(url);
    return response.json();
  }

  const storePost = async (post) => {
    const options = {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(post)
    };

    let url = `${BASE_URL}/posts`;
    const response = await fetch(url, options);
    return response.json();
  }

  const editPostViewModel = async (postId) => {
    const options = {
      method: "get",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    };

    let url = `${BASE_URL}/posts/${postId}/edit`;
    const response = await fetch(url, options);
    return response.json();
  }

  const updatePost = async (post) => {
    const options = {
      method: "put",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(post)
    };

    let url = `${BASE_URL}/posts/${post._id}`;
    const response = await fetch(url, options);
    return response.json();
  }

  const deletePost = async (id, mode = 0) => {
    const options = {
      method: "delete",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    }
    const response = await fetch(`${BASE_URL}/posts/${id}?mode=${mode}`, options);
    return await response.json();
  }

  const queryParams = (options) => {
    return Object.keys(options)
      .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(options[key])).join('&');
  }

  return (
    <ApiContext.Provider value={{ createPostViewModel, deletePost, updatePortfolio, findAllPosts, findMatchingPosts, findAllUsers, findPortfolio,getValueFromID, getShoeFromID, findPost, storePost, editPostViewModel, updatePost }}>
      {children}
    </ApiContext.Provider>
  );
};

export {
  ApiContext,
  ApiProvider,
  useApi,
}



