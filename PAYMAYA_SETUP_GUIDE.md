# PayMaya Payment Gateway Integration Guide

This guide will help you integrate PayMaya (Maya) payment gateway into your PA Energy frontend application.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [PayMaya Account Setup](#paymaya-account-setup)
3. [API Credentials](#api-credentials)
4. [Backend Integration](#backend-integration)
5. [Frontend Integration](#frontend-integration)
6. [Testing](#testing)
7. [Production Deployment](#production-deployment)

---

## Prerequisites

- PayMaya business account
- Backend server (Node.js, PHP, Python, etc.)
- HTTPS enabled (required for production)
- Basic understanding of REST APIs

---

## PayMaya Account Setup

### Step 1: Create PayMaya Business Account

1. Go to [PayMaya Business](https://business.paymaya.com/)
2. Click "Sign Up" or "Get Started"
3. Fill in your business information:
   - Business name: PA Energy
   - Business type: Select appropriate type
   - Contact information
   - Bank account details
4. Complete the verification process
5. Wait for account approval (usually 1-3 business days)

### Step 2: Access PayMaya Dashboard

1. Log in to your PayMaya Business dashboard
2. Navigate to **Settings** > **API Keys**
3. You'll need both **Public Key** and **Secret Key**

---

## API Credentials

### Sandbox (Testing) Environment

PayMaya provides a sandbox environment for testing:

- **Sandbox Public Key**: Available in dashboard
- **Sandbox Secret Key**: Available in dashboard
- **Base URL**: `https://pg-sandbox.paymaya.com`

### Production Environment

After testing, switch to production:

- **Production Public Key**: Available after account approval
- **Production Secret Key**: Available after account approval
- **Base URL**: `https://pg.paymaya.com`

---

## Backend Integration

### Option 1: Direct API Integration (Recommended)

Create a backend endpoint to handle PayMaya Checkout API.

#### Example: Node.js/Express Backend

```javascript
// Install required packages
// npm install axios express cors dotenv

const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Environment variables
const PAYMAYA_SECRET_KEY = process.env.PAYMAYA_SECRET_KEY;
const PAYMAYA_BASE_URL = process.env.PAYMAYA_BASE_URL || 'https://pg-sandbox.paymaya.com';

// Create Checkout
app.post('/api/payment/create-checkout', async (req, res) => {
  try {
    const { amount, customerName, email, phone, description, invoiceNumber } = req.body;

    // Validate amount
    const totalAmount = parseFloat(amount);
    if (isNaN(totalAmount) || totalAmount <= 0) {
      return res.status(400).json({ error: 'Invalid amount' });
    }

    // Prepare PayMaya checkout request
    const checkoutData = {
      totalAmount: {
        value: totalAmount.toFixed(2),
        currency: 'PHP'
      },
      buyer: {
        firstName: customerName.split(' ')[0] || customerName,
        lastName: customerName.split(' ').slice(1).join(' ') || '',
        contact: {
          phone: phone,
          email: email
        }
      },
      items: [
        {
          name: description || 'Solar Energy Service',
          quantity: 1,
          code: invoiceNumber || 'INV-001',
          description: description || 'Payment for solar energy services',
          amount: {
            value: totalAmount.toFixed(2),
            currency: 'PHP'
          },
          totalAmount: {
            value: totalAmount.toFixed(2),
            currency: 'PHP'
          }
        }
      ],
      redirectUrl: {
        success: `${process.env.FRONTEND_URL}/payment/success`,
        failure: `${process.env.FRONTEND_URL}/payment/failure`,
        cancel: `${process.env.FRONTEND_URL}/payment/cancel`
      },
      requestReferenceNumber: invoiceNumber || `PAE-${Date.now()}`
    };

    // Call PayMaya Checkout API
    const response = await axios.post(
      `${PAYMAYA_BASE_URL}/checkout/v1/checkouts`,
      checkoutData,
      {
        headers: {
          'Authorization': `Basic ${Buffer.from(PAYMAYA_SECRET_KEY + ':').toString('base64')}`,
          'Content-Type': 'application/json'
        }
      }
    );

    // Return checkout URL to frontend
    res.json({
      success: true,
      checkoutId: response.data.checkoutId,
      redirectUrl: response.data.redirectUrl
    });

  } catch (error) {
    console.error('PayMaya API Error:', error.response?.data || error.message);
    res.status(500).json({
      error: 'Payment processing failed',
      message: error.response?.data?.message || error.message
    });
  }
});

// Verify Payment Status
app.get('/api/payment/verify/:checkoutId', async (req, res) => {
  try {
    const { checkoutId } = req.params;

    const response = await axios.get(
      `${PAYMAYA_BASE_URL}/checkout/v1/checkouts/${checkoutId}`,
      {
        headers: {
          'Authorization': `Basic ${Buffer.from(PAYMAYA_SECRET_KEY + ':').toString('base64')}`
        }
      }
    );

    res.json({
      status: response.data.status,
      paymentStatus: response.data.paymentStatus
    });

  } catch (error) {
    console.error('Payment verification error:', error);
    res.status(500).json({ error: 'Verification failed' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

### Environment Variables (.env)

```env
# PayMaya Configuration
PAYMAYA_SECRET_KEY=your_secret_key_here
PAYMAYA_PUBLIC_KEY=your_public_key_here
PAYMAYA_BASE_URL=https://pg-sandbox.paymaya.com

# Frontend URL
FRONTEND_URL=http://localhost:5173

# Server Port
PORT=3000
```

---

## Frontend Integration

### Update Payment.vue

Replace the `handlePayment` function in `src/views/Payment.vue`:

```typescript
const handlePayment = async () => {
  if (!isFormValid.value) {
    errorMessage.value = 'Please fill in all required fields with valid information.'
    return
  }

  isProcessing.value = true
  paymentStatus.value = 'processing'
  errorMessage.value = ''

  try {
    // Call your backend API
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/payment/create-checkout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: paymentForm.value.amount,
        customerName: paymentForm.value.customerName,
        email: paymentForm.value.email,
        phone: paymentForm.value.phone,
        description: paymentForm.value.description,
        invoiceNumber: paymentForm.value.invoiceNumber
      })
    })

    const data = await response.json()

    if (data.success && data.redirectUrl) {
      // Redirect to PayMaya checkout
      window.location.href = data.redirectUrl
    } else {
      throw new Error(data.message || 'Failed to create checkout')
    }
  } catch (error) {
    paymentStatus.value = 'error'
    errorMessage.value = error instanceof Error ? error.message : 'Payment processing failed. Please try again or contact support.'
    console.error('Payment error:', error)
  } finally {
    isProcessing.value = false
  }
}
```

### Create Payment Success/Failure Pages

Create `src/views/PaymentSuccess.vue`:

```vue
<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center p-4">
    <div class="bg-white rounded-2xl shadow-xl p-8 max-w-md text-center">
      <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h1 class="text-2xl font-bold text-[#0A2540] mb-2">Payment Successful!</h1>
      <p class="text-gray-600 mb-6">Thank you for your payment. We'll process your order shortly.</p>
      <router-link to="/" class="bg-[#FF6B35] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#E55A2B] transition-colors inline-block">
        Return to Home
      </router-link>
    </div>
  </div>
</template>
```

Create `src/views/PaymentFailure.vue`:

```vue
<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center p-4">
    <div class="bg-white rounded-2xl shadow-xl p-8 max-w-md text-center">
      <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>
      <h1 class="text-2xl font-bold text-[#0A2540] mb-2">Payment Failed</h1>
      <p class="text-gray-600 mb-6">Your payment could not be processed. Please try again.</p>
      <div class="flex space-x-4">
        <router-link to="/payment" class="bg-[#FF6B35] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#E55A2B] transition-colors inline-block">
          Try Again
        </router-link>
        <router-link to="/" class="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors inline-block">
          Go Home
        </router-link>
      </div>
    </div>
  </div>
</template>
```

### Add Routes

Update `src/router.ts`:

```typescript
{
  path: '/payment/success',
  name: 'PaymentSuccess',
  component: () => import('@/views/PaymentSuccess.vue')
},
{
  path: '/payment/failure',
  name: 'PaymentFailure',
  component: () => import('@/views/PaymentFailure.vue')
},
{
  path: '/payment/cancel',
  name: 'PaymentCancel',
  component: () => import('@/views/PaymentFailure.vue')
}
```

### Environment Variables

Create `.env` file in project root:

```env
VITE_API_URL=http://localhost:3000
```

For production, update Vercel environment variables:
- `VITE_API_URL`: Your production backend URL

---

## Testing

### Test Cards (Sandbox)

PayMaya provides test cards for sandbox testing:

**Successful Payment:**
- Card Number: `5123456789012346`
- Expiry: Any future date (e.g., `12/25`)
- CVV: `123`
- OTP: `123456`

**Failed Payment:**
- Card Number: `5123456789012347`
- Use any expiry and CVV

### Testing Checklist

- [ ] Create checkout successfully
- [ ] Redirect to PayMaya checkout page
- [ ] Complete payment with test card
- [ ] Verify success redirect
- [ ] Verify failure redirect
- [ ] Test cancel flow
- [ ] Verify payment status in dashboard

---

## Production Deployment

### Step 1: Switch to Production API

1. Update environment variables:
   ```env
   PAYMAYA_BASE_URL=https://pg.paymaya.com
   PAYMAYA_SECRET_KEY=your_production_secret_key
   PAYMAYA_PUBLIC_KEY=your_production_public_key
   FRONTEND_URL=https://yourdomain.com
   ```

### Step 2: Enable HTTPS

PayMaya requires HTTPS in production. Ensure:
- Your domain has SSL certificate
- All API calls use HTTPS
- Redirect URLs use HTTPS

### Step 3: Webhook Setup (Optional but Recommended)

Set up webhooks to receive payment notifications:

1. In PayMaya dashboard, go to **Settings** > **Webhooks**
2. Add webhook URL: `https://your-backend.com/api/payment/webhook`
3. Handle webhook events in your backend

### Step 4: Security Best Practices

- Never expose secret keys in frontend
- Always validate payment on backend
- Use HTTPS for all requests
- Implement rate limiting
- Log all payment transactions
- Implement proper error handling

---

## Additional Resources

- [PayMaya Developer Documentation](https://developers.paymaya.com/)
- [PayMaya Checkout API Reference](https://developers.paymaya.com/blog/2019/01/10/checkout-api)
- [PayMaya Support](https://support.paymaya.com/)

---

## Support

For technical issues:
- Email: lfaderon@gmail.com
- Phone: +63 956 677 7790

---

**Note:** This guide provides a basic integration. For production use, implement additional security measures, error handling, and payment verification.

