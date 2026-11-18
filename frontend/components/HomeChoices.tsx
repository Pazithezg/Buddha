"use client";

import React from "react";
import { Camera, TrendingUp, MessageCircleQuestion, ArrowRight, Sparkles } from "lucide-react";
import { FocusIntent } from "@/lib/types";

interface HomeChoicesProps {
  onChooseIntent: (intent: FocusIntent) => void;
  onQuickInspectDemo: () => void;
}

export default function HomeChoices({
  onChooseIntent,
  onQuickInspectDemo,
}: HomeChoicesProps) {
  return (
    <div className="max-w-3xl mx-auto py-4 sm:py-8 space-y-8">
      {/* Signature Hero Headline */}
      <section className="text-center space-y-3 px-2">
        <p className="text-xs uppercase tracking-[0.2em] text-[#E6B85C]/90 font-semibold">
          ใช้งานง่าย • เข้าถึงได้ทุกคน
        </p>
        <h2 className="font-signature text-4xl sm:text-5xl font-bold text-[#F7E5B8] leading-snug drop-shadow">
          อยากให้ช่วยตรวจพระแบบไหนวันนี้?
        </h2>
        <p className="text-sm sm:text-base text-[#B8AD9E] max-w-xl mx-auto leading-relaxed">
          แค่ถ่ายรูปพระด้านหน้าและด้านหลัง ระบบจะวงกลมจุดตำหนิให้ดูชัดๆ
          พร้อมเช็กราคากลางและแนะนำพื้นที่ขายที่ได้ราคาดีที่สุด
        </p>
      </section>

      {/* 3 Simple, Accessible Choices (No cluttered buttons) */}
      <section className="space-y-4">
        {/* Primary Choice 1: Photo Scan & Defect Circles */}
        <button
          type="button"
          onClick={() => onChooseIntent("inspect")}
          className="w-full text-left group rounded-3xl bg-gradient-to-br from-[#261E15] to-[#1C1814] border-2 border-[#E6B85C]/60 hover:border-[#E6B85C] p-6 sm:p-7 shadow-xl transition-all duration-200 hover:-translate-y-0.5 flex items-center justify-between gap-4 cursor-pointer"
        >
          <div className="flex items-start sm:items-center gap-4 sm:gap-5">
            <div className="w-14 h-14 shrink-0 rounded-2xl bg-[#E6B85C] text-[#18130D] flex items-center justify-center shadow-md">
              <Camera className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <div className="inline-block text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#E6B85C]/15 text-[#E6B85C] mb-1">
                แนะนำ • ใช้บ่อยที่สุด
              </div>
              <h3 className="font-signature text-2xl sm:text-3xl font-bold text-[#F7E5B8] group-hover:text-white transition">
                1. ถ่ายรูปตรวจพระ &amp; ดูวงกลมตำหนิ
              </h3>
              <p className="text-xs sm:text-sm text-[#C7BCAE]">
                ถ่ายหรืออัปโหลดภาพหน้า–หลัง เพื่อเช็กรุ่น วงกลมชี้รอยบิ่น/ตำหนิ และดู % ความสมบูรณ์
              </p>
            </div>
          </div>
          <ArrowRight className="w-6 h-6 text-[#E6B85C] shrink-0 group-hover:translate-x-1 transition" />
        </button>

        {/* Secondary Choices 2 & 3 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => onChooseIntent("market")}
            className="text-left group rounded-3xl bg-[#1C1814] border border-white/10 hover:border-[#E6B85C]/50 p-5 sm:p-6 transition-all duration-200 hover:-translate-y-0.5 flex flex-col justify-between gap-4 cursor-pointer"
          >
            <div className="space-y-2.5">
              <div className="w-11 h-11 rounded-2xl bg-[#E6B85C]/15 text-[#E6B85C] flex items-center justify-center">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="font-signature text-2xl font-bold text-[#F5EFE6] group-hover:text-[#F7E5B8] transition">
                2. เช็คราคากลาง &amp; ภาคที่ขายดี
              </h3>
              <p className="text-xs sm:text-sm text-[#B8AD9E] leading-relaxed">
                สแกนเพื่อประเมินราคาตามสภาพ และดูว่าควรนำไปปล่อยที่จังหวัดหรือภาคไหน
              </p>
            </div>
            <div className="text-xs font-semibold text-[#E6B85C] inline-flex items-center gap-1">
              <span>เริ่มเช็คราคา</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </button>

          <button
            type="button"
            onClick={() => onChooseIntent("assistant")}
            className="text-left group rounded-3xl bg-[#1C1814] border border-white/10 hover:border-[#E6B85C]/50 p-5 sm:p-6 transition-all duration-200 hover:-translate-y-0.5 flex flex-col justify-between gap-4 cursor-pointer"
          >
            <div className="space-y-2.5">
              <div className="w-11 h-11 rounded-2xl bg-[#E6B85C]/15 text-[#E6B85C] flex items-center justify-center">
                <MessageCircleQuestion className="w-5 h-5" />
              </div>
              <h3 className="font-signature text-2xl font-bold text-[#F5EFE6] group-hover:text-[#F7E5B8] transition">
                3. เทียบองค์ครู &amp; ถามผู้ช่วย AI
              </h3>
              <p className="text-xs sm:text-sm text-[#B8AD9E] leading-relaxed">
                ส่องเทียบองค์ครูมาตรฐานหน้าชนหน้า และพิมพ์ถามจุดสังเกตเป็นภาษาไทยง่ายๆ
              </p>
            </div>
            <div className="text-xs font-semibold text-[#E6B85C] inline-flex items-center gap-1">
              <span>เทียบภาพ &amp; ถาม AI</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </button>
        </div>
      </section>

      {/* Quick 1-click Demo Preview Link */}
      <div className="text-center space-y-2 pt-2">
        <button
          type="button"
          onClick={onQuickInspectDemo}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs sm:text-sm text-[#F7E5B8] transition cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-[#E6B85C]" />
          <span>ดูตัวอย่างผลตรวจพร้อมวงกลมตำหนิทันที (Demo)</span>
        </button>
        <p className="text-[11px] text-[#8E8375]">
          * ระบบช่วยคัดกรองเบื้องต้น ไม่ฟันธงแท้–เก๊ 100% และไม่เผยแพร่ภาพถ่ายของคุณ
        </p>
      </div>
    </div>
  );
}
