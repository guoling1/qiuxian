//获取当前页码
var current;
var pageSize = 10;
//请求当前页要展示的数据
$.ajax({
    type: "POST",
    dataType: "json",
    url: GLOBEL_URl,
    data: {
        oper: 'getCommentsList',
        contentid: '5cecb4ed-9ecc-482f-9cad-1086779323ca',
        pageSize: pageSize,
        pageIndex: 1
    },
    success: function (data) {
        current = data.recordCount;
        var arr = [];
        for (var i = 0; i < current; i++) {
            arr.push(i)
        }
        $('#page').pagination({
            dataSource: arr,
            pageSize: pageSize,
            prevText: '<上一页',
            nextText: '下一页>',
            callback: function () {
                $.ajax({
                    type: "POST",
                    dataType: "json",
                    url: GLOBEL_URl,
                    data: {
                        oper: 'getCommentsList',
                        contentid: '5cecb4ed-9ecc-482f-9cad-1086779323ca',
                        pageSize: pageSize,
                        pageIndex: arguments[1].pageNumber
                    },
                    success: function (data) {
                        var aLi = '';
                        $(data.data).each(function (ind, item) {
                            aLi += `<li>
                                        <p class="name">祭奠着：` + item.NickName + `</p>
                                        <p class="time">发表于 ` + item.CreateDate + `</p>
                                        <p class="detail">` + item.Content + `</p>
                                    </li>`
                        })
                        $('.message-ul').html(aLi)
                    }
                })
            }
        });
    }
})
var flag=false
//提交留言
$('.submit').click(function () {
    if ($("#content").val() == '') {
        alert("请填写留言内容")
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
                dataType: "json",
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
    if(verifyCode.validate($("#input").val())){
        console.log("验证码输入正确")
        flag = true
    }else{
        flag = false
        alert("请输入正确的验证码")
    }
})