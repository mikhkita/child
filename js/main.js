$(document).ready(function(){	


	$("input").focus(function(){
		$(this).parent().removeClass("error");
		$(this).removeClass("error");
		$(this).css("border-right","1px solid #FFDC49");  
		$(this).parent().css("border","1px solid #FFDC49");
		// #feeca1
	});
	
	$("input").focusout(function(){
		$(this).css("border-right","1px solid #CDCDCD");  
		$(this).parent().css("border","1px solid #CDCDCD");
		// #feeca1
	});
	$("textarea").focus(function() {
		$(this).removeClass("error");
		$(this).css("border","1px solid #FFDC49"); 
	});
	$("textarea").focusout(function(){
		$(this).css("border","1px solid #CDCDCD");  
		// #feeca1
	});

	$(".b-9 ul").each(function(){
  		for (var i = 3; i < $(this).find("li").length; i++) {
  			$(this).find("li").eq(i).hide();
		};
	});

  	$("#full").click(function(){
  		if( !$(this).hasClass("active") ){
  			$(this).addClass("active");
	  		$("#preview").removeClass("active");
	  		$(".b-9 ul").each(function(){
		  		for (var i = 3; i < $(this).find("li").length; i++) {
		  			$(this).find("li").eq(i).slideDown();
		  		};
	  		});
	  		
  		}
  		return false;
  	});

  	$("#preview").click(function(){
  		if( !$(this).hasClass("active") ){
  			$(this).addClass("active");
	  		$("#full").removeClass("active");
	  		$(".b-9 ul").each(function(){
		  		for (var i = 3; i < $(this).find("li").length; i++) {
		  			$(this).find("li").eq(i).slideUp();
		  		};
	  		});
	  		$(this).css("height","auto");
  		}
  		return false;
  	});

  	$(".s-show").click(function(){
  		if(!$(this).hasClass("active")) {
	  		$(this).addClass("active");
	  		var block = $(this).attr("data-show");
	  		$(block).slideDown();
  		} else {
  			$(this).removeClass("active");
	  		var block = $(this).attr("data-show");
	  		$(block).slideUp();
  		}
  		return false;
  	});

  	$(".s-hide").click(function(){
	  		var block = $(this).attr("data-hide");
	  		$(".s-show[data-show='"+block+"']").removeClass("active");
	  		$(block).slideUp();
	  		return false;
  	});
   
   	$(".b-qtip").qtip({
   		// style:{
   		// 	tip:{
   		// 		width: 300
   		// 	}
   		// },
        position: {
            my: 'bottom center',
            at: 'top center',
            container: $('.b-qtip')
        },
        style: {
            classes: 'qtip-light qtip-shadow qtip-rounded'
        },
        show: {
            delay: 0
        }
    });

    $(".b-qtip-2").qtip({
   		// style:{
   		// 	tip:{
   		// 		width: 300
   		// 	}
   		// },
        position: {
            my: 'bottom center',
            at: 'top center',
            container: $('.b-qtip-2')
        },
        style: {
            classes: 'qtip-light qtip-shadow qtip-rounded'
        },
        show: {
            delay: 0
        }
    });

     if( window.location.hash != "" ){
        $("body, html").animate({
            scrollTop : $(".b-scroll[data-name="+window.location.hash+"]").offset().top
        },800);
    }

    function whenScroll(){
        var scroll = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop,
              $items = $(".b-scroll");
            for(var i = $items.length-1; i >= 0; i--){
                // console.log($items.eq(i).offset().top - 80);
                if( scroll > $items.eq(i).offset().top -100){
                    if( $items.eq(i).attr("data-name") != window.location.hash ){
                        window.location.hash = $items.eq(i).attr("data-name");
                    }
                    return true;
                }
            }
    }
    $(window).scroll(whenScroll);
    whenScroll();

});