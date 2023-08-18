describe('Test Function System', () => {
    beforeEach(() => {
        cy.login()
        // eslint-disable-next-line cypress/no-force
        cy.get('.male.royal').click({force: true})
    })

    it('Role Window works?', () => {
        cy.get('.btnRole').click()
        cy.get('.uiStatus').should('exist')
        cy.get('.uiStatus > .close').click()
    })

    it('Magic Window works?', () => {
        cy.get('.btnMagic').click()
        cy.get('.uiMagic').should('exist')
        cy.get('.uiMagic > .close').click()
    })

    it('Items Window works?', () => {
        cy.get('.btnItem').click()
        cy.get('.uiItem').should('exist')
        cy.get('.uiItem > .close').click()
    })

    it('Relationship Window works?', () => {
        cy.get('.btnCommunity').click()
        cy.get('.uiCommunity').should('exist')
        cy.get('.uiCommunity > .close').click()
    })

    it('Music works?', () => {
        cy.get('.btnSetting').click()
        cy.get('span').should('have.text', '開')
        cy.get('.music').click()
        cy.get('span').should('have.text', '關')
    })

    it('Window works?', () => {
        cy.get('.btnSetting').click()
        cy.get('.uiOptions').should('exist')
        cy.get('.uiOptions > .close').click()
    })

    it('Restart Button works?', () => {
        cy.get('.btnLogout').click()
        cy.get('.restart').click()
        cy.url().should('include', '/roles')
    })

    it('Quit Button works?', () => {
        cy.get('.btnLogout').click()
        cy.get('.quit').click()
        cy.url().should('include', '/logout')
    })

    it('cancel button works?', () => {
        cy.get('.btnLogout').click()
        cy.get('.cancel').click()
        cy.get('uiSystem').should('not.exist')
    })

    it('window works?', () => {
        cy.get('.btnLogout').click()
        cy.get('.uiSystem').should('exist')
        cy.get('.uiSystem > .close').click()
    })

    it('Help Window works?', () => {
        cy.get('.btnHelp').click()
        cy.get('.uiHelp').should('exist')
        cy.get('.uiHelp > .close').click()
    })
})
