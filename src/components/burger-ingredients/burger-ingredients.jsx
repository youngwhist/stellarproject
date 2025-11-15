import styles from "./burger-ingredients.module.css";
import { useRef, useState } from "react";
import IngredientsTabs from "./ingredients-tabs/ingredients-tabs";
import IngredientsList from "./ingredients-list/ingredients-list";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";

function BurgerIngredients(props) {
  const [currentIngredient, setCurrentIngredient] = useState(null)
  const [currentTab, setCurrentTab] = useState('bun');
  const [isScrolling, setIsScrolling] = useState(false);
  
  const bunRef = useRef(null);
  const sauceRef = useRef(null);
  const mainRef = useRef(null);

  const categoryOrder = ['bun', 'sauce', 'main'];
  
  const groupedData = categoryOrder.map(category => {
    const ingredientsInCategory = props.data.filter(ingredient => ingredient.type === category);
    return [category, ingredientsInCategory];
  }).filter(([_, ingredients]) => ingredients.length > 0);

  const onIngredientClick = (ingredient) => {
    setCurrentIngredient(ingredient)
  }

  const scrollToSection = (sectionType) => {
    setIsScrolling(true);
    setCurrentTab(sectionType);
    
    const refs = {
      bun: bunRef,
      sauce: sauceRef,
      main: mainRef
    };
    
    if (refs[sectionType] && refs[sectionType].current) {
      refs[sectionType].current.scrollIntoView({ behavior: "smooth" });
    }
    
    setTimeout(() => {
      setIsScrolling(false);
    }, 300);
  };

  const handleTabChange = (tab) => {
    if (!isScrolling) {
      setCurrentTab(tab);
    }
  };

  return (
    <div className={styles.wrapper}>
      {currentIngredient && (
        <Modal onClose={() => setCurrentIngredient(null)}>
          <IngredientDetails ingredient={currentIngredient} />
        </Modal>
      )}
      <p className="text text_type_main-large">Соберите бургер</p>

      <IngredientsTabs current={currentTab} onTabClick={scrollToSection} />

      <IngredientsList
        onIngredientClick={onIngredientClick}
        ingredients={groupedData}
        currentTab={currentTab}
        onTabChange={handleTabChange}
        refs={{ bun: bunRef, sauce: sauceRef, main: mainRef }}
        isScrolling={isScrolling}
      />
    </div>
  );
}

export default BurgerIngredients;