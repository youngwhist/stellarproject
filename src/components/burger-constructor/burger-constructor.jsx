import styles from "./burger-constructor.module.css";
import React, { useState } from "react";
import { ConstructorElement, Button, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";

function BurgerConstructor({ data }) {
  const [identifier, setIdentifier] = useState(null)

  function generateIdentifier() {
    return Math.floor(Math.random() * 1000000)
      .toString()
      .padStart(6, "0");
  }
  return (
    <div className={styles.container}>
      {identifier && (
        <Modal onClose={() => setIdentifier(null)}>
          <OrderDetails identifier={identifier} />
        </Modal>
      )}

      <div className={styles.cards}>
        <div className={styles.wrapper} key={data[0]._id}>
          <ConstructorElement
            type={"top"}
            isLocked={true}
            text={`${data[0].name} (верх)`}
            price={data[0].price}
            thumbnail={data[0].image}
          />
        </div>
        <div className={styles.inners}>
        {data.map((el, index) => {
          const lastIndex = data.length - 1;
          return (
            <div className={styles.wrapper} key={el._id}>
              <div className={styles.icon}>
                <DragIcon type="primary" />
              </div>

              <ConstructorElement
                isLocked={false}
                text={el.name}
                price={el.price}
                thumbnail={el.image}
              />
            </div>
          );
        })}
        </div>

        <div className={styles.wrapper} key={data[0]._id}>
          <ConstructorElement
            type={"bottom"}
            isLocked={true}
            text={`${data[0].name} (низ)`}
            price={data[0].price}
            thumbnail={data[0].image}
          />
        </div>
        
      </div>
      <div className={styles.decorator}>
        <div className={styles.price}>
          <p className="text text_type_digits-medium">
            {data.reduce((acc, el) => acc + el.price, 0)}
          </p>
          <CurrencyIcon type="primary" className={styles.currency} />
        </div>
        <Button
          htmlType="button"
          type="primary"
          size="medium"
          onClick={() => {
            setIdentifier(generateIdentifier());
          }}
        >
          Оформить заказ
        </Button>
      </div>
    </div>
  );
}

export default BurgerConstructor;
