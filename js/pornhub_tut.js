/**
 * Pornhub ForwardWidget v3.6.0
 * - 封面：多字段提取 + 可选 CF/图片反代（防 CDN 防盗链）
 * - 搜索：视频 / 女优 / 片商频道
 */
WidgetMetadata = {
  id: "forward.pornhub.tut",
  title: "Pornhub",
  version: "3.6.2",
  requiredVersion: "0.0.1",
  description: "Pornhub 热门/最新/分类/搜索 | t.me/nostremby",
  author: "宝宝巴士 | t.me/nostremby",
  site: "https://t.me/nostremby",
  detailCacheDuration: 300,
  globalParams: [
    {
      name: "coverProxy",
      title: "封面反代前缀",
      type: "input",
      value: "https://ik.bug.qzz.io/img?url=",
      description: "CDN 图打不开时用。例 https://ik.bug.qzz.io/img?url= （Worker 需放行 phncdn）"
    }
  ],
  modules: [
    {
      id: "loadHot",
      title: "热门视频",
      functionName: "loadHot",
      cacheDuration: 600,
      params: [{ name: "page", title: "页码", type: "page" }]
    },
    {
      id: "loadNewest",
      title: "最新上传",
      functionName: "loadNewest",
      cacheDuration: 600,
      params: [{ name: "page", title: "页码", type: "page" }]
    },
    {
      id: "loadMostViewed",
      title: "最多观看",
      functionName: "loadMostViewed",
      cacheDuration: 600,
      params: [{ name: "page", title: "页码", type: "page" }]
    },
    {
      id: "loadTopRated",
      title: "最高评分",
      functionName: "loadTopRated",
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
          name: "category",
          title: "分类",
          type: "enumeration",
          value: "111",
          enumOptions: [
            { title: "日本", value: "111" },
            { title: "亚洲", value: "1" },
            { title: "业余", value: "3" },
            { title: "大屁股", value: "4" },
            { title: "巨乳", value: "8" },
            { title: "金发", value: "9" },
            { title: "棕发", value: "11" },
            { title: "口交", value: "13" },
            { title: "内射", value: "15" },
            { title: "颜射", value: "16" },
            { title: "黑人", value: "17" },
            { title: "硬核", value: "21" },
            { title: "玩具", value: "23" },
            { title: "公开", value: "24" },
            { title: "黑人白人", value: "25" },
            { title: "拉丁", value: "26" },
            { title: "女同", value: "27" },
            { title: "熟女 Mature", value: "28" },
            { title: "MILF", value: "29" },
            { title: "肛交", value: "35" },
            { title: "POV", value: "41" },
            { title: "红发", value: "42" },
            { title: "三人行", value: "65" },
            { title: "潮吹", value: "69" },
            { title: "按摩", value: "78" },
            { title: "轮奸", value: "80" },
            { title: "卡通", value: "86" },
            { title: "独家", value: "115" },
            { title: "认证业余", value: "138" },
            { title: "小胸", value: "59" },
            { title: "独奏女", value: "492" },
            { title: "60FPS", value: "105" },
            { title: "热门女性", value: "path:/popularwithwomen" },
            { title: "Teen", value: "path:/categories/teen" },
            { title: "HD", value: "path:/hd" },
            { title: "VR", value: "path:/vr" },
            { title: "Hentai", value: "path:/categories/hentai" }
          ]
        }
      ]
    },
    {
      id: "searchAll",
      title: "搜索",
      functionName: "search",
      cacheDuration: 300,
      params: [
        { name: "keyword", title: "关键词", type: "input" },
        { name: "page", title: "页码", type: "page" },
        {
          name: "stype",
          title: "类型",
          type: "enumeration",
          value: "video",
          enumOptions: [
            { title: "视频", value: "video" },
            { title: "女优/演员", value: "pornstar" },
            { title: "片商/频道", value: "channel" }
          ]
        },
        {
          name: "sort",
          title: "排序(仅视频)",
          type: "enumeration",
          value: "",
          enumOptions: [
            { title: "最相关", value: "" },
            { title: "最多观看", value: "mv" },
            { title: "最高评分", value: "tr" },
            { title: "最长", value: "lg" },
            { title: "最新", value: "mr" }
          ]
        }
      ]
    },
    {
      id: "loadResource",
      title: "加载播放资源",
      functionName: "loadResource",
      type: "stream",
      params: []
    }
  ],
  search: {
    title: "搜索",
    functionName: "search",
    params: [
      { name: "keyword", title: "关键词", type: "input" },
      { name: "page", title: "页码", type: "page" },
      {
        name: "stype",
        title: "搜索类型",
        type: "enumeration",
        value: "video",
        enumOptions: [
          { title: "视频", value: "video" },
          { title: "女优/演员", value: "pornstar" },
          { title: "片商/频道", value: "channel" }
        ]
      },
      {
        name: "sort",
        title: "排序(仅视频)",
        type: "enumeration",
        value: "",
        enumOptions: [
          { title: "最相关", value: "" },
          { title: "最多观看", value: "mv" },
          { title: "最高评分", value: "tr" },
          { title: "最长", value: "lg" },
          { title: "最新", value: "mr" }
        ]
      }
    ]
  }
};

