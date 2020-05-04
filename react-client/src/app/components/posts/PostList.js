import { default as React, useCallback, useEffect, useState} from 'react';
import { default as classnames } from 'classnames';
import { useApi } from '../../services';

const PostList = ({children, amount, onReadMore, className, ...rest }) => {
  const { findAllPosts } = useApi();
  const [ posts, setPosts ] = useState();

  const initFetch = useCallback(
    () => {
      const fetchPosts = async () => {
        const data = await findAllPosts({
          limit: amount,
          skip: 1
        });
        setPosts(data.docs);
      }

      fetchPosts();
    },
    [findAllPosts, amount],
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
              <button href="#" className="btn btn-primary" onClick={ev => handleReadMore(ev, post._id)}>Lees meer</button>
            </div>
          </article>
        </div>
        
      ))}
    </div>
  );
};

export default PostList;