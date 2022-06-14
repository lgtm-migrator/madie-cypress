import {Utilities} from "../../../Shared/Utilities"
import {OktaLogin} from "../../../Shared/OktaLogin"
import {MeasuresPage} from "../../../Shared/MeasuresPage"
import {CQLEditorPage} from "../../../Shared/CQLEditorPage"
import {Header} from "../../../Shared/Header"
import {EditMeasurePage } from "../../../Shared/EditMeasurePage"

export {}
import {CreateMeasurePage} from "../../../Shared/CreateMeasurePage"
const now = require('dayjs')
let mpStartDate = now().subtract('1', 'year').format('YYYY-MM-DD')
let mpEndDate = now().format('YYYY-MM-DD')

let measureName = 'MeasureName ' + Date.now()
let CqlLibraryName = 'CQLLibraryName' + Date.now()
let measureScoring = 'Proportion'
let model = 'QI-Core'
let invalidmeasureCQL = "library SimpleFhirMeasureLibs version '0.0.004'\nusing FHIR version '4.0.1'\ninclude FHIRHelpers version '4.0.001' called FHIRHelpers\nparameter 'Measurement Period' Interval<DateTime>\ncontext Patient\ndefine 'ipp':\n  exists ['Encounter'] E where E.period.start during 'Measurement Period'\ndefine 'denom':\n  'ipp'\ndefine 'num':\n  exists ['Encounter'] E where E.status ~ 'finished'"
let measureCQL = 'library SimpleFhirMeasure version \'0.0.001\'\n' +
    '\n' +
    'using FHIR version \'4.0.1\'\n' +
    '\n' +
    'include FHIRHelpers version \'4.0.001\' called FHIRHelpers\n' +
    '\n' +
    'valueset "Office Visit": \'http://cts.nlm.nih.gov/fhir/ValueSet/2.16.840.1.113883.3.464.1003.101.12.1001\'\n' +
    '\n' +
    'parameter "Measurement Period" Interval<DateTime>\n' +
    '\n' +
    'context Patient\n' +
    '\n' +
    'define "ipp":\n' +
    '  exists ["Encounter": "Office Visit"] E where E.period.start during "Measurement Period" \n' +
    '  \n' +
    'define "denom":\n' +
    '    "ipp"\n' +
    '    \n' +
    'define "num":\n' +
    '    exists ["Encounter"] E where E.status ~ \'finished\'\n' +
    '      \n' +
    'define "numeratorExclusion":\n' +
    '    "num"'

