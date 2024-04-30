import { revalidateTag } from "next/cache";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    const secret = request.nextUrl.searchParams.get('secret');
    const tag = request.nextUrl.searchParams.get('tag');
    if (secret !== process.env.NEXT_PUBLIC_REVALIDATE_SECRET) {
        return new Response('Invalid secret', { status: 401 })
    }
    if (!tag) {
        return new Response('Invalid tag', { status: 401 })
    }
    revalidateTag(String(tag));
    return new Response('Revalidated', { status: 200 })
}