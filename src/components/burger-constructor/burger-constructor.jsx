import styles from "./burger-constructor.module.css";
import {
  ConstructorElement,
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { useSelector, useDispatch } from "react-redux";
import {
  ADD_INGREDIENT,
  SET_BUN,
} from "../../services/actions/burger-ingridients";
import { useDrop } from "react-dnd";
import { ITEM_TYPE } from "../burger-ingredients/ingredient-card/ingredient-card";
import { IngredientItem } from "./ingredient-item/ingredient-item";
import { v4 as uuidv4 } from "uuid";
import { getOrder, REMOVE_IDENTIFIER } from "../../services/actions/order";

function BurgerConstructor() {
  const { identifier } = useSelector((store) => store.order);

  const dispatch = useDispatch();

  const { ingredients, bun } = useSelector((store) => store.burgerIngredients);

  function groupIngredientsId(bun, ingredients) {
    const innerIds = ingredients.map((el) => el._id);

    return {
      ingredients: [bun?._id, ...innerIds, bun?._id],
    };
  }

  function onDrop(item) {
    if (item.type === "bun") {
      dispatch({ type: SET_BUN, payload: item });
    } else {
      dispatch({
        type: ADD_INGREDIENT,
        payload: { ...item, uuid: uuidv4() },
      });
    }
  }

  const [, dropRef] = useDrop({
    accept: ITEM_TYPE,
    drop: (item) => onDrop(item),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  function resetIndicator() {
    dispatch({ type: REMOVE_IDENTIFIER });
  }

  return (
    <div className={styles.container} ref={dropRef}>
      {identifier && (
        <Modal onClose={resetIndicator}>
          <OrderDetails identifier={identifier} />
        </Modal>
      )}

      <div className={styles.cards}>
        <div className={styles.wrapper} key={bun && `${bun?._id}-top`}>
          <ConstructorElement
            type={"top"}
            isLocked={true}
            text={`${bun && bun.name} (верх)`}
            price={bun && bun.price}
            thumbnail={bun && bun.image}
          />
        </div>
        <div className={styles.inners}>
          {ingredients.map((el, index) => (
            <IngredientItem key={el.uuid} el={el} index={index} />
          ))}
        </div>

        <div className={styles.wrapper} key={bun && `${bun?._id}-bottom`}>
          <ConstructorElement
            type={"bottom"}
            isLocked={true}
            text={`${bun && bun.name} (низ)`}
            price={bun && bun.price}
            thumbnail={bun && bun.image}
          />
        </div>
      </div>
      <div className={styles.decorator}>
        <div className={styles.price}>
          <p className="text text_type_digits-medium">
            {ingredients.reduce(
              (acc, el) => acc + el.price,
              bun ? bun.price : 0
            )}
          </p>
          <CurrencyIcon type="primary" className={styles.currency} />
        </div>
        <Button
          htmlType="button"
          type="primary"
          size="medium"
          onClick={() => {
            dispatch(getOrder(groupIngredientsId(bun, ingredients)));
          }}
        >
          Оформить заказ
        </Button>
      </div>
    </div>
  );
}

export default BurgerConstructor;
