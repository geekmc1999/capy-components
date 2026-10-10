/**
 * 91成人短剧 ForwardWidget v1.0.0
 * 源: https://91crdj.com
 * 结合简版结构 + 完整版解析（路径/封面清洗/集数/m3u8）
 * 封面 AES 在 FW 无 localProxy，仅剥签名参数直出 URL
 * t.me/nostremby
 */
WidgetMetadata = {
  id: "forward.91crdj.tut",
  title: "91成人短剧",
  version: "1.0.2",
  requiredVersion: "0.0.1",
  description: "91crdj · 短剧/漫剧/真人剧/视频 | t.me/nostremby",
  author: "宝宝巴士",
  logo: "https://fwd.uou.qzz.io/icon.png",
  site: "https://t.me/nostremby",
  detailCacheDuration: 180,
  modules: [
    {
      id: "duanju",
      title: "成人短剧",
      functionName: "loadDuanju",
      cacheDuration: 300,
      params: [{ name: "page", title: "页码", type: "page" }]
    },
    {
      id: "manju",
      title: "成人漫剧",
      functionName: "loadManju",
      cacheDuration: 300,
      params: [{ name: "page", title: "页码", type: "page" }]
    },
    {
      id: "zhenrenju",
      title: "真人剧",
      functionName: "loadZhenren",
      cacheDuration: 300,
      params: [{ name: "page", title: "页码", type: "page" }]
    },
    {
      id: "shipin",
      title: "成人视频",
      functionName: "loadShipin",
      cacheDuration: 300,
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

var HOST = "https://91crdj.com";
var IMG_PROXY = "https://ik.bug.qzz.io/img?url=";
var UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36";
var BAD_PIC = [
  "data:",
  "base64,",
  "load.gif",
  "loading.gif",
  "placeholder",
  "default.png",
  "nopic",
  "eisees",
  "spacer.gif",
  "blank.gif"
];
var AUTH_KEYS = {
  auth_key: 1,
  authkey: 1,
  auth: 1,
  sign: 1,
  signature: 1,
  token: 1,
  expires: 1,
  expire: 1,
  e: 1,
  t: 1,
  ts: 1,
  time: 1
};

function t(v) {
  return String(v == null ? "" : v).trim();
}

function headers(referer) {
  return {
    "User-Agent": UA,
    Referer: referer || HOST + "/",
    Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "zh-CN,zh;q=0.9"
  };
}

function absUrl(u) {
  u = t(u);
  if (!u) return "";
  if (u.indexOf("//") === 0) return "https:" + u;
  if (u.indexOf("http") === 0) return u;
  if (u.charAt(0) === "/") return HOST + u;
  return HOST + "/" + u;
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

/** 剥一次性签名参数，稳定封面 URL（完整版优点） */
function stripAuth(u) {
  u = t(u);
  var i = u.indexOf("?");
  if (i < 0) return u;
  var base = u.slice(0, i);
  var qs = u.slice(i + 1).split("&");
  var keep = [];
  for (var j = 0; j < qs.length; j++) {
    var part = qs[j];
    if (!part) continue;
    var k = part.split("=")[0].toLowerCase();
    if (AUTH_KEYS[k]) continue;
    keep.push(part);
  }
  return keep.length ? base + "?" + keep.join("&") : base;
}

function cleanPic(u) {
  u = t(u).replace(/^["']|["']$/g, "");
  if (!u) return "";
  var low = u.toLowerCase();
  for (var i = 0; i < BAD_PIC.length; i++) {
    if (low.indexOf(BAD_PIC[i]) >= 0) return "";
  }
  u = absUrl(u);
  return stripAuth(u);
}

function fillCover(item, pic) {
  var url = cleanPic(pic);
  if (!url) return item;
  // 91 图床密文 → 走 ik.bug.qzz.io 解密反代
  if (/zdmhyg|wirqed|eisees|pic\./i.test(url) && IMG_PROXY) {
    url = IMG_PROXY + encodeURIComponent(url);
  }
  item.coverUrl = url;
  item.posterPath = url;
  item.backdropPath = url;
  item.detailPoster = url;
  item.pic = url;
  item.cover = url;
  return item;
}

async function fetchHtml(url, referer) {
  try {
    var res = await Widget.http.get(url, {
      headers: headers(referer || HOST + "/")
    });
    var body = res && (res.data != null ? res.data : res);
    if (typeof body !== "string") body = String(body || "");
    return body || "";
  } catch (e) {
    // 站点易断连，再试一次
    try {
      var res2 = await Widget.http.get(url, {
        headers: headers(referer || HOST + "/")
      });
      var b2 = res2 && (res2.data != null ? res2.data : res2);
      return typeof b2 === "string" ? b2 : String(b2 || "");
    } catch (e2) {
      return "";
    }
  }
}

/** 兼容 /channel/id-slug/ 与 /channel/id/（完整版） */
function splitPath(href) {
  href = t(href);
  try {
    if (href.indexOf("http") === 0) {
      var m = href.match(/https?:\/\/[^/]+(\/.*)/);
      href = m ? m[1] : href;
    }
  } catch (e) {}
  if (href.charAt(0) !== "/") href = "/" + href;
  var seg = href.split("/").filter(Boolean);
  if (seg.length < 2) return { channel: "", path: "" };
  return {
    channel: seg[0],
    path: "/" + seg[0] + "/" + seg[1] + "/"
  };
}

function pickPicFromBlock(block) {
  var attrs = [
    "data-original",
    "data-src",
    "data-echo",
    "data-lazy-src",
    "data-url",
    "data-thumb"
  ];
  for (var i = 0; i < attrs.length; i++) {
    var re = new RegExp(attrs[i] + '\\s*=\\s*"([^"]+)"', "i");
    var m = block.match(re);
    if (m) {
      var p = cleanPic(m[1]);
      if (p) return p;
    }
  }
  var sm = block.match(/(?<![-\w.])src\s*=\s*"([^"]+)"/i);
  if (!sm) sm = block.match(/\bsrc\s*=\s*"([^"]+)"/i);
  if (sm) return cleanPic(sm[1]);
  return "";
}

function parseCards(html, defaultChannel) {
  var items = [];
  var seen = {};
  if (!html) return items;

  // 按 card 切块
  var parts = html.split(/<a[^>]*\bclass\s*=\s*"[^"]*\bcard\b[^"]*"/i);
  for (var i = 1; i < parts.length; i++) {
    var chunk = parts[i];
    var end = chunk.search(/<\/a>/i);
    var block = end >= 0 ? chunk.slice(0, end) : chunk.slice(0, 2000);
    var openTag = chunk;

    var hm = openTag.match(/href\s*=\s*"([^"]+)"/i);
    if (!hm) continue;
    var href = hm[1].trim();
    var sp = splitPath(href);
    if (!sp.path) continue;
    var channel = sp.channel || defaultChannel || "";
    var key = sp.path;
    if (seen[key]) continue;
    // 排除分页链接
    if (/\/page\/\d+/.test(sp.path)) continue;

    var title = "";
    var tm =
      (openTag + block).match(/data-track-item-name\s*=\s*"([^"]*)"/i) ||
      (openTag + block).match(/\balt\s*=\s*"([^"]*)"/i) ||
      (openTag + block).match(/\btitle\s*=\s*"([^"]*)"/i);
    if (tm) title = cleanText(tm[1]);
    if (!title) {
      var pt = block.match(/<span class="p-title[^"]*">([\s\S]*?)<\/span>/i);
      if (pt) title = cleanText(pt[1]);
    }
    if (!title) title = sp.path;

    var pic = pickPicFromBlock(openTag + block);
    var remarks = "";
    var rm = block.match(
      /<span class="(?:badge|eps-flag)[^"]*">([\s\S]*?)<\/span>/i
    );
    if (rm) remarks = cleanText(rm[1]);

    seen[key] = 1;
    var link =
      "91:" + channel + "|" + sp.path + "||" + encodeURIComponent(title);
    var item = {
      id: link,
      type: "url",
      title: title,
      name: title,
      description: remarks,
      mediaType: "tv",
      link: link
    };
    items.push(fillCover(item, pic));
  }
  return items;
}

