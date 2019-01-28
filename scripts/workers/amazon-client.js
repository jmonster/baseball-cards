const got = require('got');
const amazon = got.extend({
  baseUrl: 'https://www.amazon.com/gp/product/',
  headers: {
    'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
    'accept-language': 'en-US,en;q=0.9',
    'cache-control': 'max-age=0',
    'cookie': 'ubid-main=133-3076550-5922448; lc-main=en_US; x-wl-uid=1itvMnzDUcbyE1pS7CtbfIxAY9+HX6fkPtSaYIsGP7ZiU5XOklfvYXM98UJcOBon4QbbrkfU5JQqs2KQp6XIpGoU9mHhSZMbOWgFsiqo5Kxk1mIIJc+uybgdjxCnxy0IC/8267A/r/S8=; x-main="OcKGXCbyPq?BSePI8ShX?Q0ITyrr1F@q"; at-main=Atza|IwEBIKoX-0icaLysL8kwC8CM8G-_23ZcyYXJQGp6wORZvQfgCzNVt1ec9g7Sruh41vnXln9ouuamyKr4ikz2INJHu_Y741CDsHrJUBKYpxnUPtj_9pNMZdAjN3_iDfg9OhqXMg4FScV9FIEfpR48HozU-U1B8kbjHEHOwXxONY5nEUQ8w2VkvAQe9mZ33mLi5aFUIdPMFAxyBxZF2aWFeJe0Wtf6bm-Vfe_umEQRzWla7dxSE92KOCRhM7xdbdqsYZsJGnDOrwkh_dxHR4oqqLPaxHQ09DB-wbSSkIggjpwxaQwr0BuwxRpVItqkSNc8_tjTXZoFM4gakrAZCeDLEkdE4oVoBVb2KqOg4ETaBZyG2hjlsavyNd3vn7PJfol6AxzJPBBb02jbHGnbz01qJAd9UkDx; sess-at-main="GueAfXkjLbm5kmzUtjBZolRhLsQrk2Q2RCTuUdj0SqY="; sst-main=Sst1|PQG7SSn9-QWZhDfmhr38dzDIC3JqgTWWwwfKf0vZa_8y2ddG4aR3TyxRwem9ttYobtmaxYaCdbGc4ygPfaskJcYavjS_GG8Fv86IE-fde_2XuttPm0eUDsQbO42hlBL3y6xEDGZTtPcbdaoxdoh69t57_qZ2tMssN8_T-ugcnNTgYI-AJGeXS7xt4LC-WuVKG67c079SEFHJs4M8JB3ky_sPYSz25z8tFVQ1yvHgm24BtSiH_APFAib61bTyN3XLmTjMtFQSstJQr_clTswn_ms5f-C2yhTFW4cTVXmofaWfcUgu4Bk2cHrTIniJeFMcE04ry3i60OjiN69zYk4Bh_dq-g; s_fid=14BDC10E899EEFF6-2568DDD6E3503197; s_vn=1579208407072%26vn%3D1; regStatus=pre-register; s_dslv=1547672619290; s_nr=1547672619303-New; i18n-prefs=USD; session-id=132-1585266-7795162; session-token="5QHSf+cWK4KyVGafq8ft4WVvefTgP1FGyS+kMx6jsViGgtH7nDcLWyhhbZ5YwPpFI9iqJslwBkH6RFXhpMI7tcuUxanwTdzY+oQmUuiDbCQMmmVpkYde2UHaLyz8AUqnGvfz0d6GSRuLA4jjAiYg2famqpdbR6mQYcq9VpCqS8jbcFFs364C/n9tBbBvgw7ZLcQiq0e9wJRiRaaRUTdJFA=="; csm-hit=tb:s-BFMCYEP20QTEDCF2R8WB|1548650355526&t:1548650359950&adb:adblk_yes; session-id-time=2082787201l',
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36'
  }
});

module.exports = amazon;
