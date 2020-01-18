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
var imgURL = "https://serpapi.com/playground?q="+ "AncientBlackDragons" + "&tbm=isch&ijn=0";

function imageResults(){
    $.ajax({
        url: imgURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);

    })
}
imageResults();