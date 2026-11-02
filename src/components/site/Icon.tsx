import {
  Eye, ScanEye, UserRound, Wallet, HeartHandshake, Sofa, Glasses, Droplet, Activity,
  Baby, Sun, Stethoscope, Smile, Sparkles, ShieldCheck, type LucideProps,
} from "lucide-react";
import type { IconName } from "@/data/site";

const map = {
  eye: Eye, scan: ScanEye, user: UserRound, wallet: Wallet, heart: HeartHandshake, sofa: Sofa,
  glasses: Glasses, droplet: Droplet, activity: Activity, baby: Baby, sun: Sun,
  stethoscope: Stethoscope, smile: Smile, sparkles: Sparkles, shield: ShieldCheck,
};

export function Icon({ name, ...props }: { name: IconName } & LucideProps) {
  const C = map[name];
  return <C strokeWidth={1.6} {...props} />;
}
