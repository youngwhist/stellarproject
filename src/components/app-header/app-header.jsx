import styles from './app-header.module.css';
import React from 'react';
import { Logo, BurgerIcon, ProfileIcon, ListIcon } from '@ya.praktikum/react-developer-burger-ui-components'

function AppHeader(props) {

    return (
        <header className={styles.wrapper}>
            <div className={styles.container}>
                <nav className={styles.navigation}>
                    <div className={styles.btn}>
                        <BurgerIcon type="primary" />
                        <p className="text text_type_main-default">
                            Конструктор
                        </p>
                    </div>
                    <div className={styles.btn}>
                        <ListIcon type="secondary" />
                        <p className="text text_type_main-default text_color_inactive">
                            Лента заказов
                        </p>
                    </div>
                </nav>
                
                <div className={styles.logo}>
                    <Logo />
                </div>
                
                <div className={styles.profile}>
                    <div className={styles.btn}>
                        <ProfileIcon type="secondary" />
                        <p className="text text_type_main-default text_color_inactive">
                            Личный кабинет
                        </p>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default AppHeader