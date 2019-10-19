//Stock Market Portfolio App Class
//Switched to SSH using the Clone or Download button
const express = require('express');
const app = express();
const exphbs  = require('express-handlebars');
const path = require('path');
const request = require ('request');
const PORT = process.env.PORT || 5000;

// API Key pk_538f33696ab0406bbc59b582e59e8609
// create call_api function
function call_api(finishedAPI) {
	request('https://cloud.iexapis.com/stable/stock/fb/quote?token=pk_538f33696ab0406bbc59b582e59e8609', {json:true}, (err, res, body) => {
	if (err){return console.log(err);}
	if (res.statusCode === 200){
	// console.log(body);
	finishedAPI(body);
	};
});	
};

// Set Handlebars Middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

const otherstuff = "hello there, this is other stuff!";

// Set Handlebar routes
app.get('/', function (req, res) {
	call_api(function (doneAPI){
		res.render('home', {
		stock: doneAPI   
    });
	});
});

// Set Handlebar about page route
app.get('/about.html', function (req, res) {
    res.render('about',);
});
// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => console.log('Server Listening on port ' + PORT));
