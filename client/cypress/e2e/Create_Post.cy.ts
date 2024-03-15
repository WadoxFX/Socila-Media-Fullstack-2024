describe('Create Post', () => {
  let fixtureData: TestUserValues

  const post_content = 'Hello, this post was created to test the functionality of creating posts.'
  const post_comment = 'This comment tests the robot`s comment creation functionality.'

  before(() => {
    cy.fixture('user.json').then((data: TestUserValues) => {
      fixtureData = data
      cy.signup(data)
    })
  })

  it('Creating post', () => {
    cy.login(fixtureData)

    cy.get('[data-cy="creating_post"]').eq(0).click()
    cy.get('[data-cy="uploader"]').selectFile([
      'cypress/images/forest.jpg',
      'cypress/images/tree.jpg',
    ])

    cy.get('[data-cy="post_content"]').type(post_content)
    cy.get('[data-cy="createing_post_button"]').click()

    cy.get('[data-cy="profile"]').click()
    cy.get('[data-cy="post"]').eq(0).click()
    cy.get('[data-cy="content"]').contains(post_content)

    cy.get('[data-cy="like"]').click()
    cy.get('[data-cy="save"]').click()

    cy.get('[data-cy="write_comment"]').type(post_comment)
    cy.get('[data-cy="create_comment"]').click()

    cy.get('[data-cy="like_comment"]').click()
    cy.get('[data-cy="dislike"]').click()
    cy.get('[data-cy="lose"]').click()

    cy.get('[data-cy="del_comment"]').click()
    cy.get('[data-cy="del_post"]').click()

    cy.get('[data-cy="post"]').should('not.exist')
  })

  after(() => {
    cy.delAccount(fixtureData)
  })
})
