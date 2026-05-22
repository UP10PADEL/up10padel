const https = require('https');

module.exports = function(req, res) {
  https.get(
    'https://raw.githubusercontent.com/UP10PADEL/up10padel/main/count.json',
    (r) => {
      let data = '';
      r.on('data', chunk => data += chunk);
      r.on('end', () => {
        try {
          const json = JSON.parse(data);
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.setHeader('Cache-Control', 'no-cache');
          res.json({ count: json.count || 0 });
        } catch(e) {
          res.json({ count: 0 });
        }
      });
    }
  ).on('error', () => res.json({ count: 0 }));
};
