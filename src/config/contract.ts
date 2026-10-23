import { defineChain } from "viem";

export const botchainMainnet = defineChain({
  id: 677,
  name: "Botchain Mainnet",
  nativeCurrency: {
    decimals: 18,
    name: "Botchain",
    symbol: "BOT",
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.botchain.ai"],
    },
    public: {
      http: ["https://rpc.botchain.ai"],
    },
  },
  blockExplorers: {
    default: {
      name: "BotScan",
      url: "https://scan.botchain.ai",
    },
  },
  testnet: false,
});

// Primary Botchain Mainnet
export const botchain = botchainMainnet;

export const MOODMARK_ABI = [
  {
    inputs: [],
    name: "InvalidMood",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "enum MoodMark.Mood",
        name: "mood",
        type: "uint8",
      },
    ],
    name: "MoodUpdated",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "getMood",
    outputs: [
      {
        internalType: "enum MoodMark.Mood",
        name: "mood",
        type: "uint8",
      },
      {
        internalType: "bool",
        name: "hasMood",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint8",
        name: "mood",
        type: "uint8",
      },
    ],
    name: "setMood",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export enum MoodEnum {
  Happy = 0,
  Okay = 1,
  Sad = 2,
  Excited = 3,
  Tired = 4,
  Cool = 5,
  Angry = 6,
  Loved = 7,
  Anxious = 8,
}

export interface MoodMeta {
  id: MoodEnum;
  label: string;
  emoji: string;
  description: string;
  badgeColor: string;
  borderActive: string;
  bgActive: string;
  textColor: string;
}

export const MOODS: Record<MoodEnum, MoodMeta> = {
  [MoodEnum.Happy]: {
    id: MoodEnum.Happy,
    label: "Happy",
    emoji: "😊",
    description: "Joyful, energized, or optimistic",
    badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    borderActive: "border-emerald-500 shadow-emerald-500/20",
    bgActive: "bg-emerald-500/10",
    textColor: "text-emerald-400",
  },
  [MoodEnum.Okay]: {
    id: MoodEnum.Okay,
    label: "Okay",
    emoji: "😐",
    description: "Neutral, calm, or balanced",
    badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    borderActive: "border-amber-500 shadow-amber-500/20",
    bgActive: "bg-amber-500/10",
    textColor: "text-amber-400",
  },
  [MoodEnum.Sad]: {
    id: MoodEnum.Sad,
    label: "Sad",
    emoji: "😔",
    description: "Low, contemplative, or down",
    badgeColor: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
    borderActive: "border-indigo-500 shadow-indigo-500/20",
    bgActive: "bg-indigo-500/10",
    textColor: "text-indigo-400",
  },
  [MoodEnum.Excited]: {
    id: MoodEnum.Excited,
    label: "Excited",
    emoji: "🤩",
    description: "Thrilled, pumped, or ecstatic",
    badgeColor: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
    borderActive: "border-yellow-500 shadow-yellow-500/20",
    bgActive: "bg-yellow-500/10",
    textColor: "text-yellow-400",
  },
  [MoodEnum.Tired]: {
    id: MoodEnum.Tired,
    label: "Tired",
    emoji: "😴",
    description: "Exhausted, sleepy, or drained",
    badgeColor: "bg-slate-500/20 text-slate-300 border-slate-500/30",
    borderActive: "border-slate-500 shadow-slate-500/20",
    bgActive: "bg-slate-500/10",
    textColor: "text-slate-400",
  },
  [MoodEnum.Cool]: {
    id: MoodEnum.Cool,
    label: "Cool",
    emoji: "😎",
    description: "Confident, chill, or relaxed",
    badgeColor: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
    borderActive: "border-cyan-500 shadow-cyan-500/20",
    bgActive: "bg-cyan-500/10",
    textColor: "text-cyan-400",
  },
  [MoodEnum.Angry]: {
    id: MoodEnum.Angry,
    label: "Angry",
    emoji: "😡",
    description: "Frustrated, upset, or fired up",
    badgeColor: "bg-rose-500/20 text-rose-300 border-rose-500/30",
    borderActive: "border-rose-500 shadow-rose-500/20",
    bgActive: "bg-rose-500/10",
    textColor: "text-rose-400",
  },
  [MoodEnum.Loved]: {
    id: MoodEnum.Loved,
    label: "Loved",
    emoji: "🥰",
    description: "Grateful, warm, or affectionate",
    badgeColor: "bg-pink-500/20 text-pink-300 border-pink-500/30",
    borderActive: "border-pink-500 shadow-pink-500/20",
    bgActive: "bg-pink-500/10",
    textColor: "text-pink-400",
  },
  [MoodEnum.Anxious]: {
    id: MoodEnum.Anxious,
    label: "Anxious",
    emoji: "😰",
    description: "Stressed, nervous, or uneasy",
    badgeColor: "bg-teal-500/20 text-teal-300 border-teal-500/30",
    borderActive: "border-teal-500 shadow-teal-500/20",
    bgActive: "bg-teal-500/10",
    textColor: "text-teal-400",
  },
};

export const CONTRACT_ADDRESS = (process.env.NEXT_PUBLIC_CONTRACT_ADDRESS ||
  "0xc7BffE6d09c808043F09AD12398528350B11539B") as `0x${string}`;

export const IS_CONTRACT_CONFIGURED =
  Boolean(CONTRACT_ADDRESS) &&
  CONTRACT_ADDRESS.startsWith("0x") &&
  CONTRACT_ADDRESS.length === 42 &&
  CONTRACT_ADDRESS !== "0x0000000000000000000000000000000000000000";
