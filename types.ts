
export interface User {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  skills: string[];
}

export interface Community {
  id: string;
  name: string;
  description: string;
  icon: string;
  memberCount: number;
  tags: string[];
}

export interface ShortContent {
  id: string;
  userId: string;
  communityId: string;
  title: string;
  type: 'image' | 'video-placeholder';
  url: string;
  likes: number;
  comments: number;
  timestamp: string;
}

export interface Post {
  id: string;
  userId: string;
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  media?: string;
  communityId?: string;
}
