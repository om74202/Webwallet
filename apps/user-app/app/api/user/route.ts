import { getServerSession } from "next-auth"
import { NextResponse } from "next/server";
import { authOptions } from "../../../lib/auth";
import { num } from "@repo/common/nums";


export const GET = async () => {
    try{
        console.log(num)
        const session = await getServerSession(authOptions);

    if (session.user) {
        return NextResponse.json({
            user: session.user
        })
    }
    }catch(e){
        return NextResponse.json({
            message: "You are not logged in , please signin first"
        }, {
            status: 403
        })
    }
    
}