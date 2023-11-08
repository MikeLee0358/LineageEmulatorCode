describe('Test Logout Role BGM System', () => {
    beforeEach(() => {
        cy.login()
    })

    it('Logout Male Royal BGM works?', () => {
        cy.get('.male.royal').click()

        cy.get('.btnLogout').click()
        cy.get('.quit').click()
        cy.get('video').invoke('attr', 'src').should('include', 'prince.mp4')
    })

    it('Logout Male Mage BGM works?', () => {
        cy.get('.male.mage').click()

        cy.get('.btnLogout').click()
        cy.get('.quit').click()
        cy.get('video').invoke('attr', 'src').should('include', 'classic.mp4')
    })

    it('Logout Male Knight BGM works?', () => {
        cy.get('.male.knight').click()

        cy.get('.btnLogout').click()
        cy.get('.quit').click()
        cy.get('video').invoke('attr', 'src').should('include', 'classic.mp4')
    })

    it('Logout Male Elf BGM works?', () => {
        cy.get('.male.elf').click()

        cy.get('.btnLogout').click()
        cy.get('.quit').click()
        cy.get('video').invoke('attr', 'src').should('include', 'classic.mp4')
    })

    it('Logout Male DarkElf BGM works?', () => {
        cy.get('.male.darkElf').click()

        cy.get('.btnLogout').click()
        cy.get('.quit').click()
        cy.get('video').invoke('attr', 'src').should('include', 'classic.mp4')
    })

    it('Logout Female Royal BGM works?', () => {
        cy.get('.female.royal').click()

        cy.get('.btnLogout').click()
        cy.get('.quit').click()
        cy.get('video').invoke('attr', 'src').should('include', 'classic.mp4')
    })

    it('Logout Female Mage BGM works?', () => {
        cy.get('.female.mage').click()

        cy.get('.btnLogout').click()
        cy.get('.quit').click()
        cy.get('video').invoke('attr', 'src').should('include', 'classic.mp4')
    })

    it('Logout Female Knight BGM works?', () => {
        cy.get('.female.knight').click()

        cy.get('.btnLogout').click()
        cy.get('.quit').click()
        cy.get('video').invoke('attr', 'src').should('include', 'classic.mp4')
    })

    it('Logout Female Elf BGM works?', () => {
        cy.get('.female.elf').click()

        cy.get('.btnLogout').click()
        cy.get('.quit').click()
        cy.get('video').invoke('attr', 'src').should('include', 'classic.mp4')
    })

    it('Logout Female DarkElf BGM works?', () => {
        cy.get('.female.darkElf').click()

        cy.get('.btnLogout').click()
        cy.get('.quit').click()
        cy.get('video').invoke('attr', 'src').should('include', 'classic.mp4')
    })
})
