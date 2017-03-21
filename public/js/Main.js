//页面操作类
var Main = {
    init:function(){
        this.chooseMap();
        this.common();
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
    },
}
    Main.init();
