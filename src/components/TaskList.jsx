import { useState, useEffect } from "react";
import TodoItem from "./TodoItem.jsx";
import styles from './Task.module.css';

export default function TaskList({ tasks, updateTodos, currentCategory }) {

    const [ loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);
    return (
        <section className="tasks-category">
            {
                loading ?
                    (<p className="fallback-text">Загрузка...</p>)
            :
            (
                tasks.length > 0 ?
                        (<section className={styles.tasks}>
                            {(tasks).map((taskData) => (
                                <TodoItem
                                    taskData={taskData}
                                    key={taskData.id}
                                    updateTodos={updateTodos}
                                    currentCategory={currentCategory}
                                />
                            ))}
                        </section>)
                    :
                        (<p className="fallback-text">Добавьте первую задачу</p>)

            )
            }

            {/*{!isLoading && tasks.length > 0 && (*/}
            {/*    <section className={styles.tasks}>*/}
            {/*        {(tasks).map((taskData) => (*/}
            {/*            <TodoItem*/}
            {/*                taskData={taskData}*/}
            {/*                key={taskData.id}*/}
            {/*                updateTodos={updateTodos}*/}
            {/*                currentCategory={currentCategory}*/}
            {/*            />*/}
            {/*        ))}*/}
            {/*    </section>*/}
            {/*)}*/}
        </section>
    );
};

// export default function TaskList({ tasks, isLoading, updateTodos, currentCategory }) {
//
//     const [ loading, setLoading] = useState(true);
//
//     setTimeout(() => {
//         setLoading(false)
//     }, 1000);
//     if (loading) {
//         return <h3>Loading Page....</h3>;
//     } else {
//         return (
//             <section className="tasks-category">
//                 {/*{isLoading && <p className="fallback-text">Loading...</p>}*/}
//                 {!isLoading && tasks.length === 0 && <p className="fallback-text">Добавьте свою первую задачу</p>}
//                 {!isLoading && tasks.length > 0 && (
//                     <section className={styles.tasks}>
//                         {(tasks).map((taskData) => (
//                             <TodoItem
//                                 taskData={taskData}
//                                 key={taskData.id}
//                                 updateTodos={updateTodos}
//                                 currentCategory={currentCategory}
//                             />
//                         ))}
//                     </section>
//                 )}
//             </section>
//         );
//     }
// };






// useEffect(() => {
//     setTimeout(() => {
//         setLoading(false);
//     }, 0);
// }, []);
// return (
//     <section className="tasks-category">
//         {
//             loading ? <p className="fallback-text">Loading...</p> :
//                 <section className={styles.tasks}>
//                     {(tasks).map((taskData) => (
//                         <TodoItem
//                             taskData={taskData}
//                             key={taskData.id}
//                             updateTodos={updateTodos}
//                             currentCategory={currentCategory}
//                         />
//                     ))}
//                 </section>
//         }