async function loadChannel(channel, page) {
  page = parseInt(page, 10) || 1;
  var url =
    page > 1
      ? HOST + "/" + channel + "/page/" + page + "/"
      : HOST + "/" + channel + "/";
  var html = await fetchHtml(url);
  return parseCards(html, channel);
}

async function loadDuanju(params) {
  return loadChannel("duanju", params && params.page);
}
async function loadManju(params) {
  return loadChannel("manju", params && params.page);
}
async function loadZhenren(params) {
  return loadChannel("zhenrenju", params && params.page);
}
async function loadShipin(params) {
  return loadChannel("shipin", params && params.page);
}

async function search(params) {
  params = params || {};
  var kw = t(params.keyword || params.wd || params.q);
  if (!kw) return [];
  var page = parseInt(params.page, 10) || 1;
  var url =
    HOST + "/search/?q=" + encodeURIComponent(kw) + (page > 1 ? "&page=" + page : "");
  var html = await fetchHtml(url);
  return parseCards(html, "");
}

function parseLink(link) {
  var listTitle = "";
  if (typeof link === "object" && link) {
    listTitle = t(link.title || link.name || "");
    link = link.link || link.id || "";
  }
  link = t(link);
  if (link.indexOf("91play:") === 0) {
    var body = link.slice(7);
    if (body.indexOf("||") >= 0) body = body.split("||")[0];
    try {
      body = decodeURIComponent(body);
    } catch (e) {}
    return { playUrl: body, channel: "", path: "", listTitle: listTitle };
  }
  if (link.indexOf("91:") === 0) link = link.slice(3);
  var emb = "";
  var di = link.indexOf("||");
  if (di >= 0) {
    emb = link.slice(di + 2);
    link = link.slice(0, di);
    try {
      emb = decodeURIComponent(emb);
    } catch (e) {}
  }
  var channel = "";
  var path = link;
  if (link.indexOf("|") >= 0) {
    var parts = link.split("|");
    channel = parts[0];
    path = parts.slice(1).join("|");
  }
  return {
    channel: channel,
    path: path,
    playUrl: "",
    listTitle: listTitle || emb
  };
}

