import React, { useState, useEffect, useContext } from 'react';
import { fetchProjects, addProject, deleteProject, updateProject, login } from '../firebase/firebase';
import { AuthContext } from '../context/AuthContext';


const Admin = () => {
    const { currentUser, logout, loading } = useContext(AuthContext);
    const [projects, setProjects] = useState([]);
    const [newProject, setNewProject] = useState({ title: '', description: '', image: '' });
    const [editingProject, setEditingProject] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [imageFile, setImageFile] = useState(null); // Для хранения выбранного файла
    const [imagePreview, setImagePreview] = useState(null); // Для превью изображения
    const [imageUrl, setImageUrl] = useState(null); // Для хранения URL загруженного изображения


    // Загрузка проектов при монтировании компонента
    useEffect(() => {
        if (currentUser) {
            fetchProjects().then((data) => setProjects(data));
        }
    }, [currentUser]);

    // Обработка авторизации
    const handleLogin = async () => {
        try {
            await login(email, password);
            setEmail('');
            setPassword('');
        } catch (error) {
            alert('Login failed: ' + error.message);
        }
    };

    // Обработка добавления нового проекта
    const handleAddProject = async () => {
        if (!currentUser) {
            alert('You must be logged in to add a project.');
            return;
        }

        if (!imageUrl) {
            alert('Please upload an image first.');
            return;
        }

        const newProjectData = {
            title: newProject.title,
            description: newProject.description,
            image: imageUrl, // URL загруженного изображения
        };

        await addProject(newProjectData);
        setProjects([...projects, { id: Date.now(), ...newProjectData }]);
        setNewProject({ title: '', description: '', image: '' });
        setImageFile(null);
        setImagePreview(null);
        setImageUrl(null);
    };

    // Обработка удаления проекта
    const handleDeleteProject = async (id) => {
        await deleteProject(id);
        setProjects(projects.filter((project) => project.id !== id));
    };

    // Обработка начала редактирования проекта
    const handleEditProject = (project) => {
        setEditingProject(project);
    };

    // Обработка сохранения изменений в проекте
    const handleSaveProject = async () => {
        await updateProject(editingProject.id, editingProject);
        setProjects(projects.map((project) => (project.id === editingProject.id ? editingProject : project)));
        setEditingProject(null);
    };

    // Обработка выбора файла
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setImageFile(file);

        // Превью изображения
        const reader = new FileReader();
        reader.onload = () => {
            setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
    };

    // Обработка загрузки изображения на сервер
    const handleUploadImage = async () => {
        if (!imageFile) {
            alert('Please select an image first.');
            return;
        }

        const formData = new FormData();
        formData.append('image', imageFile);

        try {
            const response = await fetch('..../public/upload.php', {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();

            if (result.success) {
                setImageUrl(result.imageUrl); // Сохраняем URL загруженного изображения
                alert('Image uploaded successfully!');
            } else {
                alert('Error uploading image: ' + result.error);
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('Error uploading image.');
        }
    };

    // Если загрузка, показываем сообщение
    if (loading) {
        return <div>Loading...</div>;
    }

    // Если пользователь не авторизован, показываем форму авторизации
    if (!currentUser) {
        return (
            <div className="container">
                <h2>Login</h2>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={handleLogin}>Login</button>
            </div>
        );
    }

    // Если пользователь авторизован, показываем формы для управления контентом
    return (
        <div className="container">
            <h2>Admin Panel</h2>

            {/* Кнопка выхода */}
            <button onClick={logout} style={{ marginBottom: '20px' }}>Logout</button>

            {/* Форма для добавления нового проекта */}
            <div className="admin-panel">
                <h3>Add New Project</h3>
                <input
                    type="text"
                    placeholder="Title"
                    value={newProject.title}
                    onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={newProject.description}
                    onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                />
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                />
                {imagePreview && <img src={imagePreview} alt="Preview" style={{ maxWidth: '200px', marginTop: '10px' }} />}
                <button onClick={handleUploadImage} style={{ marginTop: '10px' }}>Upload Image</button>

                <button onClick={handleAddProject}>Add Project</button>
            </div>

            {/* Список проектов с возможностью редактирования и удаления */}
            <div>
                <h3>Projects</h3>
                {projects.map((project) => (
                    <div key={project.id} className="project-card">
                        {editingProject?.id === project.id ? (
                            // Форма редактирования проекта
                            <div>
                                <input
                                    type="text"
                                    value={editingProject.title}
                                    onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                                />
                                <input
                                    type="text"
                                    value={editingProject.description}
                                    onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                                />
                                <input
                                    type="text"
                                    value={editingProject.image}
                                    onChange={(e) => setEditingProject({ ...editingProject, image: e.target.value })}
                                />
                                <button onClick={handleSaveProject}>Save</button>
                            </div>
                        ) : (
                            // Отображение проекта
                            <div>
                                <h4>{project.title}</h4>
                                <p>{project.description}</p>
                                <img src={project.image} alt={project.title} style={{ width: '100px' }} />
                                <button onClick={() => handleEditProject(project)}>Edit</button>
                                <button onClick={() => handleDeleteProject(project.id)}>Delete</button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Admin;