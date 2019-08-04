$(document).ready(function () {
    console.log("test");
    let sports = ["Soccer", "Skiing", "Basketball", "Football"];

    // Generic function for capturing the movie name from the data-attribute
    function alertSportsName() {
        var sportsName = $(this).attr("data-name");

        alert(sportsName);
    }


    // Function for displaying sports data

    function renderButtons() {

        // Deleting the sports buttons prior to adding new sports buttons
        // (this is necessary otherwise we will have repeat buttons)
        $("#images").empty();

        // Looping through the array of sports
        for (var i = 0; i < sports.length; i++) {

            // Then dynamicaly generating buttons for each sports type in the array.
            // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
            var a = $("<button>");
            // Adding a class
            a.addClass("sports");
            // Adding a data-attribute with a value of the movie at index i
            a.attr("data-name", sports[i]);
            // Providing the button's text with a value of the movie at index i
            a.text(sports[i]);
            // Adding the button to the HTML
            $("#images").append(a);

        }
    }

    // This function handles events where one button is clicked
    $("#add-sports").on("click", function (event) {
        // event.preventDefault() prevents the form from trying to submit itself.
        // We're using a form so that the user can hit enter instead of clicking the button if they want
        event.preventDefault();

        // This line will grab the text from the input box
        var sport = $("#sports-input").val().trim();
        // The sports categor from the textbox is then added to our array
        sports.push(sport);

        // calling renderButtons which handles the processing of our movie array
        renderButtons();
    });

    // Function for displaying the sports info
    // We're adding a click event listener to all elements with the class "sports"
    // We're adding the event listener to the document because it will work for dynamically generated elements
    // $(".sports").on("click") will only add listeners to elements that are on the page at that time
    $(document).on("click", ".sports", alertSportsName);

    // Calling the renderButtons function at least once to display the initial list of movies
    renderButtons();
})