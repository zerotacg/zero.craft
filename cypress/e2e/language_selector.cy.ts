describe('Language Selector', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it('should be able to switch to english', () => {
        cy.get('[title="English"]').click()
        cy.contains('English').should('be.visible')
        cy.contains('Select Item Slots').should('be.visible')
    })

    it('should be able to switch to german', () => {
        cy.get('[title="Deutsch"]').click()
        cy.contains('Deutsch').should('be.visible')
        cy.contains('Slots auswählen').should('be.visible')
    })

    it('should be able to switch to french', () => {
        cy.get('[title="Français"]').click()
        cy.contains('Français').should('be.visible')
    })
})
