// creating an array that needs global scope

let monstActionArray = [];
let monstProfArray = [];

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
    url: "https://www.dnd5eapi.co/api/monsters",
    method: "GET"
  }).then(function(response) {
    console.log(response);
    let resultsBig = response.results;
    // for loop that restricts results after going through the array of data
    for (var i = 0; i < resultsBig.length; i++) {
      // nested ajax call to get more info about each individual monster

      $.ajax({
        url: "https://www.dnd5eapi.co/api/monsters/" + resultsBig[i].index,
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
  loadDiv.addClass("loader");

  $(".display_data").append(loadDiv);
}

function removeLoad() {
  $(".loader").removeClass("loader");
}

// this click listener will run the function above when they click search

$("#display-results").on("click", function() {
  console.log("i hath been clicked");
  $("#monstPage").addClass("dn");

  $(".display_data").empty();
  addLoad();

  monstActionArray.length = 0;
  monstProfArray.length = 0;

  let inputName = $("#name").val();
  let inputSize = $("select")
    .find(":selected")
    .text();
  let inputHitLow = $("#hitlow").val();
  let inputHitHigh = $("#hithigh").val();
  let inputArmorMin = $("#armormin").val();

  console.log("LOOK HERE BRO" + inputHitLow);
  console.log(inputHitHigh);
  console.log(inputArmorMin);

  if (inputHitLow === "") {
    inputHitLow = 0;
  }
  if (inputHitHigh === "") {
    inputHitHigh = 400;
  }
  if (inputArmorMin === "") {
    inputArmorMin = 0;
  }

  // form constrol.. we need to control or modify user input to work in our function every time
  inputName = inputName.charAt(0).toUpperCase() + inputName.slice(1);

  // ---------------------------------------- //

  callTheMonsters(
    inputSize,
    inputHitLow,
    inputHitHigh,
    inputArmorMin,
    inputName
  );
});

// ----------------------------------------------------------------------------------------------------- //

// need a click event with callback function that will display full stats upon clicking something

$(document).on("click", ".click_this", function() {
  console.log("I am clicked");
  let monster = $(this).data("name");
  console.log(monster);

  $("#monstPage").removeClass("dn");

  $.ajax({
    url: "https://www.dnd5eapi.co/api/monsters/" + monster,
    method: "GET"
  }).done(function(response3) {
    console.log(response3);
    $(".display_data").empty();

    // creating an array of the actions able to be taken by monster (for later looping)

    monstActionArray = response3.actions;
    monstProfArray = response3.proficiencies;

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

    // this line will clear out the div that holds the monster attacks
    $("#attack").html("");
    $("#profs").html("");

    for (var k = 0; k < monstActionArray.length; k++) {
      let actionName = $("<h4>").text(monstActionArray[k].name);
      let actionDesc = $("<h5>").text(monstActionArray[k].desc);
      $("#attack").append(actionName);
      $("#attack").append(actionDesc);
    }

    // array is not working. displaying [object object]
    for (var n = 0; n < monstProfArray.length; n++) {
      let profName = $("<h5>").text(monstProfArray[n].name);
      let profVal = $("<h5>").text(monstProfArray[n].value);
      $("#profs").append(profName + ": " + profVal);
      console.log(profName);
      console.log(profVal);
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

// Code for Modal
// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
};

$("#clear-yes").on("click", function() {
  $(".display_data").empty();
  $("#monstPage").addClass("dn");

  $("#name").val("");
  $("#hitlow").val("");
  $("#hithigh").val("");
  $("#armormin").val("");

  monstActionArray.length = 0;
  monstProfArray.length = 0;
  modal.style.display = "none";
});

$("#clear-no").on("click", function() {
  modal.style.display = "none";
});

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
