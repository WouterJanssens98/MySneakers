import { default as React, Fragment} from 'react';
import { useHistory } from 'react-router';

import { PostList, PageSection } from '../components';
import * as Routes from '../routes';

const HomePage = ({children}) => {
  const history = useHistory();

  const handlePostReadMore = (postId) => {
    history.push(`${Routes.POST_DETAIL.replace(':id', postId)}`);
  };

  return (
    <Fragment>
      <PageSection className="news" title={'Nieuws'} subTitle={'Ontdekt de laatste nieuwe weetjes'} readMoreRoute={'/posts'}>
        <PostList className="post-list align-items-center" amount={3} onReadMore={handlePostReadMore}  />
      </PageSection>
    </Fragment>
  );
};

export default HomePage;