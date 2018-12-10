const express = require('express');
const router = express.Router();

var mysql = require("mysql")
var con = mysql.createConnection({
    host: "iot.abbindustrigymnasium.se",
    user: "ljuside5",
    password:"skyddslinglåda",
    database: "ljuside5"
});

con.connect(function (err){
    if (err) throw err;
});

var Values_fromDB;
var cron = require('node-cron');
 
cron.schedule('* * * * * *', () => {
    var Getlight = function(){
        return new Promise(function(resolve,reject){

            con.query('SELECT * FROM `appbelysning`', function (err, results) {
                if (err) 
                return reject (err);
                else 
                return resolve(results)
            });
        } )
    }
    Getlight().then(response => {
      Values_fromDB = response;
    })
});

/*router.get('', (req,res) => {
    console.log("Hej");
    res.status(200).json({message:"Hi"});
});*/

router.post('/', (req, res, next) => {
    
    const ljuside= {
         påav: req.body.påav,
         varm: req.body.varm,
         kall: req.body.kall,
         ljusstryrka: req.body.ljusstyrka
        };
    
        var Createdlamp = function(){
            return new Promise(function(resolve,reject){
    
                var lamp = [ljuside.påav, ljuside.varm, ljuside.kall, ljuside.ljusstyrka];
                console.log(lamp);
                con.query('INSERT INTO appbelysing (påav, varm, kall, ljusstryrka) VALUES ?',[[lamp]], function (err, results) {
                    console.log(results);
                    if (err) 
                    return reject (err);
                    else 
                    return resolve(lamp)
    
                    
                  });
            })
    
    
        }
    
    Createdlamp().then( ljuside => {
    
        res.status(201).json({
            message:"Success!",
            lamp: ljuside
        })
    } ).catch(error => {
        res.status(500).json({
            error: error
        })
    
    
    });
    })

router.get('/', (req, res, next) => {

    
    con.query('SELECT * FROM `switch`', function (err, results, fields) {
        if (err) throw err;
        res.status(200).json({
            message: 'Handling GET requests to /termometer_zarah',
            result: results});
        console.log('The solution is: ', results[0].temperature);
      });
});

router.patch('/:light', (req, res, next) => {

    const light = {
        name: req.body.name,
        strength: req.body.strength,
        hard: req.body.hard
    }

    var updatelight = function(){
        return new Promise(function(resolve,reject){

            con.query('UPDATE `switch` SET `strength`=?, `hard`=? WHERE name = ?',[light.strength, light.hard, light.name], function (err, results) {
                if (err) 
                return reject (err);
                else 
                return resolve(results)
            });
        } )
    }

updatelight().then( results => {

    if (results.affectedRows>=0) {
        res.status(200).json(results);
    } 
    else
    res.status(404).json({
        message: "Lack of lamps"
    });

} ).catch(error => {
    res.status(500).json({
        error: error
    })
});

});


module.exports = router;