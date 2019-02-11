const got = require('got');
const amazon = got.extend({
  baseUrl: 'https://www.amazon.com/gp/product/',
  headers: {
    'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
    'accept-language': 'en-US,en;q=0.9',
    'cache-control': 'max-age=0',
    'cookie': 'csm-hit=tb:3AGA0HB7WH93C7QRF25C+s-C5MZ6CSC43M3SV134TRH|1548800446585&t:1548800446585&adb:adblk_no; session-id=145-3269371-0199018; session-id-time=2082787201l; ubid-main=132-4538989-1023865; session-token=T2mrsX3aLiyb8ih8vVjr3piMHPKmGV8lGANlcqDIQ1GRgmIXvKsX/CvSklV9PwtT8AgPfcMw6FdzYSk9rqNEPWWtKJpLOVnrKW9Ja5BzTuKp/zzJw9bgZnQGcPihzojjU+6uj4Vxb1S1grQG+z8Qt9TIXHkrxRPkXBUFC/oxW3K3Sq2dICd/3TtgxDZLCbuK; skin=noskin; x-wl-uid=1vL38fmcOQPB28WQvVFrmG/LHna3Q1K0D6fJiJ7d9rDj9n02HzYvNhR+EHdmb/11lRTfNSJxqYf4=; i18n-prefs=USD',
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36'
  }
});

module.exports = amazon;
