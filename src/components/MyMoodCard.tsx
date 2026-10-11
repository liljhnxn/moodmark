"use client";

import { useEffect } from "react";
import { useIsMounted } from "@/hooks/useIsMounted";
import { useAccount, useReadContract } from "wagmi";
import {
  CONTRACT_ADDRESS,
  IS_CONTRACT_CONFIGURED,
  MOODMARK_ABI,
  MoodEnum,
  MOODS,
} from "@/config/contract";
import { RefreshCw, UserCheck, HeartHandshake, AlertCircle } from "lucide-react";

interface MyMoodCardProps {
  refetchTrigger?: number;
}

export function MyMoodCard({ refetchTrigger }: MyMoodCardProps) {
  const mounted = useIsMounted();
  const { address, isConnected } = useAccount();

  const {
    data,
    isLoading,
    isRefetching,
    refetch,
    isError,
  } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: MOODMARK_ABI,
    functionName: "getMood",
    args: address ? [address] : undefined,
    query: {
      enabled: mounted && isConnected && IS_CONTRACT_CONFIGURED && Boolean(address),
    },
  });

  useEffect(() => {
    if (refetchTrigger && refetchTrigger > 0) {
      refetch();
    }
  }, [refetchTrigger, refetch]);

  const moodValue = data ? Number(data[0]) : null;
  const hasMood = data ? Boolean(data[1]) : false;
  const moodMeta = moodValue !== null && moodValue in MOODS ? MOODS[moodValue as MoodEnum] : null;

  return (
    <div className="rounded-3xl bg-slate-900/60 border border-slate-800/80 p-6 sm:p-7 backdrop-blur-xl shadow-xl shadow-purple-950/10 flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <UserCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-100 text-base">My Mood</h3>
              <p className="text-xs text-slate-400">Your current status on Botchain</p>
            </div>
          </div>

          {mounted && isConnected && IS_CONTRACT_CONFIGURED && (
            <button
              onClick={() => refetch()}
              disabled={isLoading || isRefetching}
              title="Refresh mood from blockchain"
              className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-750 text-slate-400 hover:text-slate-200 border border-slate-700/50 transition cursor-pointer disabled:opacity-50"
            >
              <RefreshCw
                className={`w-3.5 h-3.5 ${isLoading || isRefetching ? "animate-spin text-purple-400" : ""}`}
              />
            </button>
          )}
        </div>

        {/* Content States */}
        {!mounted || !isConnected ? (
          <div className="py-8 text-center space-y-2">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-slate-800/60 border border-slate-700/50 flex items-center justify-center text-slate-400">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <p className="text-sm font-medium text-slate-300">Wallet Not Connected</p>
            <p className="text-xs text-slate-400 max-w-xs mx-auto">
              Connect your wallet in the header to view your on-chain mood record.
            </p>
          </div>
        ) : !IS_CONTRACT_CONFIGURED ? (
          <div className="py-8 text-center space-y-2 text-slate-400 text-xs">
            <p className="text-amber-400 font-medium">Contract Not Configured</p>
            <p>Deploy the contract and set NEXT_PUBLIC_CONTRACT_ADDRESS to view recorded moods.</p>
          </div>
        ) : isLoading ? (
          <div className="py-10 text-center space-y-3">
            <div className="w-8 h-8 mx-auto border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-xs text-slate-400">Reading status from Botchain...</p>
          </div>
        ) : isError ? (
          <div className="py-8 text-center space-y-2">
            <AlertCircle className="w-8 h-8 mx-auto text-rose-400" />
            <p className="text-xs text-rose-300">Failed to fetch mood from contract.</p>
          </div>
        ) : !hasMood ? (
          <div className="py-8 text-center space-y-3">
            <div className="text-4xl select-none">💭</div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-slate-200">
                You haven&apos;t recorded your mood yet.
              </p>
              <p className="text-xs text-slate-400">
                Pick a mood above and tap &ldquo;Save My Mood&rdquo; to leave your mark!
              </p>
            </div>
          </div>
        ) : (
          <div className="py-4 text-center space-y-4">
            <div className="relative inline-block">
              <span className="text-6xl sm:text-7xl block transform hover:scale-110 transition select-none">
                {moodMeta?.emoji}
              </span>
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-center gap-2">
                <span className="text-2xl font-bold text-white tracking-wide">
                  {moodMeta?.label}
                </span>
                <span
                  className={`text-xs px-2.5 py-0.5 rounded-full border font-medium ${moodMeta?.badgeColor}`}
                >
                  On-chain
                </span>
              </div>
              <p className="text-xs text-slate-400 max-w-xs mx-auto">
                {moodMeta?.description}
              </p>
            </div>
          </div>
        )}
      </div>

      {isConnected && address && (
        <div className="pt-4 border-t border-slate-800/60 mt-4 flex items-center justify-between text-[11px] text-slate-400 font-mono">
          <span>Connected:</span>
          <span className="text-slate-300">{`${address.slice(0, 6)}...${address.slice(-4)}`}</span>
        </div>
      )}
    </div>
  );
}
