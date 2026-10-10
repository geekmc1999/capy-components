/**
 * 红果黄剧 ForwardWidget (huangju.net)
 * 列表/详情走 api.huangju.net
 * 播放：优先 playProxy 拿签名 URL（App 读不到 Set-Cookie）；本地能抠到 Cookie 则双线路
 */
WidgetMetadata = {
  id: "forward.huangju.tut",
  title: "红果黄剧",
  version: "1.6.2",
  requiredVersion: "0.0.1",
  description: "huangju.net：分类/搜索/分集；播放需签名（建议配置 playProxy）| 宝宝巴士乐园 t.me/nostremby",
  author: "宝宝巴士",
  site: "https://t.me/nostremby",
  detailCacheDuration: 120,
  globalParams: [
    {
      name: "apiBase",
      title: "API 地址",
      type: "input",
      value: "https://api.huangju.net"
    },
    {
      name: "playProxy",
      title: "播放签名代理",
      type: "input",
      value: "https://play.uou.qzz.io"
    },
    {
      name: "playProxyToken",
      title: "播放代理 Token",
      type: "input",
      value: ""
    }
  ],
  modules: [
    { id: "hot", title: "热门", functionName: "loadHot", cacheDuration: 1800, params: [{ name: "page", title: "页码", type: "page" }] },
    { id: "latest", title: "最新", functionName: "loadLatest", cacheDuration: 1800, params: [{ name: "page", title: "页码", type: "page" }] },
    { id: "cat-adult", title: "成人", functionName: "loadAdult", cacheDuration: 1800, params: [{ name: "page", title: "页码", type: "page" }] },
    { id: "cat-mo-gai", title: "魔改", functionName: "loadMoGai", cacheDuration: 1800, params: [{ name: "page", title: "页码", type: "page" }] },
    { id: "cat-romance", title: "爱情甜宠", functionName: "loadRomanceGroup", cacheDuration: 1800, params: [{ name: "page", title: "页码", type: "page" }] },
    { id: "cat-urban", title: "都市", functionName: "loadUrban", cacheDuration: 1800, params: [{ name: "page", title: "页码", type: "page" }] },
    { id: "cat-fantasy", title: "玄幻脑洞", functionName: "loadFantasyGroup", cacheDuration: 1800, params: [{ name: "page", title: "页码", type: "page" }] },
    { id: "cat-suspense", title: "悬疑", functionName: "loadSuspense", cacheDuration: 1800, params: [{ name: "page", title: "页码", type: "page" }] },
    { id: "cat-rebirth", title: "穿越重生", functionName: "loadRebirthGroup", cacheDuration: 1800, params: [{ name: "page", title: "页码", type: "page" }] },
    { id: "cat-xianxia", title: "仙侠古装", functionName: "loadXianXiaGroup", cacheDuration: 1800, params: [{ name: "page", title: "页码", type: "page" }] },
    { id: "cat-youth", title: "青春校园", functionName: "loadYouthGroup", cacheDuration: 1800, params: [{ name: "page", title: "页码", type: "page" }] },
    { id: "cat-family", title: "家庭情感", functionName: "loadFamilyGroup", cacheDuration: 1800, params: [{ name: "page", title: "页码", type: "page" }] },
    { id: "cat-counter", title: "逆袭复仇", functionName: "loadCounterGroup", cacheDuration: 1800, params: [{ name: "page", title: "页码", type: "page" }] },
    { id: "cat-horror", title: "灵异恐怖", functionName: "loadHorrorGroup", cacheDuration: 1800, params: [{ name: "page", title: "页码", type: "page" }] },
    { id: "cat-original", title: "原创精选", functionName: "loadOriginalGroup", cacheDuration: 1800, params: [{ name: "page", title: "页码", type: "page" }] },
    {
      id: "loadResource",
      title: "解析播放",
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
      { name: "page", title: "页码", type: "page" }
    ]
  }
};

var DEFAULT_API = "https://api.huangju.net";
var SITE = "https://huangju.net";
var HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  Accept: "application/json",
  Origin: SITE,
  Referer: SITE + "/"
};
var SKIP_REDIRECT_PROBE_HEADER = "X-Forward-Skip-Redirect-Probe";
var TOKEN_KEY = "hj_token";
var DEVICE_KEY = "hj_device";

function t(v) {
  return String(v == null ? "" : v).trim();
}

