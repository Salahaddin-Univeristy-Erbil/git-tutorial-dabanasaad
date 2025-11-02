# KOR

## Problem

Many teams and friends need a simple, lightweight chat application to communicate in real-time. Existing solutions can be too heavy or require backend setup.

## Target Users

- Small teams collaborating on projects
- Groups of friends wanting quick chat
- Students in study groups

## Success Criteria

- Users can register and login
- Users can see a list of friends or groups
- Users can send messages to individuals or groups
- Messages are displayed in order with sender info
- Users can logout
- Application runs locally without backend

## User Stories

As a new visitor, I want to register with a unique username, secure password (min 8 characters), and valid email address, so I can create my account.
As a registered user, I want to login using my username/email and password with "Remember me" option, so I can quickly access my account.
As a registered user, I want to update my profile picture (JPG, PNG, max 5MB), so I can personalize my account.
As a logged-in user, I want to logout with a confirmation prompt, so I can securely end my session.
As a user, I want to see my friends list and group chats in a sidebar, so I can navigate to conversations quickly.
As a user, I want to search for and add friends by username, so I can connect with people I know.
As a group admin, I want to create a group chat and add members, so I can organize team discussions.
As a group member, I want to see who else is in the group, so I know who will receive my messages.
As a user, I want to receive messages in real-time without refreshing, so conversations feel natural.
As a user, I want the app to have a responsive and visually clean interface.

## Non-Goals

- Video/voice calling
- End-to-end encryption
- Mobile app versions
- Multi-language support

## Tech Stack

- Vue 3 + Vite
- TypeScript
- Pinia for state management
- Vue Router for routes
- Tailwind CSS for styling
- ESLint + Prettier for code formatting
