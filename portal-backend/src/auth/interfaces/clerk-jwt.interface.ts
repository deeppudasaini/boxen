export interface ClerkUser {
  sub: string;
  sid: string;
  iat: number;
  exp: number;
  nbf: number;
  iss: string;
  azp?: string;
  org_id?: string;
  org_slug?: string;
  org_role?: string;
  publicMetadata?: Record<string, any>;
  privateMetadata?: Record<string, any>;
  unsafeMetadata?: Record<string, any>;
  [key: string]: any;
}

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
  MODERATOR = 'moderator',
}
