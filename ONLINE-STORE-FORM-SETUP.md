# Online Store Client Form - Setup Guide

## 📋 What This Is

A comprehensive client intake form that collects all necessary information to build a custom online store with payment integration. The form covers:

- Business information
- Domain & hosting preferences
- Design preferences with logo upload
- Product details with sample image uploads
- Payment gateway options (Paystack, Flutterwave, PayPal, Stripe, etc.)
- Shipping & delivery requirements
- Features & functionality needs
- Social media integration
- Budget & timeline

## ✨ New Features

### Image Upload Capabilities:
- **Logo Upload**: Clients can upload their business logo (PNG, JPG, SVG - Max 5MB)
- **Product Images**: Upload 3-10 sample product images (Max 5MB each)
- **Image Preview**: See uploaded images before submission
- **Easy Removal**: Remove unwanted images with one click
- **Auto Storage**: Files automatically saved to Google Drive
- **Shareable Links**: Get direct links to uploaded files

## 🚀 Quick Start

### Option 1: Use Locally (No Backend)

1. Open `online-store-client-form.html` in a browser
2. Fill out the form
3. Submit - data will be logged to browser console
4. Copy the console data for your records

### Option 2: Integrate with Google Sheets (Recommended)

This saves all form submissions automatically to a Google Sheet.

## 📊 Google Sheets Integration Setup

### Step 1: Create Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "Online Store Client Requests"

### Step 2: Add Apps Script

1. In your Google Sheet, click **Extensions** → **Apps Script**
2. Delete any existing code
3. Copy ALL the code from `online-store-form-backend.gs`
4. Paste it into the Apps Script editor
5. **IMPORTANT:** Change line 60:
   ```javascript
   const recipient = 'your-email@example.com';
   ```
   Replace with YOUR email address

6. Click **Save** (💾 icon)
7. Name the project "Online Store Form Handler"

### Step 3: Set Up Sheet Headers

1. In the Apps Script editor, click **Run** → Select `setupSheet`
2. Click **Run** button
3. You'll see a permission dialog:
   - Click **Review Permissions**
   - Choose your Google account
   - Click **Advanced** → **Go to [project name] (unsafe)**
   - Click **Allow**

4. Go back to your spreadsheet - you'll see headers are now set up!

### Step 4: Deploy as Web App

1. In Apps Script editor, click **Deploy** → **New deployment**
2. Click the gear icon ⚙️ → Select **Web app**
3. Fill in:
   - **Description:** "Online Store Form API"
   - **Execute as:** Me
   - **Who has access:** Anyone
4. Click **Deploy**
5. Copy the **Web app URL** (looks like: `https://script.google.com/macros/s/...../exec`)
6. Click **Done**

### Step 5: Update HTML Form

1. Open `online-store-client-form.html`
2. Find the `<script>` section at the bottom
3. Replace the submit handler with this code:

```javascript
document.getElementById('clientForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Show loading state
    const submitBtn = this.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Submitting...';
    submitBtn.disabled = true;
    
    // Collect form data
    const formData = new FormData(this);
    const data = {};
    
    for (let [key, value] of formData.entries()) {
        if (data[key]) {
            if (Array.isArray(data[key])) {
                data[key].push(value);
            } else {
                data[key] = [data[key], value];
            }
        } else {
            data[key] = value;
        }
    }
    
    try {
        // Send to Google Sheets
        const response = await fetch('YOUR_WEB_APP_URL_HERE', {
            method: 'POST',
            body: JSON.stringify(data)
        });
        
        const result = await response.json();
        
        if (result.status === 'success') {
            // Show success message
            document.getElementById('successMessage').classList.add('active');
            window.scrollTo({ top: 0, behavior: 'smooth' });
            
            // Reset form
            this.reset();
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                document.getElementById('successMessage').classList.remove('active');
            }, 5000);
        } else {
            alert('Error submitting form. Please try again or contact us directly.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error submitting form. Please try again or contact us directly.');
    } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
});
```

