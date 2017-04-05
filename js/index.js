$(function(){
	alert(1)
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
	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');
	var one_money = new Image();
	var five_money = new Image();
	var ten_money = new Image();
	var back_money = new Image();
	var down_one = new Image();
	var down_five = new Image();
	var down_ten = new Image();
	var backWidth,backHeigh;
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	var setcookie = localStorage.getItem('startscond');
	console.log(setcookie)
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
		one_money.src = 'images/one_money.png';
		five_money.src = 'images/five_money.png';
		ten_money.src = 'images/ten_money.png';
		back_money.src = 'images/one_money.png';
		down_one.src= 'images/down-1.png';
		down_five.src= 'images/down-5.png';
		down_ten.src= 'images/down-10.png';
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
				ctx.drawImage(one_money, sprite.left, sprite.top, one_money.width, one_money.height);
			}else if(sprite.map == 5){
				ctx.drawImage(five_money, sprite.left, sprite.top, one_money.width, one_money.height);
			}else if(sprite.map == 10){
				ctx.drawImage(ten_money, sprite.left, sprite.top, one_money.width, one_money.height);
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
				ctx.drawImage(one_money, sprite.left, sprite.top, one_money.width, one_money.height);
			}else if(sprite.map == 5){
				ctx.drawImage(five_money, sprite.left, sprite.top, one_money.width, one_money.height);
			}else if(sprite.map == 10){
				ctx.drawImage(ten_money, sprite.left, sprite.top, one_money.width, one_money.height);
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
			ctx.drawImage(back_money, (canvas.width - back_money.width)/2, canvas.height - back_money.height, back_money.width, back_money.height);
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
				var money_this = new sprite(canvas.height - one_money.height,(canvas.width - one_money.width)/2);
				money_this.falg = 'false';
				money_this.map = 1;
				money_arr.push(money_this);
			}		
			for( var i = 0; i < 50; i ++ ){
				var down_money = new downmoney(-canvas.height/3*Math.random(),canvas.width*Math.random());
				down_money.falg = 'false';
				down_money.map = Math.floor(Math.random()*3);
				down_arr.push(down_money);
			}
			floor_money = new sprite(canvas.height - one_money.height,(canvas.width - one_money.width)/2);
			floor_money.map = 1;
			this.loop();
		}
	}
	init.start();
	touch.on($(document),'swipeup',function(){
		if(start == 2){
			random = Math.floor(Math.random()*3);
			if(random == 0){
				random_actual = 1;
			}else if(random == 1){
				random_actual = 5;
			}else if(random == 2){
				random_actual = 10;
			}
			my_money += old_map;
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
	})
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
	function endgame(){
		ctx.clearRect(0,0,canvas.width,canvas.height);
		$('.endgame').css({display:'block'});
		$('.moneybig').text(my_money);
	}
	// start
	$('.start').click(function(e){
		$('.home-page').css({display:'none'});
		$('.onceprompt').css({opacity:1});
		localStorage.setItem('startscond',true);
		if( setcookie === 'true' ){
			startgame();
		}
	})
	$('.ikown').click(function(){
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
	$('.regallist').click(function(){
		$('.rankinglist-box').css({display:'block'});
	})
	$('.rankinglist-box').click(function(){
		$('.rankinglist-box').css({display:'none'});
	})
	$('.rankinglist,.rules-text,.formbox').click(function(e){
		e.stopPropagation();
	})
	// 活动规则
	$('.activity').click(function(){
		$('.activity-rules').css({display:'block'});
	})
	$('.activity-rules').click(function(){
		$('.activity-rules').css({display:'none'});
	})
	// 奖项兑换
	$('.bonusbtn').click(function(){
		$('.form-list').css({display:'block'});
	})
	$('.form-list').click(function(){
		$('.form-list').css({display:'none'});
	})
	// 返回首页
	$('.returnhome').click(function(){
		$('.home-page').css({display:'block'});
		reset();
	})
	// 再来一次
	$('.oncemore').click(function(){
		reset();
		startgame();
	})
	// 提交信息
	$('.submitbtn').click(function(){
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
})
