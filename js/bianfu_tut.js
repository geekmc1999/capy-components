/**
 * 蝙蝠视频 ForwardWidget v1.0.0
 * 源: https://257915.xyz
 * 外层反转 base64 + document.write(d()) 解混淆
 * t.me/nostremby
 */
WidgetMetadata = {
  id: "forward.bianfu.tut",
  title: "蝙蝠视频",
  version: "1.1.1",
  requiredVersion: "0.0.1",
  description: "蝙蝠视频 · 分类与官网一致 | t.me/nostremby",
  author: "宝宝巴士",
  logo: "https://fwd.uou.qzz.io/icon.png",
  site: "https://t.me/nostremby",
  detailCacheDuration: 180,
  modules: [
    {
      id: "home",
      title: "首页推荐",
      functionName: "loadHome",
      cacheDuration: 600,
      params: [
        {
          name: "tid",
          title: "分类",
          type: "enumeration",
          value: "home",
          enumOptions: [
            { title: "首页推荐", value: "home" },
            { title: "中文字幕", value: "64360061" },
            { title: "网红主播", value: "64370061" },
            { title: "成人动漫", value: "64380061" },
            { title: "欧美情色", value: "64390061" },
            { title: "国模私拍", value: "64400061" },
            { title: "韩国伦理", value: "64430061" },
            { title: "国产情色", value: "64170061" },
            { title: "日本无码", value: "64180061" },
            { title: "日韩无码", value: "64170041" },
            { title: "欧美精品", value: "64190041" },
            { title: "国产精品", value: "64200041" },
            { title: "中文字幕·2", value: "64340041" },
            { title: "动漫精品", value: "64360041" },
            { title: "日韩精品", value: "64390041" },
            { title: "自拍偷拍", value: "64430041" },
            { title: "大秀视频", value: "64580041" },
            { title: "精品推荐", value: "64360111" },
            { title: "国产色情", value: "64380111" },
            { title: "主播直播", value: "64390111" },
            { title: "91探花", value: "64630111" },
            { title: "传媒出品", value: "64750111" },
            { title: "自拍偷拍·3", value: "64500111" },
            { title: "日本精品", value: "64530111" },
            { title: "欧美精品·3", value: "64460111" },
            { title: "国产自拍", value: "64170031" },
            { title: "欧美极品", value: "64180031" },
            { title: "日韩无码·4", value: "64190031" },
            { title: "中文字幕·4", value: "64360031" },
            { title: "动漫精品·4", value: "64370031" },
            { title: "极骚萝莉", value: "64380031" },
            { title: "三级自慰", value: "64410031" },
            { title: "强奸乱伦", value: "64420031" },
            { title: "国产专区", value: "64169922" },
            { title: "日本有码", value: "64179922" },
            { title: "日本无码·磁", value: "64189922" },
            { title: "欧美色情", value: "64199922" },
            { title: "传媒作品", value: "64209922" },
            { title: "探花直播", value: "64219922" },
            { title: "网黄女神", value: "64229922" },
            { title: "绿帽淫妻", value: "64239922" },
            { title: "麻豆传媒", value: "64180121" }
          ]
        },
        { name: "page", title: "页码", type: "page" }
      ]
    },
    {
      id: "l1",
      title: "中文字幕",
      functionName: "loadL1",
      cacheDuration: 600,
      params: [
        {
          name: "tid",
          title: "分类",
          type: "enumeration",
          value: "64360061",
          enumOptions: [
            { title: "中文字幕", value: "64360061" },
            { title: "网红主播", value: "64370061" },
            { title: "成人动漫", value: "64380061" },
            { title: "欧美情色", value: "64390061" },
            { title: "国模私拍", value: "64400061" },
            { title: "韩国伦理", value: "64430061" },
            { title: "国产情色", value: "64170061" },
            { title: "日本无码", value: "64180061" }
          ]
        },
        { name: "page", title: "页码", type: "page" }
      ]
    },
    {
      id: "l2",
      title: "日韩无码",
      functionName: "loadL2",
      cacheDuration: 600,
      params: [
        {
          name: "tid",
          title: "分类",
          type: "enumeration",
          value: "64170041",
          enumOptions: [
            { title: "日韩无码", value: "64170041" },
            { title: "欧美精品", value: "64190041" },
            { title: "国产精品", value: "64200041" },
            { title: "中文字幕", value: "64340041" },
            { title: "动漫精品", value: "64360041" },
            { title: "日韩精品", value: "64390041" },
            { title: "自拍偷拍", value: "64430041" },
            { title: "大秀视频", value: "64580041" }
          ]
        },
        { name: "page", title: "页码", type: "page" }
      ]
    },
    {
      id: "l3",
      title: "精品推荐",
      functionName: "loadL3",
      cacheDuration: 600,
      params: [
        {
          name: "tid",
          title: "分类",
          type: "enumeration",
          value: "64360111",
          enumOptions: [
            { title: "精品推荐", value: "64360111" },
            { title: "国产色情", value: "64380111" },
            { title: "主播直播", value: "64390111" },
            { title: "91探花", value: "64630111" },
            { title: "传媒出品", value: "64750111" },
            { title: "自拍偷拍", value: "64500111" },
            { title: "日本精品", value: "64530111" },
            { title: "欧美精品", value: "64460111" }
          ]
        },
        { name: "page", title: "页码", type: "page" }
      ]
    },
    {
      id: "l4",
      title: "国产自拍",
      functionName: "loadL4",
      cacheDuration: 600,
      params: [
        {
          name: "tid",
          title: "分类",
          type: "enumeration",
          value: "64170031",
          enumOptions: [
            { title: "国产自拍", value: "64170031" },
            { title: "欧美极品", value: "64180031" },
            { title: "日韩无码", value: "64190031" },
            { title: "中文字幕", value: "64360031" },
            { title: "动漫精品", value: "64370031" },
            { title: "极骚萝莉", value: "64380031" },
            { title: "三级自慰", value: "64410031" },
            { title: "强奸乱伦", value: "64420031" }
          ]
        },
        { name: "page", title: "页码", type: "page" }
      ]
    },
    {
      id: "magnet",
      title: "国产专区",
      functionName: "loadMagnet",
      cacheDuration: 600,
      params: [
        {
          name: "tid",
          title: "分类",
          type: "enumeration",
          value: "64169922",
          enumOptions: [
            { title: "国产专区", value: "64169922" },
            { title: "日本有码", value: "64179922" },
            { title: "日本无码", value: "64189922" },
            { title: "欧美色情", value: "64199922" },
            { title: "传媒作品", value: "64209922" },
            { title: "探花直播", value: "64219922" },
            { title: "网黄女神", value: "64229922" },
            { title: "绿帽淫妻", value: "64239922" }
          ]
        },
        { name: "page", title: "页码", type: "page" }
      ]
    },
    {
      id: "loadResource",
      title: "播放资源",
      functionName: "loadResource",
      type: "stream",
      cacheDuration: 0,
      params: []
    }
  ],
  search: {
    title: "搜索",
    functionName: "search",
    params: [
      { name: "keyword", title: "关键词", type: "input" },
      { name: "page", title: "页码", type: "page" }
    ]
  }
};

