import { cn } from "@/utils/helper";

function SVGIcon({ name, className, ...attr }) {
  return (
    <svg {...attr} className={cn("dark:fill-neutral-500", className)}>
      <use href={`#${name}`} />
    </svg>
  );
}

export default SVGIcon;
