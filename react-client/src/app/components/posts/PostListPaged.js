import { default as React, useCallback, useEffect, useState} from 'react';
import { default as classnames } from 'classnames';
import { useApi } from '../../services';

const PostListPaged = ({children, paged, onReadMore, className, ...rest }) => {
  const { findAllPosts } = useApi();
  const [ posts, setPosts ] = useState();
  const [ pagination, setPagination ] = useState({
    limit: paged.limit,
    page: paged.skip,
    pages: 1,
    total: 1
  });
  const [ currentPageIndex, setCurrentPageIndex ] = useState(1);

  const initFetch = useCallback(
    () => {
      const fetchPosts = async () => {
        const data = await findAllPosts({
          limit: pagination.limit,
          skip: currentPageIndex
        });
        setPosts(data.docs);
        setPagination({
          limit: data.limit,
          page: data.page,
          pages: data.pages,
          total: data.total
        });
      }

      fetchPosts();
    },
    [findAllPosts, currentPageIndex, pagination.limit],
  )

  useEffect(() => {
    initFetch();

    return () => {
      // no cleanup
    }
  }, [initFetch]);
  
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
    <div className={classnames('row post-list', className)}>
      {posts && posts.map((post, index) => (
        <div className="col-12 col-sm-12 col-md-6 col-lg-4" key={index}>
          <article className="card" key={post._id}>
            <picture className="card-img-top">
              <img src={post.imageUrl} alt={post.title} />
            </picture>
            <div className="card-body">
              <h5 className="card-title">{post.title}</h5>
              <p className="card-text">{post.synopsis}</p>
              <button className="btn btn-primary" onClick={ev => handleReadMore(ev, post._id)}>Lees meer</button>
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
  );
};

export default PostListPaged;