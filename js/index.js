

//获取咨询
/*$.ajax({
    type: "POST",
    dataType: "json",
    url: GLOBEL_URl,
    data: {
        oper: 'getContentList',
        typeid: '43c18d0e-0772-451a-912d-d36bcacace63',
        pageSize: 4,
        pageIndex: 1
    },
    success: function (data) {
        var aLi = '';
        $(data.data).each(function (ind, item) {
            aLi += `
                        <li class="clear">
                            <a href="public-new-detail.html?id=`+item.ContentId+`&ParentId=d9826e7d-cedb-4a24-a8bf-e63ecdb30e25">
                                <div class="left fl">
                                    <p class="day">`+formatDate(item.CreateDate)[1]+`</p>
                                    <p>`+formatDate(item.CreateDate)[0]+`</p>
                                </div>
                                <div class="right">
                                    <div class="top">
                                    <span class="title">`+item.Title+`</span>
                                </div>
                                <div class="detail">`+item.Summary+`</div>
                                </div>
                            </a>
                        </li>
                                `
        })
        $('.column1').html(aLi)
    }
})*/

//获取通知公告
/*$.ajax({
    type: "POST",
    dataType: "json",
    url: GLOBEL_URl,
    data: {
        oper: 'getContentList',
        typeid: 'a7514f49-4792-48eb-8f0c-2e73c7c68589',
        pageSize: 4,
        pageIndex: 1
    },
    success: function (data) {
        var aLi = '';
        $(data.data).each(function (ind, item) {
            aLi += `
                        <li>
                        <a href="public-new-detail.html?id=`+item.ContentId+`&parentName=通知公告&&ParentId=a7514f49-4792-48eb-8f0c-2e73c7c68589">
                            <div class="number">0`+(ind+1)+`</div>
                            <div class="title">`+item.Title+`</div>
                            <div class="date">`+item.CreateDate.split(' ')[0]+`</div>
                           </a>
                        </li>
                                   
                                `
        })
        $('.column2').html(aLi)
    }
})*/

//获取纪念建筑
$.ajax({
    type: "POST",
    dataType: "json",
    url: GLOBEL_URl,
    data: {
        oper: 'getContentList',
        typeid: '6fb5c25f-d08b-4220-b52c-c4b4e7bd88b0',
        pageSize: 10,
        pageIndex: 1
    },
    success: function (data) {
        var aLi = '';
        $(data.data).each(function (ind, item) {
            aLi += `
                        <div class="swiper-slide">
                        <a href="hero-deeds-detail.html?ContentId=`+item.ContentId+`&ParentId=41679da8-c6dd-435d-8c0d-bc4ff8b19a25&id=6fb5c25f-d08b-4220-b52c-c4b4e7bd88b0"><img src="`+GLOBEL_IP+``+item.ImgUrl+`" alt="">
                        <div class="title"><p>`+item.Title+`</p>
                    <i></i></div></a>
                    </div>
                                `
        })
        $('.column3 .swiper-wrapper').html(aLi)
        var introduceContent = new Swiper('.introduce-content', {
            loop: true,
            slidesPerView: 2,
            spaceBetween: 20,
            // autoplay: false,
            autoplay: {
                delay: 4500,
                disableOnInteraction: false,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            }
        })
    }
})
var flag=false
$('.submit').click(function () {
    if($("#content").val()==''||$("#Title").val()==''){
        alert("请填写问题及反馈内容")
    }else if($("#input").val()==''){
        alert("请填写验证码")
    }else {
        if(flag){
            $.ajax({
                type: 'POST',
                url: GLOBEL_URl,
                data: {
                    oper: 'addFeedback',
                    content: $("#content").val(),
                    name: $("#name").val(),
                    Title: $("#Title").val(),
                },
                dataType : "json",
                success: function (data) {
                    alert(data.msg)
                }
            })
        }
    }
})

var GVerify=function (id) {
    function GVerify(options) { //创建一个图形验证码对象，接收options对象为参数
        this.options = { //默认options参数值
            id: "", //容器Id
            canvasId: "verifyCanvas", //canvas的ID
            width: "70", //默认canvas宽度
            height: "24", //默认canvas高度
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
var verifyCode = new GVerify(imgCode);

$("#input").on("blur",function () {
    var inputCode = $("#input").val();
    if(verifyCode.validate($("#input").val())){
        console.log("验证码输入正确")
        flag = true
    }else{
        flag = false
        alert("请输入正确的验证码")
    }
})