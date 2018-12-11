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
    getDB = response; 
     
        
    })
,  { scheduled: false
   };

});

getTime.start() // startar funktionen


router.patch('/:tidName', (req, res) => {

    const på = {
        namn: req.body.namn,
        påav: req.body.påav,
        }
    
    const datan = [på.namn, på.påav]

    var updateTid = function() {
        return new Promise(function(resolve, reject) {
            
            con.query('UPDATE `tid` SET `name`=[value-1],`påav`=[value-2] WHERE `name` = ?', [[datan]], function (error, result) {
                if (error)
                return reject(error);
                else
                return resolve(result);
            });        
        });
    }
   

    updateTid().then( result => {

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
    con.query('UPDATE `tid` WHERE `name` = klocka', [[på]], function (error, response) { 
    if (error) throw error;
    getDB = response; 
     
        
    })
,  { scheduled: false
   };

});

patchTime.start() // startar funktionen



