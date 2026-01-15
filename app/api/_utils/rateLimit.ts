import { NextResponse } from "next/server";

// Limit 10 request per 60 sec
const LIMIT = 10;
const TIMELIMIT = 60*1000;

// ประกาศ variable ที่เก็บ ip, time stamp(array เพราะมีหลาย request ต่อ ip)
const ipLimitMap = new Map<string, number[]>();

export function limitRate(ip: string)
{
    // เช็ค time frame ปัจจุบันที่รับได้
    const now = Date.now();
    const timeFrame = now-TIMELIMIT;

    // เช็คใน variable ว่ามี ip นี้หรือยัง
    const thisIPTimeStamp = ipLimitMap.get(ip) ?? [];

    // Filter request ที่เกิน timeframe ออก
    const filteredTimeStamp = thisIPTimeStamp.filter((time) => time > timeFrame);

    // Check ว่าเกิน limit
    if (filteredTimeStamp.length >= LIMIT)
    {
        return NextResponse.json({message: "Too many Request"}, {status:429});
    }

    // เซฟ request ปัจจุบันที่ยังไม่เกิน timeframe
    filteredTimeStamp.push(now);
    ipLimitMap.set(ip, filteredTimeStamp);

    return null;
}