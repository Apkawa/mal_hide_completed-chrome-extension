var WATCHING_LIST = undefined;
var HIDE_FLAG = true;


var location_type = (function test_location(loc) {
    var match = loc.match(/^http:\/\/myanimelist.net\/(anime|topanime).php\?/);
    if (match) {
        return match[1]
    }
    return false;

})(location.href);


function ToggleWatchedAnime(watched_list) {
    $("a[href^='http://myanimelist.net/anime/']").each(function (index, el) {
            matched = el.href.match(/anime\/(\d+)\/(.*)$/);
            var id = matched[1];
            var title_name = matched[2];
            if (watched_list[id] && HIDE_FLAG) {
                $(el).parents("tr").hide();
            } else {
                $(el).parents("tr").show();
            }
        });
}


function draw_button() {
    if (HIDE_FLAG) {
        var text_button = "Show watched";
    } else {
        var text_button = "Hide watched";
    }
    var button = $("#hide_toggle");

    if (!button.length) {
        var button = $('<button id="hide_toggle">Show watched</button>').text(text_button);
        if (location_type === 'topanime') {
            $("#horiznav_nav").next().children("h2").first().append(button);
        } else {
            if (location_type === 'anime') {
                $("#horiznav_nav").next().children("div").first().prepend(button.css('float', 'left'));
            }
        }
    } else {
        button.text(text_button)
    }
}


function set_config(config) {
    chrome.extension.sendRequest(
        {
            type: "set_config",
            value: config
        },
        function responseCallback(response) {
            console.log(["set config", config, response]);
        }
    );

}


function init(config) {
    HIDE_FLAG = config['hide_flag'] || true;
    draw_button();
    $("#hide_toggle").click(function onClickHideToggleButton () {
        HIDE_FLAG = !HIDE_FLAG;
        draw_button();
        ToggleWatchedAnime(WATCHING_LIST);
    })
    chrome.extension.sendRequest({"type": "load_watched_list"}, function responseCallback (response) {
        if (response["value"]) {
            console.log(["Get watched_list", response["value"]]);
            WATCHING_LIST = response["value"];
            ToggleWatchedAnime(WATCHING_LIST);
        }
    });
}


chrome.extension.sendRequest({"type": "get_config"}, function responseCallback(response) {
    console.log(["get config", response]);
        if (response["value"]) {
            init(response["value"]);
        }
});
