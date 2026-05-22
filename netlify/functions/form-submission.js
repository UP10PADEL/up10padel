const https = require('https');

exports.handler = async function(event) {
  const token = process.env.GITHUB_TOKEN;
  if (!token) return { statusCode: 200, body: 'No token' };

  const payload = JSON.stringify({ event_type: 'form-submission' });

  return new Promise((resolve) => {
    const options = {
      hostname: 'api.github.com',
      path: '/repos/UP10PADEL/up10padel/dispatches',
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload),
        'User-Agent': 'UP10PADEL-Counter'
      }
    };
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve({
        statusCode: 200,
        body: JSON.stringify({ status: res.statusCode })
      }));
    });
    req.on('error', () => resolve({ statusCode: 200, body: 'error' }));
    req.write(payload);
    req.end();
  });
};
