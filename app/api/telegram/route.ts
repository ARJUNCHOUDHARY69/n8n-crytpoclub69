import { NextRequest, NextResponse } from 'next/server'

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID

export async function POST(request: NextRequest) {
  try {
    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      return NextResponse.json(
        { error: 'Telegram configuration missing' },
        { status: 200 } // Return 200 to prevent error modals
      )
    }

    const { message, type = 'info' } = await request.json()

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    // Format message based on type
    let formattedMessage = message
    if (type === 'alert') {
      formattedMessage = `🚨 CRYPTO ALERT 🚨\n\n${message}`
    } else if (type === 'news') {
      formattedMessage = `📰 CRYPTO NEWS 📰\n\n${message}`
    } else if (type === 'price') {
      formattedMessage = `💰 PRICE UPDATE 💰\n\n${message}`
    }

    // Send to Telegram
    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: formattedMessage,
          parse_mode: 'HTML',
        }),
      }
    )

    if (!telegramResponse.ok) {
      throw new Error('Failed to send Telegram message')
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Telegram API Error:', error)
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 200 } // Return 200 to prevent error modals
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Telegram API endpoint',
    endpoints: {
      sendMessage: 'POST /api/telegram',
    },
  })
}
