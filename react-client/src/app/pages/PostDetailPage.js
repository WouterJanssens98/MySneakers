import { default as React, useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useApi } from '../services';

import { PostDetail } from '../components';

const PostDetailPage = ({children}) => {
  const { id } = useParams();
  const { findPost } = useApi();
  const [ post, setPost] = useState(null);

  const initFetch = useCallback(
    () => {
      const fetchPost = async () => {
        const data = await findPost(id);
        
        setPost(data);
      }

      fetchPost();
    },
    [findPost, id],
  )

  useEffect(() => {
    initFetch();

    return () => {
      // no cleanup
    }
  }, [initFetch, id]);

  return (
    <div className="">      
      <PostDetail post={post} />
    </div>
  );
};

export default PostDetailPage;