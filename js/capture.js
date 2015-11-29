$(function() {
  var interval = 1000;
  var video = document.querySelector('video');
  var canvas = document.querySelector('canvas');
  var ctx = canvas.getContext('2d');
  var localMediaStream = null;

  var analyzing = false;
  var lang = "ja-JP";
  if(typeof window.sessionStorage !== undefined) {
    lang = window.sessionStorage.getItem("lang");
  }
  

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

      analyzing = true;
      detectFromCanvasData(canvas, function(data) {
        if (data.candidates && data.candidates.length > 0) {
          var tts = new SpeechText();
          tts.onend = function() {
            console.log("読み上げ終了");
          };

          var item = data.candidates[0].detail.itemName;
          tts.speech(item, lang);
          $("#text").text(item);
        } else {
          console.log("該当データがありませんでした。");
        }
        analyzing = false;
      }, function(data){
        console.log("エラーが発生しました" + data);
        analyzing = false;
      });
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

  var ihandle;
  var startCapture = function() {
    ihandle = setInterval(function(){
      if (!(analyzing || speechSynthesis.speaking)) {
        snapshot();
        console.log("sanapshot!!");
      }
     }, interval);
  }

  startWatch();
  startCapture();

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