function cfg(params) {
  params = params || {};
  return {
    apiBase: t(params.apiBase || DEFAULT_API).replace(/\/+$/, ""),
    playProxy: t(params.playProxy || "").replace(/\/+$/, ""),
    playProxyToken: t(params.playProxyToken || "")
  };
}

function buildQuery(obj) {
  var parts = [];
  for (var k in obj) {
    if (obj[k] === undefined || obj[k] === null || obj[k] === "") continue;
    parts.push(encodeURIComponent(k) + "=" + encodeURIComponent(String(obj[k])));
  }
  return parts.join("&");
}

function getDeviceId() {
  var id = "";
  try {
    id = Widget.storage.get(DEVICE_KEY);
  } catch (e) {}
  if (!id) {
    id =
      "fw-" +
      Date.now().toString(36) +
      "-" +
      Math.random().toString(36).slice(2, 10);
    try {
      Widget.storage.set(DEVICE_KEY, id);
    } catch (e) {}
  }
  return id;
}

async function ensureToken(c) {
  var token = "";
  try {
    token = Widget.storage.get(TOKEN_KEY);
  } catch (e) {}
  if (token) return token;
  var res = await Widget.http.post(
    c.apiBase + "/auth/guest",
    { deviceId: getDeviceId() },
    {
      headers: Object.assign({}, HEADERS, {
        "Content-Type": "application/json"
      })
    }
  );
  var body = res && res.data !== undefined ? res.data : res;
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch (e) {
      throw new Error("guest 登录失败");
    }
  }
  token = body && body.token;
  if (!token) throw new Error("guest 无 token");
  try {
    Widget.storage.set(TOKEN_KEY, token);
  } catch (e) {}
  return token;
}

function extractCloudFrontJar(res) {
  var jar = {};
  function eatCookieLine(line) {
    var m = String(line).match(
      /(CloudFront-(?:Policy|Signature|Key-Pair-Id))=([^;\s]+)/i
    );
    if (m) jar[m[1]] = m[2];
  }
  function walk(node, depth) {
    if (node == null || depth > 8) return;
    if (typeof node === "string") {
      if (node.indexOf("CloudFront-") >= 0) {
        node.split(/[\r\n,]/).forEach(eatCookieLine);
        var re =
          /CloudFront-(Policy|Signature|Key-Pair-Id)=([A-Za-z0-9_=~\-\/\+]+)/g;
        var m;
        while ((m = re.exec(node))) {
          jar["CloudFront-" + m[1]] = m[2];
        }
      }
      return;
    }
    if (typeof node !== "object") return;
    if (Array.isArray(node)) {
      node.forEach(function (x) {
        walk(x, depth + 1);
      });
      return;
    }
    Object.keys(node).forEach(function (k) {
      var lk = String(k).toLowerCase();
      var v = node[k];
      if (
        lk === "set-cookie" ||
        lk === "set_cookie" ||
        lk === "cookie" ||
        lk.indexOf("cookie") >= 0
      ) {
        if (Array.isArray(v))
          v.forEach(function (x) {
            eatCookieLine(x);
            walk(x, depth + 1);
          });
        else eatCookieLine(v);
      }
      walk(v, depth + 1);
    });
  }
  walk(res, 0);
  if (
    jar["CloudFront-Policy"] &&
    jar["CloudFront-Signature"] &&
    jar["CloudFront-Key-Pair-Id"]
  ) {
    return jar;
  }
  return null;
}

function signUrl(rawUrl, jar) {
  if (!rawUrl || !jar) return "";
  var join = rawUrl.indexOf("?") >= 0 ? "&" : "?";
  return (
    rawUrl +
    join +
    "Policy=" +
    encodeURIComponent(jar["CloudFront-Policy"]) +
    "&Signature=" +
    encodeURIComponent(jar["CloudFront-Signature"]) +
    "&Key-Pair-Id=" +
    encodeURIComponent(jar["CloudFront-Key-Pair-Id"])
  );
}

function cookieHeader(jar) {
  if (!jar) return "";
  return (
    "CloudFront-Policy=" +
    jar["CloudFront-Policy"] +
    "; CloudFront-Signature=" +
    jar["CloudFront-Signature"] +
    "; CloudFront-Key-Pair-Id=" +
    jar["CloudFront-Key-Pair-Id"]
  );
}

