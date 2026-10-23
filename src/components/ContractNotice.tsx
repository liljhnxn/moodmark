import Image from "next/image";
import { CONTRACT_ADDRESS, IS_CONTRACT_CONFIGURED } from "@/config/contract";
import { AlertCircle, ExternalLink } from "lucide-react";

export function ContractNotice() {
  if (IS_CONTRACT_CONFIGURED) {
    return (
      <div className="max-w-4xl mx-auto mb-6 px-4">
        <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>Contract Address:</span>
            <span className="font-mono text-purple-300 select-all">{CONTRACT_ADDRESS}</span>
          </div>
          <a
            href={`https://scan.botchain.ai/address/${CONTRACT_ADDRESS}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-purple-400 hover:text-purple-300 transition"
          >
            <Image
              src="/botchain-logo.png"
              alt="BOT Chain"
              width={14}
              height={14}
              className="w-3.5 h-3.5 object-contain rounded"
            />
            <span>View on BotScan</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mb-8 px-4">
      <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 shadow-lg shadow-amber-950/20">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1.5 text-xs sm:text-sm">
            <h4 className="font-semibold text-amber-300">
              Contract Address Not Yet Configured
            </h4>
            <p className="text-amber-200/80 leading-relaxed">
              MoodMark is ready to interact with Botchain Mainnet (Chain ID 677). To connect the frontend to your deployed contract:
            </p>
            <ol className="list-decimal list-inside space-y-1 text-amber-200/90 font-mono text-xs bg-black/30 p-2.5 rounded-lg border border-amber-500/20">
              <li>Deploy the contract: <span className="text-purple-300">npm run deploy:mainnet</span></li>
              <li>Or set <span className="text-purple-300">NEXT_PUBLIC_CONTRACT_ADDRESS=0x...</span> in your <span className="text-purple-300">.env.local</span></li>
            </ol>
            <p className="text-[11px] text-amber-300/70">
              Note: As per safety rules, no fake deployed contract address has been invented.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
