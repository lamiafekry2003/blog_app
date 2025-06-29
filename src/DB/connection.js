import mysql from 'mysql2';
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'lamia',
  password:'root',
  database: 'test',
  port: 3306,
  database:'blog_app', 
});
// to check the connection and have error in database or no;

connection.connect((err)=>{
  if(err){
    console.log(`Error connection Database ${err.message}`)
  }
  console.log(`Database Connected Successfully`)
})
export default connection;