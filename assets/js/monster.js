// creating an array that needs global scope

let monstActionArray = [];

// this is the function that will retreive monster list based upon search parameters

function callTheMonsters(
  monSize,
  monHitLow = 0,
  monHitHigh = 400,
  monArmor = 0,
  monName = "undefined"
) {
  // ajax call to get entire monster list
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
      }).done(function(response2) {
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
          if (monName === "undefined") {
            let newH3 = $("<h3>").text(resultsToDisplay[j]); //if no name is chosen, it will return all monsters that fit args
            newH3.attr("data-name", resultsSmall.index);
            newH3.addClass("click_this");
            removeLoad();
            $(".display_data").append(newH3);
          } else {
            if (resultsToDisplay[j].includes(monName)) {
              let newH3 = $("<h3>").text(resultsToDisplay[j]); //if a name is chose, it will only display mons that include name
              newH3.attr("data-name", resultsSmall.index);
              newH3.addClass("click_this");
              removeLoad();
              $(".display_data").append(newH3);
            }
          }
        }
      });
    }
  });
}

// functions to add and remove the loading functionality

function addLoad() {
  let loadDiv = $("<div>");
  loadDiv.addClass("spinner-border");
  loadDiv.addClass("load-animation");

  $(".display_data").append(loadDiv);
}

function removeLoad() {
  $(".spinner-border").removeClass("spinner-border");
}

// this click listener will run the function above when they click search

$("#display-results").on("click", function() {
  console.log("i hath been clicked");
  $("#monstPage").addClass("d-none");

  addLoad();

  monstActionArray = [];

  let inputName = $("#name").val();
  let inputSize = $("select").find(':selected').text();
  let inputHitLow = $("#hitlow").val();
  let inputHitHigh = $("#hithigh").val();
  let inputArmorMin = $("#armormin").val();

  console.log(inputSize);

  // form constrol.. we need to control or modify user input to work in our function every time
  inputName = inputName.charAt(0).toUpperCase() + inputName.slice(1);

  callTheMonsters(
    inputSize,
    inputHitLow,
    inputHitHigh,
    inputArmorMin,
    inputName
  );
});

$("#clear-results").on("click", function() {
  let confirmThis = confirm("Are you sure?");
  if (confirmThis) {
    $(".display_data").empty();
    $("#monstPage").addClass("d-none");
    monstActionArray = [];
  }
});

// ----------------------------------------------------------------------------------------------------- //

// need a click event with callback function that will display full stats upon clicking something

$(document).on("click", ".click_this", function() {
  console.log("I am clicked");
  let monster = $(this).data("name");
  console.log(monster);

  $("#monstPage").removeClass("d-none");

  $.ajax({
    url: "http://www.dnd5eapi.co/api/monsters/" + monster,
    method: "GET"
  }).done(function(response3) {
    console.log(response3);
    $(".display_data").empty();

    // creating an array of the actions able to be taken by monster (for later looping)

    monstActionArray = response3.actions;

    // setting html elemetents to stats

    $("#mon-name").text("Monster Name : " + response3.name);
    $("#str").text("STR: " + response3.strength);
    $("#dex").text("DEX: " + response3.dexterity);
    $("#int").text("INT: " + response3.intelligence);
    $("#cha").text("CHA: " + response3.charisma);
    $("#wis").text("WIS: " + response3.wisdom);
    $("#con").text("CON: " + response3.constitution);

    $("#size").text("Size: " + response3.size);
    $("#type").text("Type: " + response3.type);
    $("#ac").text("Armor Class: " + response3.armor_class);
    $("#align").text("Alignment: " + response3.alignment);
    $("#hp").text("Hit Points: " + response3.hit_points);
    $("#dice").text("Hit Dice: " + response3.hit_dice);
    $("#lang").text("Languages: " + response3.languages);

    for (var k = 0; k < monstActionArray.length; k++) {
      let actionName = $("<h4>").text(monstActionArray[k].name);
      let actionDesc = $("<h5>").text(monstActionArray[k].desc);

      $("#attack").append(actionName);
      $("#attack").append(actionDesc);
    }

    // functionality for bookmark/save button

    // this first click event is just saving the name of the current monster into array !! This functionality not working !!

    $("#save-button").on("click", function() {
      let savedMonsters = JSON.parse(localStorage.getItem("saved"));

      if (savedMonsters === null) {
        savedMonsters = ["fill"];
        savedMonsters.push(response3.name);
      } else if (savedMonsters != null) {
        savedMonsters.push(response3.name);
      }

      localStorage.setItem("saved", JSON.stringify(savedMonsters));
    });
  });
});

// ---------------------------------------------------------------------------------------- //
