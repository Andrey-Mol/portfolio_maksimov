import { initializeApp } from 'firebase/app';
import {
    getFirestore,
    collection,
    getDocs,
    addDoc,
    deleteDoc,
    doc,
    updateDoc, // Добавляем этот импорт
} from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';


// Конфигурация Firebase
const firebaseConfig = {
    apiKey: "AIzaSyA4R_0sKXHaynnLWFyMRXRFaO1_gXfoktc",
    authDomain: "portfolio-maksimov.firebaseapp.com",
    projectId: "portfolio-maksimov",
    storageBucket: "portfolio-maksimov.firebasestorage.app",
    messagingSenderId: "921118854104",
    appId: "1:921118854104:web:c949f45da02f3da23740ad",
    measurementId: "G-KHW0CN2ZNJ"
};


// Инициализация Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Получение данных портфолио
export const fetchProjects = async () => {
    const projectsCollection = collection(db, 'projects');
    const projectsSnapshot = await getDocs(projectsCollection);
    return projectsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Добавление нового проекта
export const addProject = async (project) => {
    const projectsCollection = collection(db, 'projects');
    await addDoc(projectsCollection, project);
};

// Удаление проекта
export const deleteProject = async (id) => {
    const projectDoc = doc(db, 'projects', id);
    await deleteDoc(projectDoc);
};

// Редактирование проекта
export const updateProject = async (id, updatedData) => {
    const projectDoc = doc(db, 'projects', id);
    await updateDoc(projectDoc, updatedData);
};

// Авторизация
export const login = async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
};

// Выход
export const logout = async () => {
    await signOut(auth);
};

// Получение текущего пользователя
export const getCurrentUser = () => {
    return auth.currentUser;
};