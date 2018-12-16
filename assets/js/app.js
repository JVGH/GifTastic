$(document).ready(function () {

    // pre-loaded keywords
    let topics = ["linkedin", "instagram", "snapchat", "facebook", "twitter", "youtube"];

    // JS vars
    let barSearch = $("#barSearch");
    let btnSearch = $("#btnSearch");
    let dataDefault = $(".content-default-data");
    let dataUser = $(".content-user-data");
    let btnClearAll = $("#btnClearAll");
    let imgContainer = $("#content-img");

    // Add keywords to the list
    for (let i = 0; i < topics.length; i++) {
        addKeyword(dataDefault, topics[i]);
    }

    // fx to add keywords to the list
    function addKeyword(objLoc, val) {
        let tag = $("<button>");
        tag.addClass("d-inline-block tags btn btn-outline-light keyword-btn")
            .attr({
                "type": "button"
            })
            .css({
                "padding": ".2rem",
                "color": "#888888",
                "border": "none"
            });

        tag.text(val);
        objLoc.append(tag);
    }

    // Search btn evnt listener
    btnSearch.on("click", function (event) {
        event.preventDefault();
        addKeyword(dataUser, barSearch.val());
        //callAPI(barSearch.val());
    });

    // FX to clear gifs
    function clear() {
        $("#content-img").empty();
    }

    // Clear gifs evnt listener
    btnClearAll.on("click", clear);

    // API call fx
    function callAPI(val) {
        btnClearAll.show();
        let keyword = val;
        let queryURL = "https://api.giphy.com/v1/gifs/search?q=" + keyword + "&api_key=dc6zaTOxFJmzC&limit=12";
        $.ajax({
                url: queryURL,
                method: "GET"
            })
            .then(function (response) {
                console.log(response);
                let results = response.data;

                for (let i = 0; i < results.length; i++) {
                    let searchTitleHR = $()

                    let imgDiv = $("<div>");
                    imgDiv.addClass("div-img col-md-3 card my-3 bg-transparent");
                    let imgImage = $("<img>");
                    imgImage.attr({
                        "src": results[i].images.downsized_still.url,
                        "data-still": results[i].images.downsized_still.url,
                        "data-animate": results[i].images.downsized.url,
                        "data-state": "still"
                    }).addClass("gif card-img-top");
                    let imgCardbody = $("<div>");
                    imgCardbody.addClass("card-body");
                    let imgTitle = $("<h6>");
                    imgTitle.addClass("card-title").css({
                        "color": "#888888"
                    });
                    imgTitle.text(results[i].title);
                    let imgRating = $("<p>");
                    imgRating.addClass("card-title").css({
                        "color": "#888888"
                    });
                    imgRating.text("Rating: " + results[i].rating);
                    imgCardbody.append(imgTitle).append(imgRating);
                    imgDiv.append(imgImage).append(imgCardbody);
                    imgContainer.prepend(imgDiv);
                }
            });
    };

    // Keywords evnt listener
    $(document).on('click', '.keyword-btn', function (event) {
        event.preventDefault();
        callAPI($(this).text());
    });

    // Gif pause/animate evnt listener
    $(document).on('click', '.gif', function (event) {
        event.preventDefault();
        let state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });

    // Clear All btn toggle
    btnClearAll.on("click", function () {
        if (btnClearAll.attr("data-click-state") == 1) {
            btnClearAll.attr("data-click-state", 0);
            btnClearAll.toggle();
        } else {
            btnClearAll.attr("data-click-state", 1);
            btnClearAll.toggle();
        };
    });
});