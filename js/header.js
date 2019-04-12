/**
 * 搜索下拉选
 */
$('#select').click(function () {
    $('#select .select-ul').css('display','block')
})
$('#select .select-ul li').each(function () {
    $(this).click(function (e) {
        e.stopPropagation();
        $('#select .select-ul').css('display','none');
        $('#select p').html($(this).html())
    })
})
if(/index/.test(window.location.pathname)){
    $('.menu').hide();
    $('.search').show();
}
$('.menu').click(function () {
    $(".menu-box").toggle(300)
})
document.headerH = $('.head-box').css('height');
//搜索
$('#search').click(function () {
    window.location.href="search.html?key="+$("#search_key").val();
})

$.ajax({
    type: 'POST',
    url: GLOBEL_URl,
    data: {
        oper: 'getContentTypeList'
    },
    dataType : "json",
    success: function (data) {
        var aList = []
        $(data.data).each(function (ind,item) {
            if(item.ParentId=='00000000-0000-0000-0000-000000000000'){
                item.childList = []
                // aList[item.Sort-1]=item
                aList.push(item)
            }
        })
        aList.sort(function (a,b) {
            return a.Sort-b.Sort
        })
        for(var i=0;i<aList.length;i++){
            for (var j=0;j<data.data.length;j++){
                if(data.data[j].ParentId!='00000000-0000-0000-0000-000000000000'){
                    if(aList[i].ContentTypeId==data.data[j].ParentId){
                        // aList[i].childList[data.data[j].Sort-1]=data.data[j]
                        aList[i].childList.push(data.data[j])
                    }
                }
            }
            aList[i].childList.sort(function (a,b) {
                return a.Sort-b.Sort
            })
        }
        localStorage.setItem('navList',JSON.stringify(aList))

        for(var i=0;i<aList.length;i++){
            if(aList[i].IsNav){
                var oLi = document.createElement('li');
                oLi.setAttribute('data-id',aList[i].ContentTypeId);
                oLi.setAttribute('data-type',aList[i].Type);
                var oA = document.createElement('a');
                if(aList[i].childList.length==0){ //无子菜单
                    if(aList[i].Type=='about'){
                        oA.href='contact.html?id='+aList[i].ContentTypeId;
                    }else if(aList[i].Type=='news'&&/通知公告/.test(aList[i].FullName)){
                        oA.href='public-new.html?id='+aList[i].ContentTypeId;
                    }else if(aList[i].Type=='sacrifice'){
                        // oA.href='mpDetail.html?id='+aList[i].ContentTypeId;
                        oA.href='memorial-personal.html?id='+aList[i].ContentTypeId;
                    }else if(aList[i].Type=='panorama'){
                        // oA.href='digitization.html?id='+aList[i].ContentTypeId;
                        oA.href='https://720yun.com/t/gygmaploljh5yazws9';
                        oA.target = "_black"
                    }
                }else {
                    if(aList[i].childList[0].Type=='about'){
                        oA.href='contact1.html?id='+aList[i].childList[0].ContentTypeId+'&ParentId='+aList[i].childList[0].ParentId;
                    }else if(aList[i].childList[0].Type=='news'){
                        oA.href='public-new1.html?id='+aList[i].childList[0].ContentTypeId+'&ParentId='+aList[i].childList[0].ParentId;
                    }else if(aList[i].childList[0].Type=='picture'&&aList[i].childList[0].FullName=='文物馆藏'){
                        oA.href='hero-deeds.html?id='+aList[i].childList[0].ContentTypeId+'&ParentId='+aList[i].childList[0].ParentId;
                    }
                }

                var op = document.createElement('p');
                op.innerHTML = aList[i].FullName;
                /*var op1 = document.createElement('p');
                op1.innerHTML = aList[i].EnName||' ';*/
                oA.appendChild(op);
                // oA.appendChild(op1);
                oLi.appendChild(oA)
                $('#menu-box ul').append(oLi)
                // document.getElementsByClassName("content-list")[0].appendChild(oContent)
            }
        }
    }
})
//轮播图
if(!/flower/.test(window.location.pathname)){
/*$.ajax({
    type: 'POST',
    url: GLOBEL_URl,
    data: {
        oper: 'getBannerList'
    },
    dataType : "json",
    success: function (data) {
        $('.banner-box').show();
            var swiper = document.getElementById('swiper');
            var slider=''
            for (var i=0;i<data.data.length;i++){
                slider += '<div class="swiper-slide"><a target="_blank" href="'+data.data[i].LinkUrl+'"><img src="'+GLOBEL_IP+data.data[i].ImgUrl+'" alt=""></a></div>'
            }
            $('#swiper').html(slider)
            var mySwiper = new Swiper('.banner-swiper', {
                loop: true,
                autoplay: {
                    delay: 2500,
                    disableOnInteraction: false,
                },
                // navigation: {
                //     nextEl: '.swiper-button-next',
                //     prevEl: '.swiper-button-prev',
                // },
            })

    }
})*/
}