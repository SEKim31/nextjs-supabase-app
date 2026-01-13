// Supabase 자동 생성 타입
// 생성일: 2026-01-13
// 이 파일은 Supabase MCP를 통해 자동 생성되었습니다.

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1";
  };
  public: {
    Tables: {
      cheers: {
        Row: {
          created_at: string;
          id: string;
          user_id: string;
          verification_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          user_id: string;
          verification_id: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          user_id?: string;
          verification_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "fk_cheers_user";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "fk_cheers_verification";
            columns: ["verification_id"];
            isOneToOne: false;
            referencedRelation: "verifications";
            referencedColumns: ["id"];
          },
        ];
      };
      group_invites: {
        Row: {
          created_at: string;
          created_by: string;
          expires_at: string;
          group_id: string;
          id: string;
          token: string;
        };
        Insert: {
          created_at?: string;
          created_by: string;
          expires_at: string;
          group_id: string;
          id?: string;
          token: string;
        };
        Update: {
          created_at?: string;
          created_by?: string;
          expires_at?: string;
          group_id?: string;
          id?: string;
          token?: string;
        };
        Relationships: [
          {
            foreignKeyName: "fk_group_invites_creator";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "fk_group_invites_group";
            columns: ["group_id"];
            isOneToOne: false;
            referencedRelation: "groups";
            referencedColumns: ["id"];
          },
        ];
      };
      group_members: {
        Row: {
          group_id: string;
          id: string;
          joined_at: string;
          user_id: string;
        };
        Insert: {
          group_id: string;
          id?: string;
          joined_at?: string;
          user_id: string;
        };
        Update: {
          group_id?: string;
          id?: string;
          joined_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "fk_group_members_group";
            columns: ["group_id"];
            isOneToOne: false;
            referencedRelation: "groups";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "fk_group_members_user";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      groups: {
        Row: {
          created_at: string;
          description: string | null;
          id: string;
          name: string;
          owner_id: string;
          relationship_type: Database["public"]["Enums"]["relationship_type"];
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          description?: string | null;
          id?: string;
          name: string;
          owner_id: string;
          relationship_type: Database["public"]["Enums"]["relationship_type"];
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          description?: string | null;
          id?: string;
          name?: string;
          owner_id?: string;
          relationship_type?: Database["public"]["Enums"]["relationship_type"];
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "groups_owner_id_fkey";
            columns: ["owner_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      missions: {
        Row: {
          created_at: string;
          created_by: string;
          description: string | null;
          group_id: string;
          id: string;
          is_active: boolean;
          repeat_days: Json | null;
          repeat_type: Database["public"]["Enums"]["repeat_type"];
          title: string;
          updated_at: string;
          verification_type: Database["public"]["Enums"]["verification_type"];
        };
        Insert: {
          created_at?: string;
          created_by: string;
          description?: string | null;
          group_id: string;
          id?: string;
          is_active?: boolean;
          repeat_days?: Json | null;
          repeat_type?: Database["public"]["Enums"]["repeat_type"];
          title: string;
          updated_at?: string;
          verification_type?: Database["public"]["Enums"]["verification_type"];
        };
        Update: {
          created_at?: string;
          created_by?: string;
          description?: string | null;
          group_id?: string;
          id?: string;
          is_active?: boolean;
          repeat_days?: Json | null;
          repeat_type?: Database["public"]["Enums"]["repeat_type"];
          title?: string;
          updated_at?: string;
          verification_type?: Database["public"]["Enums"]["verification_type"];
        };
        Relationships: [
          {
            foreignKeyName: "fk_missions_created_by";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "fk_missions_group";
            columns: ["group_id"];
            isOneToOne: false;
            referencedRelation: "groups";
            referencedColumns: ["id"];
          },
        ];
      };
      notifications: {
        Row: {
          body: string | null;
          created_at: string;
          data: Json | null;
          id: string;
          is_read: boolean;
          title: string;
          type: Database["public"]["Enums"]["notification_type"];
          user_id: string;
        };
        Insert: {
          body?: string | null;
          created_at?: string;
          data?: Json | null;
          id?: string;
          is_read?: boolean;
          title: string;
          type: Database["public"]["Enums"]["notification_type"];
          user_id: string;
        };
        Update: {
          body?: string | null;
          created_at?: string;
          data?: Json | null;
          id?: string;
          is_read?: boolean;
          title?: string;
          type?: Database["public"]["Enums"]["notification_type"];
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "fk_notifications_user";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      users: {
        Row: {
          created_at: string;
          email: string;
          id: string;
          nickname: string | null;
          profile_image_url: string | null;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          email: string;
          id: string;
          nickname?: string | null;
          profile_image_url?: string | null;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          email?: string;
          id?: string;
          nickname?: string | null;
          profile_image_url?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      verifications: {
        Row: {
          checklist_items: Json | null;
          created_at: string;
          id: string;
          image_url: string | null;
          mission_id: string;
          text_content: string | null;
          user_id: string;
          verified_at: string;
        };
        Insert: {
          checklist_items?: Json | null;
          created_at?: string;
          id?: string;
          image_url?: string | null;
          mission_id: string;
          text_content?: string | null;
          user_id: string;
          verified_at?: string;
        };
        Update: {
          checklist_items?: Json | null;
          created_at?: string;
          id?: string;
          image_url?: string | null;
          mission_id?: string;
          text_content?: string | null;
          user_id?: string;
          verified_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "fk_verifications_mission";
            columns: ["mission_id"];
            isOneToOne: false;
            referencedRelation: "missions";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "fk_verifications_user";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      notification_type: "cheer" | "reminder";
      relationship_type: "couple" | "family" | "friends" | "other";
      repeat_type: "daily" | "specific_days";
      verification_type: "photo" | "text" | "checklist";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<
  keyof Database,
  "public"
>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  public: {
    Enums: {
      notification_type: ["cheer", "reminder"],
      relationship_type: ["couple", "family", "friends", "other"],
      repeat_type: ["daily", "specific_days"],
      verification_type: ["photo", "text", "checklist"],
    },
  },
} as const;
