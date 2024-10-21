describe('Test de login', () => {
  it('Se rendre au point d\'entrée de l\'application et entrer les credentials', () => {
    
    // Charger la fixture pour simuler la réponse de l'API de login
    cy.fixture('loginResponse.json').then((loginResponse) => {
      // Intercepter la requête de login et retourner la réponse de la fixture
      cy.intercept('POST', '/auth/login', {
        statusCode: 200,
        body: loginResponse
      }).as('loginRequest');
      
      // Visiter la page de login
      cy.visit('http://localhost:4200/login');

      // Remplir l'email
      cy.get('input#email').type('super.admin@email.com');

      // Remplir le mot de passe
      cy.get('input#password').type('123456');

      // Cliquer sur le bouton de login
      cy.get('button[type="submit"]').click();

      // Stocker le token JWT et les informations d'utilisateur dans le sessionStorage
      cy.window().then((win) => {
        win.sessionStorage.setItem('auth-token', loginResponse.token);
        win.sessionStorage.setItem('auth-user', JSON.stringify(loginResponse));
      });

      // Charger la fixture pour les spécialités
      cy.fixture('specialityGroupWithChildrenResponse.json').then((fakeSg) => {
        cy.intercept('GET', '/specialityGroup/all', fakeSg).as('specialityRequest');
      });

      // Vérifier que la page s'affiche bien après la connexion et se rendre sur la page "New Emergency"
      cy.get('#new-emergency-btn').click();

      // Remplir la latitude
      cy.get('input#userLat').type('51.52927577065579');

      // Remplir la longitude
      cy.get('input#userLon').type('-0.11747458456620688');

      // Sélectionner un groupe de spécialité dans la liste déroulante
      cy.get('select#specialityGroupId').select('15');

      // Sélectionner une spécialité dans la liste déroulante
      cy.get('select#specialityId').select('38');

      // Charger la fixture depuis un fichier JSON
      cy.fixture('../fixtures/closestHospital.json').then((fakeClosestHospitalList) => {
        cy.intercept({
          method: 'GET',
          url: '/hospital/closest*',
          query: {
            userLatStr: '51.52927577065579',
            userLonStr: '-0.11747458456620688',
            specialityId: '38'
          }
        }, {
          statusCode: 200,
          body: fakeClosestHospitalList
        }).as('closestHospitalList');
      });

      // Soumettre le formulaire
      cy.get('button[type="submit"]').click();

      // Vérifier la présence du texte spécifique sur la page
      cy.contains('British Home & Hospital for Incurables');

      // Charger la fixture depuis un fichier JSON
      cy.fixture('../fixtures/changeStateResponse.json').then((changeStateResponse) => {
        cy.intercept({
          method: 'GET',
          url: '/bed/changestate*',
          query: {
            bedId: '8482'
          }
        }, {
          statusCode: 200,
          body: changeStateResponse
        }).as('closestHospitalList');
      });

      cy.get('#book-btn').click();

    });
  });
});