const express = require('express');
const router = express();
var mysql = require("mysql");
var con = mysql.createConnection({
    host: "localhost",
    user: "ljuside5",
    password: "skyddslinglåda",
    database: "ljuside5"
});

var cron = require('node-cron');

var getLuxDB; // variabel som används med get by name


var getLuxLight = cron.schedule('* * * * * *',  () => { // ska köras en gång per sekund
    con.query('SELECT * FROM luxmätare', function (error, response) { 
    if (error) throw error;
    getLuxDB = response; 
     
        
    })
,  { scheduled: false
   };

});

getLuxLight.start() // startar funktionen

router.get('/:luxmätareName', (req, response) => { //get för enskilt id
    var found=false;
    var lampLuxNameValue;

    getLuxDB.forEach(element => {
        if (element.name== req.params.luxmätareName) {
            found=true; // ändrar found till true om lampan finns
            lampLuxNameValue = element; // ger variabeln värdena för visst id
        }
    
        if(found!= true) {
            res.status(200).json({name: "Lampan finns ej.",
        message: "Testa att skicka med post istället och kolla stavfel!"}) // felmeddelande
        }

        else
        {
            res.status(200).json(lampLuxNameValue); // skickar status och resultatet
            console.log(lampLuxNameValue);

        }
    });
});

router.post('/', (req, res, next) => {
    
    const ljuside= {
         name: req.body.name,
         ljusstryrka: req.body.ljusstyrka
        };
    
        var Createdlamp = function(){
            return new Promise(function(resolve,reject){
    
                var lamp = [ljuside.name, ljuside.ljusstyrka];
                console.log(lamp);
                con.query('INSERT INTO appbelysing (name, ljusstryrka) VALUES ?',[[lamp]], function (err, results) {
                    console.log(results);
                    if (err) 
                    return reject (err);
                    else 
                    return resolve(lamp)
    
                    
                  });
            })
    
    
        }
});
    
Createdlamp()

router.patch('/:luxmätareName', (req, res) => {

    const Luxlampa = {
        name: req.body.name,
        Ljusstyrka: req.body.Ljusstyrka,
        
    }

    var updateLuxlampa = function() {
        return new Promise(function(resolve, reject) {
            
            con.query('UPDATE `luxmätare` SET `name`=[value-1],`Ljusstyrka`=[value-2] WHERE `name` = ?', [[Luxlampa]], function (error, result) {
                if (error)
                return reject(error);
                else
                return resolve(result);
            });        
        });
    }
        

    updateLuxlampa().then( result => {

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

module.exports = router;
