"use client";

import React, { useRef } from "react";
import {
  Camera,
  Upload,
  Sparkles,
  CheckCircle2,
  Image as ImageIcon,
} from "lucide-react";
import { DEMO_AMULETS } from "@/lib/api";
import { FocusIntent } from "@/lib/types";

interface DualCaptureProps {
  intent: FocusIntent;
  useMock: boolean;
  selectedPresetId: string;
  onSelectPresetId: (id: string) => void;
  frontFile: File | null;
  backFile: File | null;
  frontPreview: string | null;
  backPreview: string | null;
  onSelectFront: (file: File) => void;
  onSelectBack: (file: File) => void;
  onLoadDemoImages: () => void;
  onAnalyze: () => void;
}

const INTENT_TITLES: Record<FocusIntent, string> = {
  inspect: "ถ่ายรูปตรวจพระ & ดูวงกลมตำหนิ",
  market: "ถ่ายรูปเช็คราคากลาง & ภาคที่ขายดี",
  assistant: "ถ่ายรูปเพื่อเทียบองค์ครู & ถาม AI",
};

export default function DualCapture({
  intent,
  useMock,
  selectedPresetId,
  onSelectPresetId,
  frontFile,
  backFile,
  frontPreview,
  backPreview,
  onSelectFront,
  onSelectBack,
  onLoadDemoImages,
  onAnalyze,
}: DualCaptureProps) {
  const frontInputRef = useRef<HTMLInputElement>(null);
  const backInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    cb: (file: File) => void
  ) => {
    const file = e.target.files?.[0];
    if (file) cb(file);
  };

  const canSubmit = Boolean(frontFile && backFile);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header Card */}
      <div className="bg-[#1C1814] rounded-3xl border border-white/10 p-5 sm:p-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="font-signature text-2xl sm:text-3xl font-bold text-[#F7E5B8]">
              {INTENT_TITLES[intent]}
            </h2>
            <p className="text-xs sm:text-sm text-[#B8AD9E] mt-1">
              ถ่ายหรือเลือกรูปด้านหน้าและด้านหลัง แล้วระบบจะวงกลมจุดตำหนิพร้อมประเมินราคาให้ทันที
            </p>
          </div>

          <button
            type="button"
            onClick={onLoadDemoImages}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#E6B85C]/15 hover:bg-[#E6B85C]/25 text-[#E6B85C] text-xs font-semibold transition cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>ใช้ภาพตัวอย่างทดสอบ</span>
          </button>
        </div>

        {/* Clean 5-model strip (Mock selector when testing) */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/5">
          <span className="text-xs text-[#9A8F80] mr-1">
            {useMock ? "เลือกรุ่นจำลอง (Demo 5 รุ่น):" : "รุ่นที่รองรับ:"}
          </span>
          {DEMO_AMULETS.map((item) => {
            const active = useMock && selectedPresetId === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => useMock && onSelectPresetId(item.id)}
                className={`px-3 py-1 rounded-full text-xs transition ${
                  active
                    ? "bg-[#E6B85C] text-[#18130D] font-bold"
                    : "bg-[#12100E] text-[#C7BCAE] border border-white/10"
                } ${useMock ? "cursor-pointer hover:border-[#E6B85C]/50" : "cursor-default"}`}
              >
                {item.shortLabel}
              </button>
            );
          })}
        </div>
      </div>

      {/* Front & Back Photo Slots */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <CaptureSlot
          title="1. ด้านหน้าองค์พระ"
          hint="ให้เห็นพิมพ์ทรงและเส้นซุ้มชัดเจน"
          preview={frontPreview}
          inputRef={frontInputRef}
          onChange={(e) => handleFileChange(e, onSelectFront)}
        />
        <CaptureSlot
          title="2. ด้านหลังองค์พระ"
          hint="ให้เห็นอักขระยันต์หรือพื้นผิวด้านหลัง"
          preview={backPreview}
          inputRef={backInputRef}
          onChange={(e) => handleFileChange(e, onSelectBack)}
        />
      </div>

      {/* Single Primary Action */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#1C1814] rounded-3xl p-5 border border-[#E6B85C]/35">
        <div className="text-xs sm:text-sm">
          {canSubmit ? (
            <span className="inline-flex items-center gap-2 text-emerald-400 font-semibold">
              <CheckCircle2 className="w-5 h-5" />
              พร้อมตรวจหาจุดตำหนิและคำนวณราคากลางแล้ว
            </span>
          ) : (
            <span className="text-[#B8AD9E]">
              ใส่รูปให้ครบทั้ง 2 ด้านก่อนกดตรวจ (หรือกด &ldquo;ใช้ภาพตัวอย่างทดสอบ&rdquo;)
            </span>
          )}
        </div>

        <button
          type="button"
          disabled={!canSubmit}
          onClick={onAnalyze}
          className="w-full sm:w-auto px-8 py-3 rounded-full bg-[#E6B85C] hover:bg-[#F0C975] text-[#18130D] font-bold text-sm shadow-lg disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
        >
          ตรวจพระ &amp; หาตำหนิเลย →
        </button>
      </div>
    </div>
  );
}

function CaptureSlot({
  title,
  hint,
  preview,
  inputRef,
  onChange,
}: {
  title: string;
  hint: string;
  preview: string | null;
  inputRef: React.RefObject<HTMLInputElement | null>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="bg-[#1C1814] rounded-3xl border border-white/10 p-5 flex flex-col gap-4">
      <div>
        <h3 className="font-signature text-xl font-bold text-[#F7E5B8]">
          {title}
        </h3>
        <p className="text-xs text-[#9A8F80]">{hint}</p>
      </div>

      <div
        onClick={() => inputRef.current?.click()}
        className="relative h-64 rounded-2xl bg-[#12100E] border-2 border-dashed border-[#E6B85C]/35 hover:border-[#E6B85C]/75 overflow-hidden flex items-center justify-center cursor-pointer group transition"
      >
        {preview ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={preview}
            alt={title}
            className="w-full h-full object-contain"
          />
        ) : (
          <div className="text-center px-6 space-y-2 text-[#9A8F80]">
            <ImageIcon className="w-10 h-10 mx-auto text-[#E6B85C]/80 group-hover:scale-110 transition" />
            <div className="text-sm font-medium text-[#F5EFE6]">
              แตะเพื่อถ่ายรูป หรือเลือกรูป
            </div>
          </div>
        )}

        {/* Arch Guide */}
        <div className="pointer-events-none absolute inset-4 flex items-center justify-center">
          <div className="w-36 h-52 rounded-t-[4rem] rounded-b-2xl border-2 border-[#E6B85C]/40" />
        </div>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={onChange}
        className="hidden"
      />

      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-[#E6B85C] hover:bg-[#F0C975] text-[#18130D] text-xs font-bold transition cursor-pointer"
        >
          <Camera className="w-3.5 h-3.5" />
          <span>ถ่ายรูป</span>
        </button>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-white/10 hover:bg-white/15 text-[#F5EFE6] text-xs font-semibold transition cursor-pointer"
        >
          <Upload className="w-3.5 h-3.5" />
          <span>เลือกรูป</span>
        </button>
      </div>
    </div>
  );
}
