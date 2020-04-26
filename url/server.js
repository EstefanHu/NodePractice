const express = require('express');
const app = express();
const ShortUrl = require('./models/shorturl');
const mongoose = require('mongoose');

app.use(express.urlencoded({
	extended: false
}));

mongoose.connect('mongodb://localhost/urlShortener', {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
	const shortUrls = await ShortUrl.find()
	res.render('index', {
		shortUrls: shortUrls
	});
});

app.post('/shortUrls', async (req, res) => {
	await ShortUrl.create({
		full: req.body.fullUrl
	});

	res.redirect('/');
});

app.get('/:shorturl', async (req, res) => {
	const shortUrl = await ShortUrl.findOne({
		short: req.params.shorturl
	});

	if (shortUrl === null) return res.sendStatus(404);

	shortUrl.click++;
	shortUrl.save();
	res.redirect(shortUrl.full);
});

app.listen(process.env.PORT || 5000, () => {
	console.log('Server running...')
});