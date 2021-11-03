

//create form

document.getElementById('instagram').addEventListener("click", setGlobalVariables);
document.getElementById('youtube').addEventListener("click", setGlobalVariables);
document.getElementById('twitter').addEventListener("click", setGlobalVariables);

setChecked();


function setGlobalVariables(){
    chrome.storage.sync.set({
      instagram: document.getElementById('instagram').checked,
      youtube: document.getElementById('youtube').checked,
      twitter: document.getElementById('twitter').checked
    }, function() {console.log('checkbox values set')});

    instagram = document.getElementById('instagram').checked;
    youtube = document.getElementById('youtube').checked;
    twitter = document.getElementById('twitter').checked;
}


function setChecked(){
    chrome.storage.sync.get(['instagram'], function(result) {
      console.log(result.instagram);
      document.getElementById('instagram').checked =  result.instagram;
    });

    chrome.storage.sync.get(['youtube'], function(result) {
      document.getElementById('youtube').checked =  result.youtube;
    });

    chrome.storage.sync.get(['twitter'], function(result) {
      document.getElementById('twitter').checked =  result.twitter;
    });


}
