/**
 * 黄果 ForwardWidget v1.5
 * API: https://huangguoai.com
 * 封面解密: https://huangguo.wulii.de5.net
 * 各分类独立模块，首页直接点选，无需在枚举里切换
 */
WidgetMetadata = {
  id: "forward.huangguoai.tut",
  title: "黄果",
  version: "1.5.1",
  requiredVersion: "0.0.1",
  description: "黄果短剧 | 宝宝巴士乐园 t.me/nostremby",
  author: "宝宝巴士",
  site: "https://t.me/nostremby",
  detailCacheDuration: 180,
  globalParams: [
    {
      name: "apiBase",
      title: "API 地址",
      type: "input",
      value: "https://huangguoai.com"
    },
    {
      name: "coverProxy",
      title: "封面解密代理",
      type: "input",
      value: "https://huangguo.wulii.de5.net"
    },
    {
      name: "coverToken",
      title: "封面代理 Token",
      type: "input",
      value: "hg8f3a2c91b7e04d6a"
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
      id: "new",
      title: "最新",
      functionName: "loadNew",
      cacheDuration: 300,
      params: [{ name: "page", title: "页码", type: "page" }]
    },
    {
      id: "rank",
      title: "排行榜",
      functionName: "loadRank",
      cacheDuration: 300,
      params: [{ name: "page", title: "页码", type: "page" }]
    },
    {
      id: "ai_huanlian",
      title: "AI换脸",
      functionName: "loadAiHuanlian",
      cacheDuration: 300,
      params: [{ name: "page", title: "页码", type: "page" }]
    },
    {
      id: "ai_mogai",
      title: "AI魔改",
      functionName: "loadAiMogai",
      cacheDuration: 300,
      params: [{ name: "page", title: "页码", type: "page" }]
    },
    {
      id: "duanju",
      title: "短剧",
      functionName: "loadDuanju",
      cacheDuration: 300,
      params: [{ name: "page", title: "页码", type: "page" }]
    },
    {
      id: "manju",
      title: "漫剧",
      functionName: "loadManju",
      cacheDuration: 300,
      params: [{ name: "page", title: "页码", type: "page" }]
    },
    {
      id: "dushi",
      title: "都市",
      functionName: "loadDushi",
      cacheDuration: 300,
      params: [{ name: "page", title: "页码", type: "page" }]
    },
    {
      id: "xiandai",
      title: "现代",
      functionName: "loadXiandai",
      cacheDuration: 300,
      params: [{ name: "page", title: "页码", type: "page" }]
    },
    {
      id: "xiaoyuan",
      title: "校园",
      functionName: "loadXiaoyuan",
      cacheDuration: 300,
      params: [{ name: "page", title: "页码", type: "page" }]
    },
    {
      id: "xiangcun",
      title: "乡村",
      functionName: "loadXiangcun",
      cacheDuration: 300,
      params: [{ name: "page", title: "页码", type: "page" }]
    },
    {
      id: "gufeng",
      title: "古风",
      functionName: "loadGufeng",
      cacheDuration: 300,
      params: [{ name: "page", title: "页码", type: "page" }]
    },
    {
      id: "chuanyue",
      title: "穿越",
      functionName: "loadChuanyue",
      cacheDuration: 300,
      params: [{ name: "page", title: "页码", type: "page" }]
    },
    {
      id: "chongsheng",
      title: "重生",
      functionName: "loadChongsheng",
      cacheDuration: 300,
      params: [{ name: "page", title: "页码", type: "page" }]
    },
    {
      id: "xitong",
      title: "系统",
      functionName: "loadXitong",
      cacheDuration: 300,
      params: [{ name: "page", title: "页码", type: "page" }]
    },
    {
      id: "xiuxian",
      title: "修仙",
      functionName: "loadXiuxian",
      cacheDuration: 300,
      params: [{ name: "page", title: "页码", type: "page" }]
    },
    {
      id: "hougong",
      title: "后宫",
      functionName: "loadHougong",
      cacheDuration: 300,
      params: [{ name: "page", title: "页码", type: "page" }]
    },
    {
      id: "zhuixu",
      title: "赘婿",
      functionName: "loadZhuixu",
      cacheDuration: 300,
      params: [{ name: "page", title: "页码", type: "page" }]
    },
    {
      id: "nixi",
      title: "逆袭",
      functionName: "loadNixi",
      cacheDuration: 300,
      params: [{ name: "page", title: "页码", type: "page" }]
    },
    {
      id: "bazong",
      title: "霸总",
      functionName: "loadBazong",
      cacheDuration: 300,
      params: [{ name: "page", title: "页码", type: "page" }]
    },
    {
      id: "haomen",
      title: "豪门",
      functionName: "loadHaomen",
      cacheDuration: 300,
      params: [{ name: "page", title: "页码", type: "page" }]
    },
    {
      id: "tianchong",
      title: "甜宠",
      functionName: "loadTianchong",
      cacheDuration: 300,
      params: [{ name: "page", title: "页码", type: "page" }]
    },
    {
      id: "nuelian",
      title: "虐恋",
      functionName: "loadNuelian",
      cacheDuration: 300,
      params: [{ name: "page", title: "页码", type: "page" }]
    },
    {
      id: "shunv",
      title: "熟女",
      functionName: "loadShunv",
      cacheDuration: 300,
      params: [{ name: "page", title: "页码", type: "page" }]
    },
    {
      id: "luanlun",
      title: "乱伦",
      functionName: "loadLuanlun",
      cacheDuration: 300,
      params: [{ name: "page", title: "页码", type: "page" }]
    },
    {
      id: "muzi",
      title: "母子",
      functionName: "loadMuzi",
      cacheDuration: 300,
      params: [{ name: "page", title: "页码", type: "page" }]
    },
    {
      id: "renqi",
      title: "人妻",
      functionName: "loadRenqi",
      cacheDuration: 300,
      params: [{ name: "page", title: "页码", type: "page" }]
    },
    {
      id: "juru",
      title: "巨乳",
      functionName: "loadJuru",
      cacheDuration: 300,
      params: [{ name: "page", title: "页码", type: "page" }]
    },
    {
      id: "heisi",
      title: "黑丝",
      functionName: "loadHeisi",
      cacheDuration: 300,
      params: [{ name: "page", title: "页码", type: "page" }]
    },
    {
      id: "bangongshi",
      title: "办公室",
      functionName: "loadBangongshi",
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

function t(v) {
  return String(v == null ? "" : v).trim();
}

function cfg(params) {
  params = params || {};
  return {
    apiBase: t(params.apiBase || "https://huangguoai.com").replace(/\/+$/, ""),
    coverProxy: t(params.coverProxy || "https://huangguo.wulii.de5.net").replace(
      /\/+$/,
      ""
    ),
    coverToken: t(params.coverToken || "hg8f3a2c91b7e04d6a")
  };
}

function qs(obj) {
  var parts = [];
  Object.keys(obj || {}).forEach(function (k) {
    if (obj[k] == null || obj[k] === "") return;
    parts.push(encodeURIComponent(k) + "=" + encodeURIComponent(String(obj[k])));
  });
  return parts.length ? "?" + parts.join("&") : "";
}

async function httpJson(url) {
  var res = await Widget.http.get(url, {
    headers: {
      Accept: "application/json, text/plain, */*",
      "User-Agent":
        "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15",
      Referer: "https://huangguoai.com/"
    }
  });
  var d = res && res.data;
  if (typeof d === "string") {
    try {
      d = JSON.parse(d);
    } catch (e) {}
  }
  return d;
}

function absCover(base, cover) {
  cover = t(cover);
  if (!cover) return "";
  if (/^https?:\/\//i.test(cover)) return cover;
  if (cover.indexOf("//") === 0) return "https:" + cover;
  return base + (cover[0] === "/" ? "" : "/") + cover;
}

function proxiedCover(c, encUrl) {
  encUrl = t(encUrl);
  if (!encUrl) return "";
  // 封面 CDN 为 AES 密文，必须走解密代理，否则 App 无法显示
  if (!c.coverProxy) return encUrl;
  var base = c.coverProxy.replace(/\/+$/, "");
  var q = { url: encUrl };
  if (c.coverToken) q.token = c.coverToken;
  return base + "/" + qs(q); // https://host/?url=...&token=...
}

function toItem(c, it) {
  if (!it) return null;
  var id = t(
    it.id != null ? it.id : it.video_id != null ? it.video_id : it.vod_id
  );
  if (!id) return null;
  var title = t(it.title || it.vod_name || it.name);
  var enc = absCover(c.apiBase, it.cover || it.vod_pic || it.pic || "");
  var cover = proxiedCover(c, enc);
  var ep = it.episode_count || it.total_episodes || "";
  var remark = "";
  if (it.is_finished) remark = "全" + (ep || "") + "集";
  else if (ep) remark = "更新至" + ep + "集";
  return {
    id: "hgai:" + id,
    type: "url",
    title: title || id,
    coverUrl: cover,
    posterPath: cover,
    backdropPath: cover,
    description: remark,
    mediaType: "tv",
    link: "hgai:" + id
  };
}

function extractItems(data) {
  if (!data) return [];
  var d = data.data != null ? data.data : data;
  if (Array.isArray(d)) return d;
  if (Array.isArray(d.items)) return d.items;
  if (Array.isArray(d.list)) return d.list;
  if (Array.isArray(d.results)) return d.results;
  return [];
}

async function fetchBySearch(c, keyword, page, strictTag) {
  keyword = t(keyword);
  page = Number(page || 1) || 1;
  var collected = [];
  var seen = {};
  var maxPage = strictTag ? page + 2 : page;
  for (var p = page; p <= maxPage; p++) {
    var data = await httpJson(
      c.apiBase + "/api/search" + qs({ q: keyword, page: p })
    );
    var batch = extractItems(data);
    if (!batch.length) break;
    for (var i = 0; i < batch.length; i++) {
      var it = batch[i];
      var id = t(it.id != null ? it.id : it.video_id);
      if (!id || seen[id]) continue;
      if (strictTag) {
        var tags = it.tags || [];
        var hit = false;
        if (Array.isArray(tags)) {
          for (var j = 0; j < tags.length; j++) {
            if (String(tags[j]) === keyword) {
              hit = true;
              break;
            }
          }
        }
        var title = t(it.title || "");
        if (!hit && title.indexOf(keyword) === 0) hit = true;
        if (!hit) continue;
      }
      seen[id] = 1;
      collected.push(it);
    }
    if (collected.length >= 24) break;
  }
  return collected.slice(0, 24);
}

async function fetchList(c, tid, page) {
  page = Number(page || 1) || 1;
  tid = t(tid) || "hot";
  var items = [];

  if (tid === "rank" || tid === "ranks") {
    try {
      var rank = await httpJson(
        c.apiBase + "/api/ranks/hot" + qs({ page: page })
      );
      items = extractItems(rank);
    } catch (e) {}
  }

  if (!items.length && (tid.indexOf("kw:") === 0 || tid.indexOf("tag:") === 0)) {
    var kw = tid.indexOf("kw:") === 0 ? tid.slice(3) : tid.slice(4);
    items = await fetchBySearch(c, kw, page, true);
  }

  if (!items.length && tid !== "hot" && tid !== "new" && tid !== "rank") {
    var q = tid;
    if (q && q !== "hot" && q !== "new") {
      items = await fetchBySearch(c, q, page, true);
    }
  }

  if (!items.length) {
    var sort = tid === "new" ? "new" : "hot";
    var data = await httpJson(
      c.apiBase + "/api/videos" + qs({ page: page, page_size: 24, sort: sort })
    );
    items = extractItems(data);
  }

  var out = [];
  for (var i = 0; i < items.length; i++) {
    var item = toItem(c, items[i]);
    if (item) out.push(item);
  }
  return out;
}

async function loadByTid(params, tid) {
  params = params || {};
  return await fetchList(
    cfg(params),
    tid,
    Number(params.page || 1) || 1
  );
}

async function loadHot(params) {
  return loadByTid(params, "hot");
}
async function loadNew(params) {
  return loadByTid(params, "new");
}
async function loadRank(params) {
  return loadByTid(params, "rank");
}
async function loadAiHuanlian(params) {
  return loadByTid(params, "kw:AI换脸");
}
async function loadAiMogai(params) {
  return loadByTid(params, "kw:AI魔改");
}
async function loadDuanju(params) {
  return loadByTid(params, "kw:短剧");
}
async function loadManju(params) {
  return loadByTid(params, "kw:漫剧");
}
async function loadDushi(params) {
  return loadByTid(params, "kw:都市");
}
async function loadXiandai(params) {
  return loadByTid(params, "kw:现代");
}
async function loadXiaoyuan(params) {
  return loadByTid(params, "kw:校园");
}
async function loadXiangcun(params) {
  return loadByTid(params, "kw:乡村");
}
async function loadGufeng(params) {
  return loadByTid(params, "kw:古风");
}
async function loadChuanyue(params) {
  return loadByTid(params, "kw:穿越");
}
async function loadChongsheng(params) {
  return loadByTid(params, "kw:重生");
}
async function loadXitong(params) {
  return loadByTid(params, "kw:系统");
}
async function loadXiuxian(params) {
  return loadByTid(params, "kw:修仙");
}
async function loadHougong(params) {
  return loadByTid(params, "kw:后宫");
}
async function loadZhuixu(params) {
  return loadByTid(params, "kw:赘婿");
}
async function loadNixi(params) {
  return loadByTid(params, "kw:逆袭");
}
async function loadBazong(params) {
  return loadByTid(params, "kw:霸总");
}
async function loadHaomen(params) {
  return loadByTid(params, "kw:豪门");
}
async function loadTianchong(params) {
  return loadByTid(params, "kw:甜宠");
}
async function loadNuelian(params) {
  return loadByTid(params, "kw:虐恋");
}
async function loadShunv(params) {
  return loadByTid(params, "kw:熟女");
}
async function loadLuanlun(params) {
  return loadByTid(params, "kw:乱伦");
}
async function loadMuzi(params) {
  return loadByTid(params, "kw:母子");
}
async function loadRenqi(params) {
  return loadByTid(params, "kw:人妻");
}
async function loadJuru(params) {
  return loadByTid(params, "kw:巨乳");
}
async function loadHeisi(params) {
  return loadByTid(params, "kw:黑丝");
}
async function loadBangongshi(params) {
  return loadByTid(params, "kw:办公室");
}

async function search(params) {
  params = params || {};
  var c = cfg(params);
  var kw = t(params.keyword);
  if (!kw) return [];
  var page = Number(params.page || 1) || 1;
  var items = await fetchBySearch(c, kw, page, false);
  var out = [];
  for (var i = 0; i < items.length; i++) {
    var item = toItem(c, items[i]);
    if (item) out.push(item);
  }
  return out;
}

function parseLink(link) {
  var s = t(link).replace(/^huangguoai:/, "hgai:");
  if (s.indexOf("hgai:") === 0) s = s.slice(5);
  var parts = s.split(":");
  return { id: t(parts[0]), ep: t(parts[1] || "") };
}

async function loadDetail(link) {
  var p = parseLink(link);
  if (!p.id) return null;
  var c = cfg({});
  var data = await httpJson(
    c.apiBase + "/api/videos/" + encodeURIComponent(p.id)
  );
  var d = (data && data.data) || {};
  var enc = absCover(c.apiBase, d.cover || "");
  var cover = proxiedCover(c, enc);
  var eps = Array.isArray(d.episodes) ? d.episodes : [];
  var episodeItems = [];
  if (eps.length) {
    for (var i = 0; i < eps.length; i++) {
      var ep = eps[i];
      var n = ep.ep_num || ep.episode || i + 1;
      var epLink = "hgai:" + p.id + ":" + n;
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
  } else {
    episodeItems.push({
      id: "hgai:" + p.id + ":1",
      type: "url",
      title: "第1集",
      mediaType: "tv",
      seasonNumber: 1,
      episodeNumber: 1,
      link: "hgai:" + p.id + ":1",
      videoUrl: "",
      playerType: "app"
    });
  }
  return {
    id: "hgai:" + p.id,
    type: "url",
    title: t(d.title || p.id),
    coverUrl: cover,
    posterPath: cover,
    backdropPath: cover,
    description: t(d.description || ""),
    mediaType: "tv",
    link: "hgai:" + p.id,
    episodeItems: episodeItems
  };
}

async function loadResource(params) {
  params = params || {};
  var c = cfg(params);
  var p = parseLink(t(params.link || params.id || ""));
  if (!p.id) return [];
  var ep = p.ep || t(params.episode) || "1";
  var data = await httpJson(
    c.apiBase +
      "/api/videos/" +
      encodeURIComponent(p.id) +
      "/play" +
      qs({ ep: ep })
  );
  var url = t(
    (data && data.data && data.data.video_url) ||
      (data && data.video_url) ||
      ""
  );
  if (!url) return [];
  return [
    {
      name: "黄果",
      description: "第" + ep + "集",
      url: url,
      playerType: "app",
      customHeaders: {
        "User-Agent":
          "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15",
        Referer: "https://huangguoai.com/",
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
