$(document).ready(function () {
    let sports = ["Soccer", "Skiing", "Basketball", "Football"];

    // Generic function for capturing the movie name from the data-attribute
    function displaySportsInfo() {

        let sports = $(this).attr("data-name");
        let queryURL = "https://api.giphy.com/v1/gifs/search?q=" + sports + "&api_key=QJ2l5Ms5VrGfncNQMZGkNjUDewZiLmeO&q=sports";

        $.ajax({
                url: queryURL,
                method: "GET"
            })

            .then(function (response) {
                console.log(response);

                if (response.pagination.total_count == 0) {
                    alert("There aren not any GIFS for this topic");
                    let gifList = topics.indexOf(topic);
                    // otherwise display button
                    if (gifList > -1) {
                        topics.splice(gifList, 1);
                        renderButtons();
                    }
                }


                let results = response.data;

                for (let i = 0; i < results.length; i++) {

                    // Creating and storing an image tag
                    let sportsImage = $("<div class='gif-name'>");

                    let pRating = $('<p>').text('Rating: ' + results[i].rating.toUpperCase());

                    let pTitle = $('<p>').text('Title: ' + results[i].title.toUpperCase());

                    // Setting the Image src attribute to mageUrl
                    let gifURL = results[i].images.fixed_height_still.url;
                    let gif = $('<img>');
                    gif.attr('src', gifURL);
                    gif.attr('data-still', results[i].images.fixed_height_still.url);
                    gif.attr('data-animate', results[i].images.fixed_height.url);
                    gif.attr('data-state', 'still');
                    gif.addClass('animate-gif');


                    sportsImage.append(pRating);
                    sportsImage.append(pTitle);
                    sportsImage.append(gif);
                    $('#gif').prepend(sportsImage);

                }

            });
    }

    // Function for displaying sports data

    function renderButtons() {

        // Deleting the sports buttons prior to adding new sports buttons
        // (this is necessary otherwise we will have repeat buttons)
        $("#buttons").empty();

        // Looping through the array of sports
        for (let i = 0; i < sports.length; i++) {

            // Then dynamicaly generating buttons for each sports type in the array.
            // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
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

    // Function to play or still Gif images
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
        // We're using a form so that the user can hit enter instead of clicking the button if they want
        event.preventDefault();

        // This line will grab the text from the input box
        let sport = $("#sports-input").val().trim();
        // The sports categor from the textbox is then added to our array
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