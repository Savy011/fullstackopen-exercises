describe('Blog App', () => {
    const testUser = {
        username: 'testuser1',
        name: 'Test User',
        password: 'testuser@1'
    }
    const testUser2 = {
        username: 'testuser2',
        name: 'Test User 2',
        password: 'testuser@2'
    }

    beforeEach(function() {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        cy.request('POST', 'http://localhost:3001/api/users', testUser)
        cy.request('POST', 'http://localhost:3001/api/users', testUser2)
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
            cy.visit('http://localhost:3000')
            cy.contains('Log-in to the Application')

            cy.wait(1000)
            cy.get('#username').type('testuser1', { force: true })
            cy.get('#password').type('wrong', { force: true })
            cy.get('#login-button').click({ force: true })
            
            cy.wait(1000)
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
        
        it('one user cannot delete other user\'s blogs', function() {
            cy.createNote({ title: 'Blog by First User', author: 'Author', url: 'https://link.to/blog' })

            cy.wait(1000)
            cy.get('#logout-button').click({ force: true }) 
            
            cy.wait(1000)
            cy.login({ username: testUser2.username, password: testUser2.password }) 
            
            cy.wait(1000)
            cy.get('#show-button').click({ force: true })
            cy.get('#delete-button').should('not.exist')
        })

        it('blogs are sorted by number of likes', function() {
            cy.get('html')
            cy.createNote({ title: 'First Test Blog', author: 'Author1', url: 'https://link.to/blog1' })
            cy.createNote({ title: 'Second Test Blog', author: 'Author2', url: 'https://link.to/blog2' })
            cy.createNote({ title: 'Third Test Blog', author: 'Author3', url: 'https://link.to/blog3' })
            
            cy.get(':nth-child(1) > .blog-title > #show-button').click({ force: true })
            cy.get(':nth-child(1) > .blog-details > :nth-child(2) > #like-button')
                .click({ force:true })
            
            cy.get(':nth-child(2) > .blog-title > #show-button').click({ force: true })
            cy.get(':nth-child(2) > .blog-details > :nth-child(2) > #like-button')
                .click({ force:true })
                .click({ force:true })
            
            cy.get(':nth-child(3) > .blog-title > #show-button').click({ force: true })
            cy.get(':nth-child(3) > .blog-details > :nth-child(2) > #like-button')
                .click({ force:true })
                .click({ force:true })
                .click({ force:true })
            
            cy.get(':nth-child(1) > .blog-details > :nth-child(2) > #likes').should('contain', 'Likes: 3')
            cy.get(':nth-child(2) > .blog-details > :nth-child(2) > #likes').should('contain', 'Likes: 2')
            cy.get(':nth-child(3) > .blog-details > :nth-child(2) > #likes').should('contain', 'Likes: 1')
        })
    })
})