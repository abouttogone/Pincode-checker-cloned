const express = require('express');
const app = express();
const port = 7500;
const fs = require('fs');
var cors = require('cors')
app.use(cors())

const pincodeData = fs.readFileSync('./data/pincodeData.json', 'utf8');

function Check(pincode) {
	return JSON.parse(pincodeData)?.filter((e) => {
		return e.Pincode === pincode;
	});
}

app.get('/', (req, res) => {
	if (!req?.query?.check) {
		return res.status(200).json({
			status: 'running',
			message: 'Enter the Pincode in check query to check the Pincode',
			example: `${req?.headers?.host}?check=400004`,
		});
	}

	res.status(200).json({
		status: 'success',
		data: Check(req?.query?.check),
	});
});

app.listen(port, () => console.log('> Server is up and running on port : ' + port));
