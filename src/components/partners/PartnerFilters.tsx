import type { CategoryFilter } from "@/types/partner";
import { categories } from "./categories";

export function PartnerFilters({ value, onChange }: { value: CategoryFilter; onChange: (value: CategoryFilter) => void }) {
  return <div className="category-filters" role="group" aria-label="Filter by category">
    {categories.map(({ id, label, icon: Icon }) => <button key={id} className={`filter-chip ${value === id ? "selected" : ""}`} aria-pressed={value === id} onClick={() => onChange(id)}>
      <Icon size={14} strokeWidth={1.7} />{label}
    </button>)}
  </div>;
}
