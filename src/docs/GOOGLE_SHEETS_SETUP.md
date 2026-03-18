# AUY Student Portal - Google Sheets Integration Guide

## Overview

This portal is designed to connect directly to Google Sheets as a backend database. The data structure is pre-defined and maps 1:1 with the UI components.

## Step 1: Create Your Google Sheet

Create a new Google Sheet with the following tabs (exact names required):

1. **Students**
2. **Courses**
3. **Enrollments**
4. **Schedule**
5. **Materials**
6. **Announcements**
7. **Attendance**
8. **Quests**
9. **StudentQuests**
10. **Requests**

## Step 2: Set Up Column Headers

### Students Sheet
| email | studentId | studentName | major | studyMode | intake | status | gpa | profileImage | createdAt |
|-------|-----------|-------------|-------|-----------|--------|--------|-----|--------------|-----------|

### Courses Sheet
| courseCode | courseName | credits | department | instructor | instructorEmail | googleClassroomLink | status |
|------------|------------|---------|------------|------------|-----------------|---------------------|--------|

### Enrollments Sheet
| id | email | courseCode | semester | enrollmentStatus | grade | gpaPoints |
|----|-------|------------|----------|------------------|-------|-----------|

### Schedule Sheet
| scheduleId | courseCode | dayOfWeek | startTime | endTime | room | building | zoomLink |
|------------|------------|-----------|-----------|---------|------|----------|----------|

### Materials Sheet
| materialId | courseCode | title | type | fileUrl | week | uploadedBy | uploadDate |
|------------|------------|-------|------|---------|------|------------|------------|

### Announcements Sheet
| announcementId | title | content | audience | courseCode | createdAt | createdBy |
|----------------|-------|---------|----------|------------|-----------|-----------|

### Attendance Sheet
| id | email | courseCode | date | status |
|----|-------|------------|------|--------|

### Quests Sheet
| questId | courseCode | title | description | type | dueDate | maxScore | status | createdAt |
|---------|------------|-------|-------------|------|---------|----------|--------|-----------|

### StudentQuests Sheet
| id | email | questId | status | score | submissionLink | submittedAt | gradedAt | feedback |
|----|-------|---------|--------|-------|----------------|-------------|----------|----------|

### Requests Sheet
| requestId | email | type | status | submittedAt | resolvedAt | adminNote |
|-----------|-------|------|--------|-------------|------------|-----------|

## Step 3: Connect to SheetDB or sheet.best

### Option A: Using SheetDB

1. Go to [sheetdb.io](https://sheetdb.io)
2. Create a free account
3. Click "Create API from Google Sheets"
4. Paste your Google Sheet URL
5. Copy the generated API URL

### Option B: Using sheet.best

1. Go to [sheet.best](https://sheet.best)
2. Create a free account
3. Click "Connect to Google Sheets"
4. Authorize access
5. Copy the generated API URL

## Step 4: Update the Portal Configuration

Open `src/services/api.ts` and replace the API_BASE_URL:

```typescript
const API_BASE_URL = 'https://sheetdb.io/api/v1/YOUR_ACTUAL_API_ID';
```

Or for sheet.best:

```typescript
const API_BASE_URL = 'https://sheet.best/api/sheets/YOUR_ACTUAL_SHEET_ID';
```

## Step 5: Test the Connection

1. Run the development server: `npm run dev`
2. Open the browser console
3. Check for any API errors
4. Verify data is loading correctly

## Data Relationships

The portal uses `email` as the primary key to link data:

```
Student.email ─────┬──── Enrollments.email
                   ├──── Attendance.email
                   ├──── StudentQuests.email
                   └──── Requests.email

Course.courseCode ─┬──── Enrollments.courseCode
                   ├──── Schedule.courseCode
                   ├──── Materials.courseCode
                   ├──── Quests.courseCode
                   └──── Announcements.courseCode

Quest.questId ─────────── StudentQuests.questId
```

## Data Format Guidelines

### Dates
- Use format: `YYYY-MM-DD` (e.g., `2024-09-15`)

### Times
- Use 24-hour format: `HH:MM` (e.g., `14:30`)

### Status Values
- **Student status**: `Active`, `Inactive`, `Suspended`
- **Enrollment status**: `Enrolled`, `Completed`, `Dropped`
- **Quest status**: `Not Started`, `In Progress`, `Submitted`, `Completed`
- **Request status**: `Pending`, `Completed`, `Rejected`
- **Attendance status**: `Present`, `Absent`, `Late`
- **Course status**: `Active`, `Inactive`

### Grade Format
- Use letter grades: `A`, `A-`, `B+`, `B`, `B-`, `C+`, `C`, `C-`, `D`, `F`

### GPA Points
- Use decimal values: `4.0`, `3.7`, `3.3`, `3.0`, etc.

## Polling & Real-time Updates

The portal automatically refreshes data every 60 seconds. This can be configured in:

```typescript
// src/services/api.ts
export const REFRESH_INTERVAL = 60000; // 60 seconds
```

## Troubleshooting

### Data not loading?
1. Check browser console for errors
2. Verify API URL is correct
3. Ensure Google Sheet is shared (public or with API service)
4. Check column names match exactly

### Wrong data displaying?
1. Verify email addresses match across sheets
2. Check course codes are consistent
3. Ensure date formats are correct

### CORS errors?
- SheetDB and sheet.best handle CORS automatically
- If using custom backend, add appropriate CORS headers

## Security Notes

- Never expose sensitive data in Google Sheets
- Use environment variables for API URLs in production
- Consider implementing authentication for production use
- Regularly audit access to your Google Sheet