var SITE = "https://257915.xyz";
var UA =
  "Mozilla/5.0 (Linux; Android 13; SM-S9080) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36";

function t(v) {
  return String(v == null ? "" : v).trim();
}

function headers(referer) {
  return {
    "User-Agent": UA,
    Referer: referer || SITE + "/",
    "Accept-Language": "zh-CN,zh;q=0.9",
    Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"
  };
}

function absUrl(u) {
  u = t(u);
  if (!u) return "";
  if (u.indexOf("//") === 0) return "https:" + u;
  if (u.indexOf("http") === 0) return u;
  if (u.charAt(0) === "/") return SITE + u;
  return SITE + "/" + u;
}

function fillCover(item, pic) {
  var url = absUrl(pic);
  if (!url) return item;
  item.coverUrl = url;
  item.posterPath = url;
  item.backdropPath = url;
  item.detailPoster = url;
  item.pic = url;
  item.cover = url;
  return item;
}

function b64decode(str) {
  str = t(str).replace(/[\r\n\s]/g, "");
  if (!str) return "";
  if (typeof atob === "function") {
    try {
      return atob(str);
    } catch (e) {}
  }
  var table =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var out = [];
  var i = 0;
  str = str.replace(/[^A-Za-z0-9+/=]/g, "");
  while (i < str.length) {
    var a = table.indexOf(str.charAt(i++));
    var b = table.indexOf(str.charAt(i++));
    var c = table.indexOf(str.charAt(i++));
    var d = table.indexOf(str.charAt(i++));
    var n = (a << 18) | (b << 12) | ((c & 63) << 6) | (d & 63);
    if (c !== 64 && c !== -1) out.push((n >> 16) & 255);
    if (d !== 64 && d !== -1) {
      out.push((n >> 8) & 255);
      out.push(n & 255);
    } else if (c !== 64 && c !== -1) {
      out.push((n >> 8) & 255);
    }
  }
  var s = "";
  for (var j = 0; j < out.length; j++) s += String.fromCharCode(out[j]);
  try {
    return decodeURIComponent(escape(s));
  } catch (e2) {
    return s;
  }
}

