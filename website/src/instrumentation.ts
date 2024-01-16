export const register = async () => {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const { initiateCms } = await import("lib/cms");
    (global as any).cms = await initiateCms();  
    console.log('repoRegistry', (global as any).cms.repoRegistry);
  }
};
