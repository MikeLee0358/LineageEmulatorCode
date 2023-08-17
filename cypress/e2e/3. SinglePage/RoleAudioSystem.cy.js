describe('Test Role Audio System', () => {
    beforeEach(() => {
        cy.login()
    })

    it('Male Royal Audio works?', () => {
        cy.get('.male.royal').click()
        cy.get('audio').invoke('attr', 'src').should('include', 'royal_audio.mp3')
    })

    it('Male Mage Audio works?', () => {
        cy.get('.male.mage').click()
        cy.get('audio').invoke('attr', 'src').should('include', 'mage_audio.mp3')
    })

    it('Male Knight Audio works?', () => {
        cy.get('.male.knight').click()
        cy.get('audio').invoke('attr', 'src').should('include', 'knight_audio.mp3')
    })

    it('Male Elf Audio works?', () => {
        cy.get('.male.elf').click()
        cy.get('audio').invoke('attr', 'src').should('include', 'elf_audio.mp3')
    })

    it('Male DarkElf Audio works?', () => {
        cy.get('.male.darkElf').click()
        cy.get('audio').invoke('attr', 'src').should('include', 'darkElf_audio.mp3')
    })

    it('Female Royal Audio works?', () => {
        cy.get('.female.royal').click()
        cy.get('audio').invoke('attr', 'src').should('include', 'royal_audio.mp3')
    })

    it('Female Mage Audio works?', () => {
        cy.get('.female.mage').click()
        cy.get('audio').invoke('attr', 'src').should('include', 'mage_audio.mp3')
    })

    it('Female Knight Audio works?', () => {
        cy.get('.female.knight').click()
        cy.get('audio').invoke('attr', 'src').should('include', 'knight_audio.mp3')
    })

    it('Female Elf Audio works?', () => {
        cy.get('.female.elf').click()
        cy.get('audio').invoke('attr', 'src').should('include', 'elf_audio.mp3')
    })

    it('Female DarkElf Audio works?', () => {
        cy.get('.female.darkElf').click()
        cy.get('audio').invoke('attr', 'src').should('include', 'darkElf_audio.mp3')
    })
})
