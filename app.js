'use strict';
let express = require('express');
let path = require('path');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let _ = require('underscore');
let Movie = require('./models/movie.js')


mongoose.connect('mongodb://localhost/imooc');


let port = process.env.PORT || 3000;
let app = express();

app.set('views', './views/pages');
app.set('view engine', 'jade');
app.use(bodyParser.urlencoded());
app.use(express.static(path.join(__dirname, 'bower_components')));
app.listen(port);

console.log('imooc started on port ' + port);

// index page
app.get('/', function(req, res) {

	Movie.fetch(function(err, movies) {
		if (err) {
			console.log(err)
		}

		res.render('index', {
			title: 'imooc 首页',
			movies: movies
		});
	})


});

// list page
app.get('/admin/list', function(req, res) {
	res.render('list', {
		title: 'imooc 列表页',
		movies: [{
			_id: 1,
			title: '奇妙世纪 08 梦的还原器',
			doctor: '程亮/林博',
			country: '大陆',
			year: 2014,
			language: '汉语',
			summary: '《奇妙世纪》是由啼声影视与优酷出品共同打造的中国首部原创都市奇幻单元剧。',
			poster: 'http://r3.ykimg.com/05410408548589706A0A4160AF2742DF',
			flash: 'http://player.youku.com/player.php/sid/XODQ0NDk4MTA0/v.swf'
		}]
	});
});

// detail page
app.get('/movie/:id', function(req, res) {
	var id = req.params.id;

	Movie.findById(id, function(err, movie) {
		res.render('detail', {
			title: 'imooc 详情页',
			movie: movie
		});
	})

});

// admin page
app.get('/admin/movie', function(req, res) {
	res.render('admin', {
		title: 'imooc 后台录入也',
		movie: {
			title: ' ',
			doctor: ' ',
			country: ' ',
			year: ' ',
			language: ' ',
			summary: ' ',
			poster: ' ',
			flash: ' '
		}
	});
});

// admin post movie
app.post('/admin/movie/new', function(res, req) {
	let id = req.body.movie._id;
	let movieObj = req.body.movie;
	let _movie;
	if (id !== 'underfined') {
		Movie.findById(id, function(err, movie) {
			if (err) {
				console.log(err);
			}

			_movie = _.extend(movie, movieObj);
			_movie.save(function(err, movie) {
				if (err) {
					console.log(err);
				}

				res.redirect('/movie/' + movie._id);
			})
		})
	} else {
		_movie = new Movie({
			doctor: movieObj.doctor,
			title: movieObj.title,
			title: movieObj.title,
			title: movieObj.title,
			title: movieObj.title,
			title: movieObj.title,
			title: movieObj.title,
			title: movieObj.title,
		});
	}
});