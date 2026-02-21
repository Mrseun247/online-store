// Google Apps Script for Online Store Client Form
// This script receives form submissions and saves them to Google Sheets

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Parse form data
    let data = {};
    let files = {};
    
    // Handle multipart form data (with files)
    if (e.parameter) {
      data = e.parameter;
      
      // Handle file uploads
      if (e.parameters) {
        // Process uploaded files
        const folder = getOrCreateFolder('Online Store Client Uploads');
        
        // Handle logo file
        if (e.parameters.logoFile && e.parameters.logoFile[0]) {
          const logoBlob = Utilities.newBlob(
            Utilities.base64Decode(e.parameters.logoFile[0]),
            'image/jpeg',
            'logo_' + new Date().getTime() + '.jpg'
          );
          const logoFile = folder.createFile(logoBlob);
          logoFile.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
          files.logoUrl = logoFile.getUrl();
        }
        
        // Handle product images
        files.productUrls = [];
        for (let key in e.parameters) {
          if (key.startsWith('productFile')) {
            const fileBlob = Utilities.newBlob(
              Utilities.base64Decode(e.parameters[key][0]),
              'image/jpeg',
              key + '_' + new Date().getTime() + '.jpg'
            );
            const productFile = folder.createFile(fileBlob);
            productFile.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
            files.productUrls.push(productFile.getUrl());
          }
        }
      }
    } else {
      // Handle JSON data (no files)
      data = JSON.parse(e.postData.contents);
    }
    
    // Prepare row data
    const timestamp = new Date();
    const row = [
      timestamp,
      data.businessName || '',
      data.ownerName || '',
      data.email || '',
      data.phone || '',
      data.businessAddress || '',
      data.businessDescription || '',
      data.domainName || '',
      data.domainOwnership || '',
      data.hostingPreference || '',
      data.colorScheme || '',
      data.hasLogo || '',
      files.logoUrl || 'No logo uploaded',
      data.referenceWebsites || '',
      Array.isArray(data.designStyle) ? data.designStyle.join(', ') : data.designStyle || '',
      data.productType || '',
      data.productCount || '',
      data.productCategories || '',
      data.hasImages || '',
      files.productUrls.length > 0 ? files.productUrls.join('\n') : 'No images uploaded',
      Array.isArray(data.paymentMethods) ? data.paymentMethods.join(', ') : data.paymentMethods || '',
      data.existingPaymentAccounts || '',
      data.currency || '',
      data.needsShipping || '',
      Array.isArray(data.shippingCoverage) ? data.shippingCoverage.join(', ') : data.shippingCoverage || '',
      data.shippingMethod || '',
      Array.isArray(data.features) ? data.features.join(', ') : data.features || '',
      Array.isArray(data.accountFeatures) ? data.accountFeatures.join(', ') : data.accountFeatures || '',
      data.facebook || '',
      data.instagram || '',
      data.twitter || '',
      data.whatsapp || '',
      data.emailMarketing || '',
      data.budget || '',
      data.timeline || '',
      data.additionalRequirements || '',
      data.referralSource || '',
      'New' // Status
    ];
    
    sheet.appendRow(row);
    
    // Send email notification
    sendEmailNotification(data, files);
    
    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      message: 'Form submitted successfully'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Get or create folder for uploads
function getOrCreateFolder(folderName) {
  const folders = DriveApp.getFoldersByName(folderName);
  if (folders.hasNext()) {
    return folders.next();
  } else {
    return DriveApp.createFolder(folderName);
  }
}

function sendEmailNotification(data, files) {
  const recipient = 'your-email@example.com'; // Change this to your email
  const subject = `New Online Store Request: ${data.businessName}`;
  
  let filesSection = '';
  if (files && (files.logoUrl || files.productUrls.length > 0)) {
    filesSection = `
UPLOADED FILES:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Logo: ${files.logoUrl || 'Not uploaded'}
Product Images: ${files.productUrls.length > 0 ? '\n' + files.productUrls.join('\n') : 'Not uploaded'}
`;
  }
  
  const body = `
New Online Store Development Request

BUSINESS INFORMATION:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Business Name: ${data.businessName}
Owner: ${data.ownerName}
Email: ${data.email}
Phone: ${data.phone}
Address: ${data.businessAddress}

DOMAIN & HOSTING:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Domain: ${data.domainName}
Owns Domain: ${data.domainOwnership}
Hosting: ${data.hostingPreference}

PRODUCTS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Type: ${data.productType}
Count: ${data.productCount}
Categories: ${data.productCategories}

PAYMENT METHODS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${Array.isArray(data.paymentMethods) ? data.paymentMethods.join(', ') : data.paymentMethods}
Currency: ${data.currency}

BUDGET & TIMELINE:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Budget: ${data.budget}
Timeline: ${data.timeline}

BUSINESS DESCRIPTION:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${data.businessDescription}

ADDITIONAL REQUIREMENTS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${data.additionalRequirements || 'None specified'}
${filesSection}
View full details in the spreadsheet.
  `;
  
  MailApp.sendEmail(recipient, subject, body);
}

function setupSheet() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  // Set up headers
  const headers = [
    'Timestamp',
    'Business Name',
    'Owner Name',
    'Email',
    'Phone',
    'Business Address',
    'Business Description',
    'Domain Name',
    'Domain Ownership',
    'Hosting Preference',
    'Color Scheme',
    'Has Logo',
    'Logo File URL',
    'Reference Websites',
    'Design Style',
    'Product Type',
    'Product Count',
    'Product Categories',
    'Has Images',
    'Product Image URLs',
    'Payment Methods',
    'Existing Payment Accounts',
    'Currency',
    'Needs Shipping',
    'Shipping Coverage',
    'Shipping Method',
    'Features',
    'Account Features',
    'Facebook',
    'Instagram',
    'Twitter',
    'WhatsApp',
    'Email Marketing',
    'Budget',
    'Timeline',
    'Additional Requirements',
    'Referral Source',
    'Status'
  ];
  
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
  sheet.getRange(1, 1, 1, headers.length).setBackground('#667eea');
  sheet.getRange(1, 1, 1, headers.length).setFontColor('#ffffff');
  sheet.setFrozenRows(1);
  
  // Auto-resize columns
  for (let i = 1; i <= headers.length; i++) {
    sheet.autoResizeColumn(i);
  }
}
