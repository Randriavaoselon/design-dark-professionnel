import Footer from './footer/Footer';
import '../styles/Resume.css';

const Resume = () => {
  return (
    <div className='background-resume'>
    <section className="resume">
      <div className="resume-container">
        <div className="resume-row">
          <h2 className="resume__title">
            AVENIR-TECH
          </h2>
          <p className="resume__paragraph">
            Rejoignez Avenir-Tech dès aujourd'hui et connectez-vous à un
            réseau de talents et d'opportunités pensé pour vous faire
            avancer, étape par étape, en toute confiance.
          </p>
        </div>
      </div>
    </section>
    <Footer/>
    </div>
  );
};

export default Resume;