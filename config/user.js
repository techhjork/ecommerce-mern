const pool = require('./pool')

function user(){
   user.prototype = {
     find: function(user=null,cb){
        if(user){
             var field = Number.isInteger(user) ? 'id' : 'username';
        }

    let sql = `SELECT * FROM user where ${field}= ?`
     }
   }
}


module.exports = user