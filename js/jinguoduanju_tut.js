/**
 * 禁果短剧 ForwardWidget
 * 站点: https://jinguoduanju.app
 * 分类：navigationId（官方剧场导航）+ 本地 tags 过滤
 * 宣传: https://t.me/nostremby
 */
WidgetMetadata = {
  id: "forward.jinguoduanju.tut",
  title: "禁果短剧",
  version: "1.1.0",
  requiredVersion: "0.0.1",
  description: "禁果短剧：热度/最新/官方导航分类/标签/搜索/分集播放 | 宝宝巴士乐园 t.me/nostremby",
  author: "宝宝巴士",
  site: "https://t.me/nostremby",
  detailCacheDuration: 180,
  globalParams: [
    {
      name: "apiBase",
      title: "API 地址",
      type: "input",
      value: "https://jinguoduanju.app"
    }
  ],
  modules: [
    { id: "heat", title: "热度", functionName: "loadHeat", cacheDuration: 300, params: [{ name: "page", title: "页码", type: "page" }] },
    { id: "latest", title: "最新", functionName: "loadLatest", cacheDuration: 300, params: [{ name: "page", title: "页码", type: "page" }] },
    { id: "landing", title: "首页推荐", functionName: "loadLanding", cacheDuration: 300, params: [{ name: "page", title: "页码", type: "page" }] },
    { id: "nav_all", title: "全部", functionName: "loadNavAll", cacheDuration: 300, params: [{ name: "page", title: "页码", type: "page" }] },
    { id: "nav_original", title: "原创精品", functionName: "loadNavOriginal", cacheDuration: 300, params: [{ name: "page", title: "页码", type: "page" }] },
    { id: "nav_single", title: "单体作品", functionName: "loadNavSingle", cacheDuration: 300, params: [{ name: "page", title: "页码", type: "page" }] },
    { id: "nav_anime", title: "动漫改编", functionName: "loadNavAnime", cacheDuration: 300, params: [{ name: "page", title: "页码", type: "page" }] },
    { id: "nav_movie", title: "影视改编", functionName: "loadNavMovie", cacheDuration: 300, params: [{ name: "page", title: "页码", type: "page" }] },
    { id: "len_multi", title: "多集", functionName: "loadLenMulti", cacheDuration: 300, params: [{ name: "page", title: "页码", type: "page" }] },
    { id: "len_single", title: "单集", functionName: "loadLenSingle", cacheDuration: 300, params: [{ name: "page", title: "页码", type: "page" }] },
    { id: "tag_mogai", title: "魔改", functionName: "loadTagMogai", cacheDuration: 300, params: [{ name: "page", title: "页码", type: "page" }] },
    { id: "tag_dushi", title: "都市", functionName: "loadTagDushi", cacheDuration: 300, params: [{ name: "page", title: "页码", type: "page" }] },
    { id: "tag_zhichang", title: "职场", functionName: "loadTagZhichang", cacheDuration: 300, params: [{ name: "page", title: "页码", type: "page" }] },
    { id: "tag_qihuan", title: "奇幻", functionName: "loadTagQihuan", cacheDuration: 300, params: [{ name: "page", title: "页码", type: "page" }] },
    { id: "tag_guzhuang", title: "古装", functionName: "loadTagGuzhuang", cacheDuration: 300, params: [{ name: "page", title: "页码", type: "page" }] },
    { id: "tag_dongman", title: "动漫", functionName: "loadTagDongman", cacheDuration: 300, params: [{ name: "page", title: "页码", type: "page" }] },
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
  "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15";
var _token = "";
var _deviceId = "";
var PAGE_SIZE = 24;

function t(v) {
  return String(v == null ? "" : v).trim();
}

function cfg(params) {
  params = params || {};
  return {
    apiBase: t(params.apiBase || "https://jinguoduanju.app").replace(/\/+$/, "")
  };
}

function qs(obj) {
  var parts = [];
  Object.keys(obj || {}).forEach(function (k) {
    var v = obj[k];
    if (v == null || v === "") return;
    if (Array.isArray(v)) {
      for (var i = 0; i < v.length; i++) {
        parts.push(encodeURIComponent(k) + "=" + encodeURIComponent(String(v[i])));
      }
    } else {
      parts.push(encodeURIComponent(k) + "=" + encodeURIComponent(String(v)));
    }
  });
  return parts.length ? "?" + parts.join("&") : "";
}

function absUrl(base, u) {
  u = t(u);
  if (!u) return "";
  if (/^https?:\/\//i.test(u)) return u;
  if (u.indexOf("//") === 0) return "https:" + u;
  return base + (u.charAt(0) === "/" ? "" : "/") + u;
}

function randDevice() {
  var s = "";
  var hex = "0123456789abcdef";
  for (var i = 0; i < 32; i++) s += hex.charAt((Math.random() * 16) | 0);
  return s;
}

async function ensureToken(c) {
  if (_token) return _token;
  if (!_deviceId) _deviceId = randDevice();
  var url = c.apiBase + "/api/v1/auth/device";
  var body = {
    deviceId: "h5:" + _deviceId,
    channelCode: "",
    attributionToken: ""
  };
  var headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "User-Agent": UA,
    Referer: c.apiBase + "/",
    Origin: c.apiBase
  };
  var res = null;
  var d = null;
  if (Widget.http.post) {
    try {
      res = await Widget.http.post(url, body, { headers: headers });
      d = res && res.data;
    } catch (e) {}
  }
  if ((!d || !d.token) && Widget.http.request) {
    res = await Widget.http.request({
      url: url,
      method: "POST",
      headers: headers,
      body: JSON.stringify(body)
    });
    d = res && res.data;
  }
  if (typeof d === "string") {
    try {
      d = JSON.parse(d);
    } catch (e) {}
  }
  _token = t(d && d.token);
  if (!_token) throw new Error("设备登录失败");
  return _token;
}

async function apiGet(c, path, query, retry) {
  await ensureToken(c);
  var url = c.apiBase + "/api/v1" + path + qs(query || {});
  var headers = {
    Accept: "application/json",
    "User-Agent": UA,
    Referer: c.apiBase + "/",
    Origin: c.apiBase,
    Authorization: "Bearer " + _token
  };
  var res = await Widget.http.get(url, { headers: headers });
  var d = res && res.data;
  if (typeof d === "string") {
    try {
      d = JSON.parse(d);
    } catch (e) {}
  }
  if (d && d.status === 401 && !retry) {
    _token = "";
    return apiGet(c, path, query, true);
  }
  return d;
}

function pageSlice(arr, page) {
  page = Number(page || 1) || 1;
  if (!Array.isArray(arr)) return [];
  var start = (page - 1) * PAGE_SIZE;
  return arr.slice(start, start + PAGE_SIZE);
}

function toItem(c, it) {
  if (!it) return null;
  var id = t(it.id);
  if (!id) return null;
  var cover = absUrl(c.apiBase, it.coverUrl || it.cover || "");
  var ep = it.episodeCount || "";
  var remark = ep ? "全" + ep + "集" : "";
  var tags = Array.isArray(it.tags) ? it.tags.join(" · ") : "";
  if (tags) remark = remark ? remark + " · " + tags : tags;
  return {
    id: "jgdj:" + id,
    type: "url",
    title: t(it.title) || id,
    coverUrl: cover,
    posterPath: cover,
    backdropPath: cover,
    description: remark,
    mediaType: "tv",
    link: "jgdj:" + id
  };
}

function mapList(c, arr) {
  var out = [];
  for (var i = 0; i < (arr || []).length; i++) {
    var it = toItem(c, arr[i]);
    if (it) out.push(it);
  }
  return out;
}

/**
 * query:
 *  sort, navigationId, length
 *  _tagFilter: 本地 tags 精确匹配（服务端 tags 参数会 400）
 */
async function loadDramas(params, query) {
  params = params || {};
  var c = cfg(params);
  var page = Number(params.page || 1) || 1;
  var q = Object.assign({ sort: "latest" }, query || {});
  var tagFilter = q._tagFilter || "";
  delete q._tagFilter;
  var list = await apiGet(c, "/dramas", q);
  if (!Array.isArray(list)) list = [];
  if (tagFilter) {
    var filtered = [];
    for (var i = 0; i < list.length; i++) {
      var tags = list[i].tags || [];
      var hit = false;
      if (Array.isArray(tags)) {
        for (var j = 0; j < tags.length; j++) {
          if (String(tags[j]) === tagFilter) {
            hit = true;
            break;
          }
        }
      }
      if (hit) filtered.push(list[i]);
    }
    list = filtered;
  }
  return mapList(c, pageSlice(list, page));
}

async function loadHeat(params) {
  return loadDramas(params, { sort: "heat" });
}
async function loadLatest(params) {
  return loadDramas(params, { sort: "latest" });
}

async function loadLanding(params) {
  params = params || {};
  var c = cfg(params);
  var page = Number(params.page || 1) || 1;
  var data = await apiGet(c, "/landing");
  var list = (data && data.dramas) || [];
  return mapList(c, pageSlice(list, page));
}

// 官方剧场导航 navigationId（实测内容不同）
async function loadNavAll(params) {
  return loadDramas(params, { sort: "latest", navigationId: 2 });
}
async function loadNavOriginal(params) {
  return loadDramas(params, { sort: "latest", navigationId: 7 });
}
async function loadNavSingle(params) {
  return loadDramas(params, { sort: "latest", navigationId: 3 });
}
async function loadNavAnime(params) {
  return loadDramas(params, { sort: "latest", navigationId: 6 });
}
async function loadNavMovie(params) {
  return loadDramas(params, { sort: "latest", navigationId: 5 });
}

// 长度
async function loadLenMulti(params) {
  return loadDramas(params, { sort: "latest", length: "multi" });
}
async function loadLenSingle(params) {
  return loadDramas(params, { sort: "latest", length: "single" });
}

// 标签（本地过滤）
async function loadTagMogai(params) {
  return loadDramas(params, { sort: "latest", _tagFilter: "魔改" });
}
async function loadTagDushi(params) {
  return loadDramas(params, { sort: "latest", _tagFilter: "都市" });
}
async function loadTagZhichang(params) {
  return loadDramas(params, { sort: "latest", _tagFilter: "职场" });
}
async function loadTagQihuan(params) {
  return loadDramas(params, { sort: "latest", _tagFilter: "奇幻" });
}
async function loadTagGuzhuang(params) {
  return loadDramas(params, { sort: "latest", _tagFilter: "古装" });
}
async function loadTagDongman(params) {
  return loadDramas(params, { sort: "latest", _tagFilter: "动漫" });
}

async function search(params) {
  params = params || {};
  var c = cfg(params);
  var kw = t(params.keyword);
  if (!kw) return [];
  var page = Number(params.page || 1) || 1;
  var list = await apiGet(c, "/dramas", { sort: "latest", q: kw });
  if (!Array.isArray(list)) list = [];
  return mapList(c, pageSlice(list, page));
}

function parseLink(link) {
  var s = t(link).replace(/^jinguo:/, "jgdj:");
  if (s.indexOf("jgdj:") === 0) s = s.slice(5);
  var parts = s.split(":");
  return { id: t(parts[0]), ep: t(parts[1] || "") };
}

async function loadDetail(link) {
  var p = parseLink(link);
  if (!p.id) return null;
  var c = cfg({});
  var data = await apiGet(c, "/dramas/" + encodeURIComponent(p.id));
  var drama = (data && data.drama) || {};
  var eps = (data && data.episodes) || [];
  var cover = absUrl(c.apiBase, drama.coverUrl || "");
  var episodeItems = [];
  for (var i = 0; i < eps.length; i++) {
    var ep = eps[i];
    var n = ep.number || i + 1;
    var epLink = "jgdj:" + p.id + ":" + n + ":" + t(ep.id);
    episodeItems.push({
      id: epLink,
      type: "url",
      title: t(ep.title || "第" + n + "集"),
      mediaType: "tv",
      seasonNumber: 1,
      episodeNumber: Number(n) || i + 1,
      link: epLink,
      videoUrl: "",
      playerType: "app"
    });
  }
  if (!episodeItems.length) {
    episodeItems.push({
      id: "jgdj:" + p.id + ":1",
      type: "url",
      title: "第1集",
      mediaType: "tv",
      seasonNumber: 1,
      episodeNumber: 1,
      link: "jgdj:" + p.id + ":1",
      videoUrl: "",
      playerType: "app"
    });
  }
  var tags = Array.isArray(drama.tags) ? drama.tags.join(" · ") : "";
  return {
    id: "jgdj:" + p.id,
    type: "url",
    title: t(drama.title || p.id),
    coverUrl: cover,
    posterPath: cover,
    backdropPath: cover,
    description: t(data.description || tags || ""),
    mediaType: "tv",
    link: "jgdj:" + p.id,
    episodeItems: episodeItems
  };
}

async function resolveEpisodeId(c, dramaId, epNum) {
  var data = await apiGet(c, "/dramas/" + encodeURIComponent(dramaId));
  var eps = (data && data.episodes) || [];
  for (var i = 0; i < eps.length; i++) {
    if (String(eps[i].number) === String(epNum) || String(eps[i].id) === String(epNum)) {
      return t(eps[i].id);
    }
  }
  return eps.length ? t(eps[0].id) : "";
}

async function loadResource(params) {
  params = params || {};
  var c = cfg(params);
  var raw = t(params.link || params.id || "");
  var s = raw.replace(/^jinguo:/, "jgdj:");
  if (s.indexOf("jgdj:") === 0) s = s.slice(5);
  var parts = s.split(":");
  var dramaId = t(parts[0]);
  var epNum = t(parts[1] || "1") || "1";
  var episodeId = t(parts[2] || "");
  if (!dramaId) return [];
  if (!episodeId) {
    episodeId = await resolveEpisodeId(c, dramaId, epNum);
  }
  if (!episodeId) return [];
  var play = await apiGet(c, "/episodes/" + encodeURIComponent(episodeId) + "/play");
  var url = t((play && play.videoUrl) || "");
  if (!url) return [];
  return [
    {
      name: "禁果",
      description: "第" + epNum + "集",
      url: url,
      playerType: "app",
      customHeaders: {
        "User-Agent": UA,
        Referer: c.apiBase + "/",
        Origin: c.apiBase,
        "X-Forward-Skip-Redirect-Probe": "1"
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
