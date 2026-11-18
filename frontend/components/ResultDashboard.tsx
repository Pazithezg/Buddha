"use client";

import React, { useState } from "react";
import {
  MapPin,
  Award,
  Send,
  Copy,
  Check,
  Eye,
  RotateCcw,
  AlertTriangle,
  Sparkles,
  CircleDot,
} from "lucide-react";
import {
  AnalyzeResponse,
  ChatMessage,
  DefectSpot,
  UserMode,
} from "@/lib/types";
import {
  chatWithTyphoon,
  extractDefectSpots,
  resolveRefImageUrl,
} from "@/lib/api";

interface ResultDashboardProps {
  result: AnalyzeResponse;
  userMode: UserMode;
  frontPreview: string | null;
  backPreview: string | null;
  apiBase: string;
  useMock: boolean;
  onScanAgain: () => void;
  onOpenCertModal: () => void;
}

export default function ResultDashboard({
  result,
  userMode,
  frontPreview,
  backPreview,
  apiBase,
  useMock,
  onScanAgain,
  onOpenCertModal,
}: ResultDashboardProps) {
  const defects = extractDefectSpots(result);
  const [selectedDefectId, setSelectedDefectId] = useState<number | null>(
    defects[0]?.id ?? null
  );
  const [showCircles, setShowCircles] = useState(true);
  const [showClahe, setShowClahe] = useState(false);
  const [showRefSide, setShowRefSide] = useState(false);

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [question, setQuestion] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [copiedCaption, setCopiedCaption] = useState(false);

  const formatTHB = (val: number) =>
    new Intl.NumberFormat("th-TH").format(val);

  const handleSendChat = async (customPrompt?: string) => {
    const q = (customPrompt ?? question).trim();
    if (!q || chatLoading) return;

    setMessages((prev) => [...prev, { role: "user", content: q }]);
    if (!customPrompt) setQuestion("");
    setChatLoading(true);

    try {
      const contextInfo = `พระเครื่อง: ${result.amulet_info.name} วัด: ${result.amulet_info.temple} ปี: ${result.amulet_info.year} ความสมบูรณ์: ${result.condition.condition_pct}% ราคากลาง: ${result.pricing.estimated_price_thb.toLocaleString()} บาท จุดหน้า: ${result.amulet_info.front_keypoint} จุดหลัง: ${result.amulet_info.back_keypoint} ตลาดแนะนำ: ${result.recommendation.region} (${result.recommendation.reason})`;
      const answer = await chatWithTyphoon({
        apiBase,
        useMock,
        amuletName: result.amulet_info.name,
        contextInfo,
        question: q,
      });
      setMessages((prev) => [...prev, { role: "assistant", content: answer }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `ไม่สามารถติดต่อ Typhoon API ได้: ${
            err instanceof Error ? err.message : "Unknown error"
          }`,
        },
      ]);
    } finally {
      setChatLoading(false);
    }
  };

  const handleCopyCaption = async () => {
    const captionPrompt = `ช่วยเขียนแคปชันโพสต์ขายพระเครื่องรุ่น ${result.amulet_info.name} สภาพความสมบูรณ์ ${result.condition.condition_pct}% ราคาประเมิน ${formatTHB(result.pricing.estimated_price_thb)} บาท ให้สั้นกระชับน่าเชื่อถือ`;
    setChatLoading(true);
    try {
      const caption = await chatWithTyphoon({
        apiBase,
        useMock,
        amuletName: result.amulet_info.name,
        contextInfo: `สภาพ ${result.condition.condition_pct}%, ราคา ${result.pricing.estimated_price_thb} บาท`,
        question: captionPrompt,
      });
      setMessages((prev) => [
        ...prev,
        { role: "user", content: "สร้างแคปชันโพสต์ขาย" },
        { role: "assistant", content: caption },
      ]);
      await navigator.clipboard?.writeText(caption);
      setCopiedCaption(true);
      setTimeout(() => setCopiedCaption(false), 2500);
    } finally {
      setChatLoading(false);
    }
  };

  const selectedDefect =
    defects.find((d) => d.id === selectedDefectId) ?? defects[0] ?? null;

  const displayedBackImage =
    showClahe && result.clahe_back_image ? result.clahe_back_image : backPreview;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* 1. Primary Focus: Defect Inspection Photo View with Circles */}
      <section className="bg-[#1C1814] rounded-3xl border border-[#E6B85C]/30 p-5 sm:p-6 shadow-xl space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="text-xs font-semibold text-[#E6B85C]">
              ความมั่นใจรวม {result.confidence.total.toFixed(1)}% (หน้า{" "}
              {result.confidence.front.toFixed(0)}% • หลัง{" "}
              {result.confidence.back.toFixed(0)}%)
              {result.system_specs
                ? ` • ${result.system_specs.model_used} (${result.system_specs.device})`
                : ""}
            </span>
            <h2 className="font-signature text-2xl sm:text-3xl font-bold text-[#F7E5B8] mt-0.5">
              {result.amulet_info.name}
            </h2>
            <p className="text-xs sm:text-sm text-[#B8AD9E]">
              {result.amulet_info.temple} • {result.amulet_info.year}
            </p>
          </div>

          {/* Minimal 3 View Toggles */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setShowCircles(!showCircles)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold inline-flex items-center gap-1.5 transition cursor-pointer ${
                showCircles
                  ? "bg-rose-500/20 text-rose-300 border border-rose-400/50"
                  : "bg-white/5 text-[#B8AD9E]"
              }`}
            >
              <CircleDot className="w-3.5 h-3.5" />
              <span>วงกลมตำหนิ ({defects.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setShowClahe(!showClahe)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold inline-flex items-center gap-1.5 transition cursor-pointer ${
                showClahe
                  ? "bg-[#E6B85C] text-[#18130D]"
                  : "bg-white/5 text-[#B8AD9E]"
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>ส่อง CLAHE</span>
            </button>

            <button
              type="button"
              onClick={() => setShowRefSide(!showRefSide)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition cursor-pointer ${
                showRefSide
                  ? "bg-[#E6B85C] text-[#18130D]"
                  : "bg-white/5 text-[#B8AD9E]"
              }`}
            >
              เทียบองค์ครู
            </button>
          </div>
        </div>

        {/* Front & Back Photos with Interactive Defect Circles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DefectPhotoFrame
            title="ด้านหน้า (แตะวงกลมเพื่อดูจุดตำหนิ)"
            imageSrc={frontPreview}
            isClahe={showClahe}
            showCircles={showCircles}
            spots={defects.filter((d) => d.side === "front")}
            selectedId={selectedDefectId}
            onSelectSpot={setSelectedDefectId}
          />
          <DefectPhotoFrame
            title={
              showClahe && result.clahe_back_image
                ? "ด้านหลัง (OpenCV CLAHE จริง)"
                : "ด้านหลัง (แตะวงกลมเพื่อดูจุดตำหนิ)"
            }
            imageSrc={displayedBackImage}
            isClahe={showClahe && !result.clahe_back_image}
            showCircles={showCircles}
            spots={defects.filter((d) => d.side === "back")}
            selectedId={selectedDefectId}
            onSelectSpot={setSelectedDefectId}
          />
        </div>

        {/* Defect Breakdown List */}
        {defects.length > 0 && (
          <div className="rounded-2xl bg-[#12100E] p-4 space-y-2.5">
            <div className="text-xs font-semibold text-[#E6B85C]">
              จุดสังเกตและตำหนิที่ตรวจพบ ({result.condition.defect_count} จุด •{" "}
              {result.condition.grade}):
            </div>
            <div className="flex flex-wrap gap-2">
              {defects.map((spot) => {
                const isSelected = selectedDefect?.id === spot.id;
                return (
                  <button
                    key={spot.id}
                    type="button"
                    onClick={() => setSelectedDefectId(spot.id)}
                    className={`px-3.5 py-1.5 rounded-full text-xs transition cursor-pointer flex items-center gap-2 ${
                      isSelected
                        ? "bg-rose-500/20 text-rose-200 border border-rose-400/60 font-semibold"
                        : "bg-white/5 text-[#C7BCAE] hover:bg-white/10"
                    }`}
                  >
                    <span className="w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">
                      {spot.id}
                    </span>
                    <span>
                      {spot.label} ({spot.side === "front" ? "หน้า" : "หลัง"})
                    </span>
                    {spot.confidence && (
                      <span className="text-rose-300">
                        {spot.confidence.toFixed(0)}%
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Keypoints & Reference Side-by-Side Drawer */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="rounded-2xl bg-[#12100E] p-3.5 space-y-1">
            <div className="font-semibold text-[#E6B85C]">จุดสังเกตด้านหน้า</div>
            <p className="text-[#C7BCAE] leading-relaxed">
              {result.amulet_info.front_keypoint}
            </p>
          </div>
          <div className="rounded-2xl bg-[#12100E] p-3.5 space-y-1">
            <div className="font-semibold text-[#E6B85C]">
              จุดสังเกตด้านหลัง (CLAHE)
            </div>
            <p className="text-[#C7BCAE] leading-relaxed">
              {result.amulet_info.back_keypoint}
            </p>
          </div>
        </div>

        {showRefSide && (
          <div className="rounded-2xl bg-[#12100E] border border-white/10 p-4 space-y-3">
            <div className="text-xs font-bold text-[#E6B85C]">
              เทียบภาพองค์ครูมาตรฐาน (หน้าชนหน้า – หลังชนหลัง)
            </div>
            <div className="grid grid-cols-2 gap-4">
              <RefBox
                label="องค์ครูด้านหน้า"
                src={resolveRefImageUrl(apiBase, result.amulet_info.ref_front_img)}
                fallbackName={result.amulet_info.ref_front_img}
              />
              <RefBox
                label="องค์ครูด้านหลัง"
                src={resolveRefImageUrl(apiBase, result.amulet_info.ref_back_img)}
                fallbackName={result.amulet_info.ref_back_img}
              />
            </div>
          </div>
        )}
      </section>

      {/* 2. Price, Completeness % & Best Region Card */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-[#1C1814] rounded-3xl border border-white/10 p-5 space-y-3">
          <div className="flex items-center justify-between text-xs text-[#9A8F80]">
            <span>ราคาประเมินตามสภาพ ({result.condition.condition_pct}%)</span>
            <span>
              ราคากลางสวย: ฿{formatTHB(result.pricing.base_price_thb)}
            </span>
          </div>
          <div className="font-signature text-3xl font-bold text-[#E6B85C]">
            ฿ {formatTHB(result.pricing.estimated_price_thb)} บาท
          </div>
          <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#E6B85C] rounded-full transition-all"
              style={{
                width: `${Math.min(
                  100,
                  Math.max(0, result.condition.condition_pct)
                )}%`,
              }}
            />
          </div>
        </div>

        <div className="bg-[#1C1814] rounded-3xl border border-white/10 p-5 space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#E6B85C]">
            <MapPin className="w-4 h-4 shrink-0" />
            <span>จังหวัด / ภูมิภาคที่แนะนำให้นำไปขาย</span>
          </div>
          <div className="text-sm font-bold text-[#F5EFE6]">
            {result.recommendation.region}
          </div>
          <p className="text-xs text-[#B8AD9E] leading-relaxed">
            {result.recommendation.reason}
          </p>
        </div>
      </section>

      {/* 3. Typhoon AI Q&A */}
      <section className="bg-[#1C1814] rounded-3xl border border-white/10 p-5 sm:p-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#E6B85C]" />
            <h3 className="font-signature text-xl font-bold text-[#F7E5B8]">
              คำแนะนำจากผู้ช่วย AI (Typhoon)
            </h3>
          </div>

          {userMode === "b2b" && (
            <button
              type="button"
              onClick={handleCopyCaption}
              disabled={chatLoading}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#E6B85C]/15 hover:bg-[#E6B85C]/25 text-[#E6B85C] text-xs font-semibold transition cursor-pointer"
            >
              {copiedCaption ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>คัดลอกแคปชันแล้ว</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>สร้างแคปชันขาย</span>
                </>
              )}
            </button>
          )}
        </div>

        <p className="rounded-2xl bg-[#12100E] p-4 text-xs sm:text-sm text-[#E8DFD1] leading-relaxed whitespace-pre-line">
          {result.ai_analysis}
        </p>

        {messages.length > 0 && (
          <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`p-3.5 rounded-2xl text-xs sm:text-sm whitespace-pre-line ${
                  m.role === "user"
                    ? "bg-[#E6B85C]/15 text-[#F7E5B8] ml-8"
                    : "bg-[#12100E] text-[#E8DFD1] mr-8"
                }`}
              >
                {m.content}
              </div>
            ))}
          </div>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendChat();
          }}
          className="flex gap-2"
        >
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="พิมพ์ถามจุดสังเกตหรือข้อมูลเพิ่มเติม..."
            className="flex-1 px-4 py-2.5 rounded-full border border-white/10 bg-[#12100E] text-[#F5EFE6] text-xs sm:text-sm focus:outline-none focus:border-[#E6B85C]/60"
          />
          <button
            type="submit"
            disabled={chatLoading || !question.trim()}
            className="px-5 py-2.5 rounded-full bg-[#E6B85C] text-[#18130D] text-xs sm:text-sm font-bold inline-flex items-center gap-1.5 disabled:opacity-40 cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span>ถาม AI</span>
          </button>
        </form>
      </section>

      {/* Bottom Actions */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={onScanAgain}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-xs sm:text-sm font-semibold text-[#F5EFE6] transition cursor-pointer"
        >
          <RotateCcw className="w-4 h-4 text-[#E6B85C]" />
          <span>ถ่าย / สแกนองค์ใหม่</span>
        </button>

        <button
          type="button"
          onClick={onOpenCertModal}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#E6B85C] hover:bg-[#F0C975] text-[#18130D] text-xs sm:text-sm font-bold shadow cursor-pointer"
        >
          <Award className="w-4 h-4" />
          <span>ส่งต่อออกบัตรรับรอง (Check Cer)</span>
        </button>
      </div>

      {/* Legal Disclaimer */}
      <footer className="flex items-start gap-2.5 rounded-2xl bg-[#1A1610] border border-[#E6B85C]/20 p-3.5 text-xs text-[#C7BCAE]">
        <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-[#E6B85C]" />
        <span>{result.disclaimer}</span>
      </footer>
    </div>
  );
}

function DefectPhotoFrame({
  title,
  imageSrc,
  isClahe,
  showCircles,
  spots,
  selectedId,
  onSelectSpot,
}: {
  title: string;
  imageSrc: string | null;
  isClahe: boolean;
  showCircles: boolean;
  spots: DefectSpot[];
  selectedId: number | null;
  onSelectSpot: (id: number) => void;
}) {
  return (
    <div className="rounded-2xl bg-[#12100E] border border-white/10 p-3.5 space-y-2.5">
      <div className="text-xs font-semibold text-[#E6B85C]">{title}</div>
      <div className="relative h-72 rounded-xl bg-[#0B0A08] overflow-hidden flex items-center justify-center">
        {imageSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageSrc}
            alt={title}
            className={`w-full h-full object-contain transition ${
              isClahe ? "clahe-preview" : ""
            }`}
          />
        ) : (
          <span className="text-xs text-[#8E8375]">ไม่มีภาพ</span>
        )}

        {/* Interactive Circular Defect Markers */}
        {showCircles &&
          spots.map((spot) => {
            const isActive = selectedId === spot.id;
            const size = spot.radiusPx * 2;
            return (
              <button
                key={spot.id}
                type="button"
                onClick={() => onSelectSpot(spot.id)}
                title={spot.label}
                style={{
                  left: `${spot.xPct}%`,
                  top: `${spot.yPct}%`,
                  width: `${size}px`,
                  height: `${size}px`,
                }}
                className={`defect-ring -translate-x-1/2 -translate-y-1/2 absolute rounded-full border-[3px] flex items-center justify-center transition cursor-pointer ${
                  isActive
                    ? "border-rose-400 bg-rose-500/25 shadow-[0_0_16px_rgba(244,63,94,0.8)] scale-110"
                    : "border-[#E6B85C] bg-[#E6B85C]/15 hover:border-rose-400"
                }`}
              >
                <span className="absolute -top-2.5 -right-2.5 w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center shadow">
                  {spot.id}
                </span>
              </button>
            );
          })}
      </div>
    </div>
  );
}

function RefBox({
  label,
  src,
  fallbackName,
}: {
  label: string;
  src: string | null;
  fallbackName: string;
}) {
  const [err, setErr] = useState(false);
  return (
    <div className="space-y-1.5">
      <div className="h-44 rounded-xl bg-[#0B0A08] border border-white/10 overflow-hidden flex items-center justify-center p-2 text-center">
        {src && !err ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={label}
            onError={() => setErr(true)}
            className="w-full h-full object-contain"
          />
        ) : (
          <div className="space-y-1 text-[#9A8F80]">
            <div className="w-14 h-20 mx-auto rounded-t-3xl rounded-b-xl border border-dashed border-[#E6B85C]/50 bg-[#1C1814] flex items-center justify-center text-[11px] font-bold text-[#E6B85C]">
              องค์ครู
            </div>
            <div className="text-[10px] opacity-75 truncate max-w-[120px]">
              {fallbackName}
            </div>
          </div>
        )}
      </div>
      <div className="text-[11px] text-center text-[#B8AD9E]">{label}</div>
    </div>
  );
}
