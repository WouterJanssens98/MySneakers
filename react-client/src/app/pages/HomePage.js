import { default as React, Fragment} from 'react';
import { useHistory } from 'react-router';

import { PostList, PostListPaged, PageSection } from '../components';
import * as Routes from '../routes';

const HomePage = ({children}) => {
  const history = useHistory();
  console.log(process.env);

  const handlePostReadMore = (postId) => {
    history.push(`${Routes.POST_DETAIL.replace(':id', postId)}`);
  };

  return (
    <Fragment>
      <PageSection className="news" title={'Shoe overview'} subTitle={'View the latest shoes'} readMoreRoute={'/shoes'}>
        <PostListPaged className="post-list align-items-center" limit={9} skip={0}  onReadMore={handlePostReadMore}  />
      </PageSection>
    </Fragment>
  );
};

export default HomePage;