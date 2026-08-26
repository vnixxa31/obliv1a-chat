import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * The tag: a 1px rule in the current role colour, in the label voice.
 *
 *   default — the rule follows the text colour, so a role colour set on the tag
 *             carries both at once.
 *   solid   — the inverted tag, for the single most important label on a surface.
 *   signal  — the ground's signal colour: fuchsia-600 on paper, fuchsia-400 on
 *             void. The contract picks; `signal` never sets type on FIELD.
 *
 * A state tag (danger, caution, live) pairs its colour with an icon and a word —
 * colour is never the only carrier of meaning (DESIGN.md §Do's and Don'ts).
 */
const badgeVariants = cva(
  "group/badge inline-flex w-fit shrink-0 items-center justify-center gap-1.5 border border-current px-[9px] py-[3px] font-mono text-[length:var(--t-label)] font-semibold tracking-[0.12em] whitespace-nowrap uppercase [&>svg]:pointer-events-none [&>svg]:size-3!",
  {
    variants: {
      variant: {
        default: "text-(--tag-fg)",
        solid:
          "border-(--tag-solid-bg) bg-(--tag-solid-bg) text-(--tag-solid-fg)",
        signal: "text-(--signal-here)",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  render,
  ...props
}: useRender.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: cn(badgeVariants({ variant }), className),
      },
      props
    ),
    render,
    state: {
      slot: "badge",
      variant,
    },
  })
}

export { Badge, badgeVariants }
