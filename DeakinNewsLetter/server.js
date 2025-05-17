const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const https = require("https");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/", (req, res) => {
  const firstname = req.body.firstName;
  const lastname = req.body.lastname;
  const email = req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstname,
          LNAME: lastname,
        },
      },
    ],
  };

  const jsonData = JSON.stringify(data);
  console.log(firstname, lastname, email);

  const url = "https://us13.api.mailchimp.com/3.0/lists/6dacfb6cff";
  const options = {
    method: "POST",
    auth: "azi:048dd10babd391e7dfa6aa9ed4ced124-us13",
  };

  const request = https.request(url, options, (response) => {
    let responseData = "";

    response.on("data", (chunk) => {
      responseData += chunk;
    });

    response.on("end", () => {
      const jsonResponse = JSON.parse(responseData);
      console.log(jsonResponse);
      res.send("Successfully subscribed!");
    });
  });

  request.on("error", (e) => {
    console.error(e);
    res.send("There was an error with the request. Please try again.");
  });

  request.write(jsonData);
  request.end();
  console.log(firstname, lastname, email);
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});

r;
