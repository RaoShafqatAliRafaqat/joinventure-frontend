import { useState, useEffect } from 'react'
import { getAllProjects } from '../../api/internal';
import styles from './Home.module.css';
import Loader from '../../components/Loader/Loader';
import { useNavigate } from "react-router-dom";


function Home() {
  const navigate = useNavigate();
const [projects , setProjects] = useState([]);
const [search , setSearch] = useState([]);

useEffect(() =>{
  (async function projectApiCall(){
    const response = await getAllProjects();
    if (response.status === 200) {
      setProjects(response.data.projects);
    }
  })();

  //cleanup 
  setProjects([]);
},[]);

// const handleCardClick = (id) => {
// open detail page 
//pass id to that page
// fetech details
//  }
if(projects.length === 0){
  return <Loader text="project"/>
}

  return (
    <>
    <div className={styles.header}>Latest Projects</div>
    {/* <input
              className={styles.input}
              placeholder="search project"
              value={search}
              onChange={(e) => setSearch(e.target.value)
              }
            /> */}
    <div className={styles.grid}>
     {projects.map((project) => (
      // {projects.filter(project => project.includes({search})).map((project) => (
      <div className={styles.card} 
      key={projects._id}
      onClick={() => navigate(`/project/${project._id}`)}
      >
        <h3>{project.projectName}</h3>
        <h6>{project.projectDes}</h6>
        <h6>Project by: {project.projectOwner}</h6>
      </div>
     ))}

    </div>

    </>
  )
}

export default Home;
