export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.18"
  }
  public: {
    Tables: {
      appointment_rate_limits: {
        Row: {
          key: string
          last_submission: string
        }
        Insert: {
          key: string
          last_submission?: string
        }
        Update: {
          key?: string
          last_submission?: string
        }
        Relationships: []
      }
      appointments: {
        Row: {
          created_at: string
          email: string
          id: string
          patient_name: string
          phone: string
          preferred_date: string | null
          preferred_time: string
          reason: string
          status: string
        }
        Insert: {
          created_at?: string
          email?: string
          id?: string
          patient_name: string
          phone: string
          preferred_date?: string | null
          preferred_time?: string
          reason?: string
          status?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          patient_name?: string
          phone?: string
          preferred_date?: string | null
          preferred_time?: string
          reason?: string
          status?: string
        }
        Relationships: []
      }
      booking_abuse_limits: {
        Row: {
          attempts: number
          key: string
          window_started: string
        }
        Insert: {
          attempts?: number
          key: string
          window_started?: string
        }
        Update: {
          attempts?: number
          key?: string
          window_started?: string
        }
        Relationships: []
      }
      content: {
        Row: {
          category: string
          created_at: string
          data: Json
          description: string
          display_order: number
          featured: boolean
          id: string
          image_id: string | null
          kind: string
          published: boolean
          title: string
          updated_at: string
        }
        Insert: {
          category?: string
          created_at?: string
          data?: Json
          description?: string
          display_order?: number
          featured?: boolean
          id?: string
          image_id?: string | null
          kind: string
          published?: boolean
          title: string
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          data?: Json
          description?: string
          display_order?: number
          featured?: boolean
          id?: string
          image_id?: string | null
          kind?: string
          published?: boolean
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "content_image_id_fkey"
            columns: ["image_id"]
            isOneToOne: false
            referencedRelation: "media"
            referencedColumns: ["id"]
          },
        ]
      }
      job_applications: {
        Row: {
          created_at: string
          email: string
          experience: string
          full_name: string
          id: string
          job_id: string | null
          message: string
          phone: string
          position: string
          qualification: string
          resume_link: string
          status: string
        }
        Insert: {
          created_at?: string
          email?: string
          experience?: string
          full_name: string
          id?: string
          job_id?: string | null
          message?: string
          phone: string
          position: string
          qualification?: string
          resume_link?: string
          status?: string
        }
        Update: {
          created_at?: string
          email?: string
          experience?: string
          full_name?: string
          id?: string
          job_id?: string | null
          message?: string
          phone?: string
          position?: string
          qualification?: string
          resume_link?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "job_applications_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "content"
            referencedColumns: ["id"]
          },
        ]
      }
      media: {
        Row: {
          approved: boolean
          created_at: string
          filename: string
          id: string
          mime_type: string
          path: string
          size_bytes: number
        }
        Insert: {
          approved?: boolean
          created_at?: string
          filename: string
          id?: string
          mime_type: string
          path: string
          size_bytes: number
        }
        Update: {
          approved?: boolean
          created_at?: string
          filename?: string
          id?: string
          mime_type?: string
          path?: string
          size_bytes?: number
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      website_settings: {
        Row: {
          data: Json
          id: number
          logo_id: string | null
          pages: Json
          slideshow_interval: number
          updated_at: string
          upload_limit_mb: number
        }
        Insert: {
          data?: Json
          id?: number
          logo_id?: string | null
          pages?: Json
          slideshow_interval?: number
          updated_at?: string
          upload_limit_mb?: number
        }
        Update: {
          data?: Json
          id?: number
          logo_id?: string | null
          pages?: Json
          slideshow_interval?: number
          updated_at?: string
          upload_limit_mb?: number
        }
        Relationships: [
          {
            foreignKeyName: "website_settings_logo_id_fkey"
            columns: ["logo_id"]
            isOneToOne: false
            referencedRelation: "media"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      check_booking_limit: { Args: { _key: string }; Returns: boolean }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      move_content: {
        Args: { _direction: number; _id: string }
        Returns: undefined
      }
      submit_appointment: {
        Args: {
          _date: string
          _email: string
          _name: string
          _phone: string
          _reason: string
          _time: string
        }
        Returns: string
      }
      submit_appointment_request: {
        Args: {
          _date: string
          _email: string
          _name: string
          _phone: string
          _reason: string
          _time: string
        }
        Returns: string
      }
      submit_job_application: {
        Args: {
          _email: string
          _experience: string
          _job_id: string
          _message: string
          _name: string
          _phone: string
          _position: string
          _qualification: string
          _resume: string
        }
        Returns: string
      }
    }
    Enums: {
      app_role: "admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin"],
    },
  },
} as const
