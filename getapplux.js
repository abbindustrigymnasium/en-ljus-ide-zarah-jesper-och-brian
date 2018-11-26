var getLuxDB; // variabel som används med get by name


var getLuxLight = cron.schedule('* * * * * *',  () => { // ska köras en gång per sekund
    con.query('SELECT * FROM app belysning', function (error, response) { 
    if (error) throw error;
    getLuxDB = response; 
     
        
    })
,  { scheduled: false
   };

});

getLuxLight.start() // startar funktionen

router.get('/:appbelysningName', (req, response) => { //ger för enskilt id
    var found=false;
    var lampLuxNameValue;

    getLuxDB.forEach(element => {
        if (element.name== req.params.appbelysningName) {
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

        }
    });
});

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
