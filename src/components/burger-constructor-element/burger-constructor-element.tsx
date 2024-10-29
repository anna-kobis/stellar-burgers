import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { useDispatch } from '../../services/store';
import { constructorBurgerActions } from '@slices';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();

    const handleMoveDown = () => {
      dispatch(
        constructorBurgerActions.reorderIngredients({
          from: index,
          to: index + 1
        })
      );
    };

    const handleMoveUp = () => {
      dispatch(
        constructorBurgerActions.reorderIngredients({
          from: index,
          to: index - 1
        })
      );
    };

    const handleClose = () => {
      dispatch(constructorBurgerActions.removeIngredient(ingredient.id));
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
