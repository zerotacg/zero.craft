describe('Crafting window', () => {
    beforeEach(() => {
        cy.visit('/')
        cy.contains('Blade').click();

        cy.get('.w_slot_item:visible').click();
        cy.get(".sheet").first().click();
    })

    it('should show stat preview', () => {
        cy.contains('Stat Preview').should('be.visible')
            .parent()
            .within(() => {
                cy.findByText('max:').next().contains('60');
                cy.findByText('avg:').next().contains('20.111');
                cy.findByText('Color:').next().contains('Turquoise');
                cy.findByText('Class:').next().contains('Basic');
            });
    })

    it('should show items', () => {
        cy.contains('Items inserted').should('be.visible')
            .parent()
            .within(() => {
                cy.contains('Blade');
                cy.get(".sheet")
                    .should('be.visible')
                    .and('have.attr', 'title', 'Fragment of Basic Big Shell')
                    .within(() => {
                        cy.get('.texture.bk_generic').should('be.visible');
                        cy.get('.texture.mp_shell').should('be.visible');
                        cy.get('.texture.pw_light').should('be.visible');
                    });
            });
    })
})
