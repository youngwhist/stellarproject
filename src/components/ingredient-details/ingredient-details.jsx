import styles from "./ingredient-details.module.css";



function IngredientDetails({ingredient}) {

const relationship = {
  "Калории,ккал": ingredient.calories,
  "Белки, г": ingredient.proteins,
  "Жиры, г": ingredient.fat,
  "Углеводы, г": ingredient.carbohydrates
}

    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <p className="text text_type_main-large">Детали ингредиента</p>
        </div>
        <div className={styles.image}>
          <img src={ingredient.image_large} alt="" />
        </div>
        <p className="text text_type_main-medium">{ingredient.name}</p>
        <div className={styles.wrapper}>
          {Object.entries(relationship).map(([key, value]) => (
            <div key={key} className={styles.indicator}>
              <p className="text text_type_main-default text_color_inactive">
                {key}
              </p>
              <p className="text text_type_main-default text_color_inactive">
                {value}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
}

export default IngredientDetails