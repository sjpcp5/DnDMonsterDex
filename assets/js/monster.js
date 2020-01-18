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
        var resultsToDisplay = [];
        console.log(resultsSmall);

        if (
          resultsSmall.size.includes("Small")
        ) {
          resultsToDisplay.push(resultsSmall.name);
        }

        for (var j = 0; j < resultsToDisplay.length; j++) {
          let newH1 = $("<h3>").text(resultsToDisplay[j]);
          $(".display_data").append(newH1);
        }
      });
    }
  });
}

callTheMonsters();
