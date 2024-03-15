describe('Subscription', () => {
  const users: TestUserValues[] = [
    {
      username: 'user1',
      surname: 'testing',
      email: 'user1Fed4my6di@gmail.com',
      password: '3xSNFTr0owDr9fpPyuxK',
    },
    {
      username: 'user2',
      surname: 'testing',
      email: 'user2Fed4my6di@gmail.com',
      password: 'SHv86xhMjXrnfTSFVPPk',
    },
  ]

  before(() => {
    for (let i = 0; users.length > i; i++) {
      cy.request('POST', 'http://localhost:8080/auth/signup', {
        ...users[i],
      }).then((res) => expect(res.status).to.eq(201))
    }
  })

  it('Creating post', () => {
    cy.login(users[0])
    cy.get('[data-cy="Friends"]').click()
    cy.get('[data-cy="search_user"]')
      .type(`${users[1].username} ${users[1].surname}`)
      .should('have.value', `${users[1].username} ${users[1].surname}`)

    cy.get('[data-cy="search_user_button"]').click()
    cy.get('[data-cy="user"]').eq(0).click()

    cy.url().should('include', 'profile')
    cy.get('[data-cy="subscribe"]').click()
    cy.get('[data-cy="subscribe"]').should('not.exist')

    cy.get('[data-cy="add_friend"]').click()
    cy.get('[data-cy="add_friend"]').should('not.exist')
  })

  after(() => {
    for (let i = 0; users.length > i; i++) {
      cy.delAccount(users[i])
    }
  })
})
