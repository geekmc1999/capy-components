/**
 * 韩剧巴士 ForwardWidget v1.1.0
 * 站点: https://www.hanju84.cc
 * 作者: 宝宝巴士 | t.me/nostremby
 * 分类各自独立模块
 */
WidgetMetadata = {
  id: "forward.hanju84.tut",
  title: "韩剧巴士",
  version: "1.1.0",
  requiredVersion: "0.0.1",
  description: "韩剧巴士 · 韩剧/电影/综艺/动漫/短剧/搜索 | 宝宝巴士乐园",
  author: "宝宝巴士 | t.me/nostremby",
  site: "https://t.me/nostremby",
  logo: "https://www.hanju84.cc/favicon.ico",
  detailCacheDuration: 180,
  modules: [
    {
      id: "home",
      title: "首页推荐",
      functionName: "loadHome",
      cacheDuration: 600,
      params: [{ name: "page", title: "页码", type: "page" }]
    },
    {
      id: "hj",
      title: "韩剧",
      functionName: "loadHj",
      cacheDuration: 600,
      params: [
        { name: "page", title: "页码", type: "page" },
        {
          name: "sub",
          title: "子类",
          type: "enumeration",
          value: "",
          enumOptions: [
            { title: "全部", value: "" },
            { title: "韩国剧", value: "16" },
            { title: "国产剧", value: "12" },
            { title: "香港剧", value: "13" },
            { title: "日本剧", value: "15" },
            { title: "欧美剧", value: "17" },
            { title: "泰国剧", value: "19" }
          ]
        },
        {
          name: "by",
          title: "排序",
          type: "enumeration",
          value: "",
          enumOptions: [
            { title: "默认", value: "" },
            { title: "最近更新", value: "time" },
            { title: "最多播放", value: "hits" },
            { title: "最好评", value: "score" }
          ]
        }
      ]
    },
    {
      id: "movie",
      title: "韩国电影",
      functionName: "loadMovie",
      cacheDuration: 600,
      params: [
        { name: "page", title: "页码", type: "page" },
        {
          name: "sub",
          title: "类型",
          type: "enumeration",
          value: "",
          enumOptions: [
            { title: "全部", value: "" },
            { title: "剧情片", value: "10" },
            { title: "喜剧片", value: "6" },
            { title: "动作片", value: "5" },
            { title: "爱情片", value: "7" },
            { title: "恐怖片", value: "9" },
            { title: "科幻片", value: "8" },
            { title: "纪录片", value: "22" },
            { title: "动画片", value: "33" }
          ]
        },
        {
          name: "by",
          title: "排序",
          type: "enumeration",
          value: "",
          enumOptions: [
            { title: "默认", value: "" },
            { title: "最近更新", value: "time" },
            { title: "最多播放", value: "hits" },
            { title: "最好评", value: "score" }
          ]
        }
      ]
    },
    {
      id: "zy",
      title: "综艺",
      functionName: "loadZy",
      cacheDuration: 600,
      params: [
        { name: "page", title: "页码", type: "page" },
        {
          name: "sub",
          title: "子类",
          type: "enumeration",
          value: "",
          enumOptions: [
            { title: "全部", value: "" },
            { title: "日韩综艺", value: "25" },
            { title: "内地综艺", value: "23" },
            { title: "港台综艺", value: "24" },
            { title: "欧美综艺", value: "26" }
          ]
        }
      ]
    },
    {
      id: "dm",
      title: "动漫",
      functionName: "loadDm",
      cacheDuration: 600,
      params: [
        { name: "page", title: "页码", type: "page" },
        {
          name: "sub",
          title: "子类",
          type: "enumeration",
          value: "",
          enumOptions: [
            { title: "全部", value: "" },
            { title: "日韩动漫", value: "30" },
            { title: "国产动漫", value: "28" },
            { title: "欧美动漫", value: "31" }
          ]
        }
      ]
    },
    {
      id: "ll",
      title: "理论片",
      functionName: "loadLl",
      cacheDuration: 600,
      params: [{ name: "page", title: "页码", type: "page" }]
    },
    {
      id: "dj",
      title: "短剧",
      functionName: "loadDj",
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

var HOSTS = [
  "https://www.hanju84.cc",
  "https://hanju84.cc",
  "https://m.hanju84.cc"
];
var HOST = HOSTS[0];
var UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";

function t(v) {
  return String(v == null ? "" : v).trim();
}
function hdr(ref) {
  return {
    "User-Agent": UA,
    Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "zh-CN,zh;q=0.9",
    Referer: ref || HOST + "/"
  };
}
function absUrl(u) {
  u = t(u);
  if (!u || u.indexOf("data:") === 0) return "";
  if (u.indexOf("//") === 0) return "https:" + u;
  if (u.charAt(0) === "/") return HOST + u;
  if (!/^https?:\/\//i.test(u)) return HOST + "/" + u;
  return u;
}
function clean(text) {
  if (!text) return "";
  text = String(text)
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
  text = text.replace(/<[^>]+>/g, " ");
  return text.replace(/\s+/g, " ").trim();
}

async function getHtml(url) {
  var tryHosts = [HOST].concat(
    HOSTS.filter(function (h) {
      return h !== HOST;
    })
  );
  var lastErr = null;
  for (var i = 0; i < tryHosts.length; i++) {
    var h = tryHosts[i];
    var full = url;
    if (url.indexOf("http") !== 0) full = h + (url.charAt(0) === "/" ? url : "/" + url);
    else full = url.replace(/^https?:\/\/[^/]+/, h);
    try {
      var res = await Widget.http.get(full, { headers: hdr(h + "/") });
      var html = "";
      if (typeof res === "string") html = res;
      else if (res && typeof res.data === "string") html = res.data;
      else if (res && res.data != null) html = String(res.data);
      if (html && html.length > 400) {
        HOST = h;
        return html;
      }
    } catch (e) {
      lastErr = e;
    }
  }
  if (lastErr) throw lastErr;
  return "";
}

function showUrl(tid, by, page) {
  var f = ["", "", "", "", "", "", "", "", "", "", "", ""];
  f[0] = String(tid || "");
  f[2] = by || "";
  f[8] = page && Number(page) > 1 ? String(page) : "";
  return HOST + "/show-" + f.join("-") + ".html";
}
function searchUrl(wd, page) {
  var f = ["", "", "", "", "", "", "", "", "", "", "", "", "", ""];
  f[0] = encodeURIComponent(wd);
  f[10] = page && Number(page) > 1 ? String(page) : "";
  return HOST + "/s-" + f.join("-") + ".html";
}

function pickCover(block) {
  var s = String(block || "");
  var m =
    /data-bg=["']([^"']+)["']/.exec(s) ||
    /data-original=["']([^"']+)["']/.exec(s) ||
    /data-src=["']([^"']+)["']/.exec(s) ||
    /<img[^>]+src=["']([^"']+)["']/.exec(s);
  if (!m) return "";
  return absUrl(m[1]);
}

function parseList(html) {
  var vods = [];
  var seen = {};
  html = String(html || "");
  var blocks =
    html.match(/<div[^>]*class="[^"]*cover_box[^"]*"[^>]*>[\s\S]{0,1000}?<\/h6>/gi) || [];
  for (var i = 0; i < blocks.length; i++) {
    var blk = blocks[i];
    var vm = /href="\/v-(\d+)\.html"/.exec(blk);
    if (!vm) continue;
    var vid = vm[1];
    if (seen[vid]) continue;
    var tm = /class="[^"]*title[^"]*"[^>]*>([\s\S]*?)<\/a>/.exec(blk);
    var name = clean(tm ? tm[1] : "");
    if (!name) continue;
    var pic = pickCover(blk);
    var rm = /class="[^"]*label[^"]*"[^>]*>([\s\S]*?)<\/span>/.exec(blk);
    seen[vid] = 1;
    vods.push({
      id: "hj://" + vid,
      type: "url",
      title: name,
      coverUrl: pic,
      posterPath: pic,
      description: clean(rm ? rm[1] : ""),
      mediaType: "tv",
      link: "hj://" + vid
    });
  }
  if (vods.length) return vods;
  var re = /<a[^>]*class="[^"]*title[^"]*"[^>]*href="\/v-(\d+)\.html"[^>]*>([\s\S]*?)<\/a>/gi;
  var m;
  while ((m = re.exec(html))) {
    if (seen[m[1]]) continue;
    seen[m[1]] = 1;
    vods.push({
      id: "hj://" + m[1],
      type: "url",
      title: clean(m[2]),
      mediaType: "tv",
      link: "hj://" + m[1]
    });
  }
  return vods;
}

async function loadByTid(tid, params) {
  params = params || {};
  var page = Number(params.page) || 1;
  var real = t(params.sub) || String(tid);
  var by = t(params.by);
  return parseList(await getHtml(showUrl(real, by, page)));
}

async function loadHome() {
  return parseList(await getHtml(HOST + "/"));
}
async function loadHj(params) {
  return loadByTid("2", params);
}
async function loadMovie(params) {
  return loadByTid("1", params);
}
async function loadZy(params) {
  return loadByTid("3", params);
}
async function loadDm(params) {
  return loadByTid("4", params);
}
async function loadLl(params) {
  return loadByTid("20", params);
}
async function loadDj(params) {
  return loadByTid("27", params);
}

async function search(params) {
  params = params || {};
  var keyword = t(params.keyword);
  if (!keyword) return [];
  var page = Number(params.page) || 1;
  var html = await getHtml(searchUrl(keyword, page));
  return parseList(html);
}

function parseHj(link) {
  var raw = t(link).replace(/^hj:\/\//, "");
  var p = raw.split("|");
  return { id: t(p[0]).replace(/\D/g, ""), path: t(p[1] || "") };
}

function isVideo(url) {
  if (!url) return false;
  var u = url.toLowerCase().split("?")[0];
  return /\.(m3u8|mp4|flv|ts|mkv|avi)$/.test(u);
}

async function resolvePlay(pathOrUrl) {
  var pageUrl = absUrl(pathOrUrl);
  var html = await getHtml(pageUrl);
  var real = "";

  var im = /<iframe[^>]+src="([^"]+)"/i.exec(html);
  if (im) {
    var src = im[1].replace(/&amp;/g, "&");
    var q = /[?&]url=([^&"']+)/.exec(src);
    if (q) {
      try {
        real = decodeURIComponent(q[1]);
      } catch (e) {
        real = q[1];
      }
    } else if (isVideo(src)) real = src;
    else real = absUrl(src);
  }

  if (!real || real.indexOf("http") !== 0) {
    var pm = /var\s+player_\w+\s*=\s*(\{[\s\S]*?\})\s*[;<]/.exec(html);
    if (pm) {
      try {
        var data = JSON.parse(pm[1]);
        var u = data.url || "";
        var enc = Number(data.encrypt || 0);
        if (enc === 1) {
          try {
            u = decodeURIComponent(u);
          } catch (e) {}
        } else if (enc === 2) {
          try {
            u = decodeURIComponent(atob(u));
          } catch (e2) {
            try {
              u = atob(u);
            } catch (e3) {}
          }
        }
        if (u) real = u;
      } catch (e) {}
    }
  }

  if (!real) {
    var mm =
      /(https?:\/\/[^\s"'<>]+\.m3u8[^\s"'<>]*)/.exec(html) ||
      /(https?:\/\/[^\s"'<>]+\.(?:mp4|flv|ts))/.exec(html);
    if (mm) real = mm[1];
  }
  return absUrl(real);
}

async function loadDetail(link) {
  var p = parseHj(link);
  if (!p.id) return null;

  if (p.path) {
    var playUrl = await resolvePlay(p.path);
    return {
      id: "hj://" + p.id + "|" + p.path,
      type: "url",
      title: "播放",
      mediaType: "tv",
      link: "hj://" + p.id + "|" + p.path,
      videoUrl: playUrl,
      customHeaders: hdr(HOST + "/")
    };
  }

  var html = await getHtml(HOST + "/v-" + p.id + ".html");
  if (!html) return null;

  var name = "";
  var nm = /<h1[^>]*class="[^"]*title[^"]*"[^>]*>\s*<a[^>]*>([\s\S]*?)<\/a>/.exec(html);
  if (nm) name = clean(nm[1]);
  if (!name) {
    var tm = /<title>([\s\S]*?)<\/title>/.exec(html);
    if (tm) name = clean(tm[1]).split("_")[0].split("-")[0].trim();
  }
  var pic = "";
  var pm =
    /<img[^>]+src="([^"]+)"[^>]*class="[^"]*cover[^"]*"/.exec(html) ||
    /<img[^>]*class="[^"]*cover[^"]*"[^>]+src="([^"]+)"/.exec(html);
  if (pm) pic = absUrl(pm[1]);
  var remarks = "";
  var rm = /class="[^"]*label[^"]*"[^>]*>([\s\S]*?)<\/span>/.exec(html);
  if (rm) remarks = clean(rm[1]);
  var content = "";
  var cm = /class="[^"]*item[^"]*"[^>]*>\s*剧情\s*[：:]\s*<\/span>([\s\S]*?)<\/p>/.exec(html);
  if (cm) content = clean(cm[1]);

  var sources = [];
  var sm = /<ul[^>]*class="[^"]*play_from[^"]*"[^>]*>([\s\S]*?)<\/ul>/.exec(html);
  if (sm) {
    var lis = sm[1].match(/<li[^>]*>[\s\S]*?<\/li>/gi) || [];
    for (var i = 0; i < lis.length; i++) {
      sources.push(
        clean(
          lis[i].replace(/<span[^>]*class="[^"]*badge[^"]*"[^>]*>[\s\S]*?<\/span>/gi, "")
        ) || "线路"
      );
    }
  }

  var childItems = [];
  var blocks = html.match(/<ul[^>]*class="[^"]*play_list[^"]*"[^>]*>([\s\S]*?)<\/ul>/gi) || [];
  for (var bi = 0; bi < blocks.length; bi++) {
    var blk = blocks[bi];
    var eps = [];
    var er = /href="(\/p-[\d\-]+\.html)"[^>]*>([^<]*)<\/a>/gi;
    var em;
    while ((em = er.exec(blk))) {
      eps.push({ href: em[1], txt: clean(em[2]) || "播放" });
    }
    var srcName = sources[bi] || "线路" + (bi + 1);
    for (var ei = 0; ei < eps.length; ei++) {
      childItems.push({
        id: "hj://" + p.id + "|" + eps[ei].href,
        type: "url",
        title: sources.length > 1 ? srcName + " · " + eps[ei].txt : eps[ei].txt,
        mediaType: "tv",
        link: "hj://" + p.id + "|" + eps[ei].href
      });
    }
  }
  if (!childItems.length) {
    childItems.push({
      id: "hj://" + p.id + "|/p-" + p.id + "-1-1.html",
      type: "url",
      title: "正片",
      mediaType: "tv",
      link: "hj://" + p.id + "|/p-" + p.id + "-1-1.html"
    });
  }

  var videoUrl = "";
  try {
    var fp = childItems[0].link.replace(/^hj:\/\/\d+\|/, "");
    videoUrl = await resolvePlay(fp);
  } catch (e) {}

  return {
    id: "hj://" + p.id,
    type: "url",
    title: name || p.id,
    coverUrl: pic,
    posterPath: pic,
    backdropPath: pic,
    description: [remarks, content].filter(Boolean).join("\n"),
    mediaType: "tv",
    link: "hj://" + p.id,
    videoUrl: videoUrl,
    customHeaders: hdr(HOST + "/"),
    episodeItems: childItems,
    childItems: childItems
  };
}

async function loadResource(params) {
  params = params || {};
  var raw = t(params.link || params.id || params.url || "");
  if (!raw && params.item) raw = t(params.item.link || params.item.id || "");
  var p = parseHj(raw);
  if (!p.id) return [];
  var path = p.path;
  if (!path) {
    var html = await getHtml(HOST + "/v-" + p.id + ".html");
    var m = /href="(\/p-[\d\-]+\.html)"/.exec(html || "");
    path = m ? m[1] : "/p-" + p.id + "-1-1.html";
  }
  var playUrl = await resolvePlay(path);
  if (!playUrl) return [];
  return [
    {
      name: "播放",
      description: isVideo(playUrl) ? "直链" : "解析",
      url: playUrl,
      playerType: "app",
      customHeaders: hdr(HOST + "/")
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
