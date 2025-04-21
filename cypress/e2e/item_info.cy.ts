describe('item_info', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it('should show container item information', () => {
        cy.contains('Blade').click();

        cy.get('.w_slot_item:visible').click();
        cy.get(".sheet").first().click();
        cy.get('.sheet').first().rightclick();

        cy.get('.item_info:visible')
            .within(() => {
                cy.contains('SheetID: 5682734').should('be.visible');
                cy.contains('Quality: Q0').should('be.visible');
                cy.contains('Family: Big Shell').should('be.visible');
                cy.contains('Color: Turquoise').should('be.visible');
            });

        cy.get('.w_close_1:visible').click();
        cy.get('.item_info').should('not.be.visible');
    })
})
