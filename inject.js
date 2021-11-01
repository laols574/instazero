
setInterval(function(){removeQuant();}, 10);

// Wait for document ready before executing main function
var readyStateCheckInterval = setInterval(function() {
    if (document.readyState === "complete") {
        clearInterval(readyStateCheckInterval);
        main();
    }

}, 10);

function main() {
    //remove all likes, views, and follow numbers
    removeQuant();

    var nodeList = [];
    nodeList = Array.prototype.concat.apply(nodeList, document.getElementsByClassName("Nm9Fw"));
    nodeList = Array.prototype.concat.apply(nodeList, document.getElementsByClassName("vcOH2"));
    nodeList = Array.prototype.concat.apply(nodeList, document.getElementsByClassName("-nal3 "));

    // Options for the observer (which mutations to observe)
    const config = { attributes: true, childList: true, subtree: true };

    // Callback function to execute when mutations are observe
    var observer = new MutationObserver(function(mutations) {
      console.log("m")
        mutations.forEach(function(mutation) {
          console.log("for each")
            Array.prototype.slice.call(mutation.addedNodes).forEach(removeQuantNodes);
        });
    });

    // Start observing the target node for configured mutations
    observer.observe(document.body, config);

    // Later, you can stop observing
    observer.disconnect();
}

function removeQuantNodes(node){
  // Create a tree walker to traverse all text nodes
  var walker = document.createTreeWalker(
      node,
      NodeFilter.SHOW_ALL,
      {
          acceptNode: function(node) {
              // Reject contentEditable nodes
              return (node.parentElement && node.parentElement.isContentEditable) ?
                  NodeFilter.FILTER_SKIP :
                  NodeFilter.FILTER_ACCEPT;
          }
      },
      false
  );

  var checkNode;
  while(checkNode = walker.nextNode()) {
      if(checkNode.className == "Nm9Fw" || checkNode.className == "vcOH2" || checkNode.className == "-nal3 "){
        console.log(checkNode.getNamedItem())
      }
  }

}

function removeQuant(){
  var likes = document.getElementsByClassName("Nm9Fw");
  while(likes[0]) {
      likes[0].parentNode.removeChild(likes[0]);
  }
  var views = document.getElementsByClassName("vcOH2");

  while(views[0]) {
      views[0].parentNode.removeChild(views[0]);
  }
  var follows = document.getElementsByClassName("-nal3 ");

  while(follows[0]) {
      follows[0].parentNode.removeChild(follows[0]);
  }
}

function removeQuant2(){
  var likes = document.querySelectorAll(".Nm9Fw");

  Array.prototype.forEach.call(likes, function (el) {
      el.nodeValue = ""
  })

  var views = document.querySelectorAll(".vcOH2");
  console.log(views.length)

  Array.prototype.forEach.call(views, function (el) {
      el.nodeValue = ""
  })

  var follow = document.querySelectorAll(".nal3 ");
  console.log(follow.length)

  Array.prototype.forEach.call(follow, function (el) {
      el.nodeValue = ""
  })

}
