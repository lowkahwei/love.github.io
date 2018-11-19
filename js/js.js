window.onload = function(){
	var stars = [], 	
		maxStars = 3000,
		count = 0;		

	var c = document.getElementById("cv"),	
		gc = c.getContext("2d"),
		w = c.width = window.innerWidth,
		h = c.height = window.innerHeight;

	var starC = document.createElement("canvas"),
		gc2 = starC.getContext("2d");
		starC.width = 100;
		starC.height = 100;

	var half = starC.width / 2,
		gd = gc2.createRadialGradient(half,half,0,half,half,half);
		gd.addColorStop(0.02,"#ccc");
		gd.addColorStop(0.1,"blue");
		gd.addColorStop(0.3,"transparent");
		gc2.fillStyle = gd;
		gc2.beginPath();
		gc2.arc(half,half,half,0,Math.PI*2);
		gc2.fill();
		gc2.closePath();

	function star(){
		this.range = this.random(Math.max(w,h)*1.2);	//范围
		this.size = this.random(120,this.range) /8;		//星星的大小
		this.X = w/2;									//X中心点
		this.Y = h/2;									//Y中心点
		this.round = this.random(360);					//随机旋转点
		this.speed = this.random(80,this.range)/100000;	//随机速度
		this.alpha = this.random(10)/10;				//随机透明度

		stars[count] = this;
		count++;
	}
	star.prototype = {
		draw:function(){
			var x = Math.cos(this.round)*this.range+this.X,
				y = Math.sin(this.round)*this.range+this.Y,
				twinkle = this.random(2);		//闪烁

			if (twinkle == 1 && this.alpha > 0) {//1 = 透明度剃减
				this.alpha -= 0.05;
			}else if(twinkle == 2 && this.alpha < 1){//2 = 透明度剃增
				this.alpha +=0.05;
			}

			gc.globalAlpha = this.alpha;
			gc.drawImage(starC,x-this.size/2,y-this.size/2,this.size,this.size);
			this.round += this.speed;
		},
		random:function(x,y){
			if (arguments.length < 2) {
				y = x;
				x = 0;
			}else if(x > y){
				x += y;
				y = x-y;
				x -= y;
			}
			return Math.floor(Math.random()*(y-x+1))+x;
		}
	}

	for (var i = 0; i < maxStars; i++) {
		new star();
	}

	function animation(){
		gc.globalCompositeOperation = 'source-over';
  		gc.globalAlpha = 0.5;
		gc.fillStyle = 'black';
		gc.fillRect(0,0,w,h);

		for (var i = 0; i < stars.length; i++) {
			stars[i].draw();
		}

		window.requestAnimationFrame(animation);
	};

	animation();
}