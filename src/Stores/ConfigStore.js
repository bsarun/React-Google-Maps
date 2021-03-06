import { EventEmitter } from 'events';
var config = require('../../app.development.config.json');

var ConfigStore = Object.assign({}, EventEmitter.prototype, {
	
	/*Get the param from app.development.config.json */
	get: (param) => {
		return typeof config[param] !== 'undefined' ? config[param] : null;
	}	
});

export default ConfigStore;
