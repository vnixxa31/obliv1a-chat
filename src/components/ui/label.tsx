import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * A form label is chrome, so it takes the label voice: JetBrains Mono, uppercase,
 * +0.14em, in the ground's secondary ink (DESIGN.md §Typography). Mono is never
 * body copy pretending to be technical — it is labels, values and measurement.
 */
function Label({ className, ...props }: React.ComponentProps<"label">) {
  return (
    <label
      data-slot="label"
      className={cn(
        "flex items-center gap-2 font-mono text-[length:var(--t-label)] leading-[1.4] font-medium tracking-label text-(--g-fg-2) uppercase select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Label }
