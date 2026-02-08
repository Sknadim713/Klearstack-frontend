# Klearstack

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.0.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
"# Klearstack-frontend" 
"# Klearstack-backend" 



JSON BODY PAN 
{
  "idcode": "P11",
  "name": "PanCard",
  "fields": [
    {
      "label": "PAN Number",
      "key": "panNumber",
      "type": "text",
      "required": true,
      "placeholder": "Enter PAN Number (ABCDE1234F)",
      "minLength": 10,
      "maxLength": 10,
      "pattern": "^[A-Z]{5}[0-9]{4}[A-Z]{1}$"
    },
    {
      "label": "Full Name (As per PAN)",
      "key": "fullName",
      "type": "text",
      "required": true,
      "placeholder": "Enter Full Name"
    },
    {
      "label": "Date of Birth",
      "key": "dob",
      "type": "date",
      "required": true
    },
    {
      "label": "Upload PAN Card",
      "key": "panFile",
      "type": "file",
      "required": true
    },
    {
      "label": "Accept Terms",
      "key": "terms",
      "type": "checkbox",
      "required": true,
      "options": [
        { "label": "I Agree", "value": "yes" }
      ]
    }
  ],
  "buttons": {
    "submit": true,
    "reset": true,
    "next": false,
    "cancel": true
  },
  "isActive": true
}


========================================
JSON BODY VOTER

{
  "idcode": "V11",
  "name": "VoterId",
  "fields": [
    {
      "label": "Voter ID Number",
      "key": "voterNumber",
      "type": "text",
      "required": true,
      "placeholder": "Enter Voter ID",
      "minLength": 8,
      "maxLength": 15
    },
    {
      "label": "Date of Birth",
      "key": "dob",
      "type": "date",
      "required": true
    },
    {
      "label": "Gender",
      "key": "gender",
      "type": "radio",
      "required": true,
      "options": [
        { "label": "Male", "value": "male" },
        { "label": "Female", "value": "female" },
        { "label": "Other", "value": "other" }
      ]
    },
    {
      "label": "Upload Voter Card",
      "key": "voterFile",
      "type": "file",
      "required": true
    },
    {
      "label": "Accept Terms",
      "key": "terms",
      "type": "checkbox",
      "required": true,
      "options": [
        { "label": "I Agree", "value": "yes" }
      ]
    }
  ],
  "buttons": {
    "submit": true,
    "reset": true,
    "next": false,
    "cancel": true
  },
  "isActive": true
}
==================
API PATH
http://localhost:5000/idverification/create
http://localhost:5000/idverification/getidlist
http://localhost:5000/idverification/getbyidcode/P11
