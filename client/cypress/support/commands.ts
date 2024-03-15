declare namespace Cypress {
  interface Chainable {
    login: (user: Omit<TestUserValues, 'username' | 'surname'>) => void
    signup: (user: TestUserValues) => void
    delAccount: (user: Omit<TestUserValues, 'username' | 'surname'>) => void
  }
}

Cypress.Commands.add('signup', (props) => {
  cy.visit('/signup')
  cy.url().should('include', 'signup')

  cy.get('[data-cy="username"]').type(props.username).should('have.value', props.username)
  cy.get('[data-cy="surname"]').type(props.surname).should('have.value', props.surname)
  cy.get('[data-cy="email"]').type(props.email).should('have.value', props.email)
  cy.get('[data-cy="password"]').type(props.password).should('have.value', props.password)

  cy.get('[data-cy="sign up"]').contains('Sign up').click()
  return cy.wait(1000)
})

Cypress.Commands.add('login', (props) => {
  cy.visit('/login')
  cy.url().should('include', 'login')

  cy.get('[data-cy="email"]').type(props.email).should('have.value', props.email)
  cy.get('[data-cy="password"]').type(props.password).should('have.value', props.password)
  cy.get('[data-cy="log in"]').contains('Log in').click()
})

Cypress.Commands.add('delAccount', (props) => {
  cy.wait(1000)
  cy.request('POST', 'http://localhost:8080/auth/deleteAccount', { ...props }).then((res) =>
    expect(res.status).to.eq(204)
  )
})
