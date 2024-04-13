import { NextRequest, NextResponse } from "next/server";
const randomInt = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
export async function GET(request: NextRequest, response: NextResponse) {
    const random = randomInt(1, 10);
    return NextResponse.json({ data: random });

}