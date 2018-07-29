const express = require('express');
const bodyParser = require('body-parser');

const port = 3000;

const licenceAPI = new express();
const licenceRouter = express.Router();

licenceAPI.use(bodyParser.urlencoded({ extended: false }));
licenceAPI.use(bodyParser.json());
 
licenceRouter.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', "*");
	res.header('Access-Control-Allow-Headers', "X-Requested-With");
	res.header('Content-Type', 'text/json');

	if(req.headers.key !== 'secret') {
		res.sendStatus(401);
	} else {
	  	next();
	}
});

licenceRouter.route('/genLicenceKey').get(function(req, res) {
	if(req.headers.fullname === 'full-name' && req.headers.package === 'package') {
		res.send(JSON.stringify({"licence":'Generate Licence Key'}));	
	} else {
		res.sendStatus(404);
	}
});

licenceRouter.route('/validateLicenceKey').get(function(req, res) {
	if(req.headers.licence === 'licence' && req.headers.fullname === 'full-name') {
		res.sendStatus(204);
	} else {
		res.sendStatus(404);
	}
});

licenceAPI.use('/api', licenceRouter);

licenceAPI.listen(port, () => {
	console.log('Licence server live on port ' + port);
});