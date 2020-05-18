import { default as React, Fragment } from 'react';

import { PageSection } from '../../components';
import { ShoeSection } from '../section';

const PostDetail = ({ post }) => {
  return (
    <Fragment>
      {!!post
        ? <ShoeSection className="post--detail" id={post._id} sku={post.productSku} imageUrl={post.imageUrl} title={post.shoeName} subTitle={post.shoeBrand}>
            <div className="post__body" dangerouslySetInnerHTML={{
              __html: post.imageUrl
            }}></div>
          </ShoeSection>
        : <Fragment></Fragment>
      }
    </Fragment>
  );
};

export default PostDetail;