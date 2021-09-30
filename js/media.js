$(function(){
  /*audiojs.events.ready(function(){
    audiojs.createAll();
  });*/
  /*header('Cache-Control: no-cache, no-store, must-revalidate');
  header('Pragma: no-cache');
  header('Explires: 0');*/ //это был кэш
  let audioplayer = document.querySelector("#audio");
  //медиядата по умолчанию:
  if('mediaSession' in navigator){
    navigator.mediaSession.metadata = new MediaMetadata({
    artwork: [
      {src: 'images/ava.png', sizes: '512x512', type: 'image/png'},
      ]
    });
  }

document.getElementById("audio").onended = function(){
    i++;
    if (i <= 4){
      a(i);
    }else{i--}
  }

});

let playlist = ['file/melt_mix.mp4', 'file/лишь шаурма.mp3', 'file/addict.mp3', 'file/sn.mp3'];
let i = 0;

var medialist = [{
    "mediaArtist": "Blue Trey",
    "mediaTitle": "Melt2Mix (Cover)",
    "mediaAlbum": "#RusUTAU",
    "mediaArt": [
      {"src":"file/melt_mix-512.png",
      "sizes":"512x512",
      "type":"image/png"}
    ]},
  {"mediaArtist": "Blue Trey",
    "mediaTitle": "Лишь шаурма (Cover)",
    "mediaAlbum": "#RusUTAU",
    "mediaArt": [
      {"src":"images/shaurma.png",
      "sizes":"521x659",
      "type":"image/png"}
    ]},
    {"mediaArtist": "Blue Trey & Uro",
      "mediaTitle": "Addict (Cover)",
      "mediaAlbum": "#RusUTAU",
      "mediaArt": [
        {"src": "images/ava.png",
        "sizes":"512x512",
        "type":"image/png"}
      ]},
      {"mediaArtist": "Kouji Akira",
        "mediaTitle": "Снова я напиваюсь (Cover)",
        "mediaAlbum": "#RusUTAU",
        "mediaArt": [
          {"src": "images/ava.png",
          "sizes":"512x512",
          "type":"image/png"}
        ]},
  ]
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
  var audioplayer = document.querySelector("#audio");
  $("#audio").attr('src', playlist[i]);
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
  if (i >= playlist.length-1){//здесь меняется значение массива
    $("#next").attr("disabled","disabled");
    $("#next").removeClass("btn-primary");
    $(".playlist>button:eq("+[i]+")").addClass("btn-primary");
  }else if (i < playlist.length-1) {
    $("#next").removeAttr("disabled");
    $("#next").addClass("btn-primary");
    $(".playlist>button:eq("+[i]+")").addClass("btn-primary");
  }
}
