//页面操作类
var Main = {
    isStart:false,
    init:function(){
        this.chooseMap();
        this.common();
        this.gameControl();
        this.startGame();
    },

    startGame:function (){
        $("#start_game").click(function () {
            if(!this.isStart)
                Game.start();
            else
                Game.restart();
            this.isStart = true;
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
        })
    }

}
