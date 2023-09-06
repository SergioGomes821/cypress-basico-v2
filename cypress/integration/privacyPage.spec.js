describe('Pagina politica de privacidade', function() {
    beforeEach(() => {
        // root-level hook
        // runs once before all tests
        cy.visit('src/privacy.html')
    })
    it.only('Verifica se abriu a pagina da politica de privacidade', function() {
        cy.title()
        .should('eq', 'Central de Atendimento ao Cliente TAT - Política de privacidade')
        
    })
})