import { default as React, Fragment } from 'react';

import { PageSection } from '../../components';

const PostDetail = ({ post }) => {
  return (
    <Fragment>
      {!!post
        ? <PageSection className="post--detail" title={post.title} subTitle={post.synopsis}>
            <div className="post__body" dangerouslySetInnerHTML={{
              __html: post.body
            }}></div>
          </PageSection>
        : <Fragment></Fragment>
      }
    </Fragment>
  );
};

export default PostDetail;