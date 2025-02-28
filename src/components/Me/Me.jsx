import React from 'react'
import { getImageUrl } from '../../utils'
import styles from './Me.module.css'

const Me = () => { // the id in section helps to navigate to the section when the link is clicked in the navbar
  return <section className={styles.container} id='Me'>
    <h1 className={styles.title}>About Me</h1>
    <div className={styles.My}>
      <p>
        I'm an Undergraduate Student and Currently I'm persuing undergraduate degree in Computer Science and Engineering . I have a deep interest in world of computers and technology.
        I'm also a Full-Stack Web Developer , I have built some cool projects like CampCreeks , Personal Expense Tracker , Music Player and more using technologies like Nodejs , Expressjs , 
        MongoDB , Bootstrap etc along with hands-on exprerience in APIs. <br /> <br />
        Apart from this I also have a good knowlegde of Machine Learning and Data Science . 
      </p>
    </div>
  </section>
   
  
}

export default Me