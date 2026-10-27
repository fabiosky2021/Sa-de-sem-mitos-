export async function handler() {
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      status: 'online',
      platform: 'Saúde Sem Mitos Studio',
      provider: 'Netlify Functions',
      version: '2.0.0',
      timestamp: new Date().toISOString(),
    }),
  };
}