let elmJson = '{\\n  \\"library\\" : {\\n    \\"identifier\\" : {\\n      \\"id\\" : \\"SimpleFhirMeasure\\",\\n      \\"version\\" : \\"0.0.001\\"\\n    },\\n    \\"schemaIdentifier\\" : {\\n      \\"id\\" : \\"urn:hl7-org:elm\\",\\n      \\"version\\" : \\"r1\\"\\n    },\\n    \\"usings\\" : {\\n      \\"def\\" : [ {\\n        \\"localIdentifier\\" : \\"System\\",\\n        \\"uri\\" : \\"urn:hl7-org:elm-types:r1\\"\\n      }, {\\n        \\"localId\\" : \\"1\\",\\n        \\"locator\\" : \\"3:1-3:26\\",\\n        \\"localIdentifier\\" : \\"FHIR\\",\\n        \\"uri\\" : \\"http://hl7.org/fhir\\",\\n        \\"version\\" : \\"4.0.1\\",\\n        \\"annotation\\" : [ {\\n          \\"type\\" : \\"Annotation\\",\\n          \\"s\\" : {\\n            \\"r\\" : \\"1\\",\\n            \\"s\\" : [ {\\n              \\"value\\" : [ \\"\\", \\"using \\" ]\\n            }, {\\n              \\"s\\" : [ {\\n                \\"value\\" : [ \\"FHIR\\" ]\\n              } ]\\n            }, {\\n              \\"value\\" : [ \\" version \\", \\"\'4.0.1\'\\" ]\\n            } ]\\n          }\\n        } ]\\n      } ]\\n    },\\n    \\"includes\\" : {\\n      \\"def\\" : [ {\\n        \\"localId\\" : \\"2\\",\\n        \\"locator\\" : \\"5:1-5:56\\",\\n        \\"localIdentifier\\" : \\"FHIRHelpers\\",\\n        \\"path\\" : \\"FHIRHelpers\\",\\n        \\"version\\" : \\"4.0.001\\",\\n        \\"annotation\\" : [ {\\n          \\"type\\" : \\"Annotation\\",\\n          \\"s\\" : {\\n            \\"r\\" : \\"2\\",\\n            \\"s\\" : [ {\\n              \\"value\\" : [ \\"\\", \\"include \\" ]\\n            }, {\\n              \\"s\\" : [ {\\n                \\"value\\" : [ \\"FHIRHelpers\\" ]\\n              } ]\\n            }, {\\n              \\"value\\" : [ \\" version \\", \\"\'4.0.001\'\\", \\" called \\", \\"FHIRHelpers\\" ]\\n            } ]\\n          }\\n        } ]\\n      } ]\\n    },\\n    \\"parameters\\" : {\\n      \\"def\\" : [ {\\n        \\"localId\\" : \\"6\\",\\n        \\"locator\\" : \\"9:1-9:49\\",\\n        \\"name\\" : \\"Measurement Period\\",\\n        \\"accessLevel\\" : \\"Public\\",\\n        \\"annotation\\" : [ {\\n          \\"type\\" : \\"Annotation\\",\\n          \\"s\\" : {\\n            \\"r\\" : \\"6\\",\\n            \\"s\\" : [ {\\n              \\"value\\" : [ \\"\\", \\"parameter \\", \\"\\\\\\"Measurement Period\\\\\\"\\", \\" \\" ]\\n            }, {\\n              \\"r\\" : \\"5\\",\\n              \\"s\\" : [ {\\n                \\"value\\" : [ \\"Interval<\\" ]\\n              }, {\\n                \\"r\\" : \\"4\\",\\n                \\"s\\" : [ {\\n                  \\"value\\" : [ \\"DateTime\\" ]\\n                } ]\\n              }, {\\n                \\"value\\" : [ \\">\\" ]\\n              } ]\\n            } ]\\n          }\\n        } ],\\n        \\"parameterTypeSpecifier\\" : {\\n          \\"localId\\" : \\"5\\",\\n          \\"locator\\" : \\"9:32-9:49\\",\\n          \\"type\\" : \\"IntervalTypeSpecifier\\",\\n          \\"pointType\\" : {\\n            \\"localId\\" : \\"4\\",\\n            \\"locator\\" : \\"9:41-9:48\\",\\n            \\"name\\" : \\"{urn:hl7-org:elm-types:r1}DateTime\\",\\n            \\"type\\" : \\"NamedTypeSpecifier\\"\\n          }\\n        }\\n      } ]\\n    },\\n    \\"valueSets\\" : {\\n      \\"def\\" : [ {\\n        \\"localId\\" : \\"3\\",\\n        \\"locator\\" : \\"7:1-7:104\\",\\n        \\"name\\" : \\"Office Visit\\",\\n        \\"id\\" : \\"http://cts.nlm.nih.gov/fhir/ValueSet/2.16.840.1.113883.3.464.1003.101.12.1001\\",\\n        \\"accessLevel\\" : \\"Public\\",\\n        \\"annotation\\" : [ {\\n          \\"type\\" : \\"Annotation\\",\\n          \\"s\\" : {\\n            \\"r\\" : \\"3\\",\\n            \\"s\\" : [ {\\n              \\"value\\" : [ \\"\\", \\"valueset \\", \\"\\\\\\"Office Visit\\\\\\"\\", \\": \\", \\"\'http://cts.nlm.nih.gov/fhir/ValueSet/2.16.840.1.113883.3.464.1003.101.12.1001\'\\" ]\\n            } ]\\n          }\\n        } ]\\n      } ]\\n    },\\n    \\"contexts\\" : {\\n      \\"def\\" : [ {\\n        \\"locator\\" : \\"11:1-11:15\\",\\n        \\"name\\" : \\"Patient\\"\\n      } ]\\n    },\\n    \\"statements\\" : {\\n      \\"def\\" : [ {\\n        \\"locator\\" : \\"11:1-11:15\\",\\n        \\"name\\" : \\"Patient\\",\\n        \\"context\\" : \\"Patient\\",\\n        \\"expression\\" : {\\n          \\"type\\" : \\"SingletonFrom\\",\\n          \\"operand\\" : {\\n            \\"locator\\" : \\"11:1-11:15\\",\\n            \\"dataType\\" : \\"{http://hl7.org/fhir}Patient\\",\\n            \\"templateId\\" : \\"http://hl7.org/fhir/StructureDefinition/Patient\\",\\n            \\"type\\" : \\"Retrieve\\"\\n          }\\n        }\\n      }, {\\n        \\"localId\\" : \\"16\\",\\n        \\"locator\\" : \\"13:1-14:89\\",\\n        \\"name\\" : \\"ipp\\",\\n        \\"context\\" : \\"Patient\\",\\n        \\"accessLevel\\" : \\"Public\\",\\n        \\"annotation\\" : [ {\\n          \\"type\\" : \\"Annotation\\",\\n          \\"s\\" : {\\n            \\"r\\" : \\"16\\",\\n            \\"s\\" : [ {\\n              \\"value\\" : [ \\"\\", \\"define \\", \\"\\\\\\"ipp\\\\\\"\\", \\":\\\\n  \\" ]\\n            }, {\\n              \\"r\\" : \\"15\\",\\n              \\"s\\" : [ {\\n                \\"value\\" : [ \\"exists \\" ]\\n              }, {\\n                \\"r\\" : \\"14\\",\\n                \\"s\\" : [ {\\n                  \\"s\\" : [ {\\n                    \\"r\\" : \\"8\\",\\n                    \\"s\\" : [ {\\n                      \\"r\\" : \\"7\\",\\n                      \\"s\\" : [ {\\n                        \\"r\\" : \\"7\\",\\n                        \\"s\\" : [ {\\n                          \\"value\\" : [ \\"[\\", \\"\\\\\\"Encounter\\\\\\"\\", \\": \\" ]\\n                        }, {\\n                          \\"s\\" : [ {\\n                            \\"value\\" : [ \\"\\\\\\"Office Visit\\\\\\"\\" ]\\n                          } ]\\n                        }, {\\n                          \\"value\\" : [ \\"]\\" ]\\n                        } ]\\n                      } ]\\n                    }, {\\n                      \\"value\\" : [ \\" \\", \\"E\\" ]\\n                    } ]\\n                  } ]\\n                }, {\\n                  \\"value\\" : [ \\" \\" ]\\n                }, {\\n                  \\"r\\" : \\"13\\",\\n                  \\"s\\" : [ {\\n                    \\"value\\" : [ \\"where \\" ]\\n                  }, {\\n                    \\"r\\" : \\"13\\",\\n                    \\"s\\" : [ {\\n                      \\"r\\" : \\"11\\",\\n                      \\"s\\" : [ {\\n                        \\"r\\" : \\"10\\",\\n                        \\"s\\" : [ {\\n                          \\"r\\" : \\"9\\",\\n                          \\"s\\" : [ {\\n                            \\"value\\" : [ \\"E\\" ]\\n                          } ]\\n                        }, {\\n                          \\"value\\" : [ \\".\\" ]\\n                        }, {\\n                          \\"r\\" : \\"10\\",\\n                          \\"s\\" : [ {\\n                            \\"value\\" : [ \\"period\\" ]\\n                          } ]\\n                        } ]\\n                      }, {\\n                        \\"value\\" : [ \\".\\" ]\\n                      }, {\\n                        \\"r\\" : \\"11\\",\\n                        \\"s\\" : [ {\\n                          \\"value\\" : [ \\"start\\" ]\\n                        } ]\\n                      } ]\\n                    }, {\\n                      \\"r\\" : \\"13\\",\\n                      \\"value\\" : [ \\" \\", \\"during\\", \\" \\" ]\\n                    }, {\\n                      \\"r\\" : \\"12\\",\\n                      \\"s\\" : [ {\\n                        \\"value\\" : [ \\"\\\\\\"Measurement Period\\\\\\"\\" ]\\n                      } ]\\n                    } ]\\n                  } ]\\n                } ]\\n              } ]\\n            } ]\\n          }\\n        } ],\\n        \\"expression\\" : {\\n          \\"localId\\" : \\"15\\",\\n          \\"locator\\" : \\"14:3-14:89\\",\\n          \\"type\\" : \\"Exists\\",\\n          \\"operand\\" : {\\n            \\"localId\\" : \\"14\\",\\n            \\"locator\\" : \\"14:10-14:89\\",\\n            \\"type\\" : \\"Query\\",\\n            \\"source\\" : [ {\\n              \\"localId\\" : \\"8\\",\\n              \\"locator\\" : \\"14:10-14:40\\",\\n              \\"alias\\" : \\"E\\",\\n              \\"expression\\" : {\\n                \\"localId\\" : \\"7\\",\\n                \\"locator\\" : \\"14:10-14:38\\",\\n                \\"dataType\\" : \\"{http://hl7.org/fhir}Encounter\\",\\n                \\"templateId\\" : \\"http://hl7.org/fhir/StructureDefinition/Encounter\\",\\n                \\"codeProperty\\" : \\"type\\",\\n                \\"codeComparator\\" : \\"in\\",\\n                \\"type\\" : \\"Retrieve\\",\\n                \\"codes\\" : {\\n                  \\"locator\\" : \\"14:24-14:37\\",\\n                  \\"name\\" : \\"Office Visit\\",\\n                  \\"preserve\\" : true,\\n                  \\"type\\" : \\"ValueSetRef\\"\\n                }\\n              }\\n            } ],\\n            \\"relationship\\" : [ ],\\n            \\"where\\" : {\\n              \\"localId\\" : \\"13\\",\\n              \\"locator\\" : \\"14:42-14:89\\",\\n              \\"type\\" : \\"In\\",\\n              \\"operand\\" : [ {\\n                \\"name\\" : \\"ToDateTime\\",\\n                \\"libraryName\\" : \\"FHIRHelpers\\",\\n                \\"type\\" : \\"FunctionRef\\",\\n                \\"operand\\" : [ {\\n                  \\"localId\\" : \\"11\\",\\n                  \\"locator\\" : \\"14:48-14:61\\",\\n                  \\"path\\" : \\"start\\",\\n                  \\"type\\" : \\"Property\\",\\n                  \\"source\\" : {\\n                    \\"localId\\" : \\"10\\",\\n                    \\"locator\\" : \\"14:48-14:55\\",\\n                    \\"path\\" : \\"period\\",\\n                    \\"scope\\" : \\"E\\",\\n                    \\"type\\" : \\"Property\\"\\n                  }\\n                } ]\\n              }, {\\n                \\"localId\\" : \\"12\\",\\n                \\"locator\\" : \\"14:70-14:89\\",\\n                \\"name\\" : \\"Measurement Period\\",\\n                \\"type\\" : \\"ParameterRef\\"\\n              } ]\\n            }\\n          }\\n        }\\n      }, {\\n        \\"localId\\" : \\"18\\",\\n        \\"locator\\" : \\"16:1-17:9\\",\\n        \\"name\\" : \\"denom\\",\\n        \\"context\\" : \\"Patient\\",\\n        \\"accessLevel\\" : \\"Public\\",\\n        \\"annotation\\" : [ {\\n          \\"type\\" : \\"Annotation\\",\\n          \\"s\\" : {\\n            \\"r\\" : \\"18\\",\\n            \\"s\\" : [ {\\n              \\"value\\" : [ \\"\\", \\"define \\", \\"\\\\\\"denom\\\\\\"\\", \\":\\\\n    \\" ]\\n            }, {\\n              \\"r\\" : \\"17\\",\\n              \\"s\\" : [ {\\n                \\"value\\" : [ \\"\\\\\\"ipp\\\\\\"\\" ]\\n              } ]\\n            } ]\\n          }\\n        } ],\\n        \\"expression\\" : {\\n          \\"localId\\" : \\"17\\",\\n          \\"locator\\" : \\"17:5-17:9\\",\\n          \\"name\\" : \\"ipp\\",\\n          \\"type\\" : \\"ExpressionRef\\"\\n        }\\n      }, {\\n        \\"localId\\" : \\"27\\",\\n        \\"locator\\" : \\"19:1-20:54\\",\\n        \\"name\\" : \\"num\\",\\n        \\"context\\" : \\"Patient\\",\\n        \\"accessLevel\\" : \\"Public\\",\\n        \\"annotation\\" : [ {\\n          \\"type\\" : \\"Annotation\\",\\n          \\"s\\" : {\\n            \\"r\\" : \\"27\\",\\n            \\"s\\" : [ {\\n              \\"value\\" : [ \\"\\", \\"define \\", \\"\\\\\\"num\\\\\\"\\", \\":\\\\n    \\" ]\\n            }, {\\n              \\"r\\" : \\"26\\",\\n              \\"s\\" : [ {\\n                \\"value\\" : [ \\"exists \\" ]\\n              }, {\\n                \\"r\\" : \\"25\\",\\n                \\"s\\" : [ {\\n                  \\"s\\" : [ {\\n                    \\"r\\" : \\"20\\",\\n                    \\"s\\" : [ {\\n                      \\"r\\" : \\"19\\",\\n                      \\"s\\" : [ {\\n                        \\"r\\" : \\"19\\",\\n                        \\"s\\" : [ {\\n                          \\"value\\" : [ \\"[\\", \\"\\\\\\"Encounter\\\\\\"\\", \\"]\\" ]\\n                        } ]\\n                      } ]\\n                    }, {\\n                      \\"value\\" : [ \\" \\", \\"E\\" ]\\n                    } ]\\n                  } ]\\n                }, {\\n                  \\"value\\" : [ \\" \\" ]\\n                }, {\\n                  \\"r\\" : \\"24\\",\\n                  \\"s\\" : [ {\\n                    \\"value\\" : [ \\"where \\" ]\\n                  }, {\\n                    \\"r\\" : \\"24\\",\\n                    \\"s\\" : [ {\\n                      \\"r\\" : \\"22\\",\\n                      \\"s\\" : [ {\\n                        \\"r\\" : \\"21\\",\\n                        \\"s\\" : [ {\\n                          \\"value\\" : [ \\"E\\" ]\\n                        } ]\\n                      }, {\\n                        \\"value\\" : [ \\".\\" ]\\n                      }, {\\n                        \\"r\\" : \\"22\\",\\n                        \\"s\\" : [ {\\n                          \\"value\\" : [ \\"status\\" ]\\n                        } ]\\n                      } ]\\n                    }, {\\n                      \\"value\\" : [ \\" \\", \\"~\\", \\" \\" ]\\n                    }, {\\n                      \\"r\\" : \\"23\\",\\n                      \\"s\\" : [ {\\n                        \\"value\\" : [ \\"\'finished\'\\" ]\\n                      } ]\\n                    } ]\\n                  } ]\\n                } ]\\n              } ]\\n            } ]\\n          }\\n        } ],\\n        \\"expression\\" : {\\n          \\"localId\\" : \\"26\\",\\n          \\"locator\\" : \\"20:5-20:54\\",\\n          \\"type\\" : \\"Exists\\",\\n          \\"operand\\" : {\\n            \\"localId\\" : \\"25\\",\\n            \\"locator\\" : \\"20:12-20:54\\",\\n            \\"type\\" : \\"Query\\",\\n            \\"source\\" : [ {\\n              \\"localId\\" : \\"20\\",\\n              \\"locator\\" : \\"20:12-20:26\\",\\n              \\"alias\\" : \\"E\\",\\n              \\"expression\\" : {\\n                \\"localId\\" : \\"19\\",\\n                \\"locator\\" : \\"20:12-20:24\\",\\n                \\"dataType\\" : \\"{http://hl7.org/fhir}Encounter\\",\\n                \\"templateId\\" : \\"http://hl7.org/fhir/StructureDefinition/Encounter\\",\\n                \\"type\\" : \\"Retrieve\\"\\n              }\\n            } ],\\n            \\"relationship\\" : [ ],\\n            \\"where\\" : {\\n              \\"localId\\" : \\"24\\",\\n              \\"locator\\" : \\"20:28-20:54\\",\\n              \\"type\\" : \\"Equivalent\\",\\n              \\"operand\\" : [ {\\n                \\"name\\" : \\"ToString\\",\\n                \\"libraryName\\" : \\"FHIRHelpers\\",\\n                \\"type\\" : \\"FunctionRef\\",\\n                \\"operand\\" : [ {\\n                  \\"localId\\" : \\"22\\",\\n                  \\"locator\\" : \\"20:34-20:41\\",\\n                  \\"path\\" : \\"status\\",\\n                  \\"scope\\" : \\"E\\",\\n                  \\"type\\" : \\"Property\\"\\n                } ]\\n              }, {\\n                \\"localId\\" : \\"23\\",\\n                \\"locator\\" : \\"20:45-20:54\\",\\n                \\"valueType\\" : \\"{urn:hl7-org:elm-types:r1}String\\",\\n                \\"value\\" : \\"finished\\",\\n                \\"type\\" : \\"Literal\\"\\n              } ]\\n            }\\n          }\\n        }\\n      }, {\\n        \\"localId\\" : \\"29\\",\\n        \\"locator\\" : \\"22:1-23:9\\",\\n        \\"name\\" : \\"numeratorExclusion\\",\\n        \\"context\\" : \\"Patient\\",\\n        \\"accessLevel\\" : \\"Public\\",\\n        \\"annotation\\" : [ {\\n          \\"type\\" : \\"Annotation\\",\\n          \\"s\\" : {\\n            \\"r\\" : \\"29\\",\\n            \\"s\\" : [ {\\n              \\"value\\" : [ \\"\\", \\"define \\", \\"\\\\\\"numeratorExclusion\\\\\\"\\", \\":\\\\n    \\" ]\\n            }, {\\n              \\"r\\" : \\"28\\",\\n              \\"s\\" : [ {\\n                \\"value\\" : [ \\"\\\\\\"num\\\\\\"\\" ]\\n              } ]\\n            } ]\\n          }\\n        } ],\\n        \\"expression\\" : {\\n          \\"localId\\" : \\"28\\",\\n          \\"locator\\" : \\"23:5-23:9\\",\\n          \\"name\\" : \\"num\\",\\n          \\"type\\" : \\"ExpressionRef\\"\\n        }\\n      } ]\\n    }\\n  },\\n  \\"externalErrors\\" : [ ]\\n}","xml":"<?xml version=\\"1.0\\" encoding=\\"UTF-8\\"?>\\n<library xmlns=\\"urn:hl7-org:elm:r1\\" xmlns:t=\\"urn:hl7-org:elm-types:r1\\" xmlns:xsi=\\"http://www.w3.org/2001/XMLSchema-instance\\" xmlns:xsd=\\"http://www.w3.org/2001/XMLSchema\\" xmlns:fhir=\\"http://hl7.org/fhir\\" xmlns:qdm43=\\"urn:healthit-gov:qdm:v4_3\\" xmlns:qdm53=\\"urn:healthit-gov:qdm:v5_3\\" xmlns:a=\\"urn:hl7-org:cql-annotations:r1\\">\\n   <annotation translatorOptions=\\"EnableAnnotations,EnableLocators,EnableDetailedErrors,DisableListDemotion,DisableListPromotion,DisableMethodInvocation\\" xsi:type=\\"a:CqlToElmInfo\\"/>\\n   <annotation xsi:type=\\"a:Annotation\\">\\n      <a:s r=\\"29\\">\\n         <a:s>library SimpleFhirMeasure version \'0.0.001\'</a:s>\\n      </a:s>\\n   </annotation>\\n   <identifier id=\\"SimpleFhirMeasure\\" version=\\"0.0.001\\"/>\\n   <schemaIdentifier id=\\"urn:hl7-org:elm\\" version=\\"r1\\"/>\\n   <usings>\\n      <def localIdentifier=\\"System\\" uri=\\"urn:hl7-org:elm-types:r1\\"/>\\n      <def localId=\\"1\\" locator=\\"3:1-3:26\\" localIdentifier=\\"FHIR\\" uri=\\"http://hl7.org/fhir\\" version=\\"4.0.1\\">\\n         <annotation xsi:type=\\"a:Annotation\\">\\n            <a:s r=\\"1\\">\\n               <a:s>using </a:s>\\n               <a:s>\\n                  <a:s>FHIR</a:s>\\n               </a:s>\\n               <a:s> version \'4.0.1\'</a:s>\\n            </a:s>\\n         </annotation>\\n      </def>\\n   </usings>\\n   <includes>\\n      <def localId=\\"2\\" locator=\\"5:1-5:56\\" localIdentifier=\\"FHIRHelpers\\" path=\\"FHIRHelpers\\" version=\\"4.0.001\\">\\n         <annotation xsi:type=\\"a:Annotation\\">\\n            <a:s r=\\"2\\">\\n               <a:s>include </a:s>\\n               <a:s>\\n                  <a:s>FHIRHelpers</a:s>\\n               </a:s>\\n               <a:s> version \'4.0.001\' called FHIRHelpers</a:s>\\n            </a:s>\\n         </annotation>\\n      </def>\\n   </includes>\\n   <parameters>\\n      <def localId=\\"6\\" locator=\\"9:1-9:49\\" name=\\"Measurement Period\\" accessLevel=\\"Public\\">\\n         <annotation xsi:type=\\"a:Annotation\\">\\n            <a:s r=\\"6\\">\\n               <a:s>parameter &quot;Measurement Period&quot; </a:s>\\n               <a:s r=\\"5\\">\\n                  <a:s>Interval&lt;</a:s>\\n                  <a:s r=\\"4\\">\\n                     <a:s>DateTime</a:s>\\n                  </a:s>\\n                  <a:s>></a:s>\\n               </a:s>\\n            </a:s>\\n         </annotation>\\n         <parameterTypeSpecifier localId=\\"5\\" locator=\\"9:32-9:49\\" xsi:type=\\"IntervalTypeSpecifier\\">\\n            <pointType localId=\\"4\\" locator=\\"9:41-9:48\\" name=\\"t:DateTime\\" xsi:type=\\"NamedTypeSpecifier\\"/>\\n         </parameterTypeSpecifier>\\n      </def>\\n   </parameters>\\n   <valueSets>\\n      <def localId=\\"3\\" locator=\\"7:1-7:104\\" name=\\"Office Visit\\" id=\\"http://cts.nlm.nih.gov/fhir/ValueSet/2.16.840.1.113883.3.464.1003.101.12.1001\\" accessLevel=\\"Public\\">\\n         <annotation xsi:type=\\"a:Annotation\\">\\n            <a:s r=\\"3\\">\\n               <a:s>valueset &quot;Office Visit&quot;: \'http://cts.nlm.nih.gov/fhir/ValueSet/2.16.840.1.113883.3.464.1003.101.12.1001\'</a:s>\\n            </a:s>\\n         </annotation>\\n      </def>\\n   </valueSets>\\n   <contexts>\\n      <def locator=\\"11:1-11:15\\" name=\\"Patient\\"/>\\n   </contexts>\\n   <statements>\\n      <def locator=\\"11:1-11:15\\" name=\\"Patient\\" context=\\"Patient\\">\\n         <expression xsi:type=\\"SingletonFrom\\">\\n            <operand locator=\\"11:1-11:15\\" dataType=\\"fhir:Patient\\" templateId=\\"http://hl7.org/fhir/StructureDefinition/Patient\\" xsi:type=\\"Retrieve\\"/>\\n         </expression>\\n      </def>\\n      <def localId=\\"16\\" locator=\\"13:1-14:89\\" name=\\"ipp\\" context=\\"Patient\\" accessLevel=\\"Public\\">\\n         <annotation xsi:type=\\"a:Annotation\\">\\n            <a:s r=\\"16\\">\\n               <a:s>define &quot;ipp&quot;:\\n  </a:s>\\n               <a:s r=\\"15\\">\\n                  <a:s>exists </a:s>\\n                  <a:s r=\\"14\\">\\n                     <a:s>\\n                        <a:s r=\\"8\\">\\n                           <a:s r=\\"7\\">\\n                              <a:s r=\\"7\\">\\n                                 <a:s>[&quot;Encounter&quot;: </a:s>\\n                                 <a:s>\\n                                    <a:s>&quot;Office Visit&quot;</a:s>\\n                                 </a:s>\\n                                 <a:s>]</a:s>\\n                              </a:s>\\n                           </a:s>\\n                           <a:s> E</a:s>\\n                        </a:s>\\n                     </a:s>\\n                     <a:s> </a:s>\\n                     <a:s r=\\"13\\">\\n                        <a:s>where </a:s>\\n                        <a:s r=\\"13\\">\\n                           <a:s r=\\"11\\">\\n                              <a:s r=\\"10\\">\\n                                 <a:s r=\\"9\\">\\n                                    <a:s>E</a:s>\\n                                 </a:s>\\n                                 <a:s>.</a:s>\\n                                 <a:s r=\\"10\\">\\n                                    <a:s>period</a:s>\\n                                 </a:s>\\n                              </a:s>\\n                              <a:s>.</a:s>\\n                              <a:s r=\\"11\\">\\n                                 <a:s>start</a:s>\\n                              </a:s>\\n                           </a:s>\\n                           <a:s r=\\"13\\"> during </a:s>\\n                           <a:s r=\\"12\\">\\n                              <a:s>&quot;Measurement Period&quot;</a:s>\\n                           </a:s>\\n                        </a:s>\\n                     </a:s>\\n                  </a:s>\\n               </a:s>\\n            </a:s>\\n         </annotation>\\n         <expression localId=\\"15\\" locator=\\"14:3-14:89\\" xsi:type=\\"Exists\\">\\n            <operand localId=\\"14\\" locator=\\"14:10-14:89\\" xsi:type=\\"Query\\">\\n               <source localId=\\"8\\" locator=\\"14:10-14:40\\" alias=\\"E\\">\\n                  <expression localId=\\"7\\" locator=\\"14:10-14:38\\" dataType=\\"fhir:Encounter\\" templateId=\\"http://hl7.org/fhir/StructureDefinition/Encounter\\" codeProperty=\\"type\\" codeComparator=\\"in\\" xsi:type=\\"Retrieve\\">\\n                     <codes locator=\\"14:24-14:37\\" name=\\"Office Visit\\" preserve=\\"true\\" xsi:type=\\"ValueSetRef\\"/>\\n                  </expression>\\n               </source>\\n               <where localId=\\"13\\" locator=\\"14:42-14:89\\" xsi:type=\\"In\\">\\n                  <operand name=\\"ToDateTime\\" libraryName=\\"FHIRHelpers\\" xsi:type=\\"FunctionRef\\">\\n                     <operand localId=\\"11\\" locator=\\"14:48-14:61\\" path=\\"start\\" xsi:type=\\"Property\\">\\n                        <source localId=\\"10\\" locator=\\"14:48-14:55\\" path=\\"period\\" scope=\\"E\\" xsi:type=\\"Property\\"/>\\n                     </operand>\\n                  </operand>\\n                  <operand localId=\\"12\\" locator=\\"14:70-14:89\\" name=\\"Measurement Period\\" xsi:type=\\"ParameterRef\\"/>\\n               </where>\\n            </operand>\\n         </expression>\\n      </def>\\n      <def localId=\\"18\\" locator=\\"16:1-17:9\\" name=\\"denom\\" context=\\"Patient\\" accessLevel=\\"Public\\">\\n         <annotation xsi:type=\\"a:Annotation\\">\\n            <a:s r=\\"18\\">\\n               <a:s>define &quot;denom&quot;:\\n    </a:s>\\n               <a:s r=\\"17\\">\\n                  <a:s>&quot;ipp&quot;</a:s>\\n               </a:s>\\n            </a:s>\\n         </annotation>\\n         <expression localId=\\"17\\" locator=\\"17:5-17:9\\" name=\\"ipp\\" xsi:type=\\"ExpressionRef\\"/>\\n      </def>\\n      <def localId=\\"27\\" locator=\\"19:1-20:54\\" name=\\"num\\" context=\\"Patient\\" accessLevel=\\"Public\\">\\n         <annotation xsi:type=\\"a:Annotation\\">\\n            <a:s r=\\"27\\">\\n               <a:s>define &quot;num&quot;:\\n    </a:s>\\n               <a:s r=\\"26\\">\\n                  <a:s>exists </a:s>\\n                  <a:s r=\\"25\\">\\n                     <a:s>\\n                        <a:s r=\\"20\\">\\n                           <a:s r=\\"19\\">\\n                              <a:s r=\\"19\\">\\n                                 <a:s>[&quot;Encounter&quot;]</a:s>\\n                              </a:s>\\n                           </a:s>\\n                           <a:s> E</a:s>\\n                        </a:s>\\n                     </a:s>\\n                     <a:s> </a:s>\\n                     <a:s r=\\"24\\">\\n                        <a:s>where </a:s>\\n                        <a:s r=\\"24\\">\\n                           <a:s r=\\"22\\">\\n                              <a:s r=\\"21\\">\\n                                 <a:s>E</a:s>\\n                              </a:s>\\n                              <a:s>.</a:s>\\n                              <a:s r=\\"22\\">\\n                                 <a:s>status</a:s>\\n                              </a:s>\\n                           </a:s>\\n                           <a:s> ~ </a:s>\\n                           <a:s r=\\"23\\">\\n                              <a:s>\'finished\'</a:s>\\n                           </a:s>\\n                        </a:s>\\n                     </a:s>\\n                  </a:s>\\n               </a:s>\\n            </a:s>\\n         </annotation>\\n         <expression localId=\\"26\\" locator=\\"20:5-20:54\\" xsi:type=\\"Exists\\">\\n            <operand localId=\\"25\\" locator=\\"20:12-20:54\\" xsi:type=\\"Query\\">\\n               <source localId=\\"20\\" locator=\\"20:12-20:26\\" alias=\\"E\\">\\n                  <expression localId=\\"19\\" locator=\\"20:12-20:24\\" dataType=\\"fhir:Encounter\\" templateId=\\"http://hl7.org/fhir/StructureDefinition/Encounter\\" xsi:type=\\"Retrieve\\"/>\\n               </source>\\n               <where localId=\\"24\\" locator=\\"20:28-20:54\\" xsi:type=\\"Equivalent\\">\\n                  <operand name=\\"ToString\\" libraryName=\\"FHIRHelpers\\" xsi:type=\\"FunctionRef\\">\\n                     <operand localId=\\"22\\" locator=\\"20:34-20:41\\" path=\\"status\\" scope=\\"E\\" xsi:type=\\"Property\\"/>\\n                  </operand>\\n                  <operand localId=\\"23\\" locator=\\"20:45-20:54\\" valueType=\\"t:String\\" value=\\"finished\\" xsi:type=\\"Literal\\"/>\\n               </where>\\n            </operand>\\n         </expression>\\n      </def>\\n      <def localId=\\"29\\" locator=\\"22:1-23:9\\" name=\\"numeratorExclusion\\" context=\\"Patient\\" accessLevel=\\"Public\\">\\n         <annotation xsi:type=\\"a:Annotation\\">\\n            <a:s r=\\"29\\">\\n               <a:s>define &quot;numeratorExclusion&quot;:\\n    </a:s>\\n               <a:s r=\\"28\\">\\n                  <a:s>&quot;num&quot;</a:s>\\n               </a:s>\\n            </a:s>\\n         </annotation>\\n         <expression localId=\\"28\\" locator=\\"23:5-23:9\\" name=\\"num\\" xsi:type=\\"ExpressionRef\\"/>\\n      </def>\\n   </statements>\\n</library>\\n"}'
let missingFHIRHelpersMeasureCQL = "library SimpleFhirMeasureLib version '0.0.004'\nusing FHIR version '4.0.1'\nparameter 'Measurement Period' Interval<DateTime>\ncontext Patient\ndefine 'ipp':\n  exists ['Encounter'] E where E.period.start during 'Measurement Period'\ndefine 'denom':\n  'ipp'\ndefine 'num':\n  exists ['Encounter'] E where E.status ~ 'finished'"

