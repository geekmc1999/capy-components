/**
 * 57吃瓜网 ForwardWidget
 * 站点: https://57cg4.com
 * 列表 /events/{id}/ ，详情提取 m3u8 / mp4
 * 宣传频道: https://t.me/nostremby （欢迎加入 宝宝巴士乐园）
 */
WidgetMetadata = {
  id: "forward.57cg.tut",
  title: "57吃瓜",
  version: "1.1.0",
  requiredVersion: "0.0.1",
  description: "57吃瓜网  | 欢迎加入 宝宝巴士乐园 t.me/nostremby",
  author: "宝宝巴士",
  site: "https://t.me/nostremby",
  detailCacheDuration: 300,
  globalParams: [
    {
      name: "baseUrl",
      title: "站点域名",
      type: "input",
      value: "https://57cg4.com"
    },
    {
      name: "coverProxy",
      title: "封面代理前缀(防盗链)",
      type: "input",
      value: "",
      description: "封面 CDN 需 Referer。若无图可填代理，如 https://images.weserv.nl/?url= 或自建 Worker"
    }
  ],
  modules: [
    {
      id: "hot",
      title: "热门",
      functionName: "loadHot",
      cacheDuration: 300,
      params: [{ name: "page", title: "页码", type: "page" }]
    },
    {
      id: "home",
      title: "首页最新",
      functionName: "loadHome",
      cacheDuration: 300,
      params: [{ name: "page", title: "页码", type: "page" }]
    },
    {
      id: "jrcg",
      title: "今日吃瓜",
      functionName: "loadJrcg",
      cacheDuration: 300,
      params: [{ name: "page", title: "页码", type: "page" }]
    },
    {
      id: "aichengduanju",
      title: "成人AI短剧",
      functionName: "loadAiDuanju",
      cacheDuration: 300,
      params: [{ name: "page", title: "页码", type: "page" }]
    },
    {
      id: "mrds",
      title: "每日大赛",
      functionName: "loadMrds",
      cacheDuration: 300,
      params: [{ name: "page", title: "页码", type: "page" }]
    },
    {
      id: "wanghong",
      title: "网红黑料",
      functionName: "loadWanghong",
      cacheDuration: 300,
      params: [{ name: "page", title: "页码", type: "page" }]
    },
    {
      id: "video",
      title: "网黄合集",
      functionName: "loadVideo",
      cacheDuration: 300,
      params: [{ name: "page", title: "页码", type: "page" }]
    },
    {
      id: "cheating",
      title: "出轨劈腿",
      functionName: "loadCheating",
      cacheDuration: 300,
      params: [{ name: "page", title: "页码", type: "page" }]
    },
    {
      id: "live",
      title: "直播擦边",
      functionName: "loadLive",
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

var UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";

function t(v) {
  return String(v == null ? "" : v).trim();
}

function baseOf(params) {
  return t((params && params.baseUrl) || "https://57cg4.com").replace(/\/+$/, "");
}

function headers(base) {
  return {
    "User-Agent": UA,
    Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8",
    Referer: base + "/"
  };
}

async function fetchHtml(url, base) {
  var resp = await Widget.http.get(url, {
    headers: headers(base),
    timeout: 20
  });
  if (!resp) throw new Error("空响应: " + url);
  if (typeof resp.data === "string") return resp.data;
  if (resp.data != null) return String(resp.data);
  throw new Error("无法读取页面: " + url);
}

function absUrl(base, u) {
  u = t(u);
  if (!u) return "";
  if (/^https?:\/\//i.test(u)) return u;
  if (u.indexOf("//") === 0) return "https:" + u;
  if (u.charAt(0) === "/") return base + u;
  return base + "/" + u;
}

function decodeHtml(s) {
  return t(s)
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ");
}

/** 去掉标题前重复的分类/栏目前缀，只保留正常片名 */
function cleanTitle(title) {
  var raw = decodeHtml(title);
  if (!raw) return "";
  var prefixes = [
    "AI成人短剧",
    "成人AI短剧",
    "每日大赛",
    "今日吃瓜",
    "网红黑料",
    "网黄合集",
    "出轨劈腿",
    "直播擦边",
    "社会事件",
    "明星八卦",
    "热门事件",
    "热门",
    "每日大"
  ];
  var out = raw;
  var changed = true;
  while (changed) {
    changed = false;
    out = t(out);
    for (var i = 0; i < prefixes.length; i++) {
      var p = prefixes[i];
      if (out.indexOf(p) === 0) {
        out = out.slice(p.length).replace(/^[\s\-_|｜·:：]+/, "");
        changed = true;
        break;
      }
    }
  }
  out = t(out);
  return out || raw;
}

function listUrl(base, category, page) {
  page = Number(page || 1) || 1;
  category = t(category || "hot");
  if (category === "home" || category === "") {
    return page <= 1 ? base + "/" : base + "/page/" + page + "/";
  }
  var path = base + "/" + category + "/";
  if (page > 1) path += "?page=" + page;
  return path;
}

function searchUrl(base, keyword, page) {
  page = Number(page || 1) || 1;
  var u = base + "/search/?q=" + encodeURIComponent(keyword);
  if (page > 1) u += "&page=" + page;
  return u;
}

function wrapCover(url, base, proxy) {
  url = t(url);
  if (!url) return "";
  url = absUrl(base, url);
  proxy = t(proxy);
  if (!proxy) return url;
  // 支持两种写法：
  // 1) https://xxx/?url=   → 自动 encode 完整地址
  // 2) https://xxx/proxy?u= → 同上
  if (/[?&]url=$/.test(proxy) || /[?&]u=$/.test(proxy) || /[?&]src=$/.test(proxy)) {
    return proxy + encodeURIComponent(url);
  }
  if (proxy.charAt(proxy.length - 1) === "=") {
    return proxy + encodeURIComponent(url);
  }
  return proxy + (proxy.indexOf("?") >= 0 ? "&url=" : "?url=") + encodeURIComponent(url);
}

function cardHeaders(base) {
  return {
    "User-Agent": UA,
    Referer: base + "/",
    Origin: base
  };
}

/**
 * 解析列表页卡片：/events/{id}/
 * 封面在 <a> 内部的 img，CDN 需 Referer（无 Referer 会 403）
 */
function parseList(html, base, proxy) {
  if (!html) return [];
  var out = [];
  var seen = {};
  // 优先按完整 <a>...</a> 卡片截取，避免切分丢图
  var re = /<a[^>]+href="\/events\/(\d+)\/"[^>]*>([\s\S]*?)<\/a>/gi;
  var m;
  while ((m = re.exec(html))) {
    var id = m[1];
    if (seen[id]) continue;
    var body = m[0]; // 含开标签，title/alt 都在这里
    // 只保留带图的主卡片，过滤页脚相关推荐纯文字链
    var im = body.match(
      /(?:src|data-src|data-original)=["'](https?:\/\/[^"']+\.(?:jpg|jpeg|png|webp)[^"']*)["']/i
    );
    if (!im) {
      im = body.match(
        /(?:src|data-src)=["'](\/[^"']+\.(?:jpg|jpeg|png|webp)[^"']*)["']/i
      );
    }
    if (!im) continue; // 无封面的链直接跳过，避免一堆空白卡片
    seen[id] = 1;

    var title = "";
    var tm = body.match(/alt=["']([^"']{2,200})["']/i);
    if (tm) title = tm[1];
    if (!title) {
      tm = body.match(/title=["']([^"']{2,200})["']/i);
      if (tm) title = tm[1];
    }
    if (!title) {
      tm = body.match(/<h[123][^>]*>([^<]{2,200})<\/h/i);
      if (tm) title = tm[1];
    }
    title = cleanTitle(title);
    if (!title) title = "事件 " + id;

    var cover = wrapCover(im[1], base, proxy);
    out.push({
      id: id,
      type: "url",
      title: title,
      coverUrl: cover,
      posterPath: cover,
      backdropPath: cover,
      description: "",
      mediaType: "movie",
      link: id,
      // 部分 Forward 版本加载封面会带上该项
      customHeaders: cardHeaders(base)
    });
  }

  // 兜底：旧切分逻辑（若上面一个都没解析到）
  if (!out.length) {
    var parts = html.split(/(?=<a[^>]+href="\/events\/\d+\/")/i);
    for (var i = 0; i < parts.length; i++) {
      var p = parts[i];
      var mm = p.match(/href="\/events\/(\d+)\/"/i);
      if (!mm || seen[mm[1]]) continue;
      var id2 = mm[1];
      var im2 = p.match(
        /(?:src|data-src|data-original)="(https?:\/\/[^"]+\.(?:jpg|jpeg|png|webp)[^"]*)"/i
      );
      if (!im2) continue;
      seen[id2] = 1;
      var title2 = "";
      var t2 = p.match(/alt="([^"]{2,200})"/i) || p.match(/title="([^"]{2,200})"/i);
      if (t2) title2 = cleanTitle(t2[1]);
      if (!title2) title2 = "事件 " + id2;
      var cover2 = wrapCover(im2[1], base, proxy);
      out.push({
        id: id2,
        type: "url",
        title: title2,
        coverUrl: cover2,
        posterPath: cover2,
        backdropPath: cover2,
        description: "",
        mediaType: "movie",
        link: id2,
        customHeaders: cardHeaders(base)
      });
    }
  }
  return out;
}

function extractPlay(html) {
  var sources = [];
  var seen = {};
  function add(url, name) {
    url = t(url);
    if (!url || seen[url]) return;
    if (!/^https?:\/\//i.test(url)) return;
    seen[url] = 1;
    sources.push({ name: name || "播放", url: url });
  }
  var m3 = html.match(/https?:\/\/[^"'\s<>]+\.m3u8[^"'\s<>]*/gi) || [];
  for (var i = 0; i < m3.length; i++) add(m3[i], "HLS");
  var mp = html.match(/https?:\/\/[^"'\s<>]+\.mp4[^"'\s<>]*/gi) || [];
  for (var j = 0; j < mp.length; j++) add(mp[j], "MP4");
  // 兜底：json 字段
  var fields = html.match(
    /["'](?:url|play_url|playUrl|src|file|video)["']\s*:\s*["'](https?:\/\/[^"']+)["']/gi
  );
  if (fields) {
    for (var k = 0; k < fields.length; k++) {
      var um = fields[k].match(/https?:\/\/[^"']+/);
      if (um) {
        var u = um[0];
        if (/\.m3u8/i.test(u)) add(u, "HLS");
        else if (/\.mp4/i.test(u)) add(u, "MP4");
      }
    }
  }
  return sources;
}

function extractTitle(html, fallback) {
  var m = html.match(/property=["']og:title["'][^>]*content=["']([^"']+)/i);
  if (m) return cleanTitle(m[1]);
  m = html.match(/content=["']([^"']+)["'][^>]*property=["']og:title["']/i);
  if (m) return cleanTitle(m[1]);
  m = html.match(/<h1[^>]*>([^<]{2,200})<\/h1>/i);
  if (m) return cleanTitle(m[1]);
  m = html.match(/<title>([^<]+)<\/title>/i);
  if (m) {
    return cleanTitle(m[1].replace(/\s*[-|_｜].*57.*/, "").trim());
  }
  return fallback || "";
}

function extractCover(html, base) {
  var m = html.match(/property=["']og:image["'][^>]*content=["']([^"']+)/i);
  if (m) return absUrl(base, m[1]);
  m = html.match(/content=["']([^"']+)["'][^>]*property=["']og:image["']/i);
  if (m) return absUrl(base, m[1]);
  m = html.match(
    /(?:src|data-src)="(https?:\/\/s\.chigua\.media\/media\/[^"]+\.(?:jpg|jpeg|png|webp)[^"]*)"/i
  );
  if (m) return m[1];
  return "";
}

async function loadByCat(params, category) {
  params = params || {};
  var base = baseOf(params);
  var proxy = t(params.coverProxy || "");
  var page = params.page || 1;
  var url = listUrl(base, category, page);
  var html = await fetchHtml(url, base);
  return parseList(html, base, proxy);
}

async function loadHot(params) {
  return loadByCat(params, "hot");
}
async function loadHome(params) {
  return loadByCat(params, "home");
}
async function loadJrcg(params) {
  return loadByCat(params, "jrcg");
}
async function loadAiDuanju(params) {
  return loadByCat(params, "aichengduanju");
}
async function loadMrds(params) {
  return loadByCat(params, "mrds");
}
async function loadWanghong(params) {
  return loadByCat(params, "wanghong");
}
async function loadVideo(params) {
  return loadByCat(params, "video");
}
async function loadCheating(params) {
  return loadByCat(params, "cheating");
}
async function loadLive(params) {
  return loadByCat(params, "live");
}

async function loadList(params) {
  // 兼容旧调用
  params = params || {};
  return loadByCat(params, t(params.category || "hot"));
}


async function search(params) {
  params = params || {};
  var base = baseOf(params);
  var proxy = t(params.coverProxy || "");
  var kw = t(params.keyword || params.wd || params.q || "");
  if (!kw) return [];
  var page = params.page || 1;
  var url = searchUrl(base, kw, page);
  var html = await fetchHtml(url, base);
  return parseList(html, base, proxy);
}

async function loadDetail(link) {
  var id = t(link);
  // 兼容 params 对象
  if (id && typeof link === "object") {
    id = t(link.link || link.id || "");
  }
  if (!id) return null;
  // 去掉可能的前缀
  var mm = id.match(/events\/(\d+)/);
  if (mm) id = mm[1];
  id = id.replace(/[^0-9]/g, "");
  if (!id) return null;

  var base = baseOf({});
  var pageUrl = base + "/events/" + id + "/";
  var html = await fetchHtml(pageUrl, base);
  var title = extractTitle(html, id);
  var proxy = "";
  try {
    // loadDetail 有的环境不传 globalParams，尽量从 link 对象取
    if (link && typeof link === "object") proxy = t(link.coverProxy || "");
  } catch (e) {}
  var cover = wrapCover(extractCover(html, base), base, proxy);
  var sources = extractPlay(html);
  var best = sources.length ? sources[0].url : "";

  // 简介：截一点正文
  var desc = "";
  var dm = html.match(
    /property=["']og:description["'][^>]*content=["']([^"']+)/i
  );
  if (dm) desc = decodeHtml(dm[1]);

  return {
    id: id,
    type: "url",
    title: title,
    description: desc,
    coverUrl: cover,
    posterPath: cover,
    backdropPath: cover,
    videoUrl: best,
    mediaType: "movie",
    link: id,
    customHeaders: {
      "User-Agent": UA,
      Referer: pageUrl,
      Origin: base
    }
  };
}

async function loadResource(params) {
  params = params || {};
  var id = t(params.link || params.id || "");
  var mm = id.match(/events\/(\d+)/);
  if (mm) id = mm[1];
  id = id.replace(/[^0-9]/g, "");
  if (!id) return [];

  var base = baseOf(params);
  var pageUrl = base + "/events/" + id + "/";
  var html = await fetchHtml(pageUrl, base);
  var sources = extractPlay(html);
  var hdrs = {
    "User-Agent": UA,
    Referer: pageUrl,
    Origin: base
  };
  return sources.map(function (s, idx) {
    return {
      name: (s.name || "线路") + (sources.length > 1 ? " " + (idx + 1) : ""),
      description: s.name || "",
      url: s.url,
      customHeaders: hdrs
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
