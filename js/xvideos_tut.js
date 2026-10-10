/**
 * Xvideos ForwardWidget v1.1.0
 * 分类对齐官网导航：最新/最佳/说中文的/主题(/c/...)
 * 可选 PROXY_BASE / 全局参数「反代前缀」
 * 频道：t.me/nostremby
 */
WidgetMetadata = {
  id: "forward.xvideos.tut",
  title: "Xvideos",
  version: "1.1.2",
  requiredVersion: "0.0.1",
  description: "Xvideos  | 宝宝巴士乐园 t.me/nostremby",
  author: "宝宝巴士 | t.me/nostremby",
  site: "https://t.me/nostremby",
  logo: "https://www.xvideos.com/favicon-32x32.png",
  detailCacheDuration: 300,
  globalParams: [
    {
      name: "proxy",
      title: "反代前缀",
      type: "input",
      value: "",
      description: "可选。例 https://你的域名/p ；留空直连；403 时填反代或开 VPN"
    }
  ],
  modules: [
    {
      id: "loadHome",
      title: "首页热门",
      functionName: "loadHome",
      cacheDuration: 600,
      params: [{ name: "page", title: "页码", type: "page" }]
    },
    {
      id: "loadNew",
      title: "最新",
      functionName: "loadNew",
      cacheDuration: 600,
      params: [{ name: "page", title: "页码", type: "page" }]
    },
    {
      id: "loadBest",
      title: "最佳影片",
      functionName: "loadBest",
      cacheDuration: 600,
      params: [{ name: "page", title: "页码", type: "page" }]
    },
    {
      id: "loadChinese",
      title: "说中文的",
      functionName: "loadChinese",
      cacheDuration: 600,
      params: [{ name: "page", title: "页码", type: "page" }]
    },
    {
      id: "loadCategory",
      title: "主题分类",
      functionName: "loadCategory",
      cacheDuration: 600,
      params: [
        { name: "page", title: "页码", type: "page" },
        {
          name: "cat",
          title: "分类",
          type: "enumeration",
          value: "Asian_Woman-32",
          enumOptions: [
            { title: "亚洲", value: "Asian_Woman-32" },
            { title: "少女", value: "Teen-13" },
            { title: "辣妈", value: "Milf-19" },
            { title: "成熟", value: "Mature-38" },
            { title: "业余", value: "Amateur-65" },
            { title: "巨乳", value: "Big_Tits-23" },
            { title: "巨臀", value: "Big_Ass-24" },
            { title: "口交", value: "Blowjob-15" },
            { title: "肛交", value: "Anal-12" },
            { title: "中出", value: "Creampie-40" },
            { title: "女同", value: "Lesbian-26" },
            { title: "群交", value: "Gangbang-69" },
            { title: "异族", value: "Interracial-27" },
            { title: "丝袜", value: "Stockings-28" },
            { title: "喷出", value: "Squirting-56" },
            { title: "自拍摄像", value: "Cam_Porn-58" },
            { title: "自慰", value: "Solo_and_Masturbation-33" },
            { title: "调教", value: "Femdom-235" },
            { title: "家庭乱搞", value: "Fucked_Up_Family-81" },
            { title: "出轨妻子", value: "Cuckold-237" },
            { title: "黑人", value: "Black_Woman-30" },
            { title: "拉丁", value: "Latina-16" },
            { title: "印度", value: "Indian-89" },
            { title: "AI", value: "AI-239" }
          ]
        }
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

var HOST = "https://www.xvideos.com";
/** 反代前缀，留空直连。例: "https://你的域名/p" */
var PROXY_BASE = "";
var UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36";
var _proxy = "";

function t(v) {
  return String(v == null ? "" : v).trim();
}
function applyParams(params) {
  params = params || {};
  if (t(params.proxy)) _proxy = t(params.proxy);
}
function activeProxy() {
  return t(_proxy) || t(PROXY_BASE);
}
function siteUrl(pathOrUrl) {
  pathOrUrl = t(pathOrUrl);
  if (!pathOrUrl) return HOST + "/";
  var proxy = activeProxy();
  if (!proxy) {
    if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
    if (pathOrUrl.indexOf("//") === 0) return "https:" + pathOrUrl;
    return HOST + (pathOrUrl[0] === "/" ? "" : "/") + pathOrUrl;
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
  return {
    "User-Agent": UA,
    Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8",
    Referer: ref || HOST + "/"
  };
}
function decodeHtml(s) {
  return t(s)
    .replace(/&comma;/g, ",")
    .replace(/&excl;/g, "!")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#(\d+);/g, function (_, n) {
      return String.fromCharCode(Number(n));
    });
}
async function getHtml(pathOrUrl) {
  var url = siteUrl(pathOrUrl);
  var res = await Widget.http.get(url, { headers: headers(HOST + "/") });
  var html = res && res.data != null ? String(res.data) : "";
  if (/Just a moment|cf-browser-verification|challenge-platform/i.test(html)) {
    throw new Error(
      "Cloudflare 拦截：请开境外 VPN，或配置 PROXY_BASE / 全局参数「反代前缀」 | t.me/nostremby"
    );
  }
  return html;
}
function absUrl(u) {
  u = t(u);
  if (!u) return "";
  if (/^https?:\/\//i.test(u)) return u;
  if (u.indexOf("//") === 0) return "https:" + u;
  return HOST + (u[0] === "/" ? "" : "/") + u;
}
function parseList(html) {
  var out = [];
  var seen = {};
  html = String(html || "");
  // 首页 frame-block；最佳/中文/主题页多为 thumb-block（没有 frame-block）
  var parts = html.split(/(?=<div[^>]*class="[^"]*(?:frame-block|thumb-block)[^"]*")/i);
  for (var i = 1; i < parts.length; i++) {
    var p = parts[i];
    if (!/\/video\./i.test(p)) continue;
    var hm = p.match(/href="(\/video\.[^"]+)"/i);
    if (!hm) continue;
    var href = hm[1];
    if (seen[href]) continue;
    seen[href] = 1;

    var title = "";
    var img = "";
    var dur = "";
    var hd = "";

    // data-video JSON（最佳/中文页封面）
    var jsm = p.match(/data-video='(\{[^']+\})'/i);
    if (jsm) {
      try {
        var js = JSON.parse(jsm[1]);
        if (js && js.sfwThumbUrl) img = String(js.sfwThumbUrl).replace(/\\\//g, "/");
      } catch (e) {}
    }

    // 标题：class="title" title="真实片名"
    var tm =
      p.match(/class="title"\s+title="([^"]+)"/i) ||
      p.match(/class="title"[^>]*title="([^"]+)"/i) ||
      p.match(/class="title"[^>]*>\s*<a[^>]*title="([^"]+)"/i) ||
      p.match(/class="title"[^>]*>\s*<a[^>]*>([^<]+)/i);
    if (tm) title = decodeHtml(tm[1]);
    if (!title || title === "视频" || title === "Video" || title.length < 2) {
      var slug = href.split("/").pop() || "";
      title = decodeHtml(slug.replace(/_/g, " "));
    }

    if (!img) {
      var im =
        p.match(/data-src="(https?:\/\/[^"]+\/(?:xv_|thumb)[^"]*\.(?:jpg|jpeg|png|webp)[^"]*)"/i) ||
        p.match(/data-src="(https?:\/\/[^"]+\.(?:jpg|jpeg|png|webp)[^"]*)"/i) ||
        p.match(/data-src="(https?:\/\/[^"]+)"/i);
      if (im) img = im[1];
    }
    if (img && /blank\.gif|lightbox-blank/i.test(img)) img = "";

    var dm = p.match(/class="duration"[^>]*>([^<]+)/i);
    if (dm) dur = t(dm[1]);
    var hdm = p.match(/video-hd-mark[^>]*>([^<]*)/i);
    if (hdm) hd = t(hdm[1]);

    var remarks = [hd, dur].filter(Boolean).join(" · ");
    var link = absUrl(href);
    out.push({
      id: link,
      type: "url",
      title: title || link,
      coverUrl: img,
      posterPath: img,
      backdropPath: img,
      description: remarks,
      durationText: dur,
      mediaType: "movie",
      link: link
    });
  }
  return out;
}
function pagePath(base, page) {
  page = Number(page || 1) || 1;
  base = t(base).replace(/\/$/, "");
  // 官网分页规则（除 /new 外）：
  //   第1页 = /path
  //   第2页 = /path/1
  //   第3页 = /path/2  （页码-1）
  // /new 例外：第1页=/new/1，第2页=/new/2
  if (base === "" || base === "/") {
    return page <= 1 ? "/" : "/new/" + page;
  }
  if (base === "/new") {
    return "/new/" + (page <= 1 ? "1" : String(page));
  }
  if (page <= 1) return base;
  return base + "/" + (page - 1);
}
/** 解析 /best/ 当前月份路径，如 /best/2026-08 */
async function resolveBestMonth() {
  try {
    var html = await getHtml("/best/");
    var m = String(html).match(/href="(\/best\/\d{4}-\d{2})(?:\/\d+)?"/i);
    if (m) return m[1];
  } catch (e) {}
  var d = new Date();
  var y = d.getUTCFullYear();
  var mo = d.getUTCMonth() + 1;
  var mm = mo < 10 ? "0" + mo : String(mo);
  return "/best/" + y + "-" + mm;
}

