$(function() {

	$("#nextPage").on("click", function(event) {
		var langID = "ja-JP";
	    langID = document.querySelector('#selectLang').value;
		if(window.sessionStorage !== null) {
			window.sessionStorage.setItem("lang", langID);
		}
		location.href = "view.html"
	});
	
});