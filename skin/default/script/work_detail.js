// JavaScript Document
$(function(){
	 $("#left_img").mCustomScrollbar({
		theme:"light-3",
         mouseWheelPixels:300
	});
	//产品图加载

	//关闭按钮
	var parent=$(window.parent.document);
	$('#work_close').click(function(){
		var iframe=parent.find('#iframe');
		iframe.css({'-webkit-animation':"iframeOut 0.4s .2s ease both",'-moz-animation':'iframeOut 0.4s .2s ease both','animation':'iframeOut 0.4s .2s ease both'});
		iframe.delay(500).animate({'top':'100%'},500,function(){
			parent.find('#content_wrap').css({'-webkit-animation':"contentIn 0.4s .2s ease both",'-moz-animation':'contentIn 0.4s .2s ease both','animation':'contentIn 0.4s .2s ease both'})
		});
		parent.find('#work_loading').css('display','none');
	});
    var window_w=$(window).width(),window_h=$(window).height(),num_zore=0;
	$('#left_img').css({'height':window_h-40+'px'});
    $(window).resize(function(){
        window_w=$(window).width();
		window_h=$(window).height();
		$('#left_img').css({'height':window_h-40+'px'});
    });
	//下一页
	function page_next(){
		var nextIframe=parent.find('#iframe iframe'),
			address=$('#left_img img:eq(0)').attr('src'),
			value = address.replace(/[^0-9]/ig,""),
			num=parseInt(value),
			value_after=num+2,
			work_length=19,
			work_last2=work_length-1;
		nextIframe.eq(2).css({'left':window_w+'px'});
		nextIframe.eq(2).animate({'left':num_zore+'px'},800);
		nextIframe.eq(1).animate({'left':-window_w+'px'},800,function(){
			if(num == work_length){
				value_after=2;
			}
			else if(num == work_last2){
				value_after=1;
			}

            nextIframe.eq(2).after('<iframe class="iframe_right" width="100%;" height="100%;" src="work_detail'+value_after+'.html"></iframe>');
            nextIframe.eq(2).addClass('iframe_center').removeClass('iframe_right');
            nextIframe.eq(1).addClass('iframe_left').removeClass('iframe_center');
            nextIframe.eq(0).remove();
		});
	}
	$('.work_next').click(function(){
        page_next();
	});
	//上一页
	function page_prev(){
		var prevIframe=parent.find('#iframe iframe'),
			address=$('#left_img img:eq(0)').attr('src'),
			value = address.replace(/[^0-9]/ig,""),
        	num=parseInt(value),
			value_before=num-2,
			work_length=19,
			work_last2=work_length-1;
		prevIframe.eq(0).css({'left':-window_w+'px'});
		prevIframe.eq(0).animate({'left':num_zore+'px'},800);
		prevIframe.eq(1).animate({'left':window_w+'px'},800,function(){
			if(num==2){
				value_before=work_length;
			}
			else if(num==1){
				value_before=work_last2;
			}
            prevIframe.eq(0).before('<iframe class="iframe_left" width="100%;" height="100%;" src="work_detail'+value_before+'.html"></iframe>');
            prevIframe.eq(1).addClass('iframe_center').removeClass('iframe_left');
            prevIframe.eq(2).addClass('iframe_right').removeClass('iframe_center');
            prevIframe.eq(3).remove();
		});
	}
	$('.work_prev').click(function(){
        page_prev();
	});
	//产品详细上下页hover效果
	$('.work_next').hover(function(){
        var next_text=$('.work_next_text');
		$('.work_prev').stop().animate({'left':'0px'},200);
		next_text.stop().animate({'left':'0px'},200,function(){
			next_text.css({'z-index':'1'});
			next_text.animate({'opacity':'1'},200);
		});
	},function(){
        var next_text=$('.work_next_text');
		$('.work_prev').stop().animate({'left':'50px'},200);
		next_text.stop().animate({'opacity':'0'},200,function(){
			next_text.css({'z-index':'-1'});
			next_text.animate({'left':'50px'},200);
		});
	});
	$('.work_prev').hover(function(){
        var prev_text=$('.work_prev_text');
		prev_text.css({'z-index':'1'});
		prev_text.stop().animate({'opacity':'1'},500);
	},function(){
		$('.work_prev_text').stop().animate({'opacity':'0'},500);
	});
    //产品详细关闭hover效果
	$('#work_close').hover(function(){
		$('.work_closeT').css({'-webkit-animation':"work_closeTout 0.4s .2s ease both",'-moz-animation':'work_closeTout 0.4s .2s ease both','animation':'work_closeTout 0.4s .2s ease both'});
		$('.work_closeC').animate({'opacity':'1'},'fast');
		$('.work_closeB').css({'-webkit-animation':"work_closeBout 0.4s .2s ease both",'-moz-animation':'work_closeBout 0.4s .2s ease both','animation':'work_closeBout 0.4s .2s ease both'});
	},function(){
		$('.work_closeT').css({'-webkit-animation':'work_closeT 0.4s .2s ease both','-moz-animation':'work_closeT 0.4s .2s ease both','animation':'work_closeT 0.4s .2s ease both'});
		$('.work_closeC').animate({'opacity':'0'},'slow');
		$('.work_closeB').css({'-webkit-animation':'work_closeB 0.4s .2s ease both','-moz-animation':'work_closeB 0.4s .2s ease both','animation':'work_closeB 0.4s .2s ease both'});
	});
});