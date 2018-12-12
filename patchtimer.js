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


var getTime = cron.schedule('* * * * * *',  () => { // ska köras en gång per sekund
    con.query('SELECT * FROM tid', function (error, response) { 
    if (error) throw error;
    getTimeDB = response; 
     
        
    })
,  { scheduled: false
   };

});

getTime.start() // startar funktionen

router.get('/:tidName', (req, res) => { //ger för enskilt id
    var found=false;
    var tidNameValue;

    getTimeDB.forEach(element => {
        if (element.name== req.params.tidName) {
            found=true; // ändrar found till true om lampan finns
            tidNameValue = element; // ger variabeln värdena för visst id
        }
    
    });
        if(found!= true) {
            res.status(200).json({
                name: "klockan finns ej.",
                message: "Försök igen"})
         
        }
    

        else
        {
            res.status(200).json(tidNameValue); // skickar status och resultatet

        }
});

var getTimerDB;

var getTimer = cron.schedule('* * * * * *',  () => { // ska köras en gång per sekund
    con.query('SELECT * FROM timer', function (error, response) { 
    if (error) throw error;
    getTimerDB = response; 
     
        
    })
,  { scheduled: false
   };

});

getTimer.start() // startar funktionen

router.get('/:timerName', (req, res) => { //ger för enskilt id
    var found=false;
    var timerNameValue;

    getTimerDB.forEach(element => {
        if (element.name== req.params.timerName) {
            found=true; // ändrar found till true om lampan finns
            timerNameValue = element; // ger variabeln värdena för visst id
        }
    
    });
        if(found!= true) {
            res.status(200).json
            ({name: "Lampan finns ej.",
            message: "försök igen." // felmeddelande
        })
    }
        else
        {
            res.status(200).json(timerNameValue); // skickar status och resultatet

        }
});


router.patch('/:timerName', (req, res) => {

    const timer = {
        name: req.params.name,
        påav: req.body.påav,
        datum: req.body.datum,
        timeStart: req.body.timeStart,
        timeStop: req.body.timeStop
        }
    
    const timerdatan = [timer.name, timer.påav, timer.datum, timer.timeStart, timer.timeStop]

    var updateTimer = function() {
        return new Promise(function(resolve, reject) {
            
            con.query('UPDATE `timer` SET `name`=[value-1],`påav`=[value-2], `datum`=[value-3], `timeStart`=[value-4], `timeStop`=[value-5] WHERE `name` = ?', timerdatan, function (error, result) {
                if (error)
                return reject(error);
                else
                return resolve(timerdatan);
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






module.exports = router;// exporterar till app.js


