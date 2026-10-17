export default function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.status(200).json({
    status: 'online',
    platform: 'Saúde Sem Mitos Studio',
    version: '2.0.0',
    endpoints: ['/api/content/generate'],
    timestamp: new Date().toISOString(),
  });
}
