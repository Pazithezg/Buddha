import {
  AnalyzeResponse,
  DefectSpot,
  HealthResponse,
  UserMode,
} from "./types";

export const DEFAULT_API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export interface DemoAmuletPreset {
  id: string;
  shortLabel: string;
  data: AnalyzeResponse;
}

const DISCLAIMER_TEXT =
  "การประเมินเบื้องต้นโดยระบบปัญญาประดิษฐ์ (Dual-View Amulet AI) เพื่อเป็นข้อมูลประกอบการตัดสินใจเบื้องต้นเท่านั้น มิใช่ใบรับรองพระแท้ทางกฎหมาย";

export const DEMO_AMULETS: DemoAmuletPreset[] = [
  {
    id: "luangpu_thuad_97",
    shortLabel: "หลวงปู่ทวด 2497",
    data: {
      success: true,
      model_id: "luangpu_thuad_97",
      user_mode: "b2b",
      amulet_info: {
        name: "พระหลวงปู่ทวด วัดช้างให้ เนื้อว่าน ปี 2497 พิมพ์ใหญ่",
        temple: "วัดช้างให้ (วัดราษฎร์บูรณะ) จ.ปัตตานี",
        year: "พ.ศ. 2497",
        front_keypoint:
          "พิมพ์ลึกคมชัด ริ้วรอยเหี่ยวย่นบนหน้าผาก เปลือกตา และร่องแก้มลึกเป็นธรรมชาติ เม็ดแร่ว่านและคราบน้ำว่านผุดเกาะผิวพระ",
        back_keypoint:
          "ก้นมีรอยเสียบก้านธูปงัดออกจากพิมพ์ รูพรุนจากการระเหยของเนื้อว่าน มวลสารว่าน 108 ผสมดินกากยายักษ์",
        base_price_thb: 3500000,
        recommended_region:
          "ภาคใต้ (หาดใหญ่ สงขลา, สุราษฎร์ธานี, ปัตตานี) และ ศูนย์พระเครื่องกรุงเทพฯ",
        region_reason:
          "ถิ่นกำเนิดและศูนย์รวมพลังศรัทธาสายหลวงปู่ทวดอันดับหนึ่ง พุทธคุณนิรันตรายแคล้วคลาดเป็นที่ต้องการสูงตลอดกาลในภาคใต้",
        ref_front_img:
          "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80",
        ref_back_img:
          "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&w=800&q=80",
      },
      confidence: {
        total: 94.2,
        front: 92.0,
        back: 96.0,
        formula: "0.45 * front_conf + 0.55 * back_conf",
      },
      condition: {
        condition_pct: 88.0,
        grade: "สภาพสวยสมบูรณ์ (Excellent - ผิวเดิม)",
        defect_count: 2,
        defects_summary: ["รอยสึกหรอสัมผัส / รอยกร่อนผิว"],
        defects_detail: [
          {
            side: "front",
            type: "รอยบิ่นขอบซุ้มด้านซ้าย",
            x_pct: 34,
            y_pct: 60,
            confidence: 89.2,
            area_pct: 1.8,
          },
          {
            side: "back",
            type: "รอยกะเทาะผิวเนื้อว่านด้านหลัง",
            x_pct: 64,
            y_pct: 45,
            confidence: 91.5,
            area_pct: 1.4,
          },
        ],
      },
      pricing: {
        base_price_thb: 3500000,
        estimated_price_thb: 3080000,
        discount_pct: 12.0,
      },
      recommendation: {
        region:
          "ภาคใต้ (หาดใหญ่ สงขลา, สุราษฎร์ธานี, ปัตตานี) และ ศูนย์พระเครื่องกรุงเทพฯ",
        reason:
          "ถิ่นกำเนิดและศูนย์รวมพลังศรัทธาสายหลวงปู่ทวดอันดับหนึ่ง มีร้านรับเช่าสายตรงหนาแน่น",
      },
      ai_analysis:
        "สภาพความสมบูรณ์ 88.0% พบจุดตำหนิ/สึกหรอ 2 ตำแหน่ง แนะนำกรอบวงเงินรับเข้า/รับจำนำปลอดภัย (LTV 60–70%): 1,848,000 – 2,156,000 บาท",
      disclaimer: DISCLAIMER_TEXT,
      processing_time_ms: 420,
      system_specs: {
        device: "cpu",
        model_used: "mock_demo",
        clahe_applied_on_back: true,
      },
    },
  },
  {
    id: "somdej_watrakang",
    shortLabel: "พระสมเด็จวัดระฆัง",
    data: {
      success: true,
      model_id: "somdej_watrakang",
      user_mode: "b2b",
      amulet_info: {
        name: "พระสมเด็จวัดระฆังโฆสิตาราม พิมพ์ใหญ่",
        temple: "วัดระฆังโฆสิตารามวรมหาวิหาร กรุงเทพมหานคร",
        year: "พ.ศ. 2409–2415",
        front_keypoint:
          "เส้นซุ้มครอบแก้วหวายผ่าซีกโค้งสมส่วน ปลายพระเกศเรียวสะบัดจรดซุ้ม ฐานสิงห์คมขวานชัดเจน",
        back_keypoint:
          "หลังกาบหมาก หลังกระดาน มีรอยปูไต่ รอยหนอนด้น รอยปริแยกตามขอบข้าง",
        base_price_thb: 15000000,
        recommended_region:
          "กรุงเทพมหานครและปริมณฑล (ท่าพระจันทร์ / พันธุ์ทิพย์งามวงศ์วาน)",
        region_reason:
          "ศูนย์กลางสมาคมและสถาบันออกใบรับรองพระแท้ระดับประเทศ มีกำลังซื้อสูงสุด",
        ref_front_img:
          "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
        ref_back_img:
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
      },
      confidence: {
        total: 92.8,
        front: 91.5,
        back: 93.8,
        formula: "0.45 * front_conf + 0.55 * back_conf",
      },
      condition: {
        condition_pct: 84.5,
        grade: "สภาพปานกลางผ่านการบูชา (Good - มีรอยสัมผัส)",
        defect_count: 2,
        defects_summary: ["รอยกะเทาะมุมบนขวา", "รอยรานผิวด้านหลัง"],
        defects_detail: [
          {
            side: "front",
            type: "รอยกะเทาะมุมบนขวา",
            x_pct: 66,
            y_pct: 26,
            confidence: 87.5,
            area_pct: 2.1,
          },
          {
            side: "back",
            type: "รอยรานผิวด้านหลังล่าง",
            x_pct: 48,
            y_pct: 70,
            confidence: 88.0,
            area_pct: 1.9,
          },
        ],
      },
      pricing: {
        base_price_thb: 15000000,
        estimated_price_thb: 12675000,
        discount_pct: 15.5,
      },
      recommendation: {
        region: "กรุงเทพมหานครและปริมณฑล (ท่าพระจันทร์ / พันธุ์ทิพย์งามวงศ์วาน)",
        reason:
          "ศูนย์กลางสมาคมและสถาบันออกใบรับรองพระแท้ระดับประเทศ มีกำลังซื้อสูงสุด",
      },
      ai_analysis:
        "เส้นซุ้มครอบแก้วและมวลสารด้านหลังสอดคล้องพิมพ์มาตรฐาน สภาพความสมบูรณ์ 84.5%",
      disclaimer: DISCLAIMER_TEXT,
    },
  },
  {
    id: "luangputim_charoenphon",
    shortLabel: "เหรียญเจริญพร หลวงปู่ทิม",
    data: {
      success: true,
      model_id: "luangputim_charoenphon",
      user_mode: "b2b",
      amulet_info: {
        name: "เหรียญเจริญพรบน หลวงปู่ทิม อิสริโก วัดละหารไร่ ปี 2517",
        temple: "วัดละหารไร่ จ.ระยอง",
        year: "พ.ศ. 2517",
        front_keypoint:
          "อักษรคำว่า 'เจริญพร' ด้านบนคมชัด เส้นริ้วรอยลำคอ 2 เส้น โค้ดเลขประจำองค์ตอกชัด",
        back_keypoint:
          "โค้ดตัว ท ในเม็ดงา หรือโค้ดศาลาตอกลึก ตัวเลขอักขระยันต์ห้าคมชัด",
        base_price_thb: 1200000,
        recommended_region: "ภาคตะวันออก (ระยอง, ชลบุรี, จันทบุรี) และ กทม.",
        region_reason:
          "ภาคตะวันออกเป็นฐานเศรษฐกิจอุตสาหกรรมและมีรังพระใหญ่สายหลวงปู่ทิมที่เหนียวแน่น",
        ref_front_img:
          "https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?auto=format&fit=crop&w=800&q=80",
        ref_back_img:
          "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80",
      },
      confidence: {
        total: 95.3,
        front: 94.0,
        back: 96.4,
        formula: "0.45 * front_conf + 0.55 * back_conf",
      },
      condition: {
        condition_pct: 93.0,
        grade: "สภาพสวยสมบูรณ์ (Excellent - ผิวเดิม)",
        defect_count: 1,
        defects_summary: ["รอยขนแมวบางๆ พื้นเหรียญ"],
        defects_detail: [
          {
            side: "front",
            type: "รอยขนแมวบางๆ บริเวณพื้นเหรียญ",
            x_pct: 56,
            y_pct: 40,
            confidence: 85.4,
            area_pct: 0.9,
          },
        ],
      },
      pricing: {
        base_price_thb: 1200000,
        estimated_price_thb: 1116000,
        discount_pct: 7.0,
      },
      recommendation: {
        region: "ภาคตะวันออก (ระยอง, ชลบุรี, จันทบุรี) และ กทม.",
        reason:
          "ภาคตะวันออกเป็นฐานเศรษฐกิจอุตสาหกรรมและมีรังพระใหญ่สายหลวงปู่ทิมที่เหนียวแน่น",
      },
      ai_analysis:
        "โค้ดตอกและอักขระยันต์ห้าด้านหลังคมชัดผ่าน CLAHE ผิวเดิมสมบูรณ์ 93.0%",
      disclaimer: DISCLAIMER_TEXT,
    },
  },
  {
    id: "luangphor_khoon_19",
    shortLabel: "หลวงพ่อคูณ ปี 2519",
    data: {
      success: true,
      model_id: "luangphor_khoon_19",
      user_mode: "b2b",
      amulet_info: {
        name: "เหรียญหลวงพ่อคูณ ปริสุทโธ วัดบ้านไร่ รุ่นสร้างบารมี ปี 2519",
        temple: "วัดบ้านไร่ จ.นครราชสีมา",
        year: "พ.ศ. 2519",
        front_keypoint:
          "มีรอยขีดใต้ตาขวา เม็ดลูกกระเดือกนูนเด่น ขอบเหรียญปลิ้นตั้งเป็นสัน",
        back_keypoint:
          "โค้ด คปร. หรือโค้ดตัวนะ ตอกลึกเม็ดโลหะไม่บี้แบน รอยตัดขอบข้างยุค 2519",
        base_price_thb: 850000,
        recommended_region:
          "ภาคตะวันออกเฉียงเหนือ (นครราชสีมา, ขอนแก่น) และ กทม.",
        region_reason:
          "เหรียญยอดนิยมอันดับ 1 ของหลวงพ่อคูณ ชมรมพระเครื่องโคราชและสายตรงอีสานมีกำลังเช่าหาหมุนเวียนสูง",
        ref_front_img:
          "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80",
        ref_back_img:
          "https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=800&q=80",
      },
      confidence: {
        total: 93.1,
        front: 91.5,
        back: 94.4,
        formula: "0.45 * front_conf + 0.55 * back_conf",
      },
      condition: {
        condition_pct: 90.0,
        grade: "สภาพสวยสมบูรณ์ (Excellent - ผิวเดิม)",
        defect_count: 1,
        defects_summary: ["รอยเสียดสียันต์ด้านหลัง"],
        defects_detail: [
          {
            side: "back",
            type: "รอยเสียดสีเล็กน้อยบริเวณยันต์ด้านหลัง",
            x_pct: 42,
            y_pct: 56,
            confidence: 86.2,
            area_pct: 1.2,
          },
        ],
      },
      pricing: {
        base_price_thb: 850000,
        estimated_price_thb: 765000,
        discount_pct: 10.0,
      },
      recommendation: {
        region: "ภาคตะวันออกเฉียงเหนือ (นครราชสีมา, ขอนแก่น) และ กทม.",
        reason:
          "ชมรมพระเครื่องโคราชและสายตรงอีสานมีกำลังเช่าหาหมุนเวียนสูง",
      },
      ai_analysis:
        "ตัวหนังสือและยันต์ด้านหลังคมชัด ความสมบูรณ์ 90.0%",
      disclaimer: DISCLAIMER_TEXT,
    },
  },
  {
    id: "wessuwan_chulamani",
    shortLabel: "ท้าวเวสสุวรรณ ปี 2545",
    data: {
      success: true,
      model_id: "wessuwan_chulamani",
      user_mode: "b2b",
      amulet_info: {
        name: "เหรียญท้าวเวสสุวรรณ หลวงพ่ออิฏฐ์ วัดจุฬามณี รุ่นจำปี ปี 2545",
        temple: "วัดจุฬามณี จ.สมุทรสงคราม",
        year: "พ.ศ. 2545",
        front_keypoint:
          "องค์ท้าวเวสสุวรรณยืนกุมกระบอง ลวดลายเกราะและใบหน้าคมชัด เส้นสายฟ้าฟาดในซุ้มจำปี",
        back_keypoint:
          "โค้ดภาษาจีน 'เหล็ง' ตอกคมลึก อักขระยันต์โสฬสมงคลคมชัด รอยตัดข้างยุค 2545",
        base_price_thb: 120000,
        recommended_region: "ภาคกลาง (สมุทรสงคราม, สมุทรสาคร, กรุงเทพมหานคร)",
        region_reason:
          "วัดจุฬามณีและสายมูภาคกลางเป็นจุดศูนย์รวมศรัทธาท้าวเวสสุวรรณอันดับ 1",
        ref_front_img:
          "https://images.unsplash.com/photo-1569098644584-210bcd375b59?auto=format&fit=crop&w=800&q=80",
        ref_back_img:
          "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80",
      },
      confidence: {
        total: 92.4,
        front: 91.0,
        back: 93.5,
        formula: "0.45 * front_conf + 0.55 * back_conf",
      },
      condition: {
        condition_pct: 91.5,
        grade: "สภาพสวยสมบูรณ์ (Excellent - ผิวเดิม)",
        defect_count: 1,
        defects_summary: ["รอยสัมผัสขอบบน"],
        defects_detail: [
          {
            side: "front",
            type: "รอยสัมผัสเล็กน้อยบริเวณขอบซุ้ม",
            x_pct: 50,
            y_pct: 25,
            confidence: 84.0,
            area_pct: 1.0,
          },
        ],
      },
      pricing: {
        base_price_thb: 120000,
        estimated_price_thb: 109800,
        discount_pct: 8.5,
      },
      recommendation: {
        region: "ภาคกลาง (สมุทรสงคราม, สมุทรสาคร, กรุงเทพมหานคร)",
        reason:
          "วัดจุฬามณีและสายมูภาคกลางเป็นจุดศูนย์รวมศรัทธาท้าวเวสสุวรรณอันดับ 1",
      },
      ai_analysis:
        "เส้นสายฟ้าฟาดและโค้ดเหล็งด้านหลังคมชัด ความสมบูรณ์ 91.5%",
      disclaimer: DISCLAIMER_TEXT,
    },
  },
];

