describe('Проверяем добавление ингредиентов в конструктор', () => {
  beforeEach(() => {
    // Настройка перехвата запросов на эндпоинт
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.viewport(1300, 800);
    cy.visit('http://localhost:4000');
  });

  it('Добавляется булка', () => {
    cy.get('[data-cy=bun-ingredients]').contains('Добавить').click();
    cy.get('[data-cy=constructor-bun-1]')
      .contains('Булка 1')
      .should('exist');
    cy.get('[data-cy=constructor-bun-2]')
      .contains('Булка 1')
      .should('exist');
  });

  it('Добавляются ингредиенты', () => {
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
    cy.get('[data-cy=button-close]').click();    
    cy.contains('Детали ингредиента').should('not.exist');
  });

  it('Модальное окно ингредиента закрывается по клику на оверлей', () => {
    cy.contains('Начинка 9').click();
    cy.contains('Детали ингредиента').should('exist');
    cy.get('[data-cy=modal-overlay]').click('left', { force: true });
    cy.contains('Детали ингредиента').should('not.exist');
  });
});
