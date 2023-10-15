const express = require('express');
const mysql = require('mysql');
const path = require('path');
const cors = require('cors');

const dotenv = require('dotenv');
dotenv.config()




const app = express()
const buildPath = path.join(__dirname+"/public")
app.use(express.json());
app.use(cors());

app.use(cors({
  origin: 'https://dhanekulayaswanth.github.io',
  // You can add more options as needed
}));

var connection;


app.post('/validate',(req,res)=>{

  const userId = req.body.Name;
  const password = req.body.Password;


  connection = mysql.createConnection({
    host:process.env.host,
    user:process.env.user,
    password:process.env.password,
    database:process.env.database,
    port:process.env.port
  });

  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to the database: ', err);
      return;
    }
  
    console.log('Connected to the database');
  });
  

  const tablename = process.env.studentdata

  connection.query(`SELECT * FROM ${tablename} WHERE admno = ?`, [userId], (err, results) => {
    if (err) {
      console.error('Error querying the database: ', err);
      res.status(500).send('Error querying the database');
      return;
    }

    else  if (results.length === 0) {
      res.status(404).send({status:false,message:'User ID not found'});
      return;
    }

    else{
      const user = results[0];
      if (user.pwd !== password) {
        res.status(401).send({status:false,message:'Incorrect password'});
        return;
      }
      else{
        // Send response first

        getMarks(user.admno, process.env.results, (err, data) => {
          if (err) {
            console.error('Error fetching data:', err);
            return;
          }
          res.send({status:true,message:'logged in',user:user,results:data});
        });
        

      }
    }
    connection.end((err)=>{
      if(err) console.log(err)
    })
  });


});



const getMarks = (admno, tablename, callback) => {
  var query = `select * from ${tablename} where admno=${admno};`;

  connection.query(query, (err, result) => {
    if (err) {
      console.log(err);
      callback(err, null); // Pass an error to the callback
      return;
    }
    callback(null, result); // Pass the result to the callback
  });
}
















app.listen(3030,()=>{
  console.log('server started on port 3030')
})































  

  




