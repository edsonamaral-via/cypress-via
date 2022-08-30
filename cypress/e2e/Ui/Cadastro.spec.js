/// <reference types="cypress" />
const faker = require('faker-br');

describe('CONEXAO-001 - Cadastro', () => {
    const name = faker.name.findName();
    const password = faker.internet.password();
    const email = faker.internet.email(name);

    beforeEach(() => {
        cy.visit('cadastrar');
    });

    context('Tela de Cadastro', () => {
        context('Como usuário, desejo criar o cadastro de uma nova conta', () => {
            context('Quando os dados não forem preenchidos corretamente, devo visualizar erros de validação', () => {
                it('Quando eu não informar NOME, E-MAIL, SENHA, mas informar CONFIRMAR com menos de 6 caracteres e clicar em Cadastrar', () => {
                    // Arrange
                    cy.get('[data-test="register-name"] > .MuiInputBase-root > .MuiInputBase-input').focus().blur();
                    cy.get('[data-test="register-email"] > .MuiInputBase-root > .MuiInputBase-input').focus().blur();
                    cy.get('[data-test="register-password"] > .MuiInputBase-root > .MuiInputBase-input').focus().blur();
                    cy.get('[data-test="register-password2"] > .MuiInputBase-root > .MuiInputBase-input').type('123');
            
                    // Act 
                    cy.get('[data-test="register-submit"]').click();
            
                    // Assert
                    cy.get('[data-test="register-name"] > .MuiFormHelperText-root').should('contain', 'Email é obrigatório');
                    cy.get('[data-test="register-email"] > .MuiFormHelperText-root').should('contain', 'Email é obrigatório');
                    cy.get('[data-test="register-password"] > .MuiFormHelperText-root').should('contain', 'Senha é obrigatória');
                    cy.get('[data-test="register-password2"] > .MuiFormHelperText-root').should('contain', 'Senhas precisam ser idênticas');
                });                            

                it('Quando não informar nenhum dos dados e clicar em Cadastrar', () => {
                    // Arrange
                    cy.get('[data-test="register-name"] > .MuiInputBase-root > .MuiInputBase-input').focus().blur();
                    cy.get('[data-test="register-email"] > .MuiInputBase-root > .MuiInputBase-input').focus().blur();
                    cy.get('[data-test="register-password"] > .MuiInputBase-root > .MuiInputBase-input').focus().blur();
                    cy.get('[data-test="register-password2"] > .MuiInputBase-root > .MuiInputBase-input').focus().blur();
            
                    // Act 
                    cy.get('[data-test="register-submit"]').click();
            
                    // Assert
                    cy.get('[data-test="register-name"] > .MuiFormHelperText-root').should('contain', 'Email é obrigatório');
                    cy.get('[data-test="register-email"] > .MuiFormHelperText-root').should('contain', 'Email é obrigatório');
                    cy.get('[data-test="register-password"] > .MuiFormHelperText-root').should('contain', 'Senha é obrigatória');
                    cy.get('[data-test="register-password2"] > .MuiFormHelperText-root').should('contain', 'Confirmar senha é obrigatória');
                });                                

                it('Quando não informar NOME e SENHA, informar E-MAIL inválido e clicar em Confirmar', () => {
                    // Arrange
                    cy.get('[data-test="register-name"] > .MuiInputBase-root > .MuiInputBase-input').focus().blur();
                    cy.get('[data-test="register-email"] > .MuiInputBase-root > .MuiInputBase-input').type('a@a');
                    cy.get('[data-test="register-password"] > .MuiInputBase-root > .MuiInputBase-input').focus().blur();
                    cy.get('[data-test="register-password2"] > .MuiInputBase-root > .MuiInputBase-input').type(password);
            
                    // Act 
                    cy.get('[data-test="register-submit"]').click();
            
                    // Assert
                    cy.get('[data-test="register-name"] > .MuiFormHelperText-root').should('contain', 'Email é obrigatório');
                    cy.get('[data-test="register-email"] > .MuiFormHelperText-root').should('contain', 'Digite um email válido');
                    cy.get('[data-test="register-password"] > .MuiFormHelperText-root').should('contain', 'Senha é obrigatória');
                    cy.get('[data-test="register-password2"] > .MuiFormHelperText-root').should('contain', 'Senhas precisam ser idênticas');
                });                

                it('Quando NOME não informado, E-MAIL inválido, CONFIRMAR < 6 caracteres', () => {
                    // Arrange
                    cy.get('[data-test="register-name"] > .MuiInputBase-root > .MuiInputBase-input').focus().blur();
                    cy.get('[data-test="register-email"] > .MuiInputBase-root > .MuiInputBase-input').type('a@a');
                    cy.get('[data-test="register-password"] > .MuiInputBase-root > .MuiInputBase-input').type(password);
                    cy.get('[data-test="register-password2"] > .MuiInputBase-root > .MuiInputBase-input').type('123');
            
                    // Act 
                    cy.get('[data-test="register-submit"]').click();
            
                    // Assert
                    cy.get('[data-test="register-name"] > .MuiFormHelperText-root').should('contain', 'Email é obrigatório');
                    cy.get('[data-test="register-email"] > .MuiFormHelperText-root').should('contain', 'Digite um email válido');
                    cy.get('[data-test="register-password2"] > .MuiFormHelperText-root').should('contain', 'Senhas precisam ser idênticas');
                });
            
                it('Quando NOME e CONFIRMAR não informados, E-MAIL inválido', () => {
                    // Arrange
                    cy.get('[data-test="register-name"] > .MuiInputBase-root > .MuiInputBase-input').focus().blur();
                    cy.get('[data-test="register-email"] > .MuiInputBase-root > .MuiInputBase-input').type('a@a');
                    cy.get('[data-test="register-password"] > .MuiInputBase-root > .MuiInputBase-input').type(password);
                    cy.get('[data-test="register-password2"] > .MuiInputBase-root > .MuiInputBase-input').focus().blur();
            
                    // Act 
                    cy.get('[data-test="register-submit"]').click();
            
                    // Assert
                    cy.get('[data-test="register-name"] > .MuiFormHelperText-root').should('contain', 'Email é obrigatório');
                    cy.get('[data-test="register-email"] > .MuiFormHelperText-root').should('contain', 'Digite um email válido');
                    cy.get('[data-test="register-password2"] > .MuiFormHelperText-root').should('contain', 'Confirmar senha é obrigatória');
                });
            
                it('Quando NOME não informados, E-MAIL inválido', () => {
                    // Arrange
                    cy.get('[data-test="register-name"] > .MuiInputBase-root > .MuiInputBase-input').focus().blur();
                    cy.get('[data-test="register-email"] > .MuiInputBase-root > .MuiInputBase-input').type('a@a');
                    cy.get('[data-test="register-password"] > .MuiInputBase-root > .MuiInputBase-input').type(password);
                    cy.get('[data-test="register-password2"] > .MuiInputBase-root > .MuiInputBase-input').type(password);
            
                    // Act 
                    cy.get('[data-test="register-submit"]').click();
            
                    // Assert
                    cy.get('[data-test="register-name"] > .MuiFormHelperText-root').should('contain', 'Email é obrigatório');
                    cy.get('[data-test="register-email"] > .MuiFormHelperText-root').should('contain', 'Digite um email válido');
                });
            
                it('Quando NOME, E-MAIL, SENHA não informados, CONFIRMAR < 6 caracteres', () => {
                    // Arrange
                    cy.get('[data-test="register-name"] > .MuiInputBase-root > .MuiInputBase-input').focus().blur();
                    cy.get('[data-test="register-email"] > .MuiInputBase-root > .MuiInputBase-input').focus().blur();
                    cy.get('[data-test="register-password"] > .MuiInputBase-root > .MuiInputBase-input').focus().blur();
                    cy.get('[data-test="register-password2"] > .MuiInputBase-root > .MuiInputBase-input').type('123');
            
                    // Act 
                    cy.get('[data-test="register-submit"]').click();
            
                    // Assert
                    cy.get('[data-test="register-name"] > .MuiFormHelperText-root').should('contain', 'Email é obrigatório');
                    cy.get('[data-test="register-email"] > .MuiFormHelperText-root').should('contain', 'Email é obrigatório');
                    cy.get('[data-test="register-password"] > .MuiFormHelperText-root').should('contain', 'Senha é obrigatória');
                    cy.get('[data-test="register-password2"] > .MuiFormHelperText-root').should('contain', 'Senhas precisam ser idênticas');
                });
            
                it('Quando NOME, E-MAIL, SENHA e CONFIRMAR não informados', () => {
                    // Arrange
                    cy.get('[data-test="register-name"] > .MuiInputBase-root > .MuiInputBase-input').focus().blur();
                    cy.get('[data-test="register-email"] > .MuiInputBase-root > .MuiInputBase-input').focus().blur();
                    cy.get('[data-test="register-password"] > .MuiInputBase-root > .MuiInputBase-input').focus().blur();
                    cy.get('[data-test="register-password2"] > .MuiInputBase-root > .MuiInputBase-input').focus().blur();
            
                    // Act 
                    cy.get('[data-test="register-submit"]').click();
            
                    // Assert
                    cy.get('[data-test="register-name"] > .MuiFormHelperText-root').should('contain', 'Email é obrigatório');
                    cy.get('[data-test="register-email"] > .MuiFormHelperText-root').should('contain', 'Email é obrigatório');
                    cy.get('[data-test="register-password"] > .MuiFormHelperText-root').should('contain', 'Senha é obrigatória');
                    cy.get('[data-test="register-password2"] > .MuiFormHelperText-root').should('contain', 'Confirmar senha é obrigatória');
                });
            
                it('Quando NOME, E-MAIL e SENHA não informados', () => {
                    // Arrange
                    cy.get('[data-test="register-name"] > .MuiInputBase-root > .MuiInputBase-input').focus().blur();
                    cy.get('[data-test="register-email"] > .MuiInputBase-root > .MuiInputBase-input').focus().blur();
                    cy.get('[data-test="register-password"] > .MuiInputBase-root > .MuiInputBase-input').focus().blur();
                    cy.get('[data-test="register-password2"] > .MuiInputBase-root > .MuiInputBase-input').type(password);
            
                    // Act 
                    cy.get('[data-test="register-submit"]').click();
            
                    // Assert
                    cy.get('[data-test="register-name"] > .MuiFormHelperText-root').should('contain', 'Email é obrigatório');
                    cy.get('[data-test="register-email"] > .MuiFormHelperText-root').should('contain', 'Email é obrigatório');
                    cy.get('[data-test="register-password"] > .MuiFormHelperText-root').should('contain', 'Senha é obrigatória');
                    cy.get('[data-test="register-password2"] > .MuiFormHelperText-root').should('contain', 'Senhas precisam ser idênticas');
                });
            
                it('Quando NOME, E-MAIL não informados e CONFIRMAR < 6 caracteres', () => {
                    // Arrange
                    cy.get('[data-test="register-name"] > .MuiInputBase-root > .MuiInputBase-input').focus().blur();
                    cy.get('[data-test="register-email"] > .MuiInputBase-root > .MuiInputBase-input').focus().blur();
                    cy.get('[data-test="register-password"] > .MuiInputBase-root > .MuiInputBase-input').type(password);
                    cy.get('[data-test="register-password2"] > .MuiInputBase-root > .MuiInputBase-input').type('123');
            
                    // Act 
                    cy.get('[data-test="register-submit"]').click();
            
                    // Assert
                    cy.get('[data-test="register-name"] > .MuiFormHelperText-root').should('contain', 'Email é obrigatório');
                    cy.get('[data-test="register-email"] > .MuiFormHelperText-root').should('contain', 'Email é obrigatório');
                    cy.get('[data-test="register-password2"] > .MuiFormHelperText-root').should('contain', 'Senhas precisam ser idênticas');
                });
            
                it('Quando NOME, E-MAIL e CONFIRMAR não informados', () => {
                    // Arrange
                    cy.get('[data-test="register-name"] > .MuiInputBase-root > .MuiInputBase-input').focus().blur();
                    cy.get('[data-test="register-email"] > .MuiInputBase-root > .MuiInputBase-input').focus().blur();
                    cy.get('[data-test="register-password"] > .MuiInputBase-root > .MuiInputBase-input').type(password);
                    cy.get('[data-test="register-password2"] > .MuiInputBase-root > .MuiInputBase-input').focus().blur();
            
                    // Act 
                    cy.get('[data-test="register-submit"]').click();
            
                    // Assert
                    cy.get('[data-test="register-name"] > .MuiFormHelperText-root').should('contain', 'Email é obrigatório');
                    cy.get('[data-test="register-email"] > .MuiFormHelperText-root').should('contain', 'Email é obrigatório');
                    cy.get('[data-test="register-password2"] > .MuiFormHelperText-root').should('contain', 'Confirmar senha é obrigatória');
                });
            
                it('Quando NOME e E-MAIL não informados', () => {
                    // Arrange
                    cy.get('[data-test="register-name"] > .MuiInputBase-root > .MuiInputBase-input').focus().blur();
                    cy.get('[data-test="register-email"] > .MuiInputBase-root > .MuiInputBase-input').focus().blur();
                    cy.get('[data-test="register-password"] > .MuiInputBase-root > .MuiInputBase-input').type(password);
                    cy.get('[data-test="register-password2"] > .MuiInputBase-root > .MuiInputBase-input').type(password);
            
                    // Act 
                    cy.get('[data-test="register-submit"]').click();
            
                    // Assert
                    cy.get('[data-test="register-name"] > .MuiFormHelperText-root').should('contain', 'Email é obrigatório');
                    cy.get('[data-test="register-email"] > .MuiFormHelperText-root').should('contain', 'Email é obrigatório');
                });
            
                it('Quando NOME e CONFIRMAR não informados, SENHA < 6 caracteres', () => {
                    // Arrange
                    cy.get('[data-test="register-name"] > .MuiInputBase-root > .MuiInputBase-input').focus().blur();
                    cy.get('[data-test="register-email"] > .MuiInputBase-root > .MuiInputBase-input').type(email);
                    cy.get('[data-test="register-password"] > .MuiInputBase-root > .MuiInputBase-input').type('123');
                    cy.get('[data-test="register-password2"] > .MuiInputBase-root > .MuiInputBase-input').type('123');
            
                    // Act 
                    cy.get('[data-test="register-submit"]').click();
            
                    // Assert
                    cy.get('[data-test="register-name"] > .MuiFormHelperText-root').should('contain', 'Email é obrigatório');
                    cy.get('[data-test="register-password"] > .MuiFormHelperText-root').should('contain', 'A senha deve conter no mínimo 6 caracteres');
                    cy.get('[data-test="register-password2"] > .MuiFormHelperText-root').should('contain', 'A senha deve conter no mínimo 6 caracteres');
                });
            
                it('Quando NOME e CONFIRMAR não informados, SENHA < 6 caracteres', () => {
                    // Arrange
                    cy.get('[data-test="register-name"] > .MuiInputBase-root > .MuiInputBase-input').focus().blur();
                    cy.get('[data-test="register-email"] > .MuiInputBase-root > .MuiInputBase-input').type(email);
                    cy.get('[data-test="register-password"] > .MuiInputBase-root > .MuiInputBase-input').type('123');
                    cy.get('[data-test="register-password2"] > .MuiInputBase-root > .MuiInputBase-input').focus().blur();
            
                    // Act 
                    cy.get('[data-test="register-submit"]').click();
            
                    // Assert
                    cy.get('[data-test="register-name"] > .MuiFormHelperText-root').should('contain', 'Email é obrigatório');
                    cy.get('[data-test="register-password"] > .MuiFormHelperText-root').should('contain', 'A senha deve conter no mínimo 6 caracteres');
                    cy.get('[data-test="register-password2"] > .MuiFormHelperText-root').should('contain', 'Confirmar senha é obrigatória');
                });
            
                it('Quando NOME, SENHA e CONFIRMAR não informados', () => {
                    // Arrange
                    cy.get('[data-test="register-name"] > .MuiInputBase-root > .MuiInputBase-input').focus().blur();
                    cy.get('[data-test="register-email"] > .MuiInputBase-root > .MuiInputBase-input').type(email);
                    cy.get('[data-test="register-password"] > .MuiInputBase-root > .MuiInputBase-input').focus().blur();
                    cy.get('[data-test="register-password2"] > .MuiInputBase-root > .MuiInputBase-input').focus().blur();
            
                    // Act 
                    cy.get('[data-test="register-submit"]').click();
            
                    // Assert
                    cy.get('[data-test="register-name"] > .MuiFormHelperText-root').should('contain', 'Email é obrigatório');
                    cy.get('[data-test="register-password"] > .MuiFormHelperText-root').should('contain', 'Senha é obrigatória');
                    cy.get('[data-test="register-password2"] > .MuiFormHelperText-root').should('contain', 'Confirmar senha é obrigatória');
                });
            
                it('Quando NOME em branco, SENHA não informada', () => {
                    // Arrange
                    cy.get('[data-test="register-name"] > .MuiInputBase-root > .MuiInputBase-input').focus().blur();
                    cy.get('[data-test="register-email"] > .MuiInputBase-root > .MuiInputBase-input').type(email);
                    cy.get('[data-test="register-password"] > .MuiInputBase-root > .MuiInputBase-input').focus().blur();
                    cy.get('[data-test="register-password2"] > .MuiInputBase-root > .MuiInputBase-input').type(password);
            
                    // Act 
                    cy.get('[data-test="register-submit"]').click();
            
                    // Assert
                    cy.get('[data-test="register-name"] > .MuiFormHelperText-root').should('contain', 'Email é obrigatório');
                    cy.get('[data-test="register-password"] > .MuiFormHelperText-root').should('contain', 'Senha é obrigatória');
                    cy.get('[data-test="register-password2"] > .MuiFormHelperText-root').should('contain', 'Senhas precisam ser idênticas');
                });
            
                it('Quando NOME em branco, CONFIRMAR não informado', () => {
                    // Arrange
                    cy.get('[data-test="register-name"] > .MuiInputBase-root > .MuiInputBase-input').focus().blur();
                    cy.get('[data-test="register-email"] > .MuiInputBase-root > .MuiInputBase-input').type(email);
                    cy.get('[data-test="register-password"] > .MuiInputBase-root > .MuiInputBase-input').type(password);
                    cy.get('[data-test="register-password2"] > .MuiInputBase-root > .MuiInputBase-input').focus().blur();
            
                    // Act 
                    cy.get('[data-test="register-submit"]').click();
            
                    // Assert
                    cy.get('[data-test="register-name"] > .MuiFormHelperText-root').should('contain', 'Email é obrigatório');
                    cy.get('[data-test="register-password2"] > .MuiFormHelperText-root').should('contain', 'Confirmar senha é obrigatória');
                });
            
                it('Quando NOME em branco, CONFIRMAR < 6 caracteres', () => {
                    // Arrange
                    cy.get('[data-test="register-name"] > .MuiInputBase-root > .MuiInputBase-input').focus().blur();
                    cy.get('[data-test="register-email"] > .MuiInputBase-root > .MuiInputBase-input').type(email);
                    cy.get('[data-test="register-password"] > .MuiInputBase-root > .MuiInputBase-input').type(password);
                    cy.get('[data-test="register-password2"] > .MuiInputBase-root > .MuiInputBase-input').type('123');
            
                    // Act 
                    cy.get('[data-test="register-submit"]').click();
            
                    // Assert
                    cy.get('[data-test="register-name"] > .MuiFormHelperText-root').should('contain', 'Email é obrigatório');
                    cy.get('[data-test="register-password2"] > .MuiFormHelperText-root').should('contain', 'Senhas precisam ser idênticas');
                });
            
                it('Quando NOME em branco', () => {
                    // Arrange
                    cy.get('[data-test="register-name"] > .MuiInputBase-root > .MuiInputBase-input').focus().blur();
                    cy.get('[data-test="register-email"] > .MuiInputBase-root > .MuiInputBase-input').type(email);
                    cy.get('[data-test="register-password"] > .MuiInputBase-root > .MuiInputBase-input').type(password);
                    cy.get('[data-test="register-password2"] > .MuiInputBase-root > .MuiInputBase-input').type(password);
            
                    // Act 
                    cy.get('[data-test="register-submit"]').click();
            
                    // Assert
                    cy.get('[data-test="register-name"] > .MuiFormHelperText-root').should('contain', 'Email é obrigatório');
                });
            
                it('Quando E-MAIL em branco,  SENHA < 6 caracteres e CONFIRMAR não informado', () => {
                    // Arrange
                    cy.get('[data-test="register-name"] > .MuiInputBase-root > .MuiInputBase-input').type(name);
                    cy.get('[data-test="register-email"] > .MuiInputBase-root > .MuiInputBase-input').focus().blur();
                    cy.get('[data-test="register-password"] > .MuiInputBase-root > .MuiInputBase-input').type('123');
                    cy.get('[data-test="register-password2"] > .MuiInputBase-root > .MuiInputBase-input').focus().blur();
            
                    // Act 
                    cy.get('[data-test="register-submit"]').click();
            
                    // Assert
                    cy.get('[data-test="register-email"] > .MuiFormHelperText-root').should('contain', 'Email é obrigatório');
                    cy.get('[data-test="register-password"] > .MuiFormHelperText-root').should('contain', 'A senha deve conter no mínimo 6 caracteres');
                    cy.get('[data-test="register-password2"] > .MuiFormHelperText-root').should('contain', 'Confirmar senha é obrigatória');
                });
            
                it('Quando E-MAIL em branco,  SENHA e CONFIRMAR < 6 caracteres', () => {
                    // Arrange
                    cy.get('[data-test="register-name"] > .MuiInputBase-root > .MuiInputBase-input').type(name);
                    cy.get('[data-test="register-email"] > .MuiInputBase-root > .MuiInputBase-input').focus().blur();
                    cy.get('[data-test="register-password"] > .MuiInputBase-root > .MuiInputBase-input').type('123');
                    cy.get('[data-test="register-password2"] > .MuiInputBase-root > .MuiInputBase-input').type('123');
            
                    // Act 
                    cy.get('[data-test="register-submit"]').click();
            
                    // Assert
                    cy.get('[data-test="register-email"] > .MuiFormHelperText-root').should('contain', 'Email é obrigatório');
                    cy.get('[data-test="register-password"] > .MuiFormHelperText-root').should('contain', 'A senha deve conter no mínimo 6 caracteres');
                    cy.get('[data-test="register-password2"] > .MuiFormHelperText-root').should('contain', 'A senha deve conter no mínimo 6 caracteres');
                });
            
                it('Quando E-MAIL em branco,  SENHA < 6 caracteres', () => {
                    // Arrange
                    cy.get('[data-test="register-name"] > .MuiInputBase-root > .MuiInputBase-input').type(name);
                    cy.get('[data-test="register-email"] > .MuiInputBase-root > .MuiInputBase-input').focus().blur();
                    cy.get('[data-test="register-password"] > .MuiInputBase-root > .MuiInputBase-input').type('123');
                    cy.get('[data-test="register-password2"] > .MuiInputBase-root > .MuiInputBase-input').type(password);
            
                    // Act 
                    cy.get('[data-test="register-submit"]').click();
            
                    // Assert
                    cy.get('[data-test="register-email"] > .MuiFormHelperText-root').should('contain', 'Email é obrigatório');
                    cy.get('[data-test="register-password"] > .MuiFormHelperText-root').should('contain', 'A senha deve conter no mínimo 6 caracteres');
                    cy.get('[data-test="register-password2"] > .MuiFormHelperText-root').should('contain', 'Senhas precisam ser idênticas');
                });
            
                it('Quando E-MAIL e SENHA não preenchidos', () => {
                    // Arrange
                    cy.get('[data-test="register-name"] > .MuiInputBase-root > .MuiInputBase-input').type(name);
                    cy.get('[data-test="register-email"] > .MuiInputBase-root > .MuiInputBase-input').focus().blur();
                    cy.get('[data-test="register-password"] > .MuiInputBase-root > .MuiInputBase-input').focus().blur();
                    cy.get('[data-test="register-password2"] > .MuiInputBase-root > .MuiInputBase-input').type('123');
            
                    // Act 
                    cy.get('[data-test="register-submit"]').click();
            
                    // Assert
                    cy.get('[data-test="register-email"] > .MuiFormHelperText-root').should('contain', 'Email é obrigatório');
                    cy.get('[data-test="register-password"] > .MuiFormHelperText-root').should('contain', 'Senha é obrigatória');
                    cy.get('[data-test="register-password2"] > .MuiFormHelperText-root').should('contain', 'Senhas precisam ser idênticas');
                });
            
                it('Quando E-MAIL, SENHA e CONFIRMAR não preenchidos', () => {
                    // Arrange
                    cy.get('[data-test="register-name"] > .MuiInputBase-root > .MuiInputBase-input').type(name);
                    cy.get('[data-test="register-email"] > .MuiInputBase-root > .MuiInputBase-input').focus().blur();
                    cy.get('[data-test="register-password"] > .MuiInputBase-root > .MuiInputBase-input').focus().blur();
                    cy.get('[data-test="register-password2"] > .MuiInputBase-root > .MuiInputBase-input').focus().blur();
            
                    // Act 
                    cy.get('[data-test="register-submit"]').click();
            
                    // Assert
                    cy.get('[data-test="register-email"] > .MuiFormHelperText-root').should('contain', 'Email é obrigatório');
                    cy.get('[data-test="register-password"] > .MuiFormHelperText-root').should('contain', 'Senha é obrigatória');
                    cy.get('[data-test="register-password2"] > .MuiFormHelperText-root').should('contain', 'Confirmar senha é obrigatória');
                });
            
                it('Quando E-MAIL e SENHA não preenchidos', () => {
                    // Arrange
                    cy.get('[data-test="register-name"] > .MuiInputBase-root > .MuiInputBase-input').type(name);
                    cy.get('[data-test="register-email"] > .MuiInputBase-root > .MuiInputBase-input').focus().blur();
                    cy.get('[data-test="register-password"] > .MuiInputBase-root > .MuiInputBase-input').focus().blur();
                    cy.get('[data-test="register-password2"] > .MuiInputBase-root > .MuiInputBase-input').type('123');
            
                    // Act 
                    cy.get('[data-test="register-submit"]').click();
            
                    // Assert
                    cy.get('[data-test="register-email"] > .MuiFormHelperText-root').should('contain', 'Email é obrigatório');
                    cy.get('[data-test="register-password"] > .MuiFormHelperText-root').should('contain', 'Senha é obrigatória');
                    cy.get('[data-test="register-password2"] > .MuiFormHelperText-root').should('contain', 'Senhas precisam ser idênticas');
                });
            
                it('Quando E-MAIL não preenchido e CONFIRMAR < 6 caracteres', () => {
                    // Arrange
                    cy.get('[data-test="register-name"] > .MuiInputBase-root > .MuiInputBase-input').type(name);
                    cy.get('[data-test="register-email"] > .MuiInputBase-root > .MuiInputBase-input').focus().blur();
                    cy.get('[data-test="register-password"] > .MuiInputBase-root > .MuiInputBase-input').type(password);
                    cy.get('[data-test="register-password2"] > .MuiInputBase-root > .MuiInputBase-input').type('123');
            
                    // Act 
                    cy.get('[data-test="register-submit"]').click();
            
                    // Assert
                    cy.get('[data-test="register-email"] > .MuiFormHelperText-root').should('contain', 'Email é obrigatório');
                    cy.get('[data-test="register-password2"] > .MuiFormHelperText-root').should('contain', 'Senhas precisam ser idênticas');
                });
            
                it('Quando E-MAIL e CONFIRMAR não informados', () => {
                    // Arrange
                    cy.get('[data-test="register-name"] > .MuiInputBase-root > .MuiInputBase-input').type(name);
                    cy.get('[data-test="register-email"] > .MuiInputBase-root > .MuiInputBase-input').focus().blur();
                    cy.get('[data-test="register-password"] > .MuiInputBase-root > .MuiInputBase-input').type(password);
                    cy.get('[data-test="register-password2"] > .MuiInputBase-root > .MuiInputBase-input').focus().blur();
            
                    // Act 
                    cy.get('[data-test="register-submit"]').click();
            
                    // Assert
                    cy.get('[data-test="register-email"] > .MuiFormHelperText-root').should('contain', 'Email é obrigatório');
                    cy.get('[data-test="register-password2"] > .MuiFormHelperText-root').should('contain', 'Confirmar senha é obrigatória');
                });
            
                it('Quando E-MAIL não informado', () => {
                    // Arrange
                    cy.get('[data-test="register-name"] > .MuiInputBase-root > .MuiInputBase-input').type(name);
                    cy.get('[data-test="register-email"] > .MuiInputBase-root > .MuiInputBase-input').focus().blur();
                    cy.get('[data-test="register-password"] > .MuiInputBase-root > .MuiInputBase-input').type(password);
                    cy.get('[data-test="register-password2"] > .MuiInputBase-root > .MuiInputBase-input').type(password);
            
                    // Act 
                    cy.get('[data-test="register-submit"]').click();
            
                    // Assert
                    cy.get('[data-test="register-email"] > .MuiFormHelperText-root').should('contain', 'Email é obrigatório');
                });
            
                it('Quando SENHA e CONFIRMAR menor que 6 caracteres', () => {
                    // Arrange
                    cy.get('[data-test="register-name"] > .MuiInputBase-root > .MuiInputBase-input').type(name);
                    cy.get('[data-test="register-email"] > .MuiInputBase-root > .MuiInputBase-input').type(faker.internet.email(name));
                    cy.get('[data-test="register-password"] > .MuiInputBase-root > .MuiInputBase-input').type('123');
                    cy.get('[data-test="register-password2"] > .MuiInputBase-root > .MuiInputBase-input').type('123');
            
                    // Act 
                    cy.get('[data-test="register-submit"]').click();
            
                    // Assert
                    cy.get('[data-test="register-password"] > .MuiFormHelperText-root').should('contain', 'A senha deve conter no mínimo 6 caracteres');
                    cy.get('[data-test="register-password2"] > .MuiFormHelperText-root').should('contain', 'A senha deve conter no mínimo 6 caracteres');
                });
            
                it('Quando SENHA menor 6 caracteres, CONFIRMAR em branco', () => {
                    // Arrange
                    cy.get('[data-test="register-name"] > .MuiInputBase-root > .MuiInputBase-input').type(name);
                    cy.get('[data-test="register-email"] > .MuiInputBase-root > .MuiInputBase-input').type(faker.internet.email(name));
                    cy.get('[data-test="register-password"] > .MuiInputBase-root > .MuiInputBase-input').type('123');
                    cy.get('[data-test="register-password2"] > .MuiInputBase-root > .MuiInputBase-input').focus().blur();
            
                    // Act 
                    cy.get('[data-test="register-submit"]').click();
            
                    // Assert
                    cy.get('[data-test="register-password"] > .MuiFormHelperText-root').should('contain', 'A senha deve conter no mínimo 6 caracteres');
                    cy.get('[data-test="register-password2"] > .MuiFormHelperText-root').should('contain', 'Confirmar senha é obrigatória');
                });
            
                it('Quando SENHA menor 6 caracteres', () => {
                    // Arrange
                    cy.get('[data-test="register-name"] > .MuiInputBase-root > .MuiInputBase-input').type(name);
                    cy.get('[data-test="register-email"] > .MuiInputBase-root > .MuiInputBase-input').type(faker.internet.email(name));
                    cy.get('[data-test="register-password"] > .MuiInputBase-root > .MuiInputBase-input').type('123');
                    cy.get('[data-test="register-password2"] > .MuiInputBase-root > .MuiInputBase-input').type(password);
            
                    // Act 
                    cy.get('[data-test="register-submit"]').click();
            
                    // Assert
                    cy.get('[data-test="register-password"] > .MuiFormHelperText-root').should('contain', 'A senha deve conter no mínimo 6 caracteres');
                    cy.get('[data-test="register-password2"] > .MuiFormHelperText-root').should('contain', 'Senhas precisam ser idênticas');
                });
            
                it('Quando SENHA e CONFIRMAÇÃO não informadas', () => {
                    // Arrange
                    cy.get('[data-test="register-name"] > .MuiInputBase-root > .MuiInputBase-input').type(name);
                    cy.get('[data-test="register-email"] > .MuiInputBase-root > .MuiInputBase-input').type(faker.internet.email(name));
                    cy.get('[data-test="register-password"] > .MuiInputBase-root > .MuiInputBase-input').focus().blur();
                    cy.get('[data-test="register-password2"] > .MuiInputBase-root > .MuiInputBase-input').focus().blur();
            
                    // Act 
                    cy.get('[data-test="register-submit"]').click();
            
                    // Assert
                    cy.get('[data-test="register-password"] > .MuiFormHelperText-root').should('contain', 'Senha é obrigatória');
                    cy.get('[data-test="register-password2"] > .MuiFormHelperText-root').should('contain', 'Confirmar senha é obrigatória');
                });
            
                it('Quando SENHA não informada e CONFIRMAÇÃO menor que 6 caracteres', () => {
                    // Arrange
                    cy.get('[data-test="register-name"] > .MuiInputBase-root > .MuiInputBase-input').type(name);
                    cy.get('[data-test="register-email"] > .MuiInputBase-root > .MuiInputBase-input').type(faker.internet.email(name));
                    cy.get('[data-test="register-password"] > .MuiInputBase-root > .MuiInputBase-input').focus().blur();
                    cy.get('[data-test="register-password2"] > .MuiInputBase-root > .MuiInputBase-input').type('123');
            
                    // Act 
                    cy.get('[data-test="register-submit"]').click();
            
                    // Assert
                    cy.get('[data-test="register-password"] > .MuiFormHelperText-root').should('contain', 'Senha é obrigatória');
                    cy.get('[data-test="register-password2"] > .MuiFormHelperText-root').should('contain', 'Senhas precisam ser idênticas');
                });
            
                it('Quando SENHA não informada', () => {
                    // Arrange
                    cy.get('[data-test="register-name"] > .MuiInputBase-root > .MuiInputBase-input').type(name);
                    cy.get('[data-test="register-email"] > .MuiInputBase-root > .MuiInputBase-input').type(faker.internet.email(name));
                    cy.get('[data-test="register-password"] > .MuiInputBase-root > .MuiInputBase-input').focus().blur();
                    cy.get('[data-test="register-password2"] > .MuiInputBase-root > .MuiInputBase-input').type(password);
            
                    // Act 
                    cy.get('[data-test="register-submit"]').click();
            
                    // Assert
                    cy.get('[data-test="register-password"] > .MuiFormHelperText-root').should('contain', 'Senha é obrigatória');
                    cy.get('[data-test="register-password2"] > .MuiFormHelperText-root').should('contain', 'Senhas precisam ser idênticas');
                });
            
                it('Quando CONFIRMAÇÃO não informada', () => {
                    // Arrange
                    cy.get('[data-test="register-name"] > .MuiInputBase-root > .MuiInputBase-input').type(name);
                    cy.get('[data-test="register-email"] > .MuiInputBase-root > .MuiInputBase-input').type(faker.internet.email(name));
                    cy.get('[data-test="register-password"] > .MuiInputBase-root > .MuiInputBase-input').type(password);
                    cy.get('[data-test="register-password2"] > .MuiInputBase-root > .MuiInputBase-input').focus().blur();
            
                    // Act 
                    cy.get('[data-test="register-submit"]').click();
            
                    // Assert
                    cy.get('[data-test="register-password2"] > .MuiFormHelperText-root').should('contain', 'Confirmar senha é obrigatória');
                });
            
                it('Quando CONFIRMAÇÃO menor que 6 caracteres', () => {
                    // Arrange
                    cy.get('[data-test="register-name"] > .MuiInputBase-root > .MuiInputBase-input').type(name);
                    cy.get('[data-test="register-email"] > .MuiInputBase-root > .MuiInputBase-input').type(faker.internet.email(name));
                    cy.get('[data-test="register-password"] > .MuiInputBase-root > .MuiInputBase-input').type(password);
                    cy.get('[data-test="register-password2"] > .MuiInputBase-root > .MuiInputBase-input').type('123');
            
                    // Act
                    cy.get('[data-test="register-submit"]').click();
            
                    // Assert
                    cy.get('[data-test="register-password2"] > .MuiFormHelperText-root').should('contain', 'Senhas precisam ser idênticas');
                });
            });
            context('Quando todos os dados forem devidamente preenchidos, devo criar a conta com sucesso', () => {
                it('Devecriar a conta com sucesso', () => {
                    cy.createAccount(true, false);
                });                 
            });
            context('Quando tentar excluir uma conta já existente', () => {
                it('Devo excluir uma conta existente com sucesso', () => {
   
                    cy.createAccount(true, false).then(data => {
                        cy.createProfile('Estudante ou Aprendendo', 'ViaHub', 'http://www.viahub.com.br', 'São Paulo', 'JavaScript, C#', 'userGithubTeste','Teste').then(data => {
                            cy.deleteAccount();                            
                            // Assert
                            cy.get('.alert-undefined').should('contain', 'Sua conta foi removida');
                        });
                    });
                 });                                                
            });
        });        
    });
});