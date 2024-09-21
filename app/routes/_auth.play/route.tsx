import { useBinanceStream } from "./hooks"
import { LiveCryptoPriceCard } from "~/components/cards/live-crypto-price-card";

export const description =
  "A login form with email and password. There's an option to login with Google and a link to sign up if you don't have an account."

export default function Start() {
  const { price, isLoading } = useBinanceStream();

  return (
    <div className="min-h-screen items-center flex">
      <div className="max-w-xl flex-1 mx-auto">
        <LiveCryptoPriceCard price={price} loading={isLoading} ticker="BTC" />
      </div>
    </div>

  );
}
