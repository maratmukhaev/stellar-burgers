const bunIngredientsSelector = '[data-cy=bun-ingredients]';
const mainsIngredientsSelector = '[data-cy=mains-ingredients]';
const saucesIngredientsSelector = '[data-cy=sauces-ingredients]';
const constructorIngredientsSelector = '[data-cy=constructor-ingredients]';
const constructorSelector = '[data-cy=constructor]';
const orderNumberSelector = '[data-cy=order-number]';
const modalSelector = '#modals';

describe('Проверяем добавление ингредиентов в конструктор', () => {
  beforeEach(() => {
    // Настройка перехвата запросов на эндпоинт
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.viewport(1300, 800);
    cy.visit('/');
  });

  it('Булка добавляется', () => {
    cy.get(bunIngredientsSelector).as('bun');

    cy.get('@bun').contains('Добавить').click();
    cy.get('[data-cy=constructor-bun-1]')
      .contains('Булка 1')
      .should('exist');
    cy.get('[data-cy=constructor-bun-2]')
      .contains('Булка 1')
      .should('exist');
  });

  it('Ингредиенты добавляются', () => {
    cy.get(mainsIngredientsSelector).as('mains');
    cy.get(saucesIngredientsSelector).as('sauces');

    cy.get('@mains').contains('Добавить').click();
    cy.get('@sauces').contains('Добавить').click();

    cy.get(constructorIngredientsSelector).as('constructorIngredients');
    cy.get('@constructorIngredients')
      .contains('Начинка 1')
      .should('exist');
    cy.get('@constructorIngredients')
      .contains('Соус 1')
      .should('exist');
  });
});

describe('Проверяем работу модальных окон', () => {
  beforeEach(() => {
    // Настройка перехвата запросов на эндпоинт
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.viewport(1300, 800);
    cy.visit('/');
  });

  it('Модальное окно ингредиента открывается', () => {
    cy.contains('Детали ингредиента').should('not.exist');
    cy.contains('Начинка 9').click();
    cy.contains('Детали ингредиента').should('exist');
    cy.get(modalSelector).contains('Начинка 9').should('exist');
  });

  it('Модальное окно ингредиента закрывается по клику на крестик', () => {
    cy.contains('Начинка 9').click();
    cy.contains('Детали ингредиента').should('exist');
    cy.get(`${modalSelector} button`).click();
    cy.contains('Детали ингредиента').should('not.exist');
  });

  it('Модальное окно ингредиента закрывается по клику на оверлей', () => {
    cy.contains('Начинка 9').click();
    cy.contains('Детали ингредиента').should('exist');
    cy.get('[data-cy=modal-overlay]').click('left', { force: true });
    cy.contains('Детали ингредиента').should('not.exist');
  });
});

describe('Проверяем создание заказа', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as('ingredients');
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
    cy.intercept('POST', 'api/orders', { fixture: 'post_order.json' }).as('postOrder');
    
    window.localStorage.setItem('refreshToken', JSON.stringify('test-refreshToken'));
    cy.setCookie('accessToken', 'test-accessToken');
    
    cy.viewport(1300, 800);
    cy.visit('/');
  });

  afterEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  it('Бургер заказывается', () => {
    cy.get(bunIngredientsSelector).contains('Добавить').click();
    cy.get(mainsIngredientsSelector).contains('Добавить').click();
    cy.get(saucesIngredientsSelector).contains('Добавить').click();
    cy.get('[data-cy=order-summ] button').click();
    cy.wait('@postOrder')
      .its('request.body')
      .should('deep.equal', {
        ingredients: ['1', '1', '2', '4']
      });
    cy.get(orderNumberSelector).as('orderNumber');
    cy.get('@orderNumber').contains('12345').should('exist');
    cy.get(`${modalSelector} button`).click();
    cy.get('@orderNumber').should('not.exist');
    cy.get(constructorSelector).as('constructor');
    cy.get('@constructor')
      .contains('Булка 1')
      .should('not.exist');
    cy.get('@constructor')
      .contains('Начинка 1')
      .should('not.exist');
    cy.get('@constructor')
      .contains('Соус 1')
      .should('not.exist');
  })
});
