Klara Infinite Scroll Plugin
=================================
```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Infinite scroller Izel</title>
    <link rel="stylesheet" href="styles/style.css">
    
  </head>
  <body>

    <div id="list">
      
    </div>

    <script src="bower_components/jquery/dist/jquery.js"></script>
    <script src="scripts/infiniteScroll.js"></script>
    <script src="scripts/script.js"></script>
    
  </body>
</html>
```
## Brief Description
infiteScroll.js is a jQuery based infinite scroll plug-in which provides ability to scroll infinitely.
there is no eye candy since it's more functionality focused.

-Data source can be replaceable via same interface callback function.
-callback function should be provided in order to plugin work. 

## Known Issue on Mac OS

When you scroll down and do refresh to a page scroll focus stay at the same place.

## FrameWorks

Jquery 

## Pending Improvement

Instead of using static list table type , template engine can be used to dynamically create list of rows.

## Data Source
```
function getFakeData(offset,startIndex, limit, callback) {
  var data = [];
  for (var i=startIndex; i<limit; i++) {
    var id = offset + i;
    data.push({
      id: id,
      name: "Name " + id,
      description: "Description " + id
    });
  }
  callback(data);
};
```
## Plugin
...

;
(function($, window, document, undefined) {


    //Private Methods

    //Default Options
    var infiniteScroll = 'infiniteScroll'
    var defaults = {
        callbackFunction: null,
        listType: 'list', //table , list
        offset: 'data-'
    };


    var currentIndex = 0;
    var container = null;
    var maxPossibleRowCount = 1;
    var options;
    var element;
    // Module constructor
    var constructor = function(el, optionsOut) {
        element = el;

        //Extend default options via pass variables
        options = $.extend({}, defaults, optionsOut);
        var that = this;

        //Fix refresh issue in Chrome scroll top has  no call back function//
        //Firefox still has issue
        //IE not tested working on mac

        $('html').animate({
            scrollTop: $(document).height()
        }, function() {
            that.init();
        });


     
        
    }

    constructor.prototype.init = function() {

        //Check if callback function provided for data
        if (options.callbackFunction === null) {
            alert('Provide callback function');
            return;
        }


        //Initiate Containers
        addContainer();

        //Start Adding Data and Rows
        expandRowCount(currentIndex, false);

        //Listen Scroll Event
        $(window).on('scroll', function(e) {

            if (scrollerReachedTop()) {
                expandRowCount()
            };
        });
    };



    var addRow = function(data) {
        //reason I'm using dynamic variable instead of jquery append is building rows once via js variable  is much faster alternative then jquery append.
        var html = '';
        for (var i = 0; i < data.length; i++) {
            switch (options.listType) {
                case "table":
                    html += '<tr class="list-item">';
                    $.each(data[i], function(key, value) {
                        html += '<td >' + value + '</td>';
                    });
                    html += "</tr>";
                    break;
                case "list":
                    $.each(data[i], function(key, value) {
                        html += '<li class="list-item">' + value + '</li>';
                    });
                    break;
            }
        }

        container.append(html);

        currentIndex = currentIndex + data.length;
    }

    var addContainer = function() {
        switch (options.listType) {
            case "list":
                container = $("<ul class='container'></ul>");
                break;

            case "table":
                container = $("<table class='container'></table>");
                break;
        }

        $(element).append(container);
    }

    //Magic happens here.
    var expandRowCount = function() {

        options.callbackFunction(options.offset, currentIndex, currentIndex + maxPossibleRowCount, addRow);


        if (maxPossibleRowCount == 1) {
            var maxArea = $(element).height();
            var oneLineHeight = $(element).find('.list-item').height();

            maxPossibleRowCount = Math.floor((maxArea -100) / oneLineHeight)
            expandRowCount();
        }

    };

    //Check if user scroll to bottom    
    var scrollerReachedTop = function() {
        if ($(window).scrollTop() + $(window).height() == $(document).height()) {
            return true;
        } else {
            return false;
        }
    }

    // Add Scroll object in jQuery Data object to prevent multiple instances. 
    $.fn[infiniteScroll] = function(options) {
        return this.each(function() {
            if (!$.data(this, 'plugin_' + infiniteScroll)) {
                $.data(this, 'plugin_' + infiniteScroll,
                    new constructor(this, options));
            }
        });
    }

})(jQuery, window, document);



...


