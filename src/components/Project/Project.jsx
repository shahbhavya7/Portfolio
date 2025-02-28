import React from 'react'
import projects from '../../data/projects.json'
import styles from "./Project.module.css";
import ProjectCard from './ProjectCard';

const Project = () => {// the id in section helps to navigate to the section when the link is clicked in the navbar
    return   <section className={styles.container} id="projects"> 
    <h2 className={styles.title}>Projects</h2>
    <div className={styles.projects}>
      {projects.map((project, id) => {
        return <ProjectCard key={id} project={project} />;
      })}
    </div>
  </section>

// to avoid so much repetition of code, we can create a component for the project card and pass the project as a prop to the component and in 
// projectcard it accepts the project as a prop and then we can use the project prop to display the project details

}

export default Project