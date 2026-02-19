# 📋 Portfolio Booking System Setup Guide

## Overview
This guide will help you set up the booking system for your Berachah Portfolio so you can receive and manage booking requests from potential clients.

---

## 🎯 What You'll Get

### Features:
- ✅ Booking form on your portfolio website
- ✅ All bookings saved to Google Sheets
- ✅ Email notifications for new bookings
- ✅ Easy to view and manage bookings
- ✅ Export bookings to Excel/PDF
- ✅ Track booking status and add notes

---

## 📋 Setup Instructions

### Step 1: Create Google Spreadsheet

1. Go to https://sheets.google.com
2. Click "Blank" to create a new spreadsheet
3. Name it: "Berachah Portfolio Bookings"
4. Copy the Spreadsheet ID from the URL:
   ```
   https://docs.google.com/spreadsheets/d/SPREADSHEET_ID_HERE/edit
   ```
   Example: `1T88t9Q1nRjyfnaTcUg6O9HudkOokOvDbmR3In1Ql5d8`

### Step 2: Create Google Apps Script

1. In your Google Sheet, click **Extensions** → **Apps Script**
2. Delete any existing code
3. Copy all the code from `portfolio-bookings.gs`
4. Paste it into the Apps Script editor
5. **Update Line 18** with your Spreadsheet ID:
   ```javascript
   var spreadsheetId = 'YOUR_SPREADSHEET_ID_HERE';
   ```
6. Click **Save** (disk icon)
7. Name the project: "Portfolio Bookings API"

### Step 3: Deploy as Web App

1. Click **Deploy** → **New deployment**
2. Click the gear icon ⚙️ next to "Select type"
3. Choose **Web app**
4. Fill in the details:
   - **Description:** Portfolio Bookings API
   - **Execute as:** Me
   - **Who has access:** Anyone
5. Click **Deploy**
6. Click **Authorize access**
7. Choose your Google account
8. Click **Advanced** → **Go to Portfolio Bookings API (unsafe)**
9. Click **Allow**
10. **Copy the Web App URL** (looks like: `https://script.google.com/macros/s/...`)

### Step 4: Update Portfolio HTML

1. Open `berachah-portfolio.html`
2. Find this line (around line 1050):
   ```javascript
   var scriptURL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';
   ```
3. Replace with your Web App URL:
   ```javascript
   var scriptURL = 'https://script.google.com/macros/s/AKfycby.../exec';
   ```
4. Save the file

### Step 5: Test the System

1. Open `berachah-portfolio.html` in your browser
2. Scroll to the "Book a Service" section
3. Fill out the form with test data
4. Click "Submit Booking Request"
5. Check your Google Sheet - you should see the booking!
6. Check your email - you should receive a notification!

---

## 📊 Google Sheet Structure

Your Google Sheet will have these columns:

| Column | Description | Example |
|--------|-------------|---------|
| **Timestamp** | When booking was made | 2024-02-17 10:30:00 |
| **Name** | Client's full name | John Doe |
| **Email** | Client's email | john@school.com |
| **Phone** | Client's phone | +234 800 123 4567 |
| **Organization** | School/company name | Grace International School |
| **Service** | Service requested | School Website Development |
| **Message** | Project details | We need a modern website... |
| **Status** | Booking status | New / Contacted / In Progress / Completed |
| **Notes** | Your internal notes | Called on 2024-02-18, quoted ₦150k |

---

## 📧 Email Notifications

### What You'll Receive:

Every time someone submits a booking, you'll get an email like this:

```
Subject: 🎉 New Booking Request - John Doe

You have received a new booking request!

📅 Date: 2024-02-17 10:30:00
👤 Name: John Doe
📧 Email: john@school.com
📱 Phone: +234 800 123 4567
🏫 Organization: Grace International School
🛠️ Service: School Website Development
💬 Message:
We need a modern website for our school with student portal,
news section, and photo gallery. Budget is around ₦200,000.

---
View all bookings: [Link to your Google Sheet]
```

### Change Email Address:

To receive notifications at a different email:

1. Open `portfolio-bookings.gs` in Apps Script
2. Find line 130:
   ```javascript
   var recipient = 'berachahglobalconcept@gmail.com';
   ```
3. Change to your email address
4. Save and redeploy

---

## 🔍 How to Check Bookings

### Method 1: Google Sheets (Recommended)

1. Go to https://sheets.google.com
2. Open "Berachah Portfolio Bookings"
3. View all bookings in the "Bookings" sheet
4. Update **Status** column as you process each booking
5. Add **Notes** for follow-up information

### Method 2: Email Notifications

- Check your email inbox
- Each booking sends an automatic notification
- Click the link in the email to view the Google Sheet

### Method 3: Mobile App

- Install Google Sheets app on your phone
- Open "Berachah Portfolio Bookings"
- View and manage bookings on the go

---

## 📱 Managing Bookings

### Update Booking Status:

1. Open your Google Sheet
2. Find the booking row
3. Update the **Status** column:
   - **New** - Just received
   - **Contacted** - You've reached out to them
   - **In Progress** - Working on quote/proposal
   - **Completed** - Project booked/completed
   - **Cancelled** - Client cancelled

