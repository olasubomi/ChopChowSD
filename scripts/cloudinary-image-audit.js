// Temporary staging-only diagnostic. Never logs credentials or modifies assets.
const cloudinary = require('cloudinary').v2;
async function audit() {
  if (process.env.STAGING_MODE !== 'true') throw new Error('Staging only');
  const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_KEY, CLOUDINARY_SECRET } = process.env;
  if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_KEY || !CLOUDINARY_SECRET) throw new Error('Missing Cloudinary configuration');
  cloudinary.config({cloud_name:CLOUDINARY_CLOUD_NAME,api_key:CLOUDINARY_KEY,api_secret:CLOUDINARY_SECRET});
  let cursor, count = 0, pages = 0;
  do {
    const result = await cloudinary.api.resources({resource_type:'image',type:'upload',max_results:100, ...(cursor ? {next_cursor:cursor} : {})});
    for (const asset of result.resources || []) {
      count++;
      console.log('[image-audit] asset', JSON.stringify({public_id:asset.public_id,format:asset.format,asset_folder:asset.asset_folder,created_at:asset.created_at}));
    }
    cursor = result.next_cursor;
    pages++;
  } while (cursor && pages < 20);
  console.log('[image-audit] summary', JSON.stringify({count,complete:!cursor,pages}));
}
audit().catch(error => { console.error('[image-audit] failed', JSON.stringify({status:error.http_code || null,name:error.name || 'Error'})); process.exitCode=1; });
