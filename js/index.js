//获取工作动态
$.ajax({
    type: "POST",
    dataType: "json",
    url: GLOBEL_URl,
    data: {
        oper: 'getContentList',
        typeid: '43C18D0E-0772-451A-912D-D36BCACACE63',
        pageSize: 4,
        pageIndex: 1
    },
    success: function (data) {
        var aLi = '';
        $(data.data).each(function (ind, item) {
            aLi += `
                        <li class="clear">
                            <a href="news-detail.html?id=`+item.ContentId+`">
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
})

//获取通知公告
$.ajax({
    type: "POST",
    dataType: "json",
    url: GLOBEL_URl,
    data: {
        oper: 'getContentList',
        typeid: 'A7514F49-4792-48EB-8F0C-2E73C7C68589',
        pageSize: 4,
        pageIndex: 1
    },
    success: function (data) {
        var aLi = '';
        $(data.data).each(function (ind, item) {
            aLi += `
                        <li>
                        <a href="news-detail.html?id=`+item.ContentId+`&parentName=通知公告">
                            <div class="number">0`+(ind+1)+`</div>
                            <div class="title">`+item.Title+`</div>
                           </a>
                        </li>
                                `
        })
        $('.column2').html(aLi)
    }
})

var flag=false;
$('.submit').click(function () {
    if($("#content").val()==''){
        alert("请填写意见建议")
    }else if($("#input").val()==''){
        alert("请填写验证码")
    }else {
        if(flag){
            $.ajax({
                type: 'POST',
                url: GLOBEL_URl,
                data: {
                    oper: 'addFeedback',
                    openidcontent:'oXQlD5uqC92zyzRlThaOl_o5Y3m0',
                    content: $("#content").val(),
                },
                dataType : "json",
                success: function (data) {
                    alert(data.msg)
                }
            })
        }
    }
})

var verifyCode = new GVerify(imgCode);

$("#input").on("blur",function () {
    var inputCode = $("#input").val();
    if(verifyCode.validate(inputCode)){
        console.log("验证码输入正确")
        flag = true
    }else{
        flag = false
        alert("请输入正确的验证码")
    }
})