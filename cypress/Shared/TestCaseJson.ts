export class TestCaseJson {

    public static readonly TestCaseJson_Valid = '{{} "resourceType": "Bundle", "id": "1366", "meta": {{}   "versionId": "1",' +
    ' "lastUpdated": "2022-03-30T19:02:32.620+00:00"  },  "type": "collection",  "entry": [ {{}   "fullUrl": "http://local/Encounter",' +
    ' "resource": {{} "resourceType": "Encounter","meta": {{} "versionId": "1","lastUpdated": "2021-10-13T03:34:10.160+00:00","source":"#nEcAkGd8PRwPP5fA"},' +
    ' "text": {{} "status": "generated","div":"<div xmlns=\\"http://www.w3.org/1999/xhtml\\">Sep 9th 2021 for Asthma<a name=\\"mm\\"/></div>\"},' +
    ' "status": "finished","class": {{} "system": "http://terminology.hl7.org/CodeSystem/v3-ActCode","code": "IMP","display":"inpatient encounter"},' +
    ' "type": [ {{} "text": "OutPatient"} ],"subject": {{} "reference": "Patient/1"},"participant": [ {{} "individual": {{} "reference": "Practitioner/30164",' +
    ' "display": "Dr John Doe"}} ],"period": {{} "start": "2021-01-01T03:34:10.054Z"}}}, {{} "fullUrl": "http://local/Patient","resource": {{} "resourceType":'+
    ' "Patient","text": {{} "status": "generated","div": "<div xmlns=\\"http://www.w3.org/1999/xhtml\\">Lizzy Health</div>\"}, "meta": {{} "profile": "http://hl7.org/fhir/us/qicore/StructureDefinition/qicore-patient"}, "identifier":' +
    ' [ {{} "system": "http://clinfhir.com/fhir/NamingSystem/identifier","value": "20181011LizzyHealth"} ],"name": [ {{} "use": "official",' +
    ' "text": "Lizzy Health","family": "Health","given": [ "Lizzy" ]} ],"gender": "female","birthDate": "2000-10-11"}} ]}'

    public static readonly TestCaseJson_Valid_w_All_Encounter = '{{} "resourceType": "Bundle", "id": "1366", "meta": {{}  "versionId": "1",' +
    ' "lastUpdated": "2022-03-30T19:02:32.620+00:00" }, "type": "collection", "entry": [ {{}   "fullUrl": "http://local/Encounter/1",   "resource": {{}' +
    ' "resourceType": "Encounter", "id": "Encounter-1", "meta": {{}  "versionId": "1",  "lastUpdated": "2021-10-13T03:34:10.160+00:00",  "source": "#nEcAkGd8PRwPP5fA"' +
    ' }, "text": {{}    "status": "generated",  "div": "<div xmlns=\\"http://www.w3.org/1999/xhtml\\">Sep 9th 2021 for Asthma<a name=\\"mm\\"/></div>\"},' +
    ' "status": "finished",  "class": {{}   "system": "http://terminology.hl7.org/CodeSystem/v3-ActCode", "code": "IMP",  "display": "inpatient encounter"},' +
    ' "type": [ {{} "text": "OutPatient"}], "subject": {{} "reference": "Patient/1"}, "participant": [ {{} "individual": {{} "reference": "Practitioner/30164", "display": "Dr John Doe"' +
    ' }}],    "period": {{}    "start": "2021-01-01T03:34:10.054Z"  }  }  }, {{} "fullUrl": "http://local/Encounter/2", "resource": {{}  "resourceType": "Encounter",  "id": "Encounter-2",' +
    ' "meta": {{}  "versionId": "1",  "lastUpdated": "2021-10-13T03:34:10.160+00:00",   "source": "#nEcAkGd8PRwPP5fA"},  "text": {{}  "status": "generated",  "div": "<div xmlns=\\"http://www.w3.org/1999/xhtml\\">Sep 9th 2021 for Asthma<a name=\\"mm\\"/></div>\"' +
    ' }, "status": "finished", "class": {{}  "system": "http://terminology.hl7.org/CodeSystem/v3-ActCode",   "code": "IMP",  "display": "inpatient encounter" },  "type": [ {{}' +
    ' "coding": [ {{}  "system": "http://snomed.info/sct", "version": "2022-09", "code": "185463005", "display": "Visit out of hours (procedure)"} ]} ], "subject": {{}' +
    ' "reference": "Patient/numer-pos-EXM135v11QICore4"},"participant": [ {{} "individual": {{} "reference": "Practitioner/30164", "display": "Dr John Doe"}' +
    ' } ],  "period": {{}  "start": "2020-11-11T03:34:10.054Z",  "end": "2021-01-01T03:34:10.054Z"}}},{{} "fullUrl": "http://local/Patient", "resource": {{} "resourceType": "Patient",' +
    ' "text": {{} "status": "generated", "div": "<div xmlns=\\"http://www.w3.org/1999/xhtml\\">Lizzy Health</div>\"}, "meta": {{} "profile": "http://hl7.org/fhir/us/qicore/StructureDefinition/qicore-patient"},' +
    ' "identifier": [ {{} "system": "http://clinfhir.com/fhir/NamingSystem/identifier",  "value": "20181011LizzyHealth"  } ],"name": [ {{} "use": "official",     "text": "Lizzy Health",' +
    ' "family": "Health", "given": [ "Lizzy"  ]  }  ],  "gender": "female",  "birthDate": "2000-10-11" }}]}'

    public static readonly validTestCaseJsonFHIR_and_QICORE = '{{} "resourceType": "Bundle", "id": "1366", "meta": {{}   "versionId": "1",' +
    ' "lastUpdated": "2022-03-30T19:02:32.620+00:00"  },  "type": "collection",  "entry": [ {{}   "fullUrl": "http://local/Encounter",' +
    ' "resource": {{} "resourceType": "Encounter","meta": {{} "versionId": "1","lastUpdated": "2021-10-13T03:34:10.160+00:00","source":"#nEcAkGd8PRwPP5fA"},' +
    ' "text": {{} "status": "generated","div":"<div xmlns=\\"http://www.w3.org/1999/xhtml\\">Sep 9th 2021 for Asthma<a name=\\"mm\\"/></div>\"},' +
    ' "status": "finished","class": {{} "system": "http://terminology.hl7.org/CodeSystem/v3-ActCode","code": "IMP","display":"inpatient encounter"},' +
    ' "type": [ {{} "text": "OutPatient"} ],"subject": {{} "reference": "Patient/1"},"participant": [ {{} "individual": {{} "reference": "Practitioner/30164",' +
    ' "display": "Dr John Doe"}} ],"period": {{} "start": "2021-01-01T03:34:10.054Z"}}}, {{} "fullUrl": "http://local/Patient","resource": {{} "resourceType":'+
    ' "Patient","text": {{} "status": "generated","div": "<div xmlns=\\"http://www.w3.org/1999/xhtml\\">Lizzy Health</div>\"}, "meta": {{} "profile": "http://hl7.org/fhir/us/qicore/StructureDefinition/qicore-patient"}, "identifier":' +
    ' [ {{} "system": "http://clinfhir.com/fhir/NamingSystem/identifier","value": "20181011LizzyHealth"} ],"name": [ {{} "use": "official",' +
    ' "text": "Lizzy Health","family": "Health","given": [ "Lizzy" ]} ],"gender": "female","birthDate": "2000-10-11"}} ]}'

    public static readonly invalidTestCaseJsonFHIR_and_QICORE = '{{} "resourceType": "Bundle", "id": "1366", "meta": {{}   "versionId": "1",' +
    ' "lastUpdated": "2022-03-30T19:02:32.620+00:00"  },  "type": "collection",  "entry": [ {{} "fullUrl": "http://local/Patient","resource": {{} "resourceType":'+
    ' "Patient","text": {{} "status": "generated","div": "<div xmlns=\\"http://www.w3.org/1999/xhtml\\">Lizzy Health</div>\"}, "meta": {{} "profile": "http://hl7.org/fhir/us/qicore/StructureDefinition/qicore-patient"}, "identifier":' +
    ' [ {{} "system": "http://clinfhir.com/fhir/NamingSystem/identifier","value": "20181011LizzyHealth"} ],"name": [ {{} "use": "official",' +
    ' "text": "Lizzy Health","family": "Health","given": [ "Lizzy" ]} ],"gender": "female","birthDate": "2000-10-11"}} ]}'

    public static readonly invalidTestCaseJsonFHIR_and_QICORE_Status = '{{} "resourceType": "Bundle", "id": "1366", "meta": {{}   "versionId": "1",' +
    ' "lastUpdated": "2022-03-30T19:02:32.620+00:00"  },  "type": "collection",  "entry": [ {{}   "fullUrl": "http://local/Encounter",' +
    ' "resource": {{} "resourceType": "Encounter","meta": {{} "versionId": "1","lastUpdated": "2021-10-13T03:34:10.160+00:00","source":"#nEcAkGd8PRwPP5fA"},' +
    ' "text": {{} "status": "generated","div":"<div xmlns=\\"http://www.w3.org/1999/xhtml\\">Sep 9th 2021 for Asthma<a name=\\"mm\\"/></div>\"},' +
    ' "status": "in-progress","class": {{} "system": "http://terminology.hl7.org/CodeSystem/v3-ActCode","code": "IMP","display":"inpatient encounter"},' +
    ' "type": [ {{} "text": "OutPatient"} ],"subject": {{} "reference": "Patient/1"},"participant": [ {{} "individual": {{} "reference": "Practitioner/30164",' +
    ' "display": "Dr John Doe"}} ],"period": {{} "start": "2021-01-01T03:34:10.054Z"}}}, {{} "fullUrl": "http://local/Patient","resource": {{} "resourceType":'+
    ' "Patient","text": {{} "status": "generated","div": "<div xmlns=\\"http://www.w3.org/1999/xhtml\\">Lizzy Health</div>\"}, "meta": {{} "profile": "http://hl7.org/fhir/us/qicore/StructureDefinition/qicore-patient"}, "identifier":' +
    ' [ {{} "system": "http://clinfhir.com/fhir/NamingSystem/identifier","value": "20181011LizzyHealth"} ],"name": [ {{} "use": "official",' +
    ' "text": "Lizzy Health","family": "Health","given": [ "Lizzy" ]} ],"gender": "female","birthDate": "2000-10-11"}} ]}'

    public static readonly invalidTestCaseJsonFHIR_and_QICORE_MDates = '{{} "resourceType": "Bundle", "id": "1366", "meta": {{}   "versionId": "1",' +
    ' "lastUpdated": "2022-03-30T19:02:32.620+00:00"  },  "type": "collection",  "entry": [ {{}   "fullUrl": "http://local/Encounter",' +
    ' "resource": {{} "resourceType": "Encounter","meta": {{} "versionId": "1","lastUpdated": "2021-10-13T03:34:10.160+00:00","source":"#nEcAkGd8PRwPP5fA"},' +
    ' "text": {{} "status": "generated","div":"<div xmlns=\\"http://www.w3.org/1999/xhtml\\">Sep 9th 2021 for Asthma<a name=\\"mm\\"/></div>\"},' +
    ' "status": "finished","class": {{} "system": "http://terminology.hl7.org/CodeSystem/v3-ActCode","code": "IMP","display":"inpatient encounter"},' +
    ' "type": [ {{} "text": "OutPatient"} ],"subject": {{} "reference": "Patient/1"},"participant": [ {{} "individual": {{} "reference": "Practitioner/30164",' +
    ' "display": "Dr John Doe"}} ],"period": {{} "start": "2025-08-02T03:34:10.054Z",    "end": "2026-08-03T03:34:10.054Z"}}}, {{} "fullUrl": "http://local/Patient","resource": {{} "resourceType":'+
    ' "Patient","text": {{} "status": "generated","div": "<div xmlns=\\"http://www.w3.org/1999/xhtml\\">Lizzy Health</div>\"}, "meta": {{} "profile": "http://hl7.org/fhir/us/qicore/StructureDefinition/qicore-patient"}, "identifier":' +
    ' [ {{} "system": "http://clinfhir.com/fhir/NamingSystem/identifier","value": "20181011LizzyHealth"} ],"name": [ {{} "use": "official",' +
    ' "text": "Lizzy Health","family": "Health","given": [ "Lizzy" ]} ],"gender": "female","birthDate": "2000-10-11"}} ]}'

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

    public static readonly TestCaseJson_FluentFunction ='{{} "resourceType": "Bundle", "id": "8354", "meta": {{}  "versionId": "1", "lastUpdated": "2022-07-08T14:49:20.301+00:00"}, ' +
        ' "type": "collection", "entry": [ {{}  "resource": {{} "resourceType": "Encounter", "id": "ip-MyPrimaryLibrary-1", "meta": {{} ' +
        ' "profile": [ "http://hl7.org/fhir/us/core/StructureDefinition/us-core-encounter" ]}, "status": "finished", "class": {{} "system": "urn:oid:2.16.840.1.113883.5.4",  ' +
        ' "code": "AMB", "display": "ambulatory"}, "type": [ {{} "coding": [ {{} "system": "http://www.ama-assn.org/go/cpt", "code": "99202", ' +
        ' "display": "Office or other outpatient visit for the evaluation and management of a new patient, which requires a medically appropriate history and/or examination and straightforward medical decision making. When using time for code selection, 15-29 minutes of total time is ' +
        ' spent on the date of the encounter."} ] } ], "subject": {{}  "reference": "Patient/ip-MyPrimaryLibrary" }, "period": {{} "start": "2021-01-01T01:00:00.0", "end": "2021-01-02T01:00:00.0"} }, ' +
        ' "request": {{} "method": "PUT", "url": "Encounter/ip-MyPrimaryLibrary-1"}}, {{} "resource": {{} "resourceType": "Observation", "id": "ip-MyPrimaryLibrary-2", "meta": {{} "profile": [ "http://hl7.org/fhir/observation" ]}, ' +
        ' "status": "final", "code": {{} "coding": [ {{} "system": "urn:oid:2.16.840.1.113883.6.1", "code": "10524-7", "display": "Microscopic observation [Identifier] in Cervix by Cyto stain"} ]}, ' +
        ' "subject": {{} "reference": "Patient/ip-MyPrimaryLibrary"}, "effectiveDateTime": "2019-11-01T00:00:00"}, "request": {{} "method": "PUT", "url": "Observation/ip-MyPrimaryLibrary-2"} }, {{}  "resource": {{} "resourceType": "Patient", "id": "ip-MyPrimaryLibrary", '  +
        ' "meta": {{} "profile": [ "http://hl7.org/fhir/us/qicore/StructureDefinition/qicore-patient" ]}, "text": {{} "status": "generated", ' +
        ' "div": "<div xmlns=\\"http://www.w3.org/1999/xhtml\\"><div class=\\"hapiHeaderText\\">Bettie <b>JONES </b></div><table class=\\"hapiPropertyTable\\"><tbody><tr><td>Identifier</td><td>999459995</td></tr><tr><td>Date of birth</td><td><span>01 January 1968</span></td></tr></tbody></table></div>"}, '  +
        ' "extension": [ {{} "url": "http://hl7.org/fhir/us/core/StructureDefinition/us-core-race", "extension": [ {{} "url": "ombCategory", "valueCoding": {{} "system": "urn:oid:2.16.840.1.113883.6.238", "code": "2028-9", "display": "Asian"}} ]}, ' +
        ' {{} "url": "http://hl7.org/fhir/us/core/StructureDefinition/us-core-ethnicity", "extension": [ {{} "url": "ombCategory", "valueCoding": {{} "system": "urn:oid:2.16.840.1.113883.6.238",  "code": "2135-2",  "display": "Hispanic or Latino"}} ]} ], ' +
        ' "identifier": [ {{} "use": "usual", "type": {{} "coding": [ {{}  "system": "urn:oid:2.16.840.1.113883.18.108", "code": "MR", "display": "Medical Record Number" } ]  },  "system": "http://hospital.smarthealthit.org", "value": "999459995"   } ], ' +
        ' "name": [ {{}  "family": "Jones", "given": [ "Bettie" ]  } ],  "gender": "female",  "birthDate": "1968-01-01"}, "request": {{} "method": "PUT",  "url": "Patient/ip-MyPrimaryLibrary"} } ]} '


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

    public static API_TestCaseJson_Valid = '{\n \"resourceType\": \"Bundle\",\n \"id\": \"1366\",\n \"meta\": {\n   \"versionId\": \"1\",\n' +
    ' \"lastUpdated\": \"2022-03-30T19:02:32.620+00:00\"\n  },\n  \"type\": \"collection\",\n  \"entry\": [ {\n   \"fullUrl\": \"http://local/Encounter\",\n' +
    ' \"resource\": {\n \"resourceType\": \"Encounter\",\n \"meta\": {\n \"versionId\": \"1\",\n \"lastUpdated\": \"2021-10-13T03:34:10.160+00:00\",\n \"source\":\"#nEcAkGd8PRwPP5fA\"\n},\n' +
    ' \"text\": {\n \"status\": \"generated\",\n \"div\":\"<div xmlns=\\\"http://www.w3.org/1999/xhtml\\\">Sep 9th 2021 for Asthma<a name=\\\"mm\\\"/></div>\"\n},\n' +
    ' \"status\": \"finished\",\n \"class\": {\n \"system\": \"http://terminology.hl7.org/CodeSystem/v3-ActCode\",\n \"code\": \"IMP\",\n \"display\":\"inpatient encounter\"\n},\n' +
    ' \"type\": [ {\n \"text\": \"OutPatient\"\n} ],\n\"subject\": {\n \"reference\": \"Patient/1\"\n},\n \"participant\": [ {\n \"individual\": {\n \"reference\": \"Practitioner/30164\",\n' +
    ' \"display\": \"Dr John Doe\"\n}\n} ],\n \"period\": {\n \"start\": \"2021-01-01T03:34:10.054Z\"\n}\n}\n}, {\n \"fullUrl\": \"http://local/Patient\",\n \"resource\": {\n \"resourceType\":'+
    ' \"Patient\",\n \"text\": {\n \"status\": \"generated\",\n \"div\": \"<div xmlns=\\\"http://www.w3.org/1999/xhtml\\\">Lizzy Health</div>\"\n},\n \"meta\": {\n \"profile\": \"http://hl7.org/fhir/us/qicore/StructureDefinition/qicore-patient\"},\n \"identifier\":' +
    ' [ {\n \"system\": \"http://clinfhir.com/fhir/NamingSystem/identifier\",\n \"value\": \"20181011LizzyHealth\"\n} ],\n \"name\": [ {\n \"use\": \"official\",\n' +
    ' \"text\": \"Lizzy Health\",\n \"family\": \"Health\",\n \"given\": [ \"Lizzy\" ]\n} ],\n \"gender\": \"female\",\n \"birthDate\": \"2000-10-11\"\n}\n} ]\n}'

    public static readonly API_TestCaseJson_InValid = '{\n  \"resourceType\": \"Account\",\n  \"id\": \"508\",\n  \"meta\": {\n    \"versionId\": \"1\",\n    \"lastUpdated\": \"2022-03-01T17:36:04.110+00:00\",\n    \"profile\": [ \"http://hl7.org/fhir/us/core/StructureDefinition/us-core-patient\" ]\n  },\n  \"text\": {\n    \"status\": \"extensions\",\n    \"div\": \"<div xmlns=\\\"http://www.w3.org/1999/xhtml\\\"><p><b>Generated Narrative</b></p></div>\"\n  },\n  \"identifier\": [ {\n    \"use\": \"usual\",\n    \"type\": {\n      \"coding\": [ {\n        \"system\": \"http://terminology.hl7.org/CodeSystem/v2-0203\",\n        \"code\": \"MR\",\n        \"display\": \"Medical Record Number\"\n      } ],\n      \"text\": \"Medical Record Number\"\n    },\n    \"system\": \"http://hospital.smarthealthit.org\",\n    \"value\": \"1032702\"\n  } ],\n  \"name\": [ {\n    \"given\": [ \"Tester\" ]\n  } ],\n  \"gender\": \"female\"\n}'
    
}