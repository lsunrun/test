

function wxstart(data) {
    var meta = document.getElementsByTagName('meta');
    var title = document.title;
    if (title == null || title == '' || title == 'undefined') {
        title = "爱思活动";
    }
    var share_desc = '';
    for (i in meta) {
        if (typeof meta[i].name != "undefined" && meta[i].name.toLowerCase() == "description") {
            share_desc = meta[i].content;
        }
    }
    if (share_desc == null || share_desc == '' || share_desc == 'undefined') {
        share_desc = '';
    }
    var url = location.href;
    var imgUrl = document.getElementById("imgUrl").value;
    if (imgUrl == null || imgUrl == '' || imgUrl == 'undefined') {
        imgUrl = "https://d-image.i4.cn/i4web/120.png";
    }
    var wxObj = {
        title: title, // 分享标题
        desc: share_desc, // 分享描述
        link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: imgUrl, // 分享图标
    }
    wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: data.appId, // 必填，公众号的唯一标识
        timestamp: data.timestamp, // 必填，生成签名的时间戳
        nonceStr: data.nonceStr, // 必填，生成签名的随机串
        signature: data.signature,// 必填，签名
        jsApiList: ['updateAppMessageShareData', 'updateTimelineShareData', 'onMenuShareWeibo', "onMenuShareTimeline", "onMenuShareAppMessage", "onMenuShareQQ", "onMenuShareQZone"] // 必填，需要使用的JS接口列表
    });
    wx.error(function (res) {
        // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
        console.log(res);
    });
    wx.ready(function () {
        //“分享给朋友”及“分享到QQ”
        wx.updateAppMessageShareData(wxObj);
        // “分享到朋友圈”及“分享到QQ空间”
        wx.updateTimelineShareData(wxObj);
        // 分享到腾讯微博
        wx.onMenuShareWeibo(wxObj);

    })
}

ajax({
    url: 'https://m.i4.cn/wap_jsonpWxShare.action?url=' + location.href.split('#')[0].split('?')[0],
    dataType: 'jsonp', jsonp: 'jsoncallback', success: (rs) => {
        wxstart(rs);
    }
})
