import {  NextResponse } from 'next/server';
import data from "@/data/articles";
export async function GET() {
  return NextResponse.json(data);
}
