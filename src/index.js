const axios = require("axios");
const express = require("express");
const app = express();
var port = process.env.PORT || 8080;
var host = process.env.HOST || "0.0.0.0";

const endpointUrl = "https://cors-anywhere-nd3f.onrender.com"; // Replace this with the URL you want to send requests to
const requestInterval = 60000; // Interval in milliseconds (e.g., 5000ms = 5 seconds)

function sendRequest() {
  axios
    .get(endpointUrl)
    .then((response) => {
      console.log("Request sent:", response.status, response.statusText);
    })
    .catch((error) => {
      console.error("Error sending request:", error.message);
    })
    .finally(() => {
      setTimeout(sendRequest, requestInterval);
    });
}

// Start sending requests
sendRequest();


app.get('/',(req,res) => {
  res.send('hello')
})
app.listen(port,()=>{
  console.log(`Express listening on port ${port} host ${host}`)
})