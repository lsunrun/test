
window.onload = function () {

    /**
     * 动画雪碧图
     */
    // var fireworks = [];
    // for (var i = 0; i < 24; i++) {
    //     fireworks.push([i * 56 + 'vw', '0rem']);
    // }
    // new FrameAnimation({
    //     frames: fireworks,
    //     frameSize: ["56vw", "56vw"],
    //     image: "img/Mouse24.png",
    //     imageEl: document.getElementsByClassName("Mouse24")[0],
    //     frameSpeed: 12
    // });
    var $mask = document.getElementsByClassName('mask')[0];//模态框
    var $popup = document.getElementsByClassName('popup')[0]//弹窗
    /**
     * 请求系统时间
     */
    var SERVERHOST = "https://usercenter2.i4.cn/";
    /**
     * 活动状态
     * 进行中 10  已结束 100
     */
    var STATUS = 1;
    /**
     * 判断是否在爱思助手中打开
     * window.navigator.userAgent.toLowerCase().includes("i4tools");
     */
    var IS_I4TOOLS = null;
    var IS = window.navigator.userAgent.toLowerCase();
    try {
        IS_I4TOOLS = IS.includes("i4tools"); //尝试includes
    } catch (e) {
        IS_I4TOOLS = IS.indexOf("i4tools") > -1; //如果报错就使用 indexOf
    }

    var startTime = new Date("2019/4/1 23:59:59").getTime();//开始
    var endTime = new Date("2019/5/1 23:59:59").getTime();//结束
    /**
    * 判断是否在爱思助手中打开
    * checkTime(new Date(2019, 5 - 1, 5, 23, 59, 59).getTime());
    * checkTime(new Date("2019/5/1 23:59:59").getTime());
    */
    function checkTime(serveTime) {
        if (endTime < serveTime) {
            STATUS = 100; //已结束
            return;
        }
        STATUS = 10;
    }

    !function Datetime() {
        ajax({
            url: SERVERHOST + "getsystime.xhtml",
            method: "get",
            dataType: "jsonp",
            success: function (rs) {
                var serveTime = rs.date.timemillis;
                checkTime(serveTime);

            },
            error: function () {
                var nowTime = new Date();
                checkTime(nowTime.getTime());
            }
        });
    }()


    /**
    * 请前往爱思助手加强版中参与活动
    * 活动未开始
    * 当前不在活动时间内
    */
    function showTitle() {
        if (!IS_I4TOOLS) {
            // $mask.style.display = 'block';
            // $popup2.style.display = 'block';
            // $otherTitle.innerHTML = "请前往爱思助手加强版中参与活动";
            return true;
        }
        if (STATUS == 1) {
            // $mask.style.display = 'block';
            // $popup2.style.display = 'block';
            // $otherTitle.innerHTML = "活动未开始";
            return true;
        }
        if (STATUS == 100) {
            // $mask.style.display = 'block';
            // $popup2.style.display = 'block';
            // $otherTitle.innerHTML = "当前不在活动时间内";
            return true;
        }
        return false;

    }


    // var contnetScrollEls = document.getElementsByClassName("content-scroll");
    // for (var i = 0; i < contnetScrollEls.length; ++i) {
    //     new DScroll(contnetScrollEls[i]);
    // }

    /**
    * 滚动的时候把body的滚动禁止掉
    */
    var ModalHelper = (function (bodyCls) {
        var scrollTop;
        return {
            afterOpen: function () {
                scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                document.body.classList.add(bodyCls);
                document.body.style.top = -scrollTop + 'px';
            },
            beforeClose: function () {
                document.body.classList.remove(bodyCls);
                document.body.scrollTop = document.documentElement.scrollTop = scrollTop;
            }
        };
    })('modal-open');


    document.getElementById("layout").addEventListener("click", function (e) {
        var target = e.target;
        if (target) {
            // if (showTitle()) return;
            if (target.classList.contains("")) {
                /**
                 *  window.location.href = "route_pushid=10";   优惠券10
                 *  window.location.href = "route_pushid=11";   优惠券50
                 *  window.location.href = "route_pushid=12";   优惠券100
                 *  window.location.href = "share.action ";     分享按钮
                 *  window.location.href = "i4_activity_appid=" + id; //游戏点击
                 */
                window.location.href = "route_pushid=10";
                window.location.href = "route_pushid=11";
                window.location.href = "route_pushid=12";
                return;
            } else if (target.classList.contains("btn-share")) { ////分享按钮点击
                common.showBasePopup({
                    btn: true,
                    sureBtn: '确定',
                    cancelBtn: '取消',
                    tip: '2222啊'
                })
                // if (!IS_I4TOOLS) {
                //     $mask.style.display = 'block';
                //     $popup2.style.display = 'block';
                //     $otherTitle.innerHTML = "请前往爱思助手加强版中参与活动";
                //     return;
                // }
                // window.location.href = "share.action ";
            }
            else if (target.classList.contains("game")) { ////轮播点击
                var id = target.getAttribute("appid");
                window.location.href = "i4_activity_appid=" + id; //游戏点击
            }
        }
    })

    //点击区域关闭
    // $popup.onclick = function (e) {
    //     e.preventDefault();
    //     e.stopPropagation();
    //     $popup.style.display = 'none';
    //     $mask.style.display = 'none';
    //     ModalHelper.beforeClose();//恢复滚动 并且定位位置

    // }
    // //点关闭按钮
    // $cancelPop.onclick = function (e) {
    //     $popup.click();
    // }


    // //阻止点击内容关闭
    // $rulepopup.onclick = function (e) {
    //     e.preventDefault();
    //     e.stopPropagation();
    // }

    // var mySwiper = new Swiper('.swiper-container', {
    //     direction: 'horizontal',
    //     loop: true,
    //     autoplay: {
    //         disableOnInteraction: false,//触碰后还会自动滑
    //         waitForTransition: false,
    //     },
    //     slidesPerView: "auto",
    //     centeredSlides: true,
    //     spaceBetween: 30,
    // })

}
