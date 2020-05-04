import { default as React} from 'react';
import { useHistory } from 'react-router';

import { PostListPaged, PageSection } from '../components';
import * as Routes from '../routes';

const PostsPage = ({children}) => {
  const history = useHistory();

  const handlePostReadMore = (postId) => {
    history.push(`${Routes.POST_DETAIL.replace(':id', postId)}`);
  };

  return (
    <div className="">
      <PageSection className="news" title={'Nieuws'} subTitle={'Ontdekt de laatste nieuwe weetjes'}>
        <PostListPaged className="post-list align-items-center" paged={{limit: 6, skip: 1}} onReadMore={handlePostReadMore} />
      </PageSection>
    </div>
  );
};

export default PostsPage;