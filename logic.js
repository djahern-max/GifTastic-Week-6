$(document).ready(function () {
    let sports = ["Soccer", "Skiing", "Basketball", "Football"];

    // Generic function for capturing the movie name from the data-attribute
    function displaySportsInfo() {

        let sports = $(this).attr("data-name");
        let queryURL = "https://api.giphy.com/v1/gifs/search?q=" + sports + "&api_key=QJ2l5Ms5VrGfncNQMZGkNjUDewZiLmeO&limit=10";

        $.ajax({
                url: queryURL,
                method: "GET"
            })

            .then(function (response) {
                console.log(response);

                //Save results from API to variable "results"
                let results = response.data;

                for (let i = 0; i < results.length; i++) {

                    // Create a new DIV
                    let sportsImage = $("<div class='gif-name'>");
                    // States what GIF is rated
                    let pRating = $('<p>').text('Rating: ' + results[i].rating.toUpperCase());
                    // States GIF title
                    let pTitle = $('<p>').text('Title: ' + results[i].title.toUpperCase());
                    // Locates the GIF URL
                    let gifURL = results[i].images.fixed_height_still.url;
                    let gif = $('<img>');
                    gif.attr('src', gifURL);
                    gif.attr('data-still', results[i].images.fixed_height_still.url);
                    gif.attr('data-animate', results[i].images.fixed_height.url);
                    gif.attr('data-state', 'still');
                    gif.addClass('animate-gif');
                    // Apends info
                    sportsImage.append(pRating);
                    sportsImage.append(pTitle);
                    sportsImage.append(gif);
                    // Puts the saved info into GIF Div
                    $('#gif').prepend(sportsImage);

                }

            });
    }

    // Function for displaying buttons

    function renderButtons() {

        // Deleting the sports buttons prior to adding new sports buttons
        // (this is necessary otherwise we will have repeat buttons)
        $("#buttons").empty();

        // Looping through the array of sports
        for (let i = 0; i < sports.length; i++) {

            // Then dynamicaly generating buttons for each sports type in the array.
            let a = $("<button>");
            // Adding a class
            a.addClass("sports");
            // Adding a data-attribute with a value of the movie at index i
            a.attr("data-name", sports[i]);
            // Providing the button's text with a value of the movie at index i
            a.text(sports[i]);
            // Adding the button to the HTML
            $("#buttons").append(a);

        }
    }

    // Function to play or make still Gif images
    function playGif() {
        let state = $(this).attr('data-state');
        if (state === 'still') {
            $(this).attr('src', $(this).attr('data-animate'));
            $(this).attr('data-state', 'animate');
        } else {
            $(this).attr('src', $(this).attr('data-still'));
            $(this).attr('data-state', 'still');
        }
    }

    // This function handles events where one button is clicked
    $("#add-sports").on("click", function (event) {
        // event.preventDefault() prevents the form from trying to submit itself.
        event.preventDefault();
        // This line will grab the text from the input box
        let sport = $("#sports-input").val().trim();
        // The sports category from the textbox is then added to our array
        sports.push(sport);

        // calling renderButtons which handles the processing of our movie array
        renderButtons();
    });

    //click button to display Gifs from the API
    $(document).on("click", ".sports", displaySportsInfo);
    //click Gif to Animate.  Click to make it still.
    $(document).on("click", ".animate-gif", playGif);

    // Calling the renderButtons function at least once to display the initial list of movies
    renderButtons();
})