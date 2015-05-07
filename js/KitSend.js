function getNextField($form){
	var j = 1;
	while( $form.find("input[name="+j+"]").length ){
		j++;
	}
	return j;
}

var customHandlers = [];

$(document).ready(function(){	
	var rePhone = /^\+\d \( \d \d \d \) \d \d \d - \d \d - \d \d$/,
		tePhone = '+7 ( 9 9 9 ) 9 9 9 - 9 9 - 9 9';

	$.validator.addMethod('customPhone', function (value) {
		return rePhone.test(value);
	});

	$(".ajax").parents("form").each(function(){     
		$(this).validate({
			validClass: "success",
			rules: {
				email: 'email',
				phone: 'customPhone'
			}
		});
		if( $(this).find("input[name=phone]").length ){
			$(this).find("input[name=phone]").mask(tePhone,{placeholder:" "});
		}
	});

	function whenScroll(){
		var scroll = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
		if( customHandlers["onScroll"] ){
			customHandlers["onScroll"](scroll);
		}
	}
	$(window).scroll(whenScroll);
	whenScroll();

	$(".fancy").each(function(){
		var $popup = $($(this).attr("data-block")),
			$this = $(this);
		$this.fancybox({
			padding : 0,
			content : $popup,
			openSpeed: 'fast',
			helpers: {
	         	overlay: {
	            	locked: true 
	         	}
	      	},
			beforeShow: function(){
				$popup.find(".custom-field").remove();
				if( $this.attr("data-value") ){
					var name = getNextField($popup.find("form"));
					$popup.find("form").append("<input type='hidden' class='custom-field' name='"+name+"' value='"+$this.attr("data-value")+"'/><input type='hidden' class='custom-field' name='"+name+"-name' value='"+$this.attr("data-name")+"'/>");
				}
				if( $this.attr("data-beforeShow") && customHandlers[$this.attr("data-beforeShow")] ){
					customHandlers[$this.attr("data-beforeShow")]($this);
				}
			},
			afterShow: function(){
				if( $this.attr("data-afterShow") && customHandlers[$this.attr("data-afterShow")] ){
					customHandlers[$this.attr("data-afterShow")]($this);
				}
			},
			beforeClose: function(){ 
				$("input.error").parent().removeClass("error");
				$("input.error,textarea.error").removeClass("error");
				if( $this.attr("data-beforeClose") && customHandlers[$this.attr("data-beforeClose")] ){
					customHandlers[$this.attr("data-beforeClose")]($this);
				}
			},
			afterClose: function(){
				if( $this.attr("data-afterClose") && customHandlers[$this.attr("data-afterClose")] ){
					customHandlers[$this.attr("data-afterClose")]($this);
				}
			}
		});
	});

	$(".b-go").click(function(){
		var block = $( $(this).attr("data-block") ),
			off = $(this).attr("data-offset")||0;
		$("body, html").animate({
			scrollTop : block.offset().top-off
		},800);
		return false;
	});

	$(".fancy-img").fancybox({
		padding : 0
	});
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
	$(".ajax").parents("form").submit(function(){
		$("input.success").parent().removeClass("error");
		$("input.error").parent().addClass("error");
  		if( $(this).find("input.error").length == 0 ){
  			var $this = $(this),
  				$thanks = $($this.attr("data-block"));

  			if( $this.attr("data-beforeAjax") && customHandlers[$this.attr("data-beforeAjax")] ){
				customHandlers[$this.attr("data-beforeAjax")]($this);
			}

  			$.ajax({
			  	type: $(this).attr("method"),
			  	url: $(this).attr("action"),
			  	data:  $this.serialize(),
				success: function(msg){
					if( msg == "1" ){
						window.location.assign("http://child:88/thanks.html");
					}else{
						$form = $("#b-popup-error");
					}

					if( $this.attr("data-afterAjax") && customHandlers[$this.attr("data-afterAjax")] ){
						customHandlers[$this.attr("data-afterAjax")]($this);
					}

					$this.find("input[type=text],textarea").val("");
					$.fancybox.open({
						content : $form,
						padding : 0
					});	
				}
			});
  		}
  		return false;
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


});