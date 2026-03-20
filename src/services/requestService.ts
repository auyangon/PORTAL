interface RequestData {
  type: string;
  details: string;
  studentEmail: string;
  studentName: string;
  studentId: string;
}

// Admin email to receive notifications
const ADMIN_EMAIL = 'admin@auy.edu.mm'; // Change this to your admin email

// Google Apps Script Web App URL for sending emails
const EMAIL_WEB_APP_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec'; // You'll create this

export const submitRequest = async (requestData: RequestData) => {
  try {
    // 1. First, save to your Google Sheets (via your existing API)
    const saveToSheet = await fetch('https://script.google.com/macros/s/AKfycbyfmemkEGxuQiDwTEGQzS6IsyzUEl1PtO-zX4_Ml9hYi5Hn0OcCBm7U5iyIed37XHTI/exec', {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sheet: 'Requests',
        data: {
          requestId: 'REQ' + Date.now(),
          email: requestData.studentEmail,
          type: requestData.type,
          status: 'Pending',
          submittedAt: new Date().toISOString(),
          details: requestData.details
        }
      })
    });

    // 2. Send email notification to admin
    const emailResponse = await fetch(EMAIL_WEB_APP_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: ADMIN_EMAIL,
        subject: New Request from ,
        body: 
          <h2>New Student Request</h2>
          <p><strong>Student:</strong>  ()</p>
          <p><strong>Email:</strong> </p>
          <p><strong>Request Type:</strong> </p>
          <p><strong>Details:</strong> </p>
          <p><strong>Submitted:</strong> </p>
          <hr>
          <p>Please log in to the admin portal to process this request.</p>
        
      })
    });

    return { success: true, message: 'Request submitted successfully' };
  } catch (error) {
    console.error('Error submitting request:', error);
    return { success: false, message: 'Failed to submit request' };
  }
};

// For admin dashboard - get all requests
export const getAllRequests = async () => {
  try {
    const response = await fetch('https://script.google.com/macros/s/AKfycbyfmemkEGxuQiDwTEGQzS6IsyzUEl1PtO-zX4_Ml9hYi5Hn0OcCBm7U5iyIed37XHTI/exec?sheet=Requests');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching requests:', error);
    return [];
  }
};

// Update request status (admin only)
export const updateRequestStatus = async (requestId: string, status: string, adminNote: string) => {
  try {
    const response = await fetch('https://script.google.com/macros/s/AKfycbyfmemkEGxuQiDwTEGQzS6IsyzUEl1PtO-zX4_Ml9hYi5Hn0OcCBm7U5iyIed37XHTI/exec', {
      method: 'PUT',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sheet: 'Requests',
        requestId: requestId,
        data: {
          status: status,
          resolvedAt: new Date().toISOString(),
          adminNote: adminNote
        }
      })
    });
    
    return { success: true };
  } catch (error) {
    console.error('Error updating request:', error);
    return { success: false };
  }
};
