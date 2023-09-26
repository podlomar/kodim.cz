import { NextResponse } from 'next/server'
import { cms } from '../../../../lib/cms';

interface Params {
  params: {
    path: string[];
  }
}

export const GET = async (req: Request, { params }: Params) => {
  const { path } = params;
  const asset = await cms.loadAsset(path);
  if (asset === null) {
    return new NextResponse(null, {
      status: 404,
    });
  }

  return new NextResponse(asset?.data, {
    headers: {
      'Content-Type': asset.contentType,
    },
  });
}
