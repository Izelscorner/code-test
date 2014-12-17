Klara Infinite Infinite Scroll Plugin
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

Data source can be replaceable interface and callback function should be provided. 

Known Issue on Mac OS

When you scroll down and do refresh to a page scroll focus stay at the same place.


## Tools

Jquery 

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


