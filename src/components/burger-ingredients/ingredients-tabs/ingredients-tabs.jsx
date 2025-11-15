import styles from './ingredients-tabs.module.css';
import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'

const burgerTabs = [
  {
    title: 'Булки',
    value: 'bun'
  },
  {
    title: 'Соусы', 
    value: 'sauce'
  },
  {
    title: 'Начинки',
    value: 'main'
  },
]

function IngredientsTabs({ current, onTabClick }) {
  return (
    <div style={{ display: "flex" }} className={styles.indent}>
      {burgerTabs.map(({ title, value }) => (
        <Tab 
          value={value} 
          key={value} 
          active={current === value} 
          onClick={() => onTabClick(value)}
        >
          {title}
        </Tab>
      ))}
    </div>
  );
}

export default IngredientsTabs;