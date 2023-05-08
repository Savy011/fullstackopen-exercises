describe('Blog App', () => {
    const testUser = {
        username: 'testuser1',
        name: 'Test User',
        password: 'testuser@1'
    }

    beforeEach(function() {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        cy.request('POST', 'http://localhost:3001/api/users', testUser)
        cy.visit('http://localhost:3000')
    })

    it('Login Form is visible', function() {
        cy.contains('Log-in to the Application')
        cy.contains('Username')
        cy.contains('Password')
        cy.get('#login-button')
    })

    describe('Log-in Tests', () => {
        it('Login with wrong credentials fails', function() {
            cy.contains('Log-in to the Application')
            cy.get('#username').type('testuser1', { force: true })
            cy.get('#password').type('wrong', { force: true })
            cy.get('#login-button').click({ force: true })
            
            cy.get('.error').should('contain', 'Wrong Credentials')
                    .should('has.css', 'color', 'rgb(255, 0, 0)')
                    .should('has.css', 'border-style', 'solid')

        })

        it('Login with right credentials is successfull', function() {
            cy.contains('Log-in to the Application')
            cy.get('#username').type('testuser1', { force: true })
            cy.get('#password').type('testuser@1', { force: true })
            cy.get('#login-button').click({ force: true })
            
            cy.get('html').should('contain', 'Logged In as Test User')
        })
    })

    describe('When user is logged in', () => {
        beforeEach(function() {
            cy.login({ username: testUser.username, password: testUser.password }) 
        })

        it('logged user can create a blog', async function() {
            cy.contains('Create Blog').click({ force: true })
            cy.get('#title-input').type('Blog Title', { force: true })
            cy.get('#author-input').type('Author', { force: true })
            cy.get('#url-input').type('https://link.to/blog', { force: true })
            cy.get('#submit-button').click()
            
            cy.contains('Blog Title - Author')
        })

        it('logged user can like a blog', function() {
            cy.contains('Create Blog').click({ force: true })
            cy.get('#title-input').type('Blog Title', { force: true })
            cy.get('#author-input').type('Author', { force: true })
            cy.get('#url-input').type('https://link.to/blog', { force: true })
            cy.get('#submit-button').click({ force:true })
            
            cy.wait(1000)
            cy.get('#show-button').click({ force: true })

            cy.contains('Likes: 0')

            cy.wait(1000)
            cy.get('#like-button').click({ force: true })
            cy.wait(1000)
            cy.contains('Likes: 1')
            cy.contains('Liked \'Blog Title\' by Author')
        })

        it('logged user can delete a blog', function() {
            cy.createNote({ title: 'Blog Title', author: 'Author', url: 'https://link.to/blog' })
            
            cy.wait(1000)
            cy.get('#show-button').click({ force: true })

            cy.contains('Likes: 0')

            cy.wait(1000)
            cy.get('#delete-button').click({ force: true })
            cy.wait(1000)
            cy.contains('Deleted \'Blog Title\' by Author')
        })
    })
})