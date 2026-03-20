interface RequestData {
  type: string;
  details: string;
  studentEmail: string;
  studentName: string;
  studentId: string;
}

const ADMIN_EMAIL = 'admin@auy.edu.mm';
const EMAIL_WEB_APP_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';

export const submitRequest = async (requestData: RequestData) => {
  try {
    // Save to Google Sheets
    await fetch('https://script.google.com/macros/s/AKfycbyfmemkEGxuQiDwTEGQzS6IsyzUEl1PtO-zX4_Ml9hYi5Hn0OcCBm7U5iyIed37XHTI/exec', {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
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

    // Send email notification (using string concatenation, not template literals)
    const emailBody = 
      '<h2>New Student Request</h2>' +
      '<p><strong>Student:</strong> ' + requestData.studentName + ' (' + requestData.studentId + ')</p>' +
      '<p><strong>Email:</strong> ' + requestData.studentEmail + '</p>' +
      '<p><strong>Request Type:</strong> ' + requestData.type + '</p>' +
      '<p><strong>Details:</strong> ' + requestData.details + '</p>' +
      '<p><strong>Submitted:</strong> ' + new Date().toLocaleString() + '</p>' +
      '<hr><p>Please log in to the admin portal to process this request.</p>';

    await fetch(EMAIL_WEB_APP_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: ADMIN_EMAIL,
        subject: 'New Request from ' + requestData.studentName,
        body: emailBody
      })
    });

    return { success: true, message: 'Request submitted successfully' };
  } catch (error) {
    console.error('Error submitting request:', error);
    return { success: false, message: 'Failed to submit request' };
  }
};

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

export const updateRequestStatus = async (requestId: string, status: string, adminNote: string) => {
  try {
    await fetch('https://script.google.com/macros/s/AKfycbyfmemkEGxuQiDwTEGQzS6IsyzUEl1PtO-zX4_Ml9hYi5Hn0OcCBm7U5iyIed37XHTI/exec', {
      method: 'PUT',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
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
