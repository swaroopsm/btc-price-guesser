
import { Link, Form } from "@remix-run/react"

import { Button } from "~/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"

export const description =
  "A login form with email and password. There's an option to login with Google and a link to sign up if you don't have an account."

export const Start = () => {
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
                  <Link to="#" className="ml-auto inline-block text-sm underline">
                    Generate a random name?
                  </Link>
                </div>
                <Input
                  name="name"
                  id="name"
                  type="name"
                  placeholder="Quiet-Owl-Wisdom"
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Start
              </Button>
            </Form>
          </CardContent>
        </Card>
      </div>

    </div>
  )
}

