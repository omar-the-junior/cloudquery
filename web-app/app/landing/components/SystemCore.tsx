import { Card } from '~/components/ui/card';
import { ArrowRight, Brain, Database, Target } from 'lucide-react';

export const SystemCore = () => {
    return (
        <section className="relative overflow-hidden bg-gradient-to-b from-background to-muted/20 px-6 py-24">
            <div className="container mx-auto max-w-7xl">
                <div className="animate-fade-in-up mb-20 text-center">
                    <h2 className="mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
                        How CloudQuery Works
                    </h2>
                    <p className="mx-auto max-w-3xl text-xl text-muted-foreground">
                        Three powerful components working in harmony
                    </p>
                </div>

                {/* System Flow Diagram */}
                <div className="relative">
                    {/* Flow connections */}
                    <div className="absolute top-1/2 right-1/4 left-1/4 hidden h-0.5 bg-gradient-to-r from-primary via-accent to-secondary lg:block">
                        <div className="animate-flow absolute inset-0 bg-gradient-to-r from-primary via-accent to-secondary opacity-50" />
                    </div>

                    <div className="relative z-10 grid gap-8 lg:grid-cols-3">
                        {/* NASA POWER API */}
                        <Card className="animate-fade-in-up group border-primary/30 bg-gradient-to-br from-card to-primary/5 p-8 backdrop-blur-sm transition-all duration-500 hover:shadow-[0_0_40px_hsl(var(--primary)/0.4)]">
                            <div className="relative">
                                <div className="animate-glow-pulse mx-auto mb-6 w-fit rounded-3xl bg-primary/20 p-5">
                                    <Database className="h-12 w-12 text-primary" />
                                </div>
                                <div className="absolute top-1/2 -right-12 hidden -translate-y-1/2 lg:block">
                                    <ArrowRight className="h-8 w-8 animate-pulse text-primary" />
                                </div>
                            </div>

                            <h3 className="mb-4 text-center text-2xl font-bold">
                                NASA POWER API
                            </h3>
                            <p className="mb-6 text-center leading-relaxed text-muted-foreground">
                                Decades of historical climate and weather data
                                from NASA satellites and global observations.
                            </p>

                            <div className="space-y-2 text-sm">
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <div className="h-2 w-2 animate-pulse rounded-full bg-primary" />
                                    Temperature patterns
                                </div>
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <div className="animation-delay-200 h-2 w-2 animate-pulse rounded-full bg-primary" />
                                    Precipitation history
                                </div>
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <div className="animation-delay-400 h-2 w-2 animate-pulse rounded-full bg-primary" />
                                    Wind & humidity data
                                </div>
                            </div>
                        </Card>

                        {/* LLM Processing */}
                        <Card className="animate-fade-in-up animation-delay-200 group border-accent/30 bg-gradient-to-br from-card to-accent/5 p-8 backdrop-blur-sm transition-all duration-500 hover:shadow-[0_0_40px_hsl(var(--accent)/0.4)]">
                            <div className="relative">
                                <div className="animate-glow-pulse animation-delay-300 mx-auto mb-6 w-fit rounded-3xl bg-accent/20 p-5">
                                    <Brain className="h-12 w-12 text-accent" />
                                </div>
                                <div className="absolute top-1/2 -right-12 hidden -translate-y-1/2 lg:block">
                                    <ArrowRight className="h-8 w-8 animate-pulse text-accent" />
                                </div>
                            </div>

                            <h3 className="mb-4 text-center text-2xl font-bold">
                                AI Interpreter
                            </h3>
                            <p className="mb-6 text-center leading-relaxed text-muted-foreground">
                                Advanced LLM analyzes your activity and
                                determines weather requirements intelligently.
                            </p>

                            <div className="space-y-2 text-sm">
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <div className="h-2 w-2 animate-pulse rounded-full bg-accent" />
                                    Activity understanding
                                </div>
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <div className="animation-delay-200 h-2 w-2 animate-pulse rounded-full bg-accent" />
                                    Weather needs extraction
                                </div>
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <div className="animation-delay-400 h-2 w-2 animate-pulse rounded-full bg-accent" />
                                    Context awareness
                                </div>
                            </div>
                        </Card>

                        {/* Suitability Output */}
                        <Card className="animate-fade-in-up animation-delay-400 group border-secondary/30 bg-gradient-to-br from-card to-secondary/5 p-8 backdrop-blur-sm transition-all duration-500 hover:shadow-[0_0_40px_hsl(var(--secondary)/0.4)]">
                            <div className="animate-glow-pulse animation-delay-600 mx-auto mb-6 w-fit rounded-3xl bg-secondary/20 p-5">
                                <Target className="h-12 w-12 text-secondary" />
                            </div>

                            <h3 className="mb-4 text-center text-2xl font-bold">
                                Suitability Score
                            </h3>
                            <p className="mb-6 text-center leading-relaxed text-muted-foreground">
                                Clear, actionable insights showing when
                                conditions are optimal for your plans.
                            </p>

                            <div className="space-y-2 text-sm">
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <div className="h-2 w-2 animate-pulse rounded-full bg-secondary" />
                                    Historical analysis
                                </div>
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <div className="animation-delay-200 h-2 w-2 animate-pulse rounded-full bg-secondary" />
                                    Confidence ratings
                                </div>
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <div className="animation-delay-400 h-2 w-2 animate-pulse rounded-full bg-secondary" />
                                    Best time windows
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>

                {/* Data Flow Animation */}
                <div className="mt-16 rounded-3xl border border-primary/20 bg-card/30 p-8 backdrop-blur-sm">
                    <p className="mb-4 text-center text-sm font-medium text-muted-foreground">
                        Real-Time Data Flow
                    </p>
                    <div className="relative h-2 overflow-hidden rounded-full bg-muted/30">
                        <div className="animate-flow absolute inset-0 bg-gradient-to-r from-primary via-accent to-secondary" />
                    </div>
                    <div className="mt-4 flex justify-between text-xs font-medium text-muted-foreground">
                        <span>NASA Satellite</span>
                        <span>AI Processing</span>
                        <span>Your Insights</span>
                    </div>
                </div>
            </div>
        </section>
    );
};
