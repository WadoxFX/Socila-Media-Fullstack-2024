describe('Login', () => {
  let fixtureData: TestUserValues

  before(() => {
    cy.fixture('user.json').then((data: TestUserValues) => {
      fixtureData = data
    })
  })

  it('Registration', () => {
    cy.signup(fixtureData)
  })

  after(() => {
    cy.delAccount(fixtureData)
  })
})
