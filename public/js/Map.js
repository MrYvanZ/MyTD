 //地图绘制类
var Map = {
	//画出地图
	draw : function(map,img){
		var i,j;
	
		for(i = 0; i <20;i++){
			
			for(j = 0;j<20;j++){
				//画背景地图
				if(MapData[i][j] == 0){
					if((j%2 == 0 && i%2 !=0)||(j%2!=0&&i%2==0))
						map.drawImage(img,0,0,60,60,i*50,j*50,50,50);
					else
						map.drawImage(img,60,0,60,60,i*50,j*50,50,50);

				}
                //画可以走的路
				else{
					var img2 = $("#map-gezi2")[0];
					map.drawImage(img2,0,0,60,60,i*50,j*50,50,50);
				}
			}
		}
	},
	randomMap: function (r,c) {
			//初始化数组
			function init(r,c)
			{
				var a = new Array(r);
				//全部置0
				for(var i=0,len=a.length;i<len;i++)
				{
					var cols = c;
					a[i]= new Array(cols);
					for(var j= 0;j<cols;j++){
						a[i][j] = 0;
					}
				}
				return a;
			}
			//处理数组，产生最终的数组
			function process(arr)
			{
				var maxX= c-2;
				var maxY = r-1;
				var nowY,nowX,reX,reY,X, Y,newArr=[];
				newArr.push([0,1]);
				nowX = Math.ceil(Math.random()*maxX);
				X = nowX;
				reX = nowX;
				nowY = Math.ceil(Math.random()*maxY/2);
				Y = nowY+1;
				reY = nowY;
				newArr.push([X,Y]);
				while(Y!=maxY){
					if(reY < 0 && reX > 0){
						nowX = Math.ceil(Math.random()*(maxX-X-1)+1);
					}
					else if(reY < 0 && reX <= 0){
						nowX = Math.ceil(Math.random()*(X-2)+1);
					}
					else if(reY > 0){
						var m = (maxX-X)-(X-1);
						if(m >= 0)
							nowX = Math.ceil(Math.random()*(maxX-X-1)+1);
						else
							nowX = Math.ceil(Math.random()*(X-2)+1)*(-1);
						//if(reY < 2)
						//	nowY = Math.ceil(Math.random()*(maxY/2-1))+1;
						//else if(reX >0&&(maxX-X)<3)
						//	nowY = Math.ceil(Math.random()*(maxY/2-1))+1;
						//else if(reX<0&&(X-1)<3)
						//	nowY = Math.ceil(Math.random()*(maxY/2-1))+1;
						//else
						//	nowY = Math.ceil(Math.random()*reY-1)*(-1);
					}
					reX = nowX;
					X = X +nowX;
					if(reY < 0)
						nowY = Math.ceil(Math.random()*(maxY/2-1))+1;
					else{
						if(reY < 2)
							nowY = Math.ceil(Math.random()*(maxY/2-1))+1;
						else if(reX >0&&(maxX-X)<3)
							nowY = Math.ceil(Math.random()*(maxY/2-1))+1;
						else if(reX<0&&(X-1)<3)
							nowY = Math.ceil(Math.random()*(maxY/2-1))+1;
						else
							nowY = Math.ceil(Math.random()*reY-1)*(-1);
					}


					reY = nowY;
					Y = Y +nowY;
					if(Y>=maxY){
						Y=maxY;
					}
					newArr.push([X,Y]);
				}
				console.log(newArr);
				setroad(arr,newArr);
				//for(var i= 0;i<newArr.length;i++){
				//	arr[newArr[i][1]][newArr[i][0]] = 1;
				//	for(var x = 0;x<newArr[i][0]+1;x++)
				//		arr[newArr[i][1]][x]=1;
				//}
			}
			//在数组中画出计算出来的路径
			function setroad(arr,newArr){
				for(var i=1;i<newArr.length;i++){
					var X = newArr[i][0],Y = newArr[i][1],rX = newArr[i-1][0]||0,rY = newArr[i-1][1]||0;
					if(X >= rX ){
						for(var x=rX;x<=X;x++){
							arr[rY][x]=1;
						}
					}
					else{
						for(var x=X;x<=rX;x++){
							arr[rY][x]=1;
						}
					}
					if(Y >= rY ){
						for(var y=rY;y<=Y;y++){
							arr[y][X]=1;
						}
					}
					else{
						for(var y=Y;y<=rY;y++){
							arr[y][X]=1;
						}
					}
				}

			}
			var a = init(r,c);
			process(a);
			console.log(a);
			return a;
		}
}
