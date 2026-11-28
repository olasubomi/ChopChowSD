// Read-only, explicitly invoked maintenance utility.
const cloudinary = require('cloudinary').v2;
const fs = require('node:fs');
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
async function retry(fn) {
  for (let attempt = 0; ; attempt++) {
    try { return await fn(); }
    catch (error) {
      if (![429, 420, 500, 502, 503, 504].includes(Number(error.http_code)) || attempt >= 5) throw error;
      await sleep(Math.min(60000, 2000 * 2 ** attempt));
    }
  }
}
async function audit() {
  if (process.env.MEDIA_AUDIT_READ_ONLY !== 'true') throw new Error('Explicit read-only audit opt-in required');
  const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_KEY, CLOUDINARY_SECRET } = process.env;
  if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_KEY || !CLOUDINARY_SECRET) throw new Error('Missing Cloudinary configuration');
  cloudinary.config({cloud_name:CLOUDINARY_CLOUD_NAME,api_key:CLOUDINARY_KEY,api_secret:CLOUDINARY_SECRET});
  const assets = new Map(), cursors = new Set();
  let cursor, pages = 0;
  do {
    const result = await retry(() => {
      let query = cloudinary.search.expression('resource_type:image OR resource_type:video OR resource_type:raw').sort_by('public_id','asc').max_results(100).with_field('context').with_field('tags');
      if (cursor) query = query.next_cursor(cursor);
      return query.execute();
    });
    for (const a of result.resources || []) {
      const key = a.asset_id || [a.resource_type,a.type,a.public_id].join(':');
      assets.set(key, {asset_id:a.asset_id,public_id:a.public_id,resource_type:a.resource_type,type:a.type,format:a.format,asset_folder:a.asset_folder,folder:a.folder,filename:a.filename,created_at:a.created_at,secure_url:a.secure_url,context:a.context,tags:a.tags});
    }
    cursor = result.next_cursor;
    if (cursor && cursors.has(cursor)) throw new Error('Repeated pagination cursor');
    if (cursor) cursors.add(cursor);
    pages++;
    console.log('[media-audit] page', pages, 'unique assets', assets.size);
    if (cursor) await sleep(500);
  } while (cursor);
  const report = {cloud_name:CLOUDINARY_CLOUD_NAME,generated_at:new Date().toISOString(),count:assets.size,pages,complete:true,assets:[...assets.values()]};
  fs.writeFileSync('cloudinary-inventory.json',JSON.stringify(report,null,2),{mode:0o600});
  console.log('[media-audit] complete',JSON.stringify({count:report.count,pages}));
}
audit().catch(error => { console.error('[media-audit] failed',JSON.stringify({status:error.http_code || null,name:error.name || 'Error'})); process.exitCode=1; });
