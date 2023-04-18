$(function(){
  let audioplayer = document.querySelector("#audio");
  //медиадата по умолчанию:
  if('mediaSession' in navigator){
    navigator.mediaSession.metadata = new MediaMetadata({
    artwork: [
      {src: 'images/ava.png', sizes: '512x512', type: 'image/png'},
      ]
    });
  }

  document.getElementById("audio").onended = function(){
    i++;
    if (i <= 3){
      a(i);
    }else{i--}
  }  
});

function initializeCastApi() {
  cast.framework.CastContext.getInstance().setOptions({
    receiverApplicationId: chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID
  });
};

let i = 0;

// let { mediaJSON } = require("./mediaList");

// let medialist = mediaJSON;

var medialist = [{
  "mediaArtist": "Blue Trey",
  "mediaTitle": "Чита-Дрита",
  "mediaAlbum": "#RusUTAU",
  "mediaArt": [
    {"src":"file/img/-k7K2Tok-20.jpg",
    "sizes":"675x450",
    "type":"image/jpeg"}
  ],
  "url": "file/audio/Чита-Дрита.mp3" 
},
{
  "mediaArtist": "Blue Trey",
  "mediaTitle": "Лишь шаурма (Cover)",
  "mediaAlbum": "#RusUTAU",
  "mediaArt": [
    {"src":"images/shaurma.png",
    "sizes":"521x659",
    "type":"image/png"}
  ],
  "url": "file/audio/лишь шаурма.mp3"
},
{
  "mediaArtist": "Blue Trey",
  "mediaTitle": "Addict (Cover)",
  "mediaAlbum": "#RusUTAU",
  "mediaArt": [
    {"src":"file/img/melt_mix-512.png",
    "sizes":"512x512",
    "type":"image/png"},
    {"src":"file/img/melt_mix-192.png",
    "sizes":"192x192",
    "type":"image/png"}
  ],
  "url": "file/audio/addict.mp3"
},
  {"mediaArtist": "Genki Tatsu",
    "mediaTitle": "Снова я напиваюсь",
    "mediaAlbum": "#RusUTAU",
    "mediaArt": [
      {"src": "images/Riot.bmp",
      "sizes":"100x100",
      "type":"image/png"}
  ],
  "url": "file/audio/sn.mp3"
}]
let mediaTitle = medialist[i].mediaTitle; let mediaArtist = medialist[i].mediaArtist; let mediaAlbum = medialist[i].mediaAlbum; let mediaArt = medialist[i].mediaArt;

function mediadata(){
  if('mediaSession' in navigator){
    navigator.mediaSession.metadata = new MediaMetadata({
    title: mediaTitle,
    artist: mediaArtist,
    album: mediaAlbum,
    artwork: [
      mediaArt[0]
      ]
    });
    navigator.mediaSession.setActionHandler('nexttrack', function(){i++;a(i);mediadata()});
    navigator.mediaSession.setActionHandler('previoustrack', function(){i--;a(i);mediadata()});
  }
}


function back() {i--;a(i);mediadata();$("#back").animate({borderRadius:"100px"}, 200).animate({borderRadius:"20px"}, 150);}
function next() {i++;a(i);mediadata();$("#next").animate({borderRadius:"100px"}, 200).animate({borderRadius:"20px"}, 150);}

function a(i, event){
  var mediaURL = window.location.origin + '/' + medialist[i].url;
  var audioplayer = document.querySelector("#audio");
  $("#audio").attr('src', mediaURL);
  audioplayer.play()
  .then(_ => {mediadata();})
  .catch(error => {console.log(error);});
  $(".audiojs").addClass('playing');

  mediaTitle = medialist[i].mediaTitle; mediaArtist = medialist[i].mediaArtist; mediaAlbum = medialist[i].mediaAlbum; mediaArt = medialist[i].mediaArt;
  
  if (i > 0){
    $("#back").removeAttr("disabled");
    $("#back").addClass("btn-primary");
    //$(".playlist>button:eq("+[i-1]+")").removeClass("btn-primary");
    $(".playlist>button:eq("+[i]+")").addClass("btn-primary");
  }else if (i <= 0){
    $("#back").attr("disabled","disabled");
    $("#back").removeClass("btn-primary");
    //$(".playlist>buton:eq("+[i-1]+")").removeClass("btn-primary");
  }
  if (i >= medialist.length - 1){//здесь меняется значение массива
    $("#next").attr("disabled","disabled");
    $("#next").removeClass("btn-primary");
    $(".playlist>button:eq("+[i]+")").addClass("btn-primary");
  }else if (i < medialist.length - 1) {
    $("#next").removeAttr("disabled");
    $("#next").addClass("btn-primary");
    $(".playlist>button:eq("+[i]+")").addClass("btn-primary");
  }

  $('#castButton').click(function() {
    var mediaURL = window.location.origin + '/' + medialist[i].url;
    var mediaInfo = new chrome.cast.media.MediaInfo(mediaURL, 'audio/mp3');
    var request = new chrome.cast.media.LoadRequest(mediaInfo);
    request.autoplay = true;
    chrome.cast.requestSession(function(session) {
      session.loadMedia(request, function() {
          console.log('Success!');
      }, function() {
          console.log('Error');
      });
    });
  });

}