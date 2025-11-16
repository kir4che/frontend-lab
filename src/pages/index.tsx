import { showcaseDirectory } from '@/routes/meta';
import Card from '@/components/ui/Card';

const Home = () => (
  <>
    {showcaseDirectory.length > 0 && (
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {showcaseDirectory.map((demo) => (
          <Card key={demo.id} demo={demo} />
        ))}
      </div>
    )}
  </>
);

export default Home;
