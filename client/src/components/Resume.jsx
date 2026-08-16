import Footer from './footer/Footer';
import '../styles/Resume.css';

const Resume = () => {
  return (
    <div className='background-resume'>
    <section className="resume">
      <div className="resume-container">
        <div className="resume-row">
          <h2 className="resume__title">
            AGENTOVA
          </h2>
          <p className="resume__paragraph">
            Rejoignez Agentova dès aujourd'hui et laissez une équipe de 8
            agents IA spécialisés automatiser vos tâches du quotidien, pour
            vous faire gagner du temps et avancer, étape par étape, en toute
            confiance.
          </p>
        </div>
      </div>
    </section>
    <Footer/>
    </div>
  );
};

export default Resume;