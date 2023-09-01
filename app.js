require("dotenv").config();

const express = require("express");
const app = express();

//for authentication we need a json web token
const jwt = require("jsonwebtoken");

//we need to make sure our api can handle json
app.use(express.json());

const port = 3000;

//this is just an example array we give out.
const posts = [
  {
    username: "Christian",
    title: "Testbeitrag 1",
  },
  {
    username: "Angela",
    title: "Testbeitrag 2",
  },
];

// First we have to create a login route. This is just for showing the token to the user.
app.post("/login", (req, res) => {
  // Authenticate User
  const username = req.body.username;
  const user = { name: username };
  // this provides us the access token to get data from the api
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
  res.json({ accessToken: accessToken });
});

//middeleware function to verify the token
function authenticateToken(req, res, next) {
  //get the token from the header
  const authHeader = req.headers["authorization"];
  //if there is no token we return a 401 error
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  //verify the token
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    //if there is an error we return a 403 error
    if (err) return res.sendStatus(403);
    //if everything is fine we call the next function
    req.user = user;
    next();
  });
}

app.get("/posts", authenticateToken, (req, res) => {
  res.json(posts);
});

app.listen(port, () => console.log(`server listening on port ${port}!`));
