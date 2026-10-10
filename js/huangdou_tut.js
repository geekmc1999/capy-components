/**
 * 黄豆短剧 ForwardWidget v2.0.0（反代明文版）
 * 需配合 Cloudflare Worker：huangdou-worker.js
 * 作者：宝宝巴士 | t.me/nostremby
 */
WidgetMetadata = {
  id: "forward.huangdou.tut",
  title: "黄豆短剧",
  version: "2.0.2",
  requiredVersion: "0.0.1",
  description: "黄豆短剧 | 宝宝巴士乐园 t.me/nostremby",
  author: "宝宝巴士 | t.me/nostremby",
  site: "https://t.me/nostremby",
  logo: "https://tideember.cc/favicon.ico",
  detailCacheDuration: 300,
  globalParams: [
    {
      name: "proxy",
      title: "Worker 反代地址",
      type: "input",
      value: "https://hd.wulii.de5.net",
      description: "已默认 https://hd.wulii.de5.net ；可改自己的 Worker"
    }
  ],
  modules: [
    {
      id: "loadHome",
      title: "首页推荐",
      functionName: "loadHome",
      cacheDuration: 600,
      params: [{ name: "page", title: "页码", type: "page" }]
    },
    {
      id: "loadCategory",
      title: "分类",
      functionName: "loadCategory",
      cacheDuration: 600,
      params: [
        { name: "page", title: "页码", type: "page" },
        {
          name: "code",
          title: "分类",
          type: "enumeration",
          value: "all",
          enumOptions: [
            { title: "全部", value: "all" },
            { title: "黄豆原创", value: "yuandou" },
            { title: "魔改短剧", value: "mod" },
            { title: "擦边短剧", value: "caibian" },
            { title: "真人短剧", value: "zhenren" },
            { title: "动漫", value: "erciyuan" },
            { title: "影院", value: "aiman" },
            { title: "贤者", value: "zongyi" },
            { title: "黑料", value: "heiliao" }
          ]
        },
        {
          name: "order",
          title: "排序",
          type: "enumeration",
          value: "",
          enumOptions: [
            { title: "默认", value: "" },
            { title: "最新", value: "new" },
            { title: "最热", value: "hot" }
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

var _proxy = "";
var UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

function t(v) {
  return String(v == null ? "" : v).trim();
}
function applyParams(params) {
  params = params || {};
  if (t(params.proxy)) _proxy = t(params.proxy).replace(/\/$/, "");
}
function proxyBase() {
  var p = t(_proxy) || "https://hd.wulii.de5.net";
  return p.replace(/\/$/, "");
}

async function proxyGet(pathAndQuery) {
  var url = proxyBase() + pathAndQuery;
  var res = await Widget.http.get(url, {
    headers: { "User-Agent": UA, Accept: "application/json" }
  });
  return parseRes(res);
}
function parseRes(res) {
  var s = "";
  if (typeof res === "string") s = res;
  else if (res && typeof res.data === "string") s = res.data;
  else if (res && typeof res === "object" && res.status) return res;
  else if (res && typeof res.data === "object" && res.data !== null) return res.data;
  if (!s) throw new Error("反代返回为空");
  try {
    return JSON.parse(s);
  } catch (e) {
    throw new Error("反代返回非 JSON: " + s.slice(0, 80));
  }
}

function pickList(obj) {
  if (!obj) return [];
  if (Array.isArray(obj)) return obj;
  var d = obj.data != null ? obj.data : obj;
  if (Array.isArray(d)) return d;
  if (d && typeof d === "object") {
    if (Array.isArray(d.list)) return d.list;
    if (Array.isArray(d.items)) return d.items;
  }
  if (Array.isArray(obj.list)) return obj.list;
  return [];
}

function toItem(it) {
  it = it || {};
  var rawId = t(it.id || "").replace(/^rp_/, "");
  if (!rawId) rawId = t(it.drama_id || "").replace(/^up_/, "").replace(/^rp_/, "");
  var title = t(it.name || it.title || it.t || rawId);
  var cover = t(it.img_y || it.img_x || it.img || it.cover || it.pic || "");
  var remarks = t(
    it.update_label || it.corner || (it.episode_count ? "全" + it.episode_count + "集" : "")
  );
  var link = "hd://" + rawId;
  return {
    id: link,
    type: "url",
    title: title,
    coverUrl: cover,
    posterPath: cover,
    backdropPath: cover,
    description: remarks || t(it.description || ""),
    mediaType: "tv",
    link: link
  };
}

async function loadHome(params) {
  applyParams(params);
  var page = Number(params && params.page) || 1;
  var obj = await proxyGet("/list?page=" + page + "&page_size=18");
  if (obj && obj.status === "n") throw new Error(obj.error || "列表失败");
  return pickList(obj).map(toItem);
}

async function loadCategory(params) {
  applyParams(params);
  var page = Number(params && params.page) || 1;
  var code = t((params && params.code) || "all");
  var order = t((params && params.order) || "");

  if (code === "yuandou") {
    var nb = await proxyGet("/navBlock?code=yuandou&tab=recommend&page=" + page);
    var blocks = pickList(nb);
    var items = [];
    for (var i = 0; i < blocks.length; i++) {
      var b = blocks[i];
      if (b && Array.isArray(b.items)) items = items.concat(b.items);
      else if (b && (b.id || b.drama_id)) items.push(b);
    }
    if (items.length) return items.map(toItem);
  }

  var q = "/list?page=" + page + "&page_size=18";
  if (order) q += "&order=" + encodeURIComponent(order);

  if (code && code !== "all") {
    try {
      var nf = await proxyGet("/navFilter?code=" + encodeURIComponent(code));
      var tabs = pickList(nf);
      if (tabs.length && tabs[0] && tabs[0].filter) {
        var flt = tabs[0].filter;
        if (flt.cat_id) q += "&cat_id=" + encodeURIComponent(flt.cat_id);
      }
    } catch (e) {}
  }

  var obj = await proxyGet(q);
  if (obj && obj.status === "n") throw new Error(obj.error || "分类失败");
  return pickList(obj).map(toItem);
}

async function search(params) {
  applyParams(params);
  var keyword = t((params && params.keyword) || "");
  var page = Number(params && params.page) || 1;
  if (!keyword) return [];
  var obj = await proxyGet(
    "/search?keyword=" + encodeURIComponent(keyword) + "&page=" + page
  );
  if (obj && obj.status === "n") throw new Error(obj.error || "搜索失败");
  return pickList(obj).map(toItem);
}


function parseHdId(link) {
  var raw = t(link).replace(/^hd:\/\//, "").replace(/^rp_/, "").replace(/^up_/, "");
  var parts = raw.split("|");
  return {
    id: t(parts[0]),
    seq: t(parts[1] || "") || ""
  };
}

async function fetchPlay(id, seq) {
  var play = await proxyGet(
    "/play?id=" + encodeURIComponent(id) + "&seq=" + encodeURIComponent(seq || "1")
  );
  if (play && play.status === "n") throw new Error(play.error || "播放地址获取失败");
  var pd = (play && play.data) || play || {};
  var urls = [];
  if (Array.isArray(pd.lines)) {
    for (var i = 0; i < pd.lines.length; i++) {
      var ln = pd.lines[i];
      if (ln && ln.url) {
        urls.push({
          name: t(ln.name || "线路" + (i + 1)),
          url: t(ln.url)
        });
      }
    }
  }
  var main = t(pd.m3u8 || pd.url || "");
  if (main && !urls.length) urls.push({ name: "播放", url: main });
  return { urls: urls, main: urls.length ? urls[0].url : main, raw: pd };
}

async function loadDetail(link) {
  applyParams({});
  var parsed = parseHdId(link);
  var id = parsed.id;
  var seqOnly = parsed.seq;
  if (!id) throw new Error("缺少剧集 id");

  // 点某一集：直接返回可播放项
  if (seqOnly) {
    var p = await fetchPlay(id, seqOnly);
    if (!p.main) throw new Error("未获取到播放地址");
    return {
      id: "hd://" + id + "|" + seqOnly,
      type: "url",
      title: "第" + seqOnly + "集",
      mediaType: "tv",
      link: "hd://" + id + "|" + seqOnly,
      videoUrl: p.main,
      urls: p.urls.map(function (u) {
        return {
          name: u.name,
          url: u.url,
          headers: {
            "User-Agent": UA,
            Referer: "https://tideember.cc/home",
            Origin: "https://tideember.cc"
          }
        };
      })
    };
  }

  var obj = await proxyGet("/detail?id=" + encodeURIComponent(id));
  if (obj && obj.status === "n") throw new Error(obj.error || "详情失败");
  var d = (obj && obj.data) || obj || {};
  if (typeof d !== "object") d = {};

  var title = t(d.name || d.title || id);
  var cover = t(d.img_y || d.img_x || d.img || d.cover || "");
  var desc = t(d.description || d.summary || "");
  var remarks = t(d.update_label || (d.episode_count ? "全" + d.episode_count + "集" : ""));

  var eps = Array.isArray(d.episodes) ? d.episodes : [];
  var count = Number(d.episode_count || d.free_episodes || eps.length || 1) || 1;
  var childItems = [];
  if (eps.length) {
    for (var i = 0; i < eps.length; i++) {
      var ep = eps[i] || {};
      var seq = String(ep.seq || ep.episode || ep.ep || i + 1);
      var epTitle = t(ep.name || ep.title || "第" + seq + "集");
      if (/^\d+$/.test(epTitle)) epTitle = "第" + epTitle + "集";
      childItems.push({
        id: "hd://" + id + "|" + seq,
        type: "url",
        title: epTitle,
        mediaType: "tv",
        link: "hd://" + id + "|" + seq
      });
    }
  } else {
    for (var n = 1; n <= count; n++) {
      childItems.push({
        id: "hd://" + id + "|" + n,
        type: "url",
        title: "第" + n + "集",
        mediaType: "tv",
        link: "hd://" + id + "|" + n
      });
    }
  }

  // 默认带上第1集播放地址，方便详情页直接播
  var videoUrl = "";
  var playUrls = [];
  try {
    var p1 = await fetchPlay(id, "1");
    videoUrl = p1.main;
    playUrls = p1.urls.map(function (u) {
      return {
        name: u.name,
        url: u.url,
        headers: {
          "User-Agent": UA,
          Referer: "https://tideember.cc/home",
          Origin: "https://tideember.cc"
        }
      };
    });
  } catch (e) {}

  return {
    id: "hd://" + id,
    type: "url",
    title: title,
    coverUrl: cover,
    posterPath: cover,
    backdropPath: cover,
    description: [remarks, desc].filter(Boolean).join("\n"),
    mediaType: "tv",
    link: "hd://" + id,
    videoUrl: videoUrl,
    customHeaders: {
      "User-Agent": UA,
      Referer: "https://tideember.cc/home",
      Origin: "https://tideember.cc"
    },
    episodeItems: childItems,
    childItems: childItems
  };
}

async function loadResource(params) {
  applyParams(params);
  params = params || {};
  var raw =
    t(params.link || params.id || params.url || params.episodeId || params.videoUrl || "");
  if (!raw && params.item) {
    raw = t(params.item.link || params.item.id || "");
  }
  var parsed = parseHdId(raw);
  var id = parsed.id;
  var seq = parsed.seq || "1";
  if (!id) return [];

  try {
    var p = await fetchPlay(id, seq);
    if (!p.main && !(p.urls && p.urls.length)) return [];
    var hdr = {
      "User-Agent": UA,
      Referer: "https://tideember.cc/home",
      Origin: "https://tideember.cc"
    };
    // Forward 要求 loadResource 返回数组：[{ name, url, playerType, customHeaders }]
    var out = [];
    if (p.urls && p.urls.length) {
      for (var i = 0; i < p.urls.length; i++) {
        out.push({
          name: p.urls[i].name || "线路" + (i + 1),
          description: "HLS",
          url: p.urls[i].url,
          playerType: "app",
          customHeaders: hdr
        });
      }
    } else if (p.main) {
      out.push({
        name: "播放",
        description: "HLS",
        url: p.main,
        playerType: "app",
        customHeaders: hdr
      });
    }
    return out;
  } catch (e) {
    return [];
  }
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
