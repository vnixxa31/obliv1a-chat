import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"

import { cn } from "@/lib/utils"

/**
 * Square, a 1px rule, and transparent on coloured grounds — the border and the
 * placeholder both come from the ground contract, so the field reads correctly
 * on PAPER, FIELD and VOID without a variant. Focus is a 3px offset outline in
 * the ground's signal colour, never a glow, and an invalid field thickens its
 * rule to 2px in `danger` (DESIGN.md §Components).
 */
function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "block w-full min-w-0 border border-(--inp-bd) bg-(--inp-bg) px-4 py-3 text-[length:var(--t-body)] text-(--g-fg) transition-[background-color,border-color] duration-180 ease-obliv1a placeholder:text-(--inp-ph) placeholder:opacity-100 hover:bg-(--g-recess) focus:border-(--g-fg) focus:outline-3 focus:outline-offset-2 focus:outline-(--focus) disabled:cursor-not-allowed disabled:border-paper-3 disabled:bg-paper-3 disabled:text-ink-mute aria-invalid:border-2 aria-invalid:border-danger",
        className
      )}
      {...props}
    />
  )
}

export { Input }
