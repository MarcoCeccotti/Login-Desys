$(document).ready(function() {
	var time = 5000;

	var title = $("#title")[0].textContent;
	
	var url_param = window.location.href.split('title=')[1];
	
	if(url_param != null) {
		var values = url_param.split("%20");
		
		var url = "";
		values.forEach(function(value) {
			url += value + " ";
		});
		
		title += "<br />" + url;
	}
	
	$("#title").html(title);
	
	function toggle_visibility(id) {
		const e = $(id)[0];
		if(e.style.display == 'block') {
			e.style.display = 'none';
		} else {
			e.style.display = 'block';
		}
	}
	
	function sleep(time) {
		return new Promise((resolve) => setTimeout(resolve, time));
	}
	
	var logoutButtonAction = function logoutButtonAction() {
		$(".logout_div")[0].style.display = 'block';
		$("#logout_msg").text("Logging out");
    	
    	$(".logout_btn")[0].disabled = true;
    	
		sleep(time).then(() => {
			$(".logout_div")[0].style.display = 'none';
			$("#logout_msg").text("Logging out");
	    	
	    	document.location.href = "../Login/Login.html?popup=true";
		});
	}
	
    $(".logout_btn").click(logoutButtonAction);
    
    $(document).keypress(function(event) {
    	if(event.which == 13) {
    		logoutButtonAction();
        }
    });
});