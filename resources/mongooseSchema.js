import mongoose from 'mongoose';
import { v4 as uuid } from 'uuid';
const Schema = mongoose.Schema;
function newUUID() {
	return uuid();
} 
//#region Users Schema
const usersSchema = new Schema({
	"guid": {
		"type": "String",
		"get": newUUID
	},
	"email": {
		"type": "String",
		"required": "true"
	},
	"passwordHash": {
		"type": "String",
		"required": "true"
	},
	"devices": {
		"type": "Array",
		"required": "false"
	},
	"emailVerified": {
		"type": "Boolean",
		"default": "false"
	}
});
const User = mongoose.model('User', usersSchema);
//#endregion
//#region Devices Schema
const devicesSchema = new Schema({
	"guid": {
		"type": "String",
		"required": "true"
	},
	"status": {
		"type": "String",
		"required": "true"
	},
	"serial": {
		"type": "String",
		"required": "true"
	},
	"ownerGUID": {
		"type": "String",
		"required": "true"
	}
}, {timestamps: true});
const Device = mongoose.model('Device', devicesSchema);
//#endregion
export { Device, User };
