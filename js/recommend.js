$('.column-title .left').html($.Request('type'));
//获取单位分类
$.ajax({
    type: "POST",
    dataType: "json",
    url: GLOBEL_URl,
    data: {
        oper: 'getCompanyTypeList',
    },
    success: function (data) {
        $(data.data).each(function (ind, item) {
            $("#companyType").append("<option value='"+item.CompanyTypeId+"'>"+item.Name+"</option>");
        })
    }
})
//选择完分类后获取单位列表
$('#companyType').change(function(){
    var data= $(this).val();
    $.ajax({
        type: "POST",
        dataType: "json",
        url: GLOBEL_URl,
        data: {
            oper: 'getCompanyList',
            companytypeid: data,
            pageSize: 4,
            pageIndex: 1
        },
        success: function (data) {
            $(data.data).each(function (ind, item) {
                $(data.data).each(function (ind, item) {
                    $("#companyList").append("<option value='"+item.CompanyId+"'>"+item.FullName+"</option>");
                })
            })
        }
    })
});


$('.submit').click(function () {
    if($("#companyType").val()==0||$("#companyList").val()==0){
        alert("请填写完整信息")
    }else {
        if($.Request('type')=='监督评议'){
            window.location.href = "people-list.html?id="+$("#companyList").val()+"&companyType="+$("#companyType").val()+"&type="+$.Request('type');
        }else if($.Request('type')=='考核评议'){
            window.location.href = "supervision.html?id="+$("#companyList").val()+"&companyType="+$("#companyType").val()+"&type="+$.Request('type');
        }else if($.Request('type')=='干部推荐'){
            window.location.href = "recommend1.html?id="+$("#companyList").val()+"&companyType="+$("#companyType").val()+"&type="+$.Request('type');
        }

    }
})