const axios = require("axios");
const express = require("express");
const app = express();
var port = process.env.PORT || 8080;
var host = process.env.HOST || "127.0.0.1";

const endpointUrl = "https://cors-anywhere-nd3f.onrender.com"; // Replace this with the URL you want to send requests to
const requestInterval = 60000; // Interval in milliseconds (e.g., 5000ms = 5 seconds)
//===================================================================
function sendRequest() {
  axios
    .get(endpointUrl)
    .then((response) => {
      // console.log("Request sent:", response.status, response.statusText);
    })
    .catch((error) => {
      // console.error("Error sending request:", error.message);
    })
    .finally(() => {
      setTimeout(sendRequest, requestInterval);
    });
}

// Start sending requests
sendRequest();
//===================================================================

let promotions;
let comming;
let movieCorner;
let movieCorner2;

async function sendGalaxy() {
  try {
    const promotionsAPI = await axios.get(
      "https://www.galaxycine.vn/api/v2/mobile/promotions",
      { headers: { clientid: "3da4eba4-94dd-4e74-bc25-38e89a01fe07" } }
    );

    const commingAPI = await axios.get(
      "https://www.galaxycine.vn/api/v2/mobile/movies/comming",
      { headers: { clientid: "3da4eba4-94dd-4e74-bc25-38e89a01fe07" } }
    );

    const movieCornerAPI = await axios.get(
      "https://www.galaxycine.vn/api/v2/mobile/content/post?type[]=review&type[]=preview&page=1&limit=4",
      { headers: { clientid: "3da4eba4-94dd-4e74-bc25-38e89a01fe07" } }
    );

    const movieCornerAPI2 = await axios.get(
      "https://www.galaxycine.vn/api/v2/mobile/content/post?type[]=film&page=1&limit=4",
      { headers: { clientid: "3da4eba4-94dd-4e74-bc25-38e89a01fe07" } }
    );

    promotions = promotionsAPI.data;
    comming = commingAPI.data;
    movieCorner = movieCornerAPI.data;
    movieCorner2 = movieCornerAPI2.data;

    // console.log("promotion", promotions);

    // console.log("comming", comming);
    // console.log("movieCorner", movieCorner);
    // console.log("movieCorner2", movieCorner2);
  } catch (error) {
    console.log(error);
  }
}

app.get("/galaxy", (req, res) => {
  (async () => {
    await sendGalaxy();

    let ec = { promotions, comming, movieCorner, movieCorner2 };

    res.send(ec);
  })();
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Express listening on port ${port} host ${host}`);
});
