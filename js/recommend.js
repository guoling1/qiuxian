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
var companyName=''
var companyName1=''
//选择完分类后获取单位列表
$('#companyType').change(function(){
    var data= $(this).val();
    companyName= $("#companyType option:selected").text();
    $.ajax({
        type: "POST",
        dataType: "json",
        url: GLOBEL_URl,
        data: {
            oper: 'getCompanyList',
            companytypeid: data,
            pageSize: 60,
            pageIndex: 1
        },
        success: function (data) {
            $("#companyList").html('<option value="0">选择部门</option>')
            $(data.data).each(function (ind, item) {
                $("#companyList").append("<option value='"+item.CompanyId+"'>"+item.FullName+"</option>");
            })
        }
    })
});
$('#companyList').change(function(){
    var data= $(this).val();
    companyName= $("#companyList option:selected").text();
    $.ajax({
        type: "POST",
        dataType: "json",
        url: GLOBEL_URl,
        data: {
            oper: 'getCompanySonList',
            parentid: data,
            pageSize: 60,
            pageIndex: 1
        },
        success: function (data) {
            if(data.data.length){
                $("#companySon").show()
                $("#companySon").html('<option value="0">选择下级</option>')
                $(data.data).each(function (ind, item) {
                    $("#companySon").append("<option value='"+item.CompanyId+"'>"+item.FullName+"</option>");
                })
            }else {
                $("#companySon").hide()
            }

        }
    })
});


$('.submit').click(function () {
    companyName1 = $("#companyList option:selected").text()
    if($("#companyType").val()==0||$("#companyList").val()==0){
        alert("请填写完整信息")
    }else {
        if($.Request('type')=='监督评议'&&($("#companySon").css('display')!='block')){
            window.location.href = "people-list.html?id="+$("#companyList").val()+"&companyType="+$("#companyType").val()+"&type="+$.Request('type')+'&companyName='+companyName+'&companyName1='+companyName1;
        }else if($.Request('type')=='监督评议'&&($("#companySon").css('display')=='block')){
            window.location.href = "people-list1.html?id="+$("#companySon").val()+"&companyType="+$("#companyType").val()+"&type="+$.Request('type')+'&companyName='+companyName+'&companyName1='+companyName1;
        }else if($.Request('type')=='考核评议'){
            // window.location.href = "supervision.html?id="+$("#companyList").val()+"&companyType="+$("#companyType").val()+"&type="+$.Request('type')+'&companyName='+companyName+'&companyName1='+companyName1;
            window.location.href = "select.html?id="+$("#companyList").val()+"&companyType="+$("#companyType").val()+"&type="+$.Request('type')+'&companyName='+companyName+'&companyName1='+companyName1;
        }else if($.Request('type')=='干部推荐'){
            window.location.href = "recommend1.html?id="+$("#companyList").val()+"&companyType="+$("#companyType").val()+"&type="+$.Request('type')+'&companyName='+companyName+'&companyName1='+companyName1;
        }else if($.Request('type')=='干部考核'){
            window.location.href = "select1.html?id="+$("#companyList").val()+"&companyType="+$("#companyType").val()+"&type="+$.Request('type')+'&companyName='+companyName+'&companyName1='+companyName1;
        }else if($.Request('type')=='班子考核'){
            window.location.href = "select.html?id="+$("#companyList").val()+"&companyType="+$("#companyType").val()+"&type="+$.Request('type')+'&companyName='+companyName+'&companyName1='+companyName1;
        }

    }
})