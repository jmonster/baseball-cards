const request = require('superagent');

// TODO remove page from this base BASE_URL
const BASE_URL = 'https://slickdeals.net/forums/forumdisplay.php';
const LIMIT = 200;
const LIMIT_PARAM = 'page';
const HEADERS = {
  // actual values taken from Google Chrome
  'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
  'accept-language': 'en-US,en;q=0.9',
  'cache-control': 'max-age=0',

  'cookie': 'Cookie: _hp2_id.4023737901=%7B%22userId%22%3A%223059808703587221%22%2C%22pageviewId%22%3A%220396418926187736%22%2C%22sessionId%22%3A%220489440339820529%22%2C%22identity%22%3A%2258e961baeb0811e8829c2a34d537341f%22%2C%22trackerVersion%22%3A%224.0%22%2C%22identityField%22%3A%22Device%22%2C%22isIdentified%22%3A1%7D; _hp2_ses_props.4023737901=%7B%22ts%22%3A1543378075229%2C%22d%22%3A%22slickdeals.net%22%2C%22h%22%3A%22%2F%22%7D; auuid=58e90cc4eb0811e8829c2a34d537341f; bblastactivity=1543378214; sd_a=1543378214|2d56987af2c311e8a7572ab9d51e9d18-58e961baeb0811e8829c2a34d537341f|0|; sd_p=nps_tracking=%7B%22last_reset%22%3A1542528171%7D&abt_new=1542528171&abt_uuid=0b1964337d1442788785af8f1a21c5b1&sticky=132-263-130-34-54&sd_modern_opt_in=3&sd_modern_opt_out=0; __utma=17096955.2124698249.1542528174.1543274217.1543378074.4; __utmb=17096955.58.7.1543378211489; __utmc=17096955; __utmv=17096955.|1=usertype=Guest=1; __utmz=17096955.1542528174.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); gpv=Forums%3AThe%20Deals%3AHot%20Deals%3AP1; s_cc=true; s_nr=1543378210934-Repeat; s_sq=%5B%5BB%5D%5D; moduleOutclick=%5B%5BB%5D%5D; dealCap=F11891999,2,24,1543464474|S11916935,5,24,1543464477|S8256561,3,24,1543464477|S11891999,5,24,1543464477|S10076220,3,72,1543637277|S12317353,1,24,1543464477|S8631122,3,48,1543550877|S10817763,3,24,1543464477; __utmt=1; AMCVS_2651F28B5550A1500A4C98A5%40AdobeOrg=1; AMCV_2651F28B5550A1500A4C98A5%40AdobeOrg=1406116232%7CMCIDTS%7C17864%7CMCMID%7C01743401685081189814118025999303556983%7CMCAAMLH-1543982872%7C9%7CMCAAMB-1543982873%7C6G1ynYcLPuiQxYZrsz_pkqfLG9yMXBpb2zX5dvJdYQJzPXImdj0y%7CMCOPTOUT-1543385273s%7CNONE%7CMCAID%7CNONE%7CMCSYNCSOP%7C411-17871%7CvVersion%7C2.5.0; lastfpvisit=1543378073; bbsessionhash=6444eae3d2a81bc28ebfac899082f32b; i10c.sid=1543378072614; remindme=%7B%7D; bbsearch_kw_abgroup3=80; __gads=ID=2fcd3ec0e0dbeeae:T=1542528176:S=ALNI_MbXvYs1m741AxDTcqAyaXvzGSNSbg; __qca=P0-1318041441-1542528175396; cto_lwid=f402f56c-a502-4482-a746-a7957837a069; abgroup=gridgroup; control={"217053377":{"c":false,"ct":1542528173}}; intellimizeEUID=6247fc983a.1542528173; fp_style=grid',

  'if-modified-since': 'Fri, 01 Jun 2018 22:59:10 GMT',
  'upgrade-insecure-requests': '1',
  'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36'
}

module.exports.deal = function(idx, callback) {
  const param = LIMIT*idx;

  request
    .get(BASE_URL)
    .query({ [LIMIT_PARAM]: param })
    .query({ f: 9 })
    .set(HEADERS)
    .end(callback);
};