function reverseStr(s) {
  return s.split("").reverse().join("");
}

function cleanText(s) {
  s = t(s).replace(/<[^>]+>/g, "");
  s = s
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
  return s.replace(/\s+/g, " ").trim();
}

async function fetchRaw(url, referer) {
  var res = await Widget.http.get(url, { headers: headers(referer || SITE + "/") });
  var body = res && (res.data != null ? res.data : res);
  if (typeof body !== "string") {
    try {
      body = JSON.stringify(body);
    } catch (e) {
      body = String(body || "");
    }
  }
  return body || "";
}

/** 解混淆页面 */
async function fetchPage(url) {
  var html = await fetchRaw(url);
  if (!html) return "";
  var m = html.match(/\w+\('([A-Za-z0-9+/=]{1000,})/);
  var page = html;
  if (m) {
    try {
      var raw = b64decode(reverseStr(m[1]));
      var idx = raw.indexOf("<!DOCTYPE");
      if (idx < 0) idx = raw.indexOf("<html");
      page = idx >= 0 ? raw.slice(idx) : raw;
    } catch (e) {
      page = html;
    }
  }
  page = page.replace(/document\.write\(d\('([^']+)'\)\);/g, function (_, b64) {
    try {
      return b64decode(b64);
    } catch (e) {
      return "";
    }
  });
  page = page.replace(
    /<span[^>]*?display\s*:\s*none[^>]*?>[\s\S]*?<\/span>/gi,
    ""
  );
  return page;
}

function parseList(html) {
  var items = [];
  var seen = {};
  if (!html) return items;
  var blocks = html.split(/<dl>/i);
  for (var i = 1; i < blocks.length; i++) {
    var dl = blocks[i].split(/<\/dl>/i)[0] || "";
    var am =
      dl.match(/href="((?:\/video\.php|\/torrent\.php)\?id=\d+)"/i) ||
      dl.match(/href="(\/video\.php\?id=\d+)"/i);
    if (!am) continue;
    var path = am[1];
    if (seen[path]) continue;
    seen[path] = 1;
    var im = dl.match(/<img[^>]+src="([^"]+)"/i);
    var pic = im ? im[1] : "";
    var tm = dl.match(/<h3>([\s\S]*?)<\/h3>/i);
    var name = cleanText(tm ? tm[1] : "");
    if (!name || name.length > 120) continue;
    var link =
      "bf:" + path + "||" + encodeURIComponent(name);
    var item = {
      id: link,
      type: "url",
      title: name,
      name: name,
      mediaType: "movie",
      link: link,
      description: path.indexOf("torrent") >= 0 ? "磁力" : ""
    };
    items.push(fillCover(item, pic));
  }
  return items;
}

async function loadHome(params) {
  params = params || {};
  var page = parseInt(params.page, 10) || 1;
  var tid = t(params.tid || "home");
  // 右上角选了具体分类 → 走 list.php
  if (tid && tid !== "home") {
    return loadCat(tid, page);
  }
  // 默认：第 1 页抓首页推荐，翻页落到中文字幕
  if (page > 1) return loadCat("64360061", page);
  var html = await fetchPage(SITE + "/");
  return parseList(html);
}

async function loadCat(tid, page) {
  tid = t(tid) || "64360061";
  page = parseInt(page, 10) || 1;
  var url = SITE + "/list.php?id=" + encodeURIComponent(tid) + "&page=" + page;
  var html = await fetchPage(url);
  return parseList(html);
}

async function loadL1(params) {
  params = params || {};
  return loadCat(params.tid || "64360061", params.page);
}
async function loadL2(params) {
  params = params || {};
  return loadCat(params.tid || "64170041", params.page);
}
async function loadL3(params) {
  params = params || {};
  return loadCat(params.tid || "64360111", params.page);
}
async function loadL4(params) {
  params = params || {};
  return loadCat(params.tid || "64170031", params.page);
}
async function loadMagnet(params) {
  params = params || {};
  return loadCat(params.tid || "64169922", params.page);
}

