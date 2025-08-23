import type { SVGProps } from "react";

export function FrezeerLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 2v20" />
      <path d="M12 12l8.66-5" />
      <path d="M12 12l-8.66-5" />
      <path d="M12 12l8.66 5" />
      <path d="M12 12l-8.66 5" />
      <path d="m4 4 1.9 1.9" />
      <path d="M18.1 18.1 20 20" />
      <path d="m4 20 1.9-1.9" />
      <path d="M18.1 5.9 20 4" />
    </svg>
  );
}
