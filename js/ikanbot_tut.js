/**
 * 爱看机器人 ForwardWidget v1.1.0
 * 站点: https://www1.ikanbot.com
 * 作者: 宝宝巴士 | t.me/nostremby
 */
WidgetMetadata = {
  id: "forward.ikanbot.tut",
  title: "爱看机器人",
  version: "1.1.5",
  requiredVersion: "0.0.1",
  description: "爱看机器人 · 电影/剧集/动漫/综艺/搜索 | 宝宝巴士乐园",
  author: "宝宝巴士 | t.me/nostremby",
  site: "https://t.me/nostremby",
  logo: "https://www1.ikanbot.com/favicon.ico",
  detailCacheDuration: 180,
  globalParams: [
    {
      name: "imgProxy",
      title: "封面反代前缀",
      type: "input",
      value: "https://ik.bug.qzz.io/img?url=",
      description: "豆瓣图需反代。已默认 https://ik.bug.qzz.io/img?url="
    }
  ],
  modules: [
    {
      id: "home",
      title: "首页推荐",
      functionName: "loadHome",
      cacheDuration: 600,
      params: [{ name: "page", title: "页码", type: "page" }]
    },
    {
      id: "movie",
      title: "电影",
      functionName: "loadMovie",
      cacheDuration: 600,
      params: [{ name: "page", title: "页码", type: "page" }]
    },
    {
      id: "tv",
      title: "剧集",
      functionName: "loadTv",
      cacheDuration: 600,
      params: [{ name: "page", title: "页码", type: "page" }]
    },
    {
      id: "anime",
      title: "动漫",
      functionName: "loadAnime",
      cacheDuration: 600,
      params: [{ name: "page", title: "页码", type: "page" }]
    },
    {
      id: "variety",
      title: "综艺",
      functionName: "loadVariety",
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

var SITE = "https://www1.ikanbot.com";
var UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";
var _imgProxy = "https://ik.bug.qzz.io/img?url=";

function t(v) {
  return String(v == null ? "" : v).trim();
}
function applyParams(params) {
  params = params || {};
  if (params.imgProxy != null && String(params.imgProxy).length) {
    _imgProxy = t(params.imgProxy);
  }
}
function wrapCover(u) {
  u = absUrl(u);
  if (!u) return "";
  // 豆瓣防盗链：走反代
  if (/doubanio\.com/i.test(u) && _imgProxy) {
    return _imgProxy + encodeURIComponent(u);
  }
  return u;
}

function hdr(ref) {
  return {
    "User-Agent": UA,
    Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8",
    Referer: ref || SITE + "/"
  };
}

async function httpText(url, extraHeaders) {
  var h = hdr(SITE + "/");
  if (extraHeaders) {
    for (var k in extraHeaders) h[k] = extraHeaders[k];
  }
  var res = await Widget.http.get(url, { headers: h });
  if (typeof res === "string") return res;
  if (res == null) return "";
  if (typeof res.data === "string") return res.data;
  if (res.data != null && typeof res.data === "object") {
    try {
      return JSON.stringify(res.data);
    } catch (e) {
      return "";
    }
  }
  if (typeof res.body === "string") return res.body;
  return String(res.data != null ? res.data : "");
}

async function httpJson(url) {
  var text = await httpText(url, {
    Accept: "application/json, text/plain, */*",
    "X-Requested-With": "XMLHttpRequest"
  });
  text = t(text);
  if (!text) return null;
  // 有的壳包一层
  try {
    var obj = JSON.parse(text);
    return obj;
  } catch (e) {
    var m = text.match(/\{[\s\S]*\}/);
    if (m) {
      try {
        return JSON.parse(m[0]);
      } catch (e2) {}
    }
  }
  return null;
}

function absUrl(u) {
  u = t(u);
  if (!u || u.indexOf("data:") === 0) return "";
  if (u.indexOf("//") === 0) return "https:" + u;
  if (u.charAt(0) === "/") return SITE + u;
  if (!/^https?:\/\//i.test(u)) return SITE + "/" + u;
  return u;
}

function pickCover(tagOrBlock) {
  var s = String(tagOrBlock || "");
  // 1) data-src= 完整 URL（避免 svg 的 src 干扰）
  var m = /data-src\s*=\s*"([^"]+)"/i.exec(s) || /data-src\s*=\s*'([^']+)'/i.exec(s);
  if (m) {
    var u = t(m[1]);
    if (u && u.indexOf("data:") !== 0) return wrapCover(u);
  }
  m = /data-original\s*=\s*"([^"]+)"/i.exec(s) || /data-original\s*=\s*'([^']+)'/i.exec(s);
  if (m) {
    var u2 = t(m[1]);
    if (u2 && u2.indexOf("data:") !== 0) return wrapCover(u2);
  }
  // 2) 任意 http 图片
  var all = s.match(/https?:\/\/[^"'\s<>]+\.(?:jpg|jpeg|png|webp|gif)[^"'\s<>]*/gi) || [];
  for (var i = 0; i < all.length; i++) {
    var u3 = t(all[i]);
    if (u3) return wrapCover(u3);
  }
  return "";
}

function getTks(currentId, eToken) {
  var substr = String(currentId).slice(-4);
  var token = "";
  var remaining = String(eToken || "");
  for (var i = 0; i < substr.length; i++) {
    var ch = substr.charAt(i);
    var n = parseInt(ch, 10);
    if (isNaN(n)) n = 0;
    var pos = (n % 3) + 1;
    if (pos + 8 > remaining.length) break;
    token += remaining.slice(pos, pos + 8);
    remaining = remaining.slice(pos + 8);
  }
  return token;
}

function extractList(html) {
  var result = [];
  var seen = {};
  html = String(html || "");

  // 主结构: a.item
  var re = /<a[^>]*class="[^"]*item[^"]*"[^>]*href="(\/play\/\d+)"[^>]*>([\s\S]*?)<\/a>/gi;
  var m;
  while ((m = re.exec(html))) {
    var href = m[1];
    var vid = (href.match(/\/play\/(\d+)/) || [])[1];
    if (!vid || seen[vid]) continue;
    seen[vid] = 1;
    var inner = m[2];
    var tm = /<p[^>]*>([^<]+)<\/p>/.exec(inner);
    var title = tm ? t(tm[1]) : "";
    var pic = pickCover(inner);
    if (!title) continue;
    result.push({
      id: "ik://" + vid,
      type: "url",
      title: title,
      coverUrl: pic,
      posterPath: pic,
      backdropPath: pic,
      mediaType: "tv",
      link: "ik://" + vid
    });
  }
  if (result.length) return result;

  // 搜索 media 卡片
  var cards = html.split(/<div[^>]*class="[^"]*media[^"]*"[^>]*>/i);
  for (var i = 1; i < cards.length; i++) {
    var card = cards[i].slice(0, 1200);
    var hm = /href="(\/play\/\d+)"/.exec(card);
    if (!hm) continue;
    var vid2 = (hm[1].match(/\/play\/(\d+)/) || [])[1];
    if (!vid2 || seen[vid2]) continue;
    seen[vid2] = 1;
    var title2 = "";
    var t2 =
      /class="[^"]*media-heading[^"]*"[^>]*>([\s\S]*?)<\//i.exec(card) ||
      /class="[^"]*media-body[^"]*"[^>]*>[\s\S]*?<a[^>]*>([^<]+)<\/a>/i.exec(card);
    if (t2) title2 = t(t2[1].replace(/<[^>]+>/g, ""));
    var pic2 = pickCover(card);
    result.push({
      id: "ik://" + vid2,
      type: "url",
      title: title2 || vid2,
      coverUrl: pic2,
      posterPath: pic2,
      mediaType: "tv",
      link: "ik://" + vid2
    });
  }
  return result;
}

function hotUrl(kind, page) {
  page = Number(page) || 1;
  var enc = "%E7%83%AD%E9%97%A8";
  if (page <= 1) return SITE + "/hot/index-" + kind + "-" + enc + ".html";
  return SITE + "/hot/index-" + kind + "-" + enc + "-p-" + page + ".html";
}

function catUrl(tid, page) {
  page = Number(page) || 1;
  var url = SITE + "/category/" + tid;
  if (page > 1) url += "?p=" + page;
  return url;
}

async function loadHome(params) {
  applyParams(params);
  return extractList(await httpText(SITE + "/"));
}
async function loadMovie(params) {
  applyParams(params);
  return extractList(await httpText(hotUrl("movie", (params && params.page) || 1)));
}
async function loadTv(params) {
  applyParams(params);
  return extractList(await httpText(hotUrl("tv", (params && params.page) || 1)));
}
async function loadAnime(params) {
  applyParams(params);
  return extractList(await httpText(catUrl("18", (params && params.page) || 1)));
}
async function loadVariety(params) {
  applyParams(params);
  return extractList(await httpText(catUrl("19", (params && params.page) || 1)));
}

async function search(params) {
  applyParams(params);
  params = params || {};
  var keyword = t(params.keyword);
  if (!keyword) return [];
  var page = Number(params.page) || 1;
  var url = SITE + "/search?q=" + encodeURIComponent(keyword);
  if (page > 1) url += "&page=" + page;
  return extractList(await httpText(url));
}

function parseIk(link) {
  var raw = t(link).replace(/^ik:\/\//, "");
  var p = raw.split("|");
  return { id: t(p[0]), line: t(p[1] || ""), ep: t(p[2] || "") };
}

async function fetchLines(vid) {
  var html = await httpText(SITE + "/play/" + vid);
  var title = "";
  var tm = /<title>([^<]+)</.exec(html);
  if (tm) title = t(tm[1]).replace(/\s*[-–—|].*$/, "").trim();
  var pic = pickCover(html);
  if (!pic) {
    var pm = /(https?:\/\/[^"'\s]+(?:doubanio|akamai|cdn)[^"'\s]+\.(?:jpg|png|webp))/i.exec(
      html
    );
    if (pm) pic = absUrl(pm[1]);
  }
  var desc = "";
  var dm = /(?:描述|简介|剧情)[^<]{0,10}<[^>]*>([^<]{15,})/.exec(html);
  if (dm) desc = t(dm[1]);

  var etM = /id="e_token"\s+value="([^"]+)"/.exec(html);
  var lines = [];
  if (etM) {
    var token = getTks(String(vid), etM[1]);
    if (token) {
      var api =
        SITE +
        "/api/getResN?videoId=" +
        encodeURIComponent(vid) +
        "&mtype=1&token=" +
        encodeURIComponent(token);
      var obj = await httpJson(api);
      var list =
        (obj && obj.data && obj.data.list) ||
        (obj && obj.list) ||
        [];
      for (var i = 0; i < list.length; i++) {
        var line = list[i] || {};
        var resData = [];
        try {
          resData =
            typeof line.resData === "string"
              ? JSON.parse(line.resData || "[]")
              : line.resData || [];
        } catch (e) {
          resData = [];
        }
        if (!Array.isArray(resData) || !resData.length) continue;

        // 接口真实结构：resData=[{flag:"jsm3u8", url:"第01集$u1#第02集$u2#..."}]
        for (var j = 0; j < resData.length; j++) {
          var ep = resData[j] || {};
          var lineName =
            t(line.name) ||
            t(ep.flag) ||
            t(ep.newName) ||
            "线路" + (i + 1);
          var rawUrl = t(ep.url || "");
          var episodes = [];

          // 多集：第01集$url#第02集$url
          if (rawUrl.indexOf("#") >= 0 || /第\d+集\$/.test(rawUrl)) {
            var segs = rawUrl.split("#");
            for (var s = 0; s < segs.length; s++) {
              var seg = t(segs[s]);
              if (!seg) continue;
              var sp = seg.split("$");
              var epName = sp.length >= 2 ? t(sp[0]) : "第" + (s + 1) + "集";
              var playUrl = sp.length >= 2 ? t(sp[sp.length - 1]) : seg;
              if (!epName || /m3u8|mp4/i.test(epName)) {
                epName = "第" + (s + 1) + "集";
              }
              if (playUrl && /^https?:\/\//i.test(playUrl)) {
                episodes.push({ name: epName, url: playUrl });
              }
            }
          } else if (rawUrl.indexOf("$") >= 0) {
            var sp2 = rawUrl.split("$");
            var n2 = t(sp2[0]);
            var u2 = t(sp2[sp2.length - 1]);
            if (u2 && /^https?:\/\//i.test(u2)) {
              episodes.push({
                name: n2 && !/m3u8/i.test(n2) ? n2 : "正片",
                url: u2
              });
            }
          } else if (rawUrl && /^https?:\/\//i.test(rawUrl)) {
            episodes.push({ name: "正片", url: rawUrl });
          }

          if (episodes.length) {
            lines.push({ name: lineName, episodes: episodes });
          }
        }
      }
    }
  }
  return { title: title, pic: pic, desc: desc, lines: lines };
}

async function loadDetail(link) {
  applyParams({});
  var p = parseIk(link);
  if (!p.id) return null;
  var data = await fetchLines(p.id);
  var childItems = [];
  for (var li = 0; li < data.lines.length; li++) {
    var line = data.lines[li];
    var lineName = t(line.name) || ("线路" + (li + 1));
    for (var ei = 0; ei < line.episodes.length; ei++) {
      var ep = line.episodes[ei];
      // 集名只用「第N集」；线路用 season 分组（App：线路一排 + 集数一排）
      var epTitle = t(ep.name) || ("第" + (ei + 1) + "集");
      childItems.push({
        id: "ik://" + p.id + "|" + li + "|" + ei,
        type: "url",
        title: epTitle,
        name: epTitle,
        mediaType: "tv",
        seasonNumber: li + 1,
        seasonName: lineName,
        episodeNumber: ei + 1,
        link: "ik://" + p.id + "|" + li + "|" + ei,
        videoUrl: ep.url,
        playerType: "app"
      });
    }
  }
  var videoUrl = childItems.length ? childItems[0].videoUrl || "" : "";
  return {
    id: "ik://" + p.id,
    type: "url",
    title: data.title || p.id,
    coverUrl: data.pic,
    posterPath: data.pic,
    backdropPath: data.pic,
    description: data.desc || "",
    mediaType: "tv",
    link: "ik://" + p.id,
    videoUrl: videoUrl,
    customHeaders: hdr(SITE + "/play/" + p.id),
    episodeItems: childItems,
    childItems: childItems
  };
}

async function loadResource(params) {
  applyParams(params);
  params = params || {};
  var raw = t(params.link || params.id || params.url || "");
  if (!raw && params.item) raw = t(params.item.link || params.item.id || "");
  var p = parseIk(raw);
  if (!p.id) return [];

  var data = await fetchLines(p.id);
  var out = [];
  var hdrs = hdr(SITE + "/");

  // 指定线路+集
  if (p.line !== "" && p.ep !== "") {
    var li = parseInt(p.line, 10) || 0;
    var ei = parseInt(p.ep, 10) || 0;
    var line = data.lines[li];
    if (line && line.episodes[ei]) {
      return [
        {
          name: line.name + " · " + line.episodes[ei].name,
          description: "HLS",
          url: line.episodes[ei].url,
          playerType: "app",
          customHeaders: hdrs
        }
      ];
    }
  }

  for (var i = 0; i < data.lines.length; i++) {
    var ln = data.lines[i];
    for (var j = 0; j < ln.episodes.length; j++) {
      out.push({
        name:
          data.lines.length > 1
            ? ln.name + " · " + ln.episodes[j].name
            : ln.episodes[j].name,
        description: "HLS",
        url: ln.episodes[j].url,
        playerType: "app",
        customHeaders: hdrs
      });
    }
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
