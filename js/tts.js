
function SpeechText () {};
/**
 * callback function[finish speech] definision
 */
SpeechText.prototype.onend = undefined;
/*
 * Speech string
 * @param {String} text : text to speech.
 */
SpeechText.prototype.speech = function(text) {
	
    // unsupported.
    if (!'SpeechSynthesisUtterance' in window) {
        alert('Web Speech API is not supported');
        return;
    }

    var syaberi = new SpeechSynthesisUtterance();
    syaberi.volume = 1;
    syaberi.rate = 1;
    syaberi.pitch = 1;
    syaberi.text = text;
    syaberi.lang = 'ja-JP';
    syaberi.onend = this.onend || function (event) {
        console.log('speech end. time=' + event.elapsedTime + 's');
    }
	
    speechSynthesis.speak(syaberi);
	
	console.log("speechText finished.");
};


