const db = require("mysql2")

let pool = db.createPool({
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