"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { Header } from "@/components/Header";
import { ContractNotice } from "@/components/ContractNotice";
import { MoodSelector } from "@/components/MoodSelector";
import { MyMoodCard } from "@/components/MyMoodCard";
import { LookupWalletCard } from "@/components/LookupWalletCard";
import { botchainMainnet, CONTRACT_ADDRESS } from "@/config/contract";
import { ExternalLink, ShieldCheck } from "lucide-react";

export default function Home() {
  const [refetchCounter, setRefetchCounter] = useState(0);

  const handleMoodSaved = useCallback(() => {
    setRefetchCounter((prev) => prev + 1);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#090b14] text-slate-100 selection:bg-purple-500/30">
      {/* Top Navigation */}
      <Header />

      {/* Main Container */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12 flex flex-col gap-10">
        {/* Notice if contract address is not configured yet */}
        <ContractNotice />

        {/* Hero Section & Mood Selection */}
        <MoodSelector onMoodSaved={handleMoodSaved} />

        {/* Two-column section: My Mood + Lookup Another Wallet */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl mx-auto">
          <MyMoodCard refetchTrigger={refetchCounter} />
          <LookupWalletCard />
        </div>

        {/* BOT Chain Ecosystem Section */}
        <section className="w-full max-w-4xl mx-auto rounded-3xl bg-gradient-to-br from-slate-900/90 via-slate-900/60 to-purple-950/30 border border-slate-800/90 p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden shadow-2xl shadow-purple-950/20">
          {/* Subtle decorative glow */}
          <div className="absolute -top-16 -right-16 w-44 h-44 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-44 h-44 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
            {/* BOT Chain Logo & Details */}
            <div className="flex items-center gap-4 text-left">
              {/* BOT Chain Emblem Logo */}
              <div className="w-14 h-14 rounded-2xl bg-black border border-slate-800 p-1.5 shadow-lg shadow-emerald-500/10 shrink-0 flex items-center justify-center overflow-hidden">
                <Image
                  src="/botchain-logo.png"
                  alt="BOT Chain Logo"
                  width={48}
                  height={48}
                  className="w-full h-full object-contain rounded-xl"
                />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-white tracking-tight">
                    BOT Chain Ecosystem
                  </h3>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                    <ShieldCheck className="w-3 h-3 text-emerald-400" />
                    <span>Mainnet Verified</span>
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1 max-w-md leading-relaxed">
                  MoodMark is deployed natively on <strong>BOT Chain</strong> (Chain ID: {botchainMainnet.id}), utilizing sovereign on-chain storage with minimal gas fees and instant block finality.
                </p>
              </div>
            </div>

            {/* Ecosystem Action Buttons with BOT Chain Logo at front */}
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto shrink-0">
              <a
                href="https://botchain.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-4 py-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-750 text-slate-200 hover:text-white border border-slate-700/80 text-xs font-semibold transition shadow-sm hover:border-slate-600 cursor-pointer"
              >
                <Image
                  src="/botchain-logo.png"
                  alt="BOT Chain Logo"
                  width={18}
                  height={18}
                  className="w-4.5 h-4.5 object-contain rounded"
                />
                <span>BOT Chain Website</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>

              <a
                href="https://scan.botchain.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-semibold transition shadow-md shadow-purple-600/25 cursor-pointer"
              >
                <Image
                  src="/botchain-logo.png"
                  alt="BOT Chain Logo"
                  width={18}
                  height={18}
                  className="w-4.5 h-4.5 object-contain rounded"
                />
                <span>BOT Chain Explorer</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-slate-800/80 bg-[#07080f] py-8 px-4 text-xs text-slate-400">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand & BOT Chain info */}
          <div className="flex items-center gap-3">
            {/* BOT Chain Logo Badge */}
            <a
              href="https://botchain.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-slate-750 transition"
              title="Visit BOT Chain Website"
            >
              <Image
                src="/botchain-logo.png"
                alt="BOT Chain Logo"
                width={18}
                height={18}
                className="w-4.5 h-4.5 object-contain rounded"
              />
              <span className="font-bold text-slate-200 tracking-wide text-xs">BOT Chain</span>
              <span className="text-[10px] font-mono text-purple-400 px-1.5 py-0.2 rounded bg-purple-500/10 border border-purple-500/20">
                677
              </span>
            </a>

            <span className="text-slate-600">•</span>
            <span className="font-medium text-slate-300">MoodMark DApp</span>
          </div>

          {/* Official Ecosystem Links with BOT Chain Logo at front */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
            <a
              href="https://botchain.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-slate-300 hover:text-white transition font-medium"
            >
              <Image
                src="/botchain-logo.png"
                alt="BOT Chain Logo"
                width={16}
                height={16}
                className="w-4 h-4 object-contain rounded"
              />
              <span>BOT Chain Website</span>
              <ExternalLink className="w-3 h-3 text-cyan-400" />
            </a>

            <span className="text-slate-700">•</span>

            <a
              href="https://scan.botchain.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-slate-300 hover:text-white transition font-medium"
            >
              <Image
                src="/botchain-logo.png"
                alt="BOT Chain Logo"
                width={16}
                height={16}
                className="w-4 h-4 object-contain rounded"
              />
              <span>BOT Chain Explorer</span>
              <ExternalLink className="w-3 h-3 text-purple-400" />
            </a>

            <span className="text-slate-700">•</span>

            <a
              href={`https://scan.botchain.ai/address/${CONTRACT_ADDRESS}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-slate-400 hover:text-purple-300 transition font-mono text-[11px]"
            >
              <span>Contract</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
