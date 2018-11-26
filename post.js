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
    