
// 动态设置根大小 以致 rem
var resizeFun = function () {
    document.documentElement.style.fontSize =
        (document.documentElement.clientWidth / 750) * 100 + 'px';
}
resizeFun();

var resizeId = null;

window.onresize = function () {
    clearTimeout(resizeId);
    resizeId = setTimeout(resizeFun, 30);
}

window.addEventListener("load", resizeFun, false);//false 是默认的 可以不写

var common = {
    /**
     * 展示弹窗
     */
    showBasePopup: function (data, Fun, cancelFun) {
        var mask = document.createElement('div');
        mask.className = 'm-mask';
        var popup = ''
        popup += '  <div class="m-basePopup">';
        popup += '     <a class="m-close close">X</a>';
        popup += '     <div class="m-wrapPopup">';
        popup += data.tip || '';
        popup += '      </div>';
        if (data.btn) {
            popup += '          <div class="m-wrap-btn">';
            popup += '              <button style="' + (data.sureBtn ? '' : 'display:none') + '">' + (data.sureBtn || "确定") + '</button>';
            popup += '              <button style="' + (data.cancelBtn ? '' : 'display:none') + '">' + (data.cancelBtn || "取消") + '</button>';
            popup += '          </div>';
        }
        popup += '  </div>';
        mask.innerHTML = popup;
        document.body.appendChild(mask);

        //关闭弹窗
        document.getElementsByClassName('m-close')[0].onclick = function () {
            common.closeMask();
        }
        if (data.btn) {
            var queryBtn = document.getElementsByClassName('m-wrap-btn')[0].getElementsByTagName('button');
            queryBtn[0].onclick = function () {
                if (Fun) Fun();
            }
            queryBtn[1].onclick = function () {
                common.closeMask();
                if (cancelFun) cancelFun();
            }
            if (data.sureBtn && data.cancelBtn) queryBtn[0].style.marginRight = 20 / 100 / (document.documentElement.clientWidth / 750) + 'rem';
        }

    },
    /**
     * 关闭弹窗
     */
    closeMask: function () {
        document.body.removeChild(document.getElementsByClassName("m-mask")[0]);
    }
}

