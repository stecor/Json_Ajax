var pageCounter = 1;
var animalContainer = document.getElementById('animal-info');

var btn = document.getElementById('btn');

btn.addEventListener("click", function() {

  var ourRequest = new XMLHttpRequest();

  ourRequest.open('GET', './json/animals-' + pageCounter + '.json');

  ourRequest.onload = function() {
    if(ourRequest.status >= 200 && ourRequest.status < 400){
      var ourData = JSON.parse(ourRequest.responseText);
      renderHTML(ourData);
    }else{
      console.log("Connected to the server, but it returned an error.");
    }
  };

  ourRequest.onerror = function(){
    console.log("Connection error");
  };

  ourRequest.send();

  pageCounter++;

  if (pageCounter > 3) {
    btn.classList.add("hide-me");
  }
});

function renderHTML(data) {
  var htmlString = "";

  // loop each object
  for (i = 0; i < data.length; i++) {

    htmlString += "<p>" + (i+1) + " - " + data[i].name + " is a " + data[i].species + " that likes to eat ";

    // loop likes
    for (ii = 0; ii < data[i].foods.likes.length; ii++) {
      if (ii == 0) {
        htmlString += data[i].foods.likes[ii];
      } else {
        htmlString += " and " + data[i].foods.likes[ii];
      }
    }

    htmlString += " and dislikes ";

    // loop dislikes
    for (ii = 0; ii < data[i].foods.dislikes.length; ii++) {
      if (ii == 0) {
        htmlString += data[i].foods.dislikes[ii];
      } else {
        htmlString += " and " + data[i].foods.dislikes[ii];
      }
    }

    htmlString += ".</p>"

    if(i == data.length - 1){
      htmlString += "<hr/>";
    }
  }

  animalContainer.insertAdjacentHTML('beforeEnd', htmlString);
}
