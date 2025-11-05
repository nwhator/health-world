import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { appointmentId, rating, comment } = body

    // In production, save review to database
    const review = {
      id: Math.random().toString(),
      appointmentId,
      rating,
      comment,
      isModerated: false,
      createdAt: new Date(),
    }

    return NextResponse.json({ review }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
