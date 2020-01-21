// going to data dump the monsters from the api
function callTheMonsters(monSize, monHitLow=0, monHitHigh=400, monArmor=0) {
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

        // these will be the if statements that will push our results into resultsToDisplay based upon the arguments
        if (
          resultsSmall.size.includes(monSize) &&
          resultsSmall.hit_points >= monHitLow &&
          resultsSmall.hit_points <= monHitHigh &&
          resultsSmall.armor_class > monArmor
        ) {
          resultsToDisplay.push(resultsSmall.name);
        }
        // This loop actually writes the results to the html file dynamically
        for (var j = 0; j < resultsToDisplay.length; j++) {
          let newH3 = $("<h3>").text(resultsToDisplay[j]);
          newH3.attr("data-name", resultsSmall.index);
          newH3.addClass("click_this");
          $(".display_data").append(newH3);
        }
      });
    }
  });
}

callTheMonsters("Large"); // this is working based on coded search parameters (Size Str, hit low int, hit high int, armor)

// need a click event with callback function that will display full stats upon clicking something


$(document).on("click", ".click_this", function() {
  console.log("I am clicked");
  let monster = $(this).data("name");
  console.log(monster);

  $.ajax({
    url: "http://www.dnd5eapi.co/api/monsters/" + monster,
    method: "GET"
  }).then(function(response3) {
    console.log(response3);
    $(".display_data").empty();

    let newDiv = $("<div>");
    let newH1 = $("<h1>").text(response3.name);
    let sizeEl = $("<h4>").text(response3.size);
    let armorEl = $("<h4>").text(response3.armor_class);

    newDiv.append(newH1);
    newDiv.append(sizeEl);
    newDiv.append(armorEl);

    $(".display_data").append(newDiv);

  });
});
