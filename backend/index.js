const express = require("express");
const cors = require("cors");

const app = express();
const port = 5000;

app.use(cors());
app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
})
const mongoDB = require("./db.js");
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use(express.json());
app.use('/api', require("./routes/CreateUser.js"));
app.use('/api', require("./routes/DisplayData.js"));
app.use('/api', require("./routes/OrderData.js"));


mongoDB();

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})