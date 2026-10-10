/**
 * 花都影院 ForwardWidget v1.3.0
 * 源站: rb.huaduys.org 等（发布页 3.hdfby.net）
 * 分类对齐官网：中文字幕/无字幕/国产/欧美/动漫
 * 标题写入 link；封面多字段；播放 loadResource
 * t.me/nostremby
 */
WidgetMetadata = {
  id: "forward.huadu.tut",
  title: "花都影院",
  version: "1.3.0",
  requiredVersion: "0.0.1",
  description: "花都影院 · 中字/无字幕/国产/欧美/动漫 · t.me/nostremby",
  author: "宝宝巴士",
  logo: "https://fwd.uou.qzz.io/icon.png",
  site: "https://t.me/nostremby",
  detailCacheDuration: 300,
  modules: [
    {
      id: "home",
      title: "首页推荐",
      functionName: "loadHome",
      cacheDuration: 600,
      params: [{ name: "page", title: "页码", type: "page" }]
    },
    {
      id: "chinese",
      title: "中文字幕",
      functionName: "loadChinese",
      cacheDuration: 600,
      params: [{ name: "page", title: "页码", type: "page" }]
    },
    {
      id: "nosub",
      title: "无字幕",
      functionName: "loadNoSub",
      cacheDuration: 600,
      params: [{ name: "page", title: "页码", type: "page" }]
    },
    {
      id: "domestic",
      title: "国产",
      functionName: "loadDomestic",
      cacheDuration: 600,
      params: [{ name: "page", title: "页码", type: "page" }]
    },
    {
      id: "western",
      title: "欧美",
      functionName: "loadWestern",
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

/* 候选域名（发布页可改数字/字母；按可用性排序） */
var HOSTS = [
  "https://rb.huaduys.org",
  "https://hd3.huaduys.org",
  "https://a.huaduys.org",
  "https://huaduys.vip",
  "https://huaduys.com"
];
var HOST = HOSTS[0];
var UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36";
var PIC_PROXY = "https://ik.bug.qzz.io/img?url=";
var _cookie = "";
var _titleCache = {};
var _picCache = {};
var _hostReady = false;

function t(v) {
  return String(v == null ? "" : v).trim();
}
function decodeHtml(s) {
  s = t(s);
  if (!s) return "";
  s = s
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x([0-9a-fA-F]+);/g, function (_, h) {
      return String.fromCharCode(parseInt(h, 16));
    })
    .replace(/&#(\d+);/g, function (_, d) {
      return String.fromCharCode(parseInt(d, 10));
    });
  return s.replace(/\s+/g, " ").trim();
}

function headers(referer) {
  var h = {
    "User-Agent": UA,
    Accept:
      "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
    "Accept-Language": "zh-CN,zh;q=0.9",
    Referer: referer || HOST + "/"
  };
  if (_cookie) h.Cookie = _cookie;
  return h;
}

function b64decode(str) {
  str = t(str).replace(/[\r\n\s]/g, "");
  if (!str) return "";
  if (typeof atob === "function") {
    try {
      return atob(str);
    } catch (e) {}
  }
  var table =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var out = [];
  var i = 0;
  str = str.replace(/[^A-Za-z0-9+/=]/g, "");
  while (i < str.length) {
    var a = table.indexOf(str.charAt(i++));
    var b = table.indexOf(str.charAt(i++));
    var c = table.indexOf(str.charAt(i++));
    var d = table.indexOf(str.charAt(i++));
    var n = (a << 18) | (b << 12) | ((c & 63) << 6) | (d & 63);
    if (c !== 64 && c !== -1) out.push((n >> 16) & 255);
    if (d !== 64 && d !== -1) {
      out.push((n >> 8) & 255);
      out.push(n & 255);
    } else if (c !== 64 && c !== -1) {
      out.push((n >> 8) & 255);
    }
  }
  var s = "";
  for (var j = 0; j < out.length; j++) s += String.fromCharCode(out[j]);
  try {
    return decodeURIComponent(escape(s));
  } catch (e2) {
    return s;
  }
}

function absUrl(u) {
  u = t(u).replace(/&amp;/g, "&");
  if (!u) return "";
  if (u.indexOf("//") === 0) return "https:" + u;
  if (u.indexOf("http") === 0) return u;
  if (u.indexOf("/") === 0) return HOST + u;
  return HOST + "/" + u;
}

function proxyPic(u) {
  u = absUrl(u);
  if (!u) return "";
  if (/ik\.bug\.qzz\.io|weserv\.nl|wulii\./i.test(u)) return u;
  if (/3010\.top/i.test(u)) return u;
  return PIC_PROXY + encodeURIComponent(u);
}

function fillCover(item, pic) {
  var url = proxyPic(pic);
  if (!url) return item;
  item.coverUrl = url;
  item.posterPath = url;
  item.backdropPath = url;
  item.detailPoster = url;
  item.posterUrl = url;
  item.pic = url;
  item.image = url;
  item.cover = url;
  return item;
}

async function fetchHtml(url, referer) {
  var res = await Widget.http.get(url, { headers: headers(referer || HOST + "/") });
  try {
    var rh = (res && res.headers) || {};
    var sc = rh["set-cookie"] || rh["Set-Cookie"] || "";
    if (sc && typeof sc === "string") {
      var parts = sc.split(/,(?=[^;]+?=)/);
      var jar = [];
      for (var i = 0; i < parts.length; i++) {
        var kv = t(parts[i].split(";")[0]);
        if (kv) jar.push(kv);
      }
      if (jar.length) _cookie = jar.join("; ");
    }
  } catch (e) {}
  var body = res && (res.data != null ? res.data : res);
  if (typeof body !== "string") {
    try {
      body = JSON.stringify(body);
    } catch (e2) {
      body = String(body || "");
    }
  }
  return body || "";
}

/** 探测可用 HOST（只做一次） */
async function ensureHost() {
  if (_hostReady) return;
  for (var i = 0; i < HOSTS.length; i++) {
    try {
      var h = HOSTS[i];
      var html = await fetchHtml(h + "/", h + "/");
      if (html && html.length > 500 && /voddetail|stui-vodlist|花都/i.test(html)) {
        HOST = h;
        _hostReady = true;
        return;
      }
    } catch (e) {}
  }
  HOST = HOSTS[0];
  _hostReady = true;
}

async function ensureCookie() {
  await ensureHost();
  if (_cookie) return;
  try {
    await fetchHtml(HOST + "/", HOST + "/");
  } catch (e) {}
}

function parseList(html) {
  var items = [];
  var seen = {};
  if (!html) return items;

  function push(href, name, pic, remark) {
    href = t(href);
    name = decodeHtml(name).replace(/\s+/g, " ");
    if (!href || !name) return;
    if (seen[href]) return;
    if (/广告|点赞|VPN|发布页|首页|棋牌|澳门|开元|葡京|注册送|发财|约炮|看片|助你/.test(name))
      return;
    if (/alicdn|fleamarket|cloudfront|amazonaws|channelCode|shareName/i.test(href + name + (pic || "")))
      return;
    if (href.indexOf("http") === 0 && href.indexOf("huaduys") < 0 && href.indexOf("3010.top") < 0)
      return;
    if (!/voddetail\/\d+/i.test(href)) return;
    if (name.length > 100) return;
    seen[href] = 1;
    _titleCache[href] = name;
    _titleCache["hd:" + href] = name;
    var idm = href.match(/voddetail\/(\d+)/i);
    if (idm) {
      _titleCache[idm[1]] = name;
      _titleCache["/voddetail/" + idm[1] + ".html"] = name;
    }
    if (pic) {
      _picCache[href] = pic;
      if (idm) _picCache["/voddetail/" + idm[1] + ".html"] = pic;
    }
    var item = {
      id: "hd:" + href,
      type: "url",
      title: name,
      name: name,
      description: t(remark || ""),
      mediaType: "movie",
      link: "hd:" + href + "||" + encodeURIComponent(name)
    };
    items.push(fillCover(item, pic || ""));
  }

  var blocks = html.split(/<li[^>]*>/i);
  for (var bi = 1; bi < blocks.length; bi++) {
    var blk = blocks[bi].split(/<\/li>/i)[0] || "";
    if (blk.length < 30) continue;
    var hm =
      blk.match(/href="([^"]*voddetail[^"]*)"/i) ||
      blk.match(/class="[^"]*stui-vodlist__thumb[^"]*"[^>]*href="([^"]+)"/i) ||
      blk.match(/href="([^"]+)"[^>]*class="[^"]*stui-vodlist__thumb[^"]*"/i) ||
      blk.match(/href="(\/[^"]+\.html)"/i);
    if (!hm) continue;
    var href = hm[1];
    var nm =
      blk.match(/<h4[^>]*>[\s\S]*?<a[^>]*>([^<]+)<\/a>/i) ||
      blk.match(/title="([^"]+)"/i) ||
      blk.match(/alt="([^"]+)"/i);
    var name = nm ? nm[1] : "";
    var pm =
      blk.match(/data-original="([^"]+)"/i) ||
      blk.match(/data-src="([^"]+)"/i) ||
      blk.match(/<img[^>]+src="([^"]+)"/i);
    var pic = pm ? pm[1] : "";
    var rm = blk.match(/pic-text[^"]*"[^>]*>([\s\S]*?)<\/span>/i);
    var remark = rm ? rm[1].replace(/<[^>]+>/g, "") : "";
    push(href, name, pic, remark);
  }

  if (!items.length) {
    var re = /href="((?:https?:\/\/[^"]+)?\/?voddetail\/[^"]+\.html)"[^>]*>([\s\S]*?)<\/a>/gi;
    var m;
    while ((m = re.exec(html))) {
      var href2 = m[1];
      var inner = m[2] || "";
      var name2 = t(inner.replace(/<[^>]+>/g, ""));
      if (!name2 || name2.length > 60) {
        var near = html.slice(Math.max(0, m.index - 50), m.index + 400);
        var n3 =
          near.match(/<h4[^>]*>[\s\S]*?<a[^>]*>([^<]+)<\/a>/i) ||
          near.match(/title="([^"]+)"/i) ||
          near.match(/alt="([^"]+)"/i);
        name2 = n3 ? n3[1] : name2;
      }
      var near2 = html.slice(m.index, m.index + 500);
      var p2 =
        near2.match(/data-original="([^"]+)"/i) ||
        near2.match(/data-src="([^"]+)"/i);
      push(href2, name2, p2 ? p2[1] : "", "");
    }
  }

  if (!items.length) {
    var re3 =
      /stui-vodlist__thumb[^>]*href="([^"]+)"[\s\S]{0,400}?data-original="([^"]+)"[\s\S]{0,400}?<h4[\s\S]{0,120}?<a[^>]*>([^<]+)<\/a>/gi;
    var m3;
    while ((m3 = re3.exec(html))) {
      push(m3[1], m3[3], m3[2], "");
    }
  }

  return items;
}

