describe('Crafting window', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it('84% Amp Recipe 1', () => {
        cy.contains('Shaft').click();
        cy.contains('Grip').click();
        cy.contains('Magic Focus').click();

        addMaterial('Shaft', 'Handful of Basic Adriel Bark');
        addMaterial('Shaft', 'Handful of Basic Beckers Bark');
        addMaterial('Shaft', 'Handful of Fine Oath Bark');
        addMaterial('Shaft', 'Handful of Choice Race Perfling Bark', 2);

        addMaterial('Grip', 'Basic Anete Fiber', 2);
        addMaterial('Grip', 'Fine Dzao Fiber', 3);

        addMaterial('Magic Focus', 'Excellent Race Zun Amber', 10);

        cy.contains('Stat Preview').should('be.visible')
            .parent()
            .within(() => {
                cy.contains('max: 65');
                cy.contains('avg: 50');
                cy.contains('Color: Blue');
                cy.contains('Class: Fine');
                verifyStat('Durability', 36.5, 22.999, 27.599);
                verifyStat('Lightness', 49.5, 48.999, 58.799);
                verifyStat('Sap Load', 65, 80, 95.999);
                verifyStat('DMG', 35, 19.999, 23.999);
                verifyStat('Speed', 25.999, 1.999, 2.399);
                verifyStat('Dodge Modifier', 38, 25.999, 31.199);
                verifyStat('Parry Modifier', 25.999, 1.999, 2.399);
                verifyStat('Adversary Dodge Modifier', 48, 45.999, 55.199);
                verifyStat('Adversary Parry Modifier', 25.999, 1.999, 2.399);
                verifyStat('Elemental Cast Speed', 65, 80, 95.999);
                verifyStat('Elemental Power', 65, 80, 95.999);
                verifyStat('Off. Affliction Cast Speed', 65, 80, 95.999);
                verifyStat('Off. Affliction Power', 65, 80, 95.999);
                verifyStat('Def. Affliction Cast Speed', 45, 39.999, 47.999);
                verifyStat('Def. Affliction Power', 65, 80, 95.999);
                verifyStat('Heal Cast Speed', 65, 80, 95.999);
                verifyStat('Heal Power', 65, 80, 95.999);
            });
    })

    function addMaterial(slot: string, material: string, count?: number) {
        cy.contains('The Items inserted')
            .contains(slot)
            .parents(".container")
            .within(() => {
                cy.get('.w_slot_item').click();
            })
        cy.get(`.modal .sheet[title="${material}"]`).click();

        if (count) {
            cy.get(`.sheet[title="${material}"]`).click();
            cy.contains('Select Quantity')
                .parent()
                .within(() => {
                    cy.get('input[type=number]').type(`{backspace}${count}`)
                    cy.get('input[value=ok]').click()
                })
        }
    }

    function verifyStat(stat: string, before: number, after: number, rubarn: number) {
        cy.contains(stat)
            .parent('tr')
            .within(() => {
                cy.get('td').eq(1).contains(before)
                cy.get('td').eq(2).contains(after)
                cy.get('td').eq(3).contains(rubarn)
            });
    }
})
