var User = require('../models/users');
var Movies = require('../models/movies');
var Promise = require("bluebird");
var md5 = require('md5');
var nodemailer = require('nodemailer');
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
            res.json(err);
        }
        else if(user==null){
            res.json(
                {
                    success:false
                }
            )
        }
        else{

        user.status = "verified";
        user.role=2;

        user.save(function (err, response) {
            if (err) {
                res.json(err);
            }

            res.json({
                success:true,
                body:response
            });
        })
    }
    })
    
}
exports.getUser = function (req, res) {
    User.find({}, function (err, response) {
        if (err) {
            return res.json(req, res, err);
        }

        res.json(response);
    })
}
exports.postLogin = function (req, res) {
    var password = req.body.password;
    var email = req.body.email;
    console.log(email+password);
    password = md5(password);
    User.findOne({ email:email, password: password }, function (error, response) {
        if (error) {
            //console.log(err)
            res.json(error);
        }
        else if (response != null) {
            res.json({
                success: true,
                role: response.role,
            })
        }
        else {
            res.json({
                success: false
            })
        }

    });


}

exports.postUser = function (req, res) {
    var user = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password: req.body.password,
        role: req.body.role,
        email:req.body.email,
        status:req.body.status
    });
    if(user.status!="verified"){
    user.status=md5(user.email);
    }
    user.password = md5(user.password);

    user.save(function (err, response) {
        if (err) {
            //console.log(err)
            res.json({
                success:false,
                error:err
            });
        }
        else {
            //put this in else if you dont want to send email to admin
            //although admin does not need to verify its email
            var mailOptions = {
                from: 'lokesh.sirari@gmail.com',
                to: user.email,
                subject: 'Verify your email',
                text: 'Click on following link http://localhost:4200/verify/'+user.status
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
            res.json({
                success: true,
                body: response
            })
        }
    })
}
exports.postMovies = function(req,res){
    var movies = new Movies({
        name: req.body.name,
        catagery: req.body.catagery,
        image:req.body.path
        
    });
    
    movies.save(function (error, response) {
        if (error) {
            res.json({
                "success": false,
                "error": error
            })

        }
        else {
            res.json({
                "success": true,
                "body": response
            })
        }
    });
}
exports.getMovies = function (req, res) {
    Movies.find({}, function (err, response) {
        if (err) {
            return res.json(req, res, err);
        }

        res.json(response);
    })
}
exports.updateMovies = function (req, res) {
    var name = req.params.name;
    Movies.findOne({ name: name }, function (err, movies) {
        if (err) {
            res.json(err);
        }

        name = req.body.newName;
        movies.name = name;

        name.save(function (err, response) {
            if (err) {
                res.json(err);
            }

            res.json(response);
        })
    })
}
exports.deleteMovies = function (req, res) {
    var name = req.params.name;
    Movies.findOne({ name: name }, function (err, moives) {
        if (err) {
            res.json(err);
        }

        if (movies) {
            Movies.remove({ name: name }, function (err) {
                if (err) {
                    res.json(err);
                }

                res.json("success");
            })
        } else {
            res.json("Movie doesnt exist");
        }

    })
}
exports.searchMovies = function (req, res) {
    var name = req.params.name;
    Movies.findOne({ name: name }, function (err, movies) {
        if (err) {
            res.json(err);
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
