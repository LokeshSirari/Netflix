var express = require('express');
var router = express.Router();

var homeController = require('../controller/homecontroller');


router.route('/user')
 .get(homeController.getUser)
 .post(homeController.postUser);
 router.route('/movies')
 .get(homeController.getMovies)
 .post(homeController.postMovies);

//  router.route('/attendance')
//  .post(homeController.postAttendance);
//  router.route('/attendance/:empId')
//  .get(homeController.getAttendance);
 router.route('/login')
 .post(homeController.postLogin);
 router.route('/verify/:code')
 .get(homeController.updateUser);
 
 router.route('/movies/update/:name')
 .put(homeController.updateMovies)
 .delete(homeController.deleteMovies)
 .get(homeController.searchMovies);

 router.route('/movies/catagery/:catagery')
 .get(homeController.searchMoviesByCatagery);

router.route('/series')
.get(homeController.getSeries)
.post(homeController.newSeriesAdd)

router.route('/series/season/:season')
.get(homeController.getSeason)

router.route('/series/season/episode/:episode')
.get(homeController.getEpisode)


module.exports = router;