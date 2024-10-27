import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { ingredientsSelectors } from '@selectors';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';

export const IngredientDetails: FC = () => {
  const ingredients = useSelector(ingredientsSelectors.selectIngredients);
  const { id } = useParams<{ id: string }>();

  const ingredientData = ingredients.find((ing) => ing._id === id);

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
