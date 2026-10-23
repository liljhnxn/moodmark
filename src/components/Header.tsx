"use client";

import Image from "next/image";
import { useAccount, useConnect, useDisconnect, useSwitchChain } from "wagmi";
import { botchainMainnet } from "@/config/contract";
import { Wallet, LogOut, AlertTriangle, ExternalLink } from "lucide-react";

import { useIsMounted } from "@/hooks/useIsMounted";

function shortenAddress(addr: string) {
  if (!addr) return "";
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
}

export function Header() {
  const mounted = useIsMounted();
  const { address, isConnected, chainId } = useAccount();
  const { connectors, connect, isPending: isConnecting } = useConnect();
  const { disconnect } = useDisconnect();
  const { switchChain, isPending: isSwitching } = useSwitchChain();

  const isWrongNetwork = mounted && isConnected && chainId !== botchainMainnet.id;

  const handleConnect = () => {
    // If only one connector or injected is available, connect directly
    const injectedConnector = connectors.find((c) => c.id === "injected") || connectors[0];
    if (injectedConnector) {
      connect({ connector: injectedConnector });
    }
  };

  return (
    <header className="w-full border-b border-slate-800/80 bg-[#090b14]/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between">
        {/* Logo & Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-blue-500 flex items-center justify-center shadow-lg shadow-purple-500/20 ring-1 ring-purple-400/30">
            <span className="text-xl" role="img" aria-label="MoodMark Logo">
              ✨
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-purple-100 to-purple-400 bg-clip-text text-transparent">
                MoodMark
              </span>
              <span className="text-[10px] font-medium tracking-wide uppercase px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Mainnet
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              On-chain mood ledger on BOT Chain
            </p>
          </div>
        </div>

        {/* Actions / Wallet Status */}
        <div className="flex items-center gap-3">
          {/* Mainnet Explorer Link with BOT Chain Logo at front */}
          <a
            href="https://scan.botchain.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-850 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-750 text-xs font-medium transition cursor-pointer"
            title="Open BOT Chain Explorer"
          >
            <Image
              src="/botchain-logo.png"
              alt="BOT Chain Logo"
              width={16}
              height={16}
              className="w-4 h-4 object-contain rounded"
            />
            <span>Explorer</span>
            <ExternalLink className="w-3 h-3 text-purple-400" />
          </a>

          {/* Wrong Network Warning */}
          {isWrongNetwork && (
            <button
              onClick={() => switchChain({ chainId: botchainMainnet.id })}
              disabled={isSwitching}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-medium transition cursor-pointer"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
              <span>{isSwitching ? "Switching..." : "Switch to BOT Chain (677)"}</span>
            </button>
          )}

          {/* Network Pill when connected correctly with BOT Chain Logo */}
          {mounted && isConnected && !isWrongNetwork && (
            <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800/80 border border-slate-700/60 text-xs text-slate-300">
              <Image
                src="/botchain-logo.png"
                alt="BOT Chain Logo"
                width={14}
                height={14}
                className="w-3.5 h-3.5 object-contain rounded"
              />
              <span>BOT Chain Mainnet</span>
            </div>
          )}

          {/* Wallet Button */}
          {!mounted || !isConnected ? (
            <button
              onClick={handleConnect}
              disabled={isConnecting}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-medium text-sm shadow-md shadow-purple-500/20 transition-all hover:shadow-purple-500/40 active:scale-95 disabled:opacity-60 cursor-pointer"
            >
              <Wallet className="w-4 h-4" />
              <span>{isConnecting ? "Connecting..." : "Connect Wallet"}</span>
            </button>
          ) : (
            <div className="flex items-center gap-2 bg-slate-900/90 border border-slate-800 rounded-xl p-1 pl-3 shadow-inner">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-400"></span>
                <span className="text-xs font-mono font-medium text-slate-200">
                  {shortenAddress(address || "")}
                </span>
              </div>
              <button
                onClick={() => disconnect()}
                title="Disconnect Wallet"
                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
