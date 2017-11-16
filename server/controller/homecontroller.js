var User = require('../models/users');
var Movies = require('../models/movies');
var Series = require('../models/series');
var Seasons = require('../models/seasons');
var Series = require('../models/series');
var Episodes = require('../models/episodes');
var PasswordAlgo = require('../PasswordAlgo/passwordalgo');
var JsonResponse = require('../JsonResponse/jsonResponse');
var Promise = require("bluebird");
var md5 = require('md5');
var nodemailer = require('nodemailer');
var base64Img = require('base64-img');
var jwt = require('jsonwebtoken');
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'lokesh.sirari@kelltontech.com',
        pass: 'dontlookatotherpassword'
    }
});

exports.updateUser = function (req, res) {
    var status = req.params.code;
    console.log(status);
    User.findOne({ status: status }, function (err, user) {
        if (err) {
            JsonResponse.jsonSuccessFalseResponse(err,res);
            //res.json(err);
        }
        else if (user == null) {
            JsonResponse.jsonSuccessFalseResponse(user,res);
            // res.json(
            //     {
            //         success: false
            //     }
            // )
        }
        else {

            user.status = "verified";
            user.role = 2;

            user.save(function (err, response) {
                if (err) {
                    res.json(err);
                }

                JsonResponse.jsonSuccessTrueResponse(response,res);
                // res.json({
                //     success: true,
                //     body: response
                // });
            })
        }
    })

}
exports.getUser = function (req, res) {
    User.find({}, function (err, response) {
        if (err) {
            JsonResponse.jsonSuccessFalseResponse(error,res);
        }

        res.json(response);
    })
}
exports.postLogin = function (req, res) {
    var password = req.body.password;
    var email = req.body.email;
    password = PasswordAlgo.passwordAlgo(password)
    User.findOne({ email: email, password: password }, function (error, response) {
        if (error) {
            //console.log(err)
            JsonResponse.jsonSuccessFalseResponse(error,res);
            //res.json(error);
        }
        else if (response != null) {
            var token = jwt.sign({ email: response.email }, 'secretId');
            var data={
                token:token,
                role:response.role
            };
           JsonResponse.jsonSuccessTrueResponse(data,res);
       
        }
        else {
          
            JsonResponse.jsonSuccessFalseResponse(response,res);
        }

    });


}

exports.postUser = function (req, res) {
    var user = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password: req.body.password,
        role: req.body.role,
        email: req.body.email,
        status: req.body.status
    });
    if (user.status != "verified") {
        user.status = md5(user.email);
    }
    user.password = PasswordAlgo.passwordAlgo(user.password)

    user.save(function (err, response) {
        if (err) {
            //console.log(err)
            // res.json({
            //     success: false,
            //     error: err
            // });
            JsonResponse.jsonSuccessFalseResponse(err,res);
        }
        else {
            //put this in else if you dont want to send email to admin
            //although admin does not need to verify its email
            var mailOptions = {
                from: 'lokesh.sirari@gmail.com',
                to: user.email,
                subject: 'Verify your email',
                text: 'Click on following link http://localhost:4200/verify/' + user.status
            };
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                }
                else {
                    console.log('Email sent: ' + info.response);
                }
            });
            console.log(response);
            // res.json({
            //     success: true,
            //     body: response
            // })
            JsonResponse.jsonSuccessTrueResponse(response,res);
        }
    })
}
exports.postMovies = function (req, res) {
    var movies = new Movies({
        name: req.body.name,
        catagery: req.body.catagery,
        image: req.body.path


    });
    // movies.image = base64Img.base64Sync(movies.image);
    movies.save(function (error, response) {
        if (error) {
            // res.json({
            //     "success": false,
            //     "error": error
            // })
            JsonResponse.jsonSuccessFalseResponse(error,res);
        }
        else {
            // res.json({
            //     "success": true,
            //     "body": response
            // })
            JsonResponse.jsonSuccessTrueResponse(response,res);
        }
    });
}
exports.getMovies = function (req, res) {
    Movies.find({}, function (err, response) {
        if (err) {
            JsonResponse.jsonSuccessFalseResponse(error,res);
        }

        // if(response.length!=0){
        //     console.log(typeof(response));  

        // response.image = base64Img.imgSync('data:image/jpg;base64,...', '', response.name)
        // console.log(response.image);
        // }
        res.json(response);
    })
}
exports.updateMovies = function (req, res) {
    var name = req.params.name;
    Movies.findOne({ name: name }, function (err, movies) {
        if (err) {
            res.json(err);
        }
        if (movies != null) {
            name = req.body.newName;
            movies.name = name;

            movies.save(function (err, response) {
                if (err) {
                   // res.json(err);
                   JsonResponse.jsonSuccessFalseResponse(err,res);
                }

                //res.json(response);
                JsonResponse.jsonSuccessTrueResponse(response,res);
            });
        }
        else {
            JsonResponse.jsonSuccessFalseResponse(movies);
        }
    })
}
exports.deleteMovies = function (req, res) {
    var name = req.params.name;
    Movies.findOne({ name: name }, function (err, movies) {
        if (err) {
            JsonResponse.jsonSuccessFalseResponse(err,res);
        }

        if (movies) {
            Movies.remove({ name: name }, function (err) {
                if (err) {
                    JsonResponse.jsonSuccessFalseResponse(err,res);
                }
                JsonResponse.jsonSuccessTrueResponse(movies,res);
            })
        } else {
            JsonResponse.jsonSuccessFalseResponse(movies,res);
        }

    })
}
exports.searchMovies = function (req, res) {
    var name = req.params.name;
    Movies.find({ name: name }, function (err, movies) {
        if (err) {
            //res.json(err);
            JsonResponse.jsonSuccessFalseResponse(err,res);
        }
        if (movies) {
            res.json(movies);
        }
        else {
            res.json("Movies Doesnot exist");
        }
    })
}
exports.searchMoviesByCatagery = function (req, res) {
    var catagery = req.params.catagery;
    Movies.find({ catagery: catagery }, function (err, movies) {
        if (err) {
            res.json(err);
        }
        if (movies) {
            res.json(movies);
        }
        else {
            res.json("Moivies or Catagery Doesnot exist");
        }
    })
}
exports.newSeriesAdd = function (req, res) {
    var series = new Series({
        series_id: req.body.series_id,
        series_name: req.body.series_name,
        series_catagery: req.body.series_catagery
    });
    series.save(function (error, response) {
        if (error) {
            JsonResponse.jsonSuccessFalseResponse(error,res);

        }
        else {

            var seasons = new Seasons({
                season_name: req.body.season_name,
                series_id: req.body.series_id
            });
            seasons.save(function (error1, response1) {
                if (error1) {
                    JsonResponse.jsonSuccessFalseResponse(error1,res);

                }
                else {
                    var episodes = new Episodes({
                        episode_name: req.body.episode_name,
                        episode: req.body.episode,
                        season_name: req.body.season_name,
                        series_id: req.body.series_id,
                        episode_name: req.body.episode_name
                    });
                    episodes.save(function (error2, response2) {
                        if (error2) {
                            JsonResponse.jsonSuccessFalseResponse(error2,res);

                        }
                        else {
                            JsonResponse.jsonSuccessTrueResponse(response1,res);
                        }
                    });
                }
            });
        }
    });
}


