$(document).ready(function () {
  /* Declare DOM Variables */
  var userQueryInput = $("#userQueryInput");
  var recipeSearchBtn = $("#recipeSearchBtn");
  var buttonSelectors = $("#buttonSelectors");
  var ingredientsForm = $("#ingredientsForm");

  var dynamicContentEl = $("#dynamicContent");
  /* Declare DOM Variables */

  /* Declare JavaScript Variables */
  var noTreeNuts = false;
  var noDairy = false;
  var noEggs = false;
  var noPeanuts = false;

  var searchResults = [];
  var resultTitle = [];
  var resultImage = [];
  /* Declare JavaScript Variables */

  /* Define Functions */
  // Function to toggle the allergen variables.
  function settingSearchCriteria(event) {
    var allergySelected = $(this).attr("data-type");
    switch (allergySelected) {
      case "treeNuts":
        if (noTreeNuts) {
          noTreeNuts = false;
          break;
        } else {
          noTreeNuts = true;
          break;
        }
      case "dairy":
        if (noDairy) {
          noDairy = false;
          break;
        } else {
          noDairy = true;
          break;
        }
      case "eggs":
        if (noEggs) {
          noEggs = false;
          break;
        } else {
          noEggs = true;
          break;
        }
      case "peanuts":
        if (noPeanuts) {
          noPeanuts = false;
          break;
        } else {
          noPeanuts = true;
          break;
        }
    }
  }

  //Function to query Edamam API
  function findRecipe(event) {
    event.preventDefault();
    var searchQuery = userQueryInput.val();
    var appID = "a1693f14";
    var appKey = "f3aa39b9486a7dff1bea7a4cbcede5a9";
    var searchURL =
      "https://api.edamam.com/search?q=" +
      searchQuery +
      "&app_id=" +
      appID +
      "&app_key=" +
      appKey;

    // Adding these tags to the URL if the approiate selector is true.
    if (noTreeNuts && searchURL.indexOf("health=tree-nut-free") === -1) {
      searchURL = searchURL + "&health=tree-nut-free";
    }
    if (noEggs && searchURL.indexOf("health=vegan") === -1) {
      searchURL = searchURL + "&health=vegan";
    }
    if (noDairy && searchURL.indexOf("health=vegan") === -1) {
      searchURL = searchURL + "&health=vegan";
    }
    if (noPeanuts && searchURL.indexOf("health=peanut-free") === -1) {
      searchURL = searchURL + "&health=peanut-free";
    }
    console.log(searchURL);
    $.ajax({
      url: searchURL,
      method: "GET",
    }).then(function (response) {
      console.log(response);

      searchResults = response.hits;

      displayRecipes(event);
    });
  }

  //Function to display search results
  function displayRecipes(event) {
    event.preventDefault();

    console.log(searchResults[0].recipe.image);

    for (var i = 0; i < searchResults.length; i++) {
      resultTitle.push(searchResults[i].recipe.label);
      resultImage.push(searchResults[i].recipe.image);

      var recipeResultCardEl = $("<div>");
      // recipeResultCardEl.addClass("row");
      var recipeResultImg = $("<img>");
      recipeResultImg.attr("src", resultImage[i]);
      recipeResultCardEl.append(recipeResultImg);
      var recipeResultTitleEl = $("<p>");
      recipeResultTitleEl.attr("text", resultTitle[i]);
      recipeResultCardEl.append(recipeResultTitleEl);
      dynamicContentEl.append(recipeResultCardEl);
    }

    console.log(resultTitle);
    console.log(resultImage);
    console.log("yay");
  }

  //Function to send saved ingredient list via EmailJS API
  function saveList(event) {
    event.preventDefault();

    //btn.value = 'Sending...';

    const serviceID = "default_service";
    const templateID = "template_241tje5";
    var passed_html = $("#passed_html").val();
    var user_email = $("#user_email").val();

    emailjs.send(serviceID, templateID, {
      passed_html: passed_html,
      user_email: user_email,
    });
  }
  /* Define Functions */

  /* Make Function Calls */
  /* Make Function Calls */

  /* Register Event Listeners */
  buttonSelectors.on("click", ".allergy", settingSearchCriteria);
  recipeSearchBtn.on("click", findRecipe);
  ingredientsForm.on("submit", saveList);
  /* Register Event Listeners */
});

function openPage(pageName, elmnt, color) {
  // Hide all elements with class="tabcontent" by default */
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Remove the background color of all tablinks/buttons
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].style.backgroundColor = "";
  }

  // Show the specific tab content
  document.getElementById(pageName).style.display = "block";

  // Add the specific color to the button used to open the tab content
  elmnt.style.backgroundColor = color;
}

// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();