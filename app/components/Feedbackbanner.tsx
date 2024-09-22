import { LoaderCircle, LucideIcon, ThumbsUp, ThumbsDown } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

interface Props {
  status: "success" | "fail" | "loading";
  className?: string;
  title?: string;
  children?: React.ReactNode;
}

export const FeedbackBanner = ({
  status,
  title,
  className,
  children,
}: Props) => {
  const iconMapping: Record<Props["status"], ReturnType<LucideIcon>> = {
    success: <ThumbsUp className="size-4" />,
    fail: <ThumbsDown className="size-4" />,
    loading: <LoaderCircle className="size-4 animate-spin" />,
  };
  const iconMarkup = iconMapping[status];

  return (
    <Alert className={className}>
      {iconMarkup}
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{children}</AlertDescription>
    </Alert>
  );
};
