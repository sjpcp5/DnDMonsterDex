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
// link to API documentation https://serpapi.com/images-results
// serpapi image API https://serpapi.com/playground?q=Apple&tbm=isch&ijn=0
/* API parameters tbm=isch "parameter must be set to isch", 
 jin "optional defines the page number to get, must be integer greater than or equal to 0", 
 and chips, num "parameter is number of search items returned.""
*/
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
var counter = 0
$(".SearchButton").on("click", function() {

// variable parameter to return 1 image or gif 
var Limitsearch = '1';
// array to randomize offset
var offsetArray = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25"];
var randomNumber= Math.floor(Math.random() * 24);
var searchNumber= offsetArray[randomNumber];
console.log(searchNumber);


var monster = $(".monsterInput").val();
console.log(monster);
var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + monster + "&api_key=71957ReGgM9ed9MEpRgc0IVcliXGpSPq&limit=" + Limitsearch + "&offset=" + searchNumber + "&rating=R&lang=en";

// https://api.giphy.com/v1/gifs/search?api_key=71957ReGgM9ed9MEpRgc0IVcliXGpSPq&q=
// dragon&limit=1&offset=0&rating=R&lang=en
// var queryURL = "https://www.googleapis.com/customsearch/v1?key=AIzaSyAe4vzXonU1ftH9aSvHEjdZtGCwAa2epiA:&006501763354055401202:easggwesejq=ancientblackdragon";


    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        
      

        var results = response.data;
        // ========================

         for (var i = 0; i <= results.length; i++) {

        // Step 3: uncomment the for loop above and the closing curly bracket below.
        // Make a div with jQuery and store it in a variable named animalDiv.
        // Make a paragraph tag with jQuery and store it in a variable named p.
        // Set the inner text of the paragraph to the rating of the image in results[i].
        // Make an image tag with jQuery and store it in a variable named animalImage.
        // Set the image's src to results[i]'s fixed_height.url.
        // Append the p variable to the animalDiv variable.
        // Append the animalImage variable to the animalDiv variable.
        // Prepend the animalDiv variable to the element with an id of gifs-appear-here.

        // ============= put step 3 in between these dashes ======================
          var monsterDiv = $("<div>");
          //var rating = results[i].rating;
          //var p = $("<p>").text("Rating: " + rating);

          var monsterImage = $("<img>");
          monsterImage.attr("src", results[i].images.fixed_height.url);

          //monsterDiv.append(p);
          monsterDiv.append(monsterImage);
          
          $(".gcse-search").append(monsterDiv);
          counter++;
          console.log("clicked.."+ counter);
          $(".gsce-search").remove();
              
              
          };
          console.log(response);
        // ==================================
         });
        });




    
  
