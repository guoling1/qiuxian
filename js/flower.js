//获取鲜花数
getSacrifice()
function getSacrifice(){
    $.ajax({
        type: 'POST',
        url: GLOBEL_URl,
        data: {
            oper: 'getSacrifice',
            type: $.Request("type")
        },
        dataType : "json",
        success: function (data) {
            $('#peopleNum').html('累计祭奠人数：'+data.data)
        }
    })
}
function addSacrificeClick() {
    $.ajax({
        type: 'POST',
        url: GLOBEL_URl,
        data: {
            oper: 'addSacrificeClick',
            type: $.Request("type")
        },
        dataType : "json",
        success: function (data) {
            // alert(data.msg)
            getSacrifice()
        }
    })
}
var center_left= document.getElementsByClassName('center_left')[0];
var center_right= document.getElementsByClassName('center_right')[0];
var flower_group= document.getElementsByClassName('flower_group')[0];

center_left.onclick=function(){
    flower_group.style.display="block"
}
center_right.onclick=function(){
    flower_group.style.display="none"
    document.getElementsByClassName('people')[0].src = 'images/bend1.gif';
    addSacrificeClick();
    setTimeout(function () {
        document.getElementsByClassName('people')[0].src = 'images/bend2.png'
    },1200)
};
var aItem = document.getElementsByClassName('item');
for (var i = 0; i < aItem.length; i++) {
    aItem[i].onclick = function () {
        addSacrificeClick();
        document.getElementsByClassName('img')[0].src = this.childNodes[1].src;
        document.getElementsByClassName('img')[1].src = this.childNodes[1].src;
        flower_group.style.display = "none"
    }
}