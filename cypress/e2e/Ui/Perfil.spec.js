/// <reference types="cypress" />

describe('Perfil', () => {

    beforeEach(() => {
        cy.visit('cadastrar');        
    });

    context('Dado que, ao acessar o site https://conexaoqa.herokuapp.com/ e clicar no botão CADASTRAR', () => {
        context('Quando eu preencher todos os campos corretamente e clicar em CADASTRAR', () => {
            it('Então devo ser direcionado para a tela de Dashboard', () => {

                // Arrange
                let name = null;

                // Act
                cy.createAccount(true).then(data => {
                    name = data.name;   

                    // Assert
                    cy.get('[data-test="dashboard-welcome"]').should('contain', `Bem-vindo ${name}`);
                });
            });            

            it('Então devo ser direcionado para a tela de Perfil', () => {

                // Arrange
                cy.createAccount(false);

                // Act
                cy.get('[data-test="dashboard-createProfile"]').click();
                    
                // Assert
                cy.get('.large').should('contain', 'Crie Seu Perfil');
            });  

        });
    });

    context('Dado que estou na tela de criação de perfil https://conexaoqa.herokuapp.com/criar-perfil', () => {
        context('Quando eu preencher todos os dados corretamente e clicar em CRIAR PERFIL', () => {
            it('Então devo ser direcionado para a tela de Dashboard e visualizar a mensagem Perfil Criado', () => {
                // Arrange 
                cy.createAccount(false);
                
                // Act                
                cy.get('[data-test="dashboard-createProfile"]').click();
                cy.get('#mui-component-select-status').click();
                cy.get('[data-test="status-0"]').click();    
                cy.get('[data-test="profile-skills"] > .MuiInputBase-root > .MuiInputBase-input').type('JavaScript');    
                cy.get('[data-test="profile-submit"]').click();
                    
                // Assert
                cy.get('[data-test="alert"]').should('contain', 'Perfil Criado');
            });              
        });

        context('Quando eu não preencher o campo STATUS e clicar em CRIAR PERFIL', () => {
            it('Então devo visualizar o label Status na cor vermelha', () => {
                // Arrange
                cy.createAccount(false);

                // Act
                cy.get('[data-test="dashboard-createProfile"]').click();
                cy.get('[data-test="profile-skills"] > .MuiInputBase-root > .MuiInputBase-input').type('JavaScript');    
                cy.get('[data-test="profile-submit"]').click();
                    
                // Assert
                cy.get('#status').should('have.css', 'color').and('eq', 'rgb(244, 67, 54)');                
            });              
        });       

        context('Quando eu não preencher o campo CONHECIMENTOS e clicar em CRIAR PERFIL', () => {
            it('Então devo visualizar a mensagem "Conhecimentos é obrigatório"', () => {
                // Arrange
                cy.createAccount(false);

                // Act
                cy.get('[data-test="dashboard-createProfile"]').click();
                cy.get('#mui-component-select-status').click();
                cy.get('[data-test="status-0"]').click();    
                cy.get('[data-test="profile-submit"]').click();
                    
                // Assert
                cy.get('[data-test="profile-skills"] > .MuiInputBase-root > .MuiInputBase-input').should('have.css', 'color').and('eq', 'rgba(0, 0, 0, 0.87)');
                cy.get('.MuiFormHelperText-root').should('contain', 'Conhecimentos é obrigatório');
                cy.get('.MuiFormHelperText-root').should('have.css', 'color').and('eq', 'rgb(244, 67, 54)');
                
            });              
        });       

        context('Quando eu não preencher os campos STATUS e CONHECIMENTOS e clicar em CRIAR PERFIL', () => {
            it('Então devo visualizar o label Status em VERMELHO e a mensagem "Conhecimentos é obrigatório"', () => {
                // Arrange
                cy.createAccount(false);

                // Act
                cy.get('[data-test="dashboard-createProfile"]').click();
                cy.get('[data-test="profile-submit"]').click();
                    
                // Assert
                cy.get('#status').should('have.css', 'color').and('eq', 'rgb(244, 67, 54)');
                cy.get('[data-test="profile-skills"] > .MuiInputBase-root > .MuiInputBase-input').should('have.css', 'color').and('eq', 'rgba(0, 0, 0, 0.87)');
                cy.get('.MuiFormHelperText-root').should('contain', 'Conhecimentos é obrigatório');
                cy.get('.MuiFormHelperText-root').should('have.css', 'color').and('eq', 'rgb(244, 67, 54)');                                    
                
            });              
        });      
    });    
});