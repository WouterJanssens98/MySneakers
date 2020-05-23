import { default as React, useCallback, useEffect, useState} from 'react';
import { default as classnames } from 'classnames';
import { useApi } from '../../services';
import './SearchListPaged.scss';

const SearchListPaged = ({children, limit, skip , onReadMore, className, ...rest }) => {
  const { findMatchingPosts } = useApi();
  const [ posts, setPosts ] = useState();
  const [ currentPageIndex, setCurrentPageIndex ] = useState(1);
  const [ pagination, setPagination ] = useState({
    limit: limit,
    page: skip,
    pages: 1,
    total: 1
  });


  const [ query, setQuery] = useState(null);

  const handleSearch = async () => {
      console.log(`query found! query is ${query}`)
      const data =await findMatchingPosts(query)
      setPosts(data);
  }
  
  const handleReadMore = (ev, postId) => {
    ev.preventDefault();
    if (typeof onReadMore === 'function') {
      onReadMore(postId);
    }
  };

  const handleLoadMore = (ev, pageIndex) => {
    ev.preventDefault();
    setCurrentPageIndex(pageIndex);
  }



  return (
    <div>
        <div id="searchString">
            <div  class="ui large icon input">
                <input type="text" onChange={(ev) => setQuery(ev.target.value)} placeholder="Yeezy" />
                <button id="searchbtn" className="ui button blue" onClick={ev => handleSearch()}>Go</button>

            </div>
        </div>
    <div className={classnames('row post-list', className)}>
      {posts && posts.map((post, index) => (
        <div className="col-12 col-sm-12 col-md-6 col-lg-4" key={index}>
          <article className="card" key={post._id}>
            <picture className="card-img-top">
              <img src={post.imageUrl} alt={post.shoeName} />
            </picture>
            <div className="card-body">
              <h5 className="card-title">{post.shoeName}</h5>
              <p className="card-text">{post.synopsis}</p>
              <button className="ui primary button" onClick={ev => handleReadMore(ev, post._id)}>View shoe</button>
            </div>
          </article>
        </div>
        
      ))}
      {!!posts && pagination.page < pagination.pages ? (
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              {posts && pagination.page < pagination.pages ? <button className="btn btn-outline-primary" onClick={ev => handleLoadMore(ev, pagination.page + 1)}>Meer nieuws laden...</button> : ''}
            </div>
          </div> 
        </div>       
      ) : ''}
    </div>
    </div>
  );
};

export default SearchListPaged;