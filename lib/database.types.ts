export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      user_profiles: {
        Row: {
          id: string
          created_at: string
          email: string
          is_admin: boolean
          is_approved: boolean
          full_name: string | null
          phone: string | null
        }
        Insert: {
          id: string
          created_at?: string
          email: string
          is_admin?: boolean
          is_approved?: boolean
          full_name?: string | null
          phone?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          email?: string
          is_admin?: boolean
          is_approved?: boolean
          full_name?: string | null
          phone?: string | null
        }
      }
    }
  }
}