async function loadDetail(link) {
  var p = parseLink(link);
  if (p.playUrl) return null;
  var path = p.path;
  if (!path) return null;
  var listTitle = p.listTitle;
  var url = absUrl(path);
  var html = await fetchHtml(url);

  var title = listTitle;
  if (!title && html) {
    var hm =
      html.match(/<h1[^>]*class="[^"]*detail[^"]*"[^>]*>([\s\S]*?)<\/h1>/i) ||
      html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
    if (hm) title = cleanText(hm[1]);
  }
  title = title || path;

  // 封面：p-img 优先，避开 og:image/eisees（完整版）
  var pic = "";
  var pimg = html && html.match(/<img class="p-img"[^>]*>/i);
  if (pimg) pic = pickPicFromBlock(pimg[0]);
  if (!pic && html) {
    var og = html.match(
      /<meta[^>]*og:image[^>]*content="([^"]+)"/i
    );
    if (og) pic = cleanPic(og[1]);
  }

  var desc = "";
  if (html) {
    var dm =
      html.match(/<meta[^>]*og:description[^>]*content="([^"]*)"/i) ||
      html.match(/<meta[^>]*name="description"[^>]*content="([^"]*)"/i);
    if (dm) desc = cleanText(dm[1]).slice(0, 400);
  }

  // 集数：ep-grid
  var episodeItems = [];
  var hdrs = headers(url);
  var eps = [];
  if (html) {
    var grid = html.match(/<div class="ep-grid">([\s\S]*?)<\/div>/i);
    var scan = grid ? grid[1] : html;
    var re = /href="([^"]+)"[^>]*>\s*(\d+)\s*<\/a>/g;
    var m;
    var seenEp = {};
    while ((m = re.exec(scan))) {
      var href = m[1];
      var epNo = parseInt(m[2], 10) || 0;
      if (!epNo) continue;
      // 必须属于当前 path
      if (path && href.indexOf(path.replace(/\/$/, "")) < 0 && href.indexOf(path) < 0) {
        // 相对宽松：包含 id 段
        var idSeg = path.split("/").filter(Boolean)[1] || "";
        if (idSeg && href.indexOf(idSeg) < 0) continue;
      }
      if (seenEp[epNo]) continue;
      seenEp[epNo] = 1;
      eps.push({ ep: epNo, href: absUrl(href) });
    }
    eps.sort(function (a, b) {
      return a.ep - b.ep;
    });
  }
  if (!eps.length) {
    eps.push({ ep: 1, href: absUrl(path.replace(/\/?$/, "/") + "1/") });
  }

  for (var i = 0; i < eps.length; i++) {
    var ep = eps[i];
    var showTitle =
      eps.length === 1 ? title : title + " 第" + ep.ep + "集";
    var elink =
      "91play:" + encodeURIComponent(ep.href) + "||" + encodeURIComponent(title);
    episodeItems.push({
      id: elink,
      type: "url",
      title: showTitle,
      name: showTitle,
      mediaType: "tv",
      seasonNumber: 1,
      episodeNumber: ep.ep,
      link: elink,
      playerType: "app",
      customHeaders: hdrs
    });
  }

  var detail = {
    id: "91:" + (p.channel || "") + "|" + path + "||" + encodeURIComponent(title),
    type: "url",
    title: title,
    name: title,
    description: desc,
    mediaType: episodeItems.length > 1 ? "tv" : "movie",
    link:
      "91:" + (p.channel || "") + "|" + path + "||" + encodeURIComponent(title),
    episodeItems: episodeItems,
    childItems: episodeItems,
    customHeaders: hdrs
  };
  return fillCover(detail, pic);
}

