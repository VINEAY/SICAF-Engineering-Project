import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { motion, useAnimation } from "framer-motion"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 relative overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : motion.button;
    const controls = useAnimation();
    // For ripple effect
    const [ripple, setRipple] = React.useState<{x:number, y:number} | null>(null);
    const btnRef = React.useRef<HTMLButtonElement>(null);

    // Animate scale on hover/press
    const scaleProps = {
      whileHover: { scale: 1.06, boxShadow: variant === 'default' ? "0 3px 17px -2px #00C6D880" : undefined },
      whileTap: { scale: 0.97 },
      transition: { type: "spring", stiffness: 280, damping: 17 },
    };

    // Ripple logic (only for default/CTA)
    const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      if (variant === "default" && btnRef.current) {
        const rect = btnRef.current.getBoundingClientRect();
        setRipple({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
        setTimeout(() => setRipple(null), 450);
      }
      if (props.onClick) props.onClick(e);
    };

    // Only allow safe button props
    const {
      children, onAnimationStart, onDragStart, onDragEnd, onDrag, ...safeProps
    } = props;

    return (
      <Comp
        {...scaleProps}
        {...safeProps}
        ref={ref || btnRef}
        className={cn(
          buttonVariants({ variant, size, className })
        )}
        onClick={handleClick}
      >
        {/* Ripple effect for primary */}
        {variant === "default" && ripple && (
          <motion.span
            initial={{ scale: 0, opacity: 0.44 }}
            animate={{ scale: 4, opacity: 0 }}
            transition={{ duration: 0.45, ease: "circOut" }}
            style={{
              position: "absolute",
              left: ripple.x - 10,
              top: ripple.y - 10,
              width: 20,
              height: 20,
              borderRadius: "50%",
              background: "radial-gradient(circle, #EFFEFE 60%, #00D4FC22 100%)",
              pointerEvents: "none"
            }}
            aria-hidden
          />
        )}
        {children}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
