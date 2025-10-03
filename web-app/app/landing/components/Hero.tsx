import { Button } from '~/components/ui/button';
import { Link } from 'react-router';
import { Brain, Cloud, Satellite } from 'lucide-react';
import heroImage from '../assets/hero-bg.jpg';

export const Hero = () => {
    return (
        <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
            {/* Animated background */}
            <div
                className="absolute inset-0 z-0 opacity-30"
                style={{
                    backgroundImage: `url(${heroImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />
            <div className="absolute inset-0 z-0 bg-gradient-to-b from-background via-background/95 to-background" />

            {/* Animated glowing orbs */}
            <div className="animate-pulse-glow absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
            <div className="animate-pulse-glow animation-delay-1000 absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />

            {/* Content */}
            <div className="z-10 container mx-auto px-6 text-center">
                <div className="animate-fade-in-up">
                    {/* Icon trio */}
                    <div className="mb-8 flex justify-center gap-6">
                        <div className="animate-glow-pulse rounded-2xl border border-primary/20 bg-card/50 p-4 backdrop-blur-sm">
                            <Satellite className="h-8 w-8 text-primary" />
                        </div>
                        <div className="animate-glow-pulse animation-delay-300 rounded-2xl border border-accent/20 bg-card/50 p-4 backdrop-blur-sm">
                            <Brain className="h-8 w-8 text-accent" />
                        </div>
                        <div className="animate-glow-pulse animation-delay-600 rounded-2xl border border-secondary/20 bg-card/50 p-4 backdrop-blur-sm">
                            <Cloud className="h-8 w-8 text-secondary" />
                        </div>
                    </div>

                    <h1 className="mb-6 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-6xl font-bold text-transparent md:text-7xl lg:text-8xl">
                        CloudQuery
                    </h1>

                    <p className="mx-auto mb-4 max-w-3xl text-xl text-muted-foreground md:text-2xl">
                        Personalized Long-Term Weather Planning
                    </p>

                    <p className="mx-auto mb-12 max-w-2xl text-lg text-muted-foreground/80">
                        Harnessing NASA data and AI to predict weather
                        suitability for your activities—beyond traditional
                        forecasts.
                    </p>

                    <div className="flex flex-col justify-center gap-4 sm:flex-row">
                        <Link to="/home">
                            <Button
                                variant="default"
                                size="lg"
                                className="text-lg"
                            >
                                Explore the System
                            </Button>
                        </Link>
                        <Button variant="default" size="lg" className="text-lg">
                            Learn More
                        </Button>
                    </div>
                </div>

                {/* Floating data particles */}
                <div className="pointer-events-none absolute inset-0">
                    {[...Array(20)].map((_, i) => (
                        <div
                            key={i}
                            className="animate-pulse-glow absolute h-2 w-2 rounded-full bg-primary/30"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 3}s`,
                            }}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};
