/**
 * SupJAV ForwardWidget v1.3.0
 * 403：优先配 PROXY_BASE 反代；或全局参数填 Cookie（含 cf_clearance）
 * 分类路径对齐官网：censored-jav / uncensored-jav（旧 censored 已失效）
 */
WidgetMetadata = {
  id: "forward.supjav.tut",
  title: "SupJAV",
  version: "1.3.1",
  requiredVersion: "0.0.1",
  description: "SupJAV 有码/无码/素人/破码 | 多路径回退+加强解析 | t.me/nostremby",
  author: "宝宝巴士 | t.me/nostremby",
  site: "https://t.me/nostremby",
  detailCacheDuration: 180,
  globalParams: [
    {
      name: "cookie",
      title: "Cookie(过CF)",
      type: "input",
      value: "",
      description: "浏览器打开 supjav.com 通过验证后，F12→请求头复制 Cookie（含 cf_clearance）"
    },
    {
      name: "proxy",
      title: "反代前缀",
      type: "input",
      value: "",
      description: "可选。例 https://你的域名/p ，请求会走 PROXY；留空则用下方代码内 PROXY_BASE"
    }
  ],
  modules: [
    {
      id: "loadPopular",
      title: "本周热门",
      functionName: "loadPopular",
      cacheDuration: 600,
      params: [{ name: "page", title: "页码", type: "page" }]
    },
    {
      id: "loadCensored",
      title: "有码",
      functionName: "loadCensored",
      cacheDuration: 600,
      params: [{ name: "page", title: "页码", type: "page" }]
    },
    {
      id: "loadUncensored",
      title: "无码",
      functionName: "loadUncensored",
      cacheDuration: 600,
      params: [{ name: "page", title: "页码", type: "page" }]
    },
    {
      id: "loadAmateur",
      title: "素人",
      functionName: "loadAmateur",
      cacheDuration: 600,
      params: [{ name: "page", title: "页码", type: "page" }]
    },
    {
      id: "loadReducing",
      title: "马赛克破坏",
      functionName: "loadReducing",
      cacheDuration: 600,
      params: [{ name: "page", title: "页码", type: "page" }]
    },
    {
      id: "loadZh",
      title: "中文站",
      functionName: "loadZh",
      cacheDuration: 600,
      params: [{ name: "page", title: "页码", type: "page" }]
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

var BASE = "https://supjav.com";
/** 反代前缀，留空直连。例: "https://你的域名/p" —— 与 Javxx 一致 */
var PROXY_BASE = "";
var UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36";
var _cookie = "";
var _proxy = "";

function t(v) {
  return String(v == null ? "" : v).trim();
}
function applyParams(params) {
  params = params || {};
  if (t(params.cookie)) _cookie = t(params.cookie);
  if (t(params.proxy)) _proxy = t(params.proxy);
}
function activeProxy() {
  return t(_proxy) || t(PROXY_BASE);
}
/** 列表/详情请求走反代；绝对 URL 改写到代理前缀 */
function siteUrl(pathOrUrl) {
  pathOrUrl = t(pathOrUrl);
  if (!pathOrUrl) return BASE + "/";
  var proxy = activeProxy();
  if (!proxy) {
    if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
    if (pathOrUrl.indexOf("//") === 0) return "https:" + pathOrUrl;
    return BASE + (pathOrUrl[0] === "/" ? "" : "/") + pathOrUrl;
  }
  proxy = proxy.replace(/\/$/, "");
  var path = pathOrUrl;
  if (/^https?:\/\//i.test(pathOrUrl)) {
    var m = pathOrUrl.match(/^https?:\/\/[^/]+(\/.*)?$/i);
    path = m && m[1] ? m[1] : "/";
  } else if (path.indexOf("//") === 0) {
    var m2 = path.match(/^\/\/[^/]+(\/.*)?$/);
    path = m2 && m2[1] ? m2[1] : "/";
  } else if (path[0] !== "/") {
    path = "/" + path;
  }
  return proxy + path;
}
function headers(ref) {
  var h = {
    "User-Agent": UA,
    Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
    "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8",
    "Cache-Control": "no-cache",
    "Sec-Fetch-Dest": "document",
    "Sec-Fetch-Mode": "navigate",
    "Sec-Fetch-Site": "same-origin",
    "Upgrade-Insecure-Requests": "1",
    Referer: ref || BASE + "/"
  };
  var ck = t(_cookie);
  if (ck) h.Cookie = ck;
  return h;
}
function cfHint() {
  return (
    "Cloudflare 拦截(403)。请任选其一：\n" +
    "① 全局参数「Cookie(过CF)」：浏览器打开 supjav.com 通过验证后，F12→网络→请求头复制完整 Cookie（必须含 cf_clearance）\n" +
    "② 全局参数「反代前缀」或 PROXY_BASE\n" +
    "③ 设备开境外 VPN\n" +
    "注意：空 Cookie 无法过 CF"
  );
}
async function getHtml(url, soft404) {
  var reqUrl = siteUrl(url);
  var res;
  try {
    res = await Widget.http.get(reqUrl, { headers: headers(BASE + "/") });
  } catch (e) {
    var msg = String((e && e.message) || e || "");
    if (/403|unacceptable|forbidden/i.test(msg)) throw new Error(cfHint());
    if (/404/i.test(msg)) {
      if (soft404) return "";
      throw new Error("页面不存在(404)，路径可能已变更 → " + reqUrl);
    }
    throw e;
  }
  var html = res && res.data != null ? String(res.data) : "";
  if (/Just a moment|cf-browser-verification|challenge-platform/i.test(html)) {
    throw new Error(cfHint());
  }
  return html;
}
/** 多路径尝试：官网 slug 偶发变更 */
async function getHtmlFirst(paths, page) {
  var lastErr = null;
  for (var i = 0; i < paths.length; i++) {
    try {
      var html = await getHtml(pageUrl(paths[i], page), true);
      if (!html) continue;
      var items = parseList(html);
      if (items.length) return items;
      // 有 HTML 但解析空，也先收下（避免误判）
      if (html.length > 500 && !/Just a moment/i.test(html)) {
        // 再试一次更宽解析已在 parseList；空则继续下一路
      }
    } catch (e) {
      lastErr = e;
      var m = String((e && e.message) || e || "");
      if (/403|Cloudflare/i.test(m)) throw e;
    }
  }
  if (lastErr) throw lastErr;
  return [];
}
function pageUrl(path, page) {
  page = Number(page || 1) || 1;
  path = t(path);
  if (!path.startsWith("http") && path[0] !== "/") path = "/" + path;
  // 相对 path 交给 siteUrl；分页拼在 path 上
  if (page <= 1) {
    return path.endsWith("/") ? path : path + "/";
  }
  var u = path.endsWith("/") ? path : path + "/";
  return u + "page/" + page + "/";
}
function parseList(html) {
  var out = [];
  var seen = {};
  var m;
  // 1) 绝对链接 + title + data-original（两种属性顺序）
  var patterns = [
    /https?:\/\/(?:www\.)?supjav\.com\/(?:zh\/)?(\d+)\.html[^>]*title="([^"]*)"[^>]*data-original="([^"]*)"/gi,
    /https?:\/\/(?:www\.)?supjav\.com\/(?:zh\/)?(\d+)\.html[^>]*data-original="([^"]*)"[^>]*title="([^"]*)"/gi,
    /href="(?:https?:\/\/(?:www\.)?supjav\.com)?\/(?:zh\/)?(\d+)\.html"[^>]*title="([^"]*)"[^>]*(?:data-original|data-src|src)="([^"]*)"/gi,
    /href="(?:https?:\/\/(?:www\.)?supjav\.com)?\/(?:zh\/)?(\d+)\.html"[^>]*(?:data-original|data-src)="([^"]*)"[^>]*title="([^"]*)"/gi
  ];
  for (var pi = 0; pi < patterns.length; pi++) {
    var re = patterns[pi];
    var swap = pi === 1 || pi === 3;
    while ((m = re.exec(html))) {
      if (seen[m[1]]) continue;
      seen[m[1]] = 1;
      var title = t(swap ? m[3] : m[2]) || m[1];
      var thumb = t(swap ? m[2] : m[3]).split("!")[0];
      out.push({
        id: m[1],
        type: "url",
        title: title,
        coverUrl: thumb,
        posterPath: thumb,
        backdropPath: thumb,
        mediaType: "movie",
        link: m[1]
      });
    }
    if (out.length) return out;
  }
  // 2) 仅数字.html 链接兜底
  re = /(?:href|url)=["']?(?:https?:\/\/[^"'>\s]+)?\/(?:zh\/)?(\d+)\.html/gi;
  while ((m = re.exec(html))) {
    if (seen[m[1]]) continue;
    seen[m[1]] = 1;
    out.push({
      id: m[1],
      type: "url",
      title: m[1],
      mediaType: "movie",
      link: m[1]
    });
  }
  if (out.length) return out;
  try {
    var $ = Widget.html.load(html || "");
    $("a[href*='.html']").each(function () {
      var href = $(this).attr("href") || "";
      var mm = href.match(/\/(\d+)\.html/);
      if (!mm || seen[mm[1]]) return;
      var title = t($(this).attr("title") || $(this).text());
      var img =
        $(this).find("img").attr("data-original") ||
        $(this).find("img").attr("data-src") ||
        $(this).find("img").attr("src") ||
        $(this).attr("data-original") ||
        "";
      img = String(img).split("!")[0];
      if (!title && !img) return;
      seen[mm[1]] = 1;
      out.push({
        id: mm[1],
        type: "url",
        title: title || mm[1],
        coverUrl: img,
        posterPath: img,
        backdropPath: img,
        mediaType: "movie",
        link: mm[1]
      });
    });
  } catch (e) {}
  return out;
}

async function loadPopular(params) {
  applyParams(params);
  return getHtmlFirst(["/popular/", "/"], params.page);
}
async function loadCensored(params) {
  applyParams(params);
  // 优先 censored-jav，回退旧路径
  return getHtmlFirst(
    ["/category/censored-jav/", "/category/censored/", "/censored-jav/"],
    params.page
  );
}
async function loadUncensored(params) {
  applyParams(params);
  return getHtmlFirst(
    ["/category/uncensored-jav/", "/category/uncensored/", "/uncensored-jav/"],
    params.page
  );
}
async function loadAmateur(params) {
  applyParams(params);
  return getHtmlFirst(["/category/amateur/", "/amateur/"], params.page);
}
async function loadReducing(params) {
  applyParams(params);
  return getHtmlFirst(
    ["/category/reducing-mosaic/", "/reducing-mosaic/", "/tag/javplayer-decensored/"],
    params.page
  );
}
async function loadZh(params) {
  applyParams(params);
  return getHtmlFirst(["/zh/", "/ja/"], params.page);
}
async function search(params) {
  applyParams(params);
  var kw = t(params.keyword);
  if (!kw) return [];
  var page = Number(params.page || 1) || 1;
  var url = "/?s=" + encodeURIComponent(kw) + (page > 1 ? "&paged=" + page : "");
  return parseList(await getHtml(url));
}

async function fetchM3u8(token) {
  if (!token) return "";
  var tvid = String(token).split("").reverse().join("");
  var api = "https://lk1.supremejav.com/supjav.php?c=" + encodeURIComponent(tvid);
  // 播放 API 一般不在主站 CF 后，直连；若也被拦可自行改 siteUrl
  try {
    var res = await Widget.http.get(api, { headers: headers(BASE + "/") });
    var body = res && res.data != null ? String(res.data) : "";
    var um = body.match(/urlPlay[\s\S]*?(https?:\/\/[^\s"'\\]+\.m3u8[^\s"'\\]*)/i);
    if (um) return um[1].replace(/\\//g, "/");
    um = body.match(/(https?:\/\/[^\s"'\\]+\.m3u8[^\s"'\\]*)/i);
    return um ? um[1].replace(/\\//g, "/") : "";
  } catch (e) {
    return "";
  }
}

async function resolvePlay(id) {
  id = t(id).replace(/\.html$/i, "");
  if (!id) return [];
  var html = await getHtml("/" + id + ".html");
  var linkList = html.match(/data-link="[^"]+"[^>]*>[^<]*/gi) || [];
  if (!linkList.length) linkList = html.match(/data-link="[^"]+"/gi) || [];
  var servers = [];
  for (var i = 0; i < linkList.length; i++) {
    var raw = linkList[i];
    var dm = raw.match(/data-link="([^"]+)"/i);
    if (!dm) continue;
    var name = "线路" + (i + 1);
    var nm = raw.match(/>([^<]+)/);
    if (nm) name = t(nm[1]) || name;
    servers.push({ name: name, token: dm[1] });
  }
  var out = [];
  var seen = {};
  for (var j = 0; j < servers.length; j++) {
    var s = servers[j];
    if (seen[s.token]) continue;
    seen[s.token] = 1;
    var u = await fetchM3u8(s.token);
    if (u) out.push({ name: s.name, url: u });
  }
  return out;
}

async function loadDetail(link) {
  applyParams({});
  var id = t(link).replace(/\.html$/i, "");
  if (!id) return null;
  var html = await getHtml("/" + id + ".html");
  var $ = Widget.html.load(html);
  var title = t(
    $("h1").first().text() ||
      $("meta[property='og:title']").attr("content") ||
      $("title").text()
  );
  var cover = t(
    $("meta[property='og:image']").attr("content") ||
      $(".post img, .thumb img, img").first().attr("data-original") ||
      $(".post img, .thumb img, img").first().attr("src") ||
      ""
  );
  if (cover.indexOf("!") > 0) cover = cover.split("!")[0];
  var plays = await resolvePlay(id);
  return {
    id: id,
    type: "url",
    title: title || id,
    coverUrl: cover,
    posterPath: cover,
    backdropPath: cover,
    mediaType: "movie",
    link: id,
    videoUrl: plays.length ? plays[0].url : "",
    customHeaders: headers(BASE + "/" + id + ".html")
  };
}

async function loadResource(params) {
  applyParams(params);
  var id = t(params.link || params.id || "").replace(/\.html$/i, "");
  if (!id) return [];
  var plays = await resolvePlay(id);
  var hdr = headers(BASE + "/" + id + ".html");
  return plays.map(function (p) {
    return {
      name: p.name || "SupJAV",
      description: "HLS",
      url: p.url,
      playerType: "app",
      customHeaders: hdr
    };
  });
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
