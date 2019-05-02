$(document).ready(function() {
	var time = 5000;
	
	var jsonObj;
	
	var title;

	var popup = window.location.href.split('popup=')[1];
	
	function toggle_visibility(id) {
		const e = $(id)[0];
		if(e.style.display == 'block') {
			e.style.display = 'none';
		} else {
			e.style.display = 'block';
		}
	}
	
	function disableAll(button, link_href, input_user, input_pwd) {
		$(button)[0].disabled = true;
		
		$(link_href)[0].href = "javascript:void(0)";
		
		$(input_user)[0].disabled = true;
		$(input_pwd)[0].disabled = true;
	}
	
	function abilitateAll(button, link_href, link, input_user, input_pwd) {
		$(button)[0].disabled = false;
    	$(link_href)[0].href = link;

    	$(input_user)[0].disabled = false;
    	$(input_pwd)[0].disabled = false;
	}
	
	if(popup == "true") {
		$(".login_failed")[0].style.display = 'block';
		$("#login_msg").text("Logged out");

		var link = $(".forgot_password_link")[0].href;
    	disableAll(".loginbtn", ".forgot_password_link", "#input_user", "#input_pwd");
    	
		sleep(time).then(() => {
			$(".login_failed")[0].style.display = 'none';
			$("#login_msg").text("Utente e/o password errate");
			
			abilitateAll(".loginbtn", ".forgot_password_link", link, "#input_user", "#input_pwd");
		});
	}
	
	function checkInputValue(input) {
		if(input === "" || input.indexOf("{") > -1 || input.indexOf("}") > -1 || input.indexOf("\\") > -1) {
			return false;
		}
		
		return true;
	}
	
	$(".forgot_password_link").click(function() {
		if($(".forgot_password_link")[0].href != "javascript:void(0)") {
			$("#login_failed")[0].style.display = 'none';
		}
	})

	function sleep(time) {
		return new Promise((resolve) => setTimeout(resolve, time));
	}
	
	function jsonFetch() {
	    var xhttp = new XMLHttpRequest();
	    xhttp.onreadystatechange = function() {
	         if(xhttp.readyState == 4 && xhttp.status == 200) {
	        	 jsonObj = JSON.parse(xhttp.responseText);
	        	 title = jsonObj["title"];
	         }
	    };
	    xhttp.open("GET", 'https://jsonplaceholder.typicode.com/posts/1', true);
	    xhttp.send();
	}
	
	var loginButtonAction = function loginButtonAction() {
		$("#login_msg").text("Logging in");
		$(".login_failed")[0].style.display = 'block';

		var link = $(".forgot_password_link")[0].href;
    	disableAll(".loginbtn", ".forgot_password_link", "#input_user", "#input_pwd");
    	
    	jsonFetch();
        
		sleep(time).then(() => {
			var username = $('#input_user').val();
	        var password = $('#input_pwd').val();
	        
	        if(checkInputValue(username) && checkInputValue(password)) {
	        	if(password === "desystest") {
	        		document.location.href = "../Logout/Logout.html?title=" + title;
	        	} else {
	        		$("#login_msg").text("Utente e/o password errate");
					
			    	abilitateAll(".loginbtn", ".forgot_password_link", link, "#input_user", "#input_pwd");
	        	}
	        } else {
        		$("#login_msg").text("Utente e/o password errate");
				
		    	abilitateAll(".loginbtn", ".forgot_password_link", link, "#input_user", "#input_pwd");
	        }
		});
	}
	
    $(".loginbtn").click(loginButtonAction);
    
    $(document).keypress(function(event) {
    	if(event.which == 13) {
            loginButtonAction();
        }
    });
});