function parseId(link) {
  link = t(link);
  if (link.indexOf("hd:") === 0) link = link.slice(3);
  if (link.indexOf("||") >= 0) link = link.split("||")[0];
  return link;
}

function parseEmbeddedTitle(link) {
  link = t(link);
  if (link.indexOf("hd:") === 0) link = link.slice(3);
  if (link.indexOf("||") < 0) return "";
  try {
    return decodeURIComponent(link.split("||").slice(1).join("||"));
  } catch (e) {
    return link.split("||").slice(1).join("||");
  }
}

/** 苹果CMS 分页 */
function buildShow(cid, page) {
  page = parseInt(page, 10) || 1;
  if (page <= 1) return "/vodshow/" + cid + "-----------.html";
  return "/vodshow/" + cid + "--------" + page + "---.html";
}

async function loadCategory(params) {
  await ensureCookie();
  params = params || {};
  var page = parseInt(params.page, 10) || 1;
  var cid = t(params.cid || "1") || "1";
  var candidates = [
    buildShow(cid, page),
    "/vodtype/" + cid + (page > 1 ? "-" + page : "") + ".html",
    "/vodtype/" + cid + ".html",
    "/index.php/vod/show/id/" + cid + "/page/" + page + ".html",
    "/index.php/vod/type/id/" + cid + (page > 1 ? "/page/" + page : "") + ".html"
  ];
  var list = [];
  for (var ci = 0; ci < candidates.length; ci++) {
    try {
      var html = await fetchHtml(HOST + candidates[ci], HOST + "/");
      list = parseList(html);
      if (list.length) break;
    } catch (e) {}
  }
  return list;
}

