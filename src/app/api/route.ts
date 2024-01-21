
import type { NextRequest, NextResponse } from 'next/server';
import qs from 'qs';
export async function GET(request: NextRequest, response: NextResponse) {

    try {
        const rawParams:string = request.url.split('?')[1].replace('audio=','');
        console.log(rawParams);
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