//页面操作类
var Main = {
    isStart:false,
    isMusic:true,
    music:$("audio")[0],
    init:function(){
        this.chooseMap();
        this.common();
        this.gameControl();
        this.startGame();
        this.musicControl();
    },

    startGame:function (){
        var _this = this;
        $("#start_game").click(function () {
            if(!_this.isStart)
                Game.start();
            else
                Game.restart();
            _this.isStart = true;
            if(_this.isMusic)
                _this.music.play();
        })
    },
    chooseMap: function () {
        $("#select_map li").click(function(){
            $("#select_map li").removeClass("choose");
            $(this).addClass("choose");
        });
    },
    common: function () {
        $("#help").click(function(){
            $(".button-box").hide();
            $(".help").show();
        })
        $("#help-back").click(function(){
            $(".button-box").show();
            $(".help").hide();
        })
        $("#maps-back").click(function () {
            $(".menu").show();
            $(".maps").hide();
        })
        $("#start").click(function () {
            $(".maps").show();
            $(".menu").hide();
        })
        $("#fail .button").click(function () {
            $(".menu").show();
            $("#fail").hide();
        })
        $("#scores").click(function(){
            $(".button-box").hide();
            $("#rank").show();
        })
        $("#rank_back").click(function(){
            $(".button-box").show();
            $("#rank").hide();
        })
    },
    musicControl: function () {
        var _this = this;
       $("#music").click(function () {
           if(_this.music.paused){
               $(this).css("background-position","-40px 0");
               _this.music.play();
           }
           else{
               $(this).css("background-position","0 0");
               _this.music.pause();
           }
           _this.isMusic=false;
       });

    },
    gameControl: function () {
        $("#game_buttons .button:eq(0)").click(function () {
            if($(this).children("span").text()== "暂停"){
                $(this).children("span").text("继续");
                Game.stop();
            }
            else{
                $(this).children("span").text("暂停");
                Game.resume();
            }
        });
        $("#game_buttons .button:eq(1)").click(function () {
                Game.stop();
                $("#game").hide();
                $(".menu").show();
                $("#return").show();
        });
        $("#return").click(function (){
            $("#game").show();
            $(".menu").hide();
            $(this).hide();
            Game.resume();
        });
        $("#game_speedup").click(function () {
            if(Game.interval == 15){
                Game.interval = 10;
                $(this).attr("disabled",true);
                $(".game_speedtext b").text("3");
            }
            else if(Game.interval == 20){
                Game.interval = 15;
                $(".game_speedtext b").text("2");
                $(this).prev().attr("disabled",false);
            }
            $(this).children("span").text("暂停");
            Game.resume();
            console.log(Game.interval);
            });
        $("#game_speeddown").click(function () {
            if(Game.interval == 10){
                Game.interval = 15;
                $(".game_speedtext b").text("2");
                $(this).next().attr("disabled",false);
            }
            else if(Game.interval == 15){
                Game.interval = 20;
                $(".game_speedtext b").text("1");
                $(this).attr("disabled",true);
            }
            $(this).children("span").text("暂停");
            Game.resume();
            console.log(Game.interval);
        });
    }

}
