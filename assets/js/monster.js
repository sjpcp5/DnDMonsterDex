// going to data dump the monsters from the api
function callTheMonsters() {
  // ajax call
  $.ajax({
    url: "http://www.dnd5eapi.co/api/monsters",
    method: "GET"
  }).then(function(response) {
    console.log(response);
    let results = response.results;

    for (var i = 0; i < results.length; i++) {
      let pEl = $("<p>").text(results[i].index);
      console.log(pEl);
      $(".display_data").append(pEl);
    }
  });
}

callTheMonsters();
