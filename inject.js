// Wait for document ready before executing main function
var readyStateCheckInterval = setInterval(function() {
    if (document.readyState === "complete") {
        clearInterval(readyStateCheckInterval);
        main();
    }
}, 10);

function main() {
    //remove all likes, views, and follow numbers
    removeQuantNodes(document.body);

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
  var walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_ELEMENT,
    { acceptNode: function(node) { return NodeFilter.FILTER_ACCEPT; } },
    false
  );

  var checkNode;
  while(checkNode = walker.nextNode()) {
      if(checkNode.className == "Nm9Fw" || checkNode.className == "vcOH2" || checkNode.className == "-nal3 "){
        checkNode.nodeValue = "";
      }
  }

}


function removeQuant(){
  var likes = document.querySelectorAll(".Nm9Fw");
  console.log(likes.length)

  Array.prototype.forEach.call(likes, function (el) {
      el.nodeValue = ""
  })

  var views = document.querySelectorAll(".vcOH2");
  console.log(views.length)

  Array.prototype.forEach.call(views, function (el) {
      el.nodeValue = ""
  })

  var follow = document.querySelectorAll(".nal3");
  console.log(follow.length)

  Array.prototype.forEach.call(follow, function (el) {
      el.nodeValue = ""
  })

}
