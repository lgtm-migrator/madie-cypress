export {}

let testCase = {
    'id': 'test',
    'name': 'testName',
    'description': 'testDescription',
    'createdBy': 'CV',
    'lastModifiedBy': 'CV'
}

describe('Test Case Service', () => {

    it('Create Test Case, successful', () => {
        cy.request({
            url: '/api/test-case',
            method: 'POST',
            headers: {  'Content-Type': 'application/json'
                    },
            body: testCase
        }).then((response) => {
            expect(response.status).to.eql(201)
            expect(response.body.id).to.be.exist
        })
    })
})





