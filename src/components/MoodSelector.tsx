"use client";

import { useState, useEffect } from "react";
import { useIsMounted } from "@/hooks/useIsMounted";
import { useAccount, useConnect, useWriteContract, useWaitForTransactionReceipt, useSwitchChain } from "wagmi";
import {
  botchainTestnet,
  CONTRACT_ADDRESS,
  IS_CONTRACT_CONFIGURED,
  MOODMARK_ABI,
  MoodEnum,
  MOODS,
} from "@/config/contract";
import { CheckCircle2, AlertCircle, Loader2, ExternalLink, Sparkles, Wallet } from "lucide-react";

interface MoodSelectorProps {
  onMoodSaved: () => void;
}

export function MoodSelector({ onMoodSaved }: MoodSelectorProps) {
  const mounted = useIsMounted();
  const { isConnected, chainId } = useAccount();
  const { connectors, connect } = useConnect();
  const { switchChain } = useSwitchChain();
  const [selectedMood, setSelectedMood] = useState<MoodEnum>(MoodEnum.Happy);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const isWrongNetwork = mounted && isConnected && chainId !== botchainTestnet.id;

  const {
    data: hash,
    writeContractAsync,
    isPending: isWriting,
    error: writeError,
    reset: resetWrite,
  } = useWriteContract();

  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed,
    error: confirmError,
  } = useWaitForTransactionReceipt({
    hash,
  });

  const isProcessing = isWriting || isConfirming;

  // Whenever confirmation succeeds, trigger refresh of saved mood
  useEffect(() => {
    if (isConfirmed) {
      onMoodSaved();
    }
  }, [isConfirmed, onMoodSaved]);

  const handleSaveMood = async () => {
    setErrorMessage(null);

    if (!isConnected) {
      const injectedConnector = connectors.find((c) => c.id === "injected") || connectors[0];
      if (injectedConnector) {
        connect({ connector: injectedConnector });
      }
      return;
    }

    if (isWrongNetwork) {
      switchChain({ chainId: botchainTestnet.id });
      return;
    }

    if (!IS_CONTRACT_CONFIGURED) {
      setErrorMessage("MoodMark contract address is not configured yet. Please configure NEXT_PUBLIC_CONTRACT_ADDRESS in .env.local.");
      return;
    }

    try {
      resetWrite();
      await writeContractAsync({
        address: CONTRACT_ADDRESS,
        abi: MOODMARK_ABI,
        functionName: "setMood",
        args: [selectedMood],
      });
    } catch (err: unknown) {
      const errObj = err as { shortMessage?: string; message?: string };
      setErrorMessage(errObj?.shortMessage || errObj?.message || "Transaction was rejected or failed.");
    }
  };

  return (
    <section className="w-full">
      {/* Hero Header */}
      <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-medium mb-1">
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          <span>Immutable Daily Mood Journal</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight bg-gradient-to-b from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
          How Are You Feeling Today?
        </h1>
        <p className="text-slate-400 text-base sm:text-lg">
          Choose your mood and leave your mark on the blockchain.
        </p>
      </div>

      {/* Main Selection Box */}
      <div className="max-w-2xl mx-auto rounded-3xl bg-slate-900/60 border border-slate-800/80 p-6 sm:p-8 backdrop-blur-xl shadow-2xl shadow-purple-950/20 relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
              Select Your Mood
            </h2>
            <span className="text-xs text-slate-500">
              Only 1 transaction needed
            </span>
          </div>

          {/* 9 Selectable Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {(Object.values(MOODS) as (typeof MOODS)[MoodEnum][]).map((m) => {
              const isSelected = selectedMood === m.id;
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => !isProcessing && setSelectedMood(m.id)}
                  disabled={isProcessing}
                  className={`relative flex flex-col items-center justify-center p-4 sm:p-5 rounded-2xl border transition-all duration-200 text-center cursor-pointer ${
                    isSelected
                      ? `border-purple-500/80 bg-purple-500/15 shadow-lg shadow-purple-500/20 ring-2 ring-purple-500/40 scale-[1.02]`
                      : "border-slate-800 bg-slate-900/50 hover:border-slate-700 hover:bg-slate-850 hover:scale-[1.01]"
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {/* Selected check badge */}
                  {isSelected && (
                    <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-purple-500 text-white flex items-center justify-center shadow">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                  )}

                  <span className="text-4xl sm:text-5xl mb-2 select-none transform transition-transform group-hover:scale-110">
                    {m.emoji}
                  </span>
                  <span className="font-bold text-base sm:text-lg text-slate-100 tracking-wide">
                    {m.label}
                  </span>
                  <span className="text-xs text-slate-400 mt-1 line-clamp-1">
                    {m.description}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Action Button */}
          <div className="pt-2">
            {!mounted || !isConnected ? (
              <button
                type="button"
                onClick={handleSaveMood}
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold text-base shadow-xl shadow-purple-600/25 transition-all hover:shadow-purple-600/40 active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
              >
                <Wallet className="w-5 h-5" />
                <span>Connect Wallet to Save Mood</span>
              </button>
            ) : isWrongNetwork ? (
              <button
                type="button"
                onClick={() => switchChain({ chainId: botchainTestnet.id })}
                className="w-full py-4 px-6 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-base shadow-xl shadow-amber-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <AlertCircle className="w-5 h-5" />
                <span>Switch to Botchain Testnet (Chain ID 968)</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSaveMood}
                disabled={isProcessing}
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 disabled:from-slate-800 disabled:to-slate-800 disabled:text-slate-500 text-white font-semibold text-base shadow-xl shadow-purple-600/25 transition-all hover:shadow-purple-600/40 active:scale-[0.99] flex items-center justify-center gap-2.5 cursor-pointer disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin text-purple-300" />
                    <span>
                      {isWriting ? "Confirm in Wallet..." : "Recording on Botchain..."}
                    </span>
                  </>
                ) : (
                  <>
                    <span>Save My Mood ({MOODS[selectedMood].label} {MOODS[selectedMood].emoji})</span>
                  </>
                )}
              </button>
            )}
          </div>

          {/* Feedback Status: Pending */}
          {isProcessing && (
            <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-200 text-xs sm:text-sm flex items-center gap-3">
              <Loader2 className="w-4 h-4 animate-spin text-purple-400 shrink-0" />
              <div>
                <p className="font-medium text-purple-200">
                  {isWriting
                    ? "Waiting for wallet confirmation..."
                    : "Transaction submitted! Waiting for block confirmation on Botchain..."}
                </p>
                {hash && (
                  <a
                    href={`https://scan.bohr.life/tx/${hash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-purple-400 hover:underline mt-1"
                  >
                    <span>View transaction {hash.slice(0, 10)}...{hash.slice(-8)}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Feedback Status: Success */}
          {isConfirmed && hash && (
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-200 text-xs sm:text-sm flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="font-semibold text-emerald-300">
                  Mood successfully recorded on the blockchain! 🎉
                </p>
                <p className="text-emerald-200/80">
                  Your mood has been immutably updated on Botchain Testnet.
                </p>
                <div className="pt-1">
                  <a
                    href={`https://scan.bohr.life/tx/${hash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-mono text-emerald-400 hover:text-emerald-300 underline font-medium"
                  >
                    <span>Tx Hash: {hash.slice(0, 12)}...{hash.slice(-8)}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* Feedback Status: Error */}
          {(errorMessage || writeError || confirmError) && (
            <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-200 text-xs sm:text-sm flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="font-semibold text-rose-300">Transaction Failed</p>
                <p className="text-rose-200/80 break-words">
                  {errorMessage ||
                    (writeError as { shortMessage?: string })?.shortMessage ||
                    writeError?.message ||
                    confirmError?.message ||
                    "An unexpected error occurred."}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