async function httpGet(c, url, withAuth) {
  var headers = Object.assign({}, HEADERS);
  if (withAuth) {
    try {
      headers.Authorization = "Bearer " + (await ensureToken(c));
    } catch (e) {
      console.error("[auth]", e.message || e);
    }
  }
  var res = await Widget.http.get(url, { headers: headers });
  if (res == null) throw new Error("无响应: " + url);
  var body = res.data !== undefined ? res.data : res;
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch (e) {}
  }
  if (body && body.statusCode === 401 && withAuth) {
    try {
      Widget.storage.set(TOKEN_KEY, "");
    } catch (e) {}
    headers.Authorization = "Bearer " + (await ensureToken(c));
    var res2 = await Widget.http.get(url, { headers: headers });
    body = res2 && res2.data !== undefined ? res2.data : res2;
    if (typeof body === "string") {
      try {
        body = JSON.parse(body);
      } catch (e) {}
    }
    return { body: body, res: res2 };
  }
  return { body: body, res: res };
}

function parseEpisodeId(params) {
  params = params || {};
  var episodeId = "";
  var link = t(params.link || "");
  if (link.indexOf("play:") === 0) episodeId = link.slice(5);
  else if (params.id && String(params.id).indexOf("play:") === 0)
    episodeId = String(params.id).slice(5);
  else if (/^\d+$/.test(String(params.id || ""))) episodeId = String(params.id);
  else if (params.episodeId) episodeId = String(params.episodeId);
  else if (/^\d+$/.test(link)) episodeId = link;
  if (episodeId.indexOf(":") >= 0) {
    var p = episodeId.split(":");
    episodeId = p[p.length - 1];
  }
  return t(episodeId);
}

/** 优先走 playProxy（JSON 里直接给签名 URL） */
async function fetchViaProxy(c, episodeId) {
  if (!c.playProxy) return null;
  var q = { episodeId: episodeId };
  if (c.playProxyToken) q.token = c.playProxyToken;
  var urls = [
    c.playProxy + "/?" + buildQuery(q),
    c.playProxy + "/play/" + encodeURIComponent(episodeId) +
      (c.playProxyToken ? "?token=" + encodeURIComponent(c.playProxyToken) : "")
  ];
  for (var i = 0; i < urls.length; i++) {
    try {
      var res = await Widget.http.get(urls[i], {
        headers: {
          Accept: "application/json",
          "User-Agent": HEADERS["User-Agent"]
        }
      });
      var body = res && res.data !== undefined ? res.data : res;
      if (typeof body === "string") {
        try {
          body = JSON.parse(body);
        } catch (e) {}
      }
      if (body && (body.ok || body.url || body.rawUrl)) return body;
    } catch (e) {
      console.error("[playProxy try]", urls[i], e.message || e);
    }
  }
  return null;
}

async function fetchPlayGrant(c, episodeId) {
  episodeId = t(String(episodeId || "").replace(/^play:/, ""));
  if (!episodeId) throw new Error("空 episodeId");

  // 1) 代理（推荐）
  try {
    var proxied = await fetchViaProxy(c, episodeId);
    if (proxied && (proxied.url || proxied.rawUrl || proxied.signedUrl)) {
      var jar = null;
      if (proxied.cookies && proxied.cookies["CloudFront-Policy"]) {
        jar = {
          "CloudFront-Policy": proxied.cookies["CloudFront-Policy"],
          "CloudFront-Signature": proxied.cookies["CloudFront-Signature"],
          "CloudFront-Key-Pair-Id": proxied.cookies["CloudFront-Key-Pair-Id"]
        };
      } else if (proxied.cookie && proxied.cookie.indexOf("CloudFront-Policy=") >= 0) {
        jar = {};
        var parts = String(proxied.cookie).split(";");
        for (var pi = 0; pi < parts.length; pi++) {
          var kv = parts[pi].trim().split("=");
          if (kv.length >= 2 && kv[0].indexOf("CloudFront-") === 0) {
            jar[kv[0]] = kv.slice(1).join("=");
          }
        }
        if (!jar["CloudFront-Policy"]) jar = null;
      }
      return {
        rawUrl: proxied.rawUrl || "",
        signedUrl: proxied.signedUrl || proxied.url || "",
        jar: jar,
        expiresAt: proxied.expiresAt,
        via: jar ? "proxy-cookie" : "proxy"
      };
    }
  } catch (e) {
    console.error("[playProxy]", e.message || e);
  }

  // 2) 直连 api（依赖 App 是否透传 Set-Cookie）
  var pack = await httpGet(c, c.apiBase + "/play/" + episodeId, true);
  if (!pack.body || !pack.body.url) {
    pack = await httpGet(c, c.apiBase + "/play/" + episodeId, false);
  }
  if (!pack.body || !pack.body.url) throw new Error("play 无 url");
  var jar = extractCloudFrontJar(pack.res) || extractCloudFrontJar(pack.body);
  var signed = jar ? signUrl(pack.body.url, jar) : "";
  return {
    rawUrl: pack.body.url,
    signedUrl: signed,
    jar: jar,
    expiresAt: pack.body.expiresAt,
    via: jar ? "direct-jar" : "direct-naked"
  };
}

