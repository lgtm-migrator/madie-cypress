let measureName = ''

describe('Edit Measure', () => {

    measureName = 'APITestMeasure' + Date.now()

    it('PUT Success 200 created', () => {
        cy.request({
            url: '/api/measure',
            method: 'PUT',
            body: {"id": "61c37324c3ea4928b42712f7","measureName": measureName}
        }).then((response) => {
            expect(response.status).to.eql(200)
        })
    })

    it('Measure Name empty', () => {
        measureName = ''
        cy.request({
            failOnStatusCode: false,
            url: '/api/measure',
            method: 'PUT',
            body: {"id": "61c37324c3ea4928b42712f7","measureName": measureName}
        }).then((response) => {
            expect(response.status).to.eql(400)
            expect(response.body.measureName).to.eql('Measure Name is Required')
        })
    })

    it('Measure Name does not contain at least 1 letter', () => {
        measureName = '12343456456'
        cy.request({
            failOnStatusCode: false,
            url: '/api/measure',
            method: 'PUT',
            body: {"id": "61c37324c3ea4928b42712f7","measureName": measureName}
        }).then((response) => {
            expect(response.status).to.eql(400)
            expect(response.body.measureName).to.eql('Measure Name is Required')
        })
    })

    it('Measure Name contains underscore', () => {
        measureName = 'APITestMeasure_' + Date.now()
        cy.request({
            failOnStatusCode: false,
            url: '/api/measure',
            method: 'PUT',
            body: {"id": "61c37324c3ea4928b42712f7","measureName": measureName}
        }).then((response) => {
            expect(response.status).to.eql(400)
            expect(response.body.measureName).to.eql('Measure Name can not contain underscores')
        })
    })

    it('Measure Name over 500 characters', () => {
        measureName = 'qwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwerty' +
            'qwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwerty' +
            'qwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwerty' +
            'qwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwerty' +
            'qwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwqwertyqwertyqwertyqwertyqwertyq'
        cy.request({
            failOnStatusCode: false,
            url: '/api/measure',
            method: 'PUT',
            body: {"id": "61c37324c3ea4928b42712f7","measureName": measureName}
        }).then((response) => {
            expect(response.status).to.eql(400)
            expect(response.body.measureName).to.eql('Measure Name contains at least one letter and can not be ' +
                'more than 500 characters')
        })
    })
})