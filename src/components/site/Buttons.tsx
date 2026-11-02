import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const cta = cva(
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-60",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground shadow-soft hover:bg-primary-deep hover:shadow-lift",
        red: "bg-brand-red text-brand-red-foreground shadow-soft hover:brightness-95 hover:shadow-lift",
        outline: "border border-primary/25 bg-background text-primary hover:border-primary hover:bg-secondary",
        light: "bg-primary-foreground text-primary-deep hover:bg-secondary",
        ghostLight: "border border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10",
        whatsapp: "bg-whatsapp text-primary-foreground hover:brightness-95",
      },
      size: { sm: "h-10 px-5 text-sm", md: "h-12 px-6 text-sm", lg: "h-14 px-8 text-base" },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export type CtaProps = VariantProps<typeof cta>;
export const ctaClass = (p: CtaProps & { className?: string }) => cn(cta(p), p.className);
