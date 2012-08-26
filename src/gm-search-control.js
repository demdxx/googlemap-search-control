/**
 * Google map search control
 *
 * @copyright Dmitry Ponomarev <demdxx@gmail.com>
 * @license MIT
 * @year 2012
 */

var GMSearchControl = (function(){
    function GMSearchControl(map, options) {
        var div = document.createElement('div');
        
        // Default options
        var _options = {
              template: "<form style='width: 100%'><input type='text' name='q' placeholder='Search...' style='width: 100%' /></form>"
            , width: '30%'
            , onsend: null
            , onchange: null
        };
        
        // Merge options
        for (var k in options)
            _options[k] = options[k];
        
        // Set control content
        div.style.width = _options.width;
        div.innerHTML = _options.template;

        // Set params
        this.map = map;
        this.options = _options;
        this.ctimer = null;
        this.geocoder = new google.maps.Geocoder();
        this.form = div.getElementsByTagName('form')[0];
        this.input = div.getElementsByTagName('input')[0];
        var self = this;
        
        // Set events
        google.maps.event.addDomListener(this.form, 'submit', function(event){
            var goTo = true;
            if (typeof(_options.onsend)=='function') {
                goTo = _options.onsend.apply(self, arguments);
            }
            event.returnValue = false;
            if (goTo!==false) {
                self.goTo(self.input.value);
            }
            return false;
        });
        
        google.maps.event.addDomListener(this.input, 'keyup', function(event){
            if (typeof(_options.onchange)=='function') {
                if (this.ctimer)
                    clearTimeout(this.ctimer);
                this.ctimer = setTimeout(function(){
                    _options.onchange.apply(self, arguments);
                }, 733);
            }
        });
        
        return div;
    }
    
    GMSearchControl.prototype.search = function(address, callback) {
        var self = this;
        this.geocoder.geocode({'address': address}, function(results, status){
            callback.call(self, 'OK'==status ? results : null);
        });
    };
    
    GMSearchControl.prototype.goTo = function(address) {
        this.search(address, function(results){
            if (null==results || results.length<1) return;console.log(results);
            var l = results[0].geometry.location;
            this.setCenter(l.lat(), l.lng());
        });
    };
    
    GMSearchControl.prototype.setCenter = function(latitude, longitude) {
        console.log(this);
        this.map.setCenter(new google.maps.LatLng(latitude, longitude));
    };

    if (typeof(google.maps)!='undefined')
        google.maps.SearchControl = GMSearchControl;

    return GMSearchControl;
})();
