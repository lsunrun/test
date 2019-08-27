function ajax(options) {
  options = {
    url: options.url || '',
    method: options.method || 'POST',
    dataType: options.dataType || 'json',
    jsonp: options.jsonp || "callback",
    jsonpCallback: options.jsonpCallback || "",
    asyn: options.asyn || true,
    contentType: options.contentType || "application/x-www-form-urlencoded",
    timeout: options.timeout || 30000,
    success: options.success || function () { },
    error: options.error || function () { },
    complete: options.complete || function () { },
    onTimeout: options.onTimeout || function () {
      options.error(0, 0, "timeout");
      options.complete();
    },
    data: options.data || {},
    header: options.header || null,
    cookies: options.cookies || false,//跨越时是否携带cookie
  };
  var xhr = (function () {

    if (typeof XMLHttpRequest !== undefined) {
      return new XMLHttpRequest();
    } else {
      var versions = ['MS2XML.XMLHTTP.6.0', 'MS2XML.XMLHTTP.3.0', 'MS2XML.XMLHTTP', 'Microsoft.XMLHTTP'];
      for (var i = 0; i < versions.length; i++) {
        try {
          return new ActiveXObject(versions[i]);
        } catch (e) {
          console.warn(e);
          continue;
        }
      }
    }
  })();
  /**
   * 一、首先创建XMLHttpRequest对象,也就是创建一个异步调用对象，拿到 XMLHttpRequest的实列  xhr
   * 两种方式 ：
   * 1.IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码 var xhr = new XMLHttpRequest() 
   * 2.IE6, IE5 浏览器执行代码 var xhr=new ActiveXObject("Microsoft.XMLHTTP");
   */

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if ((200 <= xhr.status < 300)
        || (xhr.status === 304)
        || (!xhr.status && location.protocol === 'file:')
        || (window.userAgent.indexOf('Safari') !== -1 && typeof xhr.status === undefined)) {
        var contentType = xhr.getResponseHeader('Content-Type');
        var isXMLType = !options.dataType && contentType && contentType.indexOf('xml') >= 0;
        var data = (options.dataType.toLowerCase() === 'xml') || isXMLType ? xhr.responseXML : xhr.responseText;
        try {
          if (options.dataType.toLowerCase() === 'script') {
            eval.call(window, data);
          } else if (options.dataType.toLowerCase() === 'json') {
            data = JSON.parse(data);
          }
          options.success(data);
        } catch (e) {
          options.error(xhr.readyState, xhr.status, console.error(e));
        }
      } else {
        options.error({
          error: console.error("请求失败：", e.responseURL),
          readyState: xhr.readyState,
          status: xhr.status,
        });
      }
      options.complete();
      xhr = null;
    }
  };

  if (options.method.toLowerCase() === 'get') {
    var datastr = typeof options.data === "object" ? serialize(options.data) : serialize({ data: options.data });
    if (datastr) {
      options.url += options.url.indexOf('?') === -1 ? '?' : '&';
      options.url += datastr;
    }
  }
  options.url += (options.url.indexOf('?') === -1 ? '?' : '&') + "_=" + Date.now();
  if (options.dataType === 'jsonp') {
    options.jsonpCallback = options.jsonpCallback || "jsonpcallback" + Date.now() + '_' + Math.floor(Math.random() * 1000000);
    window[options.jsonpCallback] = function (jsondata) {
      options.success(jsondata);
    };
    options.url += (options.url.indexOf('?') === -1 ? '?' : '&') + options.jsonp + "=" + options.jsonpCallback;

    var script = document.createElement('script');
    script.setAttribute('src', options.url);
    // 把script标签加入head，此时调用开始
    document.getElementsByTagName('head')[0].appendChild(script);
    return;
  }
  xhr.open(options.method, options.url, options.asyn);
  xhr.timeout = options.timeout;
  xhr.ontimeout = options.onTimeout;
  xhr.setRequestHeader("Content-type", options.contentType);
  if (options.header) {
    for (var i in options.header) {
      xhr.setRequestHeader(i, options.header[i]);
    }
  }
  if (options.cookies) xhr.withCredentials = true; //跨越时是否携带cookie

  if (options.contentType == "application/json") {
    xhr.send(typeof options.data === "object" ? JSON.stringify(options.data) : options.data);
  } else if (options.method.toLowerCase() === 'post') {
    xhr.send(typeof options.data === "object" ? serialize(options.data) : options.data);
  } else {
    xhr.send(null);
  }
};

function serialize(data) {
  if (typeof data == "string") return data;
  var results = [];
  for (var key in data) {
    // results.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
    results.push(key + '=' + data[key]);
  }
  return results.join('&');
}

function ajaxPost(url, data, success, error) {
  ajax({
    url: url,
    method: "post",
    dataType: "json",
    data: data,
    contentType: "application/json",
    success: function (res) {
      success(res);

    },
    error: function (res) {
      if (typeof error === 'function') {
        error(res);
      }
    }
  });
}

function ajaxGet(url, data, header, success, error) {
  ajax({
    url: url,
    method: "get",
    dataType: "json",
    data: data,
    contentType: "application/json",
    header: header,
    success: function (res) {
      success(res);

    },
    error: function (res) {
      if (typeof error === 'function') {
        error(res);
      }
    }
  });
}