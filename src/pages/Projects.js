import React, { useEffect, useState } from 'react';
import { fetchProjects } from '../firebase/firebase';
import ProjectCard from '../components/ProjectCard';

const Projects = () => {
    const [projects, setProjects] = useState([]);

    // Загрузка проектов при монтировании компонента
    useEffect(() => {
        fetchProjects().then((data) => setProjects(data));
    }, []);

    return (
        <div className="container">
            <h1>Projects</h1>
            <div className="projects-grid">
                {projects.map((project) => (
                    <div key={project.id}>
                        <ProjectCard project={project} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Projects;