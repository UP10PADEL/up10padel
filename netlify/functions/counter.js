exports.handler = async function() {
  const count = parseInt(process.env.JOUEURS_INSCRITS || '0');
  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "no-cache, no-store"
    },
    body: JSON.stringify({ count })
  };
};
