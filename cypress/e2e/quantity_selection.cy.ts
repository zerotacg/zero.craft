describe('Quantity Selection', () => {
    beforeEach(() => {
        cy.visit('/')

        cy.contains('Blade').click();

        cy.get('.w_slot_item:visible').click();
        cy.get(".sheet").first().click();
    })

    it('should be change quantity', () => {
        cy.contains('Items inserted').should('be.visible')
            .parent()
            .within(() => {
                cy.get('.sheet')
                    .within(() => {
                        cy.contains('.quantity', '1')
                    })
                    .click()
                ;
            });

        cy.contains('Select Quantity')
            .parents('.modal')
            .within(() => {
                cy.get('input[type=number]').type('5')
                cy.contains('button', 'ok').click()
            })

        cy.contains('Items inserted')
            .parent()
            .within(() => {
                cy.get(".sheet")
                    .within(() => {
                        cy.contains('.quantity', '5')
                    })
                    .click()
                ;
            });

        cy.contains('div:visible', 'Select Quantity')
            .parent()
            .within(() => {
                cy.contains('button', 'remove').click()
            })

        cy.contains('Items inserted')
            .parent()
            .within(() => {
                cy.get(".sheet").should('not.exist');
            });
    })
})
