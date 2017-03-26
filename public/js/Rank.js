var Rank = {
    rankList:{map1:[],
                map2:[],
                map3:[],
                map4:[]},
    init: function () {
        $("#upload_button").click(function () {
            Rank.postScores();
        })
        $("#scores").click(function () {
            Rank.getAllrank();
        })
        $("#map_list li").click(function () {
            $("#map_list li").removeClass("choose");
            Rank.setRank(this.id);
            $(this).addClass("choose");
        })
    },
    postScores: function () {
        var score =  $("#last_score").text();
        var name = $("#player_name").val();
        if(name ==""){
            name = "无名氏";
        }
        var mapid = $("#select_map .choose").attr('name');
        $.ajax({
            type: 'post',
            url: '/rank/update',
            data:{
                mapid:mapid,
                score:score,
                name:name
            },
            dataType:'json',
            success: function (result) {
                console.log(mapid,score,name);
                if (result.code) {
                   $("#upload_result").text("上传成功！").fadeIn(500).fadeOut(4000);
                    return;
                } else {
                    $("#upload_result").text("上传失败！").fadeIn(500).fadeOut(4000);
                    return;
                }
            },
            error: function () {
                $("#upload_result").text("上传失败！").fadeIn(500).fadeOut(4000);
                return;
            },
        });
    },
    getAllrank: function () {
        var rank;
        var map1=[],map2=[],map3=[],map4=[];
        var _this = this;
        $.ajax({
            type: 'get',
            url: '/rank/queryAll',
            dataType:'json',
            success: function (result) {
                rank=result;
                for(var ever in rank){
                    switch(rank[ever].MapId) {
                        case "1":
                            map1.push(rank[ever]);
                            break;
                        case "2":
                            map3.push(rank[ever]);
                            break;
                        case "3":
                             map3.push(rank[ever]);
                            break;
                        default:
                             map4.push(rank[ever]);
                            break;
                    }
                }
                _this.rankList.map1 = _this.sortRank(map1) ;
                _this.rankList.map2 = _this.sortRank(map2);
                _this.rankList.map3 = _this.sortRank(map3);
                _this.rankList.map4 = _this.sortRank(map4);
                _this.setRank("map1");
            },
            error: '',
        });
    },
    sortRank:function(arry){
        for (var i = 0; i < arry.length; i++) {
            for (var j = i + 1; j < arry.length; j++) {
                if(arry[i].PlayerScore > arry[j].PlayerScore ){
                    var tmp = arry[j];
                    arry[j] = arry[i];
                    arry[i] = tmp;
                }
            }
        }
        return arry;
    },
    setRank: function (id) {
        var tr,str="";
        var array = this.rankList[id];
        if(!array[0])
            str = "<tr><td colspan='3'>还未有玩家挑战该地图！</td></tr>"
        for(var i = 0;i < 7; i++){
            if(array[i])
            {
                 str += "<tr><td>"+i+"</td><td>"+array[i].PlayerName+"</td><td>"+array[i].PlayerScore+"</td></tr>";
            }
            else
                break;
        }
        tr = $(str);

        $("#rank_table tr").remove("tr[name!=rank_title]");
        $("#rank_table").append(tr);
    }
}
Rank.init();
