document.addEventListener("WebComponentsReady", function() {
  var route = ejs.render("<%= route %>");
  console.log(route);
  // console.log(!{route});
});
