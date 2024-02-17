import { HTMLAttributes } from "preact/compat";

const Button = ({ children, ...props }: HTMLAttributes<HTMLButtonElement>) => (
  <button class="w-full" {...props}>
    {children}
  </button>
);

export default Button;
