/*公共部分
 * 导航栏
 * footer CopyRight
 */
$(".headerPage").load("header.html",function (result) {
    $.get('js/header.js');
    if(/flower/.test(window.location.pathname)){
        $('.main').css('height',(document.body.clientHeight-parseFloat($('.headerPage').css('height')))+'px');
    }
});
$(".footerPage").load("footer.html",function (result) {
    $.get('js/footer.js');
});

var GLOBEL_URl = "http://jjlylsly.cn/Ajax/cms.ashx";
var GLOBEL_IP = "http://jjlylsly.cn";
//获取url参数
$.Request = function (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]); return null;

}

//设置网站配置
$.ajax({
    type: 'POST',
    url: GLOBEL_URl,
    data: {
        oper: 'getConfig'
    },
    dataType : "json",
    success: function (data) {
        $('head title').html(data.data.WebName)
        $('head').append('<meta name="keywords" content="'+data.data.Keywords+'">')
        $('head').append('<meta name="description" content="'+data.data.Description+'">')
    }
})


//增加文章点击量
function addContentClick(id) {
    $.ajax({
        type: 'POST',
        url: GLOBEL_URl,
        data: {
            oper: 'addContentClick',
            id: id
        },
        dataType : "json",
        success: function (data) {}
    })
}

function leftMenu() {
    var navList = JSON.parse(localStorage.getItem('navList'));
    var menuList = [];
    var parentName;
    for (var i=0;i<navList.length;i++){
        if($.Request('ParentId')==navList[i].ContentTypeId){
            menuList = navList[i].childList;
            parentName = navList[i].FullName;
        }
    }
    for (var i=0;i<menuList.length;i++){
        if(menuList[i].IsNav) {
            var oLi = document.createElement('li');
            /*if($.Request('id')==menuList[i].ContentTypeId){
                oLi.className = 'active'
                $("#detail").html(menuList[i].ContentHtml)

            }*/
            if(menuList[i].ContentTypeId==$.Request('id')){
                oLi.className = "active"
            }
            $(".bread").html('<a href="index.html">首页</a> &gt; <a href="javascript:;">'+parentName+'</a>')
            var oA = document.createElement('a');

            if(menuList[i].Type=='about') {
                oA.href = 'contact1.html?id=' + menuList[i].ContentTypeId + '&ParentId=' + menuList[i].ParentId;
            }else if(menuList[i].Type=='reserve'){
                oA.href='reservation-info.html?id=' + menuList[i].ContentTypeId + '&ParentId=' + menuList[i].ParentId;
            }else if(menuList[i].Type=='feedback'){
                oA.href='suggestion.html?id=' + menuList[i].ContentTypeId + '&ParentId=' + menuList[i].ParentId;
            }else if(menuList[i].Type=='news'){
                oA.href='public-new1.html?id='+menuList[i].ContentTypeId+'&ParentId='+menuList[i].ParentId;
            }else if(menuList[i].Type=='picture'){
                oA.href='hero-deeds.html?name='+menuList[i].FullName+'&id='+menuList[i].ContentTypeId+'&ParentId='+menuList[i].ParentId;
            }
            oA.innerHTML = '<p>'+menuList[i].FullName+'</p>';
            oLi.appendChild(oA);
            document.getElementById('left-menu').appendChild(oLi)
        }

    }
}

function formatDate(date) {
    date = date.split(' ')[0];
    return [date.split('-')[0] +'-'+ date.split('-')[1], date.split('-')[2]]
}