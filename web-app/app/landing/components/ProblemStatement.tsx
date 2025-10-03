import { Card } from '~/components/ui/card';
import { AlertTriangle, Calendar, TrendingDown } from 'lucide-react';

export const ProblemStatement = () => {
    return (
        <section className="relative overflow-hidden px-6 py-24">
            <div className="container mx-auto max-w-6xl">
                <div className="animate-fade-in-up mb-16 text-center">
                    <h2 className="mb-6 bg-gradient-to-r from-destructive to-primary bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
                        The Forecasting Challenge
                    </h2>
                    <p className="mx-auto max-w-3xl text-xl text-muted-foreground">
                        Traditional weather forecasts fail when planning far
                        into the future
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-3">
                    {/* Limited Range */}
                    <Card className="animate-fade-in-up border-destructive/30 bg-gradient-to-br from-card to-muted/20 p-8 backdrop-blur-sm transition-all duration-300 hover:shadow-[0_0_30px_hsl(var(--destructive)/0.3)]">
                        <div className="mb-6 w-fit rounded-2xl bg-destructive/10 p-4">
                            <Calendar className="h-8 w-8 text-destructive" />
                        </div>
                        <h3 className="mb-4 text-2xl font-bold">
                            7-10 Day Limit
                        </h3>
                        <p className="leading-relaxed text-muted-foreground">
                            Most forecasts only cover the immediate future,
                            leaving long-term planners in the dark.
                        </p>
                    </Card>

                    {/* Decreasing Accuracy */}
                    <Card className="animate-fade-in-up animation-delay-200 border-destructive/30 bg-gradient-to-br from-card to-muted/20 p-8 backdrop-blur-sm transition-all duration-300 hover:shadow-[0_0_30px_hsl(var(--destructive)/0.3)]">
                        <div className="mb-6 w-fit rounded-2xl bg-destructive/10 p-4">
                            <TrendingDown className="h-8 w-8 text-destructive" />
                        </div>
                        <h3 className="mb-4 text-2xl font-bold">
                            Declining Accuracy
                        </h3>
                        <p className="leading-relaxed text-muted-foreground">
                            Forecast confidence drops dramatically beyond the
                            first week, making decisions risky.
                        </p>
                    </Card>

                    {/* Uncertainty Gap */}
                    <Card className="animate-fade-in-up animation-delay-400 border-destructive/30 bg-gradient-to-br from-card to-muted/20 p-8 backdrop-blur-sm transition-all duration-300 hover:shadow-[0_0_30px_hsl(var(--destructive)/0.3)]">
                        <div className="mb-6 w-fit rounded-2xl bg-destructive/10 p-4">
                            <AlertTriangle className="h-8 w-8 text-destructive" />
                        </div>
                        <h3 className="mb-4 text-2xl font-bold">
                            The Uncertainty Gap
                        </h3>
                        <p className="leading-relaxed text-muted-foreground">
                            Critical decisions—weddings, events,
                            agriculture—need reliability beyond current
                            capabilities.
                        </p>
                    </Card>
                </div>

                {/* Timeline visualization */}
                <div className="mt-16 rounded-3xl border border-border bg-card/50 p-8 backdrop-blur-sm">
                    <div className="mb-4 flex items-center justify-between">
                        <span className="text-sm font-medium text-muted-foreground">
                            Forecast Confidence
                        </span>
                        <span className="text-sm font-medium text-muted-foreground">
                            Time →
                        </span>
                    </div>
                    <div className="relative h-24 overflow-hidden rounded-2xl bg-muted/30">
                        {/* Traditional forecast fade */}
                        <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-destructive/60 to-destructive/20" />
                        <div className="absolute inset-y-0 right-0 left-1/3 bg-gradient-to-r from-destructive/20 to-transparent" />

                        {/* CloudQuery strength */}
                        <div className="animate-pulse-glow absolute inset-y-0 right-0 left-1/3 bg-gradient-to-r from-primary/40 to-primary/60" />

                        {/* Labels */}
                        <div className="absolute bottom-2 left-4 text-xs font-medium text-foreground">
                            Traditional (7-10 days)
                        </div>
                        <div className="absolute right-4 bottom-2 text-xs font-medium text-primary">
                            CloudQuery Coverage →
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
