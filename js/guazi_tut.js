/**
 * 瓜子影视 ForwardWidget
 * 协议参考：设备鉴权 + AES/RSA 请求体解密 + 分类/搜索/播放
 * 作者：宝宝巴士 | 频道：https://t.me/nostremby
 */
WidgetMetadata = {
  id: "forward.guazi.tut",
  title: "瓜子影视",
  version: "1.0.4",
  requiredVersion: "0.0.1",
  description: "瓜子影视 分类/搜索/详情/多线路播放 | 频道：https://t.me/nostremby",
  author: "宝宝巴士",
  site: "https://t.me/nostremby",
  detailCacheDuration: 300,
  modules: [
    {
      id: "loadHome",
      title: "首页推荐",
      functionName: "loadHome",
      cacheDuration: 600,
      params: [{ name: "page", title: "页码", type: "page" }]
    },
    {
      id: "loadMovie",
      title: "电影",
      functionName: "loadMovie",
      cacheDuration: 600,
      params: [
        { name: "page", title: "页码", type: "page" },
        {
          name: "year",
          title: "年份",
          type: "enumeration",
          value: "0",
          enumOptions: [
            { title: "全部", value: "0" },
            { title: "2026", value: "2026" },
            { title: "2025", value: "2025" },
            { title: "2024", value: "2024" },
            { title: "2023", value: "2023" },
            { title: "2022", value: "2022" },
            { title: "2021", value: "2021" },
            { title: "2020", value: "2020" },
            { title: "2019", value: "2019" },
            { title: "2018", value: "2018" },
            { title: "2017", value: "2017" },
            { title: "更早", value: "2004" }
          ]
        },
        {
          name: "area",
          title: "地区",
          type: "enumeration",
          value: "0",
          enumOptions: [
            { title: "全部", value: "0" },
            { title: "大陆", value: "大陆" },
            { title: "香港", value: "香港" },
            { title: "台湾", value: "台湾" },
            { title: "美国", value: "美国" },
            { title: "韩国", value: "韩国" },
            { title: "日本", value: "日本" },
            { title: "英国", value: "英国" },
            { title: "法国", value: "法国" },
            { title: "泰国", value: "泰国" },
            { title: "印度", value: "印度" },
            { title: "其他", value: "其他" }
          ]
        },
        {
          name: "sort",
          title: "排序",
          type: "enumeration",
          value: "d_id",
          enumOptions: [
            { title: "最新", value: "d_id" },
            { title: "最热", value: "d_hits" },
            { title: "推荐", value: "d_score" }
          ]
        }
      ]
    },
    {
      id: "loadTv",
      title: "电视剧",
      functionName: "loadTv",
      cacheDuration: 600,
      params: [
        { name: "page", title: "页码", type: "page" },
        {
          name: "year",
          title: "年份",
          type: "enumeration",
          value: "0",
          enumOptions: [
            { title: "全部", value: "0" },
            { title: "2026", value: "2026" },
            { title: "2025", value: "2025" },
            { title: "2024", value: "2024" },
            { title: "2023", value: "2023" },
            { title: "2022", value: "2022" },
            { title: "2021", value: "2021" },
            { title: "2020", value: "2020" },
            { title: "2019", value: "2019" },
            { title: "2018", value: "2018" },
            { title: "2017", value: "2017" },
            { title: "更早", value: "2004" }
          ]
        },
        {
          name: "area",
          title: "地区",
          type: "enumeration",
          value: "0",
          enumOptions: [
            { title: "全部", value: "0" },
            { title: "大陆", value: "大陆" },
            { title: "香港", value: "香港" },
            { title: "台湾", value: "台湾" },
            { title: "美国", value: "美国" },
            { title: "韩国", value: "韩国" },
            { title: "日本", value: "日本" },
            { title: "英国", value: "英国" },
            { title: "法国", value: "法国" },
            { title: "泰国", value: "泰国" },
            { title: "印度", value: "印度" },
            { title: "其他", value: "其他" }
          ]
        },
        {
          name: "sort",
          title: "排序",
          type: "enumeration",
          value: "d_id",
          enumOptions: [
            { title: "最新", value: "d_id" },
            { title: "最热", value: "d_hits" },
            { title: "推荐", value: "d_score" }
          ]
        }
      ]
    },
    {
      id: "loadVariety",
      title: "综艺",
      functionName: "loadVariety",
      cacheDuration: 600,
      params: [
        { name: "page", title: "页码", type: "page" },
        {
          name: "year",
          title: "年份",
          type: "enumeration",
          value: "0",
          enumOptions: [
            { title: "全部", value: "0" },
            { title: "2026", value: "2026" },
            { title: "2025", value: "2025" },
            { title: "2024", value: "2024" },
            { title: "2023", value: "2023" },
            { title: "2022", value: "2022" },
            { title: "2021", value: "2021" },
            { title: "2020", value: "2020" },
            { title: "2019", value: "2019" },
            { title: "2018", value: "2018" },
            { title: "2017", value: "2017" },
            { title: "更早", value: "2004" }
          ]
        },
        {
          name: "area",
          title: "地区",
          type: "enumeration",
          value: "0",
          enumOptions: [
            { title: "全部", value: "0" },
            { title: "大陆", value: "大陆" },
            { title: "香港", value: "香港" },
            { title: "台湾", value: "台湾" },
            { title: "美国", value: "美国" },
            { title: "韩国", value: "韩国" },
            { title: "日本", value: "日本" },
            { title: "英国", value: "英国" },
            { title: "法国", value: "法国" },
            { title: "泰国", value: "泰国" },
            { title: "印度", value: "印度" },
            { title: "其他", value: "其他" }
          ]
        },
        {
          name: "sort",
          title: "排序",
          type: "enumeration",
          value: "d_id",
          enumOptions: [
            { title: "最新", value: "d_id" },
            { title: "最热", value: "d_hits" },
            { title: "推荐", value: "d_score" }
          ]
        }
      ]
    },
    {
      id: "loadAnime",
      title: "动漫",
      functionName: "loadAnime",
      cacheDuration: 600,
      params: [
        { name: "page", title: "页码", type: "page" },
        {
          name: "year",
          title: "年份",
          type: "enumeration",
          value: "0",
          enumOptions: [
            { title: "全部", value: "0" },
            { title: "2026", value: "2026" },
            { title: "2025", value: "2025" },
            { title: "2024", value: "2024" },
            { title: "2023", value: "2023" },
            { title: "2022", value: "2022" },
            { title: "2021", value: "2021" },
            { title: "2020", value: "2020" },
            { title: "2019", value: "2019" },
            { title: "2018", value: "2018" },
            { title: "2017", value: "2017" },
            { title: "更早", value: "2004" }
          ]
        },
        {
          name: "area",
          title: "地区",
          type: "enumeration",
          value: "0",
          enumOptions: [
            { title: "全部", value: "0" },
            { title: "大陆", value: "大陆" },
            { title: "香港", value: "香港" },
            { title: "台湾", value: "台湾" },
            { title: "美国", value: "美国" },
            { title: "韩国", value: "韩国" },
            { title: "日本", value: "日本" },
            { title: "英国", value: "英国" },
            { title: "法国", value: "法国" },
            { title: "泰国", value: "泰国" },
            { title: "印度", value: "印度" },
            { title: "其他", value: "其他" }
          ]
        },
        {
          name: "sort",
          title: "排序",
          type: "enumeration",
          value: "d_id",
          enumOptions: [
            { title: "最新", value: "d_id" },
            { title: "最热", value: "d_hits" },
            { title: "推荐", value: "d_score" }
          ]
        }
      ]
    },
    {
      id: "loadShort",
      title: "短剧",
      functionName: "loadShort",
      cacheDuration: 600,
      params: [
        { name: "page", title: "页码", type: "page" },
        {
          name: "year",
          title: "年份",
          type: "enumeration",
          value: "0",
          enumOptions: [
            { title: "全部", value: "0" },
            { title: "2026", value: "2026" },
            { title: "2025", value: "2025" },
            { title: "2024", value: "2024" },
            { title: "2023", value: "2023" },
            { title: "2022", value: "2022" },
            { title: "2021", value: "2021" },
            { title: "2020", value: "2020" },
            { title: "2019", value: "2019" },
            { title: "2018", value: "2018" },
            { title: "2017", value: "2017" },
            { title: "更早", value: "2004" }
          ]
        },
        {
          name: "area",
          title: "地区",
          type: "enumeration",
          value: "0",
          enumOptions: [
            { title: "全部", value: "0" },
            { title: "大陆", value: "大陆" },
            { title: "香港", value: "香港" },
            { title: "台湾", value: "台湾" },
            { title: "美国", value: "美国" },
            { title: "韩国", value: "韩国" },
            { title: "日本", value: "日本" },
            { title: "英国", value: "英国" },
            { title: "法国", value: "法国" },
            { title: "泰国", value: "泰国" },
            { title: "印度", value: "印度" },
            { title: "其他", value: "其他" }
          ]
        },
        {
          name: "sort",
          title: "排序",
          type: "enumeration",
          value: "d_id",
          enumOptions: [
            { title: "最新", value: "d_id" },
            { title: "最热", value: "d_hits" },
            { title: "推荐", value: "d_score" }
          ]
        }
      ]
    },
    {
      id: "loadResource",
      title: "加载播放资源",
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

const USER_AGENT = "LeanMirror/3 CFNetwork/3892.100.1 Darwin/27.0.0";
const PLAY_USER_AGENT = "AppleCoreMedia/1.0.0.24A5390f (iPhone; U; CPU OS 27_0 like Mac OS X; zh_cn)";
const LIB_CRYPTO_JS = "https://cdn.jsdelivr.net/npm/crypto-js@4.2.0/crypto-js.min.js";
const LIB_JSENCRYPT = "https://cdn.jsdelivr.net/npm/jsencrypt@3.3.2/bin/jsencrypt.min.js";

const APP_CONFIG = {
  baseURL: "",
  baseURLs: [
    "https://api.8b42w67.com",
    "https://api.4pmyvfz.com",
    "https://sdapi.s3432pr.com",
    "https://sdapi.q5sn3gk.com",
    "https://apinew.qwepe.com",
    "https://apinew.uozvr.com",
    "https://api.w32z7vtd.com"
  ],
  thirdPartyDomainURL: "https://raw.githubusercontent.com/tdopops/jiafeimao/main/0103/jfm-ios-prod.json",
  thirdPartyAes: { key: "m4nQCskrndxTCULX", iv: "92ilxgNlcweTTfvG" },
  versionCode: "2026033001",
  apiVersion: "3.0.5.0",
  productnumber: "1",
  platform: "2",
  packageName: "com.jfm202203",
  code: "GZ0520",
  requestAes: { key: "aaaabbbbccccdddd", iv: "1111222233334444" },
  requestPublicKey: "-----BEGIN PUBLIC KEY-----MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCWJafJAdhTPWMrNpbmlk672o06smRwxe1LoHjy2XbLRaKIXfQJWgJTBhLH4qUIPMmpnIKQYqjMLTrJhwG5Bwsd3/15YHdL7eWad7lpomF5doOQmmexK2+gSBHmCOhXeumhrOD63vx8ERepxR6UCxTi5b5fZmqMdbLk45IW39mn6wIDAQAB-----END PUBLIC KEY-----",
  responsePrivateKey: "-----BEGIN RSA PRIVATE KEY-----MIICXQIBAAKBgQCM+iJdCeYFydG3DiFG0Ajr6IS0NENW1Bb2MSwrUdvLiI7nXHG+zZZuyqewVUPUPQRdEvhSMCyTKjjX9QajRJ1Uv+xVnsOmxEQQIhAIUa1dsXsN30nLGA+VuNHF7J1SE+Vh/46duR/0Q+Iq+3esSYlb3/PdN4wgK5ab+jKeR0JA2wIDAQABAoGAbst/CkPnRZFRgl5WhMKm4FDDSqTwb2MMELygjAMvjIxsUyRyOJR2r+gRViIMxtaVgViRVHaL8bTzK7ZkWxhn1LEM7RpWB1zjKFvXxE+dzxPrYY/Qw7dobzAAMyQhZ2+7PTO/plUYOxNgZPUzsvcoI44M3HRy1yFxGbF9z9LiMDECQQDTs5eXJnjEN1JmqbBotFw0III0/se/r0oDv4AvJdbxl64t64dZI2tS3BO7NL3OAOzf+WL14Pf2uADFDZz9kzHPAkEAqnn7TBlZXc6L70TnCaggMAN9C+2Iuik2Q2dePfTBI9IyJiC54k4G66iT+kQ5F6T4MGWf6jb7xUuUTk6AHck/NQJBALk+5oAh7v0rt5QUGkSUxjXq2GUNKLbn6Ok8sisPfnVrF8Qg3A+4+ZnI8A8ZSJkxoBUgwWKMWA5w1mOX1O7i1WsCQHV0qgHajUomnx9x18U9gz/Rh3yKYmPxNSPnunTxh4kIr+i5L5mOrRH9CkeqbbOuxBmES1PyIjHjSwFQ8NCU8ekCQQCwb4PirUbcqeHbjN0Nv6vm5pqsgJ29GhA9qiy2l+1Wb637STe9L2mEt7ImUd9FGy7k3Nnsn5eou/t2SV3OkGaU-----END RSA PRIVATE KEY-----",
  iosRequestSalt: "&ffddffujhjhgvdvdvdz4Y!s!2br",
  token: "",
  tokenId: "",
  deviceId: "",
  ip: "",
  lang: "zh_cn"
};

let __libsReady = false;
let __authPromise = null;
let __domainPromise = null;
let __domainsReady = false;
let __activeDomainIndex = 0;
const AUTH_STORAGE_KEY = "guazi.auth.v1";
const DOMAIN_STORAGE_KEY = "guazi.domains.v1";

function getText(v) { return String(v == null ? "" : v).trim(); }
function safeArray(v) { return Array.isArray(v) ? v : []; }
function parseJSON(value, fallback) {
  if (value == null) return fallback;
  if (typeof value === "object") return value;
  try { return JSON.parse(String(value)); } catch (e) { return fallback; }
}
function storageGet(key) {
  try { return Widget.storage && Widget.storage.get ? Widget.storage.get(key) : null; } catch (e) { return null; }
}
function storageSet(key, value) {
  try { if (Widget.storage && Widget.storage.set) Widget.storage.set(key, value); } catch (e) {}
}
function randomHex(size) {
  const chars = "0123456789ABCDEF";
  let out = "";
  for (let i = 0; i < size; i++) out += chars.charAt(Math.floor(Math.random() * 16));
  return out;
}
function createDeviceId() {
  return randomHex(8) + "-" + randomHex(4) + "-4" + randomHex(3) + "-" + "89AB".charAt(Math.floor(Math.random() * 4)) + randomHex(3) + "-" + randomHex(12);
}
function normalizeBaseURL(value) {
  const url = String(value || "").trim().replace(/\/+$/, "");
  return /^https:\/\/[a-z0-9.-]+(?::\d+)?$/i.test(url) ? url : "";
}
function uniqueBaseURLs(values) {
  const out = [];
  for (let i = 0; i < (values || []).length; i++) {
    const url = normalizeBaseURL(values[i]);
    if (url && out.indexOf(url) < 0) out.push(url);
  }
  return out;
}

async function ensureLibs() {
  if (__libsReady && typeof CryptoJS !== "undefined" && typeof JSEncrypt !== "undefined") return;
  const g = (function () {
    if (typeof globalThis !== "undefined") return globalThis;
    if (typeof self !== "undefined") return self;
    if (typeof window !== "undefined") return window;
    return this;
  })();
  if (!g.window) g.window = g;
  if (!g.self) g.self = g;
  if (!g.global) g.global = g;
  if (!g.navigator) g.navigator = { appName: "Netscape", userAgent: USER_AGENT };
  if (typeof CryptoJS === "undefined") {
    const resp = await Widget.http.get(LIB_CRYPTO_JS, { headers: { "User-Agent": USER_AGENT } });
    (0, eval)(typeof resp.data === "string" ? resp.data : String(resp.data || ""));
  }
  if (typeof JSEncrypt === "undefined") {
    const resp = await Widget.http.get(LIB_JSENCRYPT, { headers: { "User-Agent": USER_AGENT } });
    (0, eval)(typeof resp.data === "string" ? resp.data : String(resp.data || ""));
  }
  if (typeof CryptoJS === "undefined") throw new Error("CryptoJS 加载失败");
  if (typeof JSEncrypt === "undefined") throw new Error("JSEncrypt 加载失败");
  __libsReady = true;
}

function buildHeaders(extra) {
  return Object.assign({
    "Content-Type": "application/json",
    "Accept": "application/json, text/plain, */*",
    "Version": APP_CONFIG.versionCode,
    "api-ver": APP_CONFIG.apiVersion,
    "packagename": APP_CONFIG.packageName,
    "code": APP_CONFIG.code,
    "ver": APP_CONFIG.apiVersion,
    "deviceid": APP_CONFIG.deviceId,
    "ip": APP_CONFIG.ip,
    "lang": APP_CONFIG.lang,
    "x-customer-client-ip": "",
    "User-Agent": USER_AGENT,
    "parent-code": ""
  }, extra || {});
}

function aesEncryptHex(text, keyStr, ivStr) {
  const key = CryptoJS.enc.Utf8.parse(keyStr);
  const iv = CryptoJS.enc.Utf8.parse(ivStr);
  const data = CryptoJS.enc.Utf8.parse(text);
  return CryptoJS.AES.encrypt(data, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }).ciphertext.toString();
}
function aesDecryptHex(cipherHex, keyStr, ivStr) {
  const key = CryptoJS.enc.Utf8.parse(keyStr);
  const iv = CryptoJS.enc.Utf8.parse(ivStr);
  return CryptoJS.AES.decrypt({ ciphertext: CryptoJS.enc.Hex.parse(cipherHex) }, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }).toString(CryptoJS.enc.Utf8);
}
function rsaEncryptBase64(text, publicKey) {
  const js = new JSEncrypt();
  js.setPublicKey(publicKey);
  return js.encrypt(text);
}
function rsaDecryptBase64(text, privateKey) {
  const js = new JSEncrypt();
  js.setPrivateKey(privateKey);
  return js.decrypt(text);
}
function buildRequestBody(params) {
  const ts = Math.floor(Date.now() / 1000);
  const requestKey = aesEncryptHex(JSON.stringify(params || {}), APP_CONFIG.requestAes.key, APP_CONFIG.requestAes.iv);
  const keys = rsaEncryptBase64(JSON.stringify(APP_CONFIG.requestAes), APP_CONFIG.requestPublicKey);
  const signBase = "token_id=" + APP_CONFIG.tokenId + ",token=" + APP_CONFIG.token + ",phone_type=" + APP_CONFIG.platform + ",request_key=" + requestKey + ",app_id=" + APP_CONFIG.productnumber + ",time=" + String(ts) + ",keys=" + keys;
  const signature = CryptoJS.MD5(signBase + "*" + APP_CONFIG.iosRequestSalt).toString().toUpperCase();
  return {
    token: APP_CONFIG.token,
    token_id: APP_CONFIG.tokenId,
    time: ts,
    app_id: APP_CONFIG.productnumber,
    phone_type: APP_CONFIG.platform,
    keys: keys,
    request_key: requestKey,
    signature: signature,
    ad_version: 1
  };
}
function decryptResponse(responseData) {
  const aesInfo = JSON.parse(rsaDecryptBase64(responseData.keys, APP_CONFIG.responsePrivateKey));
  return JSON.parse(aesDecryptHex(responseData.response_key, aesInfo.key, aesInfo.iv));
}

async function getPublicIP() {
  try {
    const response = await Widget.http.get("https://api.ipify.org/?format=json", { headers: { "User-Agent": USER_AGENT } });
    const data = parseJSON(response && response.data, {});
    return String((data && data.ip) || "");
  } catch (e) { return ""; }
}

async function loadRemoteDomains() {
  try {
    const response = await Widget.http.get(APP_CONFIG.thirdPartyDomainURL, { headers: { "User-Agent": USER_AGENT } });
    const root = parseJSON(response && response.data, null);
    const encrypted = root && root.code === 200 && root.data && root.data.response_key;
    if (!encrypted) return [];
    const text = aesDecryptHex(encrypted, APP_CONFIG.thirdPartyAes.key, APP_CONFIG.thirdPartyAes.iv);
    return uniqueBaseURLs(parseJSON(text, {}).list || []);
  } catch (e) { return []; }
}

async function initializeDomains(force) {
  if (__domainsReady && !force && APP_CONFIG.baseURL) return APP_CONFIG.baseURL;
  if (__domainPromise) return __domainPromise;
  __domainPromise = (async function () {
    await ensureLibs();
    const cached = parseJSON(storageGet(DOMAIN_STORAGE_KEY), {});
    const cachedList = uniqueBaseURLs((cached && cached.list) || []);
    const remote = await loadRemoteDomains();
    APP_CONFIG.baseURLs = uniqueBaseURLs([].concat(remote, cachedList, APP_CONFIG.baseURLs));
    if (remote.length) storageSet(DOMAIN_STORAGE_KEY, JSON.stringify({ list: remote, updatedAt: Date.now() }));
    const checks = APP_CONFIG.baseURLs.slice(0, 4).map(async function (url, index) {
      try {
        const response = await Widget.http.get(url + "/domain/check", { headers: { "User-Agent": USER_AGENT } });
        const text = String((response && response.data) || "").trim().toLowerCase();
        if ((response && response.status && Number(response.status) >= 400) || (text && text !== "success")) throw new Error("fail");
        return { url: url, index: index };
      } catch (e) { return null; }
    });
    const results = await Promise.all(checks);
    const hit = results.filter(Boolean)[0];
    APP_CONFIG.baseURL = hit ? hit.url : (APP_CONFIG.baseURLs[0] || "");
    __activeDomainIndex = Math.max(0, APP_CONFIG.baseURLs.indexOf(APP_CONFIG.baseURL));
    if (!APP_CONFIG.baseURL) throw new Error("瓜子 API 域名不可用");
    __domainsReady = true;
    return APP_CONFIG.baseURL;
  })();
  try { return await __domainPromise; } finally { __domainPromise = null; }
}

function loadStoredAuth() {
  const auth = parseJSON(storageGet(AUTH_STORAGE_KEY), {});
  if (!auth || !auth.deviceId || !auth.token) return false;
  APP_CONFIG.deviceId = String(auth.deviceId);
  APP_CONFIG.token = String(auth.token);
  APP_CONFIG.tokenId = String(auth.tokenId || "");
  APP_CONFIG.ip = String(auth.ip || "");
  return true;
}
function saveAuth() {
  storageSet(AUTH_STORAGE_KEY, JSON.stringify({
    deviceId: APP_CONFIG.deviceId,
    token: APP_CONFIG.token,
    tokenId: APP_CONFIG.tokenId,
    ip: APP_CONFIG.ip,
    updatedAt: Date.now()
  }));
}

async function rawPrivatePost(path, params, baseURL) {
  const url = normalizeBaseURL(baseURL || APP_CONFIG.baseURL);
  if (!url) throw new Error("瓜子 API 域名为空");
  const response = await Widget.http.post(url + path, buildRequestBody(params || {}), { headers: buildHeaders() });
  const root = parseJSON(response && response.data, null);
  if (!root) throw new Error("瓜子 API 响应格式异常");
  let data = root.data;
  if (data && data.response_key && data.keys) data = decryptResponse(data);
  return { root: root, data: data };
}

async function authenticate(force) {
  if (__authPromise) return __authPromise;
  __authPromise = (async function () {
    await ensureLibs();
    await initializeDomains(false);
    if (!force && !APP_CONFIG.token) loadStoredAuth();
    if (!APP_CONFIG.deviceId) APP_CONFIG.deviceId = createDeviceId();
    if (!APP_CONFIG.ip) APP_CONFIG.ip = await getPublicIP();
    const payload = { new_key: APP_CONFIG.deviceId, old_key: APP_CONFIG.deviceId };
    APP_CONFIG.token = "";
    APP_CONFIG.tokenId = "";
    let lastError = null;
    const total = Math.max(1, APP_CONFIG.baseURLs.length);
    for (let attempt = 0; attempt < total; attempt++) {
      const index = (__activeDomainIndex + attempt) % total;
      const baseURL = APP_CONFIG.baseURLs[index];
      APP_CONFIG.baseURL = baseURL;
      try {
        let result = await rawPrivatePost("/App/Authentication/Device/signIn", payload, baseURL);
        if (!result.root || result.root.code !== 200 || !result.data || !result.data.token) {
          result = await rawPrivatePost("/App/Authentication/Device/signUp", payload, baseURL);
        }
        if (!result.root || result.root.code !== 200 || !result.data || !result.data.token) {
          throw new Error((result.root && result.root.msg) || "瓜子设备鉴权失败");
        }
        APP_CONFIG.token = String(result.data.token);
        APP_CONFIG.tokenId = String(result.data.token_id || "");
        __activeDomainIndex = index;
        saveAuth();
        return true;
      } catch (e) { lastError = e; }
    }
    throw lastError || new Error("瓜子设备鉴权失败");
  })();
  try { return await __authPromise; } finally { __authPromise = null; }
}

function shouldReauthenticate(root) {
  const code = Number((root && root.code) || 0);
  const msg = String((root && root.msg) || "");
  return code === 401 || code === 403 || code === 451 || /token|登录|鉴权|认证|设备.*不存在|过期/i.test(msg);
}

async function privatePost(path, params) {
  await ensureLibs();
  await initializeDomains(false);
  if (!APP_CONFIG.token) loadStoredAuth();
  if (!APP_CONFIG.token) await authenticate(false);
  let authRetried = false;
  let lastError = null;
  const total = Math.max(1, APP_CONFIG.baseURLs.length);
  for (let attempt = 0; attempt < total; attempt++) {
    const index = (__activeDomainIndex + attempt) % total;
    const baseURL = APP_CONFIG.baseURLs[index];
    APP_CONFIG.baseURL = baseURL;
    try {
      let result = await rawPrivatePost(path, params || {}, baseURL);
      if (shouldReauthenticate(result.root) && !authRetried) {
        authRetried = true;
        await authenticate(true);
        result = await rawPrivatePost(path, params || {}, APP_CONFIG.baseURL);
      }
      if (result.root && result.root.code === 200) {
        __activeDomainIndex = Math.max(0, APP_CONFIG.baseURLs.indexOf(APP_CONFIG.baseURL));
        return result.data != null ? result.data : result.root;
      }
      lastError = new Error((result.root && result.root.msg) || "请求失败");
    } catch (e) { lastError = e; }
  }
  throw lastError || new Error("瓜子 API 全部域名不可用");
}

function mapVodItem(item) {
  if (!item) return null;
  const id = String(item.vod_id || item.id || "");
  if (!id) return null;
  const title = getText(item.vod_name || item.title || id);
  const cover = getText(item.vod_pic || item.pic || item.cover || "");
  const year = getText(item.vod_year || "").slice(0, 4);
  const remarks = getText(item.vod_continu || item.vod_remarks || item.remarks || "");
  // 仅 type=1 电影；2电视剧 3综艺 4动漫 64短剧 均为 tv，保证点进详情出分集列表
  const tid = String(item.t_id || item.type_id || "");
  const mediaType = tid === "1" ? "movie" : "tv";
  return {
    id: id,
    type: "url",
    title: title,
    coverUrl: cover,
    posterPath: cover,
    backdropPath: cover,
    description: [year, remarks].filter(Boolean).join(" · "),
    releaseDate: year,
    mediaType: mediaType,
    link: id
  };
}

function mapList(data) {
  const list = safeArray((data && data.list) || (data && data.data && data.data.list) || data);
  const out = [];
  const seen = {};
  for (let i = 0; i < list.length; i++) {
    const it = mapVodItem(list[i]);
    if (!it || seen[it.id]) continue;
    seen[it.id] = true;
    out.push(it);
  }
  return out;
}

async function loadHome(params) {
  const page = Number((params && params.page) || 1);
  // 首页：官方不传 tid，sort=d_id 最新
  const data = await privatePost("/App/IndexList/indexList", {
    area: "0",
    year: "0",
    pageSize: "24",
    sort: "d_id",
    page: String(page)
  });
  return mapList(data);
}

const SUB_MAP = { "1": "5", "2": "12", "3": "30", "4": "22", "64": "", "5": "0" };

async function loadCategoryByType(params, typeId) {
  const page = Number((params && params.page) || 1);
  const sort = String((params && params.sort) || "d_id");
  const year = String((params && params.year) || "0");
  const area = String((params && params.area) || "0");
  const tid = String(typeId || "1");
  // 官方协议：tid + sub + year + area + sort(d_id=最新 / d_hits=最热 / d_score=推荐)
  const data = await privatePost("/App/IndexList/indexList", {
    area: area,
    year: year,
    pageSize: "24",
    sort: sort,
    page: String(page),
    tid: tid,
    sub: SUB_MAP[tid] != null ? SUB_MAP[tid] : "0"
  });
  return mapList(data);
}

async function loadMovie(params) {
  return loadCategoryByType(params, "1");
}
async function loadTv(params) {
  return loadCategoryByType(params, "2");
}
async function loadVariety(params) {
  return loadCategoryByType(params, "3");
}
async function loadAnime(params) {
  return loadCategoryByType(params, "4");
}
async function loadShort(params) {
  return loadCategoryByType(params, "64");
}

/** 兼容旧订阅里仍指向 loadCategory 的情况 */
async function loadCategory(params) {
  return loadCategoryByType(params, (params && params.type_id) || "1");
}

async function search(params) {
  const keyword = getText(params && params.keyword);
  if (!keyword) return loadHome({ page: 1 });
  const data = await privatePost("/App/Index/findMoreVod", {
    keywords: keyword,
    order_val: ""
  });
  return mapList(data);
}

async function loadDetail(link) {
  // 只接受剧目 id；若误传 vodId#epId，剥离集号，避免详情标题变成「第N集」
  let raw = getText(link);
  if (raw.indexOf("#") >= 0) raw = raw.split("#")[0];
  const vodId = getText(raw);
  if (!vodId) return null;
  let detail = null;
  try {
    detail = await privatePost("/App/IndexPlay/playInfo", { vod_id: vodId });
  } catch (e) {}
  const vod = (detail && (detail.vod || detail.info || detail)) || {};
  // 片名：永远用作品名
  const title = getText(vod.vod_name || vod.title || vodId);
  const cover = getText(vod.vod_pic || vod.pic || "");
  const desc = getText(vod.vod_content || vod.content || vod.vod_blurb || "");
  const year = getText(vod.vod_year || "").slice(0, 4);
  const typeId = String(vod.t_id || vod.type_id || "");

  // 集数列表（电影也可能有多条源，一律放进 episodeItems，由 App 显示分集区）
  let episodeItems = [];
  try {
    const vurlData = await privatePost("/App/Resource/Vurl/show", { vod_d_id: vodId, vurl_cloud_id: "2" });
    const eps = safeArray((vurlData && vurlData.list) || vurlData);
    episodeItems = eps.map(function (ep, idx) {
      let name = getText(ep.name || ep.title || ("第" + (idx + 1) + "集"));
      // 纯数字补「第N集」
      if (/^\d+$/.test(name)) name = "第" + name + "集";
      const eid = String(ep.id || ep.vurl_id || "");
      return {
        id: vodId + "#" + eid,
        type: "url",
        title: name,
        mediaType: "tv",
        seasonNumber: 1,
        episodeNumber: idx + 1,
        link: vodId + "#" + eid,
        videoUrl: "",
        playerType: "app"
      };
    });
  } catch (e) {}

  // 有多集 → tv（App 才显示剧集列表）；仅 1 集且类型是电影 → movie
  let mediaType = "tv";
  if (episodeItems.length <= 1 && typeId === "1") mediaType = "movie";
  else if (episodeItems.length > 1) mediaType = "tv";
  else if (typeId === "1") mediaType = "movie";
  else mediaType = "tv";

  // 单集电影：可预填 videoUrl；多集不预填，强制走分集 + loadResource
  let videoUrl = "";
  if (mediaType === "movie" && episodeItems.length) {
    try {
      const firstId = String(episodeItems[0].id || "").split("#")[1];
      const details = safeArray(await privatePost("/App/Resource/Vod/vurlDetail", { vurl_id: firstId }));
      details.sort(function (a, b) { return Number(b.resolution || 0) - Number(a.resolution || 0); });
      for (let i = 0; i < details.length; i++) {
        if (details[i] && details[i].url) {
          videoUrl = details[i].url;
          break;
        }
      }
    } catch (e) {}
  }

  return {
    id: vodId,
    type: "url",
    title: title,
    name: title,
    description: desc || year,
    coverUrl: cover,
    posterPath: cover,
    backdropPath: cover,
    releaseDate: year,
    mediaType: mediaType,
    link: vodId,
    videoUrl: videoUrl,
    // 有分集就返回，不再因 movie 清空（否则只剩单集页、标题变集名）
    episodeItems: episodeItems,
    playerType: "app",
    customHeaders: { "User-Agent": PLAY_USER_AGENT }
  };
}

async function loadResource(params) {
  params = params || {};
  let vodId = getText(params.link || params.id || "");
  let vurlId = "";
  if (vodId.indexOf("#") >= 0) {
    const parts = vodId.split("#");
    vodId = parts[0];
    vurlId = parts[1] || "";
  }
  // 兼容 TMDB 起播：无 vodId 时用标题搜索
  if (!vodId || !/^\d+$/.test(vodId)) {
    const kw = getText(params.seriesName || params.title || params.keyword);
    if (!kw) return [];
    const searchData = await privatePost("/App/Index/findMoreVod", { keywords: kw, order_val: "" });
    const list = safeArray((searchData && searchData.list) || searchData);
    if (!list.length) return [];
    vodId = String(list[0].vod_id || list[0].id || "");
  }
  if (!vodId) return [];

  if (!vurlId) {
    const vurlData = await privatePost("/App/Resource/Vurl/show", { vod_d_id: vodId, vurl_cloud_id: "2" });
    const eps = safeArray((vurlData && vurlData.list) || vurlData);
    const wantEp = Number(params.episode || 0);
    let ep = eps[0];
    if (wantEp > 0 && eps[wantEp - 1]) ep = eps[wantEp - 1];
    if (!ep) return [];
    vurlId = String(ep.id || ep.vurl_id || "");
  }
  if (!vurlId) return [];

  const details = safeArray(await privatePost("/App/Resource/Vod/vurlDetail", { vurl_id: vurlId }));
  details.sort(function (a, b) { return Number(b.resolution || 0) - Number(a.resolution || 0); });
  const out = [];
  for (let i = 0; i < details.length; i++) {
    const d = details[i];
    if (!d || !d.url) continue;
    const res = d.resolution ? (String(d.resolution) + "P") : ("线路" + (i + 1));
    out.push({
      name: "瓜子 " + res,
      description: getText(d.name || d.title || "瓜子影视"),
      url: d.url,
      customHeaders: { "User-Agent": PLAY_USER_AGENT },
      headers: { "User-Agent": PLAY_USER_AGENT }
    });
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