exports.seasonAdd = function (req, res) {
    var seasons = new Seasons({
        season_name: req.body.season_name,
        series_id: req.body.series_id,
    });
    Season.findOne({ season_name: seasons.season_name, series_id: seasons.series_id }, function (err, response) {
        if (err) {
            JsonResponse.jsonSuccessFalseResponse(err,res);
        }
        else if (response == null) {
            season.save(function (error, response1) {
                if (error) {
                    JsonResponse.jsonSuccessFalseResponse(error,res);

                }
                else {
                    JsonResponse.jsonSuccessTrueResponse(response1,res);
                }
            });

        }
        else {
            JsonResponse.jsonSuccessFalseResponse("season already exists",res)
        }

    });


}
exports.episodesAdd = function (req, res) {
    var episodes = new Episodes({
        episode: req.body.episode,
        season_name: req.body.season_name,
        series_id: req.body.series_id,
        episode_name: req.body.episode_name
    });
    Episodes.findOne({ season_name: episodes.season_name, series_id: episodes.series_id, episode_name: episodes.episode_name }, function (err, response) {
        if (err) {
            JsonResponse.jsonSuccessFalseResponse(err,res);
        }
        else if (response == null) {
            episodes.save(function (error, response1) {
                if (error) {
                    JsonResponse.jsonSuccessFalseResponse(error,res);

                }
                else {
                    JsonResponse.jsonSuccessTrueResponse(response1,res);
                }
            });

        }
        else {
            JsonResponse.jsonSuccessFalseResponse("Episode Already Exist",res);
        }

    });


}
exports.getSeries = function (req, res) {
    Series.find({}, function (err, response) {
        if (err) {
            JsonResponse.jsonSuccessFalseResponse(err,res);
        }
        res.json(response);
    })
}
exports.getSeason = function (req, res) {
    var series_id = req.params.season;
    Seasons.find({series_id:series_id}, function (err, response) {
        if (err) {
            JsonResponse.jsonSuccessFalseResponse(err,res);
        }
        res.json(response);
    })
}
exports.getEpisode = function (req, res) {
    var series_id = req.body.series_id;
    var season_name = req.params.season_name;
    Episodes.find({series_id:series_id,season_name:season_name}, function (err, response) {
        if (err) {
            JsonResponse.jsonSuccessFalseResponse(err,res);
        }
        res.json(response);
    })
}

