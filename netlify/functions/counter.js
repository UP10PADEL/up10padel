const https = require('https');

exports.handler = async function() {
  return new Promise((resolve) => {
    https.get(
      'https://raw.githubusercontent.com/UP10PADEL/up10padel/main/count.json',
      (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          try {
            const json = JSON.parse(data);
            resolve({
              statusCode: 200,
              headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Cache-Control": "no-cache"
              },
              body: JSON.stringify({ count: json.count || 0 })
            });
          } catch(e) {
            resolve({
              statusCode: 200,
              headers: { "Access-Control-Allow-Origin": "*" },
              body: '{"count":0}'
            });
          }
        });
      }
    ).on('error', () => {
      resolve({
        statusCode: 200,
        headers: { "Access-Control-Allow-Origin": "*" },
        body: '{"count":0}'
      });
    });
  });
};