var BASE_URL = "https://www.pornhub.com";
var UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36";
var HEADERS = {
  "User-Agent": UA,
  Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
  "Accept-Language": "en-US,en;q=0.9",
  Referer: "https://www.pornhub.com/",
  Cookie: "platform=pc; age_verified=1; accessAgeDisclaimerPH=1"
};
var _coverProxy = "https://ik.bug.qzz.io/img?url=";

function t(v) {
  return String(v == null ? "" : v).trim();
}
function applyParams(params) {
  params = params || {};
  if (params.coverProxy != null && String(params.coverProxy).length) {
    _coverProxy = t(params.coverProxy);
  }
}
function isCF(html) {
  return /Just a moment|cf-browser-verification|challenge-platform/i.test(html || "");
}
async function fetchHtml(url) {
  var res;
  try {
    res = await Widget.http.get(url, { headers: HEADERS });
  } catch (e) {
    var msg = String((e && e.message) || e || "");
    if (/404/i.test(msg)) {
      throw new Error("页面 404（地址失效或不存在）\n" + url);
    }
    if (/403|forbidden|unacceptable/i.test(msg)) {
      throw new Error("被拦截 403，需代理或稍后再试\n" + url);
    }
    throw e;
  }
  var html = res && res.data != null ? String(res.data) : "";
  // 部分壳把状态码放 data 里
  var code = res && (res.statusCode || res.status);
  if (code == 404) throw new Error("页面 404\n" + url);
  if (isCF(html)) throw new Error("Cloudflare 拦截，请稍后重试或挂代理");
  if (!html) throw new Error("页面为空\n" + url);
  if (/<title>[^<]*404|Page Not Found/i.test(html.slice(0, 2000))) {
    throw new Error("页面 404（站点返回未找到）\n" + url);
  }
  return html;
}
function extractViewkey(s) {
  var m = String(s || "").match(/viewkey=([a-zA-Z0-9]+)/i);
  return m ? m[1] : "";
}
function absUrl(u) {
  u = t(u);
  if (!u) return "";
  if (u.indexOf("//") === 0) return "https:" + u;
  if (u.charAt(0) === "/") return BASE_URL + u;
  return u;
}
function wrapCover(u) {
  u = absUrl(u);
  if (!u) return "";
  // 去掉 webm 预览
  if (/\.webm(\?|$)/i.test(u)) return "";
  if (/www-static|\.js(\?|$)/i.test(u)) return "";
  var proxy = t(_coverProxy);
  if (proxy && u.indexOf(proxy) !== 0 && !/\/img\?url=/i.test(u)) {
    if (/[?&]url=$/i.test(proxy) || /url=$/i.test(proxy)) {
      return proxy + encodeURIComponent(u);
    }
    return proxy.replace(/\/$/, "") + "/img?url=" + encodeURIComponent(u);
  }
  return u;
}

function pickCoverFromCard(cardHtml) {
  function attr(name) {
    var m = cardHtml.match(new RegExp(name + '="([^"]+)"', "i"));
    return m ? m[1] : "";
  }
  var candidates = [
    attr("data-mediumthumb"),
    attr("data-image"),
    attr("data-src"),
    attr("data-thumb_url"),
    attr("src")
  ];
  // data-path 相对路径拼 CDN
  var path = attr("data-path");
  if (path) {
    path = path.replace(/\{index\}/gi, "1");
    if (path.charAt(0) === "/") {
      candidates.push("https://pix-cdn77.phncdn.com" + path);
      candidates.push("https://ei.phncdn.com" + path);
    }
  }
  for (var i = 0; i < candidates.length; i++) {
    var u = wrapCover(candidates[i]);
    if (u) return u;
  }
  // 任意 phncdn 图
  var m = cardHtml.match(
    /https?:\/\/[^"'\s]+phncdn\.com[^"'\s]+\.(?:jpg|jpeg|png|webp)[^"'\s]*/i
  );
  if (m) return wrapCover(m[0]);
  return "";
}

