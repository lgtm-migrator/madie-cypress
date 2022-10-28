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


    public static readonly TestCaseJson_CohortPatientBoolean_PASS ='{ "resourceType": "Bundle", "id": "ip-pass-CohortEncounterEpisodeQICore4", ' +
        '"meta": { "versionId": "3", "lastUpdated": "2022-09-14T12:38:39.889+00:00" }, "type": "collection", "entry": [ { "fullUrl": ' +
        '"609bde3598086b0a16d79fc6", "resource": { "resourceType": "Patient", "id": "609bde3598086b0a16d79fc6", "meta": { "profile": ' +
        '[ "http://hl7.org/fhir/us/qicore/StructureDefinition/qicore-patient" ] }, "text": { "status": "generated", "div": "<div ' +
        'xmlns=\\"http://www.w3.org/1999/xhtml\\"><div class=\\"hapiHeaderText\\">LocationPeriodStartTimeMissing <b>MSRPOPLEXSTRAT2PASS ' +
        '</b></div><table class=\\"hapiPropertyTable\\"><tbody><tr><td>Identifier</td><td>8065dc8d26797064d8766be71f2bf020</td></tr><tr><td>' +
        'Date of birth</td><td><span>10 February 1954</span></td></tr></tbody></table></div>" }, "identifier": [ { "type": { "coding": [ ' +
        '{ "system": "http://terminology.hl7.org/CodeSystem/v2-0203", "code": "MR" } ] }, "system": "http://myhealthcare.com/MRN", "value": ' +
        '"8065dc8d26797064d8766be71f2bf020" } ], "active": true, "name": [ { "use": "usual", "family": "IPFail", "given": [ "No Qualifying ' +
        'Inpatient Encounter" ] } ], "gender": "male", "birthDate": "1954-02-10" } }, { "fullUrl": "5c6c61ceb84846536a9a98f9", "resource": { ' +
        '"resourceType": "Encounter", "id": "5c6c61ceb84846536a9a98f9", "status": "finished", "class" : { "system" : ' +
        '"http://terminology.hl7.org/CodeSystem/v3-ActCode", "code" : "IMP", "display" : "inpatient encounter" }, "type": [ { "coding": ' +
        '[ { "system": "http://snomed.info/sct", "code": "8715000", "display": "Hospital admission, elective (procedure)" } ] } ], "subject": ' +
        '{ "reference": "Patient/609bde3598086b0a16d79fc6" }, "period": { "start": "2012-02-15T08:00:00+00:00", "end": "2012-03-30T09:00:00+00:00" }, ' +
        '"length": { "value": 0.0, "unit": "days" } } } ] }'

    public static readonly CohortEpisodeEncounter_PASS ='{ "resourceType": "Bundle", "id": "ip-pass-InpatientEncounter", ' +
        '"meta": { "versionId": "3", "lastUpdated": "2022-09-14T12:38:39.889+00:00" }, "type": "collection", "entry": [ ' +
        '{ "fullUrl": "609bde3598086b0a16d79fc6", "resource": { "resourceType": "Patient", "id": "609bde3598086b0a' +
        '16d79fc6", "meta": { "profile": [ "http://hl7.org/fhir/us/qicore/StructureDefinition/qicore-patient" ] }, "tex' +
        't": { "status": "generated", "div": "<div xmlns=\\"http://www.w3.org/1999/xhtml\\"><div class=\\"hapiHeaderTex' +
        't\\">LocationPeriodStartTimeMissing <b>MSRPOPLEXSTRAT2PASS </b></div><table class=\\"hapiPropertyTable\\"><tbod' +
        'y><tr><td>Identifier</td><td>8065dc8d26797064d8766be71f2bf020</td></tr><tr><td>Date of birth</td><td><span>10 Fe' +
        'bruary 1954</span></td></tr></tbody></table></div>" }, "identifier": [ { "type": { "coding": [ { "system": "ht' +
        'tp://terminology.hl7.org/CodeSystem/v2-0203", "code": "MR" } ] }, "system": "http://myGoodHealthcare.com/MRN", ' +
        '"value": "8065dc8d26797064d8766be71f2bf020" } ], "active": true, "name": [ { "use": "usual", "family": "IPPass", ' +
        '"given": [ "Inpatient Encounter" ] } ], "gender": "male", "birthDate": "1954-02-10" } }, { "fullUrl": "5c6c61ceb' +
        '84846536a9a98f9", "resource": { "resourceType": "Encounter", "id": "5c6c61ceb84846536a9a98f9", "status": "finis' +
        'hed", "class" : { "system" : "http://terminology.hl7.org/CodeSystem/v3-ActCode", "code" : "IMP", "display" : "i' +
        'npatient encounter" }, "type": [ { "coding": [ { "system": "http://snomed.info/sct", "code": "183452005", "disp' +
        'lay": "Emergency hospital admission (procedure)" } ] } ], "subject": { "reference": "Patient/609bde3598086b0a16' +
        'd79fc6" }, "priority": [ { "coding": [ { "system": "http://snomed.info/sct", "code": "103391001", "display": "Ur' +
        'gency" } ] } ], "period": { "start": "2012-07-15T08:00:00+00:00", "end": "2012-07-16T09:00:00+00:00" }, "length"' +
        ': { "value": 1.0, "unit": "days" }, "location" : [ { "location" : { "reference" : "Location/4989ju789fn93bvy562l' +
        'oe87c", "display" : "Holy Family Hospital Inpatient" }, "period": { "start": "2012-07-15T08:00:00+00:00", "end' +
        '": "2012-07-16T09:00:00+00:00" } } ] } }, { "fullUrl": "9dju7njdn764mdjy6dm92nje", "resource": { "resourceType"' +
        ': "Encounter", "id": "9dju7njdn764mdjy6dm92nje", "status": "finished", "class" : { "system" : "http://terminolo' +
        'gy.hl7.org/CodeSystem/v3-ActCode", "code" : "EMRGONLY", "display" : "Emergency only" }, "type": [ { "coding": [ ' +
        '{ "system": "http://snomed.info/sct", "code": "4525004", "display": "Emergency department patient visit (procedu' +
        're)" } ] } ], "subject": { "reference": "Patient/609bde3598086b0a16d79fc6" }, "period": { "start": "2012-07-14T2' +
        '3:00:00+00:00", "end": "2012-07-15T07:30:00+00:00" }, "length": { "value": 1.0, "unit": "days" }, "location" : ' +
        '[ { "location" : { "reference" : "Location/489juh6757h87j03jhy73mv7", "display" : "Holy Family Hospital Inpatie' +
        'nt" }, "period": { "start": "2012-07-14T23:00:00+00:00", "end": "2012-07-15T07:30:00+00:00" } } ] } }, { "fullU' +
        'rl": "489juh6757h87j03jhy73mv7", "resource": { "resourceType" : "Location", "id" : "489juh6757h87j03jhy73mv7", ' +
        '"meta" : { "profile" : [ "http://hl7.org/fhir/us/qicore/StructureDefinition/qicore-location" ] }, "identifier" :' +
        ' [ { "use" : "official", "system" : "http://holycrosshospital.com/location", "value" : "489juh6757h87j03jhy73mv7' +
        '" } ], "status" : "active", "name" : "South Wing, second floor" } }, { "fullUrl": "4989ju789fn93bvy562loe87c", "' +
        'resource": { "resourceType" : "Location", "id" : "4989ju789fn93bvy562loe87c", "meta" : { "profile" : [ "http://h' +
        'l7.org/fhir/us/qicore/StructureDefinition/qicore-location" ] }, "identifier" : [ { "use" : "official", "system" ' +
        ': "http://holycrosshospital.com/location", "value" : "4989ju789fn93bvy562loe87c" } ], "status" : "active", "name" ' +
        ': "North Wing, second floor" } }  ] }'

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