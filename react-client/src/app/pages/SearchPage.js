import { default as React} from 'react';
import { useHistory } from 'react-router';

import { SearchListPaged, PageSection } from '../components';
import * as Routes from '../routes';

const SearchPage = ({children}) => {
  const history = useHistory();

  const handlePostReadMore = (postId) => {
    history.push(`${Routes.POST_DETAIL.replace(':id', postId)}`);
  };

  return (
    <div className="">
      
      <PageSection className="news" title={'Search your sneakers'} subTitle={'Get to know market value with the click of a button'}>
        <SearchListPaged className="post-list align-items-center" paged={{limit: 6, skip: 1}} onReadMore={handlePostReadMore} />
      </PageSection>
    </div>
  );
};

export default SearchPage;