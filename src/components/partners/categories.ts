import { Coffee, Dumbbell, GraduationCap, Grid2X2, Popcorn, Utensils, WandSparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { CategoryFilter, PartnerCategory } from "@/types/partner";

export const categories: { id: CategoryFilter; label: string; icon: LucideIcon }[] = [
  { id: "all", label: "All", icon: Grid2X2 },
  { id: "food", label: "Food", icon: Utensils },
  { id: "coffee", label: "Coffee", icon: Coffee },
  { id: "sport", label: "Sport", icon: Dumbbell },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "entertainment", label: "Entertainment", icon: Popcorn },
  { id: "services", label: "Services", icon: WandSparkles },
];

export const categoryMeta: Record<PartnerCategory, { label: string; icon: LucideIcon; color: string }> = {
  food: { label: "Food", icon: Utensils, color: "#f0ac7e" },
  coffee: { label: "Coffee", icon: Coffee, color: "#d5b391" },
  sport: { label: "Sport", icon: Dumbbell, color: "#87c5a9" },
  education: { label: "Education", icon: GraduationCap, color: "#91adf1" },
  entertainment: { label: "Entertainment", icon: Popcorn, color: "#b5a0db" },
  services: { label: "Services", icon: WandSparkles, color: "#72c0ce" },
};
