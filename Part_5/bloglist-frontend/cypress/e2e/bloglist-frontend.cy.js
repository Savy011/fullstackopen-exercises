describe('Blog App', () => {
    const testUser = {
        username: 'testuser1',
        name: 'Test User',
        password: 'testuser@1'
    }

    beforeEach(function() {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        cy.request('POST', 'http://localhost:3001/api/users', testUser)
    })

    it('Login Form is visible', function() {
        cy.visit('http://localhost:3000')
        cy.contains('Log-in to the Application')
        cy.contains('Username')
        cy.contains('Password')
        cy.get('#login-button')
    })

    describe('Log-in Tests', () => {
        it('Login with wrong credentials fails', async function() {
            cy.visit('http://localhost:3000')
            cy.contains('Log-in to the Application')
            cy.get('#username').type('testuser1', { force: true })
            cy.get('#password').type('wrong', { force: true })
            cy.get('#login-button').click({ force: true })
            
            await cy.get('.error').should('contain', 'Wrong Credentials')
                    .should('has.css', 'color', 'rgb(255, 0, 0)')
                    .should('has.css', 'border-style', 'solid')

        })

        it('Login with right credentials is successfull', async function() {
            cy.visit('http://localhost:3000')
            cy.contains('Log-in to the Application')
            cy.get('#username').type('testuser1', { force: true })
            cy.get('#password').type('testuser@1', { force: true })
            cy.get('#login-button').click({ force: true })
            
            await cy.get('html').should('contain', 'Logged In as Test User')
        })
    })
})