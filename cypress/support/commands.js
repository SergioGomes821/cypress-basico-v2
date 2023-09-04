// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


Cypress.Commands.add('fillMandatoryFieldsAndSubmit',(nome, sobrenome, email, longText)=>{
    const NOME = '#firstName'
    const SOBRENOME = '#lastName'
    const EMAIL = '#email'
    
    cy.get(NOME).type(nome)
    .should('have.value', nome)
    cy.get(SOBRENOME).type(sobrenome)
    .should('have.value', sobrenome)
    cy.get(EMAIL).type(email)
    .should('have.value', email)
    cy.get('#open-text-area').type(longText, {delay: 0})
    //Busca pelo nome do botão, parametro 1 = tag, parm 2 = Nome no elemento.
    cy.contains('button', 'Enviar').click()
    cy.get('.success').should('be.visible')
        

})
