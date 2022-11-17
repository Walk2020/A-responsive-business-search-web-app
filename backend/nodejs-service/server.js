const bodyParser = require('body-parser');
const path = require(`path`);
const express = require('express');
const app = express();
const axios = require('axios');
const cors = require('cors');

const yelpApiKey="";
const yelpEndPoint = "https://api.yelp.com/v3";
const businessSearchPath = "/businesses/search";
const businessDetailPath = "/businesses/";


app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


app.get('/searchYelp', (req, res) => {
  var config = {
    headers:{
      'Authorization' : `Bearer ${yelpApiKey}`
    },
    params:{
      'term' : req.query.term,
      'latitude' : req.query.lat,
      'longitude' : req.query.lng,
      'categories' : req.query.category,
      'radius' : Math.round(parseFloat(req.query.distance) * 1609.344)
    }
  };
  console.log(config.params);

  axios.get(`${yelpEndPoint}${businessSearchPath}`, config)
  .then((response) => {
    var data = response.data;
    console.log(response.status);
    res.send(data);
  })
  .catch((error) => {
    console.log ('error');
  });
});


app.get('/detail', (req, res) => {
  var config = {
    headers:{
      'Authorization' : `Bearer ${yelpApiKey}`
    }
  };
  
  var id = req.query.id;
  axios.get(`${yelpEndPoint}${businessDetailPath}${id}`, config)
  .then((response) => {
    var data = response.data;
    console.log(response.status);
    res.send(data);
  })
  .catch((error) => {
    console.log ('error');
  });
});

app.get('/review', (req, res) => {
  var config = {
    headers:{
      'Authorization' : `Bearer ${yelpApiKey}`
    }
  };
  
  var id = req.query.id;
  axios.get(`${yelpEndPoint}${businessDetailPath}${id}/reviews`, config)
  .then((response) => {
    var data = response.data;
    console.log(response.status);
    res.send(data);
  })
  .catch((error) => {
    console.log ('error');
  });
});


app.get('/autocomplete', (req, res) => {
  var config = {
    headers:{
      'Authorization' : `Bearer ${yelpApiKey}`
    }
  };
  
  var keyword = req.query.keyword;
  axios.get(`${yelpEndPoint}/autocomplete?text=${keyword}`, config)
  .then((response) => {
    var data = response.data;
    console.log(response.status);
    res.send(data);
  })
  .catch((error) => {
    console.log ('error');
  });
});




// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});