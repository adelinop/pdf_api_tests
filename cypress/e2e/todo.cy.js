
  it('envia uma imagem real via FormData (browser)', () => {
    cy.readFile('cypress/fixtures/image1.jpeg', 'binary').then((file) => {
      cy.window().then((win) => {
        const blob = Cypress.Blob.binaryStringToBlob(file, 'image/jpeg');
        const formData = new win.FormData();
        formData.append('files', blob, 'image1.jpeg');
        formData.append('file_name', Cypress.env('file_name'));

        cy.request({
          method: 'POST',
          url: Cypress.env('url'),
          body: formData,
          encoding: 'binary',
          headers: { 'Content-Type': 'multipart/form-data',
            'email': Cypress.env('email')
          },
        }).then((res) => {
          expect(res.status).to.eq(200);
        });
      });
    });
  });

  it('valida o email na resposta da API', () => {
    cy.visit(Cypress.env('yopmail'));
    cy.get('body').then(($body) => {
      const $btn = $body.find('[aria-label="Consent"]');
      if ($btn.length && $btn.is(':visible')) {
        cy.wrap($btn).click({ force: true });
      }
    });
    cy.get('[class="ycptinput"]').type(Cypress.env('email'))
    cy.get('[id="refreshbut"]').click();
    cy.get('iframe#ifmail', { timeout: 15000 }).should('exist').then(($iframe) => {
      const body = $iframe.contents().find('body');
      cy.wrap(body)
        .find('a[title*="test_pdf"]', { timeout: 10000 })
        .should('be.visible');
    });
  });

