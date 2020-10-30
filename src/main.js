const x = localStorage.getItem("x");
let xObject = JSON.parse(x);
// 如果数组为空就给null
if (xObject && xObject.length === 0) {
  xObject = null;
}
// 初始化数据
const hashMap = xObject || [
  {
    logo:
      "https://cdnfile.aixifan.com/static/common/widget/header/img/acfunlogo.11a9841251f31e1a3316.svg",
    logoType: "image",
    url: "https://www.acfun.cn/",
  },
  {
    logo:
      "http://5b0988e595225.cdn.sohucs.com/images/20191016/ec602e85a23d443fa1184a87db3b5d2e.jpeg",
    logoType: "image",
    url: "https://www.bilibili.com",
  },
  {
    logo: "https://w1.hoopchina.com.cn/images/pc/old/hp_logo_sports.png",
    logoType: "image",
    url: "https://www.hupu.com",
  },
];
// 美化用户输入的url，去头去尾让它在页面展示时美观
let processUrl = (url) => {
  return url
    .replace(/^((http:\/\/)|(https:\/\/))(www.)?/, "")
    .replace(/\/.*/, "");
};
// 让初始化的数据把图片放在logo位置，用户新建的网址则提取第一个字母
let processLogo = (logoType, logo, url) => {
  if (logoType && logoType === "image") {
    return `<img src="${logo}" alt="">`;
  } else {
    return processUrl(url)[0].toUpperCase();
  }
};
let $siteList = $(".siteList");
let $lastList = $siteList.find(".addSite");
let render = () => {
  hashMap.forEach((item, index) => {
    $(`<li>
          <a href="${item.url}">
              <div class="site">
                  <div class="logo">${processLogo(
                    item.logoType,
                    item.logo,
                    item.url
                  )}</div>
                  <div class="link">${processUrl(item.url)}</div>
                  <svg class="icon close" aria-hidden="true" data-id=${index}>
                    <use xlink:href="#icon-close"></use>
                  </svg>
              </div>
          </a>
      </li>`).insertBefore($lastList);
  });
  // 右上角的点×关闭
  $siteList.find(".site .icon").on("click", (e) => {
    e.preventDefault();
    let index = e.currentTarget.dataset.id;
    hashMap.splice(index, 1); // 改数据
    $siteList.find("li:not(:last-child)").remove(); // 清空页面dom
    render();
  });
};
render();

$(".addButton").on("click", () => {
  let url = window.prompt("你要添加的网址是啥", "https://");
  console.log(url);
  if (url && url !== "https://" && url !== "http://") {
    if (!url.match(/^(http|https):\/\//)) {
      url = "https://" + url;
    }
    // 换成正则表达式
    let $siteList = $(".siteList");
    hashMap.push({
      logo: url[0],
      logoType: "text",
      url,
    });
    $siteList.find("li:not(:last-child)").remove(); // 清空页面dom
    render();
  }
});

window.onbeforeunload = () => {
  let string = JSON.stringify(hashMap);
  // console.log(typeof hashMap)
  // console.log('数据:'+hashMap)
  // console.log(typeof string)
  // console.log('字符串:'+string)
  window.localStorage.setItem("x", string);
  $("input").val("");
};

// 空白处点击键盘可以把数组中第一个返回的网站打开
// 假如baidu与bilibili则，哪个在前就打开哪个
$(document).on("keypress", (e) => {
  const { key } = e;
  let keyItem = hashMap.filter((item) => {
    return key === processUrl(item.url)[0];
  })[0];
  console.log(keyItem);
  window.open(keyItem.url)
});
