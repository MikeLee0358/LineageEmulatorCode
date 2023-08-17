describe('Test Scroll System', () => {
    beforeEach(() => {
        cy.login()
        cy.get('.male.royal').click()
    })

    it('Armor Scroll not works to Weapon?', () => {
        cy.get('.F6 > img').click()
        cy.get('.weapon').click().invoke('attr', 'data-displayequipinfo').should('include', '+0')
    })

    it('Weapon Scroll not works to Armor?', () => {
        cy.get('.F10 > img').click()
        cy.get('.helmet').click().invoke('attr', 'data-displayequipinfo').should('include', '+0')
    })

    it('F5 Auto Scroll Stop works?', () => {
        cy.get('.F6 > img').click()
        cy.get('.uiChat > :nth-child(7)').should('have.text', '請選擇一種防具。')
        cy.get('.F5 > img').click()
        cy.get('.helmet').invoke('attr', 'data-displayequipinfo').should('include', '+0')
    })

    it('F6 White Scroll Armor works?', () => {
        cy.get('.F6 > img').click()
        cy.get('.helmet').click().invoke('attr', 'data-displayequipinfo').should('include', '+1')
    })

    it('F7 Blessed Scroll Armor works?', () => {
        cy.get('.F7 > img').click()
        cy.get('.helmet')
            .click()
            .invoke('attr', 'data-displayequipinfo')
            .then((data) => {
                const value = Number(data[1])

                cy.wrap(value).should('be.lessThan', 4)
            })
    })

    it('F8 Cursed Scroll Armor works?', () => {
        cy.get('.F8 > img').click()
        cy.get('.helmet').click().invoke('attr', 'data-displayequipinfo').should('include', '-1')
    })

    it('F9 Auto Scroll Stop works?', () => {
        cy.get('.F10 > img').click()
        cy.get('.uiChat > :nth-child(7)').should('have.text', '請選擇一種武器。')
        cy.get('.F9 > img').click()
        cy.get('.weapon').invoke('attr', 'data-displayequipinfo').should('include', '+0')
    })

    it('F10 White Scroll Weapon works?', () => {
        cy.get('.F10 > img').click()
        cy.get('.weapon').click().invoke('attr', 'data-displayequipinfo').should('include', '+1')
    })

    it('F11 Blessed Scroll Weapon works?', () => {
        cy.get('.F11 > img').click()
        cy.get('.weapon')
            .click()
            .invoke('attr', 'data-displayequipinfo')
            .then((data) => {
                const value = Number(data[1])

                cy.wrap(value).should('be.lessThan', 4)
            })
    })

    it('F12 Cursed Scroll Weapon works?', () => {
        cy.get('.F12 > img').click()
        cy.get('.weapon').click().invoke('attr', 'data-displayequipinfo').should('include', '-1')
    })
})
