/**
 * 荐片 ForwardWidget
 * API: https://api.ztcgi.com
 * 参考: 荐片[优].js
 * 宣传: https://t.me/nostremby
 */
WidgetMetadata = {
  id: "forward.jianpian.tut",
  title: "荐片",
  version: "1.0.4",
  requiredVersion: "0.0.1",
  description: "荐片：电影/电视剧/动漫/短剧/综艺，搜索与多线路播放 | 宝宝巴士乐园 t.me/nostremby",
  author: "宝宝巴士",
  site: "https://t.me/nostremby",
  detailCacheDuration: 300,
  modules: [
    { id: "home", title: "推荐", functionName: "loadHome", cacheDuration: 600, params: [{ name: "page", title: "页码", type: "page" }] },
    { id: "movie", title: "电影", functionName: "loadMovie", cacheDuration: 600, params: [{ name: "page", title: "页码", type: "page" }] },
    { id: "tv", title: "电视剧", functionName: "loadTv", cacheDuration: 600, params: [{ name: "page", title: "页码", type: "page" }] },
    { id: "anime", title: "动漫", functionName: "loadAnime", cacheDuration: 600, params: [{ name: "page", title: "页码", type: "page" }] },
    { id: "short", title: "短剧", functionName: "loadShort", cacheDuration: 600, params: [{ name: "page", title: "页码", type: "page" }] },
    { id: "variety", title: "综艺", functionName: "loadVariety", cacheDuration: 600, params: [{ name: "page", title: "页码", type: "page" }] },
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

var API = "https://api.ztcgi.com";
var UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";
var DEFAULT_IMG = "https://img1.vbwus.com";
var _imgHost = "";

function t(v) {
  return String(v == null ? "" : v).trim();
}

function qs(obj) {
  var parts = [];
  Object.keys(obj || {}).forEach(function (k) {
    if (obj[k] === undefined || obj[k] === null) return;
    parts.push(encodeURIComponent(k) + "=" + encodeURIComponent(String(obj[k])));
  });
  return parts.length ? "?" + parts.join("&") : "";
}

async function apiGet(path) {
  var url = path.indexOf("http") === 0 ? path : API + path;
  var res = await Widget.http.get(url, {
    headers: {
      "User-Agent": UA,
      // 服务端 Content-Type 误标 text/html，Accept 须兼容
      Accept: "text/html,application/json,text/plain,*/*",
      "Accept-Language": "zh-CN,zh;q=0.9",
      Referer: "https://api.ztcgi.com/"
    }
  });
  var body = res && (res.data !== undefined ? res.data : res);
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch (e) {}
  }
  return body;
}

async function ensureImgHost() {
  if (_imgHost) return _imgHost;
  try {
    var res = await apiGet("/api/v2/settings/resourceDomainConfig");
    var domain = (((res || {}).data || {}).imgDomain) || "";
    var domains = String(domain)
      .split(",")
      .map(function (d) {
        return t(d);
      })
      .filter(Boolean);
    var imgOnes = domains.filter(function (d) {
      return d.indexOf("img") === 0;
    });
    var pool = imgOnes.length ? imgOnes : domains;
    if (pool.length) {
      _imgHost = "https://" + pool[Math.floor(Math.random() * pool.length)];
      return _imgHost;
    }
  } catch (e) {}
  _imgHost = DEFAULT_IMG;
  return _imgHost;
}

function absImg(host, path) {
  path = t(path);
  if (!path) return "";
  if (/^https?:\/\//i.test(path)) return path;
  if (path.indexOf("//") === 0) return "https:" + path;
  return host + (path.charAt(0) === "/" ? "" : "/") + path;
}

function mapItem(it, isShort, mediaType) {
  if (!it) return null;
  var id = t(it.id || it.jump_id || it._id);
  if (!id) return null;
  var host = _imgHost || DEFAULT_IMG;
  var cover = absImg(
    host,
    isShort
      ? it.cover_image || it.path || it.thumbnail
      : it.thumbnail || it.path || it.cover_image
  );
  var score = it.score ? " ⭐" + it.score : "";
  var mask = t(it.mask || (it.playlist && it.playlist.title) || "");
  // 电视剧/动漫/综艺/短剧必须标 tv，App 才会走分集详情而不是单集页
  var mt = mediaType || (isShort ? "tv" : "movie");
  return {
    id: "jp:" + id + (isShort ? "@67" : ""),
    type: "url",
    title: t(it.title) || id,
    coverUrl: cover,
    posterPath: cover,
    backdropPath: cover,
    description: (mask + score).trim(),
    mediaType: mt,
    link: "jp:" + id + (isShort ? "@67" : "")
  };
}

async function loadHome(params) {
  await ensureImgHost();
  var res = await apiGet("/api/slide/list?pos_id=88");
  var list = (res && res.data) || [];
  var out = [];
  for (var i = 0; i < list.length; i++) {
    var it = mapItem(list[i], false, "tv");
    if (it) {
      // jump_id 可能是详情 id
      var jid = t(list[i].jump_id || list[i].id);
      if (jid) {
        it.id = "jp:" + jid;
        it.link = "jp:" + jid;
      }
      out.push(it);
    }
  }
  return out;
}

async function loadList(params, pid, isShort, mediaType) {
  params = params || {};
  await ensureImgHost();
  var page = Number(params.page || 1) || 1;
  var path = isShort ? "/api/crumb/shortList" : "/api/crumb/list";
  var query = {
    fcate_pid: pid,
    category_id: "",
    page: page,
    area: "0",
    year: "0",
    type: String(pid),
    sort: isShort ? "update" : "hot"
  };
  var res = await apiGet(path + qs(query));
  var list = (res && res.data) || [];
  var out = [];
  for (var i = 0; i < list.length; i++) {
    var it = mapItem(list[i], isShort, mediaType);
    if (it) out.push(it);
  }
  return out;
}

async function loadMovie(params) {
  return loadList(params, 1, false, "movie");
}
async function loadTv(params) {
  return loadList(params, 2, false, "tv");
}
async function loadAnime(params) {
  return loadList(params, 3, false, "tv");
}
async function loadShort(params) {
  return loadList(params, 67, true, "tv");
}
async function loadVariety(params) {
  return loadList(params, 4, false, "tv");
}

async function search(params) {
  params = params || {};
  await ensureImgHost();
  var kw = t(params.keyword);
  if (!kw) return [];
  var page = Number(params.page || 1) || 1;
  var res = await apiGet(
    "/api/v2/search/videoV2" +
      qs({ key: kw, category_id: 88, page: page, pageSize: 20 })
  );
  var list = (res && res.data) || [];
  var out = [];
  for (var i = 0; i < list.length; i++) {
    var it = mapItem(list[i], false, "tv");
    if (it) out.push(it);
  }
  return out;
}

function parseLink(link) {
  var s = t(link).replace(/^jp:/, "");
  var tid = "";
  if (s.indexOf("@") >= 0) {
    var p = s.split("@");
    s = p[0];
    tid = p[1] || "";
  }
  return { id: t(s), tid: t(tid) };
}

function renameSource(name) {
  name = t(name) || "默认";
  if (name === "常规线路") return "边下边播";
  return name;
}

async function loadDetail(link) {
  await ensureImgHost();
  var p = parseLink(link);
  if (!p.id) return null;
  var isShort = p.tid === "67";
  var path = isShort
    ? "/api/detail?vid=" + encodeURIComponent(p.id)
    : "/api/video/detailv2?id=" + encodeURIComponent(p.id);
  var res = await apiGet(path);
  var data = (res && res.data) || {};
  if ((!data || !data.title) && !isShort) {
    try {
      var res2 = await apiGet("/api/detail?vid=" + encodeURIComponent(p.id));
      if (res2 && res2.data && res2.data.title) {
        data = res2.data;
        isShort = true;
      }
    } catch (e) {}
  }
  if (!data || !data.title) return null;

  // 片名：只用作品名
  var showTitle = t(data.title);
  var cover = absImg(
    _imgHost || DEFAULT_IMG,
    isShort
      ? data.cover_image || data.path || data.thumbnail
      : data.thumbnail || data.path || data.cover_image
  );
  var desc = t(data.description || data.update_cycle || data.mask || "");

  // 收集各线路的集列表 [{name, list:[{title,url}]}]
  var packs = [];
  if (isShort) {
    var pl = data.playlist || [];
    var list = [];
    for (var i = 0; i < pl.length; i++) {
      var u = t(pl[i].url);
      if (!u) continue;
      list.push({
        title: t(pl[i].title) || "第" + (list.length + 1) + "集",
        url: u
      });
    }
    if (list.length) {
      packs.push({
        name: renameSource((pl[0] && pl[0].source_config_name) || "短剧"),
        list: list
      });
    }
  } else {
    var sources = data.source_list_source || [];
    for (var sIdx = 0; sIdx < sources.length; sIdx++) {
      var src = sources[sIdx];
      var eps = src.source_list || [];
      var list2 = [];
      for (var j = 0; j < eps.length; j++) {
        var u2 = t(eps[j].url);
        if (!u2) continue;
        var et = t(eps[j].source_name || eps[j].weight || "");
        if (!et) et = "第" + (list2.length + 1) + "集";
        list2.push({ title: et, url: u2 });
      }
      if (list2.length) {
        packs.push({ name: renameSource(src.name), list: list2 });
      }
    }
  }

  // 主线路：集数最多的一条
  var primary = null;
  for (var k = 0; k < packs.length; k++) {
    if (!primary || packs[k].list.length > primary.list.length) primary = packs[k];
  }

  // 剧集列表：只展示集名（第1集…），link 用 jp:id@tid#集序号
  var episodeItems = [];
  if (primary) {
    for (var n = 0; n < primary.list.length; n++) {
      var row = primary.list[n];
      var epTitle = row.title;
      // 规范成第N集（电影版本名如 TC国语 保留）
      if (/^\d+$/.test(epTitle)) epTitle = "第" + epTitle + "集";
      var epLink =
        "jp:" + p.id + (isShort ? "@67" : "") + "#" + String(n);
      episodeItems.push({
        id: epLink,
        type: "url",
        title: epTitle,
        mediaType: "tv",
        seasonNumber: 1,
        episodeNumber: n + 1,
        link: epLink,
        videoUrl: "",
        playerType: "app"
      });
    }
  }

  // 详情返回：title 永远是作品名；有分集就标 tv + episodeItems
  var mt = episodeItems.length > 0 ? "tv" : "movie";
  return {
    id: "jp:" + p.id + (isShort ? "@67" : ""),
    type: "url",
    title: showTitle,
    name: showTitle,
    coverUrl: cover,
    posterPath: cover,
    backdropPath: cover,
    description: desc,
    mediaType: mt,
    link: "jp:" + p.id + (isShort ? "@67" : ""),
    releaseDate: t(data.year || ""),
    episodeItems: episodeItems,
    videoUrl: "",
    playerType: "app"
  };
}

async function loadResource(params) {
  params = params || {};
  var raw = t(params.link || params.id || "");
  if (!raw) return [];

  // jp:575550#3 或 jp:54291@67#0
  var vid = "";
  var tid = "";
  var epIdx = 0;
  var s = raw.replace(/^jp:/, "");
  if (s.indexOf("#") >= 0) {
    var parts = s.split("#");
    s = parts[0];
    epIdx = Number(parts[1]) || 0;
  }
  if (s.indexOf("@") >= 0) {
    var p2 = s.split("@");
    vid = t(p2[0]);
    tid = t(p2[1]);
  } else {
    vid = t(s);
  }
  // 兼容旧 jpplay:
  if (raw.indexOf("jpplay:") === 0) {
    var body = raw.slice(7);
    if (/^https?:\/\//i.test(body)) {
      return [
        {
          name: "荐片",
          url: body,
          playerType: "app",
          customHeaders: {
            "User-Agent": UA,
            Referer: "https://api.ztcgi.com/",
            "X-Forward-Skip-Redirect-Probe": "1"
          }
        }
      ];
    }
    var m = body.match(/^(\d+)@(\d+):(\d+)/);
    if (m) {
      vid = m[1];
      tid = m[2];
      epIdx = Number(m[3]) || 0;
    }
  }
  if (!vid) return [];

  var isShort = tid === "67";
  var path = isShort
    ? "/api/detail?vid=" + encodeURIComponent(vid)
    : "/api/video/detailv2?id=" + encodeURIComponent(vid);
  var res = await apiGet(path);
  var data = (res && res.data) || {};
  var streams = [];

  if (isShort) {
    var pl = data.playlist || [];
    var ep = pl[epIdx] || pl[0];
    if (ep && ep.url) {
      streams.push({ name: "默认", url: t(ep.url) });
    }
  } else {
    var sources = data.source_list_source || [];
    for (var i = 0; i < sources.length; i++) {
      var list = sources[i].source_list || [];
      var e = list[epIdx] || list[0];
      if (e && e.url) {
        streams.push({
          name: renameSource(sources[i].name),
          url: t(e.url)
        });
      }
    }
  }

  return streams.map(function (x) {
    return {
      name: x.name,
      description: x.name,
      url: x.url,
      playerType: "app",
      customHeaders: {
        "User-Agent": UA,
        Referer: "https://api.ztcgi.com/",
        "X-Forward-Skip-Redirect-Probe": "1"
      }
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