function pickTitleFromCard(cardHtml) {
  var m = cardHtml.match(/\btitle="([^"]{2,})"/i);
  if (m && m[1].indexOf("http") < 0) return t(m[1]);
  m = cardHtml.match(/\balt="([^"]{2,})"/i);
  if (m) return t(m[1]);
  return "";
}
function pickDurationFromCard(cardHtml) {
  var m = cardHtml.match(/class="[^"]*duration[^"]*"[^>]*>([^<]+)/i);
  return m ? t(m[1]) : "";
}

function parseVideoList(html) {
  var results = [];
  var seen = {};
  var parts = String(html).split(/<li(?=[^>]*\bpcVideoListItem\b)/i);
  for (var i = 1; i < parts.length; i++) {
    var card = "<li" + parts[i].split(/<\/li>/i)[0] + "</li>";
    var viewkey = "";
    var m = card.match(/data-video-vkey="([a-zA-Z0-9]+)"/i);
    if (m) viewkey = m[1];
    if (!viewkey) viewkey = extractViewkey(card);
    if (!viewkey || seen[viewkey]) continue;
    seen[viewkey] = true;
    var title = pickTitleFromCard(card) || viewkey;
    var cover = pickCoverFromCard(card);
    var durationText = pickDurationFromCard(card);
    results.push({
      id: viewkey,
      type: "url",
      title: title,
      coverUrl: cover,
      posterPath: cover,
      backdropPath: cover,
      durationText: durationText,
      description: durationText ? "时长 " + durationText : "",
      link: viewkey,
      mediaType: "movie"
    });
  }
  return results;
}

/** 女优搜索结果 */
function parsePornstarList(html) {
  var out = [];
  var seen = {};
  // 卡片：/pornstar/slug
  var re = /href="(\/pornstar\/[a-zA-Z0-9\-]+)"[^>]*>[\s\S]{0,800}?(?:data-src|src)="([^"]+)"[\s\S]{0,400}?/gi;
  var m;
  // 更稳：按 pornstar 链接分
  var parts = String(html).split(/href="(\/pornstar\/[a-zA-Z0-9\-]+)"/i);
  // parts: text, slug, text, slug...
  for (var i = 1; i < parts.length; i += 2) {
    var path = parts[i];
    var slug = path.replace(/^\/pornstar\//, "");
    if (!slug || seen[slug]) continue;
    seen[slug] = 1;
    var chunk = parts[i + 1] ? parts[i + 1].slice(0, 1000) : "";
    var title = slug.replace(/-/g, " ");
    var tm =
      /(?:title|alt)="([^"]+)"/i.exec(chunk) ||
      /class="[^"]*title[^"]*"[^>]*>([^<]+)/i.exec(chunk);
    if (tm) title = t(tm[1]);
    var cover = "";
    var cm =
      /(?:data-src|data-thumb|src)="(https?:\/\/[^"]+phncdn[^"]+)"/i.exec(chunk) ||
      /(?:data-src|src)="(https?:\/\/[^"]+\.(?:jpg|png|webp)[^"]*)"/i.exec(chunk);
    if (cm) cover = wrapCover(cm[1]);
    out.push({
      id: "phstar:" + slug,
      type: "url",
      title: "女优 · " + title,
      coverUrl: cover,
      posterPath: cover,
      description: "女优主页",
      mediaType: "tv",
      link: "phstar:" + slug
    });
    if (out.length >= 40) break;
  }
  return out;
}

/** 频道/片商搜索结果 */
function parseChannelList(html) {
  var out = [];
  var seen = {};
  var parts = String(html).split(/href="(\/channels\/[a-zA-Z0-9\-]+)"/i);
  for (var i = 1; i < parts.length; i += 2) {
    var path = parts[i];
    var slug = path.replace(/^\/channels\//, "");
    if (!slug || seen[slug] || slug === "search") continue;
    seen[slug] = 1;
    var chunk = parts[i + 1] ? parts[i + 1].slice(0, 1000) : "";
    var title = slug.replace(/-/g, " ");
    var tm =
      /(?:title|alt)="([^"]+)"/i.exec(chunk) ||
      /class="[^"]*title[^"]*"[^>]*>([^<]+)/i.exec(chunk);
    if (tm) title = t(tm[1]);
    var cover = "";
    var cm =
      /(?:data-src|data-thumb|src)="(https?:\/\/[^"]+phncdn[^"]+)"/i.exec(chunk) ||
      /(?:data-src|src)="(https?:\/\/[^"]+\.(?:jpg|png|webp)[^"]*)"/i.exec(chunk);
    if (cm) cover = wrapCover(cm[1]);
    out.push({
      id: "phch:" + slug,
      type: "url",
      title: "频道 · " + title,
      coverUrl: cover,
      posterPath: cover,
      description: "片商/频道",
      mediaType: "tv",
      link: "phch:" + slug
    });
    if (out.length >= 40) break;
  }
  return out;
}

