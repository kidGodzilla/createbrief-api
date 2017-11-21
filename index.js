const bodyParser = require('body-parser');
const request = require('request');
let app = require('express')();

app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json

app.use(function (req, res, next) { // Options middleware
    if (req.method === 'OPTIONS') {
        var headers = {};
        headers["Access-Control-Allow-Origin"] = "*";
        headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS";
        headers["Access-Control-Allow-Credentials"] = true;
        headers["Access-Control-Max-Age"] = '86400'; // 24 hours
        headers["Access-Control-Allow-Headers"] = "Accept,Authorization,Cache-Control,Content-Type,DNT,If-Modified-Since,Keep-Alive,Origin,User-Agent,X-Requested-With,X-HTTP-Method-Override";
        res.writeHead(204, headers);
        res.end();
    } else {
        next();
    }
});

app.use(require('cors')()); // Rest of CORS

const url = 'http://createbrief.com/processing/create-brief';

app.post('/', function (req, res) {
  
	let data = req.body;

	// console.log(data);

	// Early return if something is missing
	if (!data.title || !data.color || !data.audience || !data.values) return;

	// let data = {
	// 	title: 'Acme corp', // Required: Title text field
	// 	summary: 'summray', // Optional: Summary text field
	// 	color: '595cec', // Required: Your primary color
	// 	additional_colors: ['443555', '000000', '4ff4ff', 'ffffff'], // Optional: Additional colors in your brand palette
	// 	style: {
	// 		"Playful-Serious": 2, // Slider value, 1-10
	// 		"Modern-Traditional": 3, // Slider value, 1-10
	// 		"Feminine-Masculine": 7, // Slider value, 1-10
	// 		"Colorful-Conservative": 6, // Slider value, 1-10
	// 		"Personable-Professional": 4, // Slider value, 1-10
	// 		"Economical-Luxurious": 5 // Slider value, 1-10
	// 	},
	// 	audience: 'audiencessrs', // Required: Audience text field
	// 	values: 'Valurs', // Required: Values text field
	// };

	if (data['additional_colors'] && data['additional_colors'].length)
		data.selectedSwatchIndex = data['additional_colors'].length;
	else
		data.selectedSwatchIndex = 0;

	data["ic-request"] = true;
	data["ic-id"] = 1;
	data["ic-target-id"] = 'overview-slide';
	data["ic-current-url"] = '/';
	data['_method'] = 'POST';

	request.post({url: url, form: data}, function (err, httpResponse, body) { 

		if (err) {
			console.log('Error:', err);
			res.status(500).send({error: err})
		}

		// if (body) console.log('Body:', body); // Uncomment for demonstration of response

		// Demonstration purposes only:
		// window.location = 'http://www.createbrief.com/brief/acme-corp?id=19052';

		try {
			let returnUrl = body.split('window.location = \'')[1].split("'")[0];
			console.log("Redirect URL is: ", returnUrl);

			res.send({brief: returnUrl});

		}catch(e){
			res.status(500).send('Something broke!')
		}

	});
});


/**
 * Start Server
 */
app.listen(3000, function () {
    console.log('App listening on port 3000!')
});
