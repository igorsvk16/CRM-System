import styles from '../App.module.css';

export default function TodosFilter({currentCategory, handleChangeCategory, numberOfAllTasks,
                                    numberOfInWorkTasks, numberOfCompletedTasks}) {


    return (
        <div className={styles.tasksСategories}>
            {currentCategory === 'all' ? (
                <div className={styles.taskCategoryActive}>
                    <button onClick={() => handleChangeCategory('all')}>
                        <p>Все ({numberOfAllTasks})</p>
                    </button>
                </div>
            ) : (
                <div className={styles.taskCategory}>
                    <button onClick={() => handleChangeCategory('all')}>
                        <p>Все ({numberOfAllTasks})</p>
                    </button>
                </div>
            )}

            {currentCategory === 'inWork' ? (
                <div className={styles.taskCategoryActive}>
                    <button onClick={() => handleChangeCategory('inWork')}>
                        <p>В работе ({numberOfInWorkTasks})</p>
                    </button>
                </div>
            ) : (
                <div className={styles.taskCategory}>
                    <button onClick={() => handleChangeCategory('inWork')}>
                        <p>В работе ({numberOfInWorkTasks})</p>
                    </button>
                </div>
            )}

            {currentCategory === 'completed' ? (
                <div className={styles.taskCategoryActive}>
                    <button onClick={() => handleChangeCategory('completed')}>
                        <p>Сделано ({numberOfCompletedTasks})</p>
                    </button>
                </div>
            ) : (
                <div className={styles.taskCategory}>
                    <button onClick={() => handleChangeCategory('completed')}>
                        <p>Сделано ({numberOfCompletedTasks})</p>
                    </button>
                </div>
            )}
        </div>
    )
}

