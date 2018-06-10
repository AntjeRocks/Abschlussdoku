# social-imageprocessing

This is otto.de's imageprocessing module.

## Setup

Install dependencies:

    $ yarn install --ignore-engines

## Start Imageprocessing
  
Install sam:

      $ yarn global add aws-sam-local

Install dependencies:
      
      $ yarn install

Run local sam:

      $ sam local start-api --template sam.yaml -p 9595

## Testing
  
    $ npm test

This also:

* runs eslint
* creates coverage reports for server and public

## Dependency Update

Use yarn's interactive update.

    $ yarn upgrade-interactive

# Runbook

Der Check prüft, ob eine Social WebApp im Marathon Kontext läuft.

## Incident-Priorität

Otto-P3
