describe('Edit profile', () => {
  let fixtureData: TestUserValues
  const update = {
    username: 'Update',
    surname: 'Updated',
    desc: 'This account was created for testing purposes only!',
  }

  before(() => {
    cy.fixture('user.json').then((data: TestUserValues) => {
      fixtureData = data
      cy.signup(data)
    })
  })

  it('Edit profile', () => {
    cy.login(fixtureData)
    cy.get('[data-cy="Setting"]').click()

    cy.get('[data-cy="upload"]').selectFile('cypress/images/test.png')
    cy.get('[data-cy="upload"]').contains('Selected')
    cy.get('[data-cy="username"]').clear().type(update.username)
    cy.get('[data-cy="surname"]').clear().type(update.surname)
    cy.get('[data-cy="desc"]').clear().type(update.desc)
    cy.get('[data-cy="updateProfile"]').click()
    cy.get('[data-cy="error"]').should('not.exist')

    cy.wait(1000)
    cy.get('[data-cy="profile"]').click()
    cy.get('[data-cy="profile_username"]').contains(update.username)
    cy.get('[data-cy="profile_surname"]').contains(update.surname)
    cy.get('[data-cy="desc"]').contains(update.desc)
  })

  after(() => {
    cy.delAccount(fixtureData)
  })
})