async function loadHot(params) {
  applyParams(params);
  var page = Number((params && params.page) || 1);
  return parseVideoList(await fetchHtml(BASE_URL + "/video?o=ht&page=" + page));
}
async function loadNewest(params) {
  applyParams(params);
  var page = Number((params && params.page) || 1);
  return parseVideoList(await fetchHtml(BASE_URL + "/video?o=mr&page=" + page));
}
async function loadMostViewed(params) {
  applyParams(params);
  var page = Number((params && params.page) || 1);
  return parseVideoList(await fetchHtml(BASE_URL + "/video?o=mv&page=" + page));
}
async function loadTopRated(params) {
  applyParams(params);
  var page = Number((params && params.page) || 1);
  return parseVideoList(await fetchHtml(BASE_URL + "/video?o=tr&page=" + page));
}
async function loadCategory(params) {
  applyParams(params);
  params = params || {};
  var page = Number(params.page || 1);
  var cat = String(params.category || "111");
  var url;
  if (cat.indexOf("path:") === 0) {
    var path = cat.slice(5);
    url = BASE_URL + path + (path.indexOf("?") >= 0 ? "&" : "?") + "page=" + page;
  } else {
    url = BASE_URL + "/video?c=" + encodeURIComponent(cat) + "&page=" + page;
  }
  return parseVideoList(await fetchHtml(url));
}

async function search(params) {
  applyParams(params);
  params = params || {};
  var keyword = t(params.keyword);
  var page = Number(params.page || 1);
  var stype = t(params.stype || "video");
  var sort = params.sort || "";
  if (!keyword) return loadHot({ page: page });

  if (stype === "pornstar") {
    var url =
      BASE_URL +
      "/pornstars?search=" +
      encodeURIComponent(keyword) +
      (page > 1 ? "&page=" + page : "");
    var html = await fetchHtml(url);
    var stars = parsePornstarList(html);
    if (stars.length) return stars;
    // 回退另一路径
    html = await fetchHtml(
      BASE_URL + "/pornstar/search?search=" + encodeURIComponent(keyword)
    );
    return parsePornstarList(html);
  }
  if (stype === "channel") {
    var url2 =
      BASE_URL +
      "/channels/search?search=" +
      encodeURIComponent(keyword) +
      (page > 1 ? "&page=" + page : "");
    return parseChannelList(await fetchHtml(url2));
  }

  var vurl =
    BASE_URL +
    "/video/search?search=" +
    encodeURIComponent(keyword) +
    "&page=" +
    page;
  if (sort) vurl += "&o=" + sort;
  return parseVideoList(await fetchHtml(vurl));
}



function parseFlashvars(html) {
  var m = html.match(/var\s+flashvars_\d+\s*=\s*(\{[\s\S]*?\});/);
  if (!m) return null;
  try {
    return JSON.parse(m[1]);
  } catch (e) {
    return null;
  }
}
function buildSourcesFromFlashvars(flashvars) {
  var sources = [];
  var defs = (flashvars && flashvars.mediaDefinitions) || [];
  for (var i = 0; i < defs.length; i++) {
    var def = defs[i];
    if (!def || !def.videoUrl) continue;
    var format = String(def.format || "").toLowerCase();
    var url = def.videoUrl;
    if (format !== "hls" && url.indexOf(".m3u8") < 0) continue;
    var quality = def.quality;
    if (Array.isArray(quality)) {
      quality = Math.max.apply(null, quality.map(Number)) || 0;
    } else {
      quality = parseInt(quality, 10) || 0;
    }
    sources.push({ quality: quality, url: url });
  }
  sources.sort(function (a, b) {
    return (b.quality || 0) - (a.quality || 0);
  });
  return sources;
}

