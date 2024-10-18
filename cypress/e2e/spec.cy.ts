describe('Test de login', () => {
  it('Se rendre au point d\'entrée de l\'application et entrer les credentials', () => {
    // Se rendre sur la page de login
    cy.visit('http://localhost:4200/login')

    // Remplir l'email
    cy.get('input#email').type('super.admin@email.com')

    // Remplir le mot de passe
    cy.get('input#password').type('123456')

    // Cliquer sur le bouton de login
    cy.get('button[type="submit"]').click()

    // Vérifier que la page s'affiche bien après la connexion et se rendre sur la page "New Emergency"
    cy.get('#new-emergency-btn').click()
  
    // Charger la fixture depuis un fichier JSON
    cy.fixture('../fixtures/specialityGroupWithChildrenResponse.json').then((fakeResponse) => {
      
    // Intercepter la requête API et retourner les données de la fixture
    cy.intercept('get', '/specialityGroup/all', fakeResponse).as('createEmergency');
    })

    // Remplir la latitude
    cy.get('input#userLat').type('51.52927577065579')

    // Remplir la longitude
    cy.get('input#userLon').type('-0.11747458456620688')

    // Sélectionner un groupe de spécialité dans la liste déroulante
    cy.get('select#specialityGroupId').select('15')

    // Sélectionner une spécialité dans la liste déroulante
    cy.get('select#specialityId').select('38') 
    
    // Soumettre le formulaire
    cy.get('button[type="submit"]').click()

    // Vérifier la présence du texte " British Home & Hospital for Incurables " sur la page
    cy.contains(' British Home & Hospital for Incurables')

  })
})

