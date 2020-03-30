const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
app.use(cors());
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const quizRouter = require("./helpers/quiz_router.js");
app.use(bodyParser.json());
const port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log(`listening on port ${this.address().port}`);
});
//Handle production
if (process.env.NODE_ENV == "production") {
  MongoClient.connect(
    "mongodb://olivia:pubquizbuddy1@ds231529.mlab.com:31529/heroku_lfzh1qkt",
    function(err, client) {
      if (err) {
        console.log(err);
      }
      const db = client.db("heroku_lfzh1qkt");
      const pubQuizzesCollection = db.collection("pubQuizzes");
      const pubQuizzesRouter = quizRouter(pubQuizzesCollection);
      app.use("/api/pubQuizzes", pubQuizzesRouter);
      app.use("/", express.static(path.join(__dirname + "/public")));
    }
  );
}
