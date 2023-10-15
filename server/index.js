const express = require('express');
const mysql = require('mysql');
const path = require('path');
const cors = require('cors');

const dotenv = require('dotenv');
dotenv.config()







const app = express()
const buildPath = path.join(__dirname+"/public")
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://kcpsarpschool.org');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

const allowedOrigins = [
  'https://dhanekulayaswanth.github.io',
  'http://localhost:3000',
  'https://kcpsarpschool.org/resultcheck/',
];

const corsOptions = {
  origin: allowedOrigins,
  // You can add more options as needed
};

app.use(cors(corsOptions));



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

        getMarks(user.admno,user.class , (err, data) => {
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



const getMarks = (admno,classno, callback) => {

  let tablename='studentmarksplus12';

  if (classno === '11' || classno === '12') {
    tablename = 'studentmarksplus12';
  } else {
    tablename = process.env.results;
  }

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





app.get('/table/:class', (req, res) => {
  const classNumber = req.params.class;

  connection = mysql.createConnection({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database,
    port: process.env.port
  });

  connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database');
  });

  let tableName='studentmarksplus12';

  if (classNumber === '11' || classNumber === '12') {
    tableName = 'studentmarksplus12';
  } else {
    tableName = process.env.results; // Replace with your default table name for other classes
  }

  connection.query(`SELECT * FROM ${tableName} WHERE class = ?`, [classNumber], (error, results) => {
    if (error) throw error;
    res.send(renderTable(results));
    connection.end((err) => {
      if (err) {
        console.log(err);
      }
      console.log('Connection ended');
    });
  });
});





  // Helper function to render table
  function renderTable(data) {
    let tableHTML = '<table border="1" cellspacing="10" cellpadding="20"><tr>';
    const keys = Object.keys(data[0]);
    tableHTML += keys.map(key => `<th>${key}</th>`).join('') + '</tr>';
  
    data.forEach(record => {
      tableHTML += '<tr>';
      keys.forEach(key => {
        tableHTML += `<td>${record[key]}</td>`;
      });
      tableHTML += '</tr>';
    });
  
    tableHTML += '</table>';
    return tableHTML;
  }









app.listen(3030,()=>{
  console.log('server started on port 3030')
})































  

  




