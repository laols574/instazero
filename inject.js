/*
Author: Lauren Olson
Title: inject.js
Description: This file injects the following javascript code into
the users' visited websites, with the intention of removing quantification
from social media sites.
*/

/*
setInterval is necessary in order to remove ALL instances
of the classes as Instagram generates the document's
body in fragments, through scrolling
* acts as the main function
*/
var numbers = /^[0-9]+$/;

setInterval(function(){
  const [likesClass, viewsClass, followsClass] = getQuantElements();
  removeQuant(likesClass, viewsClass, followsClass);
}, 10);


/*
function: getQuantElements
description: obtain the elements to be removed
input: none
output:
  - likesClass (HTMLCollection) all the nodes which are like values
  - viewsClass (HTMLCollection) all the nodes which are view values
  - followsClass (HTMLCollection) all the nodes which are follow values
*/
function getQuantElements(){
  likesClass = null;
  viewsClass = null;
  followsClass = null;
  //INSTAGRAM
  if(window.location.hostname === "www.instagram.com"){
    likesClass = document.getElementsByClassName("Nm9Fw");
    viewsClass = document.getElementsByClassName("vcOH2");
    followsClass = document.getElementsByClassName("-nal3");

    //remove comment numbers bc come on!
    var group = document.getElementsByClassName("r8ZrO");
    for(element in group){
      group[element].innerHTML = "View all comments"
    }
  }
  //YOUTUBE
  else if (window.location.hostname === "www.youtube.com") {
    //VIEWS
    var docFragment = document.createDocumentFragment();

    var viewCount = document.getElementsByClassName("view-count style-scope ytd-video-view-count-renderer");
    if(viewCount[0] != null) docFragment.appendChild(viewCount[0]);

    var shortViewCount = document.getElementsByClassName("short-view-count style-scope ytd-video-view-count-renderer")
    if(shortViewCount[0] != null) docFragment.appendChild(shortViewCount[0]);

    //use document fragment to create an html collection so this matches other collections
    var group = document.getElementsByClassName("style-scope ytd-video-meta-block");
    for(element in group){
      if(group[element].innerText != null && group[element].tagName == "SPAN" && group[element].innerText.match(/views/g) == "views"){
        docFragment.appendChild(group[element]);
      }
    }

    var group = document.getElementsByClassName("style-scope ytd-grid-video-renderer");
    for(element in group){
      if(group[element].innerText != null && group[element].tagName == "SPAN" && group[element].innerText.match(/views/g) == "views"){
        docFragment.appendChild(group[element]);
      }
    }

    viewsClass = docFragment.children;

    //LIKES
    var group = document.getElementsByClassName("style-scope ytd-toggle-button-renderer style-text");

    //use document fragment to create an html collection so this matches other collections
    var docFragment = document.createDocumentFragment();
    for(element in group){
      if(group[element].id == "text"){
        docFragment.appendChild(group[element]);
      }
    }

    //comment likes
    var group = document.getElementsByClassName("style-scope yt-formatted-string")

    for(element in group){
      if(group[element].innerText != null){
        str = group[element].innerText;
        //clean input
        str = str.replace('M','').replace('K','').replace('.','').replace(',','').trim();
        if(str.match(numbers)){
          docFragment.appendChild(group[element]);
        }
      }
    }

    //comment numbers
    var group = document.getElementsByClassName("style-scope ytd-comment-action-buttons-renderer")

    for(element in group){
      if(group[element].id == "vote-count-middle"){
        docFragment.appendChild(group[element]);
      }
    }

    likesClass = docFragment.children;


    //FOLLOWS
    var docFragment = document.createDocumentFragment();
    var subCountNode = document.getElementById("owner-sub-count");
    if(subCountNode != null){
      docFragment.appendChild(subCountNode);
    }

    //for the channel pages
    var subCountNode = document.getElementById("subscriber-count");
    if(subCountNode != null){
      docFragment.appendChild(subCountNode);
    }

    followsClass = docFragment.children;

  }
  //TWITTER
  else if(window.location.hostname === "twitter.com"){
    var docFragment = document.createDocumentFragment();

    var group = document.getElementsByClassName("css-901oao css-16my406 r-poiln3 r-bcqeeo r-qvutc0");

    for(element in group){
      if(group[element].innerText != null){
        str = group[element].innerText;
        //clean input
        str = str.replace('M','').replace('K','').replace('.','').replace(',','').replace("Tweets", "").trim();
        if(str.match(numbers)){
          docFragment.appendChild(group[element]);
        }
      }
    }


    likesClass = docFragment.children;

  }

  return [likesClass, viewsClass, followsClass];
}

/*
function: removeQuant
description: calls removeElementsByClass, which removes the nodes from the page
input:
- likesClass (HTMLCollection) all the nodes which are like values
- viewsClass (HTMLCollection) all the nodes which are view values
- followsClass (HTMLCollection) all the nodes which are follow values
output: none
*/
function removeQuant(likesClass, viewsClass, followsClass){
  removeElementsByClass(likesClass);
  removeElementsByClass(viewsClass);
  removeElementsByClass(followsClass);

}

/*
function: removeElementsByClass
description: creates a while loop to remove the nodes from the HTMLCollection
input:
- elements (HTMLCollection) contains the ndoes to be removed
output: none
*/
function removeElementsByClass(elements){
  if(elements != null){
    while(elements[0]) {
        elements[0].parentNode.removeChild(elements[0]);
    }
  }
}
