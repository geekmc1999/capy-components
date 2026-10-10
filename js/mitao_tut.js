/**
 * 蜜桃视频 ForwardWidget v1.4.0
 * 源站: honeypeach.cc · HMAC 签名 API
 * 模块: 视频/短剧/擦边/动漫/国产/黑料
 * t.me/nostremby
 */
WidgetMetadata = {
  id: "forward.mitao.tut",
  title: "蜜桃视频",
  version: "1.4.0",
  requiredVersion: "0.0.1",
  description: "蜜桃视频/短剧/直播/国产/黑料 · PoW+多线路 | t.me/nostremby",
  author: "宝宝巴士",
  logo: "https://fwd.uou.qzz.io/icon.png",
  site: "https://t.me/nostremby",
  detailCacheDuration: 180,
  modules: [
    /* —— 蜜桃视频（各大类单独成栏） —— */
    {
      id: "video_new",
      title: "最近更新",
      functionName: "loadVideoNew",
      cacheDuration: 600,
      params: [{ name: "page", title: "页码", type: "page" }]
    },
    {
      id: "video_release",
      title: "新作上市",
      functionName: "loadVideoRelease",
      cacheDuration: 600,
      params: [{ name: "page", title: "页码", type: "page" }]
    },
    {
      id: "video_chinese",
      title: "中文字幕",
      functionName: "loadVideoChinese",
      cacheDuration: 600,
      params: [{ name: "page", title: "页码", type: "page" }]
    },
    {
      id: "video_madou",
      title: "麻豆传媒",
      functionName: "loadVideoMadou",
      cacheDuration: 600,
      params: [{ name: "page", title: "页码", type: "page" }]
    },
    {
      id: "video_uncensored",
      title: "无码流出",
      functionName: "loadVideoUncensored",
      cacheDuration: 600,
      params: [{ name: "page", title: "页码", type: "page" }]
    },
    {
      id: "video_hot",
      title: "热门",
      functionName: "loadVideoHot",
      cacheDuration: 600,
      params: [{ name: "page", title: "页码", type: "page" }]
    },
    /* —— 短剧 / 擦边 / 动漫 / 黑料 —— */
    {
      id: "duanju",
      title: "蜜桃短剧",
      functionName: "loadDuanju",
      cacheDuration: 600,
      params: [
        { name: "page", title: "页码", type: "page" },
        {
          name: "cat",
          title: "分类",
          type: "enumeration",
          value: "tuijian|huangguo|0",
          enumOptions: [
            { title: "推荐", value: "tuijian|huangguo|0" },
            { title: "AI成人短剧", value: "duanju|huangguo|0" },
            { title: "AI成人漫剧", value: "manju|huangguo|0" },
            { title: "AI换脸", value: "huanlian|huangguo|0" },
            { title: "AI魔改", value: "mogai|huangguo|0" },
            { title: "排行榜", value: "rank|huangguo|0" },
            { title: "黄豆精选", value: "all|huangdou|" },
            { title: "黄豆原创", value: "yuandou|huangdou|" }
          ]
        }
      ]
    },
    {
      id: "caibian",
      title: "擦边短剧",
      functionName: "loadCaibian",
      cacheDuration: 600,
      params: [
        { name: "page", title: "页码", type: "page" },
        {
          name: "cat",
          title: "分类",
          type: "enumeration",
          value: "0|huangdou|0",
          enumOptions: [
            { title: "最新", value: "0|huangdou|0" },
            { title: "推荐", value: "1|huangdou|1" },
            { title: "全部", value: "2|huangdou|2" }
          ]
        }
      ]
    },
    {
      id: "shortv",
      title: "蜜桃动漫",
      functionName: "loadShortv",
      cacheDuration: 600,
      params: [
        { name: "page", title: "页码", type: "page" },
        {
          name: "cat",
          title: "分类",
          type: "enumeration",
          value: "all|dongman|0",
          enumOptions: [
            { title: "全部", value: "all|dongman|0" },
            { title: "Hanime", value: "Hanime|dongman|0" },
            { title: "NaughtyMachinima", value: "NaughtyMachinima|dongman|0" },
            { title: "HS日本4K动漫", value: "HS日本4K动漫|dongman|0" }
          ]
        }
      ]
    },
    {
      id: "heiliao",
      title: "黑料吃瓜",
      functionName: "loadHeiliao",
      cacheDuration: 600,
      params: [
        { name: "page", title: "页码", type: "page" },
        {
          name: "cat",
          title: "分类",
          type: "enumeration",
          value: "0|huangdou|0",
          enumOptions: [
            { title: "最新", value: "0|huangdou|0" },
            { title: "推荐", value: "1|huangdou|1" }
          ]
        }
      ]
    },
    {
      id: "live",
      title: "蜜桃直播",
      functionName: "loadLive",
      cacheDuration: 120,
      params: [
        { name: "page", title: "页码", type: "page" },
        {
          name: "cat",
          title: "分类",
          type: "enumeration",
          value: "girls||",
          enumOptions: [
            { title: "女主播", value: "girls||" },
            { title: "情侣", value: "couples||" },
            { title: "男主播", value: "men||" },
            { title: "跨性别", value: "trans||" },
            { title: "中国", value: "cn||" },
            { title: "日本", value: "jp||" }
          ]
        }
      ]
    },
    {
      id: "guochan",
      title: "国产精品",
      functionName: "loadGuochan",
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

var BASE = "https://honeypeach.cc";
var UA =
  "Mozilla/5.0 (Linux; Android 13) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36";
var SEARCHABLE = ["video", "duanju", "caibian", "shortv", "guochan"];

var _sid = "";
var _skey = "";
var _exp = 0;
var _dev = "";

function t(v) {
  return String(v == null ? "" : v).trim();
}

function rnd(n) {
  n = n || 10;
  var chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  var s = "";
  for (var i = 0; i < n; i++) s += chars.charAt((Math.random() * chars.length) | 0);
  return s;
}

function absUrl(u) {
  u = t(u);
  if (!u) return "";
  if (u.indexOf("http") === 0) return u;
  if (u.charAt(0) === "/") return BASE + u;
  return BASE + "/" + u;
}

/* ---------- SHA-256 / HMAC（纯 JS，无依赖） ---------- */
function sha256Hex(msg) {
  var bytes = typeof msg === "string" ? strToBytes(msg) : msg;
  return bytesToHex(sha256Bytes(bytes));
}

function strToBytes(s) {
  var out = [];
  for (var i = 0; i < s.length; i++) {
    var c = s.charCodeAt(i);
    if (c < 0x80) out.push(c);
    else if (c < 0x800) {
      out.push(0xc0 | (c >> 6), 0x80 | (c & 0x3f));
    } else if (c < 0xd800 || c >= 0xe000) {
      out.push(0xe0 | (c >> 12), 0x80 | ((c >> 6) & 0x3f), 0x80 | (c & 0x3f));
    } else {
      i++;
      var cp = 0x10000 + (((c & 0x3ff) << 10) | (s.charCodeAt(i) & 0x3ff));
      out.push(
        0xf0 | (cp >> 18),
        0x80 | ((cp >> 12) & 0x3f),
        0x80 | ((cp >> 6) & 0x3f),
        0x80 | (cp & 0x3f)
      );
    }
  }
  return out;
}

function bytesToHex(arr) {
  var h = "";
  for (var i = 0; i < arr.length; i++) h += ("0" + (arr[i] & 0xff).toString(16)).slice(-2);
  return h;
}

function hexToBytes(hex) {
  var out = [];
  hex = t(hex);
  for (var i = 0; i < hex.length; i += 2) out.push(parseInt(hex.substr(i, 2), 16));
  return out;
}

function sha256Bytes(msgBytes) {
  function rotr(n, x) {
    return (x >>> n) | (x << (32 - n));
  }
  var K = [
    0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
    0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
    0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
    0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
    0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
    0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
    0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
    0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
  ];
  var H = [0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19];
  var l = msgBytes.length;
  var withOne = msgBytes.slice();
  withOne.push(0x80);
  while ((withOne.length % 64) !== 56) withOne.push(0);
  var bitLen = l * 8;
  for (var i = 7; i >= 0; i--) withOne.push((bitLen / Math.pow(2, 8 * i)) & 0xff);

  for (var off = 0; off < withOne.length; off += 64) {
    var w = new Array(64);
    for (var j = 0; j < 16; j++) {
      var i0 = off + j * 4;
      w[j] =
        ((withOne[i0] << 24) | (withOne[i0 + 1] << 16) | (withOne[i0 + 2] << 8) | withOne[i0 + 3]) >>> 0;
    }
    for (var j = 16; j < 64; j++) {
      var s0 = rotr(7, w[j - 15]) ^ rotr(18, w[j - 15]) ^ (w[j - 15] >>> 3);
      var s1 = rotr(17, w[j - 2]) ^ rotr(19, w[j - 2]) ^ (w[j - 2] >>> 10);
      w[j] = (w[j - 16] + s0 + w[j - 7] + s1) >>> 0;
    }
    var a = H[0],
      b = H[1],
      c = H[2],
      d = H[3],
      e = H[4],
      f = H[5],
      g = H[6],
      h = H[7];
    for (var j = 0; j < 64; j++) {
      var S1 = rotr(6, e) ^ rotr(11, e) ^ rotr(25, e);
      var ch = (e & f) ^ (~e & g);
      var t1 = (h + S1 + ch + K[j] + w[j]) >>> 0;
      var S0 = rotr(2, a) ^ rotr(13, a) ^ rotr(22, a);
      var maj = (a & b) ^ (a & c) ^ (b & c);
      var t2 = (S0 + maj) >>> 0;
      h = g;
      g = f;
      f = e;
      e = (d + t1) >>> 0;
      d = c;
      c = b;
      b = a;
      a = (t1 + t2) >>> 0;
    }
    H[0] = (H[0] + a) >>> 0;
    H[1] = (H[1] + b) >>> 0;
    H[2] = (H[2] + c) >>> 0;
    H[3] = (H[3] + d) >>> 0;
    H[4] = (H[4] + e) >>> 0;
    H[5] = (H[5] + f) >>> 0;
    H[6] = (H[6] + g) >>> 0;
    H[7] = (H[7] + h) >>> 0;
  }
  var out = [];
  for (var i = 0; i < 8; i++) {
    out.push((H[i] >>> 24) & 0xff, (H[i] >>> 16) & 0xff, (H[i] >>> 8) & 0xff, H[i] & 0xff);
  }
  return out;
}

function hmacSha256Hex(keyBytes, msgStr) {
  var block = 64;
  var key = keyBytes.slice();
  if (key.length > block) key = sha256Bytes(key);
  while (key.length < block) key.push(0);
  var oKey = [],
    iKey = [];
  for (var i = 0; i < block; i++) {
    oKey.push(key[i] ^ 0x5c);
    iKey.push(key[i] ^ 0x36);
  }
  var inner = sha256Bytes(iKey.concat(strToBytes(msgStr)));
  return bytesToHex(sha256Bytes(oKey.concat(inner)));
}

/* ---------- 会话 ---------- */
function devId() {
  if (!_dev) _dev = rnd(12) + Date.now().toString(16);
  return _dev;
}

/* ---- 站点 L3 人机挑战（与官网 hpsign.js 一致）---- */
function hpHash(s) {
  var h = 0x811c9dc5;
  for (var i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h;
}
function hpPow(chal, nonce) {
  var h = hpHash(chal + ":" + nonce);
  for (var r = 0; r < 4; r++) {
    h = hpHash((("0000000" + h.toString(16)).slice(-8)) + chal);
  }
  return ("0000000" + h.toString(16)).slice(-8);
}
function hpSolve(chal, bits) {
  bits = parseInt(bits || 16, 10) || 16;
  var want = "";
  for (var i = 0; i < (bits >> 2); i++) want += "0";
  var n = 0, nx, hx;
  while (n < 20000000) {
    nx = n.toString(16);
    hx = hpPow(chal, nx);
    if (hx.slice(0, want.length) === want) return chal + "." + nx;
    n++;
  }
  return "";
}

function parseBody(res) {
  var body = res && (res.data != null ? res.data : res);
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch (e) {
      body = {};
    }
  }
  return body || {};
}

async function handshake() {
  var q = "dev=" + encodeURIComponent(devId());
  var res = await Widget.http.get(BASE + "/api/handshake?" + q, {
    headers: { "User-Agent": UA, Accept: "application/json" }
  });
  var body = parseBody(res);
  // 需要 PoW：算完带 c=chal.nonce 再握一次
  if (body && body.need_chal) {
    var tok = hpSolve(String(body.need_chal), body.bits || 12);
    if (!tok) throw new Error("蜜桃 PoW 失败");
    res = await Widget.http.get(
      BASE + "/api/handshake?" + q + "&c=" + encodeURIComponent(tok),
      { headers: { "User-Agent": UA, Accept: "application/json" } }
    );
    body = parseBody(res);
  }
  if (body && body.sid && body.skey) {
    _sid = String(body.sid);
    _skey = String(body.skey);
    _exp = Number(body.exp || 0);
    return true;
  }
  throw new Error("蜜桃握手失败: " + (body.msg || body.err || "no sid"));
}

function rotateDev() {
  _dev = "zp" + rnd(24);
  _sid = "";
  _skey = "";
  _exp = 0;
}

function isRateLimited(body, status) {
  if (status === 429) return true;
  var err = t((body && (body.err || body.msg)) || "").toLowerCase();
  if (!err) return false;
  return (
    err.indexOf("rl_sid") >= 0 ||
    err.indexOf("rl_dev") >= 0 ||
    err.indexOf("rl_ip") >= 0 ||
    err.indexOf("rate") >= 0 ||
    err.indexOf("limit") >= 0 ||
    err.indexOf("toomany") >= 0 ||
    err.indexOf("busy") >= 0
  );
}

async function ensureSession(force) {
  var now = Date.now() / 1000;
  if (!force && _sid && _skey && now < _exp - 60) return;
  await handshake();
}

async function apiGet(path, query) {
  query = t(query);
  await ensureSession(false);
  async function once() {
    var ts = String(Math.floor(Date.now() / 1000));
    var nonce = rnd(8) + Date.now().toString(16);
    var bh = sha256Hex("");
    var canon =
      "GET\n" + path + "\n" + query + "\n" + bh + "\n" + ts + "\n" + nonce + "\n" + _sid;
    var sig = hmacSha256Hex(hexToBytes(_skey), canon);
    var url = BASE + path + (query ? "?" + query : "");
    var res = await Widget.http.get(url, {
      headers: {
        "User-Agent": UA,
        Accept: "application/json",
        "X-Hp-Sid": _sid,
        "X-Hp-Ts": ts,
        "X-Hp-Nonce": nonce,
        "X-Hp-Sign": sig,
        Referer: BASE + "/"
      }
    });
    var body = res && (res.data != null ? res.data : res);
    var status = res && res.status != null ? res.status : 200;
    if (typeof body === "string") {
      try {
        body = JSON.parse(body);
      } catch (e) {
        body = {};
      }
    }
    return { status: status, data: body || {} };
  }
  var r = await once();
  // 401 / 签名过期 → 重握手
  if (r.status === 401) {
    await ensureSession(true);
    r = await once();
  }
  // 限流 → 换设备号重新握手再试一次
  if (isRateLimited(r.data, r.status)) {
    rotateDev();
    await ensureSession(true);
    r = await once();
  }
  return r.data;
}

/* ---------- 列表映射 ---------- */
function mapItem(it, key, src, sub) {
  if (!it || it.id == null) return null;
  var iid = String(it.id);
  var s = t(it.src || src || "");
  var title = t(it.title || iid);
  // 片名写进 link，详情不依赖内存、不串台（同花都）
  var link =
    "mt://" +
    encodeURIComponent(key) +
    "|" +
    encodeURIComponent(iid) +
    "|" +
    encodeURIComponent(s) +
    "|" +
    encodeURIComponent(t(sub || "")) +
    "||" +
    encodeURIComponent(title);
  return {
    id: link,
    type: "url",
    title: title,
    name: title,
    description: t(it.remark || ""),
    mediaType: "movie",
    link: link,
    coverUrl: absUrl(it.cover || ""),
    posterPath: absUrl(it.cover || ""),
    backdropPath: absUrl(it.cover || "")
  };
}

function parseLink(link) {
  var listTitle = "";
  if (link && typeof link === "object") {
    listTitle = t(link.title || link.name || "");
    link = link.link || link.id || "";
  }
  link = t(link).replace(/^mt:\/\//, "");
  // 嵌入片名: ...||title
  var emb = "";
  var di = link.indexOf("||");
  if (di >= 0) {
    emb = link.slice(di + 2);
    link = link.slice(0, di);
    try {
      emb = decodeURIComponent(emb);
    } catch (e) {}
  }
  var parts = link.split("|");
  return {
    key: safeDec(parts[0]),
    id: safeDec(parts[1]),
    src: safeDec(parts[2]),
    sub: safeDec(parts[3]),
    ep: safeDec(parts[4]) || "1",
    listTitle: listTitle || emb || ""
  };
}
function safeDec(v) {
  v = t(v);
  if (!v) return "";
  try {
    return decodeURIComponent(v);
  } catch (e) {
    return v;
  }
}

/** cat 参数格式: code|src|sub */
function parseCatParam(raw, fallback) {
  raw = t(raw || fallback || "");
  var parts = raw.split("|");
  return {
    cat: t(parts[0] || ""),
    src: t(parts[1] || ""),
    sub: t(parts[2] || "")
  };
}

async function loadModule(key, params, fallbackCat) {
  params = params || {};
  var page = parseInt(params.page, 10) || 1;
  var pc = parseCatParam(params.cat, fallbackCat);
  if (!pc.cat) pc = parseCatParam(fallbackCat, "new|missav|");
  var q =
    "key=" +
    encodeURIComponent(key) +
    "&cat=" +
    encodeURIComponent(pc.cat) +
    "&page=" +
    page;
  if (pc.src) q += "&src=" + encodeURIComponent(pc.src);
  if (pc.sub !== "") q += "&sub=" + encodeURIComponent(pc.sub);
  var data = await apiGet("/api/module", q);
  var list = [];
  var rows = (data && data.list) || [];
  for (var i = 0; i < rows.length; i++) {
    var v = mapItem(rows[i], key, pc.src, pc.sub);
    if (v) list.push(v);
  }
  return list;
}

/* 视频各大类：独立 module，固定 cat|src，无二级 enum */
async function loadVideoNew(params) {
  return loadModule("video", Object.assign({}, params, { cat: "new|missav|" }), "new|missav|");
}
async function loadVideoRelease(params) {
  return loadModule("video", Object.assign({}, params, { cat: "release|missav|" }), "release|missav|");
}
async function loadVideoChinese(params) {
  return loadModule("video", Object.assign({}, params, { cat: "chinese-subtitle|missav|" }), "chinese-subtitle|missav|");
}
async function loadVideoMadou(params) {
  return loadModule("video", Object.assign({}, params, { cat: "madou|missav|" }), "madou|missav|");
}
async function loadVideoUncensored(params) {
  return loadModule("video", Object.assign({}, params, { cat: "uncensored-leak|missav|" }), "uncensored-leak|missav|");
}
async function loadVideoHot(params) {
  return loadModule("video", Object.assign({}, params, { cat: "monthly-hot|missav|" }), "monthly-hot|missav|");
}
async function loadDuanju(params) {
  return loadModule("duanju", params, "tuijian|huangguo|0");
}
async function loadCaibian(params) {
  return loadModule("caibian", params, "0|huangdou|0");
}
async function loadShortv(params) {
  return loadModule("shortv", params, "all|dongman|0");
}
async function loadHeiliao(params) {
  return loadModule("heiliao", params, "0|huangdou|0");
}
async function loadLive(params) {
  return loadModule("live", params, "girls||");
}
async function loadGuochan(params) {
  return loadModule("guochan", params, "||");
}

async function search(params) {
  params = params || {};
  var kw = t(params.keyword || params.wd || params.q);
  if (!kw) return [];
  var page = parseInt(params.page, 10) || 1;
  var out = [];
  var seen = {};
  for (var i = 0; i < SEARCHABLE.length; i++) {
    var mod = SEARCHABLE[i];
    try {
      var data = await apiGet(
        "/api/search",
        "key=" + encodeURIComponent(mod) + "&kw=" + encodeURIComponent(kw) + "&page=" + page
      );
      var rows = (data && data.list) || [];
      for (var j = 0; j < rows.length; j++) {
        var v = mapItem(rows[j], mod, "", "");
        if (v && !seen[v.id]) {
          seen[v.id] = 1;
          out.push(v);
        }
      }
    } catch (e) {}
  }
  return out;
}

async function loadDetail(link) {
  var p = parseLink(link);
  if (!p.key || !p.id) throw new Error("缺少 id");
  // 列表带进的片名最优先（花都同款，防详情串台）
  var listTitle = t(p.listTitle || "");
  if (!listTitle && link && typeof link === "object") {
    listTitle = t(link.title || link.name || "");
  }

  var params = [];
  if (p.src) params.push("src=" + encodeURIComponent(p.src));
  if (p.sub) params.push("sub=" + encodeURIComponent(p.sub));
  var q = params.join("&");
  var data = await apiGet(
    "/api/detail/" + encodeURIComponent(p.key) + "/" + encodeURIComponent(p.id),
    q
  );
  var det = (data && data.detail) || null;
  if (!det) throw new Error("详情为空");

  var apiTitle = t(det.title || "");
  // 始终优先列表标题
  var title = listTitle || apiTitle || p.id;
  var cover = absUrl(det.cover || "");
  var desc = t(det.desc || "");
  var remarks = det.ep_count ? "共" + det.ep_count + "集" : t(det.date || "");
  var eps = det.episodes || [];
  if (!eps.length) eps = [{ ep: 1, name: "正片" }];

  var baseLink =
    "mt://" +
    encodeURIComponent(p.key) +
    "|" +
    encodeURIComponent(p.id) +
    "|" +
    encodeURIComponent(p.src) +
    "|" +
    encodeURIComponent(p.sub) +
    "||" +
    encodeURIComponent(title);

  var childItems = [];
  for (var i = 0; i < eps.length; i++) {
    var e = eps[i] || {};
    var ep = String(e.ep != null ? e.ep : i + 1);
    var epName = t(e.name || "").replace(/[$#]/g, " ");
    // 单集用正片名；多集：正片名 + 第N集（App 常用第一集 title 当详情标题）
    if (eps.length === 1) {
      epName = title;
    } else {
      if (!epName || epName === "正片" || epName === "播放") {
        epName = title + " 第" + ep + "集";
      } else if (epName.indexOf(title) !== 0) {
        epName = title + " " + epName;
      }
    }
    var elink =
      "mt://" +
      encodeURIComponent(p.key) +
      "|" +
      encodeURIComponent(p.id) +
      "|" +
      encodeURIComponent(p.src) +
      "|" +
      encodeURIComponent(p.sub) +
      "|" +
      encodeURIComponent(ep) +
      "||" +
      encodeURIComponent(title);
    childItems.push({
      id: elink,
      type: "url",
      title: epName,
      name: epName,
      mediaType: "movie",
      seasonNumber: 1,
      episodeNumber: parseInt(ep, 10) || i + 1,
      link: elink
    });
  }

  return {
    id: baseLink,
    type: "url",
    title: title,
    name: title,
    vod_name: title,
    originalTitle: title,
    description: [remarks, desc].filter(Boolean).join("\n"),
    mediaType: "movie",
    link: baseLink,
    coverUrl: cover,
    posterPath: cover,
    backdropPath: cover,
    episodeItems: childItems,
    childItems: childItems
  };
}

async function loadResource(params) {
  params = params || {};
  var raw = t(params.link || params.id || "");
  if (!raw && params.item) raw = t(params.item.link || params.item.id || "");
  var p = parseLink(raw);
  if (!p.key || !p.id) return [];
  var ep = p.ep || "1";
  var qs = [];
  if (p.src) qs.push("src=" + encodeURIComponent(p.src));
  if (p.sub) qs.push("sub=" + encodeURIComponent(p.sub));
  var data = await apiGet(
    "/api/play/" +
      encodeURIComponent(p.key) +
      "/" +
      encodeURIComponent(p.id) +
      "/" +
      encodeURIComponent(ep),
    qs.join("&")
  );
  var pl = (data && data.play) || {};
  if (pl.locked) return [];
  var src = t(pl.src || "");
  var proxy = t(pl.src_proxy || "");
  var hdrs = { "User-Agent": UA, Referer: BASE + "/" };
  var lines = [];
  if (src) {
    lines.push({
      name: "线路一·直连",
      description: t(pl.type || "直链"),
      url: absUrl(src),
      playerType: "app",
      customHeaders: hdrs
    });
  }
  if (proxy) {
    lines.push({
      name: "线路二·中转",
      description: "站内中转",
      url: absUrl(proxy),
      playerType: "app",
      customHeaders: hdrs
    });
  }
  return lines;
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
