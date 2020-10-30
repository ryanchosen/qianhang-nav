// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"epB2":[function(require,module,exports) {
var x = localStorage.getItem("x");
var xObject = JSON.parse(x); // 如果数组为空就给null

if (xObject && xObject.length === 0) {
  xObject = null;
} // 初始化数据


var hashMap = xObject || [{
  logo: "https://cdnfile.aixifan.com/static/common/widget/header/img/acfunlogo.11a9841251f31e1a3316.svg",
  logoType: "image",
  url: "https://www.acfun.cn/"
}, {
  logo: "http://5b0988e595225.cdn.sohucs.com/images/20191016/ec602e85a23d443fa1184a87db3b5d2e.jpeg",
  logoType: "image",
  url: "https://www.bilibili.com"
}, {
  logo: "https://w1.hoopchina.com.cn/images/pc/old/hp_logo_sports.png",
  logoType: "image",
  url: "https://www.hupu.com"
}]; // 美化用户输入的url，去头去尾让它在页面展示时美观

var processUrl = function processUrl(url) {
  return url.replace(/^((http:\/\/)|(https:\/\/))(www.)?/, "").replace(/\/.*/, "");
}; // 让初始化的数据把图片放在logo位置，用户新建的网址则提取第一个字母


var processLogo = function processLogo(logoType, logo, url) {
  if (logoType && logoType === "image") {
    return "<img src=\"".concat(logo, "\" alt=\"\">");
  } else {
    return processUrl(url)[0].toUpperCase();
  }
};

var $siteList = $(".siteList");
var $lastList = $siteList.find(".addSite");

var render = function render() {
  hashMap.forEach(function (item, index) {
    $("<li>\n          <a href=\"".concat(item.url, "\">\n              <div class=\"site\">\n                  <div class=\"logo\">").concat(processLogo(item.logoType, item.logo, item.url), "</div>\n                  <div class=\"link\">").concat(processUrl(item.url), "</div>\n                  <svg class=\"icon close\" aria-hidden=\"true\" data-id=").concat(index, ">\n                    <use xlink:href=\"#icon-close\"></use>\n                  </svg>\n              </div>\n          </a>\n      </li>")).insertBefore($lastList);
  }); // 右上角的点×关闭

  $siteList.find(".site .icon").on("click", function (e) {
    e.preventDefault();
    var index = e.currentTarget.dataset.id;
    hashMap.splice(index, 1); // 改数据

    $siteList.find("li:not(:last-child)").remove(); // 清空页面dom

    render();
  });
};

render();
$(".addButton").on("click", function () {
  var url = window.prompt("你要添加的网址是啥", "https://");
  console.log(url);

  if (url && url !== "https://" && url !== "http://") {
    if (!url.match(/^(http|https):\/\//)) {
      url = "https://" + url;
    } // 换成正则表达式


    var _$siteList = $(".siteList");

    hashMap.push({
      logo: url[0],
      logoType: "text",
      url: url
    });

    _$siteList.find("li:not(:last-child)").remove(); // 清空页面dom


    render();
  }
});

window.onbeforeunload = function () {
  var string = JSON.stringify(hashMap); // console.log(typeof hashMap)
  // console.log('数据:'+hashMap)
  // console.log(typeof string)
  // console.log('字符串:'+string)

  window.localStorage.setItem("x", string);
  $("input").val("");
}; // 空白处点击键盘可以把数组中第一个返回的网站打开
// 假如baidu与bilibili则，哪个在前就打开哪个


$(document).on("keypress", function (e) {
  var key = e.key;
  var keyItem = hashMap.filter(function (item) {
    return key === processUrl(item.url)[0];
  })[0];
  console.log(keyItem);
  window.open(keyItem.url);
});
},{}]},{},["epB2"], null)
//# sourceMappingURL=main.7ec4f837.js.map