describe('Проверяем добавление ингредиентов в конструктор', () => {
  beforeEach(() => {
    // Настройка перехвата запросов на эндпоинт
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.viewport(1300, 800);
    cy.visit('http://localhost:4000');
  });

  it('Булка добавляется', () => {
    cy.get('[data-cy=bun-ingredients]').contains('Добавить').click();
    cy.get('[data-cy=constructor-bun-1]')
      .contains('Булка 1')
      .should('exist');
    cy.get('[data-cy=constructor-bun-2]')
      .contains('Булка 1')
      .should('exist');
  });

  it('Ингредиенты добавляются', () => {
    cy.get('[data-cy=mains-ingredients]').contains('Добавить').click();
    cy.get('[data-cy=sauces-ingredients]').contains('Добавить').click();
    cy.get('[data-cy=constructor-ingredients]')
      .contains('Начинка 1')
      .should('exist');
    cy.get('[data-cy=constructor-ingredients]')
      .contains('Соус 1')
      .should('exist');
  });
});

describe('Проверяем работу модальных окон', () => {
  beforeEach(() => {
    // Настройка перехвата запросов на эндпоинт
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.viewport(1300, 800);
    cy.visit('http://localhost:4000');
  });

  it('Модальное окно ингредиента открывается', () => {
    cy.contains('Детали ингредиента').should('not.exist');
    cy.contains('Начинка 9').click();
    cy.contains('Детали ингредиента').should('exist');
    cy.get('#modals').contains('Начинка 9').should('exist');
  });

  it('Модальное окно ингредиента закрывается по клику на крестик', () => {
    cy.contains('Начинка 9').click();
    cy.contains('Детали ингредиента').should('exist');
    cy.get('#modals button').click();
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
    cy.visit('http://localhost:4000');
  });

  afterEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  it('Бургер заказывается', () => {
    cy.get('[data-cy=bun-ingredients]').contains('Добавить').click();
    cy.get('[data-cy=mains-ingredients]').contains('Добавить').click();
    cy.get('[data-cy=sauces-ingredients]').contains('Добавить').click();
    cy.get('[data-cy=order-summ] button').click();
    cy.wait('@postOrder')
      .its('request.body')
      .should('deep.equal', {
        ingredients: ['1', '1', '2', '4']
      });
    cy.get('[data-cy=order-number]').contains('12345').should('exist');
    cy.get('#modals button').click();
    cy.get('[data-cy=order-number]').should('not.exist');
    cy.get('[data-cy=constructor]')
      .contains('Булка 1')
      .should('not.exist');
    cy.get('[data-cy=constructor]')
      .contains('Начинка 1')
      .should('not.exist');
    cy.get('[data-cy=constructor]')
      .contains('Соус 1')
      .should('not.exist');
  })
});