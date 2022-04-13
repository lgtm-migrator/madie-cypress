export {}


describe('Measure Service: Edit Measure', () => {

    before('Create Measure',() => {

        cy.setAccessTokenCookie()

        //Create New Measure
        cy.getCookie('accessToken').then((accessToken) => {
            cy.request({
                url: '/api/measure',
                headers: {
                    authorization: 'Bearer ' + accessToken.value
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
                cy.writeFile('cypress/downloads/measureId', response.body.id)
            })
        })
    })

    beforeEach('Set Access Token',() => {

        cy.setAccessTokenCookie()

    })

    it('Update Measure details', () => {

        //Update Measure details
        cy.getCookie('accessToken').then((accessToken) => {
            cy.readFile('cypress/downloads/measureId').should('exist').then((id) => {
                cy.request({
                    url: '/api/measures/' +id,
                    headers: {
                        authorization: 'Bearer ' + accessToken.value
                    },
                    method: 'PUT',
                    body: {
                        'id': id,
                        'measureName': 'UpdatedTestMeasure' + Date.now(),
                        'cqlLibraryName': 'UpdatedCqlLibrary' + Date.now(),
                        'model': 'QI-Core',
                        'measureScoring': 'Ratio'
                    }
                }).then((response) => {
                    expect(response.status).to.eql(200)
                    expect(response.body).to.eql('Measure updated successfully.')
                })
            })
        })
    })

    it('Verify error message when the measure name is empty', () => {

        cy.getCookie('accessToken').then((accessToken) => {
            cy.readFile('cypress/downloads/measureId').should('exist').then((id) => {
                //Verify error message when the measure name is empty
                cy.request({
                    failOnStatusCode: false,
                    url: '/api/measures/' +id,
                    headers: {
                        authorization: 'Bearer ' + accessToken.value
                    },
                    method: 'PUT',
                    body: {
                        'id': id,
                        'measureName': "",
                        'cqlLibraryName': 'UpdatedCqlLibrary' + Date.now(),
                        'model': 'QI-Core',
                        'measureScoring': 'Ratio'
                    }
                }).then((response) => {
                    expect(response.status).to.eql(400)
                    expect(response.body.validationErrors.measureName).to.eql('Measure Name is required.')
                })
            })
        })
    })

    it('Verify error message when the measure name does not contain at least 1 letter', () => {

        cy.getCookie('accessToken').then((accessToken) => {
            cy.readFile('cypress/downloads/measureId').should('exist').then((id) => {
                cy.request({
                    failOnStatusCode: false,
                    url: '/api/measures/' +id,
                    headers: {
                        authorization: 'Bearer ' + accessToken.value
                    },
                    method: 'PUT',
                    body: {
                        'id': id,
                        'measureName': '12343456456',
                        'cqlLibraryName': 'UpdatedCqlLibrary' + Date.now(),
                        'model': 'QI-Core',
                        'measureScoring': 'Ratio'
                    }
                }).then((response) => {
                    expect(response.status).to.eql(400)
                    expect(response.body.validationErrors.measureName).to.eql('A measure name must contain at least one letter.')
                })
            })
        })
    })

    it('Verify error message when the measure name contains underscore', () => {

        cy.getCookie('accessToken').then((accessToken) => {
            cy.readFile('cypress/downloads/measureId').should('exist').then((id) => {
                cy.request({
                    failOnStatusCode: false,
                    url: '/api/measures/' +id,
                    headers: {
                        authorization: 'Bearer ' + accessToken.value
                    },
                    method: 'PUT',
                    body: {
                        'id': id,
                        'measureName': 'Test_Measure',
                        'cqlLibraryName': 'UpdatedCqlLibrary' + Date.now(),
                        'model': 'QI-Core',
                        'measureScoring': 'Ratio'
                    }
                }).then((response) => {
                    expect(response.status).to.eql(400)
                    expect(response.body.validationErrors.measureName).to.eql('Measure Name can not contain underscores.')
                })
            })
        })
    })

    it('Verify error message when the measure name is over 500 characters', () => {

        cy.getCookie('accessToken').then((accessToken) => {
            cy.readFile('cypress/downloads/measureId').should('exist').then((id) => {
                cy.request({
                    failOnStatusCode: false,
                    url: '/api/measures/' +id,
                    headers: {
                        authorization: 'Bearer ' + accessToken.value
                    },
                    method: 'PUT',
                    body: {
                        'id': id,
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
            })
        })
    })

    it('Save CQL to the measure', () => {

        cy.getCookie('accessToken').then((accessToken) => {
            cy.readFile('cypress/downloads/measureId').should('exist').then((id) => {
                cy.request({
                    url: '/api/measures/' +id,
                    headers: {
                        authorization: 'Bearer ' + accessToken.value
                    },
                    method: 'PUT',
                    body: {
                        'id': id,
                        'measureName': 'UpdatedTestMeasure' + Date.now(),
                        'cql': "library xyz version '1.5.000'\n\nusing FHIR version '4.0.1'\n\ninclude FHIRHelpers version '4.0.001' called FHIRHelpers\ninclude SupplementalDataElementsFHIR4 version '2.0.000' called SDE\ninclude MATGlobalCommonFunctionsFHIR4 version '6.1.000' called Global\n\nparameter \"Measurement Period\" Interval<DateTime>\n\ncontext Patient\n\ndefine \"SDE Ethnicity\":\n  SDE.\"SDE Ethnicity\"\n\ndefine \"SDE Payer\":\n  SDE.\"SDE Payer\"\n\ndefine \"SDE Race\":\n  SDE.\"SDE Race\"\n\ndefine \"SDE Sex\":\n  SDE.\"SDE Sex\"",
                        'cqlLibraryName': 'UpdatedCqlLibrary' + Date.now(),
                        'model': 'QI-Core',
                        'measureScoring': 'Ratio'
                    }
                }).then((response) => {
                    expect(response.status).to.eql(200)
                })
            })
        })
    })

    it('Add Meta Data Measure Steward to the measure', () => {

        cy.getCookie('accessToken').then((accessToken) => {
            cy.readFile('cypress/downloads/measureId').should('exist').then((id) => {
                cy.request({
                    url: '/api/measures/' +id,
                    headers: {
                        authorization: 'Bearer ' + accessToken.value
                    },
                    method: 'PUT',
                    body: {
                        'id': id,
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

    it('Add Meta Data Description to the measure', () => {

        cy.getCookie('accessToken').then((accessToken) => {
            cy.readFile('cypress/downloads/measureId').should('exist').then((id) => {
                cy.request({
                    url: '/api/measures/' +id,
                    headers: {
                        authorization: 'Bearer ' + accessToken.value
                    },
                    method: 'PUT',
                    body: {
                        'id': id,
                        'measureName': 'UpdatedTestMeasure' + Date.now(),
                        'cql': "library xyz version '1.5.000'\n\nusing FHIR version '4.0.1'\n\ninclude FHIRHelpers version '4.0.001' called FHIRHelpers\ninclude SupplementalDataElementsFHIR4 version '2.0.000' called SDE\ninclude MATGlobalCommonFunctionsFHIR4 version '6.1.000' called Global\n\nparameter \"Measurement Period\" Interval<DateTime>\n\ncontext Patient\n\ndefine \"SDE Ethnicity\":\n  SDE.\"SDE Ethnicity\"\n\ndefine \"SDE Payer\":\n  SDE.\"SDE Payer\"\n\ndefine \"SDE Race\":\n  SDE.\"SDE Race\"\n\ndefine \"SDE Sex\":\n  SDE.\"SDE Sex\"",
                        'cqlLibraryName': 'UpdatedCqlLibrary' + Date.now(),
                        'model': 'QI-Core',
                        'measureScoring': 'Ratio',
                        'measureMetaData': {"description": "SemanticBits"}
                    }
                }).then((response) => {
                    expect(response.status).to.eql(200)
                })
            })
        })
    })

    it('Add Meta Data Copyright to the measure', () => {

        cy.getCookie('accessToken').then((accessToken) => {
            cy.readFile('cypress/downloads/measureId').should('exist').then((id) => {
                cy.request({
                    url: '/api/measures/' +id,
                    headers: {
                        authorization: 'Bearer ' + accessToken.value
                    },
                    method: 'PUT',
                    body: {
                        'id': id,
                        'measureName': 'UpdatedTestMeasure' + Date.now(),
                        'cql': "library xyz version '1.5.000'\n\nusing FHIR version '4.0.1'\n\ninclude FHIRHelpers version '4.0.001' called FHIRHelpers\ninclude SupplementalDataElementsFHIR4 version '2.0.000' called SDE\ninclude MATGlobalCommonFunctionsFHIR4 version '6.1.000' called Global\n\nparameter \"Measurement Period\" Interval<DateTime>\n\ncontext Patient\n\ndefine \"SDE Ethnicity\":\n  SDE.\"SDE Ethnicity\"\n\ndefine \"SDE Payer\":\n  SDE.\"SDE Payer\"\n\ndefine \"SDE Race\":\n  SDE.\"SDE Race\"\n\ndefine \"SDE Sex\":\n  SDE.\"SDE Sex\"",
                        'cqlLibraryName': 'UpdatedCqlLibrary' + Date.now(),
                        'model': 'QI-Core',
                        'measureScoring': 'Ratio',
                        'measureMetaData': {"copyright": "copyright"}
                    }
                }).then((response) => {
                    expect(response.status).to.eql(200)
                })
            })
        })
    })

    it('Add Meta Data Disclaimer to the measure', () => {

        cy.getCookie('accessToken').then((accessToken) => {
            cy.readFile('cypress/downloads/measureId').should('exist').then((id) => {
                cy.request({
                    url: '/api/measures/' +id,
                    headers: {
                        authorization: 'Bearer ' + accessToken.value
                    },
                    method: 'PUT',
                    body: {
                        'id': id,
                        'measureName': 'UpdatedTestMeasure' + Date.now(),
                        'cql': "library xyz version '1.5.000'\n\nusing FHIR version '4.0.1'\n\ninclude FHIRHelpers version '4.0.001' called FHIRHelpers\ninclude SupplementalDataElementsFHIR4 version '2.0.000' called SDE\ninclude MATGlobalCommonFunctionsFHIR4 version '6.1.000' called Global\n\nparameter \"Measurement Period\" Interval<DateTime>\n\ncontext Patient\n\ndefine \"SDE Ethnicity\":\n  SDE.\"SDE Ethnicity\"\n\ndefine \"SDE Payer\":\n  SDE.\"SDE Payer\"\n\ndefine \"SDE Race\":\n  SDE.\"SDE Race\"\n\ndefine \"SDE Sex\":\n  SDE.\"SDE Sex\"",
                        'cqlLibraryName': 'UpdatedCqlLibrary' + Date.now(),
                        'model': 'QI-Core',
                        'measureScoring': 'Ratio',
                        'measureMetaData': {"disclaimer": "disclaimer"}
                    }
                }).then((response) => {
                    expect(response.status).to.eql(200)
                })
            })
        })
    })

    it('Add Meta Data Rationale to the measure', () => {

        cy.getCookie('accessToken').then((accessToken) => {
            cy.readFile('cypress/downloads/measureId').should('exist').then((id) => {
                cy.request({
                    url: '/api/measures/' +id,
                    headers: {
                        authorization: 'Bearer ' + accessToken.value
                    },
                    method: 'PUT',
                    body: {
                        'id': id,
                        'measureName': 'UpdatedTestMeasure' + Date.now(),
                        'cql': "library xyz version '1.5.000'\n\nusing FHIR version '4.0.1'\n\ninclude FHIRHelpers version '4.0.001' called FHIRHelpers\ninclude SupplementalDataElementsFHIR4 version '2.0.000' called SDE\ninclude MATGlobalCommonFunctionsFHIR4 version '6.1.000' called Global\n\nparameter \"Measurement Period\" Interval<DateTime>\n\ncontext Patient\n\ndefine \"SDE Ethnicity\":\n  SDE.\"SDE Ethnicity\"\n\ndefine \"SDE Payer\":\n  SDE.\"SDE Payer\"\n\ndefine \"SDE Race\":\n  SDE.\"SDE Race\"\n\ndefine \"SDE Sex\":\n  SDE.\"SDE Sex\"",
                        'cqlLibraryName': 'UpdatedCqlLibrary' + Date.now(),
                        'model': 'QI-Core',
                        'measureScoring': 'Ratio',
                        'measureMetaData': {"rationale": "rationale"}
                    }
                }).then((response) => {
                    expect(response.status).to.eql(200)
                })
            })
        })
    })

    it('Add Meta Data Author to the measure', () => {

        cy.getCookie('accessToken').then((accessToken) => {
            cy.readFile('cypress/downloads/measureId').should('exist').then((id) => {
                cy.request({
                    url: '/api/measures/' +id,
                    headers: {
                        authorization: 'Bearer ' + accessToken.value
                    },
                    method: 'PUT',
                    body: {
                        'id': id,
                        'measureName': 'UpdatedTestMeasure' + Date.now(),
                        'cql': "library xyz version '1.5.000'\n\nusing FHIR version '4.0.1'\n\ninclude FHIRHelpers version '4.0.001' called FHIRHelpers\ninclude SupplementalDataElementsFHIR4 version '2.0.000' called SDE\ninclude MATGlobalCommonFunctionsFHIR4 version '6.1.000' called Global\n\nparameter \"Measurement Period\" Interval<DateTime>\n\ncontext Patient\n\ndefine \"SDE Ethnicity\":\n  SDE.\"SDE Ethnicity\"\n\ndefine \"SDE Payer\":\n  SDE.\"SDE Payer\"\n\ndefine \"SDE Race\":\n  SDE.\"SDE Race\"\n\ndefine \"SDE Sex\":\n  SDE.\"SDE Sex\"",
                        'cqlLibraryName': 'UpdatedCqlLibrary' + Date.now(),
                        'model': 'QI-Core',
                        'measureScoring': 'Ratio',
                        'measureMetaData': {"author": "author"}
                    }
                }).then((response) => {
                    expect(response.status).to.eql(200)
                })
            })
        })
    })

    it('Add Meta Data Guidance to the measure', () => {

        cy.getCookie('accessToken').then((accessToken) => {
            cy.readFile('cypress/downloads/measureId').should('exist').then((id) => {
                cy.request({
                    url: '/api/measures/' +id,
                    headers: {
                        authorization: 'Bearer ' + accessToken.value
                    },
                    method: 'PUT',
                    body: {
                        'id': id,
                        'measureName': 'UpdatedTestMeasure' + Date.now(),
                        'cql': "library xyz version '1.5.000'\n\nusing FHIR version '4.0.1'\n\ninclude FHIRHelpers version '4.0.001' called FHIRHelpers\ninclude SupplementalDataElementsFHIR4 version '2.0.000' called SDE\ninclude MATGlobalCommonFunctionsFHIR4 version '6.1.000' called Global\n\nparameter \"Measurement Period\" Interval<DateTime>\n\ncontext Patient\n\ndefine \"SDE Ethnicity\":\n  SDE.\"SDE Ethnicity\"\n\ndefine \"SDE Payer\":\n  SDE.\"SDE Payer\"\n\ndefine \"SDE Race\":\n  SDE.\"SDE Race\"\n\ndefine \"SDE Sex\":\n  SDE.\"SDE Sex\"",
                        'cqlLibraryName': 'UpdatedCqlLibrary' + Date.now(),
                        'model': 'QI-Core',
                        'measureScoring': 'Ratio',
                        'measureMetaData': {"guidance": "guidance"}
                    }
                }).then((response) => {
                    expect(response.status).to.eql(200)
                })
            })
        })
    })
})
