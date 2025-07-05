//Pagina de Tareas

import TaskList from "../../../components/TaskList";
import styles from '../../../../styles/Home.module.css';


export default function PagTareas() {
  return (
    <>
      <body className={styles.fondo}>      
      <h1 className={styles.titulotareas}>Mis tareas</h1>     
      <div className={styles.container}>
        <TaskList />        
      </div>
      </body>            
    </>
  )
}
