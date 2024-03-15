describe('Login', () => {
  let fixtureData: TestUserValues

  before(() => {
    cy.fixture('user.json').then((data: TestUserValues) => {
      fixtureData = data
      cy.signup(data)
    })
  })

  it('Login', () => {
    cy.login(fixtureData)
    cy.get('[data-cy="profile"]').contains(fixtureData.username).click()
  })

  after(() => {
    cy.delAccount(fixtureData)
  })
})