### Add Notes:

1. Click on the **Notes** column for that booking
2. Add your internal notes:
   - Call date and time
   - Quote amount
   - Follow-up reminders
   - Special requirements

### Example:
```
Status: Contacted
Notes: Called on 2024-02-18 at 2pm. Interested in School Accounting System. 
       Quoted ₦150,000 for Professional package. Follow up on Friday.
```

---

## 📊 Booking Reports

### View Statistics:

1. In Google Sheets, create a new sheet called "Dashboard"
2. Use formulas to track:
   - Total bookings
   - Bookings by service
   - Bookings by status
   - Conversion rate

### Export Data:

**To Excel:**
1. File → Download → Microsoft Excel (.xlsx)

**To PDF:**
1. File → Download → PDF Document (.pdf)

**To CSV:**
1. File → Download → Comma Separated Values (.csv)

---

## 🔧 Customization

### Add More Fields:

To add custom fields to the booking form:

1. **Update HTML form** in `berachah-portfolio.html`:
   ```html
   <div class="form-group">
       <label>Budget Range</label>
       <select name="budget">
           <option value="under-100k">Under ₦100,000</option>
           <option value="100k-300k">₦100,000 - ₦300,000</option>
           <option value="over-300k">Over ₦300,000</option>
       </select>
   </div>
   ```

2. **Update JavaScript** to include new field:
   ```javascript
   budget: formData.get('budget'),
   ```

3. **Update Apps Script** to save new field:
   - Add column header in `setupBookingsSheet()`
   - Add field in `addBooking()` function

### Change Email Template:

Edit the `sendEmailNotification()` function in `portfolio-bookings.gs` to customize the email format.

---

## 🆘 Troubleshooting

### Issue: Form submits but no data in Google Sheet

**Solution:**
1. Check the Apps Script URL is correct in HTML
2. Verify the Spreadsheet ID in Apps Script
3. Check Apps Script execution logs:
   - Apps Script Editor → Executions
   - Look for errors

### Issue: No email notifications

**Solution:**
1. Check your email address in `portfolio-bookings.gs`
2. Check spam/junk folder
3. Verify Gmail permissions in Apps Script

### Issue: "Authorization required" error

**Solution:**
1. Redeploy the Web App
2. Go through authorization process again
3. Make sure "Who has access" is set to "Anyone"

### Issue: CORS error in browser console

**Solution:**
- This is normal for Google Apps Script
- The booking should still work
- Check your Google Sheet to confirm

---

## 🔒 Security & Privacy

### Data Protection:
- All data stored in your private Google Sheet
- Only you can access the spreadsheet
- Google's security protects your data
- Automatic backups by Google

### GDPR Compliance:
- Add privacy policy to your website
- Inform users their data will be stored
- Provide option to delete their data
- Keep data only as long as needed

### Best Practices:
- Don't share your Spreadsheet ID publicly
- Don't share your Apps Script URL publicly
- Regularly review and delete old bookings
- Use strong password for Google account

---

## 📈 Advanced Features

### Auto-Response Email:

Add this function to send automatic confirmation to clients:

```javascript
function sendClientConfirmation(booking) {
  var subject = 'Thank you for your booking request - Berachah Global Concepts';
  
  var body = 'Dear ' + booking.name + ',\n\n';
  body += 'Thank you for your interest in our services!\n\n';
  body += 'We have received your booking request for: ' + booking.service + '\n\n';
  body += 'We will review your requirements and get back to you within 24 hours.\n\n';
  body += 'Best regards,\n';
  body += 'Berachah Global Concepts Team\n';
  body += 'Email: berachahglobalconcept@gmail.com\n';
  body += 'Phone: +234 803 952 4688';
  
  MailApp.sendEmail(booking.email, subject, body);
}
```

Then call it in `addBooking()` function.

### SMS Notifications:

Integrate with SMS API (like Twilio or Termii) to receive SMS when new booking arrives.

### Slack/WhatsApp Integration:

Send booking notifications to Slack or WhatsApp for instant alerts.

---

## ✅ Checklist

Before going live:

- [ ] Google Sheet created
- [ ] Apps Script deployed
- [ ] Spreadsheet ID updated in script
- [ ] Web App URL updated in HTML
- [ ] Email address updated in script
- [ ] Test booking submitted successfully
- [ ] Booking appears in Google Sheet
- [ ] Email notification received
- [ ] Portfolio uploaded to hosting
- [ ] Booking form tested from live site

---

## 📞 Support

If you need help:
1. Check the troubleshooting section above
2. Review Google Apps Script execution logs
3. Test with the `testAddBooking()` function in Apps Script
4. Check browser console for JavaScript errors

---

## 🎉 You're Ready!

Your portfolio booking system is now set up! Every time someone books a service:

1. ✅ Form data saved to Google Sheets
2. ✅ Email notification sent to you
3. ✅ Client sees success message
4. ✅ You can track and manage bookings

**Start receiving bookings and growing your business!** 🚀