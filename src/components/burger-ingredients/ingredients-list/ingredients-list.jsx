import styles from './ingredients-list.module.css';
import { useEffect, useRef } from 'react';
import IngredientCard from '../ingredient-card/ingredient-card';

function IngredientsList({onIngredientClick, ingredients, currentTab, onTabChange, refs, isScrolling }) {
  const listRef = useRef(null);
  
  const typeTranslation = {
    bun: 'Булки', 
    sauce: "Соусы", 
    main: "Начинки"
  };

  useEffect(() => {
    const listElement = listRef.current;
    if (!listElement) return;

    const handleScroll = () => {
      if (isScrolling) return;

      const containerTop = listElement.getBoundingClientRect().top;

      let closestSection = currentTab;
      let minDistance = Infinity;

      ingredients.forEach(([key]) => {
        if (refs[key] && refs[key].current) {
          const sectionTop = refs[key].current.getBoundingClientRect().top;
          const distance = Math.abs(sectionTop - containerTop - 50);
          
          if (distance < minDistance) {
            minDistance = distance;
            closestSection = key;
          }
        }
      });

      if (closestSection !== currentTab) {
        onTabChange(closestSection);
      }
    };

    listElement.addEventListener('scroll', handleScroll);
    
    return () => {
      listElement.removeEventListener('scroll', handleScroll);
    };
  }, [currentTab, onTabChange, refs, isScrolling, ingredients]);

  return (
    <div ref={listRef} className={styles.wrapper}>
      {ingredients.map(([key, value]) => (
        <div key={key} ref={refs[key]} className={styles.group}>
          <p className="text text_type_main-medium">
            {typeTranslation[key]}
          </p>
          <div className={styles.cards}>
            {value.map((ingredient) => (
              <IngredientCard onIngredientClick={onIngredientClick} key={ingredient._id} ingredient={ingredient} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default IngredientsList;