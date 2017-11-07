# createbrief-api
Test implementation (Node) for the Createbrief.com hidden (undocumented) API

## Example request object

```
{
	title: 'Acme corp', // Required: Title text field
	summary: 'summray', // Optional: Summary text field
	color: '595cec', // Required: Your primary color
	additional_colors: ['443555', '000000', '4ff4ff', 'ffffff'], // Optional: Additional colors in your brand palette
	style: {
		"Playful-Serious": 2, // Slider value, 1-10
		"Modern-Traditional": 3, // Slider value, 1-10
		"Feminine-Masculine": 7, // Slider value, 1-10
		"Colorful-Conservative": 6, // Slider value, 1-10
		"Personable-Professional": 4, // Slider value, 1-10
		"Economical-Luxurious": 5 // Slider value, 1-10
	},
	audience: 'audiencessrs', // Required: Audience text field
	values: 'Valurs', // Required: Values text field
}
```

This gets POST-ed to `http://createbrief.com/processing/create-brief`.

A 301 to a new webpage is returned. You can parse the result to grab the URL & store it.

**[JANKY!]** This is an undocumented API and subject to change at any time. Just uploaded to Github as a reference.
