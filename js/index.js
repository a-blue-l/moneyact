$(function(){
	// 执行动画函数
	window.RAF = (function(){
		return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {window.setTimeout(callback, 1000 / 60); };
	})();
	// 数组添加方法
	Array.prototype.foreach = function(callback){
		for(var i = 0; i < this.length; i ++){
			callback.apply(this[i], [i]);
		}	
	}
	Array.prototype.remove = function(val){
		var index = this.indexOf(val);
		if(index > -1){
			this.splice(index, 1);
		}
	}
	// 图片加载

	//配置
	var data = {
		posY: 0,
		posYt: 0
	}
	var start = 1;
	var timer = 15;
	var money_arr = [];
	var down_arr = [];
	var floor_money;
	var random;
	var random_actual = 1;
	var old_map = 1;
	var money_down = 2;
	var my_money = 0;
	var moneybigWidth = window.innerWidth / 1.4;
	var moneybigHeight = window.innerWidth;
	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');
	var one_money = new Image();
	var five_money = new Image();
	var ten_money = new Image();
	var back_money = new Image();
	var down_one = new Image();
	var down_five = new Image();
	var down_ten = new Image();
	var backwidth,backheigh;
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	var setcookie = localStorage.getItem('startscond');
	;
	(function(){
		back_money.addEventListener('load',function(event){
			backwidth = back_money.width = event.path[0].width/1.7;
			backheight = back_money.height = event.path[0].height/1.7;
		},false)
		one_money.addEventListener('load',function(event){
			one_money.width = event.path[0].width/1.7;
			one_money.height = event.path[0].height/1.7;
		},false)
		one_money.src = 'http://test.i-ev.com/Public/money/images/one_money.png';
		five_money.src = 'http://test.i-ev.com/Public/money/images/five_money.png';
		ten_money.src = 'http://test.i-ev.com/Public/money/images/ten_money.png';
		back_money.src = 'http://test.i-ev.com/Public/money/images/one_money.png';
		down_one.src= 'http://test.i-ev.com/Public/money/images/down-1.png';
		down_five.src= 'http://test.i-ev.com/Public/money/images/down-5.png';
		down_ten.src= 'http://test.i-ev.com/Public/money/images/down-10.png';
	})()
	var sprite = function(top,left){
		this.width = 0;
		this.height = 0;
		this.top = top;
		this.left = left;
	}
	var downmoney = function(top,left){
		this.width = 60;
		this.height = 60;
		this.top = top;
		this.left = left;
	}
	sprite.prototype = {
		draw:function(sprite){
			if(sprite.map == 1){
				ctx.drawImage(one_money, sprite.left, sprite.top, moneybigWidth, moneybigHeight);
			}else if(sprite.map == 5){
				ctx.drawImage(five_money, sprite.left, sprite.top, moneybigWidth, moneybigHeight);
			}else if(sprite.map == 10){
				ctx.drawImage(ten_money, sprite.left, sprite.top, moneybigWidth, moneybigHeight);
			}
			if(sprite.falg == 'true'){
				sprite.top -= 20;
				if(sprite.top < -(canvas.height + one_money.height)){
					sprite.falg = 'false';
					sprite.top = canvas.height - one_money.height;
				}
			}
		},
		drawnext:function(sprite){
			if(sprite.map == 1){
				ctx.drawImage(one_money, sprite.left, sprite.top, moneybigWidth, moneybigHeight);
			}else if(sprite.map == 5){
				ctx.drawImage(five_money, sprite.left, sprite.top, moneybigWidth, moneybigHeight);
			}else if(sprite.map == 10){
				ctx.drawImage(ten_money, sprite.left, sprite.top, moneybigWidth, moneybigHeight);
			}
			old_map = random_actual;
		}
	}
	downmoney.prototype = {
		draw:function(sprite){
			if(sprite.map == 0){
				ctx.drawImage(down_one, sprite.left, sprite.top, 60, 60);
			}else if(sprite.map == 1){
				ctx.drawImage(down_five, sprite.left, sprite.top, 60, 60);
			}else if(sprite.map == 2){
				ctx.drawImage(down_ten, sprite.left, sprite.top, 60, 60);
			}
			if(sprite.falg == 'true'){
				sprite.top += sprite.random;
				sprite.left += sprite.randomnew;
				if(sprite.top > canvas.height){
					sprite.falg = 'false';
					sprite.top = -canvas.height/3*Math.random();
					sprite.left = canvas.width*Math.random();
				}
			}
		}
	}
	var init = {
		updata: function(){
			ctx.clearRect(0,0,canvas.width,canvas.height);
			down_arr.foreach(function(){
				this.draw(this);
			})
			ctx.drawImage(back_money, (canvas.width - moneybigWidth)/2, canvas.height - moneybigHeight, moneybigWidth, moneybigHeight);
			floor_money.drawnext(floor_money);
			money_arr.foreach(function(){
				if(this.falg == 'true'){
					this.draw(this);
				}
			})
		},
		loop: function(){
			var _this = this;
			this.updata();
			RAF(function(){
				_this.loop();
			})
		},
		start: function(){
			for( var i = 0; i < 20; i ++ ){
				var money_this = new sprite(canvas.height - moneybigHeight,(canvas.width - moneybigWidth)/2);
				money_this.falg = 'false';
				money_this.map = 1;
				money_arr.push(money_this);
			}		
			for( var i = 0; i < 50; i ++ ){
				var down_money = new downmoney(-canvas.height/4*Math.random(),canvas.width*Math.random());
				down_money.falg = 'false';
				down_money.map = Math.floor(Math.random()*3);
				down_arr.push(down_money);
			}
			floor_money = new sprite(canvas.height - moneybigHeight,(canvas.width - moneybigWidth)/2);
			floor_money.map = 1;
			this.loop();
		}
	}
	$(document).on('touchmove',function(e){
		e.preventDefault(); 
	})
	function touchstar(){
		if(start == 2){
			random = Math.random();
			if(random >= 0.55 ){
				random_actual = 1;
			}else if(random < 0.55 && random > 0.2){
				random_actual = 5;
			}else if(random <= 0.2){
				random_actual = 10;
			}
			my_money += old_map;
			// 手速太快
			if(my_money >= 500){
				my_money = 500;
				timer = 0;
				start = 3;
				$('.endfirst').text('恭喜您的手速已经突破天际了！');
				endgame();
			}
			// 最终money
			$('.moneynumber').text('¥ '+my_money);
			floor_money.map = random_actual;
			var m = 0;
			for(var i = 0; i < down_arr.length; i ++){
				if(down_arr[i].falg == 'false'){
					down_arr[i].falg = 'true';
					down_arr[i].random = Math.random()*10 + 5;
					down_arr[i].randomnew = Math.random()*10-5;
					m += 1;
					if(m > 6){
						break;
					}
				}
			}
			for(var i = 0; i < money_arr.length; i ++){
				if(money_arr[i].falg == 'false'){
					money_arr[i].falg = 'true';
					money_arr[i].map = old_map;
					break;
				}
			}
		}
	}
	$('.gamecontent').bind('touchstart',function(ev){
		var Yone = ev.targetTouches[0].pageY;
		data.posY = Yone;
		$('.gamecontent').bind('touchmove',function(e){
			var Ytwo = e.targetTouches[0].pageY;
			data.posYt = Ytwo;
			if((data.posYt - data.posY) < -50){
				touchstar();
				$('.gamecontent').unbind('touchmove');
			}
		})
	})
	$('.gamecontent').on('touchend',function(){
		$('.gamecontent').unbind('touchmove');
	})
	//游戏开始倒计时
	function startgame(){
		$('.onceprompt').css({display:'none'});
		$('.countdown').css({display:'block'});
		var cutdowntime = setTimeout(function(){
			clearTimeout(cutdowntime);
			$('.countdown').css({display:'none'});
			start = 2;
			timeout();
		},3000)
	}
	// 时间倒计时
	function timeout(){
		var timenumber = setInterval(function(){
			timer --;
			if( timer <= 0 ){
				clearInterval(timenumber);
				timer = 0;
				start = 3;
				endgame();
			}
			$('.timenumber').text(timer+'"');
		},1000);
	}
	// 游戏结束
	function endgame(){
		$('.endgame').css({display:'block'});
		$('.moneybig').text(my_money);
	}
	// start
	$('.start').on('touchstart',function(e){
		$('.home-page').css({display:'none'});
		$('.onceprompt').css({opacity:1});
		if( setcookie === 'true' ){
			startgame();
		}
	})
	// 点击我知道了
	$('.ikown').on('touchstart',function(){
		localStorage.setItem('startscond',true);
		startgame();
	})
	// 重置函数
	function reset(){
		$('.endgame').css({display:'none'});
		$('.timenumber').text('15"')
		timer = 15;
		$('.moneynumber').text('¥ 0');
		my_money = 0;
	}
	// 判断联系方式
	function isPhone(phone){
		var Phonetest = /((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)/;
		return Phonetest.test(phone);
	}
	// 排行榜
	$('.regallist').on('touchstart',function(){
		$('.rankinglist-box').css({display:'block'});
	})
	$('.rankinglist-box').on('touchstart',function(){
		$('.rankinglist-box').css({display:'none'});
	})
	$('.rankinglist,.rules-text,.formbox').on('touchstart',function(e){
		e.stopPropagation();
	})
	// 活动规则
	$('.activity').on('touchstart',function(){
		$('.activity-rules').css({display:'block'});
	})
	$('.activity-rules').on('touchstart',function(){
		$('.activity-rules').css({display:'none'});
	})
	// 奖项兑换
	$('.bonusbtn').on('click',function(){
		$('.form-list').css({display:'block'});
	})
	$('.form-list').on('touchstart',function(){
		$('.form-list').css({display:'none'});
	})
	// 返回首页
	$('.returnhome').on('click',function(){
		$('.home-page').css({display:'block'});
		reset();
	})
	// 再来一次
	$('.oncemore').on('click',function(){
		reset();
		startgame();
	})

	// 提交信息
	$('.submitbtn').on('touchstart',function(){
		var name,mobile,address;
		if( $('#name').val() ){

		}else{
			alert('请输入姓名');
			return;
		}
		if( isPhone($('#mobile').val()) ){
			mobile = $('#mobile').val();
		}else{
			alert('请输入姓名');
			return;
		}
		if( $('#address').val() ){

		}else{
			alert('请输入地址');
			return;
		}
		alert('提交成功');
	})
	// loading
	var images = new Array();
	var t,i = 0;
	var loadedimages = 0;
	function preload(arr){
		var arr=(typeof arr!="object")? [arr] : arr;
		function imgload(){
			loadedimages ++;
			$('.loadtext').text( parseInt((Number(loadedimages/arr.length))*100) + '%' );
	        if (loadedimages==arr.length){
	        	clearInterval(t);
        		$('.loading').css({display:'none'});
				init.start();
	        }
		}
		function fortest(){
			images[i] = new Image();
			images[i].src = arr[i];
			images[i].onload = function(){
				imgload();
			}
			i++;
		}
		t = setInterval(fortest,80);
	}
	preload(
		[
			'images/activitybtn.png',
			'images/bonusbtn.png',
			'images/bottom_img.png',
			'images/code-btnbg.png',
			'images/down-1.png',
			'images/down-5.png',
			'images/down-10.png',
			'images/formcode-text.png',
			'images/form-libg.png',
			'images/form-name.png',
			'images/homepage_light.png',
			'images/homepage_name.png',
			'images/homepagebg.png',
			'images/ikoenbg.png',
			'images/listone.png',
			'images/listthree.png',
			'images/listtwo.png',
			'images/moneynumber.png',
			'images/mydatabg.png',
			'images/oncemore.png',
			'images/one_money.png',
			'images/promptarrow.png',
			'images/prompthand.png',
			'images/rankinglist.png',
			'images/rankname.png',
			'images/red-bg.png',
			'images/redbigbg.png',
			'images/regallistbtn.png',
			'images/returnhome.png',
			'images/rulesbg.png',
			'images/rules-name.png',
			'images/startbtn.png',
			'images/submitbtn.png',
			'images/ten_money.png',
			'images/timenumber.png',
			'images/top_cloud.png'
		]
	)
})