async function loadHome(params) {
  applyParams(params);
  var page = Number(params && params.page) || 1;
  if (page <= 1) return parseList(await getHtml("/"));
  return parseList(await getHtml("/new/" + page));
}
async function loadNew(params) {
  applyParams(params);
  return parseList(await getHtml(pagePath("/new", params && params.page)));
}
async function loadBest(params) {
  applyParams(params);
  var month = await resolveBestMonth();
  return parseList(await getHtml(pagePath(month, params && params.page)));
}
async function loadChinese(params) {
  applyParams(params);
  // 官网：「說中文的色情」→ /lang/chinese
  return parseList(await getHtml(pagePath("/lang/chinese", params && params.page)));
}
async function loadCategory(params) {
  applyParams(params);
  var cat = t((params && params.cat) || "Asian_Woman-32");
  // 官网主题：/c/Asian_Woman-32 、/c/Teen-13 等
  return parseList(await getHtml(pagePath("/c/" + cat, params && params.page)));
}
async function search(params) {
  applyParams(params);
  var kw = t(params && params.keyword);
  if (!kw) return [];
  var page = Number(params.page || 1) || 1;
  // 官网搜索：/?k=xxx&p=0 起算
  var url = "/?k=" + encodeURIComponent(kw) + "&p=" + (page - 1);
  return parseList(await getHtml(url));
}