async function loadHome(params) {
  await ensureCookie();
  var page = parseInt(params && params.page, 10) || 1;
  if (page > 1) return loadChinese(params);
  var html = await fetchHtml(HOST + "/", HOST + "/");
  return parseList(html);
}

/* 官网分类：1 中文字幕 / 2 无字幕 / 3 国产 / 4 欧美 / 5 动漫 */
async function loadChinese(params) {
  return loadCategory(Object.assign({}, params, { cid: "1" }));
}
async function loadNoSub(params) {
  return loadCategory(Object.assign({}, params, { cid: "2" }));
}
async function loadDomestic(params) {
  return loadCategory(Object.assign({}, params, { cid: "3" }));
}
async function loadWestern(params) {
  return loadCategory(Object.assign({}, params, { cid: "4" }));
}
async function loadAnime(params) {
  return loadCategory(Object.assign({}, params, { cid: "5" }));
}

async function search(params) {
  await ensureCookie();
  params = params || {};
  var kw = t(params.keyword || params.wd || params.q);
  if (!kw) return [];
  var url = HOST + "/vodsearch/-------------.html?wd=" + encodeURIComponent(kw);
  var html = await fetchHtml(url, HOST + "/");
  var list = parseList(html);
  if (!list.length) {
    try {
      html = await fetchHtml(
        HOST + "/index.php/vod/search.html?wd=" + encodeURIComponent(kw),
        HOST + "/"
      );
      list = parseList(html);
    } catch (e) {}
  }
  return list;
}