function buildStreamResources(grant) {
  var list = [];
  // 优先 Cookie：子级 m3u8/ts 也能带上，避免只签 master 导致 403
  if (grant.jar && grant.rawUrl) {
    var ck = cookieHeader(grant.jar);
    if (ck) {
      list.push({
        name: "Cookie线路",
        url: grant.rawUrl,
        description: "CloudFront Cookie（推荐，整条 HLS 可用）",
        playerType: "app",
        customHeaders: {
          Cookie: ck,
          Referer: SITE + "/",
          Origin: SITE,
          "User-Agent": HEADERS["User-Agent"],
          "X-Forward-Skip-Redirect-Probe": "1"
        }
      });
    }
  }
  if (grant.signedUrl) {
    list.push({
      name: "签名直链",
      url: grant.signedUrl,
      description:
        "仅 master 带 Query；子清单可能 403，优先用 Cookie 线路",
      playerType: "app",
      customHeaders: {
        Referer: SITE + "/",
        Origin: SITE,
        "User-Agent": HEADERS["User-Agent"],
        "X-Forward-Skip-Redirect-Probe": "1"
      }
    });
  }
  if (!list.length && grant.rawUrl) {
    list.push({
      name: "默认(可能403)",
      url: grant.rawUrl,
      description: "无签名：请配置 playProxy 并更新 worker",
      playerType: "app",
      customHeaders: {
        Referer: SITE + "/",
        Origin: SITE,
        "User-Agent": HEADERS["User-Agent"]
      }
    });
  }
  return list;
}

function mapDramaItem(d) {
  var id = d.id;
  var slug = d.slug || "";
  var linkKey = slug ? slug + "-" + id : String(id);
  var statusText = "";
  if (d.status === "completed") statusText = "全" + (d.totalEpisodes || "?") + "集";
  else if (d.totalEpisodes) statusText = "更新至" + d.totalEpisodes + "集";
  var cover = d.coverUrl || d.coverHUrl || "";
  return {
    id: String(id),
    type: "url",
    title: d.title || linkKey,
    posterPath: cover,
    coverUrl: cover,
    backdropPath: cover,
    rating: d.score != null ? Number(d.score) : undefined,
    description: statusText,
    releaseDate: (d.publishedAt || "").slice(0, 10),
    mediaType: "tv",
    link: "detail:" + linkKey
  };
}

async function fetchDramaList(c, query) {
  var pack = await httpGet(c, c.apiBase + "/dramas?" + buildQuery(query), false);
  return ((pack.body && pack.body.items) || []).map(mapDramaItem);
}

async function fetchMergedCategories(c, slugs, page) {
  var pageNum = Number(page || 1);
  var results = await Promise.all(
    slugs.map(function (slug) {
      return fetchDramaList(c, {
        category: slug,
        page: pageNum,
        pageSize: 20
      }).catch(function (e) {
        console.error("[merge]", slug, e.message || e);
        return [];
      });
    })
  );
  var seen = {};
  var out = [];
  results.forEach(function (list) {
    list.forEach(function (item) {
      if (seen[item.id]) return;
      seen[item.id] = true;
      out.push(item);
    });
  });
  if (!out.length) throw new Error("列表为空");
  return out;
}

