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
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      children: {
        Row: {
          age_range: Database["public"]["Enums"]["age_range_enum"] | null
          created_at: string
          id: string
          interests: string[] | null
          language_preference: Database["public"]["Enums"]["language_code_enum"]
          learning_goals: Json | null
          nickname: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          age_range?: Database["public"]["Enums"]["age_range_enum"] | null
          created_at?: string
          id?: string
          interests?: string[] | null
          language_preference?: Database["public"]["Enums"]["language_code_enum"]
          learning_goals?: Json | null
          nickname?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          age_range?: Database["public"]["Enums"]["age_range_enum"] | null
          created_at?: string
          id?: string
          interests?: string[] | null
          language_preference?: Database["public"]["Enums"]["language_code_enum"]
          learning_goals?: Json | null
          nickname?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "children_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "credits_balance_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "children_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      credits_ledger: {
        Row: {
          created_at: string
          delta: number
          id: string
          reason: Database["public"]["Enums"]["credit_reason_enum"]
          story_id: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          delta: number
          id?: string
          reason: Database["public"]["Enums"]["credit_reason_enum"]
          story_id?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          delta?: number
          id?: string
          reason?: Database["public"]["Enums"]["credit_reason_enum"]
          story_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "credits_ledger_story_id_fkey"
            columns: ["story_id"]
            isOneToOne: false
            referencedRelation: "stories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "credits_ledger_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "credits_balance_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "credits_ledger_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          display_name: string | null
          locale: string | null
          subscription_status: Database["public"]["Enums"]["subscription_status_enum"]
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          display_name?: string | null
          locale?: string | null
          subscription_status?: Database["public"]["Enums"]["subscription_status_enum"]
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          display_name?: string | null
          locale?: string | null
          subscription_status?: Database["public"]["Enums"]["subscription_status_enum"]
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      scenes: {
        Row: {
          created_at: string
          id: string
          image_url: string | null
          index: number
          scene_text: string | null
          story_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          image_url?: string | null
          index: number
          scene_text?: string | null
          story_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          image_url?: string | null
          index?: number
          scene_text?: string | null
          story_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "scenes_story_id_fkey"
            columns: ["story_id"]
            isOneToOne: false
            referencedRelation: "stories"
            referencedColumns: ["id"]
          },
        ]
      }
      stories: {
        Row: {
          child_id: string
          created_at: string
          id: string
          image_style: string | null
          language: Database["public"]["Enums"]["language_code_enum"]
          pdf_url: string | null
          scene_count: number | null
          status: Database["public"]["Enums"]["story_status_enum"]
          theme: string | null
          thumbnail_url: string | null
          title: string | null
          tone: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          child_id: string
          created_at?: string
          id?: string
          image_style?: string | null
          language?: Database["public"]["Enums"]["language_code_enum"]
          pdf_url?: string | null
          scene_count?: number | null
          status?: Database["public"]["Enums"]["story_status_enum"]
          theme?: string | null
          thumbnail_url?: string | null
          title?: string | null
          tone?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          child_id?: string
          created_at?: string
          id?: string
          image_style?: string | null
          language?: Database["public"]["Enums"]["language_code_enum"]
          pdf_url?: string | null
          scene_count?: number | null
          status?: Database["public"]["Enums"]["story_status_enum"]
          theme?: string | null
          thumbnail_url?: string | null
          title?: string | null
          tone?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "stories_child_id_fkey"
            columns: ["child_id"]
            isOneToOne: false
            referencedRelation: "children"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stories_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "credits_balance_v"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "stories_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      system_jobs: {
        Row: {
          attempts: number
          error: Json | null
          finished_at: string | null
          id: string
          scene_id: string | null
          started_at: string | null
          status: Database["public"]["Enums"]["job_status_enum"]
          story_id: string | null
          type: Database["public"]["Enums"]["job_type_enum"]
        }
        Insert: {
          attempts?: number
          error?: Json | null
          finished_at?: string | null
          id?: string
          scene_id?: string | null
          started_at?: string | null
          status?: Database["public"]["Enums"]["job_status_enum"]
          story_id?: string | null
          type: Database["public"]["Enums"]["job_type_enum"]
        }
        Update: {
          attempts?: number
          error?: Json | null
          finished_at?: string | null
          id?: string
          scene_id?: string | null
          started_at?: string | null
          status?: Database["public"]["Enums"]["job_status_enum"]
          story_id?: string | null
          type?: Database["public"]["Enums"]["job_type_enum"]
        }
        Relationships: [
          {
            foreignKeyName: "system_jobs_scene_id_fkey"
            columns: ["scene_id"]
            isOneToOne: false
            referencedRelation: "scenes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "system_jobs_story_id_fkey"
            columns: ["story_id"]
            isOneToOne: false
            referencedRelation: "stories"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      credits_balance_v: {
        Row: {
          balance: number | null
          user_id: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      age_range_enum: "0_2" | "3_4" | "5_7" | "8_10" | "11_13"
      credit_reason_enum: "grant" | "purchase" | "spend" | "refund" | "bonus"
      job_status_enum:
        | "queued"
        | "running"
        | "retrying"
        | "failed"
        | "succeeded"
      job_type_enum: "story_generate" | "scene_generate" | "pdf_render"
      language_code_enum: "en" | "es" | "it" | "fr" | "de"
      story_status_enum:
        | "queued"
        | "running"
        | "failed"
        | "succeeded"
        | "emailed"
      subscription_status_enum: "free" | "active" | "paused" | "expired"
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
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
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
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
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
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
      age_range_enum: ["0_2", "3_4", "5_7", "8_10", "11_13"],
      credit_reason_enum: ["grant", "purchase", "spend", "refund", "bonus"],
      job_status_enum: ["queued", "running", "retrying", "failed", "succeeded"],
      job_type_enum: ["story_generate", "scene_generate", "pdf_render"],
      language_code_enum: ["en", "es", "it", "fr", "de"],
      story_status_enum: [
        "queued",
        "running",
        "failed",
        "succeeded",
        "emailed",
      ],
      subscription_status_enum: ["free", "active", "paused", "expired"],
    },
  },
} as const