function extractSources(html) {
  html = String(html || "");
  var list = [];
  var hls = html.match(/setVideoHLS\(\s*['"]([^'"]+)['"]\s*\)/i);
  if (hls) list.push({ name: "HLS", url: hls[1] });
  var high = html.match(/setVideoUrlHigh\(\s*['"]([^'"]+)['"]\s*\)/i);
  if (high) list.push({ name: "High", url: high[1] });
  var low = html.match(/setVideoUrlLow\(\s*['"]([^'"]+)['"]\s*\)/i);
  if (low) list.push({ name: "Low", url: low[1] });
  // 去重
  var seen = {};
  var out = [];
  for (var i = 0; i < list.length; i++) {
    var u = list[i].url;
    if (!u || seen[u]) continue;
    seen[u] = 1;
    out.push(list[i]);
  }
  return out;
}
function extractMeta(html) {
  var title = "";
  var m =
    html.match(/setVideoTitle\(\s*['"]([^'"]+)['"]\s*\)/i) ||
    html.match(/property="og:title"\s+content="([^"]+)"/i) ||
    html.match(/<title>([^<]+)<\/title>/i);
  if (m) title = decodeHtml(m[1]).replace(/\s*-\s*XVIDEOS\.COM\s*$/i, "");
  var cover = "";
  var c =
    html.match(/property="og:image"\s+content="([^"]+)"/i) ||
    html.match(/setThumbUrl\d*\(\s*['"]([^'"]+)['"]\s*\)/i);
  if (c) cover = c[1];
  return { title: title, cover: cover };
}

async function loadDetail(link) {
  applyParams({});
  link = t(typeof link === "object" ? link.link || link.id : link);
  if (!link) return null;
  if (!/^https?:\/\//i.test(link) && link[0] !== "/") link = "/" + link;
  var html = await getHtml(link);
  var meta = extractMeta(html);
  var plays = extractSources(html);
  var full = absUrl(link);
  return {
    id: full,
    type: "url",
    title: meta.title || full,
    coverUrl: meta.cover,
    posterPath: meta.cover,
    backdropPath: meta.cover,
    mediaType: "movie",
    link: full,
    videoUrl: plays.length ? plays[0].url : "",
    customHeaders: headers(full)
  };
}

async function loadResource(params) {
  applyParams(params);
  var link = t(params && (params.link || params.id) || "");
  if (!link) return [];
  if (!/^https?:\/\//i.test(link) && link[0] !== "/") link = "/" + link;
  var html = await getHtml(link);
  var plays = extractSources(html);
  var full = absUrl(link);
  var hdr = headers(full);
  return plays.map(function (p) {
    return {
      name: p.name || "Xvideos",
      description: p.name === "HLS" ? "HLS" : "MP4",
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
