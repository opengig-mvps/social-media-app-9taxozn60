'use client';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, User, MessageSquare, TrendingUp, Plus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";

const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-light-orange">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Revolutionize Your Social Experience
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Connect and share your thoughts with the world through our text-based social media platform.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90">
                    Join Now
                  </Button>
                  <Button className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground">
                    Learn More
                  </Button>
                </div>
              </div>
              <img
                src="https://fastly.picsum.photos/id/13/2500/1667.jpg?hmac=SoX9UoHhN8HyklRA4A3vcCWJMVtiBXUg0W4ljWTor7s"
                width="550"
                height="550"
                alt="Social Media"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-bottom sm:w-full lg:order-last lg:aspect-square"
              />
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Key Features</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform provides essential features to enhance your social media experience.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col items-center justify-center space-y-4">
                <User className="h-12 w-12" />
                <div className="space-y-1 text-center">
                  <h3 className="text-lg font-bold">Authentication</h3>
                  <p className="text-muted-foreground">
                    Seamlessly log in and stay secure with our robust authentication system.
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center space-y-4">
                <MessageSquare className="h-12 w-12" />
                <div className="space-y-1 text-center">
                  <h3 className="text-lg font-bold">Post & Comment</h3>
                  <p className="text-muted-foreground">
                    Share your thoughts and engage with others through posts and comments.
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center space-y-4">
                <TrendingUp className="h-12 w-12" />
                <div className="space-y-1 text-center">
                  <h3 className="text-lg font-bold">Trending Topics</h3>
                  <p className="text-muted-foreground">
                    Discover what's trending globally and join the conversation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Get Started Today</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join our community and start connecting with like-minded individuals.
                </p>
              </div>
              <Button className="mt-6 px-8 py-3 text-white bg-primary hover:bg-primary-800 rounded-md">
                Sign Up
              </Button>
            </div>
            <Carousel className="mt-12">
              <CarouselContent>
                <CarouselItem>
                  <img
                    src="https://picsum.photos/seed/picsum/200/300"
                    alt="Social Feed"
                    className="rounded-md"
                  />
                </CarouselItem>
                <CarouselItem>
                  <img
                    src="https://fastly.picsum.photos/id/13/2500/1667.jpg?hmac=SoX9UoHhN8HyklRA4A3vcCWJMVtiBXUg0W4ljWTor7s"
                    alt="Comments"
                    className="rounded-md"
                  />
                </CarouselItem>
                <CarouselItem>
                  <img
                    src="https://fastly.picsum.photos/id/17/2500/1667.jpg?hmac=HD-JrnNUZjFiP2UZQvWcKrgLoC_pc_ouUSWv8kHsJJY"
                    alt="Trending Topics"
                    className="rounded-md"
                  />
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </section>
      </main>
      <footer className="bg-muted p-6 md:py-12 w-full">
        <div className="container max-w-7xl grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 text-sm">
          <div className="grid gap-1">
            <h3 className="font-semibold">Product</h3>
            <Badge variant="outline">Features</Badge>
            <Badge variant="outline">Integrations</Badge>
            <Badge variant="outline">Security</Badge>
          </div>
          <div className="grid gap-1">
            <h3 className="font-semibold">Company</h3>
            <Badge variant="outline">About Us</Badge>
            <Badge variant="outline">Careers</Badge>
            <Badge variant="outline">Blog</Badge>
          </div>
          <div className="grid gap-1">
            <h3 className="font-semibold">Resources</h3>
            <Badge variant="outline">Documentation</Badge>
            <Badge variant="outline">Help Center</Badge>
            <Badge variant="outline">Community</Badge>
          </div>
          <div className="grid gap-1">
            <h3 className="font-semibold">Legal</h3>
            <Badge variant="outline">Privacy Policy</Badge>
            <Badge variant="outline">Terms of Service</Badge>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;