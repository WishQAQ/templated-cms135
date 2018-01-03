function flip(){
	var current1 = $('div[name="current1"]').get(0);
	var current2 = $('div[name="current2"]').get(0);
	var c1_left= parseInt(current1.style.left);
	var c2_left= parseInt(current2.style.left);
	var moving1 = false,moving2 = false;
	var normal;//是否在移动中
	var r_1 , r_2 , c_1, c_2;
	var images = [];//预加载图片
	var image = new Image();image.src='./images/design_1_1.png';images.push(image);
	image = new Image();image.src='./images/design_1_2.png';images.push(image);
	image = new Image();image.src='./images/design_1_3.png';images.push(image);
	image = new Image();image.src='./images/design_1_4.png';images.push(image);
	image = new Image();image.src='./images/design_1_5.png';images.push(image);
	image = new Image();image.src='./images/design_1_6.png';images.push(image);
	image = new Image();image.src='./images/design_1_7.png';images.push(image);
	var args =[];//填充数据
	args.push({
		c1:'利用多张焦点图组成的幻灯片，多用来展现能够体现品牌的信息，同时因图片有较强的注意吸引能力，一般出现在首屏，能取得较好的用户关注。' ,
		c2:'<img src="'+images[0].src+'">' 
	});
	args.push({
		c1:'纯文字模块一般用于呈现不能用图片或者其他多媒体信息展现的内容，并会根据显示信息内容设定不同的格式。' ,
		c2:'<img src="'+images[1].src+'">' 
	});	
	args.push({
		c1:'图文模块用于展现可以用图片和文字两种形式内容的模块。' ,
		c2:'<img src="'+images[2].src+'">' 
	});	
	args.push({
		c1:'页面导航主要功能在于帮助用户更快到达目标页面，避免过于繁琐的点击行为，可以有效降低用户离开率，提升转化。' ,
		c2:'<img src="'+images[4].src+'">' 
	});
	args.push({
		c1:'子链接模块是依附于纯文字/图文模块的辅助功能，用于告知用户点击之后的展现信息，提升模块整体的点击率。' ,
		c2:'<img src="'+images[3].src+'">' 
	});	
	args.push({
		c1:'当一个页面上有多种不同类型信息的时候，需要通过导航条区分标识进行间隔。' ,
		c2:'<img src="'+images[5].src+'">' 
	});	
	args.push({
		c1:'考虑到移动设备的特性，需要在页面上面设置转化的入口，工具条很好地解决了该问题，同时固定位置悬浮特性也很好地起到了提醒的作用。' ,
		c2:'<img src="'+images[6].src+'">' 
	});
	var args_slide = [];
	for( t in args){
		args_slide.push({
			c1:createDiv(t,args[t].c1,current1,"current1",'designSlideText'),
			c2:createDiv(t,args[t].c2,current2,"current2",'')
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
	function move_hand(num){	//手动滑动
		r_1 = 100,r_2 = 100,c_1 = 100,c_2 = 100;//设置手动滑动速度
		clearInterval(normal);
		if(parseInt(current1.getAttribute("v")) > num){
			move(num,'left');//向左滚动
		}else if(parseInt(current1.getAttribute("v")) < num){
			move(num,'right');//向右滚动
		}else {//相对没有必要移动了
			return;
		}
	}
	function move_position(pos){//向左向右的小手
		r_1 = 100,r_2 = 100,c_1 = 100,c_2 = 100;//设置点击滑动速度	
		if(pos == 'right'){//点击向右的箭头
			num = parseInt(current1.getAttribute("v"))+ 1;
			if(num > args_slide.length){
				num = 1;
			}
		}else{//点击向左的箭头
			num = parseInt(current1.getAttribute("v"))- 1;
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
		window.designBtnOn( 1 , num - 1 );	// btn-status
		moving1 = true; moving2 = true; 
		setTimeout(moveC(num,position,args_slide[num-1].c1,current1),10);
		setTimeout(moveC(num,position,args_slide[num-1].c2,current2),200);
	}
	function moveC(num,position,args_slide,current){
		return function(){ 
			moveCommon(num,position,args_slide,current);
		}
    }
	function getDom(){
		current1 = $('div[name="current1"]').get(0);
		current2 = $('div[name="current2"]').get(0);
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
		if(name == 'current1'){
			moving1 = false;
		}else if(name == 'current2'){
			moving2 = false;
		}
	}
	function getLeft(curr){
		var name = curr.getAttribute("name");
		if(name == 'current1'){
			return c1_left;
		}else if(name == 'current2'){
			return c2_left;
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
	window.move_hand = move_hand;
	window.move_position = move_position;
}
head.load( '../static/js/jquery-1.7.1.min.js' , flip );