describe('Test Choose Roles System', () => {
    beforeEach(() => {
        cy.login()
        cy.url().should('includes', '/roles')
    })

    it('Choose Audio works?', () => {
        cy.get('audio').invoke('attr', 'src').should('include', 'rolesPage_audio.mp3')
    })

    it('Choose Male Royal works?', () => {
        cy.get('.male.royal').click()
        cy.url().should('include', '/male/royal')
    })

    it('Choose Male Knight works?', () => {
        cy.get('.male.knight').click()
        cy.url().should('include', '/male/knight')
    })

    it('Choose Male Elf works?', () => {
        cy.get('.male.elf').click()
        cy.url().should('include', '/male/elf')
    })

    it('Choose Male DarkElf works?', () => {
        cy.get('.male.darkElf').click()
        cy.url().should('include', '/male/darkElf')
    })

    it('Choose Male Mage works?', () => {
        cy.get('.male.mage').click()
        cy.url().should('include', '/male/mage')
    })

    it('Choose Female Royal works?', () => {
        cy.get('.female.royal').click()
        cy.url().should('include', '/female/royal')
    })

    it('Choose Female Knight works?', () => {
        cy.get('.female.knight').click()
        cy.url().should('include', '/female/knight')
    })

    it('Choose Female Elf works?', () => {
        cy.get('.female.elf').click()
        cy.url().should('include', '/female/elf')
    })

    it('Choose Female DarkElf works?', () => {
        cy.get('.female.darkElf').click()
        cy.url().should('include', '/female/darkElf')
    })

    it('Choose Female Mage works?', () => {
        cy.get('.male.mage').click()
        cy.url().should('include', '/male/mage')
    })
})
