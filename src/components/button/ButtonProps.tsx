
export interface ButtonProps {
  type?: "submit" | "reset" | "button" | undefined;
  className?: string;
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  direction?: "next" | "previous";
  leadingIcon?: React.ReactNode;
  loading?: boolean;
  loadingText?: string;
  label?: string;
  tooltip?: string;
  disabled?:boolean;
  onVideo?:boolean;
  href:string;
  target?:string;
  buttonText?: string;
}