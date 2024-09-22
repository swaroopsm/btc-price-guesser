import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Money, Prediction } from "~/types";
import { useCurrencyFormatter } from "~/hooks";
import { ArrowUp, ArrowDown } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "../ui/tooltip";
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
          {loading ? null : <span className="uppercase">{ticker}</span>}

          {loading ? null : (
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

      <CardFooter className="flex flex-col gap-6 border-t p-4 justify-center">
        <div className="flex gap-2 top-0 right-0 justify-between h-full">
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
                    size="lg"
                    aria-label="Predict price up"
                    onClick={handlePredictionUp}
                    disabled={isPredictionChangeDisabled}
                    className="group flex gap-2"
                  >
                    <ArrowUp className="group-hover:animate-bounce" /> High
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom" sideOffset={16}>
                  Click to predict that {ticker} will increase in the next
                  minute
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="lg"
                    aria-label="Predict price down"
                    onClick={handlePredictionDown}
                    disabled={isPredictionChangeDisabled}
                    className="group flex gap-2"
                  >
                    <ArrowDown className="group-hover:animate-bounce" /> Low
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom" sideOffset={16}>
                  Click to predict that {ticker} will decrease in the next
                  minute
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>

        {prediction && (
          <p className="text-sm text-center max-w-[75%]">
            Hold on tight, you predicted {prediction.price.amount}. May the
            Crypto gods be your side
          </p>
        )}
      </CardFooter>
    </Card>
  );
};