async function search(params) {
  params = params || {};
  var kw = t(params.keyword || params.wd || params.q);
  if (!kw) return [];
  var out = [];
  var seen = {};
  for (var ti = 0; ti < 2; ti++) {
    var stype = String(ti + 1);
    var url =
      SITE +
      "/search.php?content=" +
      encodeURIComponent(kw) +
      "&type=" +
      stype;
    try {
      var html = await fetchPage(url);
      var list = parseList(html);
      for (var i = 0; i < list.length; i++) {
        if (!seen[list[i].id]) {
          seen[list[i].id] = 1;
          out.push(list[i]);
        }
      }
    } catch (e) {}
  }
  return out;
}

function parseLink(link) {
  var listTitle = "";
  if (typeof link === "object" && link) {
    listTitle = t(link.title || link.name || "");
    link = link.link || link.id || "";
  }
  link = t(link);
  if (link.indexOf("bf:") === 0) link = link.slice(3);
  if (link.indexOf("bfplay:") === 0) {
    var body = link.slice(7);
    try {
      body = decodeURIComponent(body);
    } catch (e) {}
    return { play: body, path: "", listTitle: listTitle };
  }
  var emb = "";
  var di = link.indexOf("||");
  if (di >= 0) {
    emb = link.slice(di + 2);
    link = link.slice(0, di);
    try {
      emb = decodeURIComponent(emb);
    } catch (e) {}
  }
  return { path: link, play: "", listTitle: listTitle || emb };
}

