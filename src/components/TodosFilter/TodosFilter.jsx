import styles from './TodosFilter.module.css';

export default function TodosFilter({currentCategory, todoCounter, setCurrentCategory, updateTodos}) {

    async function handleChangeCategory(categoryName) {
        setCurrentCategory(categoryName);
        updateTodos(categoryName);
    }

    return (
        <div className={styles.tasksCategories}>
                <div className={currentCategory === 'all' ? styles.taskCategoryActive : styles.taskCategory}>
                    <button onClick={() => handleChangeCategory('all')}>
                        Все ({todoCounter.all})
                    </button>
                </div>
                <div className={currentCategory === 'inWork' ? styles.taskCategoryActive : styles.taskCategory}>
                    <button onClick={() => handleChangeCategory('inWork')}>
                        В работе ({todoCounter.inWork})
                    </button>
                </div>
                <div className={currentCategory === 'completed' ? styles.taskCategoryActive : styles.taskCategory}>
                    <button onClick={() => handleChangeCategory('completed')}>
                        Сделано ({todoCounter.completed})
                    </button>
                </div>
        </div>
    )
}

