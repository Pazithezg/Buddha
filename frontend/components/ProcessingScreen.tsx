"use client";

import React, { useEffect, useState } from "react";
import { Loader2, CheckCircle2, Clock } from "lucide-react";

const PIPELINE_STEPS = [
  "ปรับความคมชัดร่องอักขระและเส้นซุ้ม (CLAHE)",
  "จำแนกรุ่นพระจากภาพด้านหน้าและด้านหลัง (YOLO11)",
  "ตรวจจับจุดตำหนิเพื่อสร้างวงกลมชี้จุด & คำนวณราคากลาง",
  "สรุปจุดสังเกตเป็นภาษาไทยเข้าใจง่าย (Typhoon AI)",
];

export default function ProcessingScreen() {
  const [secondsLeft, setSecondsLeft] = useState(60);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const stepTimer = setInterval(() => {
      setActiveStep((prev) =>
        prev < PIPELINE_STEPS.length - 1 ? prev + 1 : prev
      );
    }, 600);
    return () => clearInterval(stepTimer);
  }, []);

  return (
    <div className="max-w-lg mx-auto py-8">
      <div className="bg-[#1C1814] rounded-3xl border border-[#E6B85C]/35 p-6 sm:p-8 shadow-2xl space-y-6">
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="w-16 h-16 rounded-full bg-[#E6B85C]/15 border border-[#E6B85C]/40 flex items-center justify-center text-[#E6B85C]">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
          <h2 className="font-signature text-2xl sm:text-3xl font-bold text-[#F7E5B8]">
            กำลังตรวจตำหนิและประเมินราคา...
          </h2>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#12100E] text-[#E6B85C] text-xs font-bold border border-white/10">
            <Clock className="w-3.5 h-3.5" />
            <span>ไม่เกิน {secondsLeft} วินาที</span>
          </div>
        </div>

        <div className="space-y-2.5">
          {PIPELINE_STEPS.map((label, idx) => {
            const isDone = idx < activeStep;
            const isCurrent = idx === activeStep;
            return (
              <div
                key={label}
                className={`flex items-center gap-3 p-3.5 rounded-2xl border text-xs sm:text-sm transition ${
                  isCurrent
                    ? "bg-[#E6B85C]/10 border-[#E6B85C]/50 text-[#F7E5B8] font-bold"
                    : isDone
                    ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
                    : "bg-[#12100E] border-white/5 text-[#8E8375]"
                }`}
              >
                {isDone ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                ) : isCurrent ? (
                  <Loader2 className="w-5 h-5 text-[#E6B85C] animate-spin shrink-0" />
                ) : (
                  <div className="w-5 h-5 rounded-full border-2 border-white/15 shrink-0" />
                )}
                <span>{label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
