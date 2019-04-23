var rootPath = 'http://qxzzb.hdjincheng.cn';

function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

function request(paras) {
    var url = location.search;
    var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
    var paraObj = {}
    for (i = 0; j = paraString[i]; i++) {
        paraObj[j.substring(0, j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=") + 1, j.length);
    }
    var returnValue = paraObj[paras.toLowerCase()];
    if (typeof (returnValue) == "undefined") {
        return "";
    } else {
        return returnValue;
    }
}

function _GET_DATA(key) {
    if (localStorage) {
        var value = localStorage.getItem('_data__' + key);
        if (value) {
            var j = JSON.parse(value);
            if (j.time && j.time < new Date()) {
                localStorage.removeItem('_data__' + key);
                return null;
            }
            return j.data;
        }
    }
    return null;
}

function _SET_DATA(key, value, time) {
    if (localStorage) {
        var t = null;
        if (time && time.length >= 2) {
            try {
                t = new Date();
                var n = parseInt(time.substring(0, time.length - 1));
                var f = time.substring(time.length - 1, time.length);

                switch (f) {
                    case 's':
                        t.setSeconds(t.getSeconds() + n);
                        break;
                    case 'm':
                        t.setMinutes(t.getMinutes() + n);
                        break;
                    case 'h':
                        t.setHours(t.getHours() + n);
                        break;
                    case 'd':
                        t.setDate(t.getDate() + n);
                        break;
                    case 'w':
                        t.setDate(t.getDate() + (n * 7));
                        break;
                    case 'M':
                        t.setMonth(t.getMonth() + n);
                        break;
                    case 'y':
                        t.setFullYear(t.getFullYear() + n);
                        break;
                }
                t = t.getTime();
            } catch (e) {
                t = null;
            }
        }
        try {
            localStorage.setItem('_data__' + key, JSON.stringify({
                data: value,
                time: t
            }));
        } catch (ex) {
            _CLEAR_DATA(true);
            localStorage.setItem('_data__' + key, JSON.stringify({
                data: value,
                time: t
            }));
        }
        return true;
    }
    return false;
}

function _DEL_DATA(key) {
    if (localStorage) {
        localStorage.removeItem('_data__' + key);
    }
}

function _CLEAR_DATA(justCache) {
    if (localStorage) {
        for (var i = 0; i < localStorage.length;) {
            if ((localStorage.key(i).indexOf('_data__')) != -1) {
                if (justCache) {
                    var value = localStorage.getItem(localStorage.key(i));
                    if (value) {
                        var j = JSON.parse(value);
                        if (j.time && j.time < new Date()) {
                            if (localStorage.removeItem) {
                                localStorage.removeItem(localStorage.key(i));
                            } else {
                                return;
                            }
                        } else {
                            i++;
                        }
                    }
                } else {
                    if (localStorage.removeItem) {
                        localStorage.removeItem(localStorage.key(i));
                    } else {
                        return;
                    }
                }
            } else {
                i++;
            }
        }
    }
}

function _CHECK_DATA() {
    _SET_DATA('jx', 520);
    var jx = _GET_DATA('jx');
    if (jx == 520) {
        _DEL_DATA('jx');
        return true;
    }
    return false;
}



function wxLogin(callback) {
    var wxopenid = _GET_DATA('wxopenid');
    if (!wxopenid) {
        var appId = 'wx3c3bfcecd0be064f';
        var oauth_url = rootPath + '/Ajax/weixin.ashx';
        var url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + appId + "&redirect_uri=" + location.href.split('#')[0] + "&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect"
        var code = getUrlParam("code");
        if (!code) {
            window.location = url;
        } else {
            $.ajax({
                type: 'POST',
                url: oauth_url,
                dataType: 'json',
                data: {
                    "oper": "getOpenId",
                    "code": code
                },
                success: function (data) {
                    if (data.success) {
                        //alert('微信身份识别成功 \n');
                        callback(data.openid);
                    }
                    else {
                        alert('微信身份识别失败 \n');
                    }
                },
                error: function (error) {
                    throw new Error(error)
                }
            })
        }
    } else {
        getUserinfo(wxopenid);
    }
}

function wxUserinfo(openid) {
    _SET_DATA('wxopenid', openid, '24h');
}

function getUserinfo(openid) {
    var oauth_url = rootPath + '/Ajax/weixin.ashx';
    $.ajax({
        type: 'POST',
        url: oauth_url,
        dataType: 'json',
        data: {
            "oper": "getUserInfo",
            "openid": openid
        },
        success: function (data) {
            if (data.success) {
                //alert('获取openid成功 \n');
                callback(data.openid);
            }
            else {
                alert('微信身份识别失败 \n');
            }
        },
        error: function (error) {
            throw new Error(error)
        }
    })
}

$(function () {
    wxLogin(wxUserinfo);
})