$(document).ready(function () {
    var country, category, source, search;
    //print default
    buildURL();
    // disable source if either select is used
    if ($("#country").val() != "0" || $("#category").val() != "0") {
        $("#source").attr("disabled", true);
    }
    if ($("#source").val() != "0") {
        $("#country").attr("disabled", true);
        $("#category").attr("disabled", true);
    }
    // disable source on change
    $("#country").change(function () {
        if ($("#country").val() === "0") {
            $("#source").attr("disabled", false);
        }
        if ($("#country").val() != "0") {
            $("#source").attr("disabled", true);
        }
    });
    $("#category").change(function () {
        if ($("#category").val() === "0") {
            $("#source").attr("disabled", false);
        }
        if ($("#category").val() != "0") {
            $("#source").attr("disabled", true);
        }
    });
    // disable when source is selected
    $("#source").change(function () {
        if ($("#source").val() === "0") {
            $("#country").attr("disabled", false);
            $("#category").attr("disabled", false);
        }
        if ($("#source").val() != "0") {
            $("#country").attr("disabled", true);
            $("#category").attr("disabled", true);
        }
    });
    // show results
    $("#submit").click(function () {
        country = document.getElementById("country").value;
        category = document.getElementById("category").value;
        source = document.getElementById("source").value;
        search = document.getElementById("search-term").value;
        $("#no-results").hide();
        buildURL();
    });
    // reset back to default display and reset options
    $("#reset").click(function () {
        $(".custom-select").prop("selectedIndex", 0);
        $(".custom-select").attr("disabled", false);
        $("#search-term").val("");
        $("#no-results").hide();
        print(
            "https://newsapi.org/v2/top-headlines?country=nz&apiKey=f86d2f8d630843db90156d4555dab9cb"
        );
    });
    // create url based on what options are actually chosen
    function buildURL() {
        var baseURL = "https://newsapi.org/v2/top-headlines?";
        if (country != 0 && country != undefined)
            baseURL += "country=" + country + "&";
        if (category != 0 && category != undefined)
            baseURL += "category=" + category + "&";
        if (source != 0 && source != undefined)
            baseURL += "sources=" + source + "&";
        if (search != "" && search != undefined) baseURL += "q=" + search + "&";
        if (baseURL === "http://newsapi.org/v2/top-headlines?")
            baseURL += "country=nz&";
        baseURL += "apiKey=f86d2f8d630843db90156d4555dab9cb";
        print(baseURL);
    }
    // print function to display
    function print(url) {
        $.ajax({
            url: url,
            type: "GET",
            data: "json",
            success: function (data) {
                if (data.articles.length === 0) $("#no-results").show();
                document.getElementById("output").innerHTML = "";
                for (var i = 0; i < data.articles.length; i++) {
                    var card = "";
                    if (data.articles[i].urlToImage == null)
                        data.articles[i].urlToImage = "images/News.jpg";
                    card +=
                        '<div class="card col-4"><img src="' +
                        data.articles[i].urlToImage +
                        '" class="card-img-top">' +
                        '<div class="card-body"><h5 class="card-title">' +
                        data.articles[i].title +
                        "</h5>";
                    if (data.articles[i].description != null) {
                        card +=
                            '<p class="card-text">' +
                            data.articles[i].description +
                            "</p>";
                    }
                    card +=
                        '<a class="btn btn-outline-primary" target="_blank" href="' +
                        data.articles[i].url +
                        '">View story here</a></p>' +
                        "</div></div>";
                    document.getElementById("output").innerHTML += card;
                }
            },
            error: function () {
                console.log("error");
            },
        }); //end of ajax
    }
});