4. Replace `YOUR_WEB_APP_URL_HERE` with the Web app URL you copied in Step 4
5. Save the file

## 📧 Email Notifications

When someone submits the form, you'll receive an email with:
- Business name and contact info
- Domain and hosting preferences
- Product details
- Payment methods selected
- Budget and timeline
- All other important details

## 📱 Sharing the Form

### Option 1: Send HTML File
- Email the `online-store-client-form.html` file to your client
- They can open it in any browser and fill it out

### Option 2: Host Online
- Upload to your website
- Share the URL with clients
- They fill it out online

### Option 3: GitHub Pages (Free Hosting)
1. Create a GitHub repository
2. Upload `online-store-client-form.html`
3. Enable GitHub Pages in repository settings
4. Share the GitHub Pages URL

## 📊 Viewing Submissions

1. Open your Google Sheet
2. Each submission appears as a new row
3. Columns include:
   - Timestamp
   - All business information
   - Design preferences
   - Product details
   - Payment methods
   - Features requested
   - Budget & timeline
   - **Logo File URL** (clickable link to uploaded logo)
   - **Product Image URLs** (clickable links to uploaded images)
   - Status (New/In Progress/Completed)

### Accessing Uploaded Files:
1. Click on the URL in the "Logo File URL" or "Product Image URLs" column
2. Files open directly in Google Drive
3. You can download, share, or use them in the project
4. All files are stored in "Online Store Client Uploads" folder in your Drive

## 🎨 Customization

### Change Colors
Edit the CSS in the `<style>` section:
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```
Replace with your brand colors.

### Add/Remove Questions
1. Find the relevant section in the HTML
2. Copy an existing form group
3. Modify the label and input name
4. Update the Google Apps Script to include the new field

### Change Email Recipient
In `online-store-form-backend.gs`, line 60:
```javascript
const recipient = 'your-email@example.com';
```

## 💡 Tips for Clients

1. **Be Detailed:** The more information provided, the better the final product
2. **Reference Sites:** Include URLs of websites they like
3. **Product Images:** Mention if they have professional photos ready
4. **Payment Accounts:** Note if they already have Paystack/Flutterwave accounts
5. **Timeline:** Be realistic about when they need the store ready

## 🔒 Security Notes

- Form submissions are sent over HTTPS
- Google Sheets access is controlled by your Google account
- No sensitive payment information is collected (only preferences)
- Client data is stored securely in your Google Drive

## 📞 Support

If you need help:
1. Check that the Web App URL is correct in the HTML
2. Verify Apps Script permissions are granted
3. Check browser console for errors (F12)
4. Test with a sample submission

## 🎯 Next Steps After Form Submission

1. Review the client's requirements in Google Sheet
2. Check domain availability
3. Prepare a detailed quote based on:
   - Number of products
   - Features requested
   - Payment integrations needed
   - Timeline requirements
4. Schedule a call to discuss details
5. Send proposal and contract
6. Begin development!

## 💰 Pricing Guide (Based on Form Responses)

Use the form data to calculate pricing:

**Basic Store (₦100k - ₦200k):**
- 1-50 products
- 1-2 payment methods
- Basic features
- Simple design

**Professional Store (₦200k - ₦400k):**
- 50-100 products
- Multiple payment methods
- Advanced features (reviews, wishlist, etc.)
- Custom design
- Email marketing integration

**Enterprise Store (₦400k+):**
- 100+ products
- All payment methods
- Full feature set
- Custom design & branding
- Inventory management
- Analytics dashboard
- Ongoing support

## 📋 Checklist After Receiving Form

- [ ] Review all client information
- [ ] Check domain availability
- [ ] Verify payment gateway requirements
- [ ] Assess timeline feasibility
- [ ] Calculate accurate quote
- [ ] Prepare proposal document
- [ ] Schedule client meeting
- [ ] Send contract and invoice
- [ ] Begin project planning

---

**Form Created By:** Berachah Global Concepts  
**Version:** 1.0  
**Last Updated:** February 2026
