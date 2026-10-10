/**
 * 野果短剧 ForwardWidget
 * 站点: https://yeguodj.com
 * API: https://www.yeguodj.com/api.php/api/... （AES-CBC 响应）
 * 封面: pic.ndhixj.cn AES 密文，走解密代理
 * 宣传: https://t.me/nostremby
 */
WidgetMetadata = {
  id: "forward.yeguodj.tut",
  title: "野果短剧",
  version: "1.0.5",
  requiredVersion: "0.0.1",
  description: "野果短剧：发现/排行/分类/搜索/分集 · 封面需解密代理 | 宝宝巴士乐园 t.me/nostremby",
  author: "宝宝巴士",
  site: "https://t.me/nostremby",
  detailCacheDuration: 180,
  globalParams: [
    {
      name: "apiBase",
      title: "API 地址",
      type: "input",
      value: "https://www.yeguodj.com/api.php"
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
    { id: "home", title: "首页推荐", functionName: "loadHome", cacheDuration: 300, params: [{ name: "page", title: "页码", type: "page" }] },
    { id: "explore", title: "发现", functionName: "loadExplore", cacheDuration: 300, params: [{ name: "page", title: "页码", type: "page" }] },
    { id: "rank", title: "排行榜", functionName: "loadRank", cacheDuration: 300, params: [{ name: "page", title: "页码", type: "page" }] },
    { id: "dushi", title: "都市", functionName: "loadDushi", cacheDuration: 300, params: [{ name: "page", title: "页码", type: "page" }] },
    { id: "xiandai", title: "现代", functionName: "loadXiandai", cacheDuration: 300, params: [{ name: "page", title: "页码", type: "page" }] },
    { id: "xiaoyuan", title: "校园", functionName: "loadXiaoyuan", cacheDuration: 300, params: [{ name: "page", title: "页码", type: "page" }] },
    { id: "gudai", title: "古代", functionName: "loadGudai", cacheDuration: 300, params: [{ name: "page", title: "页码", type: "page" }] },
    { id: "xiangcun", title: "乡村", functionName: "loadXiangcun", cacheDuration: 300, params: [{ name: "page", title: "页码", type: "page" }] },
    { id: "zhichang", title: "职场", functionName: "loadZhichang", cacheDuration: 300, params: [{ name: "page", title: "页码", type: "page" }] },
    { id: "chongsheng", title: "重生", functionName: "loadChongsheng", cacheDuration: 300, params: [{ name: "page", title: "页码", type: "page" }] },
    { id: "chuanyue", title: "穿越", functionName: "loadChuanyue", cacheDuration: 300, params: [{ name: "page", title: "页码", type: "page" }] },
    { id: "xitong", title: "系统", functionName: "loadXitong", cacheDuration: 300, params: [{ name: "page", title: "页码", type: "page" }] },
    { id: "nixi", title: "逆袭", functionName: "loadNixi", cacheDuration: 300, params: [{ name: "page", title: "页码", type: "page" }] },
    { id: "mogai", title: "魔改", functionName: "loadMogai", cacheDuration: 300, params: [{ name: "page", title: "页码", type: "page" }] },
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

var API_KEY = "2acf7e91e9864673";
var API_IV = "1c29882d3ddfcfd6";
var MEDIA_KEY = "f5d965df75336270";
var MEDIA_IV = "97b60394abc2fbe1";
var UA =
  "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15";

function t(v) {
  return String(v == null ? "" : v).trim();
}

function cfg(params) {
  params = params || {};
  return {
    apiBase: t(params.apiBase || "https://www.yeguodj.com/api.php").replace(
      /\/+$/,
      ""
    ),
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


/** UTF-8 / Base64 helpers (no TextEncoder) */
function strToBytes(str) {
  var out = [];
  for (var i = 0; i < str.length; i++) {
    var c = str.charCodeAt(i);
    if (c < 0x80) out.push(c);
    else if (c < 0x800) out.push(0xc0 | (c >> 6), 0x80 | (c & 0x3f));
    else if (c < 0xd800 || c >= 0xe000) {
      out.push(0xe0 | (c >> 12), 0x80 | ((c >> 6) & 0x3f), 0x80 | (c & 0x3f));
    } else {
      i++;
      var c2 = 0x10000 + (((c & 0x3ff) << 10) | (str.charCodeAt(i) & 0x3ff));
      out.push(0xf0 | (c2 >> 18), 0x80 | ((c2 >> 12) & 0x3f), 0x80 | ((c2 >> 6) & 0x3f), 0x80 | (c2 & 0x3f));
    }
  }
  return out;
}
function bytesToStr(bytes) {
  var out = "", i = 0;
  while (i < bytes.length) {
    var c = bytes[i++];
    if (c < 0x80) out += String.fromCharCode(c);
    else if (c < 0xe0) out += String.fromCharCode(((c & 0x1f) << 6) | (bytes[i++] & 0x3f));
    else if (c < 0xf0) {
      out += String.fromCharCode(((c & 0x0f) << 12) | ((bytes[i++] & 0x3f) << 6) | (bytes[i++] & 0x3f));
    } else {
      var cp = ((c & 0x07) << 18) | ((bytes[i++] & 0x3f) << 12) | ((bytes[i++] & 0x3f) << 6) | (bytes[i++] & 0x3f);
      cp -= 0x10000;
      out += String.fromCharCode(0xd800 + (cp >> 10), 0xdc00 + (cp & 0x3ff));
    }
  }
  return out;
}
function bytesToB64(bytes) {
  var table = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var out = "";
  var i = 0;
  while (i < bytes.length) {
    var a = bytes[i++] | 0;
    var b = i < bytes.length ? bytes[i++] : NaN;
    var c = i < bytes.length ? bytes[i++] : NaN;
    var n = (a << 16) | ((isNaN(b) ? 0 : b) << 8) | (isNaN(c) ? 0 : c);
    out += table.charAt((n >> 18) & 63);
    out += table.charAt((n >> 12) & 63);
    out += isNaN(b) ? "=" : table.charAt((n >> 6) & 63);
    out += isNaN(c) ? "=" : table.charAt(n & 63);
  }
  return out;
}

function isPlainImageBytes(bytes) {
  if (!bytes || bytes.length < 3) return false;
  if (bytes[0] === 0xff && bytes[1] === 0xd8) return true; // jpeg
  if (bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e) return true; // png
  if (bytes[0] === 0x47 && bytes[1] === 0x49 && bytes[2] === 0x46) return true; // gif
  return false;
}

/** 拉取加密封面并 AES 解密为 data URL（不依赖外部代理） */
async function decryptCoverDataUrl(url) {
  url = t(url);
  if (!url) return "";
  if (url.indexOf("data:image") === 0) return url;
  try {
    var res = await Widget.http.get(url, {
      headers: {
        Accept: "image/*,*/*;q=0.8",
        "User-Agent": UA,
        Referer: "https://yeguodj.com/",
        Origin: "https://yeguodj.com"
      },
      base64Data: 1
    });
    var raw = res && res.data;
    var cipherBytes = [];
    if (typeof raw === "string") {
      // 可能是 base64 或 普通文本
      if (/^data:/.test(raw)) return raw;
      var cleaned = raw.replace(/^data:[^;]+;base64,/, "");
      // 粗判 base64
      if (/^[A-Za-z0-9+/=\s]+$/.test(cleaned.slice(0, 80))) {
        cipherBytes = b64ToBytes(cleaned);
      } else {
        // 当普通二进制字符串
        for (var i = 0; i < raw.length; i++) cipherBytes.push(raw.charCodeAt(i) & 0xff);
      }
    } else if (raw && raw.length != null) {
      for (var j = 0; j < raw.length; j++) cipherBytes.push(raw[j] & 0xff);
    } else {
      return "";
    }
    var plain = cipherBytes;
    if (!isPlainImageBytes(cipherBytes)) {
      // AES-CBC 解密（复用块解密）
      var keyBytes = strToBytes(MEDIA_KEY);
      var ivBytes = strToBytes(MEDIA_IV);
      while (keyBytes.length < 16) keyBytes.push(0);
      while (ivBytes.length < 16) ivBytes.push(0);
      keyBytes = keyBytes.slice(0, 16);
      ivBytes = ivBytes.slice(0, 16);
      var w = keyExpansion(keyBytes);
      var prev = ivBytes.slice();
      plain = [];
      for (var off = 0; off + 16 <= cipherBytes.length; off += 16) {
        var block = cipherBytes.slice(off, off + 16);
        var dec = decryptBlock(block, w);
        for (var k = 0; k < 16; k++) plain.push(dec[k] ^ prev[k]);
        prev = block;
      }
      if (plain.length) {
        var pad = plain[plain.length - 1];
        if (pad >= 1 && pad <= 16) plain = plain.slice(0, plain.length - pad);
      }
    }
    if (!isPlainImageBytes(plain)) return "";
    var mime = "image/jpeg";
    if (plain[0] === 0x89) mime = "image/png";
    if (plain[0] === 0x47) mime = "image/gif";
    return "data:" + mime + ";base64," + bytesToB64(plain);
  } catch (e) {
    return "";
  }
}

async function hydrateCovers(c, items) {
  if (!items || !items.length) return items;
  // 并发解密封面（限制 6）
  var i = 0;
  async function worker() {
    while (i < items.length) {
      var idx = i++;
      var it = items[idx];
      var src = t(it._encCover || "");
      if (!src && it.coverUrl && it.coverUrl.indexOf("http") === 0 && it.coverUrl.indexOf("huangguo") < 0 && it.coverUrl.indexOf("data:") !== 0) {
        src = it.coverUrl;
      }
      // 若 coverUrl 已是代理地址，抽出原 url
      if (src && src.indexOf("url=") >= 0) {
        try {
          var m = src.match(/[?&]url=([^&]+)/);
          if (m) src = decodeURIComponent(m[1]);
        } catch (e) {}
      }
      if (!src) continue;
      var dataUrl = await decryptCoverDataUrl(src);
      if (dataUrl) {
        it.coverUrl = dataUrl;
        it.posterPath = dataUrl;
        it.backdropPath = dataUrl;
      }
    }
  }
  var n = Math.min(6, items.length);
  var jobs = [];
  for (var k = 0; k < n; k++) jobs.push(worker());
  await Promise.all(jobs);
  return items;
}

function b64ToBytes(b64) {
  b64 = String(b64 || "").replace(/[\r\n\s]/g, "").replace(/-/g, "+").replace(/_/g, "/");
  while (b64.length % 4) b64 += "=";
  var table = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var out = [];
  for (var i = 0; i < b64.length; i += 4) {
    var c1 = table.indexOf(b64.charAt(i));
    var c2 = table.indexOf(b64.charAt(i + 1));
    var c3 = table.indexOf(b64.charAt(i + 2));
    var c4 = table.indexOf(b64.charAt(i + 3));
    if (c1 < 0 || c2 < 0) continue;
    out.push(((c1 << 2) | (c2 >> 4)) & 0xff);
    if (c3 >= 0) out.push((((c2 & 15) << 4) | (c3 >> 2)) & 0xff);
    if (c4 >= 0) out.push((((c3 & 3) << 6) | c4) & 0xff);
  }
  return out;
}

var SBOX = [99,124,119,123,242,107,111,197,48,1,103,43,254,215,171,118,202,130,201,125,250,89,71,240,173,212,162,175,156,164,114,192,183,253,147,38,54,63,247,204,52,165,229,241,113,216,49,21,4,199,35,195,24,150,5,154,7,18,128,226,235,39,178,117,9,131,44,26,27,110,90,160,82,59,214,179,41,227,47,132,83,209,0,237,32,252,177,91,106,203,190,57,74,76,88,207,208,239,170,251,67,77,51,133,69,249,2,127,80,60,159,168,81,163,64,143,146,157,56,245,188,182,218,33,16,255,243,210,205,12,19,236,95,151,68,23,196,167,126,61,100,93,25,115,96,129,79,220,34,42,144,136,70,238,184,20,222,94,11,219,224,50,58,10,73,6,36,92,194,211,172,98,145,149,228,121,231,200,55,109,141,213,78,169,108,86,244,234,101,122,174,8,186,120,37,46,28,166,180,198,232,221,116,31,75,189,139,138,112,62,181,102,72,3,246,14,97,53,87,185,134,193,29,158,225,248,152,17,105,217,142,148,155,30,135,233,206,85,40,223,140,161,137,13,191,230,66,104,65,153,45,15,176,84,187,22];
var INV_SBOX = [82,9,106,213,48,54,165,56,191,64,163,158,129,243,215,251,124,227,57,130,155,47,255,135,52,142,67,68,196,222,233,203,84,123,148,50,166,194,35,61,238,76,149,11,66,250,195,78,8,46,161,102,40,217,36,178,118,91,162,73,109,139,209,37,114,248,246,100,134,104,152,22,212,164,92,204,93,101,182,146,108,112,72,80,253,237,185,218,94,21,70,87,167,141,157,132,144,216,171,0,140,188,211,10,247,228,88,5,184,179,69,6,208,44,30,143,202,63,15,2,193,175,189,3,1,19,138,107,58,145,17,65,79,103,220,234,151,242,207,206,240,180,230,115,150,172,116,34,231,173,53,133,226,249,55,232,28,117,223,110,71,241,26,113,29,41,197,137,111,183,98,14,170,24,190,27,252,86,62,75,198,210,121,32,154,219,192,254,120,205,90,244,31,221,168,51,136,7,199,49,177,18,16,89,39,128,236,95,96,81,127,169,25,181,74,13,45,229,122,159,147,201,156,239,160,224,59,77,174,42,245,176,200,235,187,60,131,83,153,97,23,43,4,126,186,119,214,38,225,105,20,99,85,33,12,125];

var RCON = [0x00,0x01,0x02,0x04,0x08,0x10,0x20,0x40,0x80,0x1b,0x36];

function rotWord(w) { return [w[1], w[2], w[3], w[0]]; }
function subWord(w) { return [SBOX[w[0]], SBOX[w[1]], SBOX[w[2]], SBOX[w[3]]]; }

function keyExpansion(keyBytes) {
  var Nk = 4, Nr = 10, w = [];
  for (var i = 0; i < Nk; i++) w[i] = [keyBytes[4*i], keyBytes[4*i+1], keyBytes[4*i+2], keyBytes[4*i+3]];
  for (var i = Nk; i < 4 * (Nr + 1); i++) {
    var temp = w[i - 1].slice();
    if (i % Nk === 0) {
      temp = subWord(rotWord(temp));
      temp[0] ^= RCON[i / Nk];
    }
    w[i] = [w[i-Nk][0]^temp[0], w[i-Nk][1]^temp[1], w[i-Nk][2]^temp[2], w[i-Nk][3]^temp[3]];
  }
  return w;
}
function addRoundKey(state, w, round) {
  for (var c = 0; c < 4; c++)
    for (var r = 0; r < 4; r++) state[r][c] ^= w[round * 4 + c][r];
}
function invSubBytes(state) {
  for (var r = 0; r < 4; r++)
    for (var c = 0; c < 4; c++) state[r][c] = INV_SBOX[state[r][c]];
}
function invShiftRows(state) {
  var t;
  t = state[1][3]; state[1][3]=state[1][2]; state[1][2]=state[1][1]; state[1][1]=state[1][0]; state[1][0]=t;
  t = state[2][0]; var t2 = state[2][1]; state[2][0]=state[2][2]; state[2][1]=state[2][3]; state[2][2]=t; state[2][3]=t2;
  t = state[3][0]; state[3][0]=state[3][1]; state[3][1]=state[3][2]; state[3][2]=state[3][3]; state[3][3]=t;
}
function mul(a, b) {
  var r = 0;
  for (var i = 0; i < 8; i++) {
    if (b & 1) r ^= a;
    var hi = a & 0x80;
    a = (a << 1) & 0xff;
    if (hi) a ^= 0x1b;
    b >>= 1;
  }
  return r & 0xff;
}
function invMixColumns(state) {
  for (var c = 0; c < 4; c++) {
    var a0 = state[0][c], a1 = state[1][c], a2 = state[2][c], a3 = state[3][c];
    state[0][c] = mul(a0,0x0e)^mul(a1,0x0b)^mul(a2,0x0d)^mul(a3,0x09);
    state[1][c] = mul(a0,0x09)^mul(a1,0x0e)^mul(a2,0x0b)^mul(a3,0x0d);
    state[2][c] = mul(a0,0x0d)^mul(a1,0x09)^mul(a2,0x0e)^mul(a3,0x0b);
    state[3][c] = mul(a0,0x0b)^mul(a1,0x0d)^mul(a2,0x09)^mul(a3,0x0e);
  }
}
function decryptBlock(input, w) {
  var state = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
  for (var i = 0; i < 16; i++) state[i % 4][(i / 4) | 0] = input[i];
  addRoundKey(state, w, 10);
  for (var round = 9; round >= 1; round--) {
    invShiftRows(state); invSubBytes(state); addRoundKey(state, w, round); invMixColumns(state);
  }
  invShiftRows(state); invSubBytes(state); addRoundKey(state, w, 0);
  var out = [];
  for (var i = 0; i < 16; i++) out.push(state[i % 4][(i / 4) | 0]);
  return out;
}
function aesCbcDecryptBase64(b64, keyStr, ivStr) {
  var cipherBytes = b64ToBytes(b64);
  var keyBytes = strToBytes(keyStr);
  var ivBytes = strToBytes(ivStr);
  while (keyBytes.length < 16) keyBytes.push(0);
  while (ivBytes.length < 16) ivBytes.push(0);
  keyBytes = keyBytes.slice(0, 16);
  ivBytes = ivBytes.slice(0, 16);
  var w = keyExpansion(keyBytes);
  var prev = ivBytes.slice();
  var plain = [];
  for (var off = 0; off + 16 <= cipherBytes.length; off += 16) {
    var block = cipherBytes.slice(off, off + 16);
    var dec = decryptBlock(block, w);
    for (var i = 0; i < 16; i++) plain.push(dec[i] ^ prev[i]);
    prev = block;
  }
  if (plain.length) {
    var pad = plain[plain.length - 1];
    if (pad >= 1 && pad <= 16) plain = plain.slice(0, plain.length - pad);
  }
  return bytesToStr(plain);
}


async function apiPost(c, path, body) {
  var url = c.apiBase + path;
  var headers = {
    Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json",
    "User-Agent": UA,
    Referer: "https://yeguodj.com/",
    Origin: "https://yeguodj.com"
  };
  var payload = body || {};
  var res;
  if (Widget.http.post) {
    try {
      res = await Widget.http.post(url, payload, { headers: headers });
    } catch (e1) {
      res = null;
    }
  }
  if (!res && Widget.http.request) {
    res = await Widget.http.request({
      url: url,
      method: "POST",
      headers: headers,
      body: JSON.stringify(payload)
    });
  }
  if (!res) {
    // 部分接口也支持 GET
    res = await Widget.http.get(url + qs(payload), { headers: headers });
  }
  var d = res && res.data;
  if (typeof d === "string") {
    try {
      d = JSON.parse(d);
    } catch (e) {}
  }
  if (!d) throw new Error("空响应: " + path);
  // 加密 data 字段
  if (typeof d.data === "string" && d.data.length > 20) {
    try {
      var plain = aesCbcDecryptBase64(d.data, API_KEY, API_IV);
      d.data = JSON.parse(plain);
    } catch (e) {
      throw new Error("API 解密失败: " + (e && e.message));
    }
  }
  return d;
}

function unwrap(d) {
  if (!d) return {};
  var x = d.data != null ? d.data : d;
  if (x && x.data != null && typeof x.data === "object") return x.data;
  return x;
}

function proxiedCover(c, url) {
  url = t(url);
  if (!url) return "";
  // 野果封面为 AES 密文，必须走解密代理，否则 App 无法显示
  if (!c.coverProxy) return url;
  var base = c.coverProxy.replace(/\/+$/, "");
  var q = { url: url };
  if (c.coverToken) q.token = c.coverToken;
  // https://host/?url=...&token=...
  return base + "/" + qs(q);
}

function toItem(c, it) {
  if (!it) return null;
  var id = t(it.video_id != null ? it.video_id : it.id);
  if (!id) return null;
  var title = t(it.title || it.video_title || it.name);
  var cover = proxiedCover(c, t(it.cover || it.cover_img || it.pic || ""));
  var ep = it.episode_count || it.episodes || it.total_serial || "";
  var remark = t(it.update_status || it.serialize_status_text || "");
  if (!remark && ep) remark = "更新至" + ep + "集";
  return {
    id: "yeguo:" + id,
    type: "url",
    title: title || id,
    coverUrl: cover,
    posterPath: cover,
    backdropPath: cover,
    description: remark,
    mediaType: "tv",
    link: "yeguo:" + id
  };
}

function listFromPayload(c, data) {
  var inner = unwrap({ data: data });
  var arr =
    (inner && inner.list) ||
    (inner && inner.top_list) ||
    (Array.isArray(inner) ? inner : []);
  var out = [];
  for (var i = 0; i < arr.length; i++) {
    var item = toItem(c, arr[i]);
    if (item) out.push(item);
  }
  return out;
}

async function listFromPayloadHydrated(c, data) {
  var out = listFromPayload(c, data);
  return out;
}

async function loadExplore(params) {
  params = params || {};
  var c = cfg(params);
  var page = Number(params.page || 1) || 1;
  var d = await apiPost(c, "/api/theater/exploreList", {
    page: page,
    limit: 24
  });
  return listFromPayload(c, d.data);
}

async function loadRank(params) {
  params = params || {};
  var c = cfg(params);
  var page = Number(params.page || 1) || 1;
  var d = await apiPost(c, "/api/theater/videoRank", {
    page: page,
    limit: 24
  });
  return listFromPayload(c, d.data);
}

async function loadHome(params) {
  params = params || {};
  var c = cfg(params);
  var page = Number(params.page || 1) || 1;
  if (page > 1) return loadExplore(params);
  var d = await apiPost(c, "/api/home/homePage", {});
  var inner = unwrap(d);
  var list = (inner && inner.top_list) || [];
  // 合并 modules.list 里的条目
  var mods = (inner && inner.modules && inner.modules.list) || [];
  for (var i = 0; i < mods.length; i++) {
    var m = mods[i];
    if (m && Array.isArray(m.list)) list = list.concat(m.list);
    else if (m && m.video_id) list.push(m);
  }
  var seen = {};
  var out = [];
  for (var j = 0; j < list.length; j++) {
    var it = toItem(c, list[j]);
    if (!it || seen[it.id]) continue;
    seen[it.id] = 1;
    out.push(it);
  }
  return out;
}

async function loadByBackground(params, bg) {
  params = params || {};
  var c = cfg(params);
  var page = Number(params.page || 1) || 1;
  var body = { page: page, limit: 24 };
  if (bg != null) body.background = bg;
  var d = await apiPost(c, "/api/theater/exploreList", body);
  return listFromPayload(c, d.data);
}

async function loadBySetting(params, setting) {
  params = params || {};
  var c = cfg(params);
  var page = Number(params.page || 1) || 1;
  var body = { page: page, limit: 24, setting: setting };
  var d = await apiPost(c, "/api/theater/exploreList", body);
  return listFromPayload(c, d.data);
}

async function loadDushi(params) {
  return loadByBackground(params, 40);
}
async function loadXiandai(params) {
  return loadByBackground(params, 39);
}
async function loadXiaoyuan(params) {
  return loadByBackground(params, 47);
}
async function loadGudai(params) {
  return loadByBackground(params, 41);
}
async function loadXiangcun(params) {
  return loadByBackground(params, 42);
}
async function loadZhichang(params) {
  return loadByBackground(params, 44);
}
async function loadChongsheng(params) {
  return loadBySetting(params, 26);
}
async function loadChuanyue(params) {
  return loadBySetting(params, 27);
}
async function loadXitong(params) {
  return loadBySetting(params, 28);
}
async function loadNixi(params) {
  return loadBySetting(params, 53);
}
async function loadMogai(params) {
  return loadBySetting(params, 56);
}

async function search(params) {
  params = params || {};
  var c = cfg(params);
  var kw = t(params.keyword);
  if (!kw) return [];
  var page = Number(params.page || 1) || 1;
  var d = await apiPost(c, "/api/search/result", {
    keyword: kw,
    page: page
  });
  return listFromPayload(c, d.data);
}

function parseLink(link) {
  var s = t(link).replace(/^yeguodj:/, "yeguo:");
  if (s.indexOf("yeguo:") === 0) s = s.slice(6);
  // 格式: videoId  或  videoId:sort  或  videoId:sort:episodeId
  var parts = s.split(":");
  return {
    id: t(parts[0]),
    ep: t(parts[1] || ""),
    episodeId: t(parts[2] || "")
  };
}

async function loadDetail(link) {
  var p = parseLink(link);
  if (!p.id) return null;
  var c = cfg({});
  var d = await apiPost(c, "/api/playlet/detail", { video_id: Number(p.id) || p.id });
  var info = unwrap(d);
  // detail 也可能再包一层
  if (info.video_id == null && info.data) info = info.data;
  var cover = proxiedCover(c, t(info.cover || info.cover_img || ""));
  var eps = Array.isArray(info.episodes) ? info.episodes : [];
  var episodeItems = [];
  if (eps.length) {
    for (var i = 0; i < eps.length; i++) {
      var ep = eps[i];
      var n = ep.sort || ep.episode || i + 1;
      // 必须带上 episode 的真实 id，播放接口认 episode_id，不认集序号
      var eid = t(ep.id || ep.episode_id || "");
      var epLink = "yeguo:" + p.id + ":" + n + (eid ? ":" + eid : "");
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
      id: "yeguo:" + p.id + ":1",
      type: "url",
      title: "第1集",
      mediaType: "tv",
      seasonNumber: 1,
      episodeNumber: 1,
      link: "yeguo:" + p.id + ":1",
      videoUrl: "",
      playerType: "app"
    });
  }
  return {
    id: "yeguo:" + p.id,
    type: "url",
    title: t(info.title || p.id),
    coverUrl: cover,
    posterPath: cover,
    backdropPath: cover,
    description: t(info.description || info.intro || ""),
    mediaType: "tv",
    link: "yeguo:" + p.id,
    episodeItems: episodeItems
  };
}

async function loadResource(params) {
  params = params || {};
  var c = cfg(params);
  var p = parseLink(t(params.link || params.id || ""));
  if (!p.id) return [];
  var ep = p.ep || t(params.episode) || t(params.episodeNumber) || "1";
  var episodeId = p.episodeId || "";

  // 若只有集序号没有 episodeId，从详情反查真实 id（接口必须用 episode_id）
  if (!episodeId) {
    try {
      var det = await apiPost(c, "/api/playlet/detail", {
        video_id: Number(p.id) || p.id
      });
      var info0 = unwrap(det);
      if (info0.video_id == null && info0.data) info0 = info0.data;
      var eps0 = Array.isArray(info0.episodes) ? info0.episodes : [];
      for (var i = 0; i < eps0.length; i++) {
        var e0 = eps0[i];
        if (
          String(e0.sort) === String(ep) ||
          String(e0.episode) === String(ep) ||
          String(i + 1) === String(ep)
        ) {
          episodeId = t(e0.id || e0.episode_id || "");
          break;
        }
      }
      if (!episodeId && eps0.length) {
        episodeId = t(eps0[0].id || eps0[0].episode_id || "");
      }
    } catch (e) {}
  }

  var body = { video_id: Number(p.id) || p.id };
  if (episodeId) {
    body.episode_id = Number(episodeId) || episodeId;
  } else {
    // 兜底：部分旧链接只有序号
    body.ep = Number(ep) || ep;
  }

  var d = await apiPost(c, "/api/playlet/play", body);
  var info = unwrap(d);
  if (info.video_url == null && info.data) info = info.data;
  var url = t(info.video_url || info.video_url_h265 || "");
  if (!url && Array.isArray(info.episodeAll)) {
    for (var j = 0; j < info.episodeAll.length; j++) {
      var e = info.episodeAll[j];
      if (
        String(e.id) === String(episodeId) ||
        String(e.sort || e.index) === String(ep)
      ) {
        url = t(e.video_url || "");
        break;
      }
    }
  }
  if (!url) {
    throw new Error(
      "无播放地址（可能需 App/金币解锁） ep=" + ep + " episode_id=" + episodeId
    );
  }
  return [
    {
      name: "野果",
      description: "第" + ep + "集",
      url: url,
      playerType: "app",
      customHeaders: {
        "User-Agent": UA,
        Referer: "https://yeguodj.com/",
        Origin: "https://yeguodj.com",
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
