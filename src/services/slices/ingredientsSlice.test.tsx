import { TIngredient } from '@utils-types';
import ingredientsReducer, { 
  getIngredients, 
  IngredientsState 
} from './ingredientsSlice';

const bunIngredient = {
  _id: '1',
  id: '1',
  name: 'Булка 1',
  type: 'bun',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
  __v: 0
};

const mainIngredient = {
  _id: '2',
  id: '2',
  name: 'Начинка 1',
  type: 'main',
  proteins: 420,
  fat: 142,
  carbohydrates: 242,
  calories: 4242,
  price: 424,
  image: 'https://code.s3.yandex.net/react/code/meat-01.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
  __v: 0
};

const sauceIngredient = {
  _id: '3',
  id: '3',
  name: 'Соус 1',
  type: 'sauce',
  proteins: 30,
  fat: 20,
  carbohydrates: 40,
  calories: 30,
  price: 90,
  image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
  __v: 0
};

const testIngredients: TIngredient[] = [
  bunIngredient,
  mainIngredient,
  sauceIngredient
]

describe('Тестирование ingredientsSlice', () => {
  const initialState: IngredientsState = {
    ingredients: [],
    loading: false,
    error: null
  };

  it('Обрабатывает начальное состояние', () => {
    expect(initialState).toEqual(initialState);
  });

  describe('Тестирование getIngredients', () => {
    it('Обработчик pending устанавливает корректное состояние', () => {
      const actualState = ingredientsReducer(initialState, { type: getIngredients.pending.type });
      expect(actualState).toEqual({ 
        ...initialState, 
        loading: true,
      });
    });

    it('Обработчик fulfilled устанавливает корректное состояние', () => {
      const actualState = ingredientsReducer(initialState, {
        type: getIngredients.fulfilled.type,
        payload: testIngredients
      });
      expect(actualState).toEqual({
        ...initialState,
        ingredients: testIngredients,
      });
    });

    it('Обработчик rejected устанавливает корректное состояние', () => {
      const errorMessage = 'Ошибка загрузки ингредиентов';
      const actualState = ingredientsReducer(initialState, {
        type: getIngredients.rejected.type,
        error: errorMessage
      });
      expect(actualState).toEqual({
        ...initialState,
        error: errorMessage
      });
    });
  });
});
