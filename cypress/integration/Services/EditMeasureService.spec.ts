export {}

let token = 'eyJraWQiOiJTQ00xeFBTVWRqVnhCTDNjNFhUUVRtd1dGMW0xS3ZsX0JsWGFDNkdIS2pnIiwiYWxnIjoiUlMyNTYifQ.eyJ2ZXIiOjEsImp0aSI6IkFULjFHOWxLUjhPX19JeWkzODY3bFQ2N18ybHBqLTFINXJlUjNsODNpUGdybGciLCJpc3MiOiJodHRwczovL2Rldi5pZHAuaWRtLmNtcy5nb3Yvb2F1dGgyL2F1c2IxMHUyNHB2OTA4bm9TMjk3IiwiYXVkIjoiMG9hYW96ZGZyaFVKWlBUTmsyOTciLCJpYXQiOjE2NDMxMjg3MjAsImV4cCI6MTY0MzEzMjMyMCwiY2lkIjoiMG9hYW96ZGZyaFVKWlBUTmsyOTciLCJ1aWQiOiIwMHU0MDh5bWFkc0pSQ1BQbTI5NyIsInNjcCI6WyJvcGVuaWQiLCJlbWFpbCJdLCJzdWIiOiJtYXRkZXZ1c2VyMSJ9.Ey66DVfFu5i5zX_XlUHsyX4agUoNUfFhMxgYrKku6mL2M1B4HwPHs84pCR7Q6Cw7i9JHL6jm3HlrWN0Oc0hAbMgBkdcoe6FUEau7nkd5-FMnHHmSoiJ9uyGDCyNEIIyo72qWQMlfQ_pwTHy_XkAGY-yy_weo1LDsGLBKilIawyn5V9ES09BPBDmhoT8OjraeHUp9z8jMxIO3AZu87CbGVrisvCeaR0gcr40CTcOFasiOMQGhbQ8b74pxrnDbYA6qqMqO1mSKVBXzq8qKjg-Wxvdra8QsLZsOlix1BkIlpWTZqvHgW3UKkF6ERLbbPfDE4Aqtpyunuw1yg9sfzmIVbA'

