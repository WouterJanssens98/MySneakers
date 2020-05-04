import { default as React } from 'react';
import { Link } from 'react-router-dom';
import { default as classnames } from 'classnames';

import './PageSection.scss';

const PageSection = ({children, classes, title, subTitle, readMoreRoute}) => {
  return (
    <section className={classnames('page-section', classes)}>
      <header className="page-section__header">        
        <div className="container">
          <div className="row">
            <div className="col-12 text-center title">
              <h1 className="d-flex justify-content-center"><span>{title}</span></h1>
              {!!subTitle ? (<h2 className="text-black-50">{subTitle}</h2>) : ''}
            </div>
          </div>
        </div>
      </header>      
      <div className="page-section__main">        
        <div className="container">
          <div className="row">
            <div className="col-12">
              {children}
            </div>
          </div>
        </div>
      </div>
      <footer className="page-section__footer">
        <div className="container">
          {!!readMoreRoute ? (
            <div className="row">
              <div className="col-12 text-center">
                <Link className="btn btn-outline-primary" to={readMoreRoute}>Meer {title}</Link>
              </div>
            </div>        
          ) : ''}
        </div>
      </footer>
    </section>
  );
};

export default PageSection;