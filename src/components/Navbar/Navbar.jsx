import React,{useState} from 'react'

import styles from './Navbar.module.css'
import { getImageUrl } from '../../utils'

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false)
  return <nav className={styles.navbar}>
    <a className={styles.title} href="/">Portfolio</a>
    <div className={styles.menu}>
        <img className={styles.menuBtn} src={menuOpen 
        ? getImageUrl("nav/closeIcon.png")
        : getImageUrl("nav/menuIcon.png")
    }   
        onClick={()=>setMenuOpen(!menuOpen)}
        alt="menu-button"
        />
        <ul className={`${styles.menuItems} ${menuOpen && styles.menuOpen}`}
        onClick={()=>setMenuOpen(false)}>
            <li><a href="#Me">About</a></li>
            <li><a href="#experiance">Experience</a></li>
            <li><a href="#skills">Skills</a></li>
            <li><a href="#projects">Projects</a></li>
            
            <li><a href="#contact">Contact</a></li>
        </ul>
    </div>
  </nav>
// the id in section helps to navigate to the section when the link is clicked in the navbar

}

export default Navbar