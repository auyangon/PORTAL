export const fetchUnreadCount = async (studentEmail: string) => {
  try {
    const url = https://script.google.com/macros/s/AKfycbyfmemkEGxuQiDwTEGQzS6IsyzUEl1PtO-zX4_Ml9hYi5Hn0OcCBm7U5iyIed37XHTI/exec?sheet=Notifications;
    const response = await fetch(url);
    const data = await response.json();
    
    // Count unread notifications for this student
    const unread = data.filter(n => n.email === studentEmail && n.read === 'NO').length;
    return unread;
  } catch (error) {
    console.error('Failed to fetch unread count:', error);
    return 0;
  }
};

export const markAsRead = async (studentEmail: string, announcementId: string) => {
  try {
    // This would call your Apps Script to mark as read
    // For now, we'll just log
    console.log(Marking  as read for );
    return true;
  } catch (error) {
    console.error('Failed to mark as read:', error);
    return false;
  }
};
