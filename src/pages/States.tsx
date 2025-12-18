import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import StateCard from '@/components/StateCard';
import { statesData } from '@/data/statesData';

const States = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container py-10">
        {/* Header */}
        <div className="max-w-2xl mb-10">
          <h1 className="font-display text-4xl font-bold text-foreground mb-3">
            Explore All States
          </h1>
          <p className="text-muted-foreground mb-6">
            Discover the unique beauty, culture, and events of each Indian state
          </p>
          <SearchBar className="max-w-md" />
        </div>

        {/* States Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {statesData.map((state, index) => (
            <StateCard key={state.id} state={state} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default States;
