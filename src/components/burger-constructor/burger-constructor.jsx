import styles from "./burger-constructor.module.css";
import React, { useState } from "react";
import { ConstructorElement, Button, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";

const constructorData = [
  {
    _id: "643d69a5c3f7b9001cfa093c",
    image: "https://code.s3.yandex.net/react/code/bun-02.png",
    name: "Краторная булка N-200i",
    price: 1255,
  },
  {
    _id: "643d69a5c3f7b9001cfa0944",
    image: "https://code.s3.yandex.net/react/code/sauce-03.png",
    name: "Соус традиционный галактический ",
    price: 15,
  },
  {
    _id: "643d69a5c3f7b9001cfa093f",
    image: "https://code.s3.yandex.net/react/code/meat-02.png",
    name: "Мясо бессмертных моллюсков Protostomia",
    price: 1337,
  },
  {
    _id: "643d69a5c3f7b9001cfa0947",
    image: "https://code.s3.yandex.net/react/code/sp_1.png",
    name: "Плоды Фалленианского дерева",
    price: 874,
  },
  {
    _id: "643d69a5c3f7b9001cfa0946",
    image: "https://code.s3.yandex.net/react/code/mineral_rings.png",
    name: "Хрустящие минеральные кольца",
    price: 300,
  },
  {
    _id: "643d69a5c3f7b9001cfa0946",
    image: "https://code.s3.yandex.net/react/code/mineral_rings.png",
    name: "Хрустящие минеральные кольца",
    price: 300,
  },
  {
    _id: "643d69a5c3f7b9001cfa093c",
    image: "https://code.s3.yandex.net/react/code/bun-02.png",
    name: "Краторная булка N-200i",
    price: 1255,
  },
];

function BurgerConstructor(props) {
  const [identifier, setIdentifier] = useState(null)

  function generateIdentifier() {
    return Math.floor(Math.random() * 1000000)
      .toString()
      .padStart(6, "0");
  }
  return (
    <div className={styles.container}>
      {identifier && <Modal onClose={() => setIdentifier(null)}><OrderDetails identifier={identifier}/></Modal>}

      <div className={styles.cards}>
        {constructorData.map((el, index) => {
          const lastIndex = constructorData.length - 1;
          return (
            <div className={styles.wrapper}>
              {index === 0 || index === lastIndex ? null : (
                <div className={styles.icon}>
                  <DragIcon type="primary" />
                </div>
              )}
              <ConstructorElement
                type={index === 0 ? "top" : index === lastIndex ? "bottom" : ""}
                isLocked={index === 0 || index === lastIndex}
                text={
                  index === 0
                    ? `${el.name} (верх)`
                    : index === lastIndex
                    ? `${el.name} (низ)`
                    : el.name
                }
                price={el.price}
                thumbnail={el.image}
                key={el._id}
              />
            </div>
          );
        })}
      </div>
      <div className={styles.decorator}>
        <div className={styles.price}>
          <p className="text text_type_digits-medium">
            {constructorData.reduce((acc, el) => acc + el.price, 0)}
          </p>
          <CurrencyIcon type="primary" className={styles.currency} />
        </div>
        <Button htmlType="button" type="primary" size="medium" onClick={() => {setIdentifier(generateIdentifier())}}> 
          Оформить заказ
        </Button>
      </div>
    </div>
  );
}

export default BurgerConstructor;
