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