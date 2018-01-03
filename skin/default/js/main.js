	$(function(){
		/*导航*/
		$('.nav li a').hover(function(){
			$(this).parent().animate({"backgroundColor":"#2a2a2a"})
			$(this).find('a').animate({"color":"#dedede"});
		},function(){
			$(this).parent().animate({"backgroundColor":"#232323"});
			$(this).find('a').animate({"color":"#999"});
		});
		
		$(".top-weixin-3g li").hover(function () {						 
			$(this).find('.sub-wx-cp,.sub-wx-text').css({"visibility":"visible"});
			$(this).find('a').addClass("current");
			},function (){
				$(this).find('.sub-wx-cp,.sub-wx-text').css({"visibility":"hidden"});
				$(this).find('a').removeClass("current");
		});
		
		$(".banner-list li").width($(window).width());
		$('#banner-box').slides({
			generateNextPrev: false,
			generatePagination:false,
			paginationClass:"banner-nav",
			container: 'banner-list',
			play: 5000,
			pause:3000,
			effect:"fade",
			slideEasing:"easeInOutQuart",
			slidesLoaded: function() {
			DD_belatedPNG.fix('.png,.png img, .png li');	
			},
			animationStart: function(current){
			//$("#slider-text").text($("#slider-list li").eq(current-1).find('span').text());
			$('.t-d').animate({
				top:100,left:0
			});
			$('.animate-img').animate({top:150,right:0});
			DD_belatedPNG.fix('.png,.png img, .png li');
		},
			animationComplete: function(current){
				$('.t-d').animate({top:180,left:0});
				$('.animate-img').animate({top:150,right:50});
				DD_belatedPNG.fix('.png,.png img, .png li');
			}
		})
		
		/*首页新闻*/
		$('.index-news-box').slides({
			generateNextPrev: false,
			generatePagination:false,
			paginationClass:"index-news-btn",
			container: 'index-news-list',
			play: 8000,
			effect:"slider",
			next:'news-btn-prev',
			prev:'news-btn-next',
			slideEasing:"easeInCubic"
		});
		/*首页案例展示 按钮*/
		$('#case-prev').hover(function(){
			$(this).animate({"backgroundPosition":"left -25px"})							   
		},function(){
			$(this).animate({"backgroundPosition":"left 0px"})		
		})
		$('#case-next').hover(function(){
			$(this).animate({"backgroundPosition":"right -25px"})							   
		},function(){
			$(this).animate({"backgroundPosition":"right 0px"})		
		})
		$("#gotop").hover(function(){
			$(this).animate({"backgroundPositionY":"-50px"})							   
		},function(){
			$(this).animate({"backgroundPositionY":"0px"})	
		})
		$("#case-scroll li,.case-list li,.other-case li").hover(function(){
			$(this).find('.img-opac-box').show();
			$(this).animate({"borderColor":"#727272"})
			//$(this).find('.case-info').animate({"backgroundColor":"#d2d2d2","color":"#fff"});
			$(this).find('.detail').animate({"right":"122px","opacity":"1"},'','easeInOutQuart');
			$(this).find('.link,.link_visible').animate({"left":"122px","opacity":"1"},'','easeInOutQuart');
		},function(){
			$(this).find('.img-opac-box').hide();
			$(this).find('.link,.link_visible').animate({"left":"-32px","opacity":"0"},'','easeInOutQuart');
			$(this).find('.detail').animate({"right":"-32px","opacity":"0"},'','easeInOutQuart');
			//$(this).find('.case-info').animate({"backgroundColor":"#f7f7f7","color":"#5e5e5e"});
			$(this).animate({"borderColor":"#efefef"})
		})
		
		$(".prev2").hover(function(){
			$(this).animate({"left":"0px"})						   
		},function(){
			$(this).animate({"left":"-94px"})	
		})
		$(".next2").hover(function(){
			$(this).animate({"right":"0px"})						   
		},function(){
			$(this).animate({"right":"-94px"})	
		})
		
		$(".other-case-list li").hover(function(){
			$(this).find('img').show();										
		},function(){
			$(this).find('img').hide();		
		})
		$('.service-list-box').hover(function(){
			//$(this).find('.user-pannel').animate({'bottom':"0px"})									  
		},function(){
			$(this).find('.user-pannel').animate({'bottom':"-225px"})		
		})
		$(".other-case-link").click(function(){
			$(this).parent().find('.user-pannel').animate({'bottom':"0px"})	
			//$('.service-other-case-list').jCarouselLite({btnNext:'.btn-next',btnPrev:'.btn-prev',visible:1,speed:1000,auto:0,scroll:1,vertical:false,easing:"",mouseWheel: true});					
			$(this).parent().find('.service-other-case-list').jCarouselLite({btnNext:'.btn-next',btnPrev:'.btn-prev',visible:1,speed:500,auto:0,scroll:1,vertical:false,easing:"",mouseWheel: true});
			//alert($(this).find('.service-other-case-list li a').html());
		})
		$('#case1').jCarouselLite({btnNext:'.btn-next',btnPrev:'.btn-prev',visible:1,speed:500,auto:0,scroll:1,vertical:false});		
		$('.article-prev').hover(function(){
			$(this).animate({'left':'-100px'});
			$('.article-prev-title').animate({'bottom':'0px'})	
		},function(){
			$(this).animate({'left':'0px'});
			$('.article-prev-title').animate({'bottom':'-40px'})
		})
		$('.news-btn-prev,.news-btn-next').hover(function(){
			$(this).animate({"backgroundColor":"#5e5e5e","color":"#fff"})												  
		},function(){
			$(this).animate({"backgroundColor":"#f5f5f5","color":"#5e5e5e"})	
		})
		$('#case-scroll').hover(function(){
										 //alert('ss');
			$('#case-prev').animate({"left":"0px","opacity":"1"})	
			$('#case-next').animate({"right":"0px","opacity":"1"})
		},function(){
			$('#case-prev').animate({"left":"-40px","opacity":"0"})
			$('#case-next').animate({"right":"-40px","opacity":"0"});		
		})
		$('#case-prev,#case-next').hover(function(){
			$(this).animate({"backgroundColor":"#444","color":"#fff"},'','',100)										  
		},function(){
			$(this).animate({"backgroundColor":"#222","color":"#fff"},'','',100)	
		})
	
		$('.partner img').hover(function(){
			$(this).animate({"opacity":"1"})								 
		},function(){
			$(this).animate({"opacity":"0.4"})	
		}) 
		$('.more a').hover(function(){
			$(this).animate({"backgroundColor":"#838383","color":"#fff"})
		},function(){
			$(this).animate({"backgroundColor":"#fff","color":"#333"})	
		})
		
		$('.subpage-news-list img').hover(function(){
			$(this).animate({"opacity":"0.8"})							   
		},function(){
			$(this).animate({"opacity":"1"})				
		})
		$(".tabs-title li").each(function(index){
			$(this).click(function(){
				var current_a = $(this);
				setTimeout(function(){
					current_a.addClass("current").siblings().removeClass("current");
					$(".tabs-list-content").eq(index).show().siblings().hide();
				},100);
			})
		});
		$(".mobile-tabs-title li").each(function(index){
			$(this).click(function(){
				var current_a = $(this);
				setTimeout(function(){
					current_a.addClass("current").siblings().removeClass("current");
					$(".mobile-tabs-list").eq(index).show().siblings().hide();
				},100);
			})
		});
		
		$("#khd_tabs span").each(function(index){
			$(this).click(function(){
				var current_a = $(this);
				setTimeout(function(){
					current_a.addClass("current").siblings().removeClass("current");
					$(".khd-tabs-box-list").eq(index).show().siblings().hide();
				},100);
			})
		});
		
		
		$(window).scroll(function(){						  
			if($(this).scrollTop() > 300){
				$("#gotop").fadeIn();
			}else{
				$("#gotop").fadeOut();
				}
		})
		$("#gotop").click(function(){ $('body,html').animate({scrollTop:0},500);})

  });

function uaredirect(murl){
try {
		if(document.getElementById("bdmark") != null){
			return;
		}
		var urlhash = window.location.hash;
		if (!urlhash.match("fromapp")){
			if ((navigator.userAgent.match(/(iPhone|iPod|Android|ios|iPad)/i))) {
					location.replace(murl);
			}
		}
	} catch(err){}
};
//top
        $(function () {
            $("#back-to-top").click(function(){
                $('body,html').animate({scrollTop:0},2000);
                return false;
            });
        });
