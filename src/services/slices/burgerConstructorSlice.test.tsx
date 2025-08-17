import burgerConstructorReducer, {
  BurgerConstructorState,
  addIngredient,
  deleteIngredient,
  moveIngredient
} from './burgerConstructorSlice';

const bunIngredient1 = {
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

const bunIngredient2 = {
  _id: '2',
  id: '2',
  name: 'Булка 2',
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
  _id: '3',
  id: '3',
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
  _id: '4',
  id: '4',
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

describe('Тестирование редьюсера burgerConstructorSlice', () => {
  const initialState: BurgerConstructorState = {
    ingredients: [],
    loading: false,
    error: null
  };

  it('Добавляет булку', () => {
    const newState = burgerConstructorReducer(initialState, addIngredient(bunIngredient1));
    expect(newState.ingredients).toHaveLength(2);
    expect(newState.ingredients).toEqual([bunIngredient1, bunIngredient1]);
  });

  it('Заменяет одну булку на другую', () => {
    const stateWithBun: BurgerConstructorState = {
      ...initialState,
      ingredients: [bunIngredient1, bunIngredient1],
    };
    const newState = burgerConstructorReducer(stateWithBun, addIngredient(bunIngredient2));
    expect(newState.ingredients).toHaveLength(2);
    expect(newState.ingredients).toEqual([bunIngredient2, bunIngredient2]);
  });

  it('Удаляет ингредиент', () => {
    const stateWithIngredients: BurgerConstructorState = {
      ...initialState,
      ingredients: [mainIngredient, sauceIngredient],
    };
    const newState = burgerConstructorReducer(stateWithIngredients, deleteIngredient(sauceIngredient.id));
    expect(newState.ingredients).toEqual([mainIngredient]);
  });

  it('Изменяет порядок ингредиентов', () => {
    const stateWithIngredients: BurgerConstructorState = {
      ...initialState,
      ingredients: [mainIngredient, sauceIngredient]
    };
    const newState = burgerConstructorReducer(stateWithIngredients, moveIngredient({ id: sauceIngredient.id, direction: 'up' }));
    expect(newState.ingredients).toEqual([sauceIngredient, mainIngredient]);
  });
});
