var Rank = {
    init: function () {

    },
    getAllRank: function () {
        var score =  $("#last_score").text();
        var name = $("#player_name").val();
        if(name ==""){
            name = "无名氏";
        }
        var mapid = $("#select_map .choose").attr('name');
        $.ajax({
            type: 'post',
            url: '/users/update',
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
            error: '',
        });
    },
}
$("#upload_button").click(function () {
    Rank.getAllRank();
})