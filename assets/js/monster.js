// going to data dump the monsters from the api
function callTheMonsters() {
  // ajax call
  $.ajax({
    url: "http://www.dnd5eapi.co/api/monsters",
    method: "GET"
  }).then(function(response) {
    console.log(response);
    let results = response.results;
    // for loop that restricts results after going through the array of data
    for (var i = 0; i < results.length; i++) {
      if (results[i].name.includes("Dragon")) {
        let pEl = $("<p>").text(results[i].name);
        console.log(pEl);
        $(".display_data").append(pEl);
      }
    }
  });
}

callTheMonsters();
