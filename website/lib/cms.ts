import { KodimCms } from 'kodim-cms/esm/index.js';

export const cms = await KodimCms.load(
  process.env.CMS_CONTENT_PATH!,
  {
    assetsBasePath: '/cms-assets',
  },
);
