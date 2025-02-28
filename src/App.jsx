import styles from "./App.module.css"
import About from "./components/About/About"
import Contact from "./components/Contact/Contact"
import Experiance from "./components/Experiance/Experiance"
import Hero from "./components/Hero/Hero"
import Navbar from './components/Navbar/Navbar'
import Project from "./components/Project/Project"
import Me from "./components/Me/Me"

function App() {
  return (
    <>
      <div className={styles.App}>
        <Navbar/>
        <Hero/>
        <Me/>
        <About/>
        <Experiance/>
        <Project/>
        <Contact/>
      </div>
    </>
  )
}

export default App
