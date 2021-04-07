const express = require("express")
const app = express()
const path = require("path")
const ejs = require("ejs")
const bodyParser = require("body-parser")
const fileUpload = require('express-fileupload')

app.use(fileUpload())


var cookieParser = require('cookie-parser')
app.use(cookieParser())


const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');  
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


const port = process.env.PORT || 9000

const seed = require("./seed")()


app.use("/auth", require("./routes/auth") )
app.use(require("./routes/home") )
app.get("*",(req,res)=>{
  res.render("404")
})


app.listen(9000,(err)=>{
   if(err){ 
   	console.log(err)
    return false
   } 
   console.log(`connected: http://localhost:${port}`)
}) 



// const express = require("express")
// const app = express()

// app.get("/",(req,res)=>{
//   res.send("aa")
// })

// app.listen(9000,()=>{
//   console.log("9000")
// })





// File Upload

// const express = require("express")
// const app = express()
// const multer  = require('multer')
// const cors = require("cors")


// const storage = multer.diskStorage({
// 	destination: (req,res,cb)=> cb(null,"./uploads"),
// 	filename:(req,file,cb)=>{
//       const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
//       cb(null,uniqueName)
// 	}
// })

// let upload = multer({storage,limits:{ fileSize: 1000000 * 100 } }).single('myfile')
// app.use(cors())

// app.get("/",(req,res)=>{
//   res.send("aaaa")
// })

// app.post("/",(req,res)=>{

// 	console.log(req.body)
//   upload(req,res,(err)=>{
//      if(err) res.status(500).json({error:err});
//      console.log("storage",storage)
//      res.status(200).json({"storage":storage});
//   })
// })

// app.listen(9000,()=>{
// 	console.log("This is http://localhost:9000")
// })














//let session = require('express-session');
//var MySQLStore = require('express-mysql-session')(session);


// var options = {
// 	host: 'localhost',
// 	port: 9000,
// 	user: 'root',
// 	password: '',
// 	database: 'ecommerce'
// };

// var sessionStore = new MySQLStore(options);


// let sessionOptions = {
//   secret: "123",
//   saveUninitialized: false,
//   resave:false,
//   store: new MySQLStore({
// 	host:'localhost',
// 	user:"root",
// 	password:"",
// 	database:"ecommerce",
//    tableName:"session_table",
//    columnNames:{
//    	session_id:"session_id",
//       expires:"expires",
//       data:"data"
//    }
// 	}) 
// };

// app.use(session(sessionOptions));

/*------------------------------ Socket Checking --------------------------*/

// const express = require("express")
// const app = express()
// const http = require("http")
// const path = require("path")
// const socketio = require("socket.io")

// const server = http.createServer(app);
 
// const io = socketio(server)

// app.use(express.static(path.join(__dirname, 'public')));

// io.on('connection',(socket)=>{
// 	const id = socket.id
//     socket.on('join',(displayMsg)=>{
//        console.log(`this ${id} connect with socket`,displayMsg);
//     })
    

//     // Input key getting and sending 
//     socket.on('inputKeydown',(value)=>{
//         socket.emit('send-frontend',value)
//     })

  
//     socket.on('disconnect',()=>{
//       console.log(`This ${id} disconnect from socket connection`);
//     })

// })

// server.listen(9000,console.log(`Open http://localhost:9000`));





















// const express = require("express");
// const app = express()
// const session = require("express-session");
// var MySQLStore = require('express-mysql-session')(session);
// const mysql = require("mysql2")
// const cookieParser = require('cookie-parser');
// const secret = "123"
// const phrase = "123"
// const maxAge = 1000
// const sessionMiddleware = session({
// 	secret: secret,
// 	name:"ssid",
// 	saveUninitialized:false,
// 	resave:true,
// 	cookie:{
//        httpOnly:true,
//        sameSite:true,
//        maxAge:maxAge
// 	},
// 	store: new MySQLStore({
// 		host:'localhost',
// 	user:"root",
// 	password:"",
// 	database:"ecommerce",
//          tableName:"session_table",
//          columnNames:{
//          	session_id:"session_id",
//             expires:"expires",
//             data:"data"
//          }
// 	}) 
// })

// app.use(sessionMiddleware)
// app.use(cookieParser())
// app.use((req,res,next)=>{
// 	console.log(MySQLStore)
// 	next()
// })

// const pool = mysql.createConnection({
// 	host:'localhost',
// 	user:"root",
// 	password:"",
// 	database:"ecommerce",
// 	multipleStatements:true,
// 	dateStrings:true
// })

// pool.connect((err,connection)=>{
// 	if(err){
// 		return console.log(`Db connection error ${err}`)
// 	}
// 	if(connection){ 
// 		console.log(`connected with Database: `+connection.serverVersion)
//    }
// })

// app.get("/",(req,res)=>{
// 	req.session.userId="IAMTECHH"
//    res.send("aaa")
// })
// app.listen(9000,()=>{
// 	console.log(`connection in Localhost`)
// })


