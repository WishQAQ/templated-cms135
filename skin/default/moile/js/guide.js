/* lib */
function addEvent( node , eventType, handler , scope) {
	node = typeof node == 'string' ? document.getElementById(node) : node;
	scope = scope || node;
	if (document.all){
		node.attachEvent("on" + eventType,function() { handler.apply(scope, arguments)});
	}else{
		node.addEventListener(eventType, function() { handler.apply(scope, arguments)}, false);
	}
};
// 顶部泛光效果
(function(){
	var doc = document;
	var $ 	= document.getElementById( "topNav" );
	var funcId 	= null;
	var step 	= 13;
	var defaultX 	= 1;
	var curX		= defaultX;
	var destX 		= defaultX;
	var destY 		= -8;
	var map 		= {
		'1' : -1 ,
		'2' : 82 ,
		'3' : 185 ,
		'4' : 286 ,
		'5' : 393 ,
		'6' : 491 ,
		'7' : 581 ,
		'8' : 663
	};
	if( !$ ) return;
	var repos = function(){
		destX = defaultX;
	}
	var initX = function(){
		destX = defaultX;
		curX = defaultX;
	}
	var setBgPos = function( x , y ){
		x = x || curX;
		y = y || destY;
		$.style.backgroundPosition = x + 'px ' + y + 'px';
	}
	var setDefaultX = function( x ){
		defaultX = map[x] || x;
		initX();
		setBgPos();
	}
	var run = function(){
		if( Math.abs( destX - curX ) <= step ){
			curX = destX;
		}else if( curX > destX ){
			curX -= step;
		}else{
			curX += step;
		}
		setBgPos();
	}
	var moveEvent = function( e ){
		var n = this.getAttribute('meta');
		destX = map[n] || defaultX;
	}
	var outEvent = function( e ){
		repos();
	}
	var bindEvent = function(){
		var i;
		var cls = 'topNavItem';
		var C = $.children;
		for(i=0;i<C.length;i++){
			addEvent( C[i] , 'mousemove' , moveEvent );
			addEvent( C[i] , 'mouseout' , outEvent );
		}
	}
	var byPage = function(){
		var p = location.pathname;
		var files = ['_','index','design','content' , 'component' , 'optimize' , 'tool', 'api','case' ];
		var i;
		for(i=1;i<files.length;i++){
			if( p.indexOf(files[i] + '.html') > 0 ){
				setDefaultX( i );
				return;
			}
		}
	}
	var init = function(){
		bindEvent();
		funcId = setInterval( run , 15 );
		byPage();
	}
	init();
})();	// End 顶部泛光
// 底部浮动区域
(function(){
	var win = window;
	var doc = document;
	var docE= doc.documentElement;
	var $ 	= doc.getElementById( 'rocketDiv' );
	if( !$ ) return;
	var html = function(){
		var start 	= '<div class="pos-r">';
		var img 	= '<img id="rocket" src="./images/rocket.png" class="ptr" onclick="window.backTop && backTop();" />';
		var btn 	= '<a href="javascript:void(0);" onclick="window.backTop && backTop();" class="backtopBtn">回到顶部</a>';
		var link 	= 	'<a href="http://mobi.baidu.com/tg/mobcard_edit" target="_blank" class="mobiLink" >' +
							'<div class="mobiLinkTextBlack tac">立刻创建</div>' +
							'<div class="mobiLinkTextWhite tac">移动站</div>' +
						'</a>';
		var end 	= '</div>';
		return start + img + btn + link + end;
	}
	var resize = function(){
		var w = doc.body.clientWidth;
		var l = parseInt( w / 2 ) + 490;
		if( w > 1200 ){
			$.style.left = l + 'px';
			$.style.right = '';
		}else{
			$.style.left = '';
			$.style.right = '0';
		}
	}
	var scroll = function(){
		var t = doc.body.scrollTop || ( docE ? docE.scrollTop : 0 );
		if( t <= 800 ){
			$.style.display = 'none';
		}else{
			$.style.display = 'block';
		}
	}
	var backTop = function(){
		doc.body.scrollTop = 0;
		docE && ( docE.scrollTop = 0 );
	}
	$.innerHTML = html();
	addEvent( win , 'resize' , resize );
	addEvent( win , 'scroll' , scroll );
	setTimeout( resize , 200 );
	setTimeout( scroll , 400 );
	window.backTop = backTop;
})();
// 鼠标提示浮层
(function(){
	var c = 'on-Hover';
	var x = 0;
	var y = 0;
	var doc = document;
	var $	= doc.createElement( 'div' );
	var docE= doc.documentElement;
	var getTop = function(){
		return parseInt( docE ? docE.scrollTop : doc.body.scrollTop );
	}
	var move = function( e ){
		var t = e.srcElement || e.target;
		if( t.tagName == 'DIV' && t.className.indexOf(c) <= 0 ){
			hide();return;
		}else if( t.tagName == 'A' && t.href.indexOf('javascript:void(0)') < 0 ){
			hide();return;
		}
		e = e || window.event;
		x = e.pageX || ( e.clientX + doc.body.scrollLeft - doc.body.clientLeft );
		y = e.pageY || ( e.clientY + getTop() );
		x += 13;
		if( $.style.display === 'block' ){
			$.style.left = x + 'px';
			$.style.top = y + 'px';
		}
	}
	var setText = function( t ){
		t = t || '<div class="buidling"></div>';
		$.innerHTML = '<div class="wrapper">' + t + '</div>';
	}
	var show = function(){
		$.style.display = 'block';
	}
	var hide = function(){
		$.style.display = 'none';
	}
	var bind = function(id,t){
		var node = ( typeof id == 'string' ) ? doc.getElementById( id ) : id;
		if( !node ) return;
		if( node.className.indexOf(c) < 0 ){
			node.className += ' ' + c;
		}
		setText( t );
		addEvent( node , 'mousemove' , show );
		addEvent( node , 'mouseout' , hide );
	}
	// init
	$.id 	= 'hoverTip';
	$.className = 'hoverTip';
	// event
	addEvent( doc , 'mousemove' , move );
	//bind( 'topNavItem_7' );
	//bind( 'topNavItem_8' );
	// add
	doc.body.appendChild( $ );
	window.hideHoverTip = hide;
	window.bindHoverTip = bind;
})();
// 按钮状态、文本切换、福尔摩斯
(function(){
	var win = window;
	var curCntIndex = 1;
	var curCntSection = 1;
	function p( t ){
		return '<div class="p">' + t + '</div>';
	}
	function cntIntroSection( title , _p , _i , style ){
		var P = '';
		var i = 0;
		for(;i<_p.length;i++){
			P += p( _p[i] );
		}
		_i = _i || 1;
		style = style || '';
		return '<div class="cntIntroSection cntIntroSection_' + _i + '" style="' + style + '" >' +
					'<div class="cntIntroTitle">' + title + '</div>' +
					'<div class="cntIntroContent">' +
						P +
					'</div>' +
				'</div>';
	}

	// home-on
	win.homeSlideBtnOn = function( i ){
		if( i < 0 ) return;
		if( !win.jQuery ) return;
		var $B = $('.homeBtn');
		var $b = $('.homeBtn_' + i );
		var $c = null;
		$B.each(function(){
			$(this).removeClass('homeBtnOn');
			$c = this.children;
			if( $c && $c[0] ){
				$c[0].className = 'off';
			}
		});
		$b.addClass('homeBtnOn');
		$c = $b.children();
		if( $c[0] ){
			$c[0].className = 'on';
		}
	}
	// switchBtn-on
	win.designBtnOn = function( boxI , btnI ){
		var boxCls 	= '.designBox_' + boxI;
		var cls 	= 'switchBtnOn';
		$( boxCls + ' .' + cls ).removeClass( cls);
		var $c = $( boxCls ).children();
		if( $c[ btnI ] ){
			$( $c[ btnI ] ).addClass( cls );
		}
	}
	// cntTextBtn-on
	win.cntTextBtnOn = function( i ){
		var boxCls 	= 'cntS4TextBtnBox';
		var cls 	= 'cntS4TextBtnOn';
		var pre 	= 'cntS4TextBtn';
		$( '.' + boxCls + ' .' + cls ).removeClass( cls ).addClass( pre );
		$( '.' + pre + '_' + i ).addClass( cls );
	}
	win.cntSwitchBtnOn = function( i ){
		var boxCls 	= 'switchBtnBox';
		var cls 	= 'switchBtnOn';
		var pre 	= 'switchBtn';
		$( '.' + boxCls + ' .' + cls ).removeClass( cls ).addClass( pre );
		$( '.' + pre + '_' + i ).addClass( cls );	
	}
	var cntTextFunc = {};
	cntTextFunc['1'] = function(){
		var s = curCntSection;
		if( s == 1 ){
			return 	cntIntroSection('机构信息' , ['机构LOGO' , '机构名称' , '结构介绍' ] , 1 ) +
					cntIntroSection('机构环境' , ['环境图片' , '环境描述'  ] , 1 );
		}else if( s == 2 ){
			return 	cntIntroSection('机构信息' , ['机构LOGO' , '机构名称' , '结构介绍' ] , 1 );
		}else if( s == 3 ){
			return 	cntIntroSection('机构信息' , ['机构LOGO' , '机构名称' , '结构介绍' ] , 1 );
		}
		return '';
	}
	cntTextFunc['2'] = function(){
		var s = curCntSection;
		var style = '';
		if( s == 1 ){
			style = 'width:248px;';
			return 	cntIntroSection('机构提供的服务' , ['服务基本信息：名称、图片和价格等' , '服务详细信息：目标人群、方案/技术等' , '成功案例信息：成功案例信息' , '用户评论信息：用户评论信息' , '用户常见问题：Q/A' ] , 2 , style ) +
					cntIntroSection('机构提供的活动' , ['打折' , '优惠' , '.......' ] , 2 , style );
		}else if( s == 2 ){
			style = 'width:270px;';
			return 	cntIntroSection('机构提供的产品' , ['产品基本信息：名称、图片和价格等等' , '产品功能信息：参数、特征，功能等' , '产品优势信息：认证、荣誉等' , '产品其他信息：售后、配送、评论、问答等' ] , 2 , style ) +
					cntIntroSection('机构提供的活动' , ['打折' , '优惠' , '.......' ] , 2 , style );
		}else if( s == 3 ){
			style = 'width:308px;';
			return 	cntIntroSection('机构提供的服务（旅游）' , ['服务基本信息：路线名称、路线图片和路线价格等' , '服务其他信息：出发地点、行程安排、费用说明等' ] , 2 , style ) +
					cntIntroSection('机构提供的服务（票务）' , ['服务基本信息：票务名称、票务图片和票务价格等' , '服务其他信息：演出地点、演出时间、演出内容等' ] , 2 , style );
		}
		return '';
	}
	cntTextFunc['3'] = function(){	// 信任模块
		var s = curCntSection;
		var style = '';
		if( s == 1 ){
			style = 'width:364px;';
			return	cntIntroSection('机构专家团队' , ['专家基本信息：姓名、图片、职务等' , '专家详细信息：专家资质、专业领域、获得的荣誉和认证等' ] , 3 , style ) +
					cntIntroSection('机构获得的荣誉认证' , ['相关的图片' , '相关的说明/描述' ] , 3 , style );
		}else if( s == 2 ){
			style = 'width:130px;';
			return	cntIntroSection('技术实力/创新技术' , ['相关的图片' , '相关的说明/描述' ] , 3 , style ) +
					cntIntroSection('机构获得的荣誉认证' , ['相关的图片' , '相关的说明/描述' ] , 3 , style );
		}else if( s == 3 ){
			style = 'width:129px;';
			return cntIntroSection('机构获得的荣誉认证' , ['相关的图片' , '相关的说明/描述' ] , 3 , style );
		}
		return '';
	}
	cntTextFunc['4'] = function(){
		return cntIntroSection('' , ['联系电话' , '短信功能' , '在线沟通' , '查看地图/地址' ] , 4 );
	}
	win.cntTextChange = function( opt ){
		var i = ( typeof opt == 'number' ) ? opt : parseInt( this.getAttribute( 'index' ) );
		var cnt = '';
		if( cntTextFunc[i] ){
			cnt = cntTextFunc[i]();
		}
		curCntIndex = i;
		cntTextBtnOn( i );
		$('#m2 .cntSection_4 .cntIntroTextBox').html( cnt );
	}
	win.cntSectionSwitch = function( i ){
		cntSwitchBtnOn(i);
		var btnPre = 'cntS4TextBtn_';
		var $b2 	= $( '.' + btnPre + '2 span' );
		if( i == 2 ){
			$b2.text( '产品相关' );
		}else{
			$b2.text( '服务相关' );
		}
		curCntSection = i;
		cntTextChange( curCntIndex );
	}
	win.bestBtnOn = function( boxI , btnI ){
		var boxCls = 'bestBtnBox_' + boxI;
		var btnCls = 'smallSwitchBtn';
		var suffix = [];
		var $b 	= [];
		var i;
		suffix[1] = 'First';
		suffix[2] = 'Mid';
		suffix[3] = 'Last';
		// clean
		for(i=1;i<=3;i++){
			$b[i] = $('.' + boxCls + ' .btn_' + i );
			$b[i].removeClass( btnCls + suffix[i] + 'On').addClass( btnCls + suffix[i] );
		}
		// set
		if( $b[ btnI ] ){
			$b[ btnI ].removeClass( btnCls + suffix[ btnI] ).addClass( btnCls + suffix[ btnI ] + 'On' );
		}
	}
	function styleFix(){
		var b = $.browser;
		var $homeW = $('.homePhoneWrapper');
		
	}
	head.load( '../static/js/jquery-1.7.1.min.js' , function(){
		// home-btn-status
		$('.homeBtn_1').mouseenter(function(){ homeSlideBtnOn(1) });
		$('.homeBtn_2').mouseenter(function(){ homeSlideBtnOn(2) });
		$('.homeBtn_3').mouseenter(function(){ homeSlideBtnOn(3) });
		$('.homeBtn_4').mouseenter(function(){ homeSlideBtnOn(4) });
		$('.homeBtn_5').mouseenter(function(){ homeSlideBtnOn(5) });
		$('.homeBtn_6').mouseenter(function(){ homeSlideBtnOn(6) });
		$('.homeBtn_7').mouseenter(function(){ homeSlideBtnOn(7) });
		$('.homeBtn_8').mouseenter(function(){ homeSlideBtnOn(8) });
		// content-text
		$('.cntS4TextBtn_1').mouseenter( cntTextChange );
		$('.cntS4TextBtn_2').mouseenter( cntTextChange );
		$('.cntS4TextBtn_3').mouseenter( cntTextChange );
		$('.cntS4TextBtn_4').mouseenter( cntTextChange );
		cntTextChange(1);
		styleFix();
	});
	// holmes-tong-ji
	head.js('./js/holmes.js');
})();