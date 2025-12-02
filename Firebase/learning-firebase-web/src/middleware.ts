import { NextResponse } from "next/server";

function middleware() {
    return NextResponse.next();
}

export default middleware;