describe('Edit Measure', () => {

    it('Create New Measure', () => {

        //Create New Measure
        cy.request({
            url: '/api/measure',
            headers: {
                authorization: 'Bearer ' + token
            },
            method: 'POST',
            body: {
                'measureName': 'TestMeasure' + Date.now(),
                'cqlLibraryName': 'TestCql' + Date.now(),
                'model': 'QI-Core',
                'measureScoring': 'Cohort'
            }
        }).then((response) => {
            expect(response.status).to.eql(201)
            expect(response.body.id).to.be.exist

            //Update Measure details
            cy.request({
                url: '/api/measure',
                headers: {
                    authorization: 'Bearer ' + token
                },
                method: 'PUT',
                body: {
                    'id': response.body.id,
                    'measureName': 'UpdatedTestMeasure' + Date.now(),
                    'cqlLibraryName': 'UpdatedCqlLibrary' + Date.now(),
                    'model': 'QI-Core',
                    'measureScoring': 'Ratio'
                }
            }).then((response) => {
                expect(response.status).to.eql(200)
                expect(response.body).to.eql('Measure updated successfully.')
            })

            //Verify error message when the measure name is empty
            cy.request({
                failOnStatusCode: false,
                url: '/api/measure',
                headers: {
                    authorization: 'Bearer ' + token
                },
                method: 'PUT',
                body: {
                    'id': response.body.id,
                    'measureName': "",
                    'cqlLibraryName': 'UpdatedCqlLibrary' + Date.now(),
                    'model': 'QI-Core',
                    'measureScoring': 'Ratio'
                }
            }).then((response) => {
                expect(response.status).to.eql(400)
                expect(response.body.validationErrors.measureName).to.eql('Measure Name is required.')
            })

            //Verify error message when the measure name does not contain at least 1 letter
            cy.request({
                failOnStatusCode: false,
                url: '/api/measure',
                headers: {
                    authorization: 'Bearer ' + token
                },
                method: 'PUT',
                body: {
                    'id': response.body.id,
                    'measureName': '12343456456',
                    'cqlLibraryName': 'UpdatedCqlLibrary' + Date.now(),
                    'model': 'QI-Core',
                    'measureScoring': 'Ratio'
                }
            }).then((response) => {
                expect(response.status).to.eql(400)
                expect(response.body.validationErrors.measureName).to.eql('A measure name must contain at least one letter.')
            })

            //Verify error message when the measure name contains underscore
            cy.request({
                failOnStatusCode: false,
                url: '/api/measure',
                headers: {
                    authorization: 'Bearer ' + token
                },
                method: 'PUT',
                body: {
                    'id': response.body.id,
                    'measureName': 'Test_Measure',
                    'cqlLibraryName': 'UpdatedCqlLibrary' + Date.now(),
                    'model': 'QI-Core',
                    'measureScoring': 'Ratio'
                }
            }).then((response) => {
                expect(response.status).to.eql(400)
                expect(response.body.validationErrors.measureName).to.eql('Measure Name can not contain underscores.')
            })

            //Verify error message when the measure name is over 500 characters
            cy.request({
                failOnStatusCode: false,
                url: '/api/measure',
                headers: {
                    authorization: 'Bearer ' + token
                },
                method: 'PUT',
                body: {
                    'id': response.body.id,
                    'measureName': 'qwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwerty' +
                        'qwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwerty' +
                        'qwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwerty' +
                        'qwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwerty' +
                        'qwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwertyqwqwertyqwertyqwertyqwertyqwertyq',
                    'cqlLibraryName': 'UpdatedCqlLibrary' + Date.now(),
                    'model': 'QI-Core',
                    'measureScoring': 'Ratio'
                }
            }).then((response) => {
                expect(response.status).to.eql(400)
                expect(response.body.validationErrors.measureName).to.eql('Measure Name can not be more than 500 characters.')
            })

            //Save CQL to the measure
            cy.request({
                url: '/api/measure',
                headers: {
                    authorization: 'Bearer ' + token
                },
                method: 'PUT',
                body: {
                    'id': response.body.id,
                    'measureName': 'UpdatedTestMeasure' + Date.now(),
                    'cql': "library xyz version '1.5.000'\n\nusing FHIR version '4.0.1'\n\ninclude FHIRHelpers version '4.0.001' called FHIRHelpers\ninclude SupplementalDataElementsFHIR4 version '2.0.000' called SDE\ninclude MATGlobalCommonFunctionsFHIR4 version '6.1.000' called Global\n\nparameter \"Measurement Period\" Interval<DateTime>\n\ncontext Patient\n\ndefine \"SDE Ethnicity\":\n  SDE.\"SDE Ethnicity\"\n\ndefine \"SDE Payer\":\n  SDE.\"SDE Payer\"\n\ndefine \"SDE Race\":\n  SDE.\"SDE Race\"\n\ndefine \"SDE Sex\":\n  SDE.\"SDE Sex\"",
                    'cqlLibraryName': 'UpdatedCqlLibrary' + Date.now(),
                    'model': 'QI-Core',
                    'measureScoring': 'Ratio'
                }
            }).then((response) => {
                expect(response.status).to.eql(200)
            })

            //Add Measure Steward the measure
            cy.request({
                url: '/api/measure',
                headers: {
                    authorization: 'Bearer ' + token
                },
                method: 'PUT',
                body: {
                    'id': response.body.id,
                    'measureName': 'UpdatedTestMeasure' + Date.now(),
                    'cql': "library xyz version '1.5.000'\n\nusing FHIR version '4.0.1'\n\ninclude FHIRHelpers version '4.0.001' called FHIRHelpers\ninclude SupplementalDataElementsFHIR4 version '2.0.000' called SDE\ninclude MATGlobalCommonFunctionsFHIR4 version '6.1.000' called Global\n\nparameter \"Measurement Period\" Interval<DateTime>\n\ncontext Patient\n\ndefine \"SDE Ethnicity\":\n  SDE.\"SDE Ethnicity\"\n\ndefine \"SDE Payer\":\n  SDE.\"SDE Payer\"\n\ndefine \"SDE Race\":\n  SDE.\"SDE Race\"\n\ndefine \"SDE Sex\":\n  SDE.\"SDE Sex\"",
                    'cqlLibraryName': 'UpdatedCqlLibrary' + Date.now(),
                    'model': 'QI-Core',
                    'measureScoring': 'Ratio',
                    'measureMetaData': {"measureSteward": "SemanticBits"}
                }
            }).then((response) => {
                expect(response.status).to.eql(200)
            })

        })
    })
})
