router.patch('/:appbelysningName', (req, res) => {

    const Luxlampa = {
        name: req.body.name,
        påav: req.body.påav,
        varm: req.body.varm,
        kall: req.body.kall,
        ljusstyrka: req.body.ljusstyrka,
    }

    var updateLuxlampa = function() {
        return new Promise(function(resolve, reject) {
            
            con.query('UPDATE `appbelysning` SET `name`=[value-1],`påav`=[value-2],`varm`=[value-3],`kall`=[value-4],`ljusstryrka`=[value-5] WHERE `name` = ?', [[Luxlampa]], function (error, result) {
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