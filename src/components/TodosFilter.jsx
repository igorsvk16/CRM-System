import styles from '../App.module.css';

export default function TodosFilter({currentCategory, todoCounter, setCurrentCategory, updateTodos}) {

    async function handleChangeCategory(categoryName) {
        setCurrentCategory(categoryName);
        updateTodos(categoryName);
    }

    return (
        <div className={styles.tasksСategories}>
            {currentCategory === 'all' ? (
                <div className={styles.taskCategoryActive}>
                    <button onClick={() => handleChangeCategory('all')}>
                        <p>Все ({todoCounter.all})</p>
                    </button>
                </div>
            ) : (
                <div className={styles.taskCategory}>
                    <button onClick={() => handleChangeCategory('all')}>
                        <p>Все ({todoCounter.all})</p>
                    </button>
                </div>
            )}

            {currentCategory === 'inWork' ? (
                <div className={styles.taskCategoryActive}>
                    <button onClick={() => handleChangeCategory('inWork')}>
                        <p>В работе ({todoCounter.inWork})</p>
                    </button>
                </div>
            ) : (
                <div className={styles.taskCategory}>
                    <button onClick={() => handleChangeCategory('inWork')}>
                        <p>В работе ({todoCounter.inWork})</p>
                    </button>
                </div>
            )}

            {currentCategory === 'completed' ? (
                <div className={styles.taskCategoryActive}>
                    <button onClick={() => handleChangeCategory('completed')}>
                        <p>Сделано ({todoCounter.completed})</p>
                    </button>
                </div>
            ) : (
                <div className={styles.taskCategory}>
                    <button onClick={() => handleChangeCategory('completed')}>
                        <p>Сделано ({todoCounter.completed})</p>
                    </button>
                </div>
            )}
        </div>
    )
}

