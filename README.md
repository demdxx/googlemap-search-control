googlemap-search-control
========================

Search Control, Google Maps API v3. (<a href="http://demdxx.github.com/googlemap-search-control/">simple example</a>)

Customize Example
-----------------

Use **Bootstrap framework**.

```js
function initialize() {
    var myLatlng = new google.maps.LatLng(-34.397, 150.644);
    var myOptions = {
        zoom: 8,
        center: myLatlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);

    // bind a search control to the map, suppress result list
    var sControl = new google.maps.SearchControl(map, {
        template:
            "<form class=\"form-search\" style=\"margin-top: 7px\">"+
                "<div class=\"input-append\">"+
                    "<input type=\"text\" class=\"span4 search-query\">"+
                    "<button type=\"submit\" class=\"btn\">Search</button>"+
                "</div>"+
            "</form>",
        width: "50%"
    });
    sControl.index = 1;

    map.controls[google.maps.ControlPosition.TOP_LEFT].push(sControl);
}
google.maps.event.addDomListener(window, 'load', initialize);
```
