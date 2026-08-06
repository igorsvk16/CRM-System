import styles from './TodosFilter.module.css';

export default function TodosFilter({currentCategory, todoCounter, setCurrentCategory, updateTodos}) {

    async function handleChangeCategory(categoryName) {
        setCurrentCategory(categoryName);
        updateTodos(categoryName);
    }

    return (
        <div className={styles.tasksCategories}>
            {currentCategory === 'all' ? (
                <div className={styles.taskCategoryActive}>
                    <button onClick={() => handleChangeCategory('all')}>
                        Все ({todoCounter.all})
                    </button>
                </div>
            ) : (
                <div className={styles.taskCategory}>
                    <button onClick={() => handleChangeCategory('all')}>
                        Все ({todoCounter.all})
                    </button>
                </div>
            )}

            {currentCategory === 'inWork' ? (
                <div className={styles.taskCategoryActive}>
                    <button onClick={() => handleChangeCategory('inWork')}>
                        В работе ({todoCounter.inWork})
                    </button>
                </div>
            ) : (
                <div className={styles.taskCategory}>
                    <button onClick={() => handleChangeCategory('inWork')}>
                        В работе ({todoCounter.inWork})
                    </button>
                </div>
            )}

            {currentCategory === 'completed' ? (
                <div className={styles.taskCategoryActive}>
                    <button onClick={() => handleChangeCategory('completed')}>
                        Сделано ({todoCounter.completed})
                    </button>
                </div>
            ) : (
                <div className={styles.taskCategory}>
                    <button onClick={() => handleChangeCategory('completed')}>
                        Сделано ({todoCounter.completed})
                    </button>
                </div>
            )}
        </div>
    )
}

