import React, { useEffect } from "react";
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { useDispatch, useSelector } from "react-redux";
import { getIngredients } from "../../services/actions/ingredients";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  const dispatch = useDispatch();

  const { items, loading, error } = useSelector((state) => state.ingredients);

  useEffect(() => {
    dispatch(getIngredients());

    const abortController = new AbortController();

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
          !loading &&
          items?.length > 0 && (
            <section className={styles.wrapper}>
              <DndProvider backend={HTML5Backend}>
                <BurgerIngredients data={items || []} />
                <BurgerConstructor data={items || []} />
              </DndProvider>
            </section>
          )
        )}
      </main>
    </div>
  );
}

export default App;
