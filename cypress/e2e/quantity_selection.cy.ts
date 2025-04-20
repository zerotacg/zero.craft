describe('Quantity Selection', () => {
    beforeEach(() => {
        cy.visit('/')

        cy.contains('Blade').click();

        cy.get('#mpftMpL').click();
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

        cy.contains('Select Quantity').should('be.visible')
            .parent()
            .within(() => {
                cy.get('input[type=text]').type('5')
                cy.get('input[value=ok]').click()
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

        cy.contains('Select Quantity')
            .parent()
            .within(() => {
                cy.get('input[value=remove]').click()
            })

        cy.contains('Items inserted')
            .parent()
            .within(() => {
                cy.get(".sheet").should('not.exist');
            });
    })
})
