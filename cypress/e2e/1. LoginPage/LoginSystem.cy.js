describe('Test Login System', () => {
    it('Login Button works?', () => {
        cy.login()
        cy.url().should('include', '/roles')
    })
})
