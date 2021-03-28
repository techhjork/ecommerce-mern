const db = require("mysql2")

let pool = db.createPool({
	 connectionLimit : 1000,
    connectTimeout  : 60 * 60 * 1000,
    acquireTimeout  : 60 * 60 * 1000,
    timeout         : 60 * 60 * 1000,
    host:"localhost",
    user:"root",
    password:"",
    database:"ecommerce"
})

pool.getConnection((err,connection)=>{
	if(err){
	   return console.log(`error is connection database`)
	}
   
	if(connection) connection.release()
    return;
})


module.exports = pool.promise()