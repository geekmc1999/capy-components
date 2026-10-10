/**
 * 麻豆 ForwardWidget
 * 站点: https://madou.club
 * 列表: article.excerpt，封面优先 data-src
 * 播放: 详情 iframe → dash.madou.club/share/xxx → m3u8?token=
 * 宣传: https://t.me/nostremby （欢迎加入 宝宝巴士乐园）
 */
WidgetMetadata = {
  id: "forward.madou.tut",
  title: "麻豆",
  version: "1.0.0",
  requiredVersion: "0.0.1",
  description: "麻豆社在线：分栏分类/搜索，详情解析 HLS | 欢迎加入 宝宝巴士乐园 t.me/nostremby",
  author: "宝宝巴士",
  site: "https://t.me/nostremby",
  detailCacheDuration: 300,
  globalParams: [
    {
      name: "baseUrl",
      title: "站点域名",
      type: "input",
      value: "https://madou.club"
    }
  ],
  modules: [
    { id: "home", title: "最新", functionName: "loadHome", cacheDuration: 300, params: [{ name: "page", title: "页码", type: "page" }] },
    { id: "madou", title: "麻豆传媒", functionName: "loadMadou", cacheDuration: 300, params: [{ name: "page", title: "页码", type: "page" }] },
    { id: "hkd", title: "HongKongDoll", functionName: "loadHkd", cacheDuration: 300, params: [{ name: "page", title: "页码", type: "page" }] },
    { id: "guodong", title: "果冻传媒", functionName: "loadGuodong", cacheDuration: 300, params: [{ name: "page", title: "页码", type: "page" }] },
    { id: "mitao", title: "蜜桃影像", functionName: "loadMitao", cacheDuration: 300, params: [{ name: "page", title: "页码", type: "page" }] },
    { id: "tianmei", title: "天美传媒", functionName: "loadTianmei", cacheDuration: 300, params: [{ name: "page", title: "页码", type: "page" }] },
    { id: "jingdong", title: "精东影业", functionName: "loadJingdong", cacheDuration: 300, params: [{ name: "page", title: "页码", type: "page" }] },
    { id: "jy91", title: "91制片厂", functionName: "load91", cacheDuration: 300, params: [{ name: "page", title: "页码", type: "page" }] },
    { id: "huangjia", title: "皇家华人", functionName: "loadHuangjia", cacheDuration: 300, params: [{ name: "page", title: "页码", type: "page" }] },
    { id: "tuzi", title: "兔子先生", functionName: "loadTuzi", cacheDuration: 300, params: [{ name: "page", title: "页码", type: "page" }] },
    { id: "xingkong", title: "星空无限", functionName: "loadXingkong", cacheDuration: 300, params: [{ name: "page", title: "页码", type: "page" }] },
    { id: "aidou", title: "爱豆", functionName: "loadAidou", cacheDuration: 300, params: [{ name: "page", title: "页码", type: "page" }] },
    { id: "daoyan", title: "导演系列", functionName: "loadDaoyan", cacheDuration: 300, params: [{ name: "page", title: "页码", type: "page" }] },
    { id: "daxiang", title: "大象传媒", functionName: "loadDaxiang", cacheDuration: 300, params: [{ name: "page", title: "页码", type: "page" }] },
    { id: "maozhua", title: "猫爪影像", functionName: "loadMaozhua", cacheDuration: 300, params: [{ name: "page", title: "页码", type: "page" }] },
    { id: "xingba", title: "杏吧", functionName: "loadXingba", cacheDuration: 300, params: [{ name: "page", title: "页码", type: "page" }] },
    { id: "lebo", title: "乐播传媒", functionName: "loadLebo", cacheDuration: 300, params: [{ name: "page", title: "页码", type: "page" }] },
    { id: "psycho", title: "PsychoPorn", functionName: "loadPsycho", cacheDuration: 300, params: [{ name: "page", title: "页码", type: "page" }] },
    { id: "fanwai", title: "番外篇", functionName: "loadFanwai", cacheDuration: 300, params: [{ name: "page", title: "页码", type: "page" }] },
    { id: "huaxu", title: "花絮", functionName: "loadHuaxu", cacheDuration: 300, params: [{ name: "page", title: "页码", type: "page" }] },
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
  return t((params && params.baseUrl) || "https://madou.club").replace(/\/+$/, "");
}

function hdr(base) {
  return {
    "User-Agent": UA,
    Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8",
    Referer: base + "/"
  };
}

async function fetchHtml(url, base) {
  var resp = await Widget.http.get(url, { headers: hdr(base), timeout: 20 });
  if (!resp) throw new Error("空响应");
  if (typeof resp.data === "string") return resp.data;
  if (resp.data != null) return String(resp.data);
  throw new Error("无法读取: " + url);
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

/** 封面：优先 data-src / data-original，去掉占位 thumb.png；尽量升到原图 */
function pickCover(chunk, base) {
  var candidates = [];
  var re = /(?:data-src|data-original|data-thumb|src)=["']([^"']+)["']/gi;
  var m;
  while ((m = re.exec(chunk))) {
    var u = m[1];
    if (!u) continue;
    if (/thumb\.png|logo\.png|avatar|loading|placeholder/i.test(u)) continue;
    candidates.push(u);
  }
  if (!candidates.length) return "";
  var cover = candidates[0];
  // -240x180.jpg → 尝试原图路径（去掉尺寸后缀）
  cover = cover.replace(/-\d+x\d+(\.(?:jpg|jpeg|png|webp))/i, "$1");
  return absUrl(base, cover);
}

function listUrl(base, cat, page) {
  page = Number(page || 1) || 1;
  cat = t(cat);
  if (!cat || cat === "home" || cat === "latest") {
    return page <= 1 ? base + "/" : base + "/page/" + page;
  }
  // 分类 slug：中文或英文路径
  var path = base + "/category/" + encodeURIComponent(cat);
  if (page > 1) path += "/page/" + page;
  return path;
}

function parseList(html, base) {
  if (!html) return [];
  var out = [];
  var seen = {};
  var re = /<article[^>]*class="[^"]*excerpt[^"]*"[\s\S]*?<\/article>/gi;
  var m;
  while ((m = re.exec(html))) {
    var chunk = m[0];
    var hm = chunk.match(
      /<a[^>]+class="[^"]*thumbnail[^"]*"[^>]+href=["']([^"']+)["']/i
    );
    if (!hm) hm = chunk.match(/<h2[^>]*>\s*<a[^>]+href=["']([^"']+)["']/i);
    if (!hm) hm = chunk.match(/href=["'](https?:\/\/[^"']+\.html)["']/i);
    if (!hm) continue;
    var link = absUrl(base, hm[1]);
    if (seen[link]) continue;
    seen[link] = 1;

    var title = "";
    var tm = chunk.match(/<h2[^>]*>\s*<a[^>]*>([^<]+)<\/a>/i);
    if (tm) title = decodeHtml(tm[1]);
    if (!title) {
      tm = chunk.match(/title=["']([^"']+)["']/i);
      if (tm) title = decodeHtml(tm[1]);
    }
    if (!title) title = link;

    var cover = pickCover(chunk, base);
    var id = link;
    var idm = link.match(/\/([^\/]+)\.html/i);
    if (idm) id = decodeURIComponent(idm[1]);

    out.push({
      id: id,
      type: "url",
      title: title,
      coverUrl: cover,
      posterPath: cover,
      backdropPath: cover,
      description: "",
      mediaType: "movie",
      link: link,
      customHeaders: {
        "User-Agent": UA,
        Referer: base + "/"
      }
    });
  }
  return out;
}

async function loadByCat(params, cat) {
  params = params || {};
  var base = baseOf(params);
  var page = params.page || 1;
  var url = listUrl(base, cat, page);
  var html = await fetchHtml(url, base);
  return parseList(html, base);
}

async function loadHome(params) {
  return loadByCat(params, "home");
}
async function loadMadou(params) {
  return loadByCat(params, "麻豆传媒");
}
async function loadHkd(params) {
  return loadByCat(params, "hongkongdoll");
}
async function loadGuodong(params) {
  return loadByCat(params, "果冻传媒");
}
async function loadMitao(params) {
  return loadByCat(params, "蜜桃影像");
}
async function loadTianmei(params) {
  return loadByCat(params, "天美传媒");
}
async function loadJingdong(params) {
  return loadByCat(params, "精东影业");
}
async function load91(params) {
  return loadByCat(params, "91制片厂");
}
async function loadHuangjia(params) {
  return loadByCat(params, "皇家华人");
}
async function loadTuzi(params) {
  return loadByCat(params, "兔子先生");
}
async function loadXingkong(params) {
  return loadByCat(params, "星空无限传媒");
}
async function loadAidou(params) {
  return loadByCat(params, "爱豆");
}
async function loadDaoyan(params) {
  return loadByCat(params, "麻豆导演系列");
}
async function loadDaxiang(params) {
  return loadByCat(params, "大象传媒");
}
async function loadMaozhua(params) {
  return loadByCat(params, "猫爪影像");
}
async function loadXingba(params) {
  return loadByCat(params, "杏吧");
}
async function loadLebo(params) {
  return loadByCat(params, "乐播传媒");
}
async function loadPsycho(params) {
  return loadByCat(params, "psychoporntw");
}
async function loadFanwai(params) {
  return loadByCat(params, "麻豆番外篇");
}
async function loadHuaxu(params) {
  return loadByCat(params, "麻豆花絮");
}

async function search(params) {
  params = params || {};
  var base = baseOf(params);
  var kw = t(params.keyword || params.wd || "");
  if (!kw) return [];
  var page = Number(params.page || 1) || 1;
  var url = base + "/?s=" + encodeURIComponent(kw);
  if (page > 1) url = base + "/page/" + page + "/?s=" + encodeURIComponent(kw);
  var html = await fetchHtml(url, base);
  return parseList(html, base);
}

function extractShareUrl(html) {
  if (!html) return "";
  var m =
    html.match(
      /src\s*=\s*["']?(https?:\/\/dash\.madou\.club\/share\/[a-zA-Z0-9]+)["'\s>]/i
    ) ||
    html.match(
      /src\s*=\s*["']?(https?:\/\/[^"'\s>]+\.madou\.[^"'\s>]+\/share\/[a-zA-Z0-9]+)["'\s>]/i
    ) ||
    html.match(/https?:\/\/dash\.madou\.club\/share\/[a-zA-Z0-9]+/i);
  if (!m) return "";
  return m[1] || m[0];
}

async function resolvePlayFromShare(shareUrl, base) {
  shareUrl = t(shareUrl);
  if (!shareUrl) return null;
  var playerHtml = await fetchHtml(shareUrl, base);
  var tokenM = playerHtml.match(/var\s+token\s*=\s*["']([^"']*)["']/);
  var m3u8M = playerHtml.match(/var\s+m3u8\s*=\s*["']([^"']+)["']/);
  if (!m3u8M) return null;
  var path = m3u8M[1];
  var dashBase =
    (shareUrl.match(/^(https?:\/\/[^\/]+)/i) || [])[1] ||
    "https://dash.madou.club";
  if (path.indexOf("/") === 0) path = dashBase + path;
  else if (!/^https?:\/\//i.test(path))
    path = dashBase.replace(/\/+$/, "") + "/" + path.replace(/^\/+/, "");
  var token = (tokenM && tokenM[1]) || "";
  if (token) path += (path.indexOf("?") >= 0 ? "&" : "?") + "token=" + token;
  return { url: path, shareUrl: shareUrl };
}

/** master → 最高画质子流 */
async function pickBestHls(masterUrl, base) {
  try {
    var txt = await fetchHtml(masterUrl, base);
    if (!txt || txt.indexOf("#EXT-X-STREAM-INF") === -1) return masterUrl;
    var lines = txt.split(/\r?\n/);
    var best = null;
    var bestScore = -1;
    for (var i = 0; i < lines.length; i++) {
      if (!/#EXT-X-STREAM-INF/i.test(lines[i])) continue;
      var res = lines[i].match(/RESOLUTION=\d+x(\d+)/i);
      var bw = lines[i].match(/BANDWIDTH=(\d+)/i);
      var h = res ? parseInt(res[1], 10) : 0;
      var score = res ? h : bw ? parseInt(bw[1], 10) / 1000 : 0;
      var j = i + 1;
      while (
        j < lines.length &&
        (!lines[j].replace(/\s/g, "") || lines[j].charAt(0) === "#")
      )
        j++;
      var vurl = j < lines.length ? t(lines[j]) : "";
      if (!vurl) continue;
      try {
        // relative → absolute
        if (!/^https?:\/\//i.test(vurl)) {
          var basePath = masterUrl.replace(/\/[^\/]*$/, "/");
          vurl = vurl.indexOf("/") === 0
            ? masterUrl.match(/^https?:\/\/[^\/]+/)[0] + vurl
            : basePath + vurl;
        }
      } catch (e) {}
      if (score > bestScore) {
        bestScore = score;
        best = vurl;
      }
    }
    return best || masterUrl;
  } catch (e) {
    return masterUrl;
  }
}

function normalizeLink(link) {
  if (link && typeof link === "object") {
    return t(link.link || link.id || link.url || "");
  }
  return t(link);
}

async function loadDetail(link) {
  var pageUrl = normalizeLink(link);
  if (!pageUrl) return null;
  var base = baseOf({});
  if (!/^https?:\/\//i.test(pageUrl)) {
    pageUrl = absUrl(base, pageUrl.indexOf("/") === 0 ? pageUrl : "/" + pageUrl);
  }
  var html = await fetchHtml(pageUrl, base);

  var title = "";
  var tm = html.match(/<h1[^>]*class="[^"]*article-title[^"]*"[^>]*>([^<]+)/i);
  if (tm) title = decodeHtml(tm[1]);
  if (!title) {
    tm = html.match(/<h1[^>]*>([^<]{2,200})<\/h1>/i);
    if (tm) title = decodeHtml(tm[1]);
  }
  if (!title) {
    tm = html.match(/<title>([^<]+)<\/title>/i);
    if (tm) title = decodeHtml(tm[1].replace(/\s*[-|_].*$/, ""));
  }

  var cover = pickCover(html, base);
  // 详情页优先 covers/ 下的图
  var cm = html.match(
    /(?:data-src|src)=["'](https?:\/\/[^"']*\/covers\/[^"']+\.(?:jpg|jpeg|png|webp)[^"']*)["']/i
  );
  if (cm) cover = absUrl(base, cm[1].replace(/-\d+x\d+(\.(?:jpg|jpeg|png|webp))/i, "$1"));

  var share = extractShareUrl(html);
  var play = share ? await resolvePlayFromShare(share, base) : null;
  var videoUrl = "";
  if (play && play.url) {
    videoUrl = await pickBestHls(play.url, base);
  }

  return {
    id: pageUrl,
    type: "url",
    title: title || pageUrl,
    description: "",
    coverUrl: cover,
    posterPath: cover,
    backdropPath: cover,
    videoUrl: videoUrl,
    mediaType: "movie",
    link: pageUrl,
    customHeaders: {
      "User-Agent": UA,
      Referer: "https://madou.club/",
      Origin: "https://dash.madou.club"
    }
  };
}

async function loadResource(params) {
  params = params || {};
  var pageUrl = t(params.link || params.id || "");
  if (!pageUrl) return [];
  var base = baseOf(params);
  if (!/^https?:\/\//i.test(pageUrl)) {
    pageUrl = absUrl(base, pageUrl);
  }
  var html = await fetchHtml(pageUrl, base);
  var share = extractShareUrl(html);
  if (!share) return [];
  var play = await resolvePlayFromShare(share, base);
  if (!play || !play.url) return [];
  var best = await pickBestHls(play.url, base);
  var headers = {
    "User-Agent": UA,
    Referer: "https://madou.club/",
    Origin: "https://dash.madou.club"
  };
  var list = [
    {
      name: "最高画质",
      description: "HLS",
      url: best,
      customHeaders: headers
    }
  ];
  if (best !== play.url) {
    list.push({
      name: "原画(Master)",
      description: "HLS Master",
      url: play.url,
      customHeaders: headers
    });
  }
  return list;
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
