/**
 * 橙果短剧 ForwardWidget
 * 站点: https://chengguodj.com
 * 作者: 宝宝巴士 | t.me/nostremby
 */
WidgetMetadata = {
  id: "forward.chengguo.tut",
  title: "橙果短剧",
  version: "1.0.2",
  requiredVersion: "0.0.1",
  description: "橙果短剧 · 原创/魔改/漫剧/真人/AI · t.me/nostremby",
  author: "宝宝巴士",
  site: "https://t.me/nostremby",
  logo: "https://fwd.uou.qzz.io/icon.png",
  detailCacheDuration: 300,
  modules: [
    {
      id: "yuanchuang",
      title: "原创短剧",
      functionName: "loadYuanchuang",
      cacheDuration: 600,
      params: [{ name: "page", title: "页码", type: "page" }]
    },
    {
      id: "mogai",
      title: "魔改短剧",
      functionName: "loadMogai",
      cacheDuration: 600,
      params: [{ name: "page", title: "页码", type: "page" }]
    },
    {
      id: "manju",
      title: "漫剧",
      functionName: "loadManju",
      cacheDuration: 600,
      params: [{ name: "page", title: "页码", type: "page" }]
    },
    {
      id: "zhenren",
      title: "真人短剧",
      functionName: "loadZhenren",
      cacheDuration: 600,
      params: [{ name: "page", title: "页码", type: "page" }]
    },
    {
      id: "aiduanju",
      title: "AI短剧",
      functionName: "loadAiduanju",
      cacheDuration: 600,
      params: [{ name: "page", title: "页码", type: "page" }]
    },
    {
      id: "browse",
      title: "片库索引",
      functionName: "loadBrowse",
      cacheDuration: 600,
      params: [{ name: "page", title: "页码", type: "page" }]
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

var SITE = "https://chengguodj.com";
var UA =
  "Mozilla/5.0 (iPhone; CPU iPhone OS 16_6_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1";

function t(v) {
  return String(v == null ? "" : v).trim();
}

function headers(ref) {
  return {
    "User-Agent": UA,
    Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "zh-CN,zh;q=0.9",
    Referer: ref || SITE + "/"
  };
}

async function fetchHtml(url) {
  var res = await Widget.http.get(url, { headers: headers(SITE + "/") });
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

function absUrl(u) {
  u = t(u)
    .replace(/\\u002[fF]/g, "/")
    .replace(/\\\//g, "/")
    .replace(/\\/g, "");
  if (!u) return "";
  if (u.indexOf("//") === 0) return "https:" + u;
  if (u.indexOf("http") === 0) return u;
  if (u.charAt(0) === "/") return SITE + u;
  return SITE + "/" + u;
}

/** 站内封面反代 /_img/base64url */
function proxyImg(raw) {
  raw = absUrl(raw);
  if (!raw) return "";
  if (raw.indexOf(SITE + "/_img/") === 0) return raw;
  try {
    var b64 = base64UrlEncode(raw);
    return SITE + "/_img/" + b64;
  } catch (e) {
    return raw;
  }
}

function base64UrlEncode(str) {
  var chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var utf8 = unescape(encodeURIComponent(str));
  var out = "";
  for (var i = 0; i < utf8.length; i += 3) {
    var c1 = utf8.charCodeAt(i);
    var c2 = i + 1 < utf8.length ? utf8.charCodeAt(i + 1) : 0;
    var c3 = i + 2 < utf8.length ? utf8.charCodeAt(i + 2) : 0;
    var e1 = c1 >> 2;
    var e2 = ((c1 & 3) << 4) | (c2 >> 4);
    var e3 = ((c2 & 15) << 2) | (c3 >> 6);
    var e4 = c3 & 63;
    if (i + 1 >= utf8.length) {
      e3 = 64;
      e4 = 64;
    } else if (i + 2 >= utf8.length) {
      e4 = 64;
    }
    out +=
      chars.charAt(e1) +
      chars.charAt(e2) +
      (e3 === 64 ? "=" : chars.charAt(e3)) +
      (e4 === 64 ? "=" : chars.charAt(e4));
  }
  return out.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function fillCover(item, pic) {
  var url = proxyImg(pic);
  if (!url) return item;
  item.coverUrl = url;
  item.posterPath = url;
  item.backdropPath = url;
  item.detailPoster = url;
  item.posterUrl = url;
  item.pic = url;
  item.image = url;
  item.cover = url;
  return item;
}

function parseNuxtArr(html) {
  var m = html.match(
    /<script[^>]+id=["']__NUXT_DATA__["'][^>]*>([\s\S]*?)<\/script>/i
  );
  if (!m) return null;
  try {
    return JSON.parse(t(m[1]));
  } catch (e) {
    return null;
  }
}

function nuxtVal(arr, idx) {
  if (typeof idx === "number" && idx >= 0 && idx < arr.length) {
    return arr[idx];
  }
  return idx;
}

function extractListFromNuxt(html) {
  var arr = parseNuxtArr(html);
  if (!arr || !arr.length) return [];
  var items = [];
  var seen = {};

  for (var i = 0; i < arr.length; i++) {
    var item = arr[i];
    if (!item || typeof item !== "object") continue;
    if (!("title" in item)) continue;
    if (!("slug" in item) && !("detail_route" in item)) continue;

    var title = nuxtVal(arr, item.title);
    if (!title || typeof title !== "string") continue;
    title = t(title);
    if (!title) continue;

    var dramaPath = nuxtVal(arr, item.detail_route);
    if (!dramaPath || typeof dramaPath !== "string") {
      var slug = nuxtVal(arr, item.slug);
      if (slug && typeof slug === "string") {
        dramaPath = "/drama/" + slug;
      }
    }
    if (!dramaPath || typeof dramaPath !== "string") continue;
    dramaPath = t(dramaPath);
    if (seen[dramaPath]) continue;
    seen[dramaPath] = 1;

    var pic = "";
    var coverObj = nuxtVal(arr, item.cover);
    if (coverObj && typeof coverObj === "object") {
      var rawU = nuxtVal(arr, coverObj.url);
      if (rawU && typeof rawU === "string") pic = rawU;
    }

    var eps =
      nuxtVal(arr, item.total_episode_count) ||
      nuxtVal(arr, item.published_episode_count) ||
      nuxtVal(arr, item.latest_episode_number);
    if (typeof eps === "object") eps = "";
    var remarks = eps ? "全" + eps + "集" : "";

    var coverRaw = pic || "";
    var link =
      "cg:" +
      dramaPath +
      "||" +
      encodeURIComponent(title) +
      "||" +
      encodeURIComponent(coverRaw);
    var row = {
      id: "cg:" + dramaPath,
      type: "url",
      title: title,
      name: title,
      description: remarks,
      mediaType: "tv",
      link: link
    };
    items.push(fillCover(row, coverRaw));
  }
  return items;
}

function catUrl(tid, page) {
  page = parseInt(page, 10) || 1;
  if (page <= 1) return SITE + "/" + tid;
  return SITE + "/" + tid + "/page-" + page;
}

async function loadByTid(tid, params) {
  params = params || {};
  var page = params.page || 1;
  var html = await fetchHtml(catUrl(tid, page));
  return extractListFromNuxt(html);
}

async function loadYuanchuang(params) {
  return loadByTid("yuanchuang", params);
}
async function loadMogai(params) {
  return loadByTid("mogai", params);
}
async function loadManju(params) {
  return loadByTid("manju", params);
}
async function loadZhenren(params) {
  return loadByTid("zhenren", params);
}
async function loadAiduanju(params) {
  return loadByTid("aiduanju", params);
}
async function loadBrowse(params) {
  return loadByTid("browse", params);
}

async function search(params) {
  params = params || {};
  var keyword = t(params.keyword);
  if (!keyword) return [];
  var page = parseInt(params.page, 10) || 1;
  var url =
    SITE +
    "/search?keyword=" +
    encodeURIComponent(keyword) +
    (page > 1 ? "&page=" + page : "");
  var html = await fetchHtml(url);
  return extractListFromNuxt(html);
}

function parseLink(link) {
  var raw = t(typeof link === "object" ? link.link || link.id || "" : link);
  var listTitle = "";
  var listPic = "";
  if (typeof link === "object" && link) {
    listTitle = t(link.title || link.name || "");
    listPic = t(link.coverUrl || link.posterPath || link.pic || "");
  }
  if (raw.indexOf("cg:") === 0) raw = raw.slice(3);
  if (raw.indexOf("||") >= 0) {
    var parts = raw.split("||");
    raw = parts[0];
    if (parts.length >= 2 && !listTitle) {
      try {
        listTitle = decodeURIComponent(parts[1]);
      } catch (e) {
        listTitle = parts[1];
      }
    }
    if (parts.length >= 3 && !listPic) {
      try {
        listPic = decodeURIComponent(parts[2]);
      } catch (e) {
        listPic = parts[2];
      }
    }
  }
  return { path: raw, listTitle: listTitle, listPic: listPic };
}

function isBadPic(u) {
  u = t(u);
  if (!u) return true;
  return /social-default|shared\/logo|logo\.png|placeholder|default\.(jpg|png)/i.test(u);
}

async function resolvePlay(playPath) {
  var url = absUrl(playPath);
  var html = await fetchHtml(url);
  var arr = parseNuxtArr(html);
  if (arr) {
    for (var i = 0; i < arr.length; i++) {
      var v = arr[i];
      if (typeof v === "string" && v.indexOf(".m3u8") >= 0 && v.indexOf("http") === 0) {
        return v.replace(/\\u002[fF]/g, "/").replace(/\\\//g, "/");
      }
    }
  }
  var m = html.match(/["'](https?:\/\/[^"'\s<>\\]+\.m3u8[^"'\s<>\\]*)["']/i);
  if (m) {
    return m[1].replace(/\\u002[fF]/g, "/").replace(/\\\//g, "/");
  }
  return "";
}

async function loadDetail(link) {
  var parsed = parseLink(link);
  var path = parsed.path;
  if (!path) return null;
  var listTitle = parsed.listTitle;
  var listPic = parsed.listPic;

  var detailUrl = absUrl(path);
  var html = await fetchHtml(detailUrl);

  var title = listTitle || "";
  if (!title) {
    var tm = html.match(/<title>([^<]+)<\/title>/i);
    if (tm) {
      title = t(tm[1].split("-")[0])
        .replace(/在线观看/g, "")
        .trim();
    }
  }
  if (!title) title = path;

  // 详情页几乎没有真图（只有 social-default），优先列表封面
  var pic = listPic || "";
  var wlw = html.match(/["'](https?:\/\/[^"']*wlwvch\.cn[^"']+)["']/i);
  if (wlw && !isBadPic(wlw[1])) pic = wlw[1];
  if (isBadPic(pic)) {
    var og = html.match(/property="og:image"\s+content="([^"]+)"/i);
    if (og && !isBadPic(og[1])) pic = og[1];
  }
  if (isBadPic(pic)) {
    var arr0 = parseNuxtArr(html);
    if (arr0) {
      for (var pi = 0; pi < arr0.length; pi++) {
        var pv = arr0[pi];
        if (
          typeof pv === "string" &&
          /\.(jpg|jpeg|png|webp)/i.test(pv) &&
          pv.indexOf("http") === 0 &&
          !isBadPic(pv)
        ) {
          pic = pv;
          break;
        }
      }
    }
  }
  if (isBadPic(pic)) pic = listPic || "";

  var desc = "";
  var dm = html.match(
    /<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i
  );
  if (dm) desc = t(dm[1]);

  var slug = path.replace(/\/+$/, "").split("/").pop();
  var episodes = [];
  var arr = parseNuxtArr(html);
  if (arr) {
    for (var i = 0; i < arr.length; i++) {
      var item = arr[i];
      if (!item || typeof item !== "object") continue;
      if (!("total_episode_count" in item)) continue;
      var tot = nuxtVal(arr, item.total_episode_count);
      if (typeof tot === "number" && tot > 0) {
        for (var ep = 1; ep <= tot; ep++) {
          episodes.push({
            name: "第" + ep + "集",
            path: "/play/" + slug + "/" + ep
          });
        }
        break;
      }
    }
  }

  if (!episodes.length) {
    var links = html.match(/href=["'](\/play\/[^"']+)["']/gi) || [];
    var seen = {};
    for (var li = 0; li < links.length; li++) {
      var hm = links[li].match(/href=["'](\/play\/[^"']+)["']/i);
      if (!hm) continue;
      var p = hm[1];
      if (seen[p]) continue;
      seen[p] = 1;
      var num = p.split("/").pop();
      episodes.push({
        name: /^\d+$/.test(num) ? "第" + num + "集" : num,
        path: p
      });
    }
  }

  if (!episodes.length) {
    var totM = html.match(/(\d+)\s*(?:集|话)/);
    var maxEp = totM ? parseInt(totM[1], 10) : 1;
    if (maxEp > 200) maxEp = 40;
    for (var e = 1; e <= maxEp; e++) {
      episodes.push({ name: "第" + e + "集", path: "/play/" + slug + "/" + e });
    }
  }

  var hdrs = {
    "User-Agent": UA,
    Referer: SITE + "/"
  };
  var coverFinal = proxyImg(pic);
  var episodeItems = [];
  for (var ei = 0; ei < episodes.length; ei++) {
    var ep = episodes[ei];
    var epTitle =
      episodes.length === 1 ? title : title + " " + ep.name;
    var epItem = {
      id: "cgplay:" + ep.path,
      type: "url",
      title: epTitle,
      name: ep.name,
      mediaType: "tv",
      seasonNumber: 1,
      episodeNumber: ei + 1,
      link: "cgplay:" + encodeURIComponent(ep.path),
      playerType: "app",
      customHeaders: hdrs
    };
    episodeItems.push(epItem);
  }

  var resolveMax = Math.min(episodeItems.length, 8);
  for (var ri = 0; ri < resolveMax; ri++) {
    try {
      var real = await resolvePlay(episodes[ri].path);
      if (real) {
        episodeItems[ri].videoUrl = real;
        episodeItems[ri].url = real;
      }
    } catch (e) {}
  }

  var detail = {
    id: "cg:" + path,
    type: "url",
    title: title,
    name: title,
    description: desc,
    mediaType: "tv",
    link:
      "cg:" +
      path +
      "||" +
      encodeURIComponent(title) +
      "||" +
      encodeURIComponent(pic || listPic || ""),
    episodeItems: episodeItems,
    customHeaders: hdrs
  };

  for (var vi = 0; vi < episodeItems.length; vi++) {
    if (episodeItems[vi].videoUrl) {
      detail.videoUrl = episodeItems[vi].videoUrl;
      detail.playerType = "app";
      break;
    }
  }

  // 最后再写一遍封面，防止被其它字段冲掉
  detail = fillCover(detail, pic || coverFinal);
  if (coverFinal) {
    detail.coverUrl = coverFinal;
    detail.posterPath = coverFinal;
    detail.backdropPath = coverFinal;
    detail.detailPoster = coverFinal;
  }
  return detail;
}

async function loadResource(params) {
  params = params || {};
  var link = t(params.link || params.id || params.url || params.videoUrl || "");
  var hdrs = {
    "User-Agent": UA,
    Referer: SITE + "/"
  };

  if (link.indexOf("http") === 0 && /\.m3u8/i.test(link)) {
    return [
      { name: "默认", url: link, playerType: "app", customHeaders: hdrs }
    ];
  }

  if (link.indexOf("cgplay:") === 0) {
    var path = decodeURIComponent(link.slice(7));
    var url = await resolvePlay(path);
    if (url) {
      return [
        { name: "默认", url: url, playerType: "app", customHeaders: hdrs }
      ];
    }
    return [];
  }

  if (link.indexOf("cg:") === 0 || link.indexOf("/drama/") >= 0) {
    var d = await loadDetail(link);
    if (d && d.videoUrl) {
      return [
        {
          name: "默认",
          url: d.videoUrl,
          playerType: "app",
          customHeaders: hdrs
        }
      ];
    }
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
