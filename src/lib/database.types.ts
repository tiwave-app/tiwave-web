export interface Database {
  public: {
    Tables: {
      newsletter_subscribers: {
        Row: {
          id: string
          email: string
          created_at: string
        }
        Insert: {
          id?: string
          email: string
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          created_at?: string
        }
        Relationships: []
      }
      contact_requests: {
        Row: {
          id: string
          created_at: string
          name: string
          email: string
          organisation: string
          type: 'professionnel' | 'collectivite'
          subject: string
          message: string
          status: 'nouveau' | 'traite'
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
          email: string
          organisation: string
          type: 'professionnel' | 'collectivite'
          subject: string
          message: string
          status?: 'nouveau' | 'traite'
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          email?: string
          organisation?: string
          type?: 'professionnel' | 'collectivite'
          subject?: string
          message?: string
          status?: 'nouveau' | 'traite'
        }
        Relationships: []
      }
      blog_posts: {
        Row: {
          id: string
          title: string
          slug: string
          excerpt: string | null
          content: string
          published: boolean | null
          published_at: string | null
          cover_image_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          excerpt?: string | null
          content: string
          published?: boolean | null
          published_at?: string | null
          cover_image_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          excerpt?: string | null
          content?: string
          published?: boolean | null
          published_at?: string | null
          cover_image_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
  }
}