function extractM3u8(html) {
  if (!html) return "";
  var m = html.match(/"current"\s*:\s*\{[^{}]*"src"\s*:\s*"([^"]+)"/);
  if (m) {
    return m[1]
      .replace(/\\\//g, "/")
      .replace(/\\u0026/g, "&");
  }
  for (var i = 0; i < 2; i++) {
    var names = ["player_aaaa", "player_data"];
    var re = new RegExp(names[i] + "\\s*=\\s*(\\{[^;]*\\})");
    var mm = html.match(re);
    if (mm) {
      try {
        var data = JSON.parse(mm[1]);
        var u = data.url || data.link || "";
        if (u) return u;
      } catch (e) {}
    }
  }
  var m3 = html.match(/(https?:\/\/[^'"\s<>]+?\.m3u8[^'"\s<>]*)/);
  return m3 ? m3[1] : "";
}

async function loadResource(params) {
  params = params || {};
  var raw = t(params.link || params.id || "");
  if (!raw && params.item) raw = t(params.item.link || params.item.id || "");
  var p = parseLink(raw);
  var hdrs = headers(HOST + "/");

  var playPage = p.playUrl;
  if (!playPage && p.path) {
    var d = await loadDetail(raw.indexOf("91:") === 0 ? raw : "91:" + p.path);
    if (d && d.episodeItems && d.episodeItems.length) {
      return loadResource({ link: d.episodeItems[0].link });
    }
    return [];
  }
  if (!playPage) return [];

  if (/\.m3u8|\.mp4/i.test(playPage)) {
    return [
      {
        name: "91",
        url: playPage,
        playerType: "app",
        customHeaders: hdrs
      }
    ];
  }

  var html = await fetchHtml(playPage, playPage);
  var m3u8 = extractM3u8(html);
  if (!m3u8) {
    // 再试一次
    html = await fetchHtml(playPage, HOST + "/");
    m3u8 = extractM3u8(html);
  }
  if (!m3u8) return [];
  m3u8 = absUrl(m3u8);
  return [
    {
      name: "在线",
      url: m3u8,
      playerType: "app",
      customHeaders: {
        "User-Agent": UA,
        Referer: playPage,
        Accept: "*/*"
      }
    }
  ];
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
