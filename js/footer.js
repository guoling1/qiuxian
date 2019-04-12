//设置网站配置
$.ajax({
    type: 'POST',
    url: GLOBEL_URl,
    data: {
        oper: 'getConfig'
    },
    dataType : "json",
    success: function (data) {
        $('.foot-right').html(data.data.FootRight)
        // $('#FootRight').html(data.data.FootRight)
        // if(/ /.test(data.data.FootAddress)){
        //     var arr = data.data.FootAddress.split(' ')
        //     $('#FootAddress').html(arr[0])
        //     $('#FootAddress1').html(arr[1]+' '+arr[2])
        // }else {
        //     $('#FootAddress').html(data.data.FootAddress)
        // }
    }
})