import { Card } from '~/components/ui/card';
import { Calendar, CheckCircle2, MessageSquare, Sparkles } from 'lucide-react';

export const UserJourney = () => {
    const steps = [
        {
            icon: MessageSquare,
            title: 'Name Your Activity',
            description:
                "Simply describe what you're planning—a wedding, hiking trip, outdoor event, or agricultural project.",
            color: 'primary',
            example: '"Planning an outdoor wedding in June"',
        },
        {
            icon: Sparkles,
            title: 'AI Interpretation',
            description:
                "CloudQuery's LLM understands your activity and automatically identifies critical weather factors.",
            color: 'accent',
            example: 'Temperature, precipitation, wind conditions',
        },
        {
            icon: Calendar,
            title: 'Historical Analysis',
            description:
                'NASA data spanning decades reveals patterns and trends specific to your location and timeframe.',
            color: 'secondary',
            example: '30+ years of climate data analyzed',
        },
        {
            icon: CheckCircle2,
            title: 'Get Recommendations',
            description:
                'Receive personalized suitability scores, confidence ratings, and optimal time windows for your plans.',
            color: 'primary',
            example: '87% suitability • High confidence',
        },
    ];

    return (
        <section className="relative overflow-hidden px-6 py-24">
            <div className="container mx-auto max-w-6xl">
                <div className="animate-fade-in-up mb-20 text-center">
                    <h2 className="mb-6 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
                        Your Journey with CloudQuery
                    </h2>
                    <p className="mx-auto max-w-3xl text-xl text-muted-foreground">
                        Four simple steps to confident long-term planning
                    </p>
                </div>

                <div className="space-y-8">
                    {steps.map((step, index) => (
                        <Card
                            key={index}
                            className="animate-fade-in-up group border-border/50 bg-gradient-to-br from-card to-muted/10 p-8 backdrop-blur-sm transition-all duration-500 hover:shadow-[0_0_30px_hsl(var(--primary)/0.2)]"
                            style={{ animationDelay: `${index * 150}ms` }}
                        >
                            <div className="flex flex-col items-start gap-6 md:flex-row md:items-center">
                                {/* Step number & icon */}
                                <div className="flex items-center gap-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted/50 text-2xl font-bold text-muted-foreground">
                                        {index + 1}
                                    </div>
                                    <div
                                        className={`p-4 bg-${step.color}/10 animate-glow-pulse rounded-2xl`}
                                    >
                                        <step.icon
                                            className={`h-8 w-8 text-${step.color}`}
                                        />
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="flex-1">
                                    <h3 className="mb-3 text-2xl font-bold">
                                        {step.title}
                                    </h3>
                                    <p className="mb-4 leading-relaxed text-muted-foreground">
                                        {step.description}
                                    </p>
                                    <div className="inline-block rounded-lg border border-border/30 bg-muted/30 px-4 py-2">
                                        <code className="font-mono text-sm text-primary">
                                            {step.example}
                                        </code>
                                    </div>
                                </div>

                                {/* Connecting line */}
                                {index < steps.length - 1 && (
                                    <div className="absolute left-[88px] hidden h-16 w-0.5 translate-y-full bg-gradient-to-b from-primary/50 to-transparent md:block" />
                                )}
                            </div>
                        </Card>
                    ))}
                </div>

                {/* Call to action */}
                <div className="animate-fade-in-up mt-20 text-center">
                    <div className="inline-block rounded-3xl border border-primary/30 bg-gradient-to-br from-card to-primary/10 p-8 shadow-[0_0_40px_hsl(var(--primary)/0.3)] backdrop-blur-sm">
                        <h3 className="mb-4 text-3xl font-bold">
                            Plan with Confidence
                        </h3>
                        <p className="mb-6 max-w-2xl text-lg text-muted-foreground">
                            CloudQuery transforms decades of NASA climate data
                            into actionable insights, empowering you to make
                            informed decisions about your future.
                        </p>
                        <div className="flex items-center justify-center gap-3 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                                <div className="h-2 w-2 animate-pulse rounded-full bg-primary" />
                                <span>NASA-verified data</span>
                            </div>
                            <span>•</span>
                            <div className="flex items-center gap-2">
                                <div className="h-2 w-2 animate-pulse rounded-full bg-accent" />
                                <span>AI-powered insights</span>
                            </div>
                            <span>•</span>
                            <div className="flex items-center gap-2">
                                <div className="h-2 w-2 animate-pulse rounded-full bg-secondary" />
                                <span>Simple & accessible</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
