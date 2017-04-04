 //地图绘制类
var Map = {
	//画出地图
	draw : function(map,img){
		var i,j;
	
		for(i = 0; i <20;i++){
			
			for(j = 0;j<20;j++){
				//画背景地图
				if(MapData[i][j] == 0){
				//	Canvas.drawRect(map,i*50,j*50,50,50,'red');
						if((j%2 == 0 && i%2 !=0)||(j%2!=0&&i%2==0))
							map.drawImage(img,0,0,60,60,i*50,j*50,50,50);
						else
							map.drawImage(img,60,0,60,60,i*50,j*50,50,50);

				}
                //画可以走的路
				else{
					var img2 = $("#map-gezi2")[0];
					map.drawImage(img2,0,0,60,60,i*50,j*50,50,50);
					//Canvas.fillRect(map,i*50,j*50,50,50,'black');
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
				//中间格子为1
				for(var i=1;i<r-1;i++)
					for(var j=1;j<c-1;j++)
					{
						a[i][j] = 1;
					}
				return a;
			}
			//处理数组，产生最终的数组
			function process(arr)
			{
				//acc存放已访问队列，noacc存放没有访问队列
				var acc = [],noacc = [];
				var r = arr.length,c=arr[0].length;
				var count = r*c;
				for(var i=0;i<count;i++){noacc[i] = 0;}
				//定义空单元上下左右偏移
				var offs=[-c,c,-1,1],offR=[-1,1,0,0],offC=[0,0,-1,1];
				//随机从noacc取出一个位置
				var pos = Math.round(Math.random()*count);
				noacc[pos] = 1;
				acc.push(pos);
				while(acc.length < count)
				{
					var ls = -1,offPos = -1;
					offPos = -1;
					//找出pos位置在二维数组中的坐标
					var pr = pos/c|0,pc=pos%c,co=0,o=0;
					//随机取上下左右四个单元
					while(++co<5)
					{
						o = Math.round(Math.random()*5);
						ls =offs[o]+pos;
						var tpr = pr+offR[o];
						var tpc = pc+offC[o];
						if(tpr>=0&&tpc>=0&&tpr<=r-1&&tpc<=c-1&&noacc[ls]==0){ offPos = o;break;}
					}
					if(offPos<0)
					{

						pos = acc[Math.round(Math.random()*acc.length)];
					}
					else
					{
						pr = 2*pr+1;
						pc = 2*pc+1;
						//相邻空单元中间的位置置0
						arr[pr+offR[offPos]][pc+offC[offPos]]=0;
						pos = ls;
						noacc[pos] = 1;
						acc.push(pos);
					}
				}
			}
			var a = init(r,c);
			process(a);
			return a;
		}
}
