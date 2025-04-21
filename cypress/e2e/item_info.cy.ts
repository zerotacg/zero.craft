describe('item_info', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it('should show container item information', () => {
        cy.contains('Magic Focus').click();

        cy.get('.w_slot_item:visible').click();
        cy.get(".sheet").first().click();
        cy.get('.sheet').first().rightclick();

        cy.get('.item_info:visible')
            .within(() => {
                cy.contains('SheetID: 5681454');
                cy.contains('Quality: Q0');
                cy.contains('Family: Beng Amber');
                cy.contains('Color: Purple');
                cy.contains('Def. Affliction Cast Speed')
                    .parent()
                    .within(() => {
                        cy.contains('60')
                    });

                cy.get("select").select("Jewel");

                cy.contains('Poison Protection')
                    .parent()
                    .within(() => {
                        cy.contains('60')
                    });
            });

        cy.get('.close').click();
        cy.get('.item_info').should('not.exist');
    })
})
