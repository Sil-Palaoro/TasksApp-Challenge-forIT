//Componente de cada Tarea

import React from "react";
import { AiFillEdit } from "react-icons/ai";
import { BsFillTrash2Fill } from "react-icons/bs";
import { RiRadioButtonFill } from "react-icons/ri";
import styles from "../../styles/Task.module.css";
import { useRouter } from 'next/navigation';
import {useState, useEffect}  from "react";
import axios from 'axios';


function Task({ text, taskCompleted, delTask, editTask }) {  
  const [tasks, setTasks] = useState([]);
  const router = useRouter();
  
  useEffect(() => {
    // Recupera el token JWT almacenado en localStorage
    const access_token = localStorage.getItem('access_token');
    
    // Verifica si el token está presente
    if (access_token) {

      // Configura una instancia de Axios con el token en la cabecera
      const axiosInstance = axios.create({
        baseURL: "http://127.0.0.1:8000/",
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      // Trae las tareas desde la BD
      axiosInstance
        .get("tareas/")
        .then((response) => setTasks(response.data))
        .catch((error) => console.error(error));
    } else {
      // Si el token JWT no está presente en localStorage, redirige al usuario a la página de inicio de sesión
      router.push('/app-tareas/iniciar_sesion'); 
    }
  }, []);

  //Maneja la eliminación de la tarea
  const handleDelete = (e) => {        
    const access_token = localStorage.getItem('access_token');
    if (access_token) {
      const axiosInstance = axios.create({
        baseURL: "http://127.0.0.1:8000/",
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      //Elimina la tarea en la BD 
      axiosInstance
        .delete(`/tareas/${text.id}/`)
        .then((response) => {
          
          // Llama a la función delTask para eliminar la tarea
          delTask(text.id);
        })
        .catch((error) => console.error(error));
    } else {
      router.push('/app-tareas/iniciar_sesion');
    }
  };
  
  const handleCompleted = (e) => {    
    //Marca la tarea como completada o no

    const access_token = localStorage.getItem('access_token');
    if (access_token) {
      const axiosInstance = axios.create({
        baseURL: "http://127.0.0.1:8000/",
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      //Marca la tarea como completada o no en la BD con PATCH
      axiosInstance
        .patch(`/tareas/${text.id}/`)
        .then((response) => {
          
          // Llama a la función taskCompleted para marcar la tarea como completada o no
          taskCompleted(text.id);
        })
        .catch((error) => console.error(error));
    } else {
      router.push('/app-tareas/iniciar_sesion');
    }
  };
  


  return (
    //Botones para marcar la tarea como completada, editarla y eliminarla
     <div className={styles.div}>
        <RiRadioButtonFill
          onClick={() => handleCompleted(text.id)}
          className={
            text.completed ? [styles.RiRadioButtonFillCompleted] : [styles.RiRadioButtonFill]
          }
        />
        <h3 className={text.completed ? [styles.completed] : [styles.task]}>
          {text.title}
        </h3>
        <p className={text.completed ? [styles.completed] : [styles.task]}>
          {text.description}
        </p>

        <AiFillEdit
          className={styles.AiFillEdit}
          onClick={() => editTask(text.id)}
        />
        <BsFillTrash2Fill
          className={styles.BsFillTrash2Fill}
          onClick={() => handleDelete(text.id)}
        />
      </div>
      );
}
export default Task;

