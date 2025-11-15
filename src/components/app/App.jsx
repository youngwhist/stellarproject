import React, { useState, useEffect } from 'react';
import styles from './app.module.css';
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";

const apiUrl = 'https://norma.education-services.ru/api';

function App() {
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();
    
    const getIngredients = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`${apiUrl}/ingredients`, {
          signal: abortController.signal
        });

        if (!response.ok) {
          throw new Error(`Ошибка, статус: ${response.status}`);
        }

        const data = await response.json();

        if (!data.success) {
          throw new Error('Не удалось загрузить ингредиенты');
        }

        setIngredients(data.data);
        setLoading(false);
        setError(null);

      } catch (error) {
        if (error.name !== 'AbortError') {
          setLoading(false);
          setError(error.message || 'Произошла неизвестная ошибка');
        }
      }
    };

    getIngredients();
    
    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <div>
      <header>
        <AppHeader />
      </header>
      <main>
        {loading ? (
          <p className="text text_type_main-medium">Загрузка...</p>
        ) : error ? (
          <div>
            <p className="text text_type_main-medium">{error}</p>
          </div>
        ) : (
          <section className={styles.wrapper}>
            <BurgerIngredients data={ingredients} />
            <BurgerConstructor />
          </section>
        )}
      </main>
    </div>
  );
}

export default App;