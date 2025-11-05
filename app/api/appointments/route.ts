import { NextRequest, NextResponse } from 'next/server'
import { mockAppointments } from '@/lib/mock-data'

export async function GET(request: NextRequest) {
  // In production, get user from session and fetch their appointments
  return NextResponse.json({ appointments: mockAppointments })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // In production, validate data and save to database
    const newAppointment = {
      id: Math.random().toString(),
      ...body,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    return NextResponse.json({ appointment: newAppointment }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
