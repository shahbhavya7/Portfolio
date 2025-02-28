import React from 'react'
import { getImageUrl } from '../../utils'
import styles from './Contact.module.css'

const Contact = () => {
  return <footer className={styles.container} id='contact'>
    <div className={styles.text}>
        <h2>Contact</h2>
        <p>Feel free to reach out to me at </p>
        
    </div>
    <ul className={styles.links}>
        <li className={styles.link}>
            <img src={getImageUrl("contact/emailIcon.png")} alt="Email icon" />
            <a href="mailto:bhavyashah16@outlook.com">bhavyashah16@outlook.com</a>
        </li>
        <li className={styles.link}>
            <img src={getImageUrl("contact/linkedinIcon.png")} alt="LinkedIn icon" />
            <a href="www.linkedin.com/in/bhavya-shah-bs16">LinkedIn</a>
        </li>
        <li className={styles.link}>
            <img src={getImageUrl("contact/githubIcon.png")} alt="Github icon" />
            <a href="https://github.com/bhavyashah-7">GitHub</a>
        </li>
        <li className={styles.link}><h4 className={styles.para}>©️ Portfolio By Bhavya</h4></li>
    </ul>
    
  </footer>
    
  
}

export default Contact