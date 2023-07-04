import { useSelector } from "react-redux";
import { useState, useEffect } from 'react'
import { getMyProjectsById } from '../../api/internal';
import styles from '../Home/Home.module.css';
import Loader from '../../components/Loader/Loader';
import { useNavigate } from "react-router-dom";


function MyProject() {
  
  const userId = useSelector((state) => state.user._id);
  const customerName = useSelector((state) => state.user.customerName);
  const navigate = useNavigate();
const [projects , setProjects] = useState([]);

useEffect(() =>{
  (async function getMyProjectsApiCall(){
    const response = await getMyProjectsById(userId);
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
  return <Loader text="my projects"/>
}

  return (
    <>
    <div className={styles.header}>My Projects</div>
    <div className={styles.grid}>
     {projects.map((project) => (
      <div className={styles.card} 
      key={projects._id}
      onClick={() => navigate(`/project/${project._id}`)}
      >
        <h3>{project.projectName}</h3>
        <h6>{project.projectDes}</h6>
        {/* <h6>Project by: {customerName}</h6> */}
      </div>
     ))}

    </div>

    </>
  )
}

export default MyProject;

