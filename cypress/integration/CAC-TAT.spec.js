// CAC-TAT.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(() => {
        // root-level hook
        // runs once before all tests
        cy.visit('src/index.html')
    })
    it('verifica o título da aplicação', function() {
        cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
        
    })
    
    //02 - Exercicio extra 1
    it('Digitando em campos e clicando em elementos', () => {
        const LongText = "Teste teste teste teste teste teste teste testeteste teste teste teste teste teste teste "
        cy.get('#firstName').type('Sergio')
        cy.get('#lastName').type('Gomes')
        cy.get('#email').type('sergio@exemplo.com')
        //A cada espaço há um delay de 10ms, configurando o delay para 0 vai mais rápido.
        //cy.get('#open-text-area').type(LongText)
        cy.get('#open-text-area').type(LongText, {delay: 0})
        cy.contains('button', 'Enviar').click()
        cy.get('.success').should('be.visible')
        
    })
    //Exercicio extra 2
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
        cy.get('#email').type('sergio@exemplo.com')
        cy.contains('button', 'Enviar').click()
        cy.get('.error')
        .should('be.visible')
        .should('contain', 'Valide os campos obrigatórios!')
        
    })

    //Exercicio extra 3
    it('Valide campo de telefone se digitar valor não númerico, seu contaúdo deve mantér vazio.',()=>{
         
        cy.get('#phone').type('asdfasdf')
        .should('be.empty')

    })
    //Exercicio extra 4
    //05 - Exercicio extra 1
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário',()=>{
        cy.get('#phone-checkbox').check()
        cy.get('.phone-label-span')
        .should('be.visible')
        .should('contain', ' (obrigatório)')

    })
    //Exercicio extra 5
    it('preenche e limpa os campos nome, sobrenome, email e telefone',()=>{
        const nome = '#firstName'
        const sobrenome = '#lastName'
        const email = '#email'
        const fone = '#phone'
        cy.get(nome).type('Sergio')
        .should('have.value', 'Sergio')
        cy.get(sobrenome).type('Gomes')
        .should('have.value', 'Gomes')
        cy.get(email).type('sergio@exemplo.com')
        .should('have.value', 'sergio@exemplo.com')
        cy.get(fone).type('11977012345678')
        .should('have.value', '11977012345678')
        cy.get(nome).clear()
        .should('be.empty')
        cy.get(sobrenome).clear()
        .should('be.empty')
        cy.get(email).clear()
        .should('be.empty')
        cy.get(fone).clear()
        .should('be.empty')
    })
    //Exercicio extra 6
    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios',()=>{
        cy.get('button[type="submit"]').click()
        cy.get('.error')
        .should('be.visible')
        .should('contain', 'Valide os campos obrigatórios!')  
         
    })

    //Exercicio extra 7
    it('envia o formuário com sucesso usando um comando customizado',()=>{
        const longText = "Teste, Teste, Teste, Teste, teste, teste, teste, teste, teste, teste, teste, teste, "
        cy.fillMandatoryFieldsAndSubmit("sergio", 'gomes', 'sergio@exemplo.com', longText)
        cy.get('.success').should('contain', 'Mensagem enviada com sucesso.')
        
    })
    //03 - Exercicio
    it('seleciona um produto (YouTube) por seu texto',()=>{
        cy.get('#product')
        .select('youtube')
        .should('have.value', 'youtube')

    })
    //Exercicio extra 1
    it('seleciona um produto (Mentoria) por seu valor (value)',()=>{
        cy.get('#product')
        .select('mentoria')
        .should('have.value', 'mentoria')

    })
    //Exercicio extra 2
    it('seleciona um produto (Blog) por seu índice',()=>{
        cy.get('#product')
        .select(1)
        .should('have.value', 'blog')

    })
    //04 - Exercicio
    it('marca o tipo de atendimento "Feedback',()=>{
        cy.get('[value="feedback"]').check().should('be.checked')
        
    })
    //04 - Exercicio extra
    it('marca cada tipo de atendimento',()=>{
        cy.get('[type="radio"]')
         .should('have.length', 3)
         //assim percorre cada elemento $ parametro jquery EX: $radio
         .each(function($radio){
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
         })
         //flega um por um.
        //cy.get('[value="feedback"]').check().should('be.checked')
        //cy.get('[value="ajuda"]').check().should('be.checked')
        //cy.get('[value="elogio"]').check().should('be.checked')
        
    })
    //05 - Exercicio
    it('marca ambos checkboxes, depois desmarca o último',()=>{
        cy.get('[type="checkbox"]')
        .check()
        .should('be.checked')
        .last()
        .uncheck()
        .should('not.be.checked')

    })
    //06 - Exercicio
    it('seleciona um arquivo da pasta fixtures',()=>{
        cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('cypress/fixtures/TesteUploadCypress.txt')
        .should(function($input){
            console.log($input)
            expect($input[0].files[0].name).to.equal('TesteUploadCypress.txt')
        })
    })
    //06 - Exercício extra 1
    it('seleciona um arquivo simulando um drag-and-drop',()=>{
        cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('cypress/fixtures/TesteUploadCypress.txt', {action: "drag-drop"})
        .should(function($input){
            console.log($input)
            expect($input[0].files[0].name).to.equal('TesteUploadCypress.txt')
        })  
    })
    //06 - Exercício extra 2
    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias',()=>{
        cy.fixture('TesteUploadCypress').as('inputFile')
        cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('@inputFile')
        .should(function($input){
            console.log($input)
            expect($input[0].files[0].name).to.equal('TesteUploadCypress')
        })  
    })
    //07 - Exercício
    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique',()=>{
        cy.get('#privacy > a')
        .should('have.attr', "target")
    })
    //07 - Exercício extra 1
    //Não redicionará para outra aba
    it('acessa a página da política de privacidade removendo o target e então clicando no link',()=>{
        cy.get('#privacy > a').invoke('removeAttr', 'target').click()
        //cy.title('cypress-basico-v2')
        cy.title().should('eq', 'Central de Atendimento ao Cliente TAT - Política de privacidade')
        cy.contains('Talking About Testing').should('be.visible')
        
    })
})