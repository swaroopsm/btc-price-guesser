import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Money, Player, Prediction } from "~/types";
import { useCurrencyFormatter } from "~/hooks";
import { ArrowUp, ArrowDown, CircleUserRound } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import { cn } from "~/lib/utils";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "../ui/tooltip";
import { useCallback } from "react";
import { Badge } from "../ui/badge";

interface Props {
  ticker: string;
  price: Money | null;
  loading?: boolean;
  prediction?: Prediction | null;
  player?: Player;

  onPredictionChange: (prediction: Prediction) => void;
}

const PriceText = ({ price }: { price: Money }) => {
  const formatter = useCurrencyFormatter();

  return formatter.format(price);
};

export const CryptoPlayerPriceCard = ({
  price,
  loading,
  ticker,
  prediction,
  player,
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
  const scoreBadgeVariant =
    player && player.score >= 0 ? undefined : "destructive";

  return (
    <Card aria-busy={Boolean(loading || !price)} className="relative">
      <div className="border-b p-4 flex gap-2 justify-between">
        <div className="flex gap-1 items-center">
          <CircleUserRound size={16} />
          <span className="text-sm font-medium">{player?.name}</span>
        </div>

        <Badge variant={scoreBadgeVariant}>Score: {player?.score}</Badge>
      </div>

      <CardHeader className="pb-2">
        {loading ? (
          <div>
            <Skeleton className="w-10 h-6" />
          </div>
        ) : (
          <CardDescription className="flex flex-row gap-2">
            <span className="uppercase">{ticker}</span>

            <span className="relative flex size-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full size-2 bg-sky-500"></span>
            </span>
          </CardDescription>
        )}

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

      <CardFooter className="flex flex-col gap-6 border-t p-4 justify-center">
        <div className="grid grid-cols-2 gap-2 top-0 right-0 justify-between h-full w-full">
          {loading ? (
            <>
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
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
                    <ArrowUp
                      className={cn(
                        prediction === Prediction.UP && "animate-bounce"
                      )}
                    />{" "}
                    Up
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
                    <ArrowDown
                      className={cn(
                        prediction === Prediction.DOWN && "animate-bounce"
                      )}
                    />{" "}
                    Down
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
      </CardFooter>
    </Card>
  );
};
