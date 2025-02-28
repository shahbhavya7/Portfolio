import React from 'react'
import { getImageUrl } from '../../utils';
import styles from './ProjectCard.module.css';

const ProjectCard = ({ project: { title, imageSrc, description, skills, demo, source }, // this project is from json file passed on to project card
  // via the project.jsx file by passing as a prop , without importing the json file in this file we can access the project details
  // destructuring the project object instead writing const project = props.project , we destructure the project object from props
  // it is needed as there are many elements which have reference in project.jsx file , so to use them here we need to destructure the project object if we wrote
  // this code in project.jsx file then we can directly use project object without destructuring as it is already defined in the file
  // we desttucture is more by extracting the properties from the object and using them directly project.title to title
}) => {
  return (
    <div className={styles.container}>
      <img
        src={getImageUrl(imageSrc)}
        alt={`Image of ${title}`}
        className={styles.image}
      />
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
      <ul className={styles.skills}>
        {skills.map((skill, id) => {
          return (
            <li key={id} className={styles.skill}>
              {skill}
            </li>
          );
        })}
      </ul>
      <div className={styles.links}>
        <a href={demo} className={styles.link}>
          Demo
        </a>
        <a href={source} className={styles.link}>
          Source
        </a>
      </div>
    </div>
  );
};

export default ProjectCard