async function resolvePlayPage(playUrl) {
  playUrl = absUrl(playUrl);
  if (!playUrl) return "";
  if (/\.(m3u8|mp4)(\?|$)/i.test(playUrl)) return playUrl;

  var html = await fetchHtml(playUrl, HOST + "/");
  if (!html) return "";

  var m =
    html.match(/["']url["']\s*:\s*["']([A-Za-z0-9+/=]{20,})["']/) ||
    html.match(/"","url":"([^"]+)"/) ||
    html.match(/var\s+player_[a-zA-Z0-9]+\s*=\s*(\{[\s\S]*?\})\s*;/);

  if (m) {
    var raw = m[1];
    if (raw.charAt(0) === "{") {
      try {
        var j = JSON.parse(raw);
        raw = j.url || "";
      } catch (e) {
        raw = "";
      }
    }
    if (raw) {
      if (raw.indexOf("http") === 0) {
        return raw.replace(/\\u0026/g, "&").replace(/\\\//g, "/");
      }
      try {
        var dec = b64decode(raw);
        try {
          dec = decodeURIComponent(dec);
        } catch (e2) {}
        dec = t(dec).replace(/\\u0026/g, "&").replace(/\\\//g, "/");
        if (dec.indexOf("http") === 0) return dec;
      } catch (e3) {}
    }
  }

  var m3 = html.match(/(https?:\/\/[^\s"'<>]+\.m3u8[^\s"'<>]*)/i);
  if (m3) return m3[1].replace(/&amp;/g, "&");
  var m4 = html.match(/(https?:\/\/[^\s"'<>]+\.mp4[^\s"'<>]*)/i);
  if (m4) return m4[1].replace(/&amp;/g, "&");
  return "";
}

async function loadDetail(link) {
  await ensureCookie();
  var rawLink = typeof link === "object" ? link.link || link.id || "" : link;
  var listTitle = "";
  var listPic = "";
  if (typeof link === "object" && link) {
    listTitle = decodeHtml(link.title || link.name || "");
    listPic = t(link.coverUrl || link.posterPath || link.pic || "");
  }
  if (!listTitle) listTitle = parseEmbeddedTitle(rawLink);
  var path = parseId(rawLink);
  if (!path) return null;
  if (!listTitle) {
    listTitle =
      _titleCache[path] ||
      _titleCache["hd:" + path] ||
      _titleCache[path.replace(/^hd:/, "")] ||
      "";
    var idm0 =
      String(path).match(/voddetail\/(\d+)/i) || String(path).match(/(\d{3,})/);
    if (!listTitle && idm0) listTitle = _titleCache[idm0[1]] || "";
  }
  if (!listPic) {
    listPic = _picCache[path] || _picCache[path.replace(/^hd:/, "")] || "";
  }
  listTitle = decodeHtml(listTitle);
  var pageUrl = absUrl(path);
  var html = await fetchHtml(pageUrl, HOST + "/");

  function cleanTitle(s) {
    s = decodeHtml(s || "");
    s = s.replace(/<[^>]+>/g, "");
    s = s.split("_")[0].split("|")[0];
    s = s.replace(/在线观看.*$/i, "").replace(/花都.*$/i, "");
    s = s.replace(/[-_\s]*正片$/i, "").trim();
    if (/^正片$|^播放$|^在线播放$/i.test(s)) return "";
    return s;
  }

  var title = cleanTitle(listTitle) || "";
  if (!title && html) {
    var tm =
      html.match(/property="og:title"\s+content="([^"]+)"/i) ||
      html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i) ||
      html.match(/<title>([^<]+)</i);
    if (tm) title = cleanTitle(tm[1]) || "";
  }
  var pageTitle = title || "未命名";

  var pic = "";
  if (html) {
    var pm =
      html.match(/property="og:image"\s+content="([^"]+)"/i) ||
      html.match(/data-original="([^"]+)"/i) ||
      html.match(/<img[^>]+src="([^"]+)"[^>]*class="[^"]*img-responsive/i);
    if (pm) pic = pm[1];
  }
  if (!pic && listPic && !/ik\.bug\.qzz\.io/i.test(listPic)) pic = listPic;
  if (!pic && listPic && /ik\.bug\.qzz\.io/i.test(listPic)) {
    try {
      var mu = listPic.match(/[?&]url=([^&]+)/);
      if (mu) pic = decodeURIComponent(mu[1]);
    } catch (e) {}
  }

  var desc = "";
  if (html) {
    var dm =
      html.match(/简介[：:]\s*<\/span>([\s\S]*?)<\//i) ||
      html.match(/class="[^"]*stui-content__desc[^"]*"[^>]*>([\s\S]*?)<\/div>/i);
    if (dm) desc = t(dm[1].replace(/<[^>]+>/g, "")).slice(0, 300);
  }

  var playLinks = [];
  if (html) {
    var btn = html.match(/class="btn btn-primary"[^>]*href="([^"]+)"/i);
    if (btn) playLinks.push({ name: "正片", href: btn[1] });
    var reEp = /href="(\/vodplay\/[^"]+)"[^>]*>([^<]+)<\/a>/gi;
    var em;
    var seenP = {};
    while ((em = reEp.exec(html))) {
      var h = t(em[1]);
      var n = t(em[2]);
      if (!h || seenP[h]) continue;
      if (/脚本|APP|下载/.test(n)) continue;
      seenP[h] = 1;
      playLinks.push({ name: n || "播放", href: h });
    }
  }
  if (!playLinks.length) playLinks.push({ name: "播放", href: path });

  var episodeItems = [];
  var hdrs = { "User-Agent": UA, Referer: HOST + "/" };
  // 详情不预解析全部播放地址（防超时）；交给 loadResource
  for (var i = 0; i < playLinks.length; i++) {
    var pl = playLinks[i];
    var epName =
      playLinks.length === 1 ? pageTitle : pageTitle + " 第" + (i + 1) + "集";
    episodeItems.push({
      id: "hdplay:" + pl.href,
      type: "url",
      title: epName,
      name: epName,
      mediaType: "movie",
      seasonNumber: 1,
      episodeNumber: i + 1,
      link: "hdplay:" + encodeURIComponent(pl.href),
      playerType: "app",
      customHeaders: hdrs
    });
  }

  var finalTitle =
    cleanTitle(listTitle) || cleanTitle(pageTitle) || cleanTitle(title) || path;
  if (!finalTitle || /^正片$|^播放$/i.test(finalTitle)) finalTitle = path;

  var detail = {
    id: "hd:" + path + "||" + encodeURIComponent(finalTitle),
    type: "url",
    title: finalTitle,
    name: finalTitle,
    vod_name: finalTitle,
    originalTitle: finalTitle,
    description: desc,
    mediaType: "movie",
    link: "hd:" + path + "||" + encodeURIComponent(finalTitle),
    episodeItems: episodeItems,
    childItems: episodeItems,
    customHeaders: hdrs
  };
  return fillCover(detail, pic || listPic);
}

async function loadResource(params) {
  params = params || {};
  await ensureCookie();
  var link = t(params.link || params.id || params.url || params.videoUrl || "");
  if (!link && params.item) link = t(params.item.link || params.item.id || "");
  var hdrs = { "User-Agent": UA, Referer: HOST + "/" };

  if (link.indexOf("http") === 0 && /\.(m3u8|mp4)(\?|$)/i.test(link)) {
    return [{ name: "默认", url: link, playerType: "app", customHeaders: hdrs }];
  }
  if (link.indexOf("hdplay:") === 0) {
    link = decodeURIComponent(link.slice(7));
  }
  if (link.indexOf("hd:") === 0) {
    var pathOnly = parseId(link);
    // 详情页优先找播放链
    try {
      var dhtml = await fetchHtml(absUrl(pathOnly), HOST + "/");
      var btn = dhtml && dhtml.match(/href="(\/vodplay\/[^"]+)"/i);
      if (btn) link = btn[1];
    } catch (e) {}
  }

  var url = await resolvePlayPage(link);
  if (url) {
    return [{ name: "默认", url: url, playerType: "app", customHeaders: hdrs }];
  }
  return [];
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
