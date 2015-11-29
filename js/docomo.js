(function(global) {
  var sendCanvasDataToDocomoAPI = function(canvasId, onSuccess, onError) {
    var canvas = document.getElementById(canvasId);

    var base64 = canvas.toDataURL('image/png'),
        bin = atob(base64.replace(/^.*,/, '')),
        buffer = new Uint8Array(bin.length);
    for (var i = 0; i < bin.length; i++) {
      buffer[i] = bin.charCodeAt(i);
    }

    $.ajax({
      type: "POST",
      url: "https://api.apigw.smt.docomo.ne.jp/imageRecognition/v1/recognize?APIKEY=67662f6d7273434b39324c71446f6b42794943383458416e417a6d766f474432324975352e38516c594a38&recog=product-all",
      data: buffer,
      contentType: false,
      processData: false,
      success: function(data) {
        console.log(data);
        if (onSuccess) {
          onSuccess(data);
        }
      },
      error: function(data) {
        console.log(data);
        if (onError) {
          onError(data);
        }
      }
    });
  };

  var hiraganize = function(text, onSuccess, onError) {
    $.ajax({
      type: "POST",
      url: "https://api.apigw.smt.docomo.ne.jp/gooLanguageAnalysis/v1/hiragana?APIKEY=67662f6d7273434b39324c71446f6b42794943383458416e417a6d766f474432324975352e38516c594a38",
      data: {
        output_type: "hiragana",
        sentence: text
      },
      success: function(data) {
        console.log(data);
        if (onSuccess) {
          onSuccess(data.converted);
        }
      },
      error: function(data) {
        console.log(data);
        if (onError) {
          onError(data);
        }
      }
    });
  };

  global.sendCanvasDataToDocomoAPI = sendCanvasDataToDocomoAPI;
  global.hiraganize = hiraganize;
})(this);
