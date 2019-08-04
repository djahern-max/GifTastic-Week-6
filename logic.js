//In this assignment, I will use the giphy API to create a dynamic web page
//that populates based ont eh value passed into it through text


//create an array to hold the button

$(document).ready(function () {

    let sports = ["Soccer", "Skiing", "Basketball", "Football"];

    // This will be a function to make the button and add them to the page

    function populateButtons(arrayToUSe, classToAdd, areaToAddTo) {

        $(areaToAddTo).empty();

        for (let i = 0; i < arrayToUSe.length; i++) {

            let a = $("<button>");
            a.addClass(classToAdd);
            a.attr("data-type", arrayToUSe[i]);
            a.text(arrayToUSe[i]);
            $(areaToAddTo).append(a);

        }

    }


    // Create a function that will populate the images from the Giphy API 

    $(document).on("click", ".sports-buttons", function () {
        $("#images").empty();

        $(".sports-buttons").removeClass("active");
        $(this).addClass("active");

        let type = $(this).attr("data-type");
        let queryURL = "https://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=QJ2l5Ms5VrGfncNQMZGkNjUDewZiLmeO&q=sports";

        //Ajax Call

        $.ajax({

                url: queryURL,
                method: "GET"

            })

            .then(function (response) {
                console.log(response);
                let results = response.data;


                for (var i = 0; i < results.length; i++) {
                    let sportsDiv = $("<div class=\"sports-item\">");

                    let rating = results[i].rating;

                    let p = $("<p>").text("Rating: " + rating);

                    let animated = results[i].images.fixed_height.url;
                    let still = results[i].images.fixed_height_still.url;

                    let sportsImage = $("<img>");
                    sportsImage.attr("src", still);
                    sportsImage.attr("data-still", still);
                    sportsImage.attr("data-animate", animated);
                    sportsImage.attr("data-state", "still");
                    sportsImage.addClass("food-image");

                    sportsDiv.append(p);
                    sports.Div.append(sportsImage);

                    $("#images").append(sportsDiv);

                }

            });

    });

    //Set the state from still to animated when clicking individual images

    $(document).on("click", ".sports-image", function () {
        console.log("hello");

        let state = $(this).attr("data-state");

        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", animate);
        } else {

            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }

    });

    $("#add-sports").on("click", function (event) {
        event.preventDefault();
        let newSports = $("input").eq(0).val();

        if (newSports.length > 2) {
            sports.push(newFood);
        }

        populateButtons(sports, "sports-buttons", "#sports-buttons");

    });
    populateButtons(sports, "sports-buttons", "#sports-buttons");

});