import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex field-sizing-content min-h-16 w-full rounded-xl border border-white/12 bg-white/[0.03] px-4 py-3 text-base text-foreground placeholder:text-muted-foreground/60 transition-[color,box-shadow,border-color] outline-none hover:border-white/20 focus-visible:border-brand-violet focus-visible:ring-[3px] focus-visible:ring-brand-violet/30 aria-invalid:border-destructive aria-invalid:ring-destructive/30 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
