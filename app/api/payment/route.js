/**
 * MIDTRANS PAYMENT API ROUTE
 * =========================
 * As an FE dev, think of this as: "Your frontend calls this API.
 * This file runs on the server, talks to Midtrans, and returns a token.
 * You never put Server Key in frontend—only here."
 */

import { NextResponse } from 'next/server';
import midtransClient from 'midtrans-client';

// This runs only on the server. Server Key is safe here.
const serverKey = process.env.MIDTRANS_SERVER_KEY;

export async function POST(request) {
  try {
    if (!serverKey) {
      return NextResponse.json(
        { error: 'MIDTRANS_SERVER_KEY is not set in .env.local' },
        { status: 500 }
      );
    }

    const body = await request.json();
    const {
      orderId,
      grossAmount,
      customerName,
      customerPhone,
      itemName,
    } = body;

    if (!orderId || !grossAmount) {
      return NextResponse.json(
        { error: 'orderId and grossAmount are required' },
        { status: 400 }
      );
    }

    // Initialize Snap (Midtrans popup UI)
    const snap = new midtransClient.Snap({
      isProduction: false, // Use true when going live with real money
      serverKey,
    });

    // Build the transaction payload for Midtrans
    const parameter = {
      transaction_details: {
        order_id: orderId,
        gross_amount: grossAmount,
      },
      customer_details: {
        first_name: customerName || 'Guest',
        phone: customerPhone || '',
      },
      item_details: [
        {
          name: itemName || 'Pilates Booking',
          price: grossAmount,
          quantity: 1,
        },
      ],
    };

    // Request token from Midtrans
    const transaction = await snap.createTransaction(parameter);
    const token = transaction.token;

    return NextResponse.json({ token });
  } catch (error) {
    console.error('Midtrans token error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create payment token' },
      { status: 500 }
    );
  }
}
