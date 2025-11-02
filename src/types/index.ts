export interface User {
  id: number;
  name: string;
  email: string;
  gender?: string; // ← Added
  avatar?: string;
  created_at: string;
  updated_at: string;
}

export interface Conversation {
  id: number;
  name?: string;
  type: 'private' | 'group';
  created_by: number;
  created_at: string;
  updated_at: string;
}

export interface ConversationUser {
  id: number;
  conversation_id: number;
  user_id: number;
  joined_at: string;
  created_at: string;
  updated_at: string;
}

export interface Message {
  id: number;
  conversation_id: number;
  user_id: number;
  content: string;
  type: 'text' | 'image' | 'file' | 'audio' | 'video';
  metadata?: any;
  edited_at?: string;
  deleted_at?: string;
  created_at: string;
  updated_at: string;
}
