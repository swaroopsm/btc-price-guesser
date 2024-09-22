import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";

export const HowItWorksDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" size="sm">
          How it works?
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>How it works?</DialogTitle>
          <DialogDescription>
            <ul className="list-disc p-4">
              <li>
                This is an app that allows a player to make guesses on whether
                the market price of Bitcoin (BTC/USD) will be higher or lower
                after one minute.
              </li>
              <li>You can view your score and the latest BTC price in USD.</li>
              <li>You can guess if the price will go "up" or "down."</li>
              <li>
                You can't make another guess until the current one is resolved.
              </li>
              <li>A guess is resolved after 1 minute and a price change.</li>
              <li>Correct guess: +1 point. Incorrect guess: -1 point.</li>
              <li>Only one guess at a time.</li>
              <li>New players start with 0 points.</li>
              <li>Enjoy!</li>
            </ul>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
