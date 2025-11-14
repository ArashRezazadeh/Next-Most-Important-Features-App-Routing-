describe('articles APIs', () => {
  it('should correctly set application/json header', () => {
    cy.request('http://localhost:3000/api/articles')
      .its('headers')
      .its('content-type')
      .should('include', 'application/json')
  })

  it('should correctly return a 200 status code', () => {
    cy.request('http://localhost:3000/api/articles')
      .its('status')
      .should('be.equal', 200)
  })

  it('should correctly return a list of articles', () => {
    cy.request('http://localhost:3000/api/articles')
      .its('body')
      .each((article) => {
        expect(article).to.have.keys('id', 'title', 'body', 'author', 'image')
        expect(article.author).to.have.keys('id', 'name')
        expect(article.image).to.have.keys('url', 'author')
      })
  })

  it('should correctly return an article given an ID', () => {
    cy.request('http://localhost:3000/api/article?id=u12w3o0d')
      .then((response) => {
        expect(response.status).to.equal(200)
        expect(response.body).to.have.keys('id', 'title', 'body', 'author', 'image')
        expect(response.body.author).to.have.keys('id', 'name')
        expect(response.body.image).to.have.keys('url', 'author')
      })
  })

  it('should correctly return a 404 status code when an article is not found', () => {
    cy.request({
      url: 'http://localhost:3000/api/article?id=unexistingID',
      failOnStatusCode: false,
    })
    .its('status')
    .should('be.equal', 404)
  })
})