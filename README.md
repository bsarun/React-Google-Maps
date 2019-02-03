# CalHEERs Web Front End

## Setup
* [Install Node.js & npm](https://nodejs.org/)
* Install Webpack `$ npm install webpack -g`
* From Project Directory
	* Run `$ npm install`
	* `$ git submodule init`
	* `$ git submodule update`

## Local Dev Environment
	* Run `$ npm start`
	* Navigate to http://localhost:8080

## Production build
	* Run `$ npm run build`
	* Project is built to './build' folder

## QA build
	* Run `$ npm run build-qa`
	* Project is built to './build' folder

## Updating the assets submodule
	* `$ cd src/assets`
	* `$ git fetch`
	* `$ git merge`