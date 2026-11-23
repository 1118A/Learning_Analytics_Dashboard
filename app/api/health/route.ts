import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    service: "oulad-portal-dashboard",
    version: "2.0.0",
    dataset: "Open University Learning Analytics Dataset (OULAD)",
    metrics: {
      students: 32593,
      modules: 7,
      presentations: 4,
    },
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
}
