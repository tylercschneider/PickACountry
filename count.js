let countryColors = {
	"United States of America" : ["red","white","blue"],
	"Spain": ["red", "gold", "red"],
	"Germany": ["black", "gold", "red"],
	"Russia": ["white", "blue", "red"]
};

class Country {
	constructor(country) {
		this.country = country;
		this.language;
		this.colors;
		this.flag;
		this.translate;
	}
	gatherFacts() {
		let cArray = countryAPI(this.country)
		console.log(cArray);
		this.flag = cArray[0];
		this.language = cArray[1];
		this.translate;
		this.colors = getColors(this.country);
	}
	domAdd() {
		// DOM Targeting
		let countryName = document.getElementById('CountryName');
		let oLang = document.getElementById('OfficialLanguage');
		let hWorld = document.getElementById('HelloWorld');
		let flagTarget = document.getElementById('flag');

		// DOM Changes
		countryName.textContent = this.country;
		oLang.textContent = this.language;
		hWorld.textContent = this.translate;
		flagTarget.setAttribute('src', this.flag);

		// Color Targets and Style Changes
		let color1 = document.getElementById('Color1');
		let color2 = document.getElementById('Color2');
		let color3 = document.getElementById('Color3');
		color1.style.backgroundColor = this.colors[0];
		color2.style.backgroundColor = this.colors[1];
		color3.style.backgroundColor = this.colors[2];
	}
}

class Planet {
	constructor(){
		this.countries = [];
	}
	addCountry(country){
		let c = new Country(country);
		this.countries.push(c);
		c.gatherFacts();
		c.domAdd();
	}
}

// Makes call to restcountries.eu API
function countryAPI(countryName) {
	let url = `https://restcountries.eu/rest/v2/name/${countryName}`;
	return $.get(url).done((data) => {doneResponse(data)}).fail(failResponse());
}

// Response if restcountries.eu API call works
function doneResponse(data) {
	let flag = data[0].flag;
	console.log(flag);
	let language = data[0].languages[0]
	return [flag, language];
}

// Response if restcountries.eu API fails
function failResponse(){
	let flag = "https://en.wikipedia.org/wiki/Flag_of_the_United_States";
	let language = "English";
	return [flag, language];
}

// Gather country colors from colors object
function getColors(country) {
	if(country in countryColors){
		return countryColors[country];
	}
	else {
		return ["red", "white", "blue"];
	}
	// Ideally gather colors in real time with an API call
	// let url = `https://en.wikipedia.org/w/api.php?action=query&titles=National%20colours&prop=revisions&rvprop=content&format=json&formatversion=2`;
	// $.get(url).done((data) => {}).fail();
}

// EVENT LISTENER on Country choice to load up
let submit = document.getElementById('submit');
submit.addEventListener('click', () => {
	$('#ask').hide();
	$('#bigContain').show();
	let field = document.getElementById('country');
	let choice = field.value;
	earth.addCountry(choice);
	field.value = '';
});

// EVENT LISTENER on button to Change Country displayed
let change = document.getElementById('change');
change.addEventListener('click', ()=>{
	$('#ask').show();
	$('#bigContain').hide();
	let color1 = document.getElementById('Color1');
	color1.style.backgroundColor = "white";
});

$('#bigContain').hide();
let earth = new Planet();