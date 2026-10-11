"use client";

import { useState, useCallback } from "react";
import { Header } from "@/components/Header";
import { ContractNotice } from "@/components/ContractNotice";
import { MoodSelector } from "@/components/MoodSelector";
import { MyMoodCard } from "@/components/MyMoodCard";
import { LookupWalletCard } from "@/components/LookupWalletCard";
import { botchainTestnet } from "@/config/contract";
import { ExternalLink } from "lucide-react";

export default function Home() {
  const [refetchCounter, setRefetchCounter] = useState(0);

  const handleMoodSaved = useCallback(() => {
    setRefetchCounter((prev) => prev + 1);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#090b14] text-slate-100">
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
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-slate-900 bg-[#07080f] py-6 px-4 text-xs text-slate-500">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-400">MoodMark</span>
            <span>•</span>
            <span>Minimal Web3 Mood DApp</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span>Chain ID: {botchainTestnet.id}</span>
            </span>
            <a
              href="https://scan.bohr.life"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-purple-400 flex items-center gap-1 transition"
            >
              <span>BohrScan</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href="https://rpc.bohr.life"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-purple-400 flex items-center gap-1 transition"
            >
              <span>RPC</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
