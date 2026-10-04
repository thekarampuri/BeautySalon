# Firebase Architecture & Setup Guide

> **Project:** Mahalaxmi Beauty Salon & Academy  
> **Backend:** Firebase (Authentication, Cloud Firestore, Firebase Storage)

---

## 1. Firebase Console Setup Instructions

1. **Create Firebase Project**:
   - Go to [Firebase Console](https://console.firebase.google.com/).
   - Click **Add Project** and name it `mahalaxmi-beauty-salon`.
   - Enable or skip Google Analytics as preferred.

2. **Enable Authentication**:
   - Navigate to **Build > Authentication > Sign-in method**.
   - Enable **Email/Password** provider.

3. **Enable Cloud Firestore**:
   - Navigate to **Build > Firestore Database**.
   - Click **Create database** (Select standard location e.g., `asia-south1`).
   - Copy the contents of [`firestore.rules`](file:///d:/Rajat/Projects/Mahalaxmi/BeautySalon/firestore.rules) into the Rules tab and Publish.

4. **Enable Firebase Storage**:
   - Navigate to **Build > Storage**.
   - Click **Get started**.
   - Copy the contents of [`storage.rules`](file:///d:/Rajat/Projects/Mahalaxmi/BeautySalon/storage.rules) into the Rules tab and Publish.

5. **Generate Web App Credentials**:
   - Go to **Project Settings > General > Your apps**.
   - Register a Web App (`BeautySalon Web`).
   - Copy the Firebase Configuration object values into `.env.local`.

6. **Generate Service Account Private Key**:
   - Go to **Project Settings > Service Accounts**.
   - Click **Generate new private key** (JSON).
   - Set `FIREBASE_CLIENT_EMAIL` and `FIREBASE_PRIVATE_KEY` in environment variables.

---

## 2. Environment Variables Specification

Configure the following variables in `.env.local` (local development) and Vercel (production):

```env
# Client-side Firebase Public Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=mahalaxmi-beauty-salon.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=mahalaxmi-beauty-salon
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=mahalaxmi-beauty-salon.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=1234567890
NEXT_PUBLIC_FIREBASE_APP_ID=1:1234567890:web:abcdef123456

# Server-side Firebase Admin SDK Configuration (PRIVILEGED - NEVER EXPOSE TO CLIENT)
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@mahalaxmi-beauty-salon.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...YOUR_PRIVATE_KEY...\n-----END PRIVATE KEY-----\n"
```

---

## 3. Trusted Initial Admin Provisioning Procedure

To grant an initial administrator account access to the `/admin` portal:

1. Create a user account in Firebase Console (**Authentication > Users > Add user**).
2. Note the generated User `UID`.
3. In Firestore Console (**Firestore Database > Data > Start collection**):
   - Collection ID: `profiles`
   - Document ID: `<USER_UID>`
   - Fields:
     - `uid` (string): `<USER_UID>`
     - `fullName` (string): `Admin User`
     - `role` (string): `admin`
     - `createdAt` (string): ISO Timestamp
     - `updatedAt` (string): ISO Timestamp

---

## 4. Seeding Firestore Data

To populate initial catalog, CMS pages, and settings:

```bash
npx tsx scripts/seed-firebase.ts
```

---

## 5. Security Summary

- **Public Visitors**: Read-only access to published CMS pages, active services, active courses, testimonials, and gallery images. Public visitors can create `enquiries` (`status='New'`) and `bookings` (`status='Pending'`), but cannot read existing submissions or add internal notes.
- **Admin Users**: Full read/write management across all 21 collections, enforced via Firestore Security Rules and Firebase Admin SDK session verification.
- **Financial Privacy**: `invoices`, `invoiceItems`, `students`, `studentPayments`, and `auditLogs` are strictly admin-only.
