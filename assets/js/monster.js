// going to data dump the monsters from the api
function callTheMonsters() {
  // ajax call
  $.ajax({
    url: "http://www.dnd5eapi.co/api/monsters",
    method: "GET"
  }).then(function(response) {
    console.log(response);
    let resultsBig = response.results;
    // for loop that restricts results after going through the array of data
    for (var i = 0; i < resultsBig.length; i++) {
      // nested ajax call to get more info about each individual monster

      $.ajax({
        url: "http://www.dnd5eapi.co/api/monsters/" + resultsBig[i].index,
        method: "GET"
      }).then(function(response2) {
        let resultsSmall = response2;

        if (resultsSmall.name.includes("Dragon")) {
          let pEl = $("<h1 1h-copy mv0>").text(resultsSmall.name);
          let pEl2 = $("<p 1h-copy mv0>").text(resultsSmall.size);
          $(".display_data").append(pEl);
          $(".display_data").append(pEl2);
        }
      });
    }
  });
}

callTheMonsters();
