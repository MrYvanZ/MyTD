 //左上信息显示类
var Info = {
	score:0,
	money : 10000,
	life : 10,
	mission : 1,
    //塔的图片对象
	towerImg : null,
	towerBg: $("#tower_bg")[0],
	background:null,
	gold:$("#gold_bg")[0],
    //每种塔在右侧的位置信息
	towerPosition : [],
    //已经安装的塔的位置信息
	installTower : {},
	nameList:["盗贼","守卫","猎人","预言家","巫师"],
	init : function(cxt,img,bg){
		this.towerImg = img;
		this.background = bg;
        //画塔
		Canvas.clear(cxt,1000,600);
		Canvas.drawImg(cxt,this.towerBg,0,0,1000,60,0,550,1000,55);
		for(var i = 0;i<5;i++){
			Canvas.drawImg(cxt,img,i*50,0,50,50,20+i*140,550,50,45);
			Canvas.drawImg(cxt,this.gold,0,0,50,50,75+i*140,575,20,20)
			Canvas.drawText(cxt,this.nameList[i],75+i*140,570,'black',"18px");
			Canvas.drawText(cxt,(i+1)*25,98+i*140,592,'black',"16px");
			this.towerPosition.push({x:20+i*140,y:550,width:150,height:50});
		}
		//画塔下的描述信息

		this.redraw();
		this.bindEvent();
	},
    //绑定右侧塔的事件
	bindEvent : function(){

		var self = this,info = $("#info")[0],
			select = $("#select")[0],
			main = Game.canvasList.tower,
			cxt = Game.canvasList.select;
		//鼠标按下
		info.onmousedown = function(e){
			var x = e.offsetX || e.layerX,
				y = e.offsetY || e.layerY,
				xIndex,yIndex;
            //遍历右侧的塔位置
			for(var i=0;i<self.towerPosition.length;i++){
                //点击的是塔
				if(T.pointInRect({x:x,y:y},self.towerPosition[i])){
                    //金钱不够,退出
					if(self.money - TowerType[i]["level_1"].buyIt < 0)break;
					//绑定拖动事件
					select.onmousemove = function(e){

						x = e.offsetX || e.layerX;
						y = e.offsetY || e.layerY;

						xIndex = Math.floor(x / 50);
						yIndex = Math.floor(y / 50);

						Canvas.clear(cxt,1000,500);
                        //画出塔在左侧区域
						Canvas.drawImg(cxt,self.towerImg,i*50,0,50,50,x-25,y-25,50,50);
						//画出范围,如果当前位置没有塔而且是可放塔的
						if(MapData[xIndex][yIndex] == 0 && !self.installTower[xIndex+"_"+yIndex])Canvas.
						fillArc(cxt,x,y,TowerType[i]["level_1"].scope,"rgba(25,174,70,0.5)");
						else Canvas.fillArc(cxt,x,y,TowerType[i]["level_1"].scope,"rgba(252,82,7,0.5)");
						//画出塔具体的放置位置
						Canvas.drawRect(cxt,xIndex*50,yIndex*50,50,50,'black');
					}
                    //绑定鼠标释放事件,就是拖动结束
					select.onmouseup = function(e){

						Canvas.clear(cxt,1000,500);
						//此位置可以放塔
						if(MapData[xIndex][yIndex] == 0 && !self.installTower[xIndex+"_"+yIndex]){
                            //新增一个塔
							var img = $("#tower_img")[0];
							var tower = new Tower(main,img,i,xIndex*50,yIndex*50,50,50);
							tower.draw(0);
							//标记当前位置有塔
							self.installTower[xIndex+"_"+yIndex] = i+"";
							//加入塔的列表中
							Game.towerList.push(tower);
							//更新金钱
							self.updateMoney(TowerType[i]["level_1"].buyIt * -1);
						}
						//取消绑定
						this.onmousemove = null;
						this.onmouseup = null;
					}
					break;
				}
			}
		}
		//如果鼠标释放的位置还在左侧,则取消此次操作
		info.onmouseup = function(){

			Canvas.clear(cxt,1000,500);

			select.onmousemove = null;
			select.onmousedown = null;
		}
	},
    //更新金钱
	updateMoney : function(money){
		this.money += money;

		this.redraw();
	},
    //更新剩余生命
	updateLife : function(){

		this.life -= 1;

		this.redraw();

		if(this.life <= 0){
			Game.over();
		}
	},
	//更新得分
	updateScore : function (score) {
		this.score += score;

		this.redraw();
	},
    //更新波数
	updateMission : function(){

		this.mission += 1;

		this.redraw();

	},
    //重画
	redraw : function(){
		Canvas.clear(Game.canvasList.info,600,60);
		Canvas.drawImg(Game.canvasList.info,this.background,0,0,600,40,0,3,600,40);
		Canvas.drawText(Game.canvasList.info,this.money,80,30,"black","20px");
		Canvas.drawText(Game.canvasList.info,"第"+this.mission+"波",510,30,"black");
		Canvas.drawText(Game.canvasList.info,this.life,270,30,"black","20px");
		Canvas.drawText(Game.canvasList.info,this.score,180,30,"black","20px");
	},
    //画出塔的攻击范围以及升级等信息
	drawScope : function(tower){

		var select = Game.canvasList.select;

		Canvas.clear(select,1000,500);

		Canvas.fillArc(select,tower.x+25,tower.y+25,TowerType[tower.type]["level_"+tower.level].scope,"rgba(25,174,70,0.5)");

		if(tower.level < 3)Canvas.drawImg(select,Game.imgList.btn_img,0,0,20,20,tower.x,tower.y,20,20);

		Canvas.drawImg(select,Game.imgList.btn_img,20,0,20,20,tower.x+30,tower.y+30,20,20);
	},
    //升级或卖掉
	upgradeOrSell : function(x,y){

		var tower = Game.nowSelectTower;
		//升级
		if(tower.level < 3 && T.pointInRect({x:x,y:y},{x:tower.x,y:tower.y,width:20,height:20})){
			if(this.money - TowerType[tower.type]["level_"+(tower.level+1)].buyIt < 0)return false;
			tower.level += 1;
			this.updateMoney(TowerType[tower.type]["level_"+tower.level].buyIt * -1);
			tower.draw((tower.level-1)*50);
			this.drawScope(tower);
			//update
		}
        //卖掉
		else if(T.pointInRect({x:x,y:y},{x:tower.x+30,y:tower.y+30,width:20,height:20})){
			var money = Math.floor((tower.level * TowerType[tower.type]["level_1"].buyIt)/2);
			this.updateMoney(money);
			delete this.installTower[Math.floor(tower.x/50)+"_"+Math.floor(tower.y/50)];
			Game.towerList.remove(tower);
			Canvas.clearRect(Game.canvasList.tower,tower.x,tower.y,tower.width,tower.height);
			Canvas.clear(Game.canvasList.select,1000,500);
			tower = null;
		}
	}
}