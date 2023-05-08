describe('Blog App', () => {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        cy.visit('http://localhost:3000')
    })
    it('Login Form is visible', () => {
        cy.contains('Username')
        cy.contains('Password')
        cy.contains('Log-in')
    })
})