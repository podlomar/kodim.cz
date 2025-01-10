import { KodimCms } from 'kodim-cms';

export const initiateCms = async (): Promise<KodimCms> => {
  return await KodimCms.load('/content');
}

export const cms = () => (global as any).cms as KodimCms;

export const agnosticAgent = {
  name: 'Agnostic',
  getPermission: () => 'open',
};