async function loadDetail(link) {
  var p = parseLink(link);
  var path = p.path;
  if (!path) return null;
  var listTitle = p.listTitle;
  var html = await fetchPage(absUrl(path));
  var title = listTitle || "";
  if (!title && html) {
    var hm = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
    if (hm) title = cleanText(hm[1]);
  }
  title = title || path;

  var pic = "";
  var pm = html && html.match(/<img[^>]+src="([^"]+)"/i);
  if (pm) pic = pm[1];

  var episodeItems = [];
  var hdrs = headers(SITE + "/");

  if (path.indexOf("torrent") >= 0) {
    var mm = html && html.match(/magnet:\?[^\s"'<>]+/i);
    if (mm) {
      episodeItems.push({
        id: "bfplay:" + encodeURIComponent(mm[0]),
        type: "url",
        title: title,
        name: title,
        mediaType: "movie",
        seasonNumber: 1,
        episodeNumber: 1,
        link: "bfplay:" + encodeURIComponent(mm[0]),
        playerType: "app",
        customHeaders: hdrs
      });
    }
  } else {
    var m2 =
      html &&
      html.match(/playFilteredHLS\s*\(\s*['"]video['"]\s*,\s*['"]([^'"]+)['"]/i);
    if (m2) {
      var playUrl = t(m2[1]);
      episodeItems.push({
        id: "bfplay:" + encodeURIComponent(playUrl),
        type: "url",
        title: title,
        name: title,
        mediaType: "movie",
        seasonNumber: 1,
        episodeNumber: 1,
        link: "bfplay:" + encodeURIComponent(playUrl),
        videoUrl: playUrl,
        url: playUrl,
        playerType: "app",
        customHeaders: hdrs
      });
    }
  }

  var detail = {
    id: "bf:" + path + "||" + encodeURIComponent(title),
    type: "url",
    title: title,
    name: title,
    mediaType: "movie",
    link: "bf:" + path + "||" + encodeURIComponent(title),
    episodeItems: episodeItems,
    childItems: episodeItems,
    customHeaders: hdrs
  };
  if (episodeItems.length && episodeItems[0].videoUrl) {
    detail.videoUrl = episodeItems[0].videoUrl;
    detail.playerType = "app";
  }
  return fillCover(detail, pic);
}

async function loadResource(params) {
  params = params || {};
  var raw = t(params.link || params.id || "");
  if (!raw && params.item) raw = t(params.item.link || params.item.id || "");
  var hdrs = headers(SITE + "/");
  var p = parseLink(raw);

  if (p.play) {
    var u = p.play;
    if (u.indexOf("magnet:") === 0) {
      return [{ name: "磁力", url: u, playerType: "app", customHeaders: hdrs }];
    }
    return [{ name: "在线", url: u, playerType: "app", customHeaders: hdrs }];
  }
  if (p.path) {
    var d = await loadDetail("bf:" + p.path);
    if (d && d.episodeItems && d.episodeItems.length) {
      return loadResource({ link: d.episodeItems[0].link });
    }
  }
  if (/^https?:\/\//i.test(raw) || raw.indexOf("magnet:") === 0) {
    return [{ name: "播放", url: raw, playerType: "app", customHeaders: hdrs }];
  }
  return [];
}


/* ==== CapyPlayer 组件契约适配补丁 v2.0（自动注入，请勿手改）====
 * 背景：CapyPlayer 的 forward 组件是给 iOS Forward 写的，宿主调用契约不同，导致
 *       卡片能显示、点播放报 Malformed URL。本补丁在组件代码末尾追加，不改组件内部实现。
 *
 * 五条修复：
 *  1) 【伪链去 //】宿主用「有没有 ://」区分组件内链与可直接播放的 URL。
 *     伪链写成 hj://65045 会被当直链原样播放而失败；改写成 hj:65045 后宿主才走
 *     组件资源查找（聚合）。同步改写，零网络开销，不影响板块加载速度。
 *  2) 【资源聚合兜底】宿主聚合时只传 {seriesName, type} 不给 link
 *     → 用组件自身 search 反查，再解析出直链。
 *  3) 【详情回填】loadDetail 返回的 videoUrl 为空时，用首集链接解析后回填。
 *  4) 【直抓兜底】组件自身解析函数失配（正则不覆盖目标页形态）时，
 *     直接从播放页 HTML 里捞 m3u8 / mp4。
 *  5) 【列表卡片装饰（可选，默认关闭）】把伪链解析成直链写入 item.videoUrl，
 *     用于「首页板块卡片直接播放」这条宿主不跑聚合的路径。因为必须阻塞且要发
 *     网络请求，容易超出宿主板块加载超时，默认关闭，见 CFG 说明。
 */
;(function () {
  try {
    if (typeof loadResource !== "function") return;
    var __cOrigLR = loadResource;
    var __cOrigLD = (typeof loadDetail === "function") ? loadDetail : null;
    var __cOrigSearch = (typeof search === "function") ? search : null;

    /* ===== CFG ===== */
    var MAX = 0;        // 列表卡片装饰：0 = 关闭（默认，见下方说明）；>0 = 开启，值=每列表最多解析几张卡
    var CONC = 3;       // 并发数
    var TO = 2500;      // 单卡解析超时(ms)

    /* 【为什么默认关闭列表装饰】
     * 宿主从首页板块卡片直接播放时读的是 item.videoUrl（没有就原样播 item.link），
     * 而 videoUrl 必须在列表函数返回「之前」写好——宿主会把条目拷进自己的模型，
     * 事后异步补写不会被采纳（实测）。
     * 但列表函数返回得越慢，宿主越可能判定该板块加载超时并整块丢弃（实测：
     * 需要真实网络解析的板块会空白，卡片 link 本身就是 http 直链、零额外请求的
     * 板块则正常）。因此默认关闭；确需时把 MAX 调成 1~3，并在自己的环境里
     * 逐个板块验证渲染是否正常。 */

    function __cLog(m) {
      try { if (typeof console !== "undefined" && console.log) console.log("[CapyAdp] " + m); } catch (e) {}
    }
    function __cStr(v) { return String(v == null ? "" : v); }
    function __cHttp(u) { return /^https?:\/\//i.test(__cStr(u)); }
    function __cDirect(u) { return __cHttp(u) && /\.(m3u8|mp4|flv|mkv|ts)(\?|$)/i.test(__cStr(u)); }
    function __cEps(d) {
      if (!d) return [];
      return d.episodeItems || d.childItems || d.episodes || d.items || d.list || [];
    }
    function __cLink(o) {
      if (!o) return "";
      return __cStr(o.link || o.id || o.url || o.videoUrl || o.playUrl || o.playLink || "");
    }
    function __cNorm(r) {
      if (!r || !r.length) return r || [];
      for (var i = 0; i < r.length; i++) {
        var it = r[i];
        if (it && !it.videoUrl && it.url) it.videoUrl = it.url;
      }
      return r;
    }
    function __cFirstUrl(r) {
      if (!r || !r.length) return "";
      for (var i = 0; i < r.length; i++) {
        var u = r[i] && (r[i].url || r[i].videoUrl);
        if (__cHttp(u)) return __cStr(u);
      }
      return "";
    }
    function __cAbs(u) {
      try { if (typeof absUrl === "function") return absUrl(u); } catch (e) {}
      return u;
    }
    async function __cFetch(url) {
      var fns = [];
      try { if (typeof getHtml === "function") fns.push(getHtml); } catch (e) {}
      try { if (typeof fetchHtml === "function") fns.push(fetchHtml); } catch (e) {}
      try { if (typeof httpGet === "function") fns.push(httpGet); } catch (e) {}
      try { if (typeof fetchText === "function") fns.push(fetchText); } catch (e) {}
      try { if (typeof getText === "function") fns.push(getText); } catch (e) {}
      for (var i = 0; i < fns.length; i++) {
        try { var h = await fns[i](url); if (h) return String(h); } catch (e) {}
      }
      return "";
    }
    function __cPick(html) {
      if (!html) return "";
      var m = /(https?:\/\/[^\s"'<>\\]+\.m3u8[^\s"'<>\\]*)/i.exec(html);
      if (m) return m[1].replace(/&amp;/g, "&");
      m = /(https?:\/\/[^\s"'<>\\]+\.mp4[^\s"'<>\\]*)/i.exec(html);
      if (m) return m[1].replace(/&amp;/g, "&");
      return "";
    }
    /* 从各种伪链形态里推出页面路径，再抓页面找直链 */
    async function __cGrabFrom(link) {
      var s = __cStr(link);
      if (!s) return "";
      var cands = [s];
      try { var d0 = decodeURIComponent(s); if (d0 !== s) cands.push(d0); } catch (e) {}
      for (var c = 0; c < cands.length; c++) {
        var v = cands[c];
        var parts = [v];
        if (v.indexOf("|") >= 0) parts.push(v.slice(v.indexOf("|") + 1));
        for (var p = 0; p < parts.length; p++) {
          var u = parts[p];
          if (__cHttp(u)) {
            var g0 = __cPick(await __cFetch(u));
            if (g0) return g0;
            continue;
          }
          /* 剥掉任意 scheme 前缀：hj://65045 / hj:65045 / hdplay:%2F.. / xxx:123 都能处理 */
          var sc = /^[a-zA-Z][a-zA-Z0-9+.\-]*:(\/\/)?/.exec(u);
          if (sc) u = u.slice(sc[0].length);
          try { var du = decodeURIComponent(u); if (du !== u) u = du; } catch (e) {}
          /* 纯数字 id（如 hj://65045）→ 先抓详情页，找播放页路径或内嵌直链 */
          if (/^\d+$/.test(u)) {
            var dh = await __cFetch(__cAbs("/v-" + u + ".html"));
            var g1 = __cPick(dh);
            if (g1) return g1;
            var pm2 = /href="(\/p-[\d\-]+\.html)"/.exec(dh || "");
            var cand = pm2 ? pm2[1] : ("/p-" + u + "-1-1.html");
            var g2 = __cPick(await __cFetch(__cAbs(cand)));
            if (g2) return g2;
            continue;
          }
          var sl = u.indexOf("/");
          if (sl < 0) continue;
          var full = __cAbs(u.slice(sl));
          if (!__cHttp(full)) continue;
          var g = __cPick(await __cFetch(full));
          if (g) return g;
        }
      }
      return "";
    }
    function __cTO_(p, ms) {
      return new Promise(function (res) {
        var done = false;
        var t = setTimeout(function () { if (!done) { done = true; res(""); } }, ms);
        Promise.resolve(p).then(
          function (v) { if (!done) { done = true; clearTimeout(t); res(v); } },
          function () { if (!done) { done = true; clearTimeout(t); res(""); } }
        );
      });
    }
    async function __cResolveOne(lk) {
      if (!lk) return "";
      /* 列表装饰路径：先直抓（通常 1~2 次请求且通用），再退回组件自身 loadResource。
         顺序很关键——组件自身解析对伪链常常白跑 2 次请求，会吃掉紧张的预算。 */
      try { var g = await __cGrabFrom(lk); if (g) return g; } catch (e) {}
      try {
        var r = await __cOrigLR({ link: lk, id: lk, item: { link: lk, id: lk } });
        var u = __cFirstUrl(r);
        if (u) return u;
      } catch (e) {}
      return "";
    }
    /* 组件自身 search 解析不了搜索页时的通用回退：
       直接调它自己的列表函数（loadHome 等），按标题做一次模糊匹配。
       卡片本来就来自这些列表，所以命中率很高。 */
    async function __cSearchLists(kw) {
      var out = [];
      if (!kw || !__cListFns.length) return out;
      for (var i = 0; i < __cListFns.length; i++) {
        var r = null;
        try { r = await __cListFns[i](); } catch (e) { continue; }
        if (!r || !r.length) continue;
        for (var j = 0; j < r.length; j++) {
          var it = r[j];
          if (!it) continue;
          var t = __cStr(it.title || it.name || it.seriesName);
          if (!t) continue;
          if (t.indexOf(kw) >= 0 || kw.indexOf(t) >= 0) out.push(it);
          if (out.length >= 3) return out;
        }
      }
      return out;
    }
    async function __cResolve(links) {
      for (var i = 0; i < links.length; i++) {
        var lk = links[i];
        if (!lk) continue;
        try {
          var r = await __cOrigLR({ link: lk, id: lk, item: { link: lk, id: lk } });
          if (r && r.length && __cFirstUrl(r)) return __cNorm(r);
        } catch (e) {}
      }
      for (var j = 0; j < links.length; j++) {
        if (!links[j]) continue;
        try {
          var u = await __cGrabFrom(links[j]);
          if (u) return [{ name: "默认", description: "直链", url: u, videoUrl: u, playerType: "app" }];
        } catch (e) {}
      }
      return [];
    }

    /* ===== 关键修复：伪链去 //（同步，零网络请求）=====
     * 宿主用「有没有 ://」来区分两类链接：
     *   带 //  → 当成可直接播放的 URL，原样交给播放器（伪链必然 Malformed URL）
     *   不带 // → 当成组件内链，走组件资源查找 → 触发 loadResource 聚合
     * 实测证据（app_logs.log）：
     *   Loading entry link detail: componentId=forward.juwu.tut, link=juwu:65837
     *   Using entry component detail without resource lookup: 弱美男英雄第二季   ← 卡片 link 是 hj://65045
     * 把 hj://65045 改写成 hj:65045，宿主就会走聚合，由本补丁的 loadResource 兜底解析出真实直链。 */
    function __cUnslashStr(v) {
      var s = __cStr(v);
      var m = /^([a-zA-Z][a-zA-Z0-9+.\-]*):\/\/(.+)$/.exec(s);
      if (!m) return v;
      if (/^https?$/i.test(m[1])) return v;   /* http(s) 不动 */
      return m[1] + ":" + m[2];
    }
    function __cUnslash(list) {
      if (!list || !list.length) return list;
      var keys = ["id", "link", "url", "videoUrl", "playUrl", "playLink"];
      for (var i = 0; i < list.length; i++) {
        var it = list[i];
        if (!it) continue;
        for (var k = 0; k < keys.length; k++) {
          try {
            var ov = it[keys[k]];
            if (typeof ov !== "string") continue;
            var nv = __cUnslashStr(ov);
            if (nv !== ov) it[keys[k]] = nv;
          } catch (e) {}
        }
      }
      return list;
    }

    /* ===== 列表卡片装饰（可选，见 CFG 说明）===== */
    async function __cDecorate(list) {
      if (!MAX || !list || !list.length) return list;
      var idx = [];
      for (var i = 0; i < list.length && idx.length < MAX; i++) {
        var it = list[i];
        if (!it) continue;
        if (__cDirect(it.videoUrl)) continue;
        var lk = __cLink(it);
        if (!lk || __cDirect(lk)) continue;
        idx.push(i);
      }
      if (!idx.length) return list;
      var pos = 0;
      async function worker() {
        while (pos < idx.length) {
          var k = idx[pos++];
          var u = await __cTO_(__cResolveOne(__cLink(list[k])), TO);
          try { if (u) list[k].videoUrl = u; } catch (e) {}
        }
      }
      var ws = [];
      for (var w = 0; w < CONC && w < idx.length; w++) ws.push(worker());
      try { await Promise.all(ws); } catch (e) {}
      return list;
    }
    function __cWrapList(fn) {
      return async function () {
        var r = await fn.apply(this, arguments);
        /* 同步去 // 必做且零开销；网络解析仅在 MAX>0 时做，且必须阻塞
           （宿主会把条目拷进自己的模型，事后补写 videoUrl 不被采纳）。 */
        try {
          if (r && r.length) {
            __cUnslash(r);
            if (MAX > 0) await __cDecorate(r);
          }
        } catch (e) {}
        return r;
      };
    }
    /* 按 WidgetMetadata.modules[].functionName 动态覆盖所有列表函数 */
    var __cListFns = [];
    try {
      var names = [];
      try {
        if (typeof WidgetMetadata !== "undefined" && WidgetMetadata && WidgetMetadata.modules) {
          for (var mi = 0; mi < WidgetMetadata.modules.length; mi++) {
            var nm = WidgetMetadata.modules[mi] && WidgetMetadata.modules[mi].functionName;
            if (nm && nm !== "loadResource" && nm !== "loadDetail" && nm !== "search") names.push(nm);
          }
        }
      } catch (e) {}
      var fb = ["loadHome", "loadCategory", "loadList", "loadPopular", "loadLatest",
                "loadHot", "loadRank", "loadMovie", "loadTv", "loadRecommend", "loadIndex"];
      for (var fi = 0; fi < fb.length; fi++) { if (names.indexOf(fb[fi]) < 0) names.push(fb[fi]); }
      for (var ni = 0; ni < names.length; ni++) {
        try {
          var ofn = eval(names[ni]);
          if (typeof ofn !== "function") continue;
          if (names[ni] !== "search" && names[ni] !== "loadResource" && names[ni] !== "loadDetail") {
            __cListFns.push(ofn);
          }
          eval(names[ni] + " = __cWrapList(" + names[ni] + ")");
        } catch (e) {}
      }
    } catch (e) {}

    /* ===== 详情回填（路径 A 详情页）===== */
    if (__cOrigLD) {
      loadDetail = async function (link) {
        var d = await __cOrigLD(link);
        try {
          if (d) {
            var eps = __cEps(d);
            /* 分集/子项链接同步去 //，宿主才会把它当组件内链路由回 loadResource */
            __cUnslash(eps);
            if (d.link) { var nl = __cUnslashStr(d.link); if (nl !== d.link) d.link = nl; }
            if (!__cFirstUrl([{ url: d.videoUrl }]) || (eps.length && !__cDirect(eps[0].videoUrl))) {
              /* 宿主播放的是「分集条目」，所以直链要同时写进首个分集项 */
              var targets = [];
              for (var i = 0; i < eps.length && i < 3; i++) targets.push(__cLink(eps[i]));
              if (!targets.length) targets.push(__cLink(d));
              for (var k = 0; k < targets.length; k++) {
                if (!targets[k]) continue;
                var rk = await __cResolve([targets[k]]);
                var uk = __cFirstUrl(rk);
                if (!uk) continue;
                if (!d.videoUrl) d.videoUrl = uk;
                if (eps[k] && !__cDirect(eps[k].videoUrl)) { try { eps[k].videoUrl = uk; } catch (e) {} }
                break;
              }
            }
          }
        } catch (e) {}
        return d;
      };
    }

    /* ===== 资源聚合兜底（路径 A）===== */
    loadResource = async function (params) {
      params = params || {};
      var r = [];
      try { r = await __cOrigLR(params); } catch (e) { r = []; }
      if (r && r.length && __cFirstUrl(r)) return __cNorm(r);
      /* 宿主直接给了 link（分集/条目链接）→ 不用标题反查，直接拿它去解析 */
      var lk0 = __cStr(params.link || params.id || params.url || params.videoUrl);
      if (!lk0 && params.item) lk0 = __cStr(params.item.link || params.item.id || "");
      if (lk0) {
        var r0 = await __cResolve([lk0]);
        if (r0.length) return r0;
      }
      var kw = __cStr(params.seriesName || params.title || params.keyword || params.query || params.name);
      if (!kw || !__cOrigSearch) return __cNorm(r);
      try {
        var sr = await __cOrigSearch({ keyword: kw });
        if (!sr || !sr.length) sr = await __cSearchLists(kw);   /* search 解析不了就回退列表匹配 */
        if (!sr || !sr.length) return __cNorm(r);
        var links = [];
        for (var i = 0; i < sr.length && i < 2; i++) links.push(__cLink(sr[i]));
        var r2 = await __cResolve(links);
        if (r2.length) return r2;
        for (var j = 0; j < links.length && j < 2; j++) {
          if (!links[j] || !__cOrigLD) continue;
          try {
            var d = await __cOrigLD(links[j]);
            var eps = __cEps(d);
            var el = [];
            for (var k = 0; k < eps.length && k < 3; k++) el.push(__cLink(eps[k]));
            var r3 = await __cResolve(el);
            if (r3.length) return r3;
          } catch (e) {}
        }
      } catch (e) {}
      return __cNorm(r);
    };
  } catch (e) {}
})();
/* ==== 补丁结束 ==== */
