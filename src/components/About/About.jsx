import React from 'react'
import { getImageUrl } from '../../utils'
import styles from './About.module.css'

const About = () => { // the id in section helps to navigate to the section when the link is clicked in the navbar
  return <section className={styles.container} id='skills'>
    <h1 className={styles.title}>Skills</h1>
    <div className={styles.content}><img className={styles.aboutImage} src={getImageUrl("about/aboutimg.png")} alt="" />
    <ul className={styles.aboutItems}>
        <li className={styles.aboutItem}>
            <img src={getImageUrl("about/cursorIcon.png")} alt="" />
            <div className={styles.aboutItemText}>
              <h3>Frontend Developer</h3>
              <p>
                I'm a frontend developer with experience in building responsive
                and optimized sites
              </p>
            </div>
        </li>
          <li className={styles.aboutItem}>
            <img src={getImageUrl("about/serverIcon.png")} alt="Server icon" />
            <div className={styles.aboutItemText}>
              <h3>Backend Developer</h3>
              <p>
                I have experience developing fast and optimised back-end systems
                and APIs
              </p>
            </div>
          </li>
          <li className={styles.aboutItem}>
            <img src={getImageUrl("about/uiIcon.png")} alt="UI icon" />
            <div className={styles.aboutItemText}>
              <h3>UI Designer</h3>
              <p>
                I have designed multiple landing pages and have created design
                systems as well
              </p>
            </div>
          </li>
    </ul>
    
    </div>
  </section>
   
  
}

export default About