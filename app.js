const express = require("express");
const https = require("https");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});
app.post("/", function (req, res) {
  //console.log("post received");
  //console.log(req.body.cityName);
  const query = req.body.cityName;
  const apiKey = "6bf92bcb31e02f37e56c1c0c9db44bbf";
  const unit = "metric";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&units=" +
    unit +
    "&appid=" +
    apiKey;

  https.get(url, function (response) {
    //console.log(response.statusCode);
    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      //console.log(weatherData);
      const obj = {
        name: "Riya",
        age: 21,
        height: 170,
      };
      //console.log(JSON.stringify(obj));
      const temp = weatherData.main.temp;
      const weather = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;

      const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
      console.log(weather);
      res.write(
        "<h1>The temprature in " +
          query +
          " is " +
          temp +
          " degree celcius.</h1>"
      );
      res.write("<p>The sky is currently like " + weather + "</p>");
      res.write("<img src=" + imageURL + ">");
      res.send();
    });
  });
});

app.listen(3000, function () {
  console.log("Server is at port 3000");
});
