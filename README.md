Coding Challenge: Infinite Scroll
=================================

``` html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Infinite scroller</title>
    <link rel="stylesheet" href="style.css">
    <script src="script.js"></script>
  </head>
  <body>
    <div id="list"></div>
  </body>
</html>
```

Implement an infinite scrolling view to apply to the div `#list` that, upon reaching the bottom of the scroll area
fetches further data and appends it. The number of elements coming from the data source can be very large (thousands)
and needs to be loaded incrementally.

The `#list`-div itself should have a fixed height with scrolling contents.

The list should have an indicator displaying where we are in the list.

## Tools

You can use whatever JavaScript frameworks (or just plain JavaScript, up to you), libraries, template languages, module
systems etc. that you're familiar with.

## Data Source

You don't need to do real AJAX calls. Fake a data source by passing random objects to a callback upon each request.
Something like this:

``` js
function getFakeData(offset, limit, callback) {
  var data = [];
  for (var i=0; i<limit; i++) {
    var id = offset + i;
    data.push({
      id: id,
      name: "Name " + id,
      description: "Description " + id
    });
  }
  callback(null, data);
};
```

## Goals

-  The code should be written as a module, with an aim for reusability.
-  There might be different lists/tables with infinitely scrollable contents using your code
-  It should be possible to exchange the data source and rendering of items
