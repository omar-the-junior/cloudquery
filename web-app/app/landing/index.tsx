import { Hero } from './components/Hero';
import { ProblemStatement } from './components/ProblemStatement';
import { SystemCore } from './components/SystemCore';
import { UserJourney } from './components/UserJourney';

const Landing = () => {
    return (
        <main className="min-h-screen">
            <Hero />
            <ProblemStatement />
            <SystemCore />
            <UserJourney />
        </main>
    );
};

export default Landing;
