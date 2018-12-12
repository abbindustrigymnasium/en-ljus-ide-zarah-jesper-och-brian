const express = require('express');
const router = express();
var mysql = require("mysql");
var con = mysql.createConnection({
    host: "iot.abbindustrigymnasium.se",
    user: "ljuside5",
    password: "skyddslinglåda",
    database: "ljuside5"
});

var cron = require('node-cron');

var getTimeDB; // variabel som används med get by name
var getTimerDB;

var getTime = cron.schedule('* * * * * *',  () => { // ska köras en gång per sekund
    con.query('SELECT * FROM tid', function (error, response) { 
    if (error) throw error;
    getTimeDB = response; 
     
        
    })
,  { scheduled: false
   };

});

getTime.start() // startar funktionen

var getTimer = cron.schedule('* * * * * *',  () => { // ska köras en gång per sekund
    con.query('SELECT * FROM timer', function (error, response) { 
    if (error) throw error;
    getTimerDB = response; 
     
        
    })
,  { scheduled: false
   };

});

getTimer.start() // startar funktionen


router.patch('/:timerName', (req, res) => {

    const timer = {
        namn: req.params.namn,
        påav: req.body.påav,
        datum: req.body.datum,
        timeStart: req.body.timeStart,
        timeStop: req.body.timeStop
        }
    
    const timerdatan = [timer.namn, timer.påav, timer.datum, timer.timeStart, timer.timeStop]

    var updateTimer = function() {
        return new Promise(function(resolve, reject) {
            
            con.query('UPDATE `tid` SET `name`=[value-1],`påav`=[value-2], `datum`=[value-3], `timeStart`=[value-4], `timeStop`=[value-5] WHERE `name` = ?', timerdatan, function (error, result) {
                if (error)
                return reject(error);
                else
                return resolve(result);
            });        
        });
    }
   

    updateTimer().then( result => {

        if (result.affectedRows>0) {
            res.status(200).json(result);
        }
        else
        res.status(404).json({
            message: "Uppdateringen misslyckades."

        });
    }).catch(error => {
        res.status(500).json({
        error: error
        });
    });
});

var patchTime = cron.schedule('* * * * * *',  () => { // ska köras en gång per sekund
    con.query('UPDATE `tid` WHERE `name` = klocka', function (error, response) { 
    if (error) throw error;
    getDB = response; 
     
        
    })
,  { scheduled: false
   };

});

patchTime.start() // startar funktionen



