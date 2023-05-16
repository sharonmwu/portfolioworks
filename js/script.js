window.addEventListener('DOMContentLoaded' || 'load', function(){
    //to top
	var to_top=document.getElementById('to-top');
    if(to_top!=undefined){
        window.addEventListener('scroll', show_top);
        var timet;
        to_top.onclick=go_top;
    }
    
    function show_top(){
        if(window.pageYOffset>window.innerHeight){
            to_top.style.display='block';
            to_top.style.cursor='pointer';
            setTimeout(function(){to_top.style.opacity='1';}, 1);
            clearTimeout(timet);
            timet=null;
        }
        else if(window.pageYOffset<window.innerHeight){
            to_top.style.opacity='0';
            to_top.style.cursor='default';
            if(timet==null){
                timet=setTimeout(function(){
                    to_top.style.display='none';
                }, 500);
            }
        }
    }
	
	function go_top(){
		var b=window.pageYOffset/50;
		window.onwheel=function(e){e.preventDefault();};
		var t=setInterval(function(){
			window.scrollBy(0,-b);
			if(window.pageYOffset==0){
				clearInterval(t);
				window.onwheel=null;
			}
		},10)
	}
	
	//fade
	var elfade=document.getElementsByClassName('fade');
	function fade(){
		for(a=0; a<elfade.length; a++){
            elfade[a].style.opacity='1';
		}
	}
	setTimeout(fade, 1);
	
	//contact
	var form=document.getElementsByTagName('form')[0];
	if(form!==undefined){
		document.getElementsByName('submit')[0].onclick=send;
    }
	
	var er;
	function send(e){
		e.preventDefault();
		var name=document.getElementsByName('name')[0].value;
		var subject=document.getElementsByName('subject')[0].value;
		var email=document.getElementsByName('email')[0].value;
		var message=document.getElementsByName('message')[0].value;
		
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function(){
			clearTimeout(er);
			if (this.readyState == 4 && this.status == 200) {
				if(this.responseText=='sent'){
					form.innerHTML='<div class="msg-sent"><h3>Your message was sent.</h3><p>Thanks for message. I will try to reply to you as soon as possible.</p></div>';
				}
				else{
					document.getElementById("msg").innerHTML='<div class="msg">'+this.responseText+'</div>';
				}
			}
			else if(this.status == 0){
				er=setTimeout(function(){document.getElementById("msg").innerHTML='<div class="msg">Message cannot be send due to connection timeout. Please check your internet connection.</div>';}, 5000);
			}
			else{
				er=setTimeout(function(){document.getElementById("msg").innerHTML='<div class="msg">Message cannot be send. ('+xhttp.status.toString()+')</div>';}, 5000);
			}
		};
		xhttp.open("POST", "contact.php", true);
		xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhttp.send('name='+name+'&subject='+subject+'&email='+email+'&message='+message);
	}
});