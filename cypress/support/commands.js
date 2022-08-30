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
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

/// <reference types="Cypress" />
const faker = require('faker-br');

Cypress.Commands.add('navigate', (route) => {
    cy.intercept(route).as('loadpage')
    cy.visit(route, { timeout: 30000 })
    cy.wait('@loadpage')
})

Cypress.Commands.add('login', (email, password) => {
    cy.visit('login', { timeout: 30000 });

    cy.get('[data-test="login-email"] > .MuiInputBase-root > .MuiInputBase-input').type(email);
    cy.get('[data-test="login-password"]').type(password);

    cy.get('[data-test="login-submit"]').click();
    cy.wait('@loadpage');
});

Cypress.Commands.add('createAccount', (name = null, email = null, password = null, confirmPassword = null, generateFake, returnAccount) => {

    if (generateFake)
    {
        name = faker.name.findName();
        password = faker.internet.password();
        email = faker.internet.email(name);
        confirmPassword = password;
    }

    cy.get('[data-test="register-name"] > .MuiInputBase-root > .MuiInputBase-input').type(name);
    cy.get('[data-test="register-email"] > .MuiInputBase-root > .MuiInputBase-input').type(email.replace('..', '.'));
    cy.get('[data-test="register-password"] > .MuiInputBase-root > .MuiInputBase-input').type(password);
    cy.get('[data-test="register-password2"] > .MuiInputBase-root > .MuiInputBase-input').type(confirmPassword);

    cy.get('[data-test="register-submit"]').click();

    if (returnAccount)
    {
        let account = { "name": name, "email" : email, "password": password};
        cy.log(account);
        return cy.wrap(account);
    }
});

Cypress.Commands.add('deleteAccount', () => {
    cy.get('[data-test="dashboard-deleteProfile"]').click();

});

Cypress.Commands.add('createProfile', (status, company, website, location, skills, githubUsername, bio) => {

    cy.get('[data-test="dashboard-createProfile"]').click();

    cy.get('#mui-component-select-status').click();

    cy.get('#mui-component-select-status').then(() => {
        cy.get('li').each(($list) => {
            let option = $list.text().trim();

            if (option === status){
                cy.wrap($list).click();
            }
        })
    })

    cy.get('[data-test="profile-company"] > .MuiInputBase-root > .MuiInputBase-input').type(company);
    cy.get('[data-test="profile-webSite"] > .MuiInputBase-root > .MuiInputBase-input').type(website);
    cy.get('[data-test="profile-location"] > .MuiInputBase-root > .MuiInputBase-input').type(location);


    cy.get('[data-test="profile-skills"] > .MuiInputBase-root > .MuiInputBase-input').type(skills);    
    cy.get('[data-test="profile-gitHub"] > .MuiInputBase-root > .MuiInputBase-input').type(githubUsername);
    cy.get('[rows="1"]').type(bio);

    cy.get('[data-test="profile-submit"]').click();
})
