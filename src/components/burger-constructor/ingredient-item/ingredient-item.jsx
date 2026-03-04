import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ingredient-item.module.css";
import { useDispatch } from "react-redux";
import {
  MOVE_INGREDIENT,
  REMOVE_INGREDIENT,
} from "../../../services/actions/burger-ingridients";

export function IngredientItem({ el, index }) {
  const dispatch = useDispatch();
  const ref = useRef(null);

  const [{ isDragging }, dragRef] = useDrag({
    type: "constructor-item",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, dropRef] = useDrop({
    accept: "constructor-item",
    hover(item) {
      if (!ref.current) return;

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) return;

      dispatch({
        type: MOVE_INGREDIENT,
        payload: {
          fromIndex: dragIndex,
          toIndex: hoverIndex,
        },
      });

      item.index = hoverIndex;
    },
  });

  dragRef(dropRef(ref));

  return (
    <div
      ref={ref}
      className={styles.wrapper}
      style={{ opacity: isDragging ? 0.3 : 1 }}
    >
      <div className={styles.icon}>
        <DragIcon type="primary" />
      </div>

      <ConstructorElement
        isLocked={false}
        text={el.name}
        price={el.price}
        thumbnail={el.image}
        handleClose={() =>
          dispatch({
            type: REMOVE_INGREDIENT,
            payload: el.uuid,
          })
        }
      />
    </div>
  );
}
