require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());
// let auth = new Promise((resolve, reject)=>{
//     app.post("/users", (req,res)=>{})
// })
app.post("/users", (req, res) => {
  //   const USERNAME = "uma victor";
  //   const PASSWORD = "8888";

  const { name, password } = req.body;
  const user = {
      name: name,
      password: password,
    };
    const token = jwt.sign(user, process.env.JWT_KEY);
    // user.token = token
//   console.log("🚀 ~ file: server.js ~ line 21 ~ app.post ~ token", token)
  res.json({
    token,
    user,
  });
  //   if (username === USERNAME && password === PASSWORD) {
  //     const user = {
  //       id: 1,
  //       name: "uma victor",
  //       username: "uma victor",
  //     };
  //     const token = jwt.sign(user, process.env.JWT_KEY);
  //     res.json({
  //       token,
  //       user,
  //     });
  //   } else {
  //     res.status(403);
  //     res.json({
  //       message: "wrong login information",
  //     });
  //   }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
