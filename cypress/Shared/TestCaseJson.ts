export class TestCaseJson {

    public static readonly TestCaseJson_Valid = '{{} "resourceType": "Patient", "meta": {{} "profile": [ "http://hl7.org/fhir/us/core/' +
        'StructureDefinition/us-core-patient" ] }, "text": {{} "status": "extensions", "div": ' +
        '"<div xmlns=\\"http://www.w3.org/1999/xhtml\\"><p><b>Generated Narrative</b></p></div>" }, "identifier": [ {{} ' +
        '"use": "usual", "type": {{} "coding": [ {{} "system": "http://terminology.hl7.org/CodeSystem/v2-0203", ' +
        '"code": "MR", "display": "Medical Record Number" } ], "text": "Medical Record Number" }, "system": ' +
        '"http://hospital.smarthealthit.org", "value": "1032702" } ], "name": [ {{} "given": "Tester" } ], "gender": ' +
        '"female" }'

    public static readonly TestCaseJson_Invalid = '{{} "resourceType": "Account", "meta": {{} "profile": [ "http://hl7.org/fhir/us/core/' +
        'StructureDefinition/us-core-patient" ] }, "text": {{} "status": "extensions", "div": ' +
        '"<div xmlns=\\"http://www.w3.org/1999/xhtml\\"><p><b>Generated Narrative</b></p></div>" }, "identifier": [ {{} ' +
        '"use": "usual", "type": {{} "coding": [ {{} "system": "http://terminology.hl7.org/CodeSystem/v2-0203", ' +
        '"code": "MR", "display": "Medical Record Number" } ], "text": "Medical Record Number" }, "system": ' +
        '"http://hospital.smarthealthit.org", "value": "1032702" } ], "name": [ {{} "given": "Tester" } ], "gender": ' +
        '"female" }'

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

}