/// <reference types="cypress" />

import auth from '../../fixtures/auth.json';

describe('Validar API Autenticação', () => {
    context('[POST] Dado que executo o endpoint de autenticação', () => {
        it('Quando informo um usuário e senha válidos', () => {
            cy.request({
                method: 'POST',
                url: '/api/auth',
                body: auth
            }).then((response) => {
                expect(response.status).to.equal(200);
                expect(response.body).to.be.not.empty;
                expect(response.body).to.have.property("jwt");
                cy.getCookies('conexaoqa.herokuapp.com').should('exist')
            })
        })

        it('Quando informo um usuário e/ou senha inválidos', () => {
            cy.request({
                method: 'POST',
                url: '/api/auth',
                failOnStatusCode: false,
                body: {"email": "edson@edson.com", "password": "123123"}
            }).then((response) => {
                expect(response.status).to.equal(401);
                expect(response.body).to.be.not.empty;
            })
        })

        // it('Então a consulta deverá ser executada com sucesso', () => {
        //     expect(response.status).to.equal(200);
        //     expect(response.body).to.be.not.empty;
        // })
    })
})