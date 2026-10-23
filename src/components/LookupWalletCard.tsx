"use client";

import { useState } from "react";
import Image from "next/image";
import { isAddress, createPublicClient, http } from "viem";
import {
  botchainMainnet,
  CONTRACT_ADDRESS,
  IS_CONTRACT_CONFIGURED,
  MOODMARK_ABI,
  MoodEnum,
  MOODS,
} from "@/config/contract";
import { Search, Loader2, AlertCircle, HelpCircle, ExternalLink } from "lucide-react";

interface LookupResult {
  address: string;
  hasMood: boolean;
  mood: MoodEnum | null;
}

export function LookupWalletCard() {
  const [inputAddress, setInputAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<LookupResult | null>(null);

  const handleLookup = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setError(null);
    setResult(null);

    const trimmed = inputAddress.trim();

    if (!trimmed) {
      setError("Please enter a wallet address.");
      return;
    }

    if (!isAddress(trimmed)) {
      setError("Invalid wallet address format. Must be a valid 42-character 0x address.");
      return;
    }

    if (!IS_CONTRACT_CONFIGURED) {
      setError("Contract address is not configured yet. Please configure NEXT_PUBLIC_CONTRACT_ADDRESS in .env.local.");
      return;
    }

    try {
      setIsLoading(true);

      const client = createPublicClient({
        chain: botchainMainnet,
        transport: http("https://rpc.botchain.ai"),
      });

      const [moodValue, hasMood] = await client.readContract({
        address: CONTRACT_ADDRESS,
        abi: MOODMARK_ABI,
        functionName: "getMood",
        args: [trimmed as `0x${string}`],
      });

      setResult({
        address: trimmed,
        hasMood: Boolean(hasMood),
        mood: Number(moodValue) in MOODS ? (Number(moodValue) as MoodEnum) : null,
      });
    } catch (err: unknown) {
      const errObj = err as { message?: string };
      setError(errObj?.message || "Failed to query the blockchain for this address.");
    } finally {
      setIsLoading(false);
    }
  };

  const moodMeta = result && result.mood !== null ? MOODS[result.mood] : null;

  return (
    <div className="rounded-3xl bg-slate-900/60 border border-slate-800/80 p-6 sm:p-7 backdrop-blur-xl shadow-xl shadow-purple-950/10 flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center gap-2 mb-5">
          <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
            <Search className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-100 text-base">Look Up Another Wallet</h3>
            <p className="text-xs text-slate-400">Inspect anyone&apos;s on-chain mood</p>
          </div>
        </div>

        {/* Input Form */}
        <form onSubmit={handleLookup} className="space-y-3">
          <div className="relative">
            <input
              type="text"
              value={inputAddress}
              onChange={(e) => {
                setInputAddress(e.target.value);
                if (error) setError(null);
              }}
              placeholder="0x..."
              spellCheck={false}
              className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-700/70 text-slate-100 placeholder-slate-500 font-mono text-xs sm:text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium text-sm transition shadow-md shadow-blue-600/20 active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Reading Botchain...</span>
              </>
            ) : (
              <>
                <Search className="w-4 h-4" />
                <span>Check Mood</span>
              </>
            )}
          </button>
        </form>

        {/* Error */}
        {error && (
          <div className="mt-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <p className="break-all">{error}</p>
          </div>
        )}

        {/* Result */}
        {result && (
          <div className="mt-5 p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-2">
              <span className="truncate">Wallet: <span className="text-slate-200">{result.address}</span></span>
              <a
                href={`https://scan.botchain.ai/address/${result.address}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-purple-400 hover:text-purple-300 transition text-[11px] ml-2 shrink-0"
              >
                <Image
                  src="/botchain-logo.png"
                  alt="BOT Chain"
                  width={14}
                  height={14}
                  className="w-3.5 h-3.5 object-contain rounded"
                />
                <span>Explorer</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {result.hasMood && moodMeta ? (
              <div className="flex items-center gap-4 pt-1">
                <span className="text-4xl select-none">{moodMeta.emoji}</span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-100 text-lg">
                      {moodMeta.label}
                    </span>
                    <span
                      className={`text-[11px] px-2 py-0.5 rounded-full border font-medium ${moodMeta.badgeColor}`}
                    >
                      Recorded
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">{moodMeta.description}</p>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3 py-2 text-slate-400 text-xs">
                <HelpCircle className="w-5 h-5 text-slate-500 shrink-0" />
                <p>No mood has been recorded for this wallet.</p>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="pt-4 border-t border-slate-800/60 mt-4 text-[11px] text-slate-500 text-center">
        Direct query via Botchain RPC • Read-only (free)
      </div>
    </div>
  );
}
