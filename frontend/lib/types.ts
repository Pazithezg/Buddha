export type UserMode = "b2c" | "b2b";

export type ScreenStep = "home" | "capture" | "processing" | "result";

export type FocusIntent = "inspect" | "market" | "assistant";

export interface DefectSpot {
  id: number;
  side: "front" | "back";
  xPct: number;
  yPct: number;
  radiusPx: number;
  label: string;
  confidence?: number;
  areaPct?: number;
}

export interface DefectDetailRaw {
  side?: "front" | "back";
  type: string;
  bbox?: number[];
  x_pct?: number;
  y_pct?: number;
  confidence?: number;
  area_pct?: number;
}

export interface AmuletInfo {
  name: string;
  temple: string;
  year: string;
  front_keypoint: string;
  back_keypoint: string;
  base_price_thb: number;
  recommended_region: string;
  region_reason: string;
  ref_front_img: string;
  ref_back_img: string;
}

export interface AnalyzeResponse {
  success: boolean;
  model_id: string;
  user_mode: UserMode;
  amulet_info: AmuletInfo;
  confidence: {
    total: number;
    front: number;
    back: number;
    formula: string;
  };
  condition: {
    condition_pct: number;
    grade: string;
    defect_count: number;
    defects_summary: string[];
    defects_detail?: DefectDetailRaw[];
  };
  pricing: {
    base_price_thb: number;
    estimated_price_thb: number;
    discount_pct: number;
  };
  recommendation: {
    region: string;
    reason: string;
  };
  ai_analysis: string;
  disclaimer: string;
  clahe_back_image?: string | null;
  processing_time_ms?: number;
  system_specs?: {
    device: string;
    model_used: string;
    clahe_applied_on_back: boolean;
  };
}

export interface HealthResponse {
  status: string;
  model: string;
  device: string;
  typhoon_configured: boolean;
  amulets_count: number;
  supported_models: string[];
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}
