import type { NextRequest, NextResponse } from 'next/server';
import qs from 'qs';
export const dynamic = 'force-dynamic';
export async function GET(request: NextRequest, response: NextResponse) {
    const rawParams: string = request.nextUrl.searchParams.get("audio")?.trim() as string;
    try {
        const params = qs.parse(rawParams);
        // Now you have access to the query String parameters //
        // Or you can do it this way
        // const yourParamName = request.nextUrl.searchParams.get('audio');
        // console.log( yourParamName );
        // also try getAll() I think that might work
        if (rawParams) {
            return await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tracks/${rawParams}`)
        }
    } catch (error: unknown) {
        console.log(error);
    }
}