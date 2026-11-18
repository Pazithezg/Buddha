"use client";

import React, { useEffect, useState } from "react";
import { ShieldCheck } from "lucide-react";
import HeaderBar from "@/components/HeaderBar";
import HomeChoices from "@/components/HomeChoices";
import DualCapture from "@/components/DualCapture";
import ProcessingScreen from "@/components/ProcessingScreen";
import ResultDashboard from "@/components/ResultDashboard";
import {
  AnalyzeResponse,
  FocusIntent,
  HealthResponse,
  ScreenStep,
  UserMode,
} from "@/lib/types";
import {
  analyzeAmulet,
  checkBackendHealth,
  DEFAULT_API_BASE,
  DEMO_AMULETS,
} from "@/lib/api";

function createSampleAmuletFile(
  side: "front" | "back",
  label: string
): Promise<File> {
  return new Promise((resolve) => {
    const canvas = document.createElement("canvas");
    canvas.width = 480;
    canvas.height = 640;
    const ctx = canvas.getContext("2d")!;

    ctx.fillStyle = "#12100E";
    ctx.fillRect(0, 0, 480, 640);

    ctx.fillStyle = side === "front" ? "#6F583F" : "#5D4934";
    ctx.beginPath();
    ctx.roundRect(110, 80, 260, 460, [110, 110, 28, 28]);
    ctx.fill();
    ctx.lineWidth = 5;
    ctx.strokeStyle = "#E6B85C";
    ctx.stroke();

    ctx.fillStyle = "#F7E5B8";
    ctx.font = "bold 24px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(
      side === "front" ? "ด้านหน้า (พิมพ์ทรง)" : "ด้านหลัง (อักขระยันต์)",
      240,
      300
    );
    ctx.font = "16px sans-serif";
    ctx.fillStyle = "#E8DFD1";
    ctx.fillText(label, 240, 340);

    canvas.toBlob((blob) => {
      resolve(new File([blob!], `demo_${side}.png`, { type: "image/png" }));
    }, "image/png");
  });
}

