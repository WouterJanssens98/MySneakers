import { default as React } from 'react';

import './Footer.scss';

const gdmLinks = [
  {
    'title': 'Onze opleiding',
    'url': 'https://www.arteveldehogeschool.be/opleidingen/bachelor/grafische-en-digitale-media',
    'target': 'blank'
  },
  {
    'title': 'Stage en bachelorproef',
    'url': 'http://www.arteveldehogeschool.be/opleidingen/bachelor/grafische-en-digitale-media/praktijk-stage-en-bachelorproef',
    'target': 'blank'
  },
  {
    'title': 'Campus Mariakerke',
    'url': 'https://www.arteveldehogeschool.be/bij-ons-studeren/onze-locaties/campus-mariakerke',
    'target': 'blank'
  },
  {
    'title': 'Brochure',
    'url': 'https://www.arteveldehogeschool.be/sites/default/files/gdm_20-21_digitaal.pdf',
    'target': 'blank'
  },
  {
    'title': 'Gdm.gent',
    'url': 'https://www.gdm.gent/',
    'target': 'self'
  },
  {
    'title': 'In de kijker',
    'url': 'https://www.gdm.gent/#/posts',
    'target': 'self'
  },
  {
    'title': 'Made By GDM',
    'url': 'https://www.gdm.gent/#/projects',
    'target': 'self'
  },
  {
    'title': 'infodag@home',
    'url': 'https://www.gdm.gent/#/infodag-at-home',
    'target': 'self'
  },
  {
    'title': 'Studio GDM',
    'url': 'https://www.gdm.gent/#/studio-gdm',
    'target': 'self'
  },
];

const Footer = ({ children }) => {
  return (
    <footer className="page-footer">
      <section className="">     
        <div className="page-section__main">        
          <div className="container">
            <div className="row">
              <div className="col-12">
                <section className="links__contact">
                  <h4 className="d-none">Contact</h4>
                  <span><a href="http://www.gdm.gent" title="GDM.GENT website">&copy; MySneakers</a> is een website van de opleidings Bachelor in de Grafische en digitale media van de <a href="http://www.arteveldehogeschool.be" rel="noopener noreferrer" title="Officiële website van de Arteveldehogeschool">Arteveldehogeschool</a>.</span>
                  <span>Website made by <a href="https://www.linkedin.com/in/wouter-janssens-5a5742194/" title="LinkedIn Profile Wouter Janssens">Wouter Janssens </a>from 2NMD.</span>
                </section>
              </div>
            </div>
          </div>
        </div>
        <footer className="page-section__footer">
          <div className="container">
            <section className="meta__social">
              <h4 className="d-none">Social media links</h4>
              <a className="footer__socialmedia-link" rel="noopener noreferrer" href="https://www.facebook.com/GrafischeendigitalemediaArteveldehogeschool/" title="Facebook pagina" target="_blank"><i className="fab fa-facebook-f"></i></a>
              <a className="footer__socialmedia-link" rel="noopener noreferrer" href="https://www.instagram.com/madebygdm/" title="Instagram" target="_blank"><i className="fab fa-instagram"></i></a>
              <a className="footer__socialmedia-link" rel="noopener noreferrer" href="https://twitter.com/arteveldegdm" title="Twitter" target="_blank"><i className="fab fa-twitter"></i></a>
              <a className="footer__socialmedia-link" rel="noopener noreferrer" href="https://vimeo.com/bachelorgdm" title="Vimeo" target="_blank"><i className="fab fa-vimeo"></i></a>
              <a className="footer__socialmedia-link" rel="noopener noreferrer" href="https://github.com/gdmgent" title="GitHub" target="_blank"><i className="fab fa-github"></i></a>
            </section>        
          </div>
        </footer>
      </section>
    </footer>
  );
};

export default Footer;