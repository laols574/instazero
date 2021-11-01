
/*
setInterval is necessary in order to remove ALL instances
of the classes as Instagram generates the document's
body in fragments, through scrolling
*/

setInterval(function(){removeQuant();}, 10);

function removeQuant(){
  var likesClass = "Nm9Fw";
  var viewsClass = "vcOH2";
  var followsClass = "-nal3 ";

  removeElementsByClass(likesClass);
  removeElementsByClass(viewsClass);
  removeElementsByClass(followsClass);

}


function removeElementsByClass(className){
  var elements = document.getElementsByClassName(className);
  while(elements[0]) {
      elements[0].parentNode.removeChild(elements[0]);
  }
}
