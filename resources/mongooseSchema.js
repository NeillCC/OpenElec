import mongoose from 'mongoose';
const Schema = mongoose.Schema;
//#region Users Schema
const usersSchema = new Schema({
	"guid": {
		"type": "String",
		"required": "true"
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
		"required": "true"
	},
	"emailVerified": {
		"type": "Boolean",
		"required": "false"
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
