describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:8080/#/sign-in')
    cy.get('[data-cy="email-input"]').type('test@email.com')
    cy.get('[data-cy="password-input"]').type('password')
    cy.get('[data-cy="sign-in-button"]').click()
    cy.wait(2000)
    let len;
    cy.get('[data-cy="picture-card"]').then(($cards) => {
      len = $cards.length
      cy.get('[data-cy="add-picture-button"]').click()
      cy.get('[data-cy="select-picture-input"]').selectFile('src/assets/background.png')
      cy.get('[data-cy="upload-button"]').click()
      cy.wait(2000)
      cy.get('[data-cy="picture-card"]').should('have.length', len+1)
    })
    

  })
})