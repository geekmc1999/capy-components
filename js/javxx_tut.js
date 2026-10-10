/**
 * 123AV ForwardWidget v1.3.0
 * 列表：card__title / card__link 取片名；详情标题不被线路名「1」覆盖
 * PROXY_BASE / 全局参数 proxy 可配反代；列表 403 需 VPN/反代
 * search 改为顶层 search（skill 约定，不再作为 module）
 */
WidgetMetadata = {
  id: "forward.javxx.tut",
  title: "123AV",
  version: "1.3.0",
  requiredVersion: "0.0.1",
  description: "123AV · 新作/热门/有码/无码 | t.me/nostremby",
  author: "宝宝巴士",
  logo: "https://123av.com/assets/123av/favicon.png",
  site: "https://t.me/nostremby",
  detailCacheDuration: 300,
  globalParams: [
    {
      name: "proxy",
      title: "反代前缀",
      type: "input",
      value: "",
      description: "可选。例 https://你的域名/p ；留空用代码内 PROXY_BASE；列表 403 请开 VPN 或填反代"
    }
  ],
  modules: [
    {
      id: "new",
      title: "新发布",
      functionName: "loadNew",
      cacheDuration: 600,
      params: [{ name: "page", title: "页码", type: "page" }]
    },
    {
      id: "hot",
      title: "热门",
      functionName: "loadHot",
      cacheDuration: 600,
      params: [{ name: "page", title: "页码", type: "page" }]
    },
    {
      id: "recent",
      title: "最近",
      functionName: "loadRecent",
      cacheDuration: 600,
      params: [{ name: "page", title: "页码", type: "page" }]
    },
    {
      id: "censored",
      title: "有码",
      functionName: "loadCensored",
      cacheDuration: 600,
      params: [{ name: "page", title: "页码", type: "page" }]
    },
    {
      id: "uncensored",
      title: "无码",
      functionName: "loadUncensored",
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

var HOST = "https://123av.com";
/** 反代前缀，留空直连。例: "https://你的域名/p" */
var PROXY_BASE = "";
var LANG = "cn";
var UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36";
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

function siteUrl(path) {
  path = t(path);
  if (!path) path = "/";
  var proxy = activeProxy();
  if (path.indexOf("http") === 0) {
    if (!proxy) return path;
    var m = path.match(/^https?:\/\/[^/]+(\/.*)?$/i);
    path = m && m[1] ? m[1] : "/";
  }
  if (path.charAt(0) !== "/") path = "/" + path;
  if (proxy) return proxy.replace(/\/$/, "") + path;
  return HOST + path;
}

function fillCover(item, url) {
  url = t(url);
  if (!url) return item;
  url = url.replace(/\/s360\//, "/s1080/");
  item.coverUrl = url;
  item.posterPath = url;
  item.backdropPath = url;
  item.detailPoster = url;
  item.posterUrl = url;
  return item;
}

function headers() {
  return {
    "User-Agent": UA,
    Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8",
    Referer: HOST + "/" + LANG + "/"
  };
}

async function fetchHtml(path) {
  var url = siteUrl(path);
  var res = await Widget.http.get(url, { headers: headers() });
  var body = res && (res.data != null ? res.data : res);
  return String(body || "");
}

function parseList(html) {
  var items = [];
  var seen = {};

  // 主结构：card__link + 标题，再补封面
  var re =
    /<a class="card__link" href="(\/(?:cn|en)\/v\/[^"]+)"[^>]*>([\s\S]*?)<\/a>/gi;
  var m;
  while ((m = re.exec(html))) {
    var link = m[1];
    if (seen[link]) continue;
    seen[link] = 1;
    var title = t(m[2].replace(/<[^>]+>/g, "").replace(/\s+/g, " "));
    if (!title) title = link.split("/").pop();

    var pic = "";
    var dur = "";
    var windowStart = Math.max(0, m.index - 1200);
    var chunk = html.slice(windowStart, m.index + 20);
    var im = chunk.match(
      /class="card__img"[^>]+src="([^"]+)"|src="([^"]+)"[^>]+class="card__img"/
    );
    if (im) pic = im[1] || im[2] || "";
    if (!pic) {
      im = chunk.match(
        /(?:src|data-src)="(https?:\/\/[^"]+\/(?:s360|s500|s1080)\/[^"]+)"/i
      );
      if (im) pic = im[1];
    }
    var dm = chunk.match(/class="card__dur"[^>]*>([^<]+)</);
    if (dm) dur = t(dm[1]);

    var item = {
      id: "javxx:" + link,
      type: "url",
      title: title,
      description: dur,
      mediaType: "movie",
      link: "javxx:" + link
    };
    items.push(fillCover(item, pic));
  }

  // 兜底：只有封面链接
  if (!items.length) {
    var re2 =
      /href="(\/(?:cn|en)\/v\/[^"]+)"[\s\S]{0,400}?class="card__img"[^>]+src="([^"]+)"/gi;
    while ((m = re2.exec(html))) {
      if (seen[m[1]]) continue;
      seen[m[1]] = 1;
      var item2 = {
        id: "javxx:" + m[1],
        type: "url",
        title: m[1].split("/").pop(),
        mediaType: "movie",
        link: "javxx:" + m[1]
      };
      items.push(fillCover(item2, m[2]));
    }
  }
  // 再兜底：card__cover href
  if (!items.length) {
    var re3 =
      /class="card__cover"[^>]*href="(\/(?:cn|en)\/v\/[^"]+)"[\s\S]{0,500}?class="card__img"[^>]+src="([^"]+)"/gi;
    while ((m = re3.exec(html))) {
      if (seen[m[1]]) continue;
      seen[m[1]] = 1;
      var item3 = {
        id: "javxx:" + m[1],
        type: "url",
        title: m[1].split("/").pop(),
        mediaType: "movie",
        link: "javxx:" + m[1]
      };
      items.push(fillCover(item3, m[2]));
    }
  }
  return items;
}

async function loadPath(path, page) {
  page = parseInt(page, 10) || 1;
  var p = path;
  if (page > 1) p = path.replace(/\/$/, "") + "?page=" + page;
  var html = await fetchHtml(p);
  if (
    html.indexOf("Just a moment") >= 0 ||
    html.indexOf("cf-browser-verification") >= 0
  ) {
    throw new Error("Cloudflare 拦截，请开境外 VPN 或配置 PROXY_BASE / 全局参数「反代前缀」");
  }
  return parseList(html);
}

async function loadNew(params) {
  applyParams(params);
  return loadPath("/" + LANG + "/new", params && params.page);
}
async function loadHot(params) {
  applyParams(params);
  return loadPath("/" + LANG + "/hot", params && params.page);
}
async function loadRecent(params) {
  applyParams(params);
  return loadPath("/" + LANG + "/recent", params && params.page);
}
async function loadCensored(params) {
  applyParams(params);
  return loadPath("/" + LANG + "/censored", params && params.page);
}
async function loadUncensored(params) {
  applyParams(params);
  return loadPath("/" + LANG + "/uncensored", params && params.page);
}

async function search(params) {
  applyParams(params);
  params = params || {};
  var kw = t(params.keyword || params.wd || params.q);
  if (!kw) return [];
  var page = parseInt(params.page, 10) || 1;
  var path =
    "/" +
    LANG +
    "/search?keyword=" +
    encodeURIComponent(kw) +
    (page > 1 ? "&page=" + page : "");
  var html = await fetchHtml(path);
  if (
    html.indexOf("Just a moment") >= 0 ||
    html.indexOf("cf-browser-verification") >= 0
  ) {
    throw new Error("Cloudflare 拦截，请开境外 VPN 或配置 PROXY_BASE / 全局参数「反代前缀」");
  }
  return parseList(html);
}

function parseLink(link) {
  link = t(link);
  if (link.indexOf("javxx:") === 0) link = link.slice(6);
  if (link.indexOf("http") === 0) {
    var m = link.match(/https?:\/\/[^/]+(\/.*)/);
    if (m) link = m[1];
  }
  return link;
}

function playHeadersForEmbed(embedUrl) {
  embedUrl = t(embedUrl);
  var origin = "https://jav-master-52.site";
  var m = embedUrl.match(/^(https?:\/\/[^/]+)/);
  if (m) origin = m[1];
  return {
    "User-Agent": UA,
    Referer: origin + "/",
    Origin: origin,
    Accept: "*/*"
  };
}

function unescapeJsonish(s) {
  s = String(s || "");
  s = s.replace(/\\u0022/g, '"').replace(/\\u0027/g, "'");
  s = s.replace(/\\u003c/gi, "<").replace(/\\u003e/gi, ">");
  // 反复解开 \/
  var prev;
  do {
    prev = s;
    s = s.replace(/\\\//g, "/");
  } while (s !== prev);
  return s;
}

function extractEmbeds(html) {
  var embeds = [];
  var m = html.match(/player\(\s*JSON\.parse\(\s*(['"])([\s\S]*?)\1\s*\)/);
  if (m) {
    var s = unescapeJsonish(m[2]);
    try {
      var arr = JSON.parse(s);
      if (Array.isArray(arr)) {
        arr.forEach(function (it) {
          if (it && it.url) {
            var u = unescapeJsonish(String(it.url));
            var nm = t(it.name);
            if (!nm || /^\d+$/.test(nm)) nm = "线路" + (embeds.length + 1);
            embeds.push({ name: nm, url: u });
          }
        });
      }
    } catch (e) {}
  }
  if (!embeds.length) {
    var em2 = html.match(/https?:\/\/[^"'\\\s]+\/e\/[A-Za-z0-9]+/g) || [];
    em2.forEach(function (u, i) {
      embeds.push({ name: "线路" + (i + 1), url: unescapeJsonish(u) });
    });
  }
  return embeds;
}

async function resolveStream(embedUrl) {
  embedUrl = t(embedUrl);
  if (!embedUrl) return "";
  var idm = embedUrl.match(/\/e\/([A-Za-z0-9]+)/);
  if (!idm) return "";
  var eid = idm[1];
  var originM = embedUrl.match(/^(https?:\/\/[^/]+)/);
  var origin = originM ? originM[1] : "";
  var streamApi = origin + "/stream?id=" + encodeURIComponent(eid);
  var res = await Widget.http.get(streamApi, {
    headers: {
      "User-Agent": UA,
      Accept: "application/json, text/plain, */*",
      Referer: embedUrl,
      Origin: origin
    }
  });
  var body = res && (res.data != null ? res.data : res);
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch (e) {
      return "";
    }
  }
  return t(
    (body && body.media && body.media.stream) || (body && body.stream) || ""
  );
}

async function loadDetail(link) {
  applyParams({});
  var path = parseLink(typeof link === "object" ? link.link || link.id : link);
  if (!path) return null;
  var html = await fetchHtml(path);

  if (
    html.indexOf("Just a moment") >= 0 ||
    html.indexOf("cf-browser-verification") >= 0
  ) {
    throw new Error("Cloudflare 拦截，请开境外 VPN 或配置 PROXY_BASE / 全局参数「反代前缀」");
  }

  // 片名：h1 优先，不要用线路名
  var title = path.split("/").pop() || path;
  var hm = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  if (hm) title = t(hm[1].replace(/<[^>]+>/g, "").replace(/\s+/g, " "));
  if (!title || title === "1") {
    var og = html.match(/og:title["']\s+content=["']([^"']+)/i);
    if (og) title = t(og[1]);
  }

  var cover = "";
  var bm = html.match(
    /background-image:\s*url\(['"]?(https?:\/\/icdn\.123av\.me\/[^)'"\s]+)/i
  );
  if (bm) cover = bm[1];
  if (!cover) {
    var cm2 = html.match(
      /https?:\/\/icdn\.123av\.me\/img2\/s(?:500|1080)\/[^"'\s\)]+cover\.jpg[^"'\s\)]*/i
    );
    if (cm2) cover = cm2[0];
  }
  if (!cover) {
    var cm3 = html.match(
      /https?:\/\/icdn\.123av\.me\/img2\/s360\/[^"'\s\)]+cover\.jpg[^"'\s\)]*/i
    );
    if (cm3) cover = cm3[0].replace("/s360/", "/s500/");
  }
  cover = t(cover).replace(/[)'"]+$/, "");

  var embeds = extractEmbeds(html);
  var videoUrl = "";
  var headersPlay = embeds[0]
    ? playHeadersForEmbed(embeds[0].url)
    : { "User-Agent": UA, Referer: HOST + "/" };

  for (var i = 0; i < embeds.length; i++) {
    try {
      videoUrl = await resolveStream(embeds[i].url);
      if (videoUrl) {
        headersPlay = playHeadersForEmbed(embeds[i].url);
        break;
      }
    } catch (e2) {}
  }

  var detail = {
    id: "javxx:" + path,
    type: "url",
    title: title,
    description: "",
    mediaType: "movie",
    link: "javxx:" + path,
    videoUrl: videoUrl,
    playerType: "app",
    customHeaders: headersPlay
  };
  return fillCover(detail, cover);
}

async function loadResource(params) {
  applyParams(params);
  params = params || {};
  var link = t(params.link || params.id || "");
  if (link.indexOf("javxxplay:") === 0) {
    var rest = link.slice(10);
    var parts = rest.split("|");
    var emb = decodeURIComponent(parts[1] || "");
    if (emb) {
      var play = await resolveStream(emb);
      if (play) {
        return [
          {
            name: "播放",
            url: play,
            playerType: "app",
            customHeaders: playHeadersForEmbed(emb)
          }
        ];
      }
    }
    link = parts[0] || link;
  }
  var d = await loadDetail(link);
  if (d && d.videoUrl) {
    return [
      {
        name: "播放",
        url: d.videoUrl,
        playerType: "app",
        customHeaders: d.customHeaders || playHeadersForEmbed("")
      }
    ];
  }
  // 多线路：再解析一次 embeds
  var path = parseLink(link);
  if (!path) return [];
  var html = await fetchHtml(path);
  var embeds = extractEmbeds(html);
  var out = [];
  for (var i = 0; i < embeds.length; i++) {
    try {
      var u = await resolveStream(embeds[i].url);
      if (u) {
        out.push({
          name: embeds[i].name || "线路" + (i + 1),
          url: u,
          playerType: "app",
          customHeaders: playHeadersForEmbed(embeds[i].url)
        });
      }
    } catch (e) {}
  }
  return out;
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
