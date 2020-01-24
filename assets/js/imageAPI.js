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
var monsterInputEL = document.getElementsByClassName(".monsterInput").value
$(".SearchButton").on("click", function() {

var monster = $("#monster-search").val();
var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        monster + "&api_key=71957ReGgM9ed9MEpRgc0IVcliXGpSPq";
console.log(monster)


    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(queryURL)
        console.log(response);

        var results = response.data;
        // ========================

         for (var i = 0; i < results.length; i++) {

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

          var monsterImage = $("<img mw5 db>");
          monsterImage.attr("src", results[i].images.fixed_height.url);

          //monsterDiv.append(p);
          monsterDiv.append(monsterImage);

          $("#gifs-appear-here").prepend(monsterDiv);

          
        // ==================================
         }

      });
    });
