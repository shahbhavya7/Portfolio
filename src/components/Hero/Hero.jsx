import React from 'react'
import { getImageUrl } from '../../utils'
import styles from './Hero.module.css'

const Hero = () => {
  return <section className={styles.container}>
    <div className={styles.content}>
        <h1 className={styles.title}>Hi, I'm Bhavya</h1>
        <p className={styles.description}>I'm a full-stack developer with 5 years of experience.Reach out if you like to learn more.</p>
        <a className={styles.contactBtn} href="">Contact Me</a>
    </div>
    <img className={styles.heroImg} src={getImageUrl("hero/file.png")} alt="" />
    <div className={styles.topBlur}/>
    <div className={styles.bottomBlur}/>
  </section>
    
  
}

export default Hero