async function loadHot(params) {
  var c = cfg(params);
  return fetchDramaList(c, {
    page: Number((params && params.page) || 1),
    pageSize: 20,
    sort: "hot"
  });
}
async function loadLatest(params) {
  var c = cfg(params);
  return fetchDramaList(c, {
    page: Number((params && params.page) || 1),
    pageSize: 20,
    sort: "latest"
  });
}
async function loadAdult(params) {
  return fetchMergedCategories(cfg(params), ["adult"], (params && params.page) || 1);
}
async function loadMoGai(params) {
  return fetchMergedCategories(cfg(params), ["mo-gai"], (params && params.page) || 1);
}
async function loadUrban(params) {
  return fetchMergedCategories(cfg(params), ["urban"], (params && params.page) || 1);
}
async function loadSuspense(params) {
  return fetchMergedCategories(cfg(params), ["suspense"], (params && params.page) || 1);
}
async function loadRomanceGroup(params) {
  return fetchMergedCategories(
    cfg(params),
    ["romance", "modern-romance", "ancient-romance", "sweet-love"],
    (params && params.page) || 1
  );
}
async function loadFantasyGroup(params) {
  return fetchMergedCategories(
    cfg(params),
    ["fantasy", "brain-hole", "xi-ju"],
    (params && params.page) || 1
  );
}
async function loadRebirthGroup(params) {
  return fetchMergedCategories(
    cfg(params),
    ["chuan-yue", "rebirth"],
    (params && params.page) || 1
  );
}
async function loadXianXiaGroup(params) {
  return fetchMergedCategories(
    cfg(params),
    ["xian-xia", "costume", "gong-dou", "wu-xia", "qi-huan"],
    (params && params.page) || 1
  );
}
async function loadYouthGroup(params) {
  return fetchMergedCategories(
    cfg(params),
    ["qing-chun", "xiao-yuan"],
    (params && params.page) || 1
  );
}
async function loadFamilyGroup(params) {
  return fetchMergedCategories(
    cfg(params),
    ["family", "tong-ju", "gui-mi", "lao-shi"],
    (params && params.page) || 1
  );
}
async function loadCounterGroup(params) {
  return fetchMergedCategories(
    cfg(params),
    ["war-god", "revenge", "counterattack", "son-in-law"],
    (params && params.page) || 1
  );
}
async function loadHorrorGroup(params) {
  return fetchMergedCategories(
    cfg(params),
    ["ling-yi", "kong-bu", "jing-song"],
    (params && params.page) || 1
  );
}
async function loadOriginalGroup(params) {
  return fetchMergedCategories(
    cfg(params),
    ["du-jia-yuan-chuang", "yuan-chuang"],
    (params && params.page) || 1
  );
}

async function search(params) {
  var c = cfg(params);
  var kw = t((params && params.keyword) || "");
  if (!kw) return [];
  return fetchDramaList(c, {
    q: kw,
    page: Number((params && params.page) || 1),
    pageSize: 20
  });
}

async function loadResource(params) {
  try {
    var c = cfg(params);
    var episodeId = parseEpisodeId(params);
    if (!episodeId) {
      throw new Error(
        "无法解析集 ID，params=" +
          JSON.stringify({
            link: params && params.link,
            id: params && params.id
          })
      );
    }
    var grant = await fetchPlayGrant(c, episodeId);
    var list = buildStreamResources(grant);
    if (!list.length) throw new Error("无可用播放地址");
    return list;
  } catch (e) {
    console.error("[loadResource]", e.message || e);
    throw e;
  }
}

async function loadDetail(link) {
  try {
    var c = cfg({});
    var key = t(String(link || "").replace(/^detail:/, ""));
    if (!key) return null;
    var pack = await httpGet(
      c,
      c.apiBase + "/dramas/" + encodeURIComponent(key),
      false
    );
    var detail = pack.body;
    if (!detail || !detail.id) return null;
    var dramaId = detail.id;
    var episodes = (detail.episodes || []).map(function (ep) {
      var epNo = ep.epNo != null ? ep.epNo : 0;
      return {
        id: String(dramaId) + "-" + String(epNo),
        type: "url",
        title: "第" + epNo + "集",
        mediaType: "tv",
        seasonNumber: 1,
        episodeNumber: Number(epNo) || 0,
        duration: ep.durationSec || undefined,
        videoUrl: "",
        link: "play:" + ep.id,
        playerType: "app"
      };
    });
    var tags = [];
    if (detail.category && detail.category.name) {
      tags.push({
        id: detail.category.slug || detail.category.name,
        title: detail.category.name
      });
    }
    var cover = detail.coverUrl || detail.coverHUrl || "";
    return {
      id: String(detail.id),
      type: "url",
      title: detail.title || key,
      posterPath: cover,
      coverUrl: cover,
      backdropPath: detail.coverHUrl || cover,
      description: detail.description || "",
      rating: detail.score != null ? Number(detail.score) : undefined,
      releaseDate: (detail.publishedAt || "").slice(0, 10),
      mediaType: "tv",
      link: "detail:" + (detail.slug || "") + "-" + detail.id,
      genreItems: tags,
      episodeItems: episodes,
      videoUrl: "",
      playerType: "app"
    };
  } catch (e) {
    console.error("[loadDetail]", e.message || e);
    throw e;
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
