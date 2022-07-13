export class TestCaseJson {

    public static readonly TestCaseJson_Valid = '{{} "resourceType": "Bundle", "id": "1366", "meta": {{}   "versionId": "1",' +
    ' "lastUpdated": "2022-03-30T19:02:32.620+00:00"  },  "type": "collection",  "entry": [ {{}   "fullUrl": "http://local/Encounter",' +
    ' "resource": {{} "resourceType": "Encounter","meta": {{} "versionId": "1","lastUpdated": "2021-10-13T03:34:10.160+00:00","source":"#nEcAkGd8PRwPP5fA"},' +
    ' "text": {{} "status": "generated","div":"<div xmlns=\\"http://www.w3.org/1999/xhtml\\">Sep 9th 2021 for Asthma<a name=\\"mm\\"/></div>\"},' +
    ' "status": "finished","class": {{} "system": "http://terminology.hl7.org/CodeSystem/v3-ActCode","code": "IMP","display":"inpatient encounter"},' +
    ' "type": [ {{} "text": "OutPatient"} ],"subject": {{} "reference": "Patient/1"},"participant": [ {{} "individual": {{} "reference": "Practitioner/30164",' +
    ' "display": "Dr John Doe"}} ],"period": {{} "start": "2022-01-10T03:34:10.054Z"}}}, {{} "fullUrl": "http://local/Patient","resource": {{} "resourceType":'+
    ' "Patient","text": {{} "status": "generated","div": "<div xmlns=\\"http://www.w3.org/1999/xhtml\\">Lizzy Health</div>\"},"identifier":' +
    ' [ {{} "system": "http://clinfhir.com/fhir/NamingSystem/identifier","value": "20181011LizzyHealth"} ],"name": [ {{} "use": "official",' +
    ' "text": "Lizzy Health","family": "Health","given": [ "Lizzy" ]} ],"gender": "female","birthDate": "2000-10-11"}} ]}'

    public static readonly validTestCaseJsonFHIR_and_QICORE = '{{}        "resourceType": "Bundle",        "id": "7682",        "meta": {{}          "versionId": "1",' +
    '"lastUpdated": "2022-06-21T15:56:10.639+00:00"        },        "type": "collection",        "entry": [ {{}          "fullUrl": "http://local/Encounter",          "resource": {{}' +
    '"resourceType": "Encounter",            "meta": {{}              "versionId": "1",              "lastUpdated": "2021-10-13T03:34:10.160+00:00",              "source": "#nEcAkGd8PRwPP5fA"' +
    '},            "text": {{}              "status": "generated",              "div": "<div xmlns=\\"http://www.w3.org/1999/xhtml\\">Sep 9th 2021 for Asthma<a name=\\"mm\\"/></div>\"' +
    '},            "status": "finished",            "class": {{}              "system": "2.16.840.1.113883.6.96",              "code": "185463005",              "display": "Visit out of hours (procedure)"' +
    '},            "type": [ {{}              "coding": [ {{}                "system": "http://snomed.info/sct",                "version": "2022-03",                "code": "185463005",                "display": "Visit out of hours (procedure)"' +
    '  } ]            } ],            "subject": {{}              "reference": "Patient/1"            },            "participant": [ {{}              "individual": {{}                "reference": "Practitioner/30164",                "display": "Dr John Doe"' +
    '  }            } ],            "period": {{}              "start": "2021-08-02T03:34:10.054Z",    "end": "2021-08-03T03:34:10.054Z"            }          }        }, {{}          "fullUrl": "http://local/Patient",          "resource": {{}            "resourceType": "Patient",' +
    '"text": {{}              "status": "generated",              "div": "<div xmlns=\\"http://www.w3.org/1999/xhtml\\">Lizzy Health</div>\"            },            "identifier": [ {{}              "system": "http://clinfhir.com/fhir/NamingSystem/identifier",              "value": "20181011LizzyHealth"' +
    '} ],            "name": [ {{}              "use": "official",              "text": "Lizzy Health",              "family": "Health",              "given": [ "Lizzy" ]            } ],            "gender": "female",' +
    '"birthDate": "2000-10-11"          }        } ]      }'

    public static readonly invalidTestCaseJsonFHIR_and_QICORE = '{{} "resourceType": "Bundle", "id": "7682","meta": {{}          "versionId": "1",' +
    '"lastUpdated": "2022-06-21T15:56:10.639+00:00" },        "type": "collection",        "entry": [ {{}          "fullUrl": "http://local/Patient",          "resource": {{}            "resourceType": "Patient",' +
    '"text": {{}              "status": "generated",              "div": "<div xmlns=\\"http://www.w3.org/1999/xhtml\\">Lizzy Health</div>\"            },            "identifier": [ {{}              "system": "http://clinfhir.com/fhir/NamingSystem/identifier",              "value": "20181011LizzyHealth"' +
    '} ],            "name": [ {{}              "use": "official",              "text": "Lizzy Health",              "family": "Health",              "given": [ "Lizzy" ]            } ],            "gender": "female",' +
    '"birthDate": "2000-10-11"          }        } ]      }'

    public static readonly invalidTestCaseJsonFHIR_and_QICORE_Status = '{{}        "resourceType": "Bundle",        "id": "7682",        "meta": {{}          "versionId": "1",' +
    '"lastUpdated": "2022-06-21T15:56:10.639+00:00"        },        "type": "collection",        "entry": [ {{}          "fullUrl": "http://local/Encounter",          "resource": {{}' +
    '"resourceType": "Encounter",            "meta": {{}              "versionId": "1",              "lastUpdated": "2021-10-13T03:34:10.160+00:00",              "source": "#nEcAkGd8PRwPP5fA"' +
    '},            "text": {{}              "status": "generated",              "div": "<div xmlns=\\"http://www.w3.org/1999/xhtml\\">Sep 9th 2021 for Asthma<a name=\\"mm\\"/></div>\"' +
    '},            "status": "in-progress",            "type": [ {{}              "coding": [ {{}                "system": "http://snomed.info/sct",                "version": "2022-03",                "code": "185463005",                "display": "Visit out of hours (procedure)"' +
    '  } ]            } ],            "subject": {{}              "reference": "Patient/1"            },            "participant": [ {{}              "individual": {{}                "reference": "Practitioner/30164",                "display": "Dr John Doe"' +
    '  }            } ],            "period": {{}              "start": "2021-08-02T03:34:10.054Z",    "end": "2021-08-03T03:34:10.054Z"            }          }        }, {{}          "fullUrl": "http://local/Patient",          "resource": {{}            "resourceType": "Patient",' +
    '"text": {{}              "status": "generated",              "div": "<div xmlns=\\"http://www.w3.org/1999/xhtml\\">Lizzy Health</div>\"            },            "identifier": [ {{}              "system": "http://clinfhir.com/fhir/NamingSystem/identifier",              "value": "20181011LizzyHealth"' +
    '} ],            "name": [ {{}              "use": "official",              "text": "Lizzy Health",              "family": "Health",              "given": [ "Lizzy" ]            } ],            "gender": "female",' +
    '"birthDate": "2000-10-11"          }        } ]      }'

    public static readonly invalidTestCaseJsonFHIR_and_QICORE_MDates = '{{}        "resourceType": "Bundle",        "id": "7682",        "meta": {{}          "versionId": "1",' +
    '"lastUpdated": "2022-06-21T15:56:10.639+00:00"        },        "type": "collection",        "entry": [ {{}          "fullUrl": "http://local/Encounter",          "resource": {{}' +
    '"resourceType": "Encounter",            "meta": {{}              "versionId": "1",              "lastUpdated": "2021-10-13T03:34:10.160+00:00",              "source": "#nEcAkGd8PRwPP5fA"' +
    '},            "text": {{}              "status": "generated",              "div": "<div xmlns=\\"http://www.w3.org/1999/xhtml\\">Sep 9th 2021 for Asthma<a name=\\"mm\\"/></div>\"' +
    '},            "status": "finished",            "type": [ {{}              "coding": [ {{}                "system": "http://snomed.info/sct",                "version": "2022-03",                "code": "185463005",                "display": "Visit out of hours (procedure)"' +
    '  } ]            } ],            "subject": {{}              "reference": "Patient/1"            },            "participant": [ {{}              "individual": {{}                "reference": "Practitioner/30164",                "display": "Dr John Doe"' +
    '  }            } ],            "period": {{}              "start": "2025-08-02T03:34:10.054Z",    "end": "2026-08-03T03:34:10.054Z"            }          }        }, {{}          "fullUrl": "http://local/Patient",          "resource": {{}            "resourceType": "Patient",' +
    '"text": {{}              "status": "generated",              "div": "<div xmlns=\\"http://www.w3.org/1999/xhtml\\">Lizzy Health</div>\"            },            "identifier": [ {{}              "system": "http://clinfhir.com/fhir/NamingSystem/identifier",              "value": "20181011LizzyHealth"' +
    '} ],            "name": [ {{}              "use": "official",              "text": "Lizzy Health",              "family": "Health",              "given": [ "Lizzy" ]            } ],            "gender": "female",' +
    '"birthDate": "2000-10-11"          }        } ]      }'

    public static readonly invalidTestCaseJsonQICore ="{\n" +
    "\"resourceType\": \"Bundle\",\n" +
    "\"id\": \"8761\"," +
    "\"meta\": {\n" +
    "  \"versionId\": \"1\"," +
    "  \"lastUpdated\": \"2022-07-12T20:15:54.918+00:00\"\n" +
    "},\n" +
    "\"type\": \"collection\"," +
    "\"entry\": [ {\n" +
    "  \"resource\": {\n" +
    "    \"resourceType\": \"Patient\",\n" +
    "    \"id\": \"1\",\n" +
    "    \"meta\": {\n" +
    "      \"profile\": [ \"http://hl7.org/fhir/us/core/StructureDefinition/us-core-patient\" ]\n" +
    "    },\n" +
    "    \"text\": {\n" +
    "      \"status\": \"generated\",\n" +
    "      \"div\": \"<div xmlns=\'http://www.w3.org/1999/xhtml\'><div class=\'hapiHeaderText\'>Betty <b>BERTHA </b></div><table class=\'hapiPropertyTable\'><tbody><tr><td>Identifier</td><td>999999995</td></tr><tr><td>Date of birth</td><td><span>01 January 1995</span></td></tr></tbody></table></div>\"\n" +
    "    },\n" +
    "    \"extension\": [ {\n" +
    "      \"url\": \"http://hl7.org/fhir/us/core/StructureDefinition/us-core-race\",\n" +
    "      \"extension\": [ {\n" +
    "        \"url\": \"ombCategory\",\n" +
    "        \"valueCoding\": {\n" +
    "          \"system\": \"urn:oid:2.16.840.1.113883.6.238\",\n" +
    "          \"code\": \"2106-3\",\n" +
    "          \"display\": \"White\"\n" +
    "        }\n" +
    "      }, {\n" +
    "        \"url\": \"detailed\",\n" +
    "        \"valueCoding\": {\n" +
    "          \"system\": \"urn:oid:2.16.840.1.113883.6.238\",\n" +
    "          \"code\": \"1586-7\",\n" +
    "          \"display\": \"Shoshone\"\n" +
    "        }\n" +
    "      }, {\n" +
    "        \"url\": \"text\",\n" +
    "        \"valueString\": \"Mixed\"\n" +
    "      } ]\n" +
    "    }, {\n" +
    "      \"url\": \"http://hl7.org/fhir/us/core/StructureDefinition/us-core-ethnicity\",\n" +
    "      \"extension\": [ {\n" +
    "        \"url\": \"ombCategory\",\n" +
    "        \"valueCoding\": {\n" +
    "          \"system\": \"urn:oid:2.16.840.1.113883.6.238\",\n" +
    "          \"code\": \"2135-2\",\n" +
    "          \"display\": \"Hispanic or Latino\"\n" +
    "        }\n" +
    "      }, {\n" +
    "        \"url\": \"detailed\",\n" +
    "        \"valueCoding\": {\n" +
    "          \"system\": \"urn:oid:2.16.840.1.113883.6.238\",\n" +
    "          \"code\": \"2148-5\",\n" +
    "          \"display\": \"Mexican\"\n" +
    "        }\n" +
    "      }, {\n" +
    "        \"url\": \"text\",\n" +
    "        \"valueString\": \"Hispanic or Latino\"\n" +
    "      } ]\n" +
    "    } ],\n" +
    "    \"identifier\": [ {\n" +
    "      \"use\": \"usual\",\n" +
    "      \"type\": {\n" +
    "        \"coding\": [ {\n" +
    "          \"system\": \"http://terminology.hl7.org/CodeSystem/v2-0203\",\n" +
    "          \"code\": \"MR\",\n" +
    "          \"display\": \"Medical Record Number\"\n" +
    "        } ]\n" +
    "      },\n" +
    "      \"system\": \"http://hospital.smarthealthit.org\",\n" +
    "      \"value\": \"999999995\"\n" +
    "    } ],\n" +
    "    \"name\": [ {\n" +
    "      \"family\": \"Bertha\",\n" +
    "      \"given\": [ \"Betty\" ]\n" +
    "    } ],\n" +
    "    \"gender\": \"female\",\n" +
    "    \"birthDate\": \"1995-01-01\"\n" +
    "  },\n" +
    "  \"request\": {\n" +
    "    \"method\": \"PUT\",\n" +
    "    \"url\": \"Patient/denom-EXM124\"\n" +
    "  }\n" +
    "} ]\n" +
  "}"+'{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}' +
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}' +
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}' +
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}' +
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}' +
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  +'{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}' +
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}' +
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}' +
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}' +
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}' +
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  +'{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}' +
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}' +
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}' +
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}' +
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}' +
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  +'{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}' +
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}' +
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}' +
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}' +
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}' +
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}'
    
    public static readonly invalidTestCaseJsonQICore_status = "{\n" +
    "\"resourceType\": \"Bundle\",\n" +
    "\"id\": \"8761\"," +
    "\"meta\": {\n" +
    "  \"versionId\": \"1\"," +
    "  \"lastUpdated\": \"2022-07-12T20:15:54.918+00:00\"\n" +
    "},\n" +
    "\"type\": \"collection\"," +
    "\"entry\": [ {\n" +
    "  \"fullUrl\": \"http://local/Encounter\"," +
    "  \"resource\": {\n" +
    "    \"resourceType\": \"Encounter\",\n" +
    "    \"meta\": {\n" +
    "      \"versionId\": \"1\",\n" +
    "      \"lastUpdated\": \"2021-10-13T03:34:10.160+00:00\",\n" +
    "      \"source\": \"#nEcAkGd8PRwPP5fA\"\n" +
    "    },\n" +
    "    \"text\": {\n" +
    "      \"status\": \"generated\",\n" +
    "      \"div\": \"<div xmlns=\'http://www.w3.org/1999/xhtml\'>Sep 9th 2021 for Asthma<a name=\'mm\'/></div>\"\n" +
    "    },\n" +
    "    \"status\": \"in-progress\",\n" +
    "    \"type\": [ {\n" +
    "      \"coding\": [ {\n" +
    "        \"system\": \"http://snomed.info/sct\",\n" +
    "        \"version\": \"2022-03\",\n" +
    "        \"code\": \"185463005\",\n" +
    "        \"display\": \"Visit out of hours (procedure)\"\n" +
    "      } ]\n" +
    "    } ],\n" +
    "    \"subject\": {\n" +
    "      \"reference\": \"Patient/1\"\n" +
    "    },\n" +
    "    \"participant\": [ {\n" +
    "      \"individual\": {\n" +
    "        \"reference\": \"Practitioner/30164\",\n" +
    "        \"display\": \"Dr John Doe\"\n" +
    "      }\n" +
    "    } ],\n" +
    "    \"period\": {\n" +
    "      \"start\": \"2021-08-08T03:34:10.054Z\",\n" +
    "      \"end\": \"2022-07-07T03:34:10.054Z\"\n" +
    "    }\n" +
    "  }\n" +
    "}, {\n" +
    "  \"resource\": {\n" +
    "    \"resourceType\": \"Patient\",\n" +
    "    \"id\": \"1\",\n" +
    "    \"meta\": {\n" +
    "      \"profile\": [ \"http://hl7.org/fhir/us/core/StructureDefinition/us-core-patient\" ]\n" +
    "    },\n" +
    "    \"text\": {\n" +
    "      \"status\": \"generated\",\n" +
    "      \"div\": \"<div xmlns=\'http://www.w3.org/1999/xhtml\'><div class=\'hapiHeaderText\'>Betty <b>BERTHA </b></div><table class=\'hapiPropertyTable\'><tbody><tr><td>Identifier</td><td>999999995</td></tr><tr><td>Date of birth</td><td><span>01 January 1995</span></td></tr></tbody></table></div>\"\n" +
    "    },\n" +
    "    \"extension\": [ {\n" +
    "      \"url\": \"http://hl7.org/fhir/us/core/StructureDefinition/us-core-race\",\n" +
    "      \"extension\": [ {\n" +
    "        \"url\": \"ombCategory\",\n" +
    "        \"valueCoding\": {\n" +
    "          \"system\": \"urn:oid:2.16.840.1.113883.6.238\",\n" +
    "          \"code\": \"2106-3\",\n" +
    "          \"display\": \"White\"\n" +
    "        }\n" +
    "      }, {\n" +
    "        \"url\": \"detailed\",\n" +
    "        \"valueCoding\": {\n" +
    "          \"system\": \"urn:oid:2.16.840.1.113883.6.238\",\n" +
    "          \"code\": \"1586-7\",\n" +
    "          \"display\": \"Shoshone\"\n" +
    "        }\n" +
    "      }, {\n" +
    "        \"url\": \"text\",\n" +
    "        \"valueString\": \"Mixed\"\n" +
    "      } ]\n" +
    "    }, {\n" +
    "      \"url\": \"http://hl7.org/fhir/us/core/StructureDefinition/us-core-ethnicity\",\n" +
    "      \"extension\": [ {\n" +
    "        \"url\": \"ombCategory\",\n" +
    "        \"valueCoding\": {\n" +
    "          \"system\": \"urn:oid:2.16.840.1.113883.6.238\",\n" +
    "          \"code\": \"2135-2\",\n" +
    "          \"display\": \"Hispanic or Latino\"\n" +
    "        }\n" +
    "      }, {\n" +
    "        \"url\": \"detailed\",\n" +
    "        \"valueCoding\": {\n" +
    "          \"system\": \"urn:oid:2.16.840.1.113883.6.238\",\n" +
    "          \"code\": \"2148-5\",\n" +
    "          \"display\": \"Mexican\"\n" +
    "        }\n" +
    "      }, {\n" +
    "        \"url\": \"text\",\n" +
    "        \"valueString\": \"Hispanic or Latino\"\n" +
    "      } ]\n" +
    "    } ],\n" +
    "    \"identifier\": [ {\n" +
    "      \"use\": \"usual\",\n" +
    "      \"type\": {\n" +
    "        \"coding\": [ {\n" +
    "          \"system\": \"http://terminology.hl7.org/CodeSystem/v2-0203\",\n" +
    "          \"code\": \"MR\",\n" +
    "          \"display\": \"Medical Record Number\"\n" +
    "        } ]\n" +
    "      },\n" +
    "      \"system\": \"http://hospital.smarthealthit.org\",\n" +
    "      \"value\": \"999999995\"\n" +
    "    } ],\n" +
    "    \"name\": [ {\n" +
    "      \"family\": \"Bertha\",\n" +
    "      \"given\": [ \"Betty\" ]\n" +
    "    } ],\n" +
    "    \"gender\": \"female\",\n" +
    "    \"birthDate\": \"1995-01-01\"\n" +
    "  },\n" +
    "  \"request\": {\n" +
    "    \"method\": \"PUT\",\n" +
    "    \"url\": \"Patient/denom-EXM124\"\n" +
    "  }\n" +
    "} ]\n" +
  "}"+'{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}' +
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}' +
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}' +
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}' +
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}' +
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  +'{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}' +
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}' +
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}' +
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}' +
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}' +
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  +'{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}' +
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}' +
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}' +
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}' +
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}' +
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  +'{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}' +
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}' +
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}' +
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}' +
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}' +
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}'
    
    public static readonly invalidTestCaseJsonQICore_MDates = "{\n" +
    "\"resourceType\": \"Bundle\",\n" +
    "\"id\": \"8761\"," +
    "\"meta\": {\n" +
    "  \"versionId\": \"1\"," +
    "  \"lastUpdated\": \"2022-07-12T20:15:54.918+00:00\"\n" +
    "},\n" +
    "\"type\": \"collection\"," +
    "\"entry\": [ {\n" +
    "  \"fullUrl\": \"http://local/Encounter\"," +
    "  \"resource\": {\n" +
    "    \"resourceType\": \"Encounter\",\n" +
    "    \"meta\": {\n" +
    "      \"versionId\": \"1\",\n" +
    "      \"lastUpdated\": \"2021-10-13T03:34:10.160+00:00\",\n" +
    "      \"source\": \"#nEcAkGd8PRwPP5fA\"\n" +
    "    },\n" +
    "    \"text\": {\n" +
    "      \"status\": \"generated\",\n" +
    "      \"div\": \"<div xmlns=\'http://www.w3.org/1999/xhtml\'>Sep 9th 2021 for Asthma<a name=\'mm\'/></div>\"\n" +
    "    },\n" +
    "    \"status\": \"finished\",\n" +
    "    \"type\": [ {\n" +
    "      \"coding\": [ {\n" +
    "        \"system\": \"http://snomed.info/sct\",\n" +
    "        \"version\": \"2022-03\",\n" +
    "        \"code\": \"185463005\",\n" +
    "        \"display\": \"Visit out of hours (procedure)\"\n" +
    "      } ]\n" +
    "    } ],\n" +
    "    \"subject\": {\n" +
    "      \"reference\": \"Patient/1\"\n" +
    "    },\n" +
    "    \"participant\": [ {\n" +
    "      \"individual\": {\n" +
    "        \"reference\": \"Practitioner/30164\",\n" +
    "        \"display\": \"Dr John Doe\"\n" +
    "      }\n" +
    "    } ],\n" +
    "    \"period\": {\n" +
    "      \"start\": \"2027-08-08T03:34:10.054Z\",\n" +
    "      \"end\": \"2028-07-07T03:34:10.054Z\"\n" +
    "    }\n" +
    "  }\n" +
    "}, {\n" +
    "  \"resource\": {\n" +
    "    \"resourceType\": \"Patient\",\n" +
    "    \"id\": \"1\",\n" +
    "    \"meta\": {\n" +
    "      \"profile\": [ \"http://hl7.org/fhir/us/core/StructureDefinition/us-core-patient\" ]\n" +
    "    },\n" +
    "    \"text\": {\n" +
    "      \"status\": \"generated\",\n" +
    "      \"div\": \"<div xmlns=\'http://www.w3.org/1999/xhtml\'><div class=\'hapiHeaderText\'>Betty <b>BERTHA </b></div><table class=\'hapiPropertyTable\'><tbody><tr><td>Identifier</td><td>999999995</td></tr><tr><td>Date of birth</td><td><span>01 January 1995</span></td></tr></tbody></table></div>\"\n" +
    "    },\n" +
    "    \"extension\": [ {\n" +
    "      \"url\": \"http://hl7.org/fhir/us/core/StructureDefinition/us-core-race\",\n" +
    "      \"extension\": [ {\n" +
    "        \"url\": \"ombCategory\",\n" +
    "        \"valueCoding\": {\n" +
    "          \"system\": \"urn:oid:2.16.840.1.113883.6.238\",\n" +
    "          \"code\": \"2106-3\",\n" +
    "          \"display\": \"White\"\n" +
    "        }\n" +
    "      }, {\n" +
    "        \"url\": \"detailed\",\n" +
    "        \"valueCoding\": {\n" +
    "          \"system\": \"urn:oid:2.16.840.1.113883.6.238\",\n" +
    "          \"code\": \"1586-7\",\n" +
    "          \"display\": \"Shoshone\"\n" +
    "        }\n" +
    "      }, {\n" +
    "        \"url\": \"text\",\n" +
    "        \"valueString\": \"Mixed\"\n" +
    "      } ]\n" +
    "    }, {\n" +
    "      \"url\": \"http://hl7.org/fhir/us/core/StructureDefinition/us-core-ethnicity\",\n" +
    "      \"extension\": [ {\n" +
    "        \"url\": \"ombCategory\",\n" +
    "        \"valueCoding\": {\n" +
    "          \"system\": \"urn:oid:2.16.840.1.113883.6.238\",\n" +
    "          \"code\": \"2135-2\",\n" +
    "          \"display\": \"Hispanic or Latino\"\n" +
    "        }\n" +
    "      }, {\n" +
    "        \"url\": \"detailed\",\n" +
    "        \"valueCoding\": {\n" +
    "          \"system\": \"urn:oid:2.16.840.1.113883.6.238\",\n" +
    "          \"code\": \"2148-5\",\n" +
    "          \"display\": \"Mexican\"\n" +
    "        }\n" +
    "      }, {\n" +
    "        \"url\": \"text\",\n" +
    "        \"valueString\": \"Hispanic or Latino\"\n" +
    "      } ]\n" +
    "    } ],\n" +
    "    \"identifier\": [ {\n" +
    "      \"use\": \"usual\",\n" +
    "      \"type\": {\n" +
    "        \"coding\": [ {\n" +
    "          \"system\": \"http://terminology.hl7.org/CodeSystem/v2-0203\",\n" +
    "          \"code\": \"MR\",\n" +
    "          \"display\": \"Medical Record Number\"\n" +
    "        } ]\n" +
    "      },\n" +
    "      \"system\": \"http://hospital.smarthealthit.org\",\n" +
    "      \"value\": \"999999995\"\n" +
    "    } ],\n" +
    "    \"name\": [ {\n" +
    "      \"family\": \"Bertha\",\n" +
    "      \"given\": [ \"Betty\" ]\n" +
    "    } ],\n" +
    "    \"gender\": \"female\",\n" +
    "    \"birthDate\": \"1995-01-01\"\n" +
    "  },\n" +
    "  \"request\": {\n" +
    "    \"method\": \"PUT\",\n" +
    "    \"url\": \"Patient/denom-EXM124\"\n" +
    "  }\n" +
    "} ]\n" +
  "}"+'{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}' +
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}' +
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}' +
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}' +
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}' +
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  +'{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}' +
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}' +
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}' +
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}' +
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}' +
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  +'{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}' +
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}' +
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}' +
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}' +
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}' +
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  +'{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}' +
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}' +
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}' +
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}' +
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}' +
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}'
    
    public static readonly validTestCaseJsonQICOre = "{\n" +
    "\"resourceType\": \"Bundle\",\n" +
    "\"id\": \"8761\"," +
    "\"meta\": {\n" +
    "  \"versionId\": \"1\"," +
    "  \"lastUpdated\": \"2022-07-12T20:15:54.918+00:00\"\n" +
    "},\n" +
    "\"type\": \"collection\"," +
    "\"entry\": [ {\n" +
    "  \"fullUrl\": \"http://local/Encounter\"," +
    "  \"resource\": {\n" +
    "    \"resourceType\": \"Encounter\",\n" +
    "    \"meta\": {\n" +
    "      \"versionId\": \"1\",\n" +
    "      \"lastUpdated\": \"2021-10-13T03:34:10.160+00:00\",\n" +
    "      \"source\": \"#nEcAkGd8PRwPP5fA\"\n" +
    "    },\n" +
    "    \"text\": {\n" +
    "      \"status\": \"generated\",\n" +
    "      \"div\": \"<div xmlns=\'http://www.w3.org/1999/xhtml\'>Sep 9th 2021 for Asthma<a name=\'mm\'/></div>\"\n" +
    "    },\n" +
    "    \"status\": \"finished\",\n" +
    "    \"type\": [ {\n" +
    "      \"coding\": [ {\n" +
    "        \"system\": \"http://snomed.info/sct\",\n" +
    "        \"version\": \"2022-03\",\n" +
    "        \"code\": \"185463005\",\n" +
    "        \"display\": \"Visit out of hours (procedure)\"\n" +
    "      } ]\n" +
    "    } ],\n" +
    "    \"subject\": {\n" +
    "      \"reference\": \"Patient/1\"\n" +
    "    },\n" +
    "    \"participant\": [ {\n" +
    "      \"individual\": {\n" +
    "        \"reference\": \"Practitioner/30164\",\n" +
    "        \"display\": \"Dr John Doe\"\n" +
    "      }\n" +
    "    } ],\n" +
    "    \"period\": {\n" +
    "      \"start\": \"2021-08-08T03:34:10.054Z\",\n" +
    "      \"end\": \"2022-07-07T03:34:10.054Z\"\n" +
    "    }\n" +
    "  }\n" +
    "}, {\n" +
    "  \"resource\": {\n" +
    "    \"resourceType\": \"Patient\",\n" +
    "    \"id\": \"1\",\n" +
    "    \"meta\": {\n" +
    "      \"profile\": [ \"http://hl7.org/fhir/us/core/StructureDefinition/us-core-patient\" ]\n" +
    "    },\n" +
    "    \"text\": {\n" +
    "      \"status\": \"generated\",\n" +
    "      \"div\": \"<div xmlns=\'http://www.w3.org/1999/xhtml\'><div class=\'hapiHeaderText\'>Betty <b>BERTHA </b></div><table class=\'hapiPropertyTable\'><tbody><tr><td>Identifier</td><td>999999995</td></tr><tr><td>Date of birth</td><td><span>01 January 1995</span></td></tr></tbody></table></div>\"\n" +
    "    },\n" +
    "    \"extension\": [ {\n" +
    "      \"url\": \"http://hl7.org/fhir/us/core/StructureDefinition/us-core-race\",\n" +
    "      \"extension\": [ {\n" +
    "        \"url\": \"ombCategory\",\n" +
    "        \"valueCoding\": {\n" +
    "          \"system\": \"urn:oid:2.16.840.1.113883.6.238\",\n" +
    "          \"code\": \"2106-3\",\n" +
    "          \"display\": \"White\"\n" +
    "        }\n" +
    "      }, {\n" +
    "        \"url\": \"detailed\",\n" +
    "        \"valueCoding\": {\n" +
    "          \"system\": \"urn:oid:2.16.840.1.113883.6.238\",\n" +
    "          \"code\": \"1586-7\",\n" +
    "          \"display\": \"Shoshone\"\n" +
    "        }\n" +
    "      }, {\n" +
    "        \"url\": \"text\",\n" +
    "        \"valueString\": \"Mixed\"\n" +
    "      } ]\n" +
    "    }, {\n" +
    "      \"url\": \"http://hl7.org/fhir/us/core/StructureDefinition/us-core-ethnicity\",\n" +
    "      \"extension\": [ {\n" +
    "        \"url\": \"ombCategory\",\n" +
    "        \"valueCoding\": {\n" +
    "          \"system\": \"urn:oid:2.16.840.1.113883.6.238\",\n" +
    "          \"code\": \"2135-2\",\n" +
    "          \"display\": \"Hispanic or Latino\"\n" +
    "        }\n" +
    "      }, {\n" +
    "        \"url\": \"detailed\",\n" +
    "        \"valueCoding\": {\n" +
    "          \"system\": \"urn:oid:2.16.840.1.113883.6.238\",\n" +
    "          \"code\": \"2148-5\",\n" +
    "          \"display\": \"Mexican\"\n" +
    "        }\n" +
    "      }, {\n" +
    "        \"url\": \"text\",\n" +
    "        \"valueString\": \"Hispanic or Latino\"\n" +
    "      } ]\n" +
    "    } ],\n" +
    "    \"identifier\": [ {\n" +
    "      \"use\": \"usual\",\n" +
    "      \"type\": {\n" +
    "        \"coding\": [ {\n" +
    "          \"system\": \"http://terminology.hl7.org/CodeSystem/v2-0203\",\n" +
    "          \"code\": \"MR\",\n" +
    "          \"display\": \"Medical Record Number\"\n" +
    "        } ]\n" +
    "      },\n" +
    "      \"system\": \"http://hospital.smarthealthit.org\",\n" +
    "      \"value\": \"999999995\"\n" +
    "    } ],\n" +
    "    \"name\": [ {\n" +
    "      \"family\": \"Bertha\",\n" +
    "      \"given\": [ \"Betty\" ]\n" +
    "    } ],\n" +
    "    \"gender\": \"female\",\n" +
    "    \"birthDate\": \"1995-01-01\"\n" +
    "  },\n" +
    "  \"request\": {\n" +
    "    \"method\": \"PUT\",\n" +
    "    \"url\": \"Patient/denom-EXM124\"\n" +
    "  }\n" +
    "} ]\n" +
  "}"+'{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}' +
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}' +
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}' +
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}' +
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}' +
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  +'{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}' +
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}' +
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}' +
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}' +
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}' +
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  +'{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}' +
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}' +
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}' +
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}' +
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}' +
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  +'{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}' +
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}' +
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}' +
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}'+
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}' +
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}' +
  '{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{del}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}'

    public static readonly TestCaseJson_Invalid = '{{} "resourceType": "Account", "id": "1366", "meta": {{}   "versionId": "1",' +
    ' "lastUpdated": "2022-03-30T19:02:32.620+00:00"  },  "type": "collection",  "entry": [ {{}   "fullUrl": "http://local/Encounter",' +
    ' "resource": {{} "resourceType": "Encounter","meta": {{} "versionId": "1","lastUpdated": "2021-10-13T03:34:10.160+00:00","source":"#nEcAkGd8PRwPP5fA"},' +
    ' "text": {{} "status": "generated","div":"<div xmlns=\\"http://www.w3.org/1999/xhtml\\">Sep 9th 2021 for Asthma<a name=\\"mm\\"/></div>\"},' +
    ' "status": "finished","class": {{} "system": "http://terminology.hl7.org/CodeSystem/v3-ActCode","code": "IMP","display":"inpatient encounter"},' +
    ' "type": [ {{} "text": "OutPatient"} ],"subject": {{} "reference": "Patient/1"},"participant": [ {{} "individual": {{} "reference": "Practitioner/30164",' +
    ' "display": "Dr John Doe"}} ],"period": {{} "start": "2022-01-10T03:34:10.054Z"}}}, {{} "fullUrl": "http://local/Patient","resource": {{} "resourceType":'+
    ' "Patient","text": {{} "status": "generated","div": "<div xmlns=\\"http://www.w3.org/1999/xhtml\\">Lizzy Health</div>\"},"identifier":' +
    ' [ {{} "system": "http://clinfhir.com/fhir/NamingSystem/identifier","value": "20181011LizzyHealth"} ],"name": [ {{} "use": "official",' +
    ' "text": "Lizzy Health","family": "Health","given": [ "Lizzy" ]} ],"gender": "female","birthDate": "2000-10-11"}} ]}'

    public static readonly TestCase_XML = '<?xml version="1.0" encoding="UTF-8"?>\n' +
        '\n' +
        '<Patient xmlns="http://hl7.org/fhir">\n' +
        '  <id value="pat3"/> \n' +
        '  <text> \n' +
        '    <status value="generated"/> \n' +
        '    <div xmlns="http://www.w3.org/1999/xhtml">\n' +
        '      \n' +
        '      <p> Patient Simon Notsowell @ Acme Healthcare, Inc. MR = 123457, DECEASED</p> \n' +
        '    \n' +
        '    </div> \n' +
        '  </text> \n' +
        '  <identifier> \n' +
        '    <use value="usual"/> \n' +
        '    <type> \n' +
        '      <coding> \n' +
        '        <system value="http://terminology.hl7.org/CodeSystem/v2-0203"/> \n' +
        '        <code value="MR"/> \n' +
        '      </coding> \n' +
        '    </type> \n' +
        '    <system value="urn:oid:0.1.2.3.4.5.6.7"/> \n' +
        '    <value value="123457"/> \n' +
        '  </identifier> \n' +
        '  <active value="true"/> \n' +
        '  <name> \n' +
        '    <use value="official"/> \n' +
        '    <family value="Notsowell"/> \n' +
        '    <given value="Simon"/> \n' +
        '  </name> \n' +
        '  <gender value="male"/> \n' +
        '  <birthDate value="1982-01-23"/> \n' +
        '  <deceasedDateTime value="2015-02-14T13:42:00+10:00"/> \n' +
        '  <managingOrganization> \n' +
        '    <reference value="Organization/1"/> \n' +
        '    <display value="ACME Healthcare, Inc"/> \n' +
        '  </managingOrganization> \n' +
        '</Patient> '

    public static API_TestCaseJson_Valid = '{\n  \"resourceType\": \"Bundle\",\n  \"id\": \"3797\",\n  \"meta\": {\n    \"versionId\": \"1\",\n    \"lastUpdated\": \"2022-05-04T18:25:47.763+00:00\"\n  },\n  \"type\": \"collection\",\n  \"entry\": [ {\n    \"fullUrl\": \"http://local/Encounter\",\n    \"resource\": {\n      \"resourceType\": \"Encounter\",\n      \"meta\": {\n        \"versionId\": \"1\",\n        \"lastUpdated\": \"2021-10-13T03:34:10.160+00:00\",\n        \"source\": \"#nEcAkGd8PRwPP5fA\"\n      },\n      \"text\": {\n        \"status\": \"generated\",\n        \"div\": \"<div xmlns=\\\"http://www.w3.org/1999/xhtml\\\">Sep 9th 2021 for Asthma<a name=\\\"mm\\\"/></div>\"\n      },\n      \"status\": \"finished\",\n      \"class\": {\n        \"system\": \"http://terminology.hl7.org/CodeSystem/v3-ActCode\",\n        \"code\": \"IMP\",\n        \"display\": \"inpatient encounter\"\n      },\n      \"type\": [ {\n        \"text\": \"OutPatient\"\n      } ],\n      \"subject\": {\n        \"reference\": \"Patient/1\"\n      },\n      \"participant\": [ {\n        \"individual\": {\n          \"reference\": \"Practitioner/30164\",\n          \"display\": \"Dr John Doe\"\n        }\n      } ],\n      \"period\": {\n        \"start\": \"2022-01-10T03:34:10.054Z\"\n      }\n    }\n  }, {\n    \"fullUrl\": \"http://local/Patient\",\n    \"resource\": {\n      \"resourceType\": \"Patient\",\n      \"text\": {\n        \"status\": \"generated\",\n        \"div\": \"<div xmlns=\\\"http://www.w3.org/1999/xhtml\\\">Lizzy Health</div>\"\n      },\n      \"identifier\": [ {\n        \"system\": \"http://clinfhir.com/fhir/NamingSystem/identifier\",\n        \"value\": \"20181011LizzyHealth\"\n      } ],\n      \"name\": [ {\n        \"use\": \"official\",\n        \"text\": \"Lizzy Health\",\n        \"family\": \"Health\",\n        \"given\": [ \"Lizzy\" ]\n      } ],\n      \"gender\": \"female\",\n      \"birthDate\": \"2000-10-11\"\n    }\n  } ]\n}'

    public static readonly API_TestCaseJson_InValid = '{\n  \"resourceType\": \"Account\",\n  \"id\": \"508\",\n  \"meta\": {\n    \"versionId\": \"1\",\n    \"lastUpdated\": \"2022-03-01T17:36:04.110+00:00\",\n    \"profile\": [ \"http://hl7.org/fhir/us/core/StructureDefinition/us-core-patient\" ]\n  },\n  \"text\": {\n    \"status\": \"extensions\",\n    \"div\": \"<div xmlns=\\\"http://www.w3.org/1999/xhtml\\\"><p><b>Generated Narrative</b></p></div>\"\n  },\n  \"identifier\": [ {\n    \"use\": \"usual\",\n    \"type\": {\n      \"coding\": [ {\n        \"system\": \"http://terminology.hl7.org/CodeSystem/v2-0203\",\n        \"code\": \"MR\",\n        \"display\": \"Medical Record Number\"\n      } ],\n      \"text\": \"Medical Record Number\"\n    },\n    \"system\": \"http://hospital.smarthealthit.org\",\n    \"value\": \"1032702\"\n  } ],\n  \"name\": [ {\n    \"given\": [ \"Tester\" ]\n  } ],\n  \"gender\": \"female\"\n}'
    
}