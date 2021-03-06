/*公共部分
 * 导航栏
 * footer CopyRight
 */
$(".headerPage").load("header.html",function (result) {
    $.get('js/header.js');
});
$(".footerPage").load("footer.html",function (result) {
    $.get('js/footer.js');
});


var GLOBEL_URl = "http://qxzzb.hdjincheng.cn/Ajax/cms.ashx";
var GLOBEL_IP = "http://qxzzb.hdjincheng.cn";
var OPENID=_GET_DATA('wxopenid');
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

function GVerify(id) {
    function GVerify(options) { //创建一个图形验证码对象，接收options对象为参数
        this.options = { //默认options参数值
            id: "", //容器Id
            canvasId: "verifyCanvas", //canvas的ID
            width: "70", //默认canvas宽度
            height: "27", //默认canvas高度
            type: "blend", //图形验证码默认类型blend:数字字母混合类型、number:纯数字、letter:纯字母
            code: ""
        }
        if(Object.prototype.toString.call(options) == "[object Object]"){//判断传入参数类型
            for(var i in options) { //根据传入的参数，修改默认参数值
                this.options[i] = options[i];
            }
        }else{
            this.options.id = options.id;
        }

        this.options.numArr = "0,1,2,3,4,5,6,7,8,9".split(",");
        this.options.letterArr = getAllLetter();

        this._init();
        this.refresh();
    }

    GVerify.prototype = {
        /**版本号**/
        version: '1.0.0',

        /**初始化方法**/
        _init: function() {
            var con = document.getElementById(this.options.id);
            var canvas = document.createElement("canvas");
            /*this.options.width = con.offsetWidth > 0 ? con.offsetWidth : "100";
            this.options.height = con.offsetHeight > 0 ? con.offsetHeight : "30";*/
            canvas.id = this.options.canvasId;
            canvas.width = this.options.width;
            canvas.height = this.options.height;
            canvas.style.cursor = "pointer";
            canvas.innerHTML = "您的浏览器版本不支持canvas";
            console.log(con)
            con.appendChild(canvas);
            var parent = this;
            canvas.onclick = function(){
                parent.refresh();
            }
        },

        /**生成验证码**/
        refresh: function() {
            this.options.code = '';
            var canvas = document.getElementById(this.options.canvasId);
            if(canvas.getContext) {
                var ctx = canvas.getContext('2d');
            }
            ctx.textBaseline = "middle";

            ctx.fillStyle = randomColor(180, 240);
            ctx.fillRect(0, 0, this.options.width, this.options.height);

            if(this.options.type == "blend") { //判断验证码类型
                var txtArr = this.options.numArr.concat(this.options.letterArr);
            } else if(this.options.type == "number") {
                var txtArr = this.options.numArr;
            } else {
                var txtArr = this.options.letterArr;
            }

            for(var i = 1; i <= 4; i++) {
                var txt = txtArr[randomNum(0, txtArr.length)];
                this.options.code += txt;
                // ctx.font = '36px SimHei';
                ctx.font = randomNum(this.options.height/2, this.options.height) + 'px SimHei'; //随机生成字体大小
                ctx.fillStyle = randomColor(50, 160); //随机生成字体颜色
                /* ctx.shadowOffsetX = randomNum(-3, 3);
                ctx.shadowOffsetY = randomNum(-3, 3);*/
                ctx.shadowBlur = randomNum(-3, 3);
                ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
                var x = this.options.width / 5 * i;
                var y = this.options.height / 2;
                var deg = randomNum(-30, 30);
                /**设置旋转角度和坐标原点**/
                ctx.translate(x, y);
                ctx.rotate(deg * Math.PI / 180);
                ctx.fillText(txt, 0, 0);
                /**恢复旋转角度和坐标原点**/
                ctx.rotate(-deg * Math.PI / 180);
                ctx.translate(-x, -y);
            }
            /**绘制干扰线**/
            for(var i = 0; i < 4; i++) {
                ctx.strokeStyle = randomColor(40, 180);
                ctx.beginPath();
                ctx.moveTo(randomNum(0, this.options.width/2), randomNum(0, this.options.height/2));
                ctx.lineTo(randomNum(0, this.options.width/2), randomNum(0, this.options.height));
                ctx.stroke();
            }
            /**绘制干扰点**/
            for(var i = 0; i < this.options.width/4; i++) {
                ctx.fillStyle = randomColor(0, 255);
                ctx.beginPath();
                ctx.arc(randomNum(0, this.options.width), randomNum(0, this.options.height), 1, 0, 2 * Math.PI);
                ctx.fill();
            }
        },

        /**验证验证码**/
        validate: function(code){
            var verifyCode = code.toLowerCase();
            var v_code = this.options.code.toLowerCase();
            if(verifyCode == v_code){
                return true;
            }else{
                return false;
            }
        }
    }

    /**生成字母数组**/
    function getAllLetter() {
        var letterStr = "a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z";
        return letterStr.split(",");
    }
    /**生成一个随机数**/
    function randomNum(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }
    /**生成一个随机色**/
    function randomColor(min, max) {
        var r = randomNum(min, max);
        var g = randomNum(min, max);
        var b = randomNum(min, max);
        return "rgb(" + r + "," + g + "," + b + ")";
    }

    return new GVerify(id);
}