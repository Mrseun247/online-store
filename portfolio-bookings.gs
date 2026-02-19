// Google Apps Script for Berachah Portfolio Bookings
// This script receives booking form submissions and stores them in Google Sheets

function doGet(e) {
  var action = e.parameter.action;
  
  try {
    if (action === 'addBooking') {
      return addBooking(e);
    } else if (action === 'getBookings') {
      return getBookings(e);
    } else {
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        message: 'Unknown action'
      })).setMimeType(ContentService.MimeType.JSON);
    }
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      message: error.message
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Get or create the spreadsheet
function getSpreadsheet() {
  var spreadsheetId = 'YOUR_SPREADSHEET_ID_HERE'; // Replace with your spreadsheet ID
  
  try {
    return SpreadsheetApp.openById(spreadsheetId);
  } catch (error) {
    // If spreadsheet doesn't exist, create a new one
    var spreadsheet = SpreadsheetApp.create('Berachah Portfolio Bookings');
    setupBookingsSheet(spreadsheet);
    
    // Log the new spreadsheet URL
    Logger.log('Created new spreadsheet: ' + spreadsheet.getUrl());
    Logger.log('Spreadsheet ID: ' + spreadsheet.getId());
    
    return spreadsheet;
  }
}

// Setup the bookings sheet with headers
function setupBookingsSheet(spreadsheet) {
  var sheet = spreadsheet.getSheetByName('Bookings');
  
  if (!sheet) {
    sheet = spreadsheet.insertSheet('Bookings');
  }
  
  // Set headers
  var headers = [
    'Timestamp',
    'Name',
    'Email',
    'Phone',
    'Organization',
    'Service',
    'Message',
    'Status',
    'Notes'
  ];
  
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  
  // Format headers
  sheet.getRange(1, 1, 1, headers.length)
    .setBackground('#667eea')
    .setFontColor('white')
    .setFontWeight('bold');
  
  // Freeze header row
  sheet.setFrozenRows(1);
  
  // Set column widths
  sheet.setColumnWidth(1, 150); // Timestamp
  sheet.setColumnWidth(2, 150); // Name
  sheet.setColumnWidth(3, 200); // Email
  sheet.setColumnWidth(4, 120); // Phone
  sheet.setColumnWidth(5, 200); // Organization
  sheet.setColumnWidth(6, 150); // Service
  sheet.setColumnWidth(7, 300); // Message
  sheet.setColumnWidth(8, 100); // Status
  sheet.setColumnWidth(9, 200); // Notes
}

// Add a new booking
function addBooking(e) {
  var spreadsheet = getSpreadsheet();
  var sheet = spreadsheet.getSheetByName('Bookings');
  
  if (!sheet) {
    setupBookingsSheet(spreadsheet);
    sheet = spreadsheet.getSheetByName('Bookings');
  }
  
  // Get form data
  var timestamp = new Date();
  var name = e.parameter.name || '';
  var email = e.parameter.email || '';
  var phone = e.parameter.phone || '';
  var organization = e.parameter.organization || '';
  var service = e.parameter.service || '';
  var message = e.parameter.message || '';
  
  // Add new row
  sheet.appendRow([
    timestamp,
    name,
    email,
    phone,
    organization,
    service,
    message,
    'New', // Status
    '' // Notes
  ]);
  
  // Send email notification (optional)
  try {
    sendEmailNotification({
      timestamp: timestamp,
      name: name,
      email: email,
      phone: phone,
      organization: organization,
      service: service,
      message: message
    });
  } catch (error) {
    Logger.log('Email notification failed: ' + error.message);
  }
  
  return ContentService.createTextOutput(JSON.stringify({
    success: true,
    message: 'Booking received successfully'
  })).setMimeType(ContentService.MimeType.JSON);
}

// Get all bookings
function getBookings(e) {
  var spreadsheet = getSpreadsheet();
  var sheet = spreadsheet.getSheetByName('Bookings');
  
  if (!sheet) {
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      bookings: []
    })).setMimeType(ContentService.MimeType.JSON);
  }
  
  var data = sheet.getDataRange().getValues();
  var bookings = [];
  
  // Skip header row
  for (var i = 1; i < data.length; i++) {
    bookings.push({
      timestamp: data[i][0],
      name: data[i][1],
      email: data[i][2],
      phone: data[i][3],
      organization: data[i][4],
      service: data[i][5],
      message: data[i][6],
      status: data[i][7],
      notes: data[i][8]
    });
  }
  
  return ContentService.createTextOutput(JSON.stringify({
    success: true,
    bookings: bookings
  })).setMimeType(ContentService.MimeType.JSON);
}

// Send email notification when new booking is received
function sendEmailNotification(booking) {
  var recipient = 'berachahglobalconcept@gmail.com'; // Your email
  var subject = '🎉 New Booking Request - ' + booking.name;
  
  var body = 'You have received a new booking request!\n\n';
  body += '📅 Date: ' + booking.timestamp + '\n';
  body += '👤 Name: ' + booking.name + '\n';
  body += '📧 Email: ' + booking.email + '\n';
  body += '📱 Phone: ' + booking.phone + '\n';
  body += '🏫 Organization: ' + booking.organization + '\n';
  body += '🛠️ Service: ' + booking.service + '\n';
  body += '💬 Message:\n' + booking.message + '\n\n';
  body += '---\n';
  body += 'View all bookings: ' + getSpreadsheet().getUrl();
  
  MailApp.sendEmail(recipient, subject, body);
}

// Test function to create sample booking
function testAddBooking() {
  var testData = {
    parameter: {
      action: 'addBooking',
      name: 'Test User',
      email: 'test@example.com',
      phone: '+234 800 000 0000',
      organization: 'Test School',
      service: 'School Website Development',
      message: 'This is a test booking request.',
      timestamp: new Date().toISOString()
    }
  };
  
  var result = doGet(testData);
  Logger.log(result.getContent());
}