export function extractDefectSpots(res: AnalyzeResponse): DefectSpot[] {
  const details = res.condition.defects_detail;
  if (details && details.length > 0) {
    return details.map((d, idx) => ({
      id: idx + 1,
      side: d.side || (idx % 2 === 0 ? "front" : "back"),
      xPct: d.x_pct ?? 35 + ((idx * 17) % 35),
      yPct: d.y_pct ?? 35 + ((idx * 23) % 35),
      radiusPx: 24,
      label: d.type,
      confidence: d.confidence,
      areaPct: d.area_pct,
    }));
  }
  const count = Math.min(res.condition.defect_count, 4);
  const fallback: DefectSpot[] = [];
  for (let i = 0; i < count; i++) {
    fallback.push({
      id: i + 1,
      side: i % 2 === 0 ? "front" : "back",
      xPct: 36 + i * 14,
      yPct: 38 + (i % 2) * 24,
      radiusPx: 24,
      label: res.condition.defects_summary[i] || `จุดสังเกตตำหนิที่ ${i + 1}`,
    });
  }
  return fallback;
}

export async function checkBackendHealth(
  apiBase: string
): Promise<HealthResponse | null> {
  try {
    const res = await fetch(`${apiBase.replace(/\/$/, "")}/health`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function analyzeAmulet(params: {
  apiBase: string;
  useMock: boolean;
  frontFile: File;
  backFile: File;
  userMode: UserMode;
  mockPresetId?: string;
}): Promise<AnalyzeResponse> {
  if (params.useMock) {
    await new Promise((r) => setTimeout(r, 1400));
    const preset =
      DEMO_AMULETS.find((a) => a.id === params.mockPresetId) || DEMO_AMULETS[0];
    return preset.data;
  }

  const formData = new FormData();
  formData.append("front_image", params.frontFile);
  formData.append("back_image", params.backFile);
  formData.append("user_mode", params.userMode);

  const res = await fetch(`${params.apiBase.replace(/\/$/, "")}/api/analyze`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Backend error (${res.status}): ${errText}`);
  }

  return res.json();
}

export async function chatWithTyphoon(params: {
  apiBase: string;
  useMock: boolean;
  amuletName: string;
  contextInfo: string;
  question: string;
}): Promise<string> {
  if (params.useMock) {
    await new Promise((r) => setTimeout(r, 550));
    if (params.question.includes("แคปชัน") || params.question.includes("ขาย")) {
      return `✨ เปิดให้เช่าบูชา: ${params.amuletName}\n📌 สภาพสวยเดิม พิจารณาเบื้องต้นแล้วน่าสะสม\n💰 ราคาประเมินตามสภาพ นัดรับได้หรือส่งพร้อมประกัน\n#พระเครื่อง #เช่าพระ #ส่องพระAI`;
    }
    return `จากผลวิเคราะห์เบื้องต้นของ ${params.amuletName}: สามารถกดแตะวงกลมบนภาพเพื่อดูจุดตำหนิแต่ละจุด และเปิดโหมด CLAHE เพื่อส่องร่องยันต์และเส้นซุ้มให้ชัดขึ้นครับ`;
  }

  const res = await fetch(`${params.apiBase.replace(/\/$/, "")}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      amulet_name: params.amuletName,
      context_info: params.contextInfo,
      question: params.question,
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Chat API error (${res.status}): ${errText}`);
  }

  const data = await res.json();
  return data.answer;
}

export function resolveRefImageUrl(apiBase: string, path: string): string {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${apiBase.replace(/\/$/, "")}${path.startsWith("/") ? path : `/${path}`}`;
}
