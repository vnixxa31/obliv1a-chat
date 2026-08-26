import * as React from "react"
import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * The system defines two buttons and this component has two variants, because
 * inventing a third is a brand change (DESIGN.md §Components):
 *
 *   default — fills with the ground's own contrast colour: FIELD on paper,
 *             PAPER on field, SIGNAL on void.
 *   ghost   — a 1px rule and no fill at rest; inverts on hover.
 *
 * No colour is named here. Every value is read from the ground contract, so the
 * button inverts by itself when it is placed on `.on-field` or `.on-void` and is
 * never restyled to suit its background. Focus is deliberately absent too:
 * obliv1a.css owns `:focus-visible` and draws the 3px offset outline in the
 * ground's signal colour. A ring utility here would replace it with a glow.
 */
const buttonVariants = cva(
  "group/button inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 border border-transparent font-mono text-[length:var(--t-label)] font-semibold tracking-label whitespace-nowrap uppercase no-underline transition-[background-color,color,border-color,transform] duration-180 ease-obliv1a select-none active:translate-y-px disabled:pointer-events-none disabled:border-paper-3 disabled:bg-paper-3 disabled:text-ink-mute aria-disabled:pointer-events-none aria-disabled:border-paper-3 aria-disabled:bg-paper-3 aria-disabled:text-ink-mute [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-(--btn-bg) text-(--btn-fg) hover:bg-(--btn-bg-hover) hover:text-(--btn-fg-hover)",
        ghost:
          "border-(--btn-gh-bd) bg-transparent text-(--btn-gh-fg) hover:border-(--btn-gh-bg-hover) hover:bg-(--btn-gh-bg-hover) hover:text-(--btn-gh-fg-hover)",
      },
      size: {
        default: "px-6 py-[13px]",
        sm: "px-4 py-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  href,
  ...props
}: ButtonPrimitive.Props &
  VariantProps<typeof buttonVariants> & { href?: string }) {
  const classes = cn(buttonVariants({ variant, size, className }))

  // A call to action that navigates is a link and stays one. Base UI's `render`
  // prop would keep the button semantics (type, keyboard handling) around an
  // anchor that does not want them — and an .astro template cannot pass it a JSX
  // element anyway. This is the shadcn `buttonVariants` escape hatch, wrapped.
  if (href) {
    return (
      <a
        data-slot="button"
        href={href}
        className={classes}
        {...(props as React.ComponentProps<"a">)}
      />
    )
  }

  return <ButtonPrimitive data-slot="button" className={classes} {...props} />
}

export { Button, buttonVariants }
