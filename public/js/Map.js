 //地图绘制类
var Map = {
	//画出地图
	draw : function(map){
		var i,j;
	
		for(i = 0; i <20;i++){
			
			for(j = 0;j<20;j++){
				//画背景地图
				if(MapData[i][j] == 0){
				//	Canvas.drawRect(map,i*50,j*50,50,50,'red');
					var img = $("#map-gezi1")[0];
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
	}
}