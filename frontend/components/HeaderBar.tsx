"use client";

import React, { useState } from "react";
import { Settings2, Wifi, Sparkles, ArrowLeft } from "lucide-react";
import { HealthResponse, ScreenStep, UserMode } from "@/lib/types";

interface HeaderBarProps {
  step: ScreenStep;
  userMode: UserMode;
  setUserMode: (mode: UserMode) => void;
  apiBase: string;
  setApiBase: (url: string) => void;
  useMock: boolean;
  setUseMock: (mock: boolean) => void;
  health: HealthResponse | null;
  onGoHome: () => void;
}

export default function HeaderBar({
  step,
  userMode,
  setUserMode,
  apiBase,
  setApiBase,
  useMock,
  setUseMock,
  health,
  onGoHome,
}: HeaderBarProps) {
  const [showSettings, setShowSettings] = useState(false);

  return (
    <header className="w-full border-b border-[#D4A84F]/20 bg-[#16120E]/95 backdrop-blur-md sticky top-0 z-40">
      <div
        className="relative"
        style={{
          background:
            "radial-gradient(ellipse at 55% 0%, rgba(230, 184, 92, 0.16) 0%, rgba(28, 22, 16, 0.7) 60%, #12100E 100%)",
        }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-3">
          {/* Brand with Signature Ancient Thai Brush Font */}
          <button
            type="button"
            onClick={onGoHome}
            className="flex items-center gap-3.5 text-left group cursor-pointer"
          >
            <div className="w-11 h-12 shrink-0 rounded-t-full rounded-b-2xl bg-gradient-to-b from-[#F5D782] via-[#C99636] to-[#7A5314] p-[2px] shadow-md flex items-center justify-center">
              <div className="w-full h-full rounded-t-full rounded-b-[14px] bg-[#18130D] flex items-center justify-center">
                <span className="font-signature text-lg font-bold text-[#F3CA6B] leading-none">
                  พระ
                </span>
              </div>
            </div>

            <div>
              <h1 className="font-signature text-2xl sm:text-3xl font-bold tracking-wide text-[#F7E5B8] group-hover:text-white transition leading-tight">
                ส่องพระดอทคอม AI
              </h1>
              <p className="text-[11px] sm:text-xs text-[#B8AD9E]">
                ถ่ายภาพตรวจตำหนิ • ประเมินราคากลางตามภูมิภาค
              </p>
            </div>
          </button>

          {/* Minimal Right Controls */}
          <div className="flex items-center gap-2">
            {step !== "home" && (
              <button
                type="button"
                onClick={onGoHome}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/5 hover:bg-white/10 text-xs text-[#E8DFD1] transition cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>หน้าแรก</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => setShowSettings(!showSettings)}
              aria-label="ตั้งค่าระบบ"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-white/5 hover:bg-white/10 text-xs text-[#C7BCAE] border border-white/10 transition cursor-pointer"
            >
              {useMock ? (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-[#E6B85C]" />
                  <span className="hidden sm:inline">Mock</span>
                </>
              ) : (
                <>
                  <Wifi className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="hidden sm:inline text-emerald-300">
                    {health ? health.model : "AI Live"}
                  </span>
                </>
              )}
              <Settings2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Hidden Settings Drawer */}
      {showSettings && (
        <div className="bg-[#1C1814] border-t border-[#E6B85C]/25 px-4 sm:px-6 py-3.5 text-xs">
          <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer text-[#F5EFE6]">
                <input
                  type="checkbox"
                  checked={useMock}
                  onChange={(e) => setUseMock(e.target.checked)}
                  className="accent-[#E6B85C] w-4 h-4 rounded"
                />
                <span>โหมดทดสอบออฟไลน์ (Mock)</span>
              </label>

              {/* Reserved B2C toggle kept cleanly out of the way */}
              <div className="flex items-center gap-1.5 bg-[#12100E] px-2.5 py-1 rounded-full border border-white/10">
                <span className="text-[#9A8F80]">โหมด:</span>
                <button
                  type="button"
                  onClick={() => setUserMode("b2b")}
                  className={`px-2 py-0.5 rounded-full cursor-pointer ${
                    userMode === "b2b"
                      ? "bg-[#E6B85C] text-[#18130D] font-bold"
                      : "text-[#B8AD9E]"
                  }`}
                >
                  B2B
                </button>
                <button
                  type="button"
                  onClick={() => setUserMode("b2c")}
                  className={`px-2 py-0.5 rounded-full cursor-pointer ${
                    userMode === "b2c"
                      ? "bg-[#E6B85C] text-[#18130D] font-bold"
                      : "text-[#B8AD9E]"
                  }`}
                >
                  B2C (สำรอง)
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-1 max-w-sm">
              <span className="text-[#9A8F80] shrink-0">FastAPI URL:</span>
              <input
                type="text"
                value={apiBase}
                onChange={(e) => setApiBase(e.target.value)}
                disabled={useMock}
                placeholder="http://localhost:8000"
                className="w-full px-3 py-1.5 rounded-full bg-[#12100E] border border-white/10 text-[#F5EFE6] disabled:opacity-45"
              />
            </div>
          </div>

          {health && !useMock && (
            <div className="max-w-4xl mx-auto mt-2 text-[11px] text-emerald-300/90">
              เชื่อมต่อ FastAPI สำเร็จ • Model: <strong>{health.model}</strong> • Device:{" "}
              <strong>{health.device}</strong> • ฐานข้อมูลพระ {health.amulets_count} รุ่น
            </div>
          )}
        </div>
      )}
    </header>
  );
}
