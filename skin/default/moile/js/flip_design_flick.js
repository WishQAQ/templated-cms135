function flick(){
	var flick1 = $('div[name="flick1"]').get(0);
	var flick2 = $('div[name="flick2"]').get(0);
	var flick3 = $('div[name="flick3"]').get(0);
	var f1_left= parseInt(flick1.style.left);
	var f2_left= parseInt(flick2.style.left);
	var f3_left= parseInt(flick3.style.left);
	var moving1 = false,moving2 = false,moving3 = false;
	var normal;//是否在移动中
	var r_1 , r_2 , c_1, c_2;
	var images = [];//预加载图片
	var image = new Image();image.src='./images/design_2_1.png';images.push(image);
	image = new Image();image.src='./images/design_2_2.png';images.push(image);
	image = new Image();image.src='./images/design_2_3.png';images.push(image);
	image = new Image();image.src='./images/design_2_4.png';images.push(image);
	image = new Image();image.src='./images/design_2_5.png';images.push(image);
	var args =[];//填充数据
	args.push({
		c1:'相比于自动切换和点击切换，滑动切换增强了用户操作的主动性、同时提升了切换的便捷性。' ,
		c2:'滑动切换图片' ,
		c3:'<img src="'+images[0].src+'">' 
	});
	args.push({
		c1:'用户可以通过滑动进行页面之间的切换，节省用户寻址时间。' ,
		c2:'滑动切换页面',
		c3:'<img src="'+images[1].src+'">' 
	});	
	args.push({
		c1:'点击缩略图放大图片，减少了操作流程，一定程度上减少了因页面跳转带来的用户流失。' ,
		c2:'点击放大图片',
		c3:'<img src="'+images[2].src+'">' 
	});	
	args.push({
		c1:'区域点击能较大提升用户点击的效率，减少用户因定位点击区域造成的效率损失。' ,
		c2:'页面区域点击',
		c3:'<img src="'+images[3].src+'">' 
	});	
	args.push({
		c1:'点击加载更多一方面减少单张页面的非必要信息，让页面变得简洁，同时能减少页面间的跳转，降低因网速等原因造成的用户流失。' ,
		c2:'点击加载更多',
		c3:'<img src="'+images[4].src+'">' 
	});	
	var args_slide = [];
	for( t in args){
		args_slide.push({
			c1:createDiv(t,args[t].c1,flick1,"flick1",'designS6TextContent'),
			c2:createDiv(t,args[t].c2,flick2,"flick2",'designS6TextTitle'),
			c3:createDiv(t,args[t].c3,flick3,"flick3",'designS6ActionImg')
		});
	}
	function createDiv(id,v,c,name,cls){//创建第一个数据dom
		 var div=document.createElement("div");
		 div.setAttribute("v",parseInt(id)+1);
		 div.setAttribute("name",name);
		 div.className = cls;//"slideTitle";
		 div.style.opacity='0';
		 div.style.filter="alpha(opacity=0)";
		 div.style.position='absolute';
		 div.style.width=c.style.width;
		 div.innerHTML=v;
		 return div; 
	 }
	function move_hand_flick(num){//手动滑动
		r_1 = 100,r_2 = 100,c_1 = 100,c_2 = 100;//设置手动滑动速度
		clearInterval(normal);
		if(parseInt(flick1.getAttribute("v")) > num){
			move(num,'left');//向左滚动
		}else if(parseInt(flick1.getAttribute("v")) < num){
			move(num,'right');//向右滚动
		}else {//相对没有必要移动了
			return;
		}
	}
	function move_position_flick(pos){//向左向右的小手
		r_1 = 100,r_2 = 100,c_1 = 100,c_2 = 100;//设置点击滑动速度	
		if(pos == 'right'){//点击向右的箭头
			num = parseInt(flick1.getAttribute("v"))+ 1;
			if(num > args_slide.length){
				num = 1;
			}
		}else{//点击向左的箭头
			num = parseInt(flick1.getAttribute("v"))- 1;
			if(num <=0){
				num = args_slide.length;
			}
		}
		move(num,pos);
	}
	function move(num,position){//工具类
		if( moving1 || moving2){
			return; // //如果还在移动中，就不处理了
		}
		window.designBtnOn( 2 , num - 1 );	// btn-status
		moving1 = true; moving2 = true,moving3 = true; 
		setTimeout(moveC(num,position,args_slide[num-1].c1,flick1),10);
		setTimeout(moveC(num,position,args_slide[num-1].c2,flick2),10);
		setTimeout(moveC(num,position,args_slide[num-1].c3,flick3),10);
	}
	function moveC(num,position,args_slide,current){
		return function(){ 
			moveCommon(num,position,args_slide,current);
		}
    }
	function getDom(){
		flick1 = $('div[name="flick1"]').get(0);
		flick2 = $('div[name="flick2"]').get(0);
		flick3 = $('div[name="flick3"]').get(0);
	}
	function moveCommon(num,position,arg,curr){
		if(position=='right'){
			arg.style.left= getLeft(curr)+parseInt(curr.style.width)+'px';
			insertAfter(arg,curr);
		}else{ 
			arg.style.left= getLeft(curr)-parseInt(curr.style.width)+'px';
			curr.parentNode.insertBefore(arg,curr);
		}
		mv(curr,arg,position);
	}

	function mv(curr,repl,position){
		return position == 'left'?	mv_left(curr,repl):	mv_right(curr,repl);
	}
	function change_opacity_left(curr,repl){
		var width = parseInt(repl.style.width);
		var left = parseInt(repl.style.left);	 
		$(repl).animate({left:left+width/2+"px",opacity:0.1},{duration: r_1 ,easing :'linear'}).animate({left:left+width+"px",opacity:1},{ duration: r_2 ,complete:function(){$(curr).remove();setState(curr);}});
	}
	function change_opacity_right(curr,repl){
		var width = parseInt(repl.style.width);
		var left = parseInt(repl.style.left);
		$(repl).animate({left:left-width/2+"px",opacity:0.1},{duration: r_1 ,easing :'linear'}).animate({left:left-width+"px",opacity:1},{ duration: r_2 ,complete:function(){$(curr).remove();setState(curr);}});
	}
	function setState(curr){
		getDom();
		var name = curr.getAttribute("name");
		if(name == 'flick1'){
			moving1 = false;
		}else if(name == 'flick2'){
			moving2 = false;
		}else if(name == 'flick3'){
			moving3 = false;
		}
	}
	function getLeft(curr){
		var name = curr.getAttribute("name");
		if(name == 'flick1'){
			return f1_left;
		}else if(name == 'flick2'){
			return f2_left;
		}else if(name == 'flick3'){
			return f3_left;
		}
	}
	function mv_left(curr,repl){
		var width = parseInt(curr.style.width);
		var left = getLeft(curr);
		$(curr).animate({left:left+width/2+"px",opacity:0.1},{duration: c_1 ,easing :'linear'}).animate({left:left+width+"px",opacity:0},{ duration: c_2,easing :'linear',complete:function(){change_opacity_left(curr,repl)}});
	}
	function mv_right(curr,repl){
		var width = parseInt(curr.style.width);
		var left = getLeft(curr);
		$(curr).animate({left:left-width/2+"px",opacity:0.1},{duration: c_1 ,easing :'linear'}).animate({left:left-width+"px",opacity:0},{ duration: c_2,easing :'linear',complete:function(){change_opacity_right(curr,repl)}});
	}
	function insertAfter(newElement, targetElement){
		var parent = targetElement.parentNode;
		if (parent.lastChild == targetElement){
			parent.appendChild(newElement);
		}else{
			parent.insertBefore(newElement,targetElement.nextSibling);
		}
	}
	window.move_hand_flick = move_hand_flick;
	window.move_position_flick = move_position_flick;
}
head.load( '../static/js/jquery-1.7.1.min.js' , flick );