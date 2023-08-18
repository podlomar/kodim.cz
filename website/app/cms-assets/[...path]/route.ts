import { promises as fs } from 'fs';
import { NextResponse } from 'next/server'
import { cms } from '../../../lib/cms';

interface Params {
  params: {
    path: string[];
  }
}

export const GET = async (req: Request, { params }: Params) => {
  const { path } = params;
  const entryPath = path.slice(0, -1);
  const cursor = cms.rootCursor().navigate(...entryPath);
  const asset = await cms.loadAsset(cursor, path.at(-1)!);

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
