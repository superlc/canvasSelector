function Path(points,style){
	this.points = points;
	this.style = style;
}
function Stage(canvas,width,height){
	//获取传入的画布及绘画上下文
	this.canvas = canvas;
	this.context = canvas.getContext('2d');
	this.width = width;
	this.height = height;
	//路径集合
	this.paths = [];
}
Stage.prototype = {
	draw : function(){
		//对路径集进行绘制
		var ctx = this.context;
		var paths = this.paths;
		//清空画布
		ctx.clearRect(0,0,this.width,this.height);
		for(var i=0;i<paths.length;i++){
			//绘制路径集合中的路径
			ctx.beginPath();
			ctx.moveTo(paths[i].points[0].x,paths[i].points[0].y);
			for(var j=1;j<paths[i].points.length;j++){
				ctx.lineTo(paths[i].points[j].x,paths[i].points[j].y)
			}
			ctx.lineTo(paths[i].points[0].x,paths[i].points[0].y);
			ctx.fillStyle = paths[i].style;
			ctx.fill();
			ctx.closePath();
		}
	},
	addPath : function(p){
		//将新增的路径添加到路径集中进行管理
		this.paths.push(p);
	},
	listenMove : function(moveHander){
		var paths = this.paths;
		var ctx = this.context;
		var r_paths = [];
		this.canvas.addEventListener('mousemove',function(e){
			//清空画布
			ctx.clearRect(0,0,this.width,this.height);
			for(var i=0;i<paths.length;i++){
				//绘制路径集合中的路径
				ctx.beginPath();
				ctx.moveTo(paths[i].points[0].x,paths[i].points[0].y);
				for(var j=1;j<paths[i].points.length;j++){
					ctx.lineTo(paths[i].points[j].x,paths[i].points[j].y)
				}
				ctx.lineTo(paths[i].points[0].x,paths[i].points[0].y);
				ctx.fillStyle = paths[i].style;
				ctx.fill();
				ctx.closePath();
				if(ctx.isPointInPath(e.x,e.y)){
					//将捕获到该点的路径放到一个路径集合里面
					r_paths.push(paths[i]);
				}
			}
			//取最后一个路径（即层级最高的路径为选取的目标元素）
			moveHander(r_paths[r_paths.length -1]);
		});
	},
	listenClick : function(clickHander){
		var paths = this.paths;
		var ctx = this.context;
		var r_paths = [];
		this.canvas.addEventListener('click',function(e){
			//清空画布
			ctx.clearRect(0,0,this.width,this.height);
			for(var i=0;i<paths.length;i++){
				//绘制路径集合中的路径
				ctx.beginPath();
				ctx.moveTo(paths[i].points[0].x,paths[i].points[0].y);
				for(var j=1;j<paths[i].points.length;j++){
					ctx.lineTo(paths[i].points[j].x,paths[i].points[j].y)
				}
				ctx.lineTo(paths[i].points[0].x,paths[i].points[0].y);
				ctx.fillStyle = paths[i].style;
				ctx.fill();
				ctx.closePath();
				if(ctx.isPointInPath(e.x,e.y)){
					//将捕获到该点的路径放到一个路径集合里面
					r_paths.push(paths[i]);
				}
			}
			//取最后一个路径（即层级最高的路径为选取的目标元素）
			clickHander(r_paths[r_paths.length -1]);
		});
	}
};