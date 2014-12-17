$(function() {
    $('#list').infiniteScroll({
        'callbackFunction': getFakeData,
        'offset'  : 'data-',
        listType : 'list' //table , list
    });
});


//Dummy data generator
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




