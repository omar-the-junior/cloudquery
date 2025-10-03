import type { Route } from "./+types/home";
import { WeatherQueryForm } from '~/components/WeatherQueryForm';

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "CloudQuery - Weather Query" },
        { name: "description", content: "Get personalized weather insights for your future activities using NASA historical data" },
    ];
}

export default function Home() {
    return (
        <main className="min-h-screen bg-gradient-to-b from-background to-muted/20">
            <div className="container mx-auto px-6 py-12">
                {/* Header Section */}
                <div className="mb-12 text-center">
                    <h1 className="mb-4 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-5xl font-bold text-transparent md:text-6xl">
                        Weather Query
                    </h1>
                    <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
                        Get personalized weather insights for your future
                        activities using NASA historical data
                    </p>
                </div>

                <div className="mx-auto max-w-4xl">
                    <WeatherQueryForm />
                </div>
            </div>
        </main>
    );
}
