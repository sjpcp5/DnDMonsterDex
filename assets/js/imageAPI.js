//need variable for URL link to API
//need AJAX function
// use local storage to store entered monster
// need search variable that works between index.html and monsters.js
// need parameter to return 1 image per monster result
// variable for capturing results of DnD API search results
// need variable # monsters to return from search from monster.js 
// need to append images to html per # monsters to return from search
// add add event listener click, to select image for chosen monster
// need to append image of selected monster
//var DnDseResults = $(".display-data")
//var monsterInputEL = document.getElementsByClassName(".monsterInput")

//split function to use last word of search 

// variable parameter to return 1 image or gif 


// function to randomize offset
// var offsetArray = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25"];
// function getRandomOffset(offsetArray) {
// var randIndex = Math.floor(Math.random()* offsetArray.length);
// var randOffset = offsetArray[randIndex];

// return randOffset;
// };
$("#giphy").remove();
var counter = 0
$(document).on("click", ".click_this", function() {
console.log("monster has been clicked prepare image");
monsterSearch = $(this).data("name");
console.log(monsterSearch);

// gets the last word of the clicked monster result
var monster = getLastWord(monsterSearch);
console.log(monster);
// removes <img> of last clicked monster
 
// $("#monsterGif").remove();

// giphy parameter to return 1 image or gif 
var Limitsearch = '1';
// array to randomize offset parameter in giphy API
var searchNumber = GetOffset();


//console.log(monster);
var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + monster + "&api_key=71957ReGgM9ed9MEpRgc0IVcliXGpSPq&limit=" + Limitsearch + "&offset=" + searchNumber + "&lang=en";

// https://api.giphy.com/v1/gifs/search?api_key=71957ReGgM9ed9MEpRgc0IVcliXGpSPq&q=
// dragon&limit=1&offset=0&rating=R&lang=en
// var queryURL = "https://www.googleapis.com/customsearch/v1?key=AIzaSyAe4vzXonU1ftH9aSvHEjdZtGCwAa2epiA:&006501763354055401202:easggwesejq=ancientblackdragon";


    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        var results = response.data;
        console.log(results);
        // ========================
        
         for (var i = 0; i < results.length; i++) {
        // Make a div with jQuery and store it in a variable named monsterDiv.
        // Make a paragraph tag with jQuery and store it in a variable named p.
        // 
        // Make an image tag with jQuery and store it in a variable named monsterImage.
        // Set the image's src to results[i]'s fixed_height.url.
        // Append the p variable to the monsterDiv variable.
        // Append the monsterImage variable to the monsterDiv variable.
        // Prepend the monsterDiv variable to the element with an class of monsterGifs.

          //var monsterDiv = $("<div id=monsterGif>");
          //var rating = results[i].rating;
          //var p = $("<p>").text("Rating: " + rating);

          //var monsterImage = $("<img id=giphy db w-100 br2 br--top>");

          // pulls downsized large image from JSON response data
         var monsterImage =$("img").attr("src", results[i].images.downsized_large.url);

          //monsterDiv.append(p);
         // monsterDiv.append(monsterImage);
          
          $(".giphy").append(monsterImage);
          counter++;
          console.log("clicked.."+ counter);   
          };
          console.log(response);
        // ==================================
         });
         
});

// function gets the last word of the clicked monster
function getLastWord(){
  
  var noHyphens = monsterSearch.replace(/-/g, " ",);
  var noun = noHyphens.split(" ");
  console.log(noun);
  return noun[noun.length - 1]; 

};

//function gets the randome offset parameter to change up image results when search for the same monster
function GetOffset() {
  var offsetArray = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25"];
  var randomNumber = Math.floor(Math.random() * 24);
  var searchNumber = offsetArray[randomNumber];
  console.log(searchNumber);
  return searchNumber;
};



    
  


