$(function() {
  var interval = 3000;
  var video = document.querySelector('video');
  var canvas = document.querySelector('canvas');
  var ctx = canvas.getContext('2d');
  var localMediaStream = null;

  //カメラ使えるかチェック
  var hasGetUserMedia = function() {
    return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia || navigator.msGetUserMedia);
  }
  //エラー
  var onFailSoHard = function(e) {
    console.log('エラー!', e);
  };

  //カメラ画像キャプチャ
  var snapshot = function() {
    if (localMediaStream) {
      ctx.drawImage(video, 0, 0);
      document.querySelector('img').src = canvas.toDataURL('image/webp');
    }
  }

  if (hasGetUserMedia()) {
    console.log("カメラ OK");
  } else {
    alert("未対応ブラウザです。");
  }

  var startWatch = function() {
    window.URL = window.URL || window.webkitURL;
    navigator.getUserMedia  = navigator.getUserMedia || navigator.webkitGetUserMedia ||
                  navigator.mozGetUserMedia || navigator.msGetUserMedia;

    navigator.getUserMedia({video: true}, function(stream) {
      video.src = window.URL.createObjectURL(stream);
      localMediaStream = stream;
    }, onFailSoHard);
  }

  var startCapture = function() {
    ihandle = setInterval(function(){
      snapshot();
      console.log("sanapshot!!");
     }, interval);
  }

  startWatch();
  startCapture();

  var ihandle;
  //ボタンイベント
  /*
  $("#capture").click(function() {
    snapshot();
  });
  */
  $("#stop").click(function() {
    localMediaStream.stop();
    localMediaStream = null;
    clearInterval(ihandle);
  });
  $("#start").click(function() {
    startWatch();
    startCapture();
  });
  $("video").click(function() {
    snapshot();
  });
});
