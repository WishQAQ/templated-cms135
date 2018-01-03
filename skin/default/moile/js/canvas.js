
(function(){
	var doc = document;
	var r 		= 82;
	var cot_f	= 0;
	var cot_s 	= 0;
	var normal_f;
	var normal_s;
	var $cvs_f 	= doc.getElementById( 'canvas_f' );
	var $cvs_s 	= doc.getElementById( 'canvas_s' );
	if( !$cvs_f || !$cvs_s ||!$cvs_f.getContext ){	//如果不支持H5
		$cvs_f.style.display='none';
		$cvs_s.style.display='none';
		return;
	}
	var ctx_f = $cvs_f.getContext("2d");
	var ctx_s = $cvs_s.getContext("2d");
	var draw = function( c ){
		c.strokeStyle="#C0C0C0";
		c.beginPath(); //先画第一个圆形
		c.arc(r, r, r, 0, Math.PI*2, true);
		c.stroke();
		c.beginPath();//画第二个圆
		c.fillStyle="RGB(235,235,235)";
		c.arc(r, r, r-4, 0,  Math.PI * 2, true);
		c.lineTo(r,r);
		c.closePath();
		c.fill();
		c.fillStyle="RGB(82,189,243)";
	}
	var changeRadians = function( c , cot , n,end ,cvs){
		return function(){
			if( cot > end ){
				clearInterval( n ); return;
			}
			c.clearRect(0, 0, cvs.width, cvs.height);
			draw(c);
			var radians_after = (-90-3.6*(cot+1)) * (Math.PI / 180);
			c.beginPath();//画第二个圆
			c.arc(r, r, r-8, Math.PI * -0.5,radians_after, true);
			c.lineTo(r,r);
			c.closePath();
			c.fill();
			cot++;
		}
	}
	draw(ctx_f);	//第一个圆圈
	normal_f = setInterval(changeRadians(ctx_f,cot_f,normal_f,57,$cvs_f),25);
	draw(ctx_s);	//第二个圆圈
	normal_s = setInterval(changeRadians(ctx_s,cot_s,normal_s,46,$cvs_s),20);
})();






















