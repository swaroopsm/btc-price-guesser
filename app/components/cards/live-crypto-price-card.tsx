import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Money } from "~/types";
import { useCurrencyFormatter } from "~/hooks";
import { ArrowUp, ArrowDown } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "../ui/tooltip";
import { Prediction } from "@prisma/client";
import { useCallback } from "react";

interface Props {
  ticker: string;
  price: Money | null;
  loading?: boolean;
  prediction?: Prediction | null;

  onPredictionChange: (prediction: Prediction) => void;
}

const PriceText = ({ price }: { price: Money }) => {
  const formatter = useCurrencyFormatter({ currency: price.currency });

  return formatter.format(price.amount);
};

export const LiveCryptoPriceCard = ({
  price,
  loading,
  ticker,
  prediction,
  onPredictionChange,
}: Props) => {
  const handlePredictionUp = useCallback(
    () => onPredictionChange(Prediction.UP),
    [onPredictionChange]
  );
  const handlePredictionDown = useCallback(
    () => onPredictionChange(Prediction.DOWN),
    [onPredictionChange]
  );
  const isPredictionChangeDisabled = Boolean(prediction);

  return (
    <Card aria-busy={Boolean(loading || !price)} className="relative">
      <CardHeader className="pb-2">
        <CardDescription className="flex flex-row gap-2">
          {loading ? (
            <Skeleton className="w-10 h-5" />
          ) : (
            <span className="uppercase">{ticker}</span>
          )}

          {loading ? (
            <Skeleton className="size-2" />
          ) : (
            <span className="relative flex size-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full size-2 bg-sky-500"></span>
            </span>
          )}
        </CardDescription>

        {loading ? (
          <Skeleton className="w-96 h-10" />
        ) : (
          price && (
            <CardTitle className="text-4xl">
              <PriceText price={price} />
            </CardTitle>
          )
        )}
      </CardHeader>
      <CardContent>
        {loading ? (
          <Skeleton className="h-4 w-40" />
        ) : (
          <div className="text-xs text-muted-foreground">
            TODO: +25% from last guess
          </div>
        )}
      </CardContent>

      <div className="flex gap-2 absolute top-0 right-0 flex-col justify-between h-full py-4 px-2">
        {loading ? (
          <>
            <Skeleton className="size-8" />
            <Skeleton className="size-8" />
          </>
        ) : (
          <TooltipProvider delayDuration={300}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  aria-label="Predict price up"
                  onClick={handlePredictionUp}
                  disabled={isPredictionChangeDisabled}
                >
                  <ArrowUp />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                Click to predict that {ticker} will increase in the next minute
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  aria-label="Predict price down"
                  onClick={handlePredictionDown}
                  disabled={isPredictionChangeDisabled}
                >
                  <ArrowDown />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                Click to predict that {ticker} will decrease in the next minute
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
    </Card>
  );
};
