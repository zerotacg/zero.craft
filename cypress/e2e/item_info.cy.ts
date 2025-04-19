describe('item_info', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it('should show container item information', () => {
        cy.contains('Blade').click();

        cy.get('#mpftMpL').click();
        cy.get(".sheet").first().click();
        cy.get('#mpftMpL .sheet').rightclick();

        cy.get('.item_info').should('be.visible');
        cy.get('.w_close_1').click();
        cy.get('.item_info').should('not.be.visible');

        cy.get('#mpftMpL .sheet').rightclick();

        cy.get('.item_info:visible')
            .should('be.visible')
            .within(() => {
                cy.contains('SheetID:5682734').should('be.visible');
            });
    })

    it('should show item information when query parameter is set', () => {
        cy.visit('/?item_info=7813166')
        cy.get('.item_info .modal-dialog')
            .should('be.visible')
            .within(() => {
                cy.contains('SheetID: 7813166').should('be.visible');
            });

        cy.get('.btn-close').click();
        cy.url().should('not.include', 'item_info');
    })
})