export default function HomePage() {
  const [step, setStep] = useState<ScreenStep>("home");
  const [intent, setIntent] = useState<FocusIntent>("inspect");
  const [userMode, setUserMode] = useState<UserMode>("b2b");
  const [apiBase, setApiBase] = useState<string>(DEFAULT_API_BASE);
  const [useMock, setUseMock] = useState<boolean>(false);
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [selectedPresetId, setSelectedPresetId] = useState<string>(
    DEMO_AMULETS[0].id
  );

  const [frontFile, setFrontFile] = useState<File | null>(null);
  const [backFile, setBackFile] = useState<File | null>(null);
  const [frontPreview, setFrontPreview] = useState<string | null>(null);
  const [backPreview, setBackPreview] = useState<string | null>(null);

  const [result, setResult] = useState<AnalyzeResponse | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [showCertModal, setShowCertModal] = useState(false);
  const [certSubmitted, setCertSubmitted] = useState(false);

  // Auto-detect live FastAPI backend on mount; fallback cleanly to Mock if unreachable
  useEffect(() => {
    let cancelled = false;
    checkBackendHealth(apiBase).then((h) => {
      if (cancelled) return;
      setHealth(h);
      if (!h) {
        setUseMock(true);
      } else {
        setUseMock(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [apiBase]);

  const handleChooseIntent = (chosen: FocusIntent) => {
    setIntent(chosen);
    setErrorMsg(null);
    setStep("capture");
  };

  const handleSelectFront = (file: File) => {
    setFrontFile(file);
    setFrontPreview(URL.createObjectURL(file));
    setErrorMsg(null);
  };

  const handleSelectBack = (file: File) => {
    setBackFile(file);
    setBackPreview(URL.createObjectURL(file));
    setErrorMsg(null);
  };

  const handleLoadDemoImages = async () => {
    const preset =
      DEMO_AMULETS.find((a) => a.id === selectedPresetId) || DEMO_AMULETS[0];
    const [f, b] = await Promise.all([
      createSampleAmuletFile("front", preset.data.amulet_info.name),
      createSampleAmuletFile("back", preset.data.amulet_info.name),
    ]);
    handleSelectFront(f);
    handleSelectBack(b);
  };

  const handleQuickInspectDemo = async () => {
    const preset =
      DEMO_AMULETS.find((a) => a.id === selectedPresetId) || DEMO_AMULETS[0];
    const [f, b] = await Promise.all([
      createSampleAmuletFile("front", preset.data.amulet_info.name),
      createSampleAmuletFile("back", preset.data.amulet_info.name),
    ]);
    setFrontFile(f);
    setBackFile(b);
    setFrontPreview(URL.createObjectURL(f));
    setBackPreview(URL.createObjectURL(b));
    setStep("processing");

    try {
      const data = await analyzeAmulet({
        apiBase,
        useMock,
        frontFile: f,
        backFile: b,
        userMode,
        mockPresetId: selectedPresetId,
      });
      setResult(data);
      setStep("result");
    } catch {
      const data = await analyzeAmulet({
        apiBase,
        useMock: true,
        frontFile: f,
        backFile: b,
        userMode,
        mockPresetId: selectedPresetId,
      });
      setResult(data);
      setStep("result");
    }
  };

  const handleAnalyze = async () => {
    if (!frontFile || !backFile) return;
    setErrorMsg(null);
    setStep("processing");

    try {
      const data = await analyzeAmulet({
        apiBase,
        useMock,
        frontFile,
        backFile,
        userMode,
        mockPresetId: selectedPresetId,
      });
      setResult(data);
      setStep("result");
    } catch (err) {
      setErrorMsg(
        err instanceof Error
          ? err.message
          : "เกิดข้อผิดพลาดในการเชื่อมต่อ Backend"
      );
      setStep("capture");
    }
  };

  const handleGoHome = () => {
    setErrorMsg(null);
    setStep("home");
  };

  const handleScanAgain = () => {
    setFrontFile(null);
    setBackFile(null);
    setFrontPreview(null);
    setBackPreview(null);
    setResult(null);
    setErrorMsg(null);
    setStep("capture");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#12100E] text-[#F5EFE6]">
      <HeaderBar
        step={step}
        userMode={userMode}
        setUserMode={setUserMode}
        apiBase={apiBase}
        setApiBase={setApiBase}
        useMock={useMock}
        setUseMock={setUseMock}
        health={health}
        onGoHome={handleGoHome}
      />

      <main className="flex-1 w-full px-4 sm:px-6 py-6 sm:py-8">
        {errorMsg && (
          <div className="max-w-4xl mx-auto mb-6 rounded-2xl bg-rose-950/50 border border-rose-500/40 text-rose-200 px-5 py-3.5 text-xs sm:text-sm">
            <strong>เชื่อมต่อ Backend ไม่สำเร็จ:</strong> {errorMsg}
          </div>
        )}

        {step === "home" && (
          <HomeChoices
            onChooseIntent={handleChooseIntent}
            onQuickInspectDemo={handleQuickInspectDemo}
          />
        )}

        {step === "capture" && (
          <DualCapture
            intent={intent}
            useMock={useMock}
            selectedPresetId={selectedPresetId}
            onSelectPresetId={setSelectedPresetId}
            frontFile={frontFile}
            backFile={backFile}
            frontPreview={frontPreview}
            backPreview={backPreview}
            onSelectFront={handleSelectFront}
            onSelectBack={handleSelectBack}
            onLoadDemoImages={handleLoadDemoImages}
            onAnalyze={handleAnalyze}
          />
        )}

        {step === "processing" && <ProcessingScreen />}

        {step === "result" && result && (
          <ResultDashboard
            result={result}
            userMode={userMode}
            frontPreview={frontPreview}
            backPreview={backPreview}
            apiBase={apiBase}
            useMock={useMock}
            onScanAgain={handleScanAgain}
            onOpenCertModal={() => {
              setCertSubmitted(false);
              setShowCertModal(true);
            }}
          />
        )}
      </main>

      {/* Partner Check Cer Modal */}
      {showCertModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#1C1814] rounded-3xl border border-[#E6B85C]/40 max-w-md w-full p-6 space-y-4 shadow-2xl text-[#F5EFE6]">
            <div className="flex items-center gap-2.5 text-[#E6B85C]">
              <ShieldCheck className="w-6 h-6" />
              <h4 className="font-signature text-xl font-bold">
                ส่งต่อออกบัตรรับรอง (Check Cer)
              </h4>
            </div>

            {certSubmitted ? (
              <div className="space-y-3 text-sm">
                <div className="p-3.5 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-semibold">
                  บันทึกคำขอส่งตรวจเรียบร้อย! รหัสอ้างอิง: #CER-2569-089
                </div>
                <p className="text-xs text-[#B8AD9E] leading-relaxed">
                  สถาบันพันธมิตรได้รับภาพและผลตรวจเบื้องต้นแล้ว
                  สามารถนัดตรวจองค์จริงเพื่อออกบัตรรับรองได้ทันที
                </p>
              </div>
            ) : (
              <p className="text-xs sm:text-sm text-[#C7BCAE] leading-relaxed">
                ส่งข้อมูลผลสแกน{" "}
                {result
                  ? `(${result.amulet_info.name} • สภาพ ${result.condition.condition_pct}%)`
                  : ""}{" "}
                ไปยังสถาบันพันธมิตรเพื่อออกบัตรรับรองพระแท้มาตรฐาน
              </p>
            )}

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowCertModal(false)}
                className="px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-xs font-semibold text-[#C7BCAE] cursor-pointer"
              >
                ปิดหน้าต่าง
              </button>
              {!certSubmitted && (
                <button
                  type="button"
                  onClick={() => setCertSubmitted(true)}
                  className="px-5 py-2 rounded-full bg-[#E6B85C] text-[#18130D] text-xs font-bold cursor-pointer"
                >
                  ยืนยันส่งตรวจ Cer
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
