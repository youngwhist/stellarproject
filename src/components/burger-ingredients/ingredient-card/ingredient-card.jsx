import styles from "./ingredient-card.module.css";
import React from "react";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag } from "react-dnd";

export const ITEM_TYPE = "card";

function IngredientCard({ onIngredientClick, ingredient }) {
  const [, dragRef] = useDrag({
    type: ITEM_TYPE,
    item: ingredient ,
  });

  return (
    <div
      ref={dragRef}
      className={styles.card}
      onClick={() => onIngredientClick(ingredient)}
    >
      <img src={ingredient.image} alt={ingredient.name} />
      <div className={styles.priceline}>
        <p className="text text_type_main-medium">{ingredient.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className="text text_type_main-default">{ingredient.name}</p>
      <Counter count={1} size="default" extraClass="m-1" />
    </div>
  );
}

export default IngredientCard;
