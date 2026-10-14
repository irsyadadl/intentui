import { motion, useReducedMotion } from "motion/react"

export function RotatingGradientBorder() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute -inset-px overflow-hidden rounded-[inherit] p-px"
      style={{
        mask: "linear-gradient(var(--color-foreground) 0 0) content-box, linear-gradient(var(--color-foreground) 0 0)",
        maskComposite: "exclude",
      }}
    >
      <motion.span
        className="absolute top-1/2 left-1/2 aspect-square w-[200%]"
        style={{
          x: "-50%",
          y: "-50%",
          background:
            "conic-gradient(var(--color-border) 0deg, var(--color-foreground) 90deg, var(--color-border) 150deg, var(--color-border) 180deg, var(--color-foreground) 270deg, var(--color-border) 330deg)",
        }}
        initial={{ rotate: 0 }}
        animate={{ rotate: shouldReduceMotion ? 0 : 360 }}
        transition={{
          duration: shouldReduceMotion ? 0 : 6,
          ease: "linear",
          repeat: shouldReduceMotion ? 0 : Infinity,
        }}
      />
    </span>
  )
}
