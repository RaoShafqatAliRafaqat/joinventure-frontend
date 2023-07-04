import { useState } from "react";
import { submitProject } from "../../api/internal";
import { useSelector } from "react-redux";
import styles from "./SubmitProject.module.css";
import TextInput from "../../components/TextInput/TextInput";
import { useNavigate } from "react-router-dom";


function SubmitProject() {
    const navigate = useNavigate();

    const [projectName, setProjectName] = useState("");
    const [projectDes, setProjectDes] = useState("");


    const projectOwner = useSelector((state) => state.user._id);


    const submitHandler = async () => {
        const data = {
            projectName,
            projectDes,
            projectOwner,
        };

        const response = await submitProject(data);

        if (response.status === 201) {
            navigate("/");
        }
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>Create a project!</div>
            <TextInput
                type="text"
                name="projectName"
                placeholder="project name"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                style={{ width: "60%" }}
            />
            <textarea
                className={styles.content}
                placeholder="your content goes here..."
                maxLength={400}
                value={projectDes}
                onChange={(e) => setProjectDes(e.target.value)}
            />
            <button
                className={styles.submit}
                onClick={submitHandler}
                disabled={projectName === "" || projectDes === "" }
            >
                Submit
            </button>
        </div>
    );
}

export default SubmitProject;