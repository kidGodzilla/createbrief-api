const request = require('request');

let url = 'http://createbrief.com/processing/create-brief';

let data = {
	"ic-request": true,
	title: 'Acme corp',
	summary: 'summray',
	color: '595cec',
	additional_colors: ['443555', '000000', '4ff4ff', 'ffffff'],
	selectedSwatchIndex: 4,
	style: {
		"Playful-Serious": 2,
		"Modern-Traditional": 3,
		"Feminine-Masculine": 7,
		"Colorful-Conservative": 6,
		"Personable-Professional": 4,
		"Economical-Luxurious": 5
	},
	audience: 'audiencessrs',
	values: 'Valurs',
	"ic-id": 1,
	"ic-target-id": 'overview-slide',
	"ic-current-url": '/',
	_method: 'POST'
};

request.post({url: url, form: data}, function (err, httpResponse, body) { 

	if (err) console.log('Error:', err);
	
	// if (body) console.log('Body:', body); // Uncomment for demonstration of response

	// Demonstration purposes only:
	// window.location = 'http://www.createbrief.com/brief/acme-corp?id=19052';

	try {
		let returnUrl = body.split('window.location = \'')[1].split("'")[0];

		console.log("Redirect URL is: ", returnUrl);

	}catch(e){}

});
