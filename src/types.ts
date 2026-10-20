export type MemberStatus = 'Active' | 'In Field' | 'On Sabbatical';
export type MemberRoleAccess = 'Director' | 'Senior Principal' | 'Lead Architect' | 'Associate' | 'Fellow';

export interface Achievement {
  year: string;
  title: string;
  organization: string;
}

export interface Member {
  id: string;
  name: string;
  title: string;
  accessLevel: MemberRoleAccess;
  status: MemberStatus;
  avatar: string;
  bio: string;
  extendedBio: string;
  location: string;
  email: string;
  phone?: string;
  department: 'Architecture' | 'Computational Design' | 'Spatial & Acoustic' | 'Sustainable Materials' | 'Creative Strategy';
  skills: string[];
  projectIds: string[];
  achievements: Achievement[];
  quote: string;
  joinDate: string;
}

export interface ProjectMilestone {
  id: string;
  title: string;
  completed: boolean;
  dueDate: string;
}

export interface ProjectUpdate {
  id: string;
  date: string;
  author: string;
  note: string;
}

export type ProjectStatus = 'Active Commission' | 'Schematic Design' | 'Detailed Engineering' | 'Final Fabrication' | 'Completed';

export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: 'Sustainable Architecture' | 'Spatial Computing' | 'Civic Pavilion' | 'Biophilic Interiors';
  status: ProjectStatus;
  progress: number; // 0 - 100
  leadMemberId: string;
  contributorIds: string[];
  location: string;
  client: string;
  year: string;
  coverImage: string;
  description: string;
  milestones: ProjectMilestone[];
  updates: ProjectUpdate[];
  deliverables: string[];
}

export interface Inquiry {
  id: string;
  referenceNumber: string;
  name: string;
  email: string;
  organization: string;
  serviceType: string;
  targetMemberId?: string;
  targetProjectId?: string;
  budget: string;
  urgency: string;
  message: string;
  status: 'Pending Review' | 'Under Consideration' | 'Engaged' | 'Archived';
  createdAt: string;
  internalNotes?: string;
}
