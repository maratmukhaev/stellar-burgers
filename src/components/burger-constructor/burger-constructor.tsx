import { FC, useMemo, useState } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { TConstructorIngredient, TOrder } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import {
  loadingSelector,
  ingredientsSelector,
  orderBurger
} from '../../services/slices/burgerConstructorSlice';
import { userSelector } from '../../services/slices/userSlice';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const ingredients = useSelector(ingredientsSelector);
  const orderRequest = useSelector(loadingSelector);
  const user = useSelector(userSelector);
  const [orderModalData, setOrderModalData] = useState<TOrder | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const constructorItems = useMemo(
    () => ({
      bun: ingredients.find((item) => item.type === 'bun'),
      ingredients: ingredients.filter((item) => item.type !== 'bun')
    }),
    [ingredients]
  );

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (!user) return navigate('/login');

    const ingredients = [
      constructorItems.bun._id,
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((item) => item._id)
    ];

    dispatch(orderBurger(ingredients))
      .unwrap()
      .then((response) => setOrderModalData(response.order))
      .catch((err) => console.log('Ошибка при оформлении заказа:', err));
  };

  const closeOrderModal = () => {
    setOrderModalData(null);
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
