import { Form, useActionData, useNavigation } from "@remix-run/react";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";

import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { generateRandomPlayerName } from "~/lib/seed";
import { cn } from "~/lib/utils";

export const Start = () => {
  const [name, setName] = useState("");

  const handleGenerateRandomName = () => {
    setName(generateRandomPlayerName());
  };
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <div className=" min-h-screen flex items-center">
      <div className="container">
        <Card className="mx-auto max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">BTC Guesser</CardTitle>
            <CardDescription>
              Enter your name below to start playing the game
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form className="grid gap-4" method="post">
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="name">Name</Label>
                  <Button
                    className="ml-auto inline-block text-sm underline"
                    variant="link"
                    onClick={handleGenerateRandomName}
                    type="button"
                    size="sm"
                  >
                    Generate a random name?
                  </Button>
                </div>
                <Input
                  name="name"
                  id="name"
                  type="name"
                  placeholder="Quiet Owl"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting && (
                  <LoaderCircle className="animate-spin absolute" />
                )}
                <span className={cn(isSubmitting && "invisible")}>Start</span>
              </Button>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
