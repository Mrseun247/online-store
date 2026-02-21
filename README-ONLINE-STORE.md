# Online Store Client Intake Form

A comprehensive, professional client intake form for collecting all necessary information to build custom e-commerce websites with payment integration.

## 🌟 Live Demo

**Form URL:** [https://mrseun247.github.io/online-store/online-store-client-form.html](https://mrseun247.github.io/online-store/online-store-client-form.html)

## 📋 Features

### Information Collection
- ✅ Business information (name, contact, description)
- ✅ Domain & hosting preferences
- ✅ Design preferences (colors, style, references)
- ✅ Product details (type, quantity, categories)
- ✅ Payment gateway options (Paystack, Flutterwave, PayPal, Stripe, Bank Transfer, COD)
- ✅ Shipping & delivery requirements
- ✅ Feature requirements (search, reviews, wishlist, analytics, etc.)
- ✅ Social media integration
- ✅ Budget & timeline

### Image Upload Capabilities
- 📸 **Logo Upload**: Clients can upload their business logo (PNG, JPG, SVG - Max 5MB)
- 🖼️ **Product Images**: Upload 3-10 sample product images (Max 5MB each)
- 👁️ **Image Preview**: See uploaded images before submission
- ❌ **Easy Removal**: Remove unwanted images with one click
- ☁️ **Auto Storage**: Files automatically saved to Google Drive
- 🔗 **Shareable Links**: Get direct links to uploaded files

### Design Features
- 📱 Fully responsive (mobile, tablet, desktop)
- 🎨 Beautiful gradient design
- ✨ Smooth animations
- 🖱️ Drag-and-drop style file uploads
- ✅ Form validation
- 📧 Email notifications
- 📊 Google Sheets integration

## 🚀 Quick Start

### Option 1: Use Directly (No Setup Required)
1. Open `online-store-client-form.html` in any browser
2. Fill out the form
3. Submit - data will be logged to browser console

### Option 2: Host on GitHub Pages (Free)
1. Fork this repository
2. Go to Settings → Pages
3. Select "Deploy from branch" → Choose "master"
4. Your form will be live at: `https://yourusername.github.io/online-store/online-store-client-form.html`

### Option 3: Integrate with Google Sheets (Recommended)
See [ONLINE-STORE-FORM-SETUP.md](ONLINE-STORE-FORM-SETUP.md) for complete setup instructions.

## 📁 Files Included

- **online-store-client-form.html** - The main client intake form
- **online-store-form-backend.gs** - Google Apps Script for backend integration
- **ONLINE-STORE-FORM-SETUP.md** - Complete setup and integration guide

## 🔧 Setup Instructions

### Basic Setup (5 minutes)
1. Download `online-store-client-form.html`
2. Open in browser
3. Share with clients

### Google Sheets Integration (15 minutes)
1. Create a Google Sheet
2. Add the Apps Script code from `online-store-form-backend.gs`
3. Deploy as Web App
4. Update form with your Web App URL
5. Done! Submissions now save to your sheet

**Full instructions:** [ONLINE-STORE-FORM-SETUP.md](ONLINE-STORE-FORM-SETUP.md)

## 💰 Pricing Guide

Use form responses to calculate project pricing:

**Basic Store (₦100k - ₦200k)**
- 1-50 products
- 1-2 payment methods
- Basic features
- Simple design

**Professional Store (₦200k - ₦400k)**
- 50-100 products
- Multiple payment methods
- Advanced features
- Custom design
- Email marketing

**Enterprise Store (₦400k+)**
- 100+ products
- All payment methods
- Full feature set
- Custom branding
- Inventory management
- Analytics dashboard

## 🎨 Customization

### Change Colors
Edit the CSS gradient in the `<style>` section:
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

### Add/Remove Questions
1. Copy an existing form group
2. Modify the label and input name
3. Update Google Apps Script to include new field

### Change Email Recipient
In `online-store-form-backend.gs`, line 60:
```javascript
const recipient = 'your-email@example.com';
```

## 📧 Email Notifications

When a client submits the form, you receive an email with:
- Business name and contact info
- Domain and hosting preferences
- Product details
- Payment methods selected
- Budget and timeline
- Links to uploaded logo and product images
- All other important details

## 📊 Data Management

All submissions are saved to Google Sheets with:
- Timestamp
- Complete client information
- Clickable links to uploaded files
- Status tracking (New/In Progress/Completed)

## 🔒 Security

- Form submissions sent over HTTPS
- Google Sheets access controlled by your account
- Files stored securely in Google Drive
- No sensitive payment information collected
- Client data protected

## 🌐 Browser Support

- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers

## 📱 Mobile Friendly

The form is fully responsive and works perfectly on:
- 📱 Smartphones
- 📱 Tablets
- 💻 Laptops
- 🖥️ Desktops

## 🛠️ Technologies Used

- HTML5
- CSS3 (Flexbox, Grid)
- Vanilla JavaScript
- Google Apps Script
- Google Sheets API
- Google Drive API

## 📞 Support

For questions or issues:
1. Check [ONLINE-STORE-FORM-SETUP.md](ONLINE-STORE-FORM-SETUP.md)
2. Review browser console for errors (F12)
3. Verify Google Apps Script permissions
4. Test with sample submission

## 🎯 Use Cases

Perfect for:
- Web development agencies
- Freelance developers
- E-commerce consultants
- Digital marketing agencies
- Anyone building online stores for clients

## 📈 Benefits

- ⏱️ Save time with structured data collection
- 📋 Never miss important client requirements
- 💼 Look professional with branded form
- 📊 Organize client data automatically
- 🔄 Streamline your project workflow
- 💰 Calculate accurate quotes faster

## 🚀 Next Steps After Form Submission

1. Review client requirements in Google Sheet
2. Check domain availability
3. Prepare detailed quote
4. Schedule client meeting
5. Send proposal and contract
6. Begin development!

## 📝 License

Free to use for commercial and personal projects.

## 👨‍💻 Created By

**Berachah Global Concepts**  
Educational IT Solutions & Web Development

---

## 🌟 Star This Repo

If you find this form useful, please star the repository!

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

---

**Version:** 1.0  
**Last Updated:** February 2026
