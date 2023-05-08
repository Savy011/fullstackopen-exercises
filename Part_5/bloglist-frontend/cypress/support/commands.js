Cypress.Commands.add('login', ({ username, password }) => {
    cy.request('POST', 'http://localhost:3001/api/login', {
        username, password
    }).then(({ body }) => {
        cy.wait(1000)
        localStorage.setItem('loggedBlogAppUser', JSON.stringify(body))
        cy.visit('http://localhost:3000')
    })
})