async function loadDetail(link) {
  applyParams({});
  var raw = t(typeof link === "object" ? link.link || link.id : link);
  if (!raw) return null;

  // 女优主页 → 视频列表
  if (raw.indexOf("phstar:") === 0) {
    var slug = raw.slice(7);
    var pageUrl = BASE_URL + "/pornstar/" + encodeURIComponent(slug);
    var html = await fetchHtml(pageUrl);
    var videos = parseVideoList(html);
    var title = slug.replace(/-/g, " ");
    var tm = /<h1[^>]*>([\s\S]*?)<\/h1>/i.exec(html);
    if (tm) title = t(tm[1].replace(/<[^>]+>/g, ""));
    var cover = videos[0] ? videos[0].coverUrl : "";
    var related = videos.map(function (v) {
      return {
        id: v.id,
        type: "url",
        title: v.title,
        coverUrl: v.coverUrl,
        posterPath: v.coverUrl,
        link: v.link,
        mediaType: "movie"
      };
    });
    return {
      id: "phstar:" + slug,
      type: "url",
      title: "女优 · " + title,
      coverUrl: cover,
      posterPath: cover,
      description: "共 " + videos.length + " 部（本页）",
      mediaType: "tv",
      link: "phstar:" + slug,
      relatedItems: related,
      childItems: related,
      episodeItems: related
    };
  }

  // 频道主页 → 视频列表
  if (raw.indexOf("phch:") === 0) {
    var cslug = raw.slice(5);
    var curl = BASE_URL + "/channels/" + encodeURIComponent(cslug);
    var chtml = await fetchHtml(curl);
    var cvideos = parseVideoList(chtml);
    var ctitle = cslug.replace(/-/g, " ");
    var ctm = /<h1[^>]*>([\s\S]*?)<\/h1>/i.exec(chtml);
    if (ctm) ctitle = t(ctm[1].replace(/<[^>]+>/g, ""));
    var ccover = cvideos[0] ? cvideos[0].coverUrl : "";
    var crelated = cvideos.map(function (v) {
      return {
        id: v.id,
        type: "url",
        title: v.title,
        coverUrl: v.coverUrl,
        posterPath: v.coverUrl,
        link: v.link,
        mediaType: "movie"
      };
    });
    return {
      id: "phch:" + cslug,
      type: "url",
      title: "频道 · " + ctitle,
      coverUrl: ccover,
      posterPath: ccover,
      description: "共 " + cvideos.length + " 部（本页）",
      mediaType: "tv",
      link: "phch:" + cslug,
      relatedItems: crelated,
      childItems: crelated,
      episodeItems: crelated
    };
  }

  var viewkey = raw;
  if (viewkey.indexOf("viewkey=") >= 0) viewkey = extractViewkey(viewkey) || viewkey;
  var pageUrl = BASE_URL + "/view_video.php?viewkey=" + encodeURIComponent(viewkey);
  var html = await fetchHtml(pageUrl);
  var flashvars = parseFlashvars(html);
  if (!flashvars) {
    return {
      id: viewkey,
      type: "url",
      title: viewkey,
      description: "未能解析播放数据",
      link: viewkey,
      mediaType: "movie"
    };
  }
  var sources = buildSourcesFromFlashvars(flashvars);
  var best = sources[0];
  var cover = wrapCover(flashvars.image_url || "");
  var $ = Widget.html.load(html);
  var pageTitle = t(
    flashvars.video_title ||
      $("h1.title").text() ||
      $("meta[property='og:title']").attr("content")
  );
  var duration = parseInt(flashvars.video_duration || 0, 10) || 0;
  var durationText = duration
    ? Math.floor(duration / 60) +
      ":" +
      String(duration % 60).padStart(2, "0")
    : "";
  return {
    id: viewkey,
    type: "url",
    title: pageTitle || viewkey,
    description: durationText ? "时长 " + durationText : "",
    coverUrl: cover,
    posterPath: cover,
    backdropPath: cover,
    duration: duration,
    durationText: durationText,
    videoUrl: best ? best.url : "",
    mediaType: "movie",
    link: viewkey,
    customHeaders: {
      "User-Agent": UA,
      Referer: pageUrl,
      Origin: "https://www.pornhub.com"
    }
  };
}

async function loadResource(params) {
  applyParams(params);
  params = params || {};
  var viewkey = t(params.link || params.id || "");
  if (!viewkey || viewkey.indexOf("phstar:") === 0 || viewkey.indexOf("phch:") === 0) {
    return [];
  }
  if (viewkey.indexOf("viewkey=") >= 0) viewkey = extractViewkey(viewkey) || viewkey;
  var pageUrl = BASE_URL + "/view_video.php?viewkey=" + encodeURIComponent(viewkey);
  var html = await fetchHtml(pageUrl);
  var flashvars = parseFlashvars(html);
  if (!flashvars) return [];
  var sources = buildSourcesFromFlashvars(flashvars);
  var headers = {
    "User-Agent": UA,
    Referer: pageUrl,
    Origin: "https://www.pornhub.com"
  };
  return sources.map(function (s) {
    return {
      name: (s.quality || "未知") + "p",
      description: "HLS " + (s.quality || "") + "p",
      url: s.url,
      playerType: "app",
      customHeaders: headers
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