let PopIniPop = 'SDE Payer'
let PopNum = 'SDE Race'
let PopDenom = 'SDE Sex'
let PopDenex = 'Absence of Cervix'
let PopDenexcep = 'SDE Ethnicity'
let PopNumex = 'Surgical Absence of Cervix'

describe('Measure Bundle end point returns expected data with valid Measure CQL and elmJson', () => {

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
                    'measureName': measureName,
                    'cqlLibraryName': CqlLibraryName,
                    'model': model,
                    'measureScoring': measureScoring,
                    'cql': measureCQL,
                    //'elmJson': elmJson,
                    'measurementPeriodStart': mpStartDate + "T00:00:00.000Z",
                    'measurementPeriodEnd': mpEndDate + "T00:00:00.000Z"
                }
            }).then((response) => {
                expect(response.status).to.eql(201)
                expect(response.body.id).to.be.exist
                cy.writeFile('cypress/fixtures/measureId', response.body.id)
            })
        })

        cy.getCookie('accessToken').then((accessToken) => {
            cy.readFile('cypress/fixtures/measureId').should('exist').then((retrievedMeasureID) => {
                cy.request({
                    url: '/api/measures/' + retrievedMeasureID + '/groups/',
                    method: 'POST',
                    headers: {
                        authorization: 'Bearer ' + accessToken.value
                    },
                    body: {
                        "scoring": measureScoring,
                        "population": 
                        {
                            "initialPopulation": PopIniPop,
                            "denominator": PopDenom,
                            "denominatorExclusion": PopDenex,
                            "denominatorException": PopDenexcep,
                            "numerator": PopNum,
                            "numeratorExclusion": PopNumex
                        }
                    }
                }).then((response) => {
                        expect(response.status).to.eql(201)
                        expect(response.body.id).to.be.exist
                        cy.writeFile('cypress/fixtures/groupId', response.body.id)
                })
            })
        })
    })

    beforeEach('Set Access Token',() => {

        cy.setAccessTokenCookie()

    })

    after('Clean up',() => {
        Utilities.deleteMeasure(measureName, CqlLibraryName, measureScoring)

    })
    it('Get Measure bundle data from madie-fhir-service and confirm all pertinent data is present', () => {

        cy.getCookie('accessToken').then((accessToken) => {
            cy.readFile('cypress/fixtures/measureId').should('exist').then((id) => {
                cy.request({
                    url: '/api/measures/' + id + '/bundles',
                    method: 'GET',
                    headers: {
                        authorization: 'Bearer ' + accessToken.value
                    }
                }).then((response) => {
                    console.log(response)
                    expect(response.status).to.eql(200)
                    expect(response.body.resourceType).to.eql('Bundle')
                    expect(response.body.entry).to.be.a('array')
                    expect(response.body.entry[0].resource.resourceType).to.eql('Measure')
                    expect(response.body.entry[0].resource.effectivePeriod).to.have.property('start')
                    expect(response.body.entry[0].resource.effectivePeriod).to.have.property('end')
                    expect(response.body.entry[0].resource.library[0]).is.not.empty
                    expect(response.body.entry[0].resource.group[0].population[0].code.coding[0].code).to.eql('initial-population')
                    expect(response.body.entry[0].resource.group[0].population[0].criteria.expression).to.eql('SDE Payer')
                    expect(response.body.entry[0].resource.group[0].population[1].code.coding[0].code).to.eql('denominator')
                    expect(response.body.entry[0].resource.group[0].population[1].criteria.expression).to.eql('SDE Sex')
                    expect(response.body.entry[0].resource.group[0].population[2].code.coding[0].code).to.eql('denominator-exclusion')
                    expect(response.body.entry[0].resource.group[0].population[2].criteria.expression).to.eql('Absence of Cervix')
                    expect(response.body.entry[0].resource.group[0].population[3].code.coding[0].code).to.eql('denominator-exception')
                    expect(response.body.entry[0].resource.group[0].population[3].criteria.expression).to.eql('SDE Ethnicity')
                    expect(response.body.entry[0].resource.group[0].population[4].code.coding[0].code).to.eql('numerator')
                    expect(response.body.entry[0].resource.group[0].population[4].criteria.expression).to.eql('SDE Race')
                    expect(response.body.entry[0].resource.group[0].population[5].code.coding[0].code).to.eql('numerator-exclusion')
                    expect(response.body.entry[0].resource.group[0].population[5].criteria.expression).to.eql('Surgical Absence of Cervix')
                    expect(response.body.entry[1].resource.resourceType).to.eql('Library')
                    expect(response.body.entry[1].resource.dataRequirement[0].codeFilter[0].path).to.eql('code')
                    expect(response.body.entry[1].resource.dataRequirement[0].codeFilter[0].valueSet).to.eql('http://cts.nlm.nih.' +
                        'gov/fhir/ValueSet/2.16.840.1.113883.3.464.1003.101.12.1001')
                })
            })
        })
    })
})
describe('Measure Bundle end point returns 409 with valid Measure CQL but is missing elmJson', () => {

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
                    'measureName': measureName,
                    'cqlLibraryName': CqlLibraryName+1,
                    'model': model,
                    'measureScoring': measureScoring,
                    'cql': measureCQL,
                    'measurementPeriodStart': mpStartDate + "T00:00:00.000Z",
                    'measurementPeriodEnd': mpEndDate + "T00:00:00.000Z"
                }
            }).then((response) => {
                expect(response.status).to.eql(201)
                expect(response.body.id).to.be.exist
                cy.writeFile('cypress/fixtures/measureId', response.body.id)
            })
        })

        cy.getCookie('accessToken').then((accessToken) => {
            cy.readFile('cypress/fixtures/measureId').should('exist').then((retrievedMeasureID) => {
                cy.request({
                    url: '/api/measures/' + retrievedMeasureID + '/groups/',
                    method: 'POST',
                    headers: {
                        authorization: 'Bearer ' + accessToken.value
                    },
                    body: {
                        "scoring": measureScoring,
                        "population": 
                        {
                            "initialPopulation": PopIniPop,
                            "denominator": PopDenom,
                            "denominatorExclusion": PopDenex,
                            "denominatorException": PopDenexcep,
                            "numerator": PopNum,
                            "numeratorExclusion": PopNumex
                        }
                    }
                }).then((response) => {
                        expect(response.status).to.eql(201)
                        expect(response.body.id).to.be.exist
                        cy.writeFile('cypress/fixtures/groupId', response.body.id)
                })
            })
        })
    })

    beforeEach('Set Access Token',() => {

        cy.setAccessTokenCookie()

    })

    after('Clean up',() => {
        Utilities.deleteMeasure(measureName, CqlLibraryName+1, measureScoring)

    })
    it('Get Measure bundle data from madie-fhir-service and confirm all pertinent data is present', () => {

        cy.getCookie('accessToken').then((accessToken) => {
            cy.readFile('cypress/fixtures/measureId').should('exist').then((id) => {
                cy.request({
                    failOnStatusCode: false,
                    url: '/api/measures/' + id + '/bundles',
                    method: 'GET',
                    headers: {
                        authorization: 'Bearer ' + accessToken.value
                    }
                }).then((response) => {
                    expect(response.status).to.eql(409)
                })
            })
        })
    })
})
//this automated test is being skipped until the resolution of bug 4370 (more work *may* be necessary -- depends on fix)
describe.skip('Measure Bundle end point returns nothing with Measure CQL missing FHIRHelpers include line', () => {
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
                    'measureName': measureName,
                    'cqlLibraryName': CqlLibraryName,
                    'model': model,
                    'measureScoring': measureScoring,
                    'cql': missingFHIRHelpersMeasureCQL,
                    'elmJson': elmJson,
                    'measurementPeriodStart': mpStartDate + "T00:00:00.000Z",
                    'measurementPeriodEnd': mpEndDate + "T00:00:00.000Z"
                }
            }).then((response) => {
                expect(response.status).to.eql(201)
                expect(response.body.id).to.be.exist
                cy.writeFile('cypress/fixtures/measureId', response.body.id)
            })
        })

        cy.getCookie('accessToken').then((accessToken) => {
            cy.readFile('cypress/fixtures/measureId').should('exist').then((retrievedMeasureID) => {
                cy.request({
                    url: '/api/measures/' + retrievedMeasureID + '/groups/',
                    method: 'POST',
                    headers: {
                        authorization: 'Bearer ' + accessToken.value
                    },
                    body: {
                        "scoring": measureScoring,
                        "population": 
                        {
                            "initialPopulation": PopIniPop,
                            "denominator": PopDenom,
                            "denominatorExclusion": PopDenex,
                            "denominatorException": PopDenexcep,
                            "numerator": PopNum,
                            "numeratorExclusion": PopNumex
                        }
                    }
                }).then((response) => {
                        expect(response.status).to.eql(201)
                        expect(response.body.id).to.be.exist
                        cy.writeFile('cypress/fixtures/groupId', response.body.id)
                })
            })
        })
    })

    beforeEach('Set Access Token',() => {

        cy.setAccessTokenCookie()

    })

    after('Clean up',() => {
        Utilities.deleteMeasure(measureName, CqlLibraryName, measureScoring)

    })
    it('Get Measure bundle data from madie-fhir-service and confirm all pertinent data is present', () => {
        cy.getCookie('accessToken').then((accessToken) => {
            cy.readFile('cypress/fixtures/measureId').should('exist').then((id) => {
                cy.request({
                    url: '/api/measures/' + id + '/bundles',
                    method: 'GET',
                    headers: {
                        authorization: 'Bearer ' + accessToken.value
                    }
                }).then((response) => {
                    expect(response.status).to.eql(200)
                    expect(response.body.resourceType).to.eql('Bundle')
                    expect(response.body.entry).to.be.a('array')
                    expect(response.body.entry[0].resource.resourceType).to.eql('Measure')
                    expect(response.body.entry[0].resource.effectivePeriod).to.have.property('start')
                    expect(response.body.entry[0].resource.effectivePeriod).to.have.property('end')
                    expect(response.body.entry[0].resource.library[0]).is.not.empty
                    expect(response.body.entry[0].resource.group[0].population[0].code.coding[0].code).to.eql('initial-population')
                    expect(response.body.entry[0].resource.group[0].population[0].criteria.expression).to.eql('SDE Payer')
                    expect(response.body.entry[0].resource.group[0].population[1].code.coding[0].code).to.eql('denominator')
                    expect(response.body.entry[0].resource.group[0].population[1].criteria.expression).to.eql('SDE Sex')
                    expect(response.body.entry[0].resource.group[0].population[2].code.coding[0].code).to.eql('denominator-exclusion')
                    expect(response.body.entry[0].resource.group[0].population[2].criteria.expression).to.eql('Absence of Cervix')
                    expect(response.body.entry[0].resource.group[0].population[3].code.coding[0].code).to.eql('denominator-exception')
                    expect(response.body.entry[0].resource.group[0].population[3].criteria.expression).to.eql('SDE Ethnicity')
                    expect(response.body.entry[0].resource.group[0].population[4].code.coding[0].code).to.eql('numerator')
                    expect(response.body.entry[0].resource.group[0].population[4].criteria.expression).to.eql('SDE Race')
                    expect(response.body.entry[0].resource.group[0].population[5].code.coding[0].code).to.eql('numerator-exclusion')
                    expect(response.body.entry[0].resource.group[0].population[5].criteria.expression).to.eql('Surgical Absence of Cervix')
                    expect(response.body.entry[1].resource.resourceType).to.eql('Library')
                })
            })
        })
    })
})
describe('Measure Bundle end point returns 403 if measure was not created by current user', () => {
    let measureName = 'MeasureName ' + Date.now()
    let CqlLibraryName = 'CQLLibraryName' + Date.now()
    let measureScoring = 'Proportion'
    let measureCQL = "library SimpleFhirMeasureLib version '0.0.004'\nusing FHIR version '4.0.1'\ninclude FHIRHelpers version '4.0.001' called FHIRHelpers\nparameter 'Measurement Period' Interval<DateTime>\ncontext Patient\ndefine 'ipp':\n  exists ['Encounter'] E where E.period.start during 'Measurement Period'\ndefine 'denom':\n  'ipp'\ndefine 'num':\n  exists ['Encounter'] E where E.status ~ 'finished'"
    before('Create Measure',() => {
        CreateMeasurePage.CreateQICoreMeasureAPI(measureName, CqlLibraryName, measureScoring, measureCQL, true, true)
    })

    beforeEach('Set Access Token',() => {
        cy.setAccessTokenCookie()
    })

    after('Clean up',() => {

        Utilities.deleteMeasure(measureName, CqlLibraryName, measureScoring, true, true)

    })
    it('Get Measure bundle resource will only return if current user is equal to createdBy user', () => {

        cy.getCookie('accessToken').then((accessToken) => {
            cy.readFile('cypress/fixtures/measureId2').should('exist').then((id2) => {
                cy.request({
                    failOnStatusCode: false,
                    url: '/api/measures/' + id2 + '/bundles',
                    method: 'GET',
                    headers: {
                        authorization: 'Bearer ' + accessToken.value
                    }
                }).then((response) => {
                    expect(response.status).to.eql(403)

                })
            })
        })
    })

})
describe('Measure Bundle end point returns 409 when the measure is missing a group', () => {

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
                    'measureName': measureName,
                    'cqlLibraryName': CqlLibraryName+2,
                    'model': model,
                    'measureScoring': measureScoring,
                    'cql': measureCQL,
                    'elmJson': elmJson,
                    'measurementPeriodStart': mpStartDate + "T00:00:00.000Z",
                    'measurementPeriodEnd': mpEndDate + "T00:00:00.000Z"
                }
            }).then((response) => {
                expect(response.status).to.eql(201)
                expect(response.body.id).to.be.exist
                cy.writeFile('cypress/fixtures/measureId', response.body.id)
            })
        })
    })

    beforeEach('Set Access Token',() => {

        cy.setAccessTokenCookie()

    })

    after('Clean up',() => {
        Utilities.deleteMeasure(measureName, CqlLibraryName+2, measureScoring)

    })
    it('Get Measure bundle data from madie-fhir-service and confirm all pertinent data is present', () => {

        cy.getCookie('accessToken').then((accessToken) => {
            cy.readFile('cypress/fixtures/measureId').should('exist').then((id) => {
                cy.request({
                    failOnStatusCode: false,
                    url: '/api/measures/' + id + '/bundles',
                    method: 'GET',
                    headers: {
                        authorization: 'Bearer ' + accessToken.value
                    }
                }).then((response) => {
                    expect(response.status).to.eql(409)
                })
            })
        })
    })
})
