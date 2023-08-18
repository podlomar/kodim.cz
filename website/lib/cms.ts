import { KodimCms } from 'kodim-cms/esm/index.js';

export const cms = await KodimCms.load(
  '/home/podlomar/work/kodim.cz/content',
  {
    assetsBasePath: '/cms-assets',
  },
);
