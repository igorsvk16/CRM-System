import styles from './TodosFilter.module.css';

export default function TodosFilter({currentCategory, todoCounter, setCurrentCategory, updateTodos}) {

    async function handleChangeCategory(categoryName) {
        setCurrentCategory(categoryName);
        updateTodos(categoryName);
    }

    return (
        <div className={styles.todosCategories}>
                    <button
                        className={currentCategory === 'all' ? styles.todoCategoryActive : styles.todoCategory}
                        onClick={() => handleChangeCategory('all')}>
                        Все ({todoCounter.all})
                    </button>
                    <button
                        className={currentCategory === 'inWork' ? styles.todoCategoryActive : styles.todoCategory}
                        onClick={() => handleChangeCategory('inWork')}>
                        В работе ({todoCounter.inWork})
                    </button>
                    <button
                        className={currentCategory === 'completed' ? styles.todoCategoryActive : styles.todoCategory}
                        onClick={() => handleChangeCategory('completed')}>
                        Сделано ({todoCounter.completed})
                    </button>
        </div>
    )
}

