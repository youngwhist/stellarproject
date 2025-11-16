import styles from "./order-details.module.css";
import { } from '@ya.praktikum/react-developer-burger-ui-components'
import doneImage from '../../images/done.png';


function OrderDetails({identifier}) {

    return (
      <div className={styles.container}>
        <p className={`text text_type_digits-large ${styles.glow}`}>
          {identifier}
        </p>
        <p
          style={{ marginTop: "32px", marginBottom: "60px" }}
          className="text text_type_main-medium"
        >
          идентификатор заказа
        </p>
        <img src={doneImage} className={styles.done} alt="done" />
        <p
          style={{ marginTop: "60px" }}
          className="text text_type_main-default"
        >
          Ваш заказ начали готовить
        </p>
        <p
          style={{ marginTop: "8px" }}
          className="text text_type_main-default text_color_inactive"
        >
          Дождитесь готовности на орбитальной станции
        </p>
      </div>
    );
}

export default OrderDetails