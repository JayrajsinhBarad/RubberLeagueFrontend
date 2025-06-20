import { ButtonHTMLAttributes } from "react";

export function Button({ className = "", ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={` text-white px-4 py-2 rounded ${className}`} {...props} />
  );
}
