import { NextRequest, NextResponse } from 'next/server'
import { mockServices } from '@/lib/mock-data'

export async function GET(request: NextRequest) {
  return NextResponse.json({ services: mockServices })
}
