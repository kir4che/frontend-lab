import { Link } from 'react-router';
import { type RouteMeta } from '@/routes/meta';

interface CardProps {
  demo: RouteMeta;
}

const Card = ({ demo }: CardProps) => (
  <Link
    to={demo.path}
    className="flex flex-col gap-3 rounded-2xl border border-gray-100 bg-white/90 p-5 shadow-sm shadow-gray-100/70 transition hover:-translate-y-0.5 hover:border-pink-100 hover:shadow-lg hover:shadow-pink-100/60"
  >
    <article key={demo.id} className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2">
        <h2 className="text-base font-semibold text-gray-800">{demo.label}</h2>
        <span className="inline-flex items-center rounded-full bg-pink-50 px-2 py-0.5 text-xs font-semibold text-pink-500">
          {demo.badge ?? demo.category}
        </span>
      </div>
      <p className="text-sm text-gray-500">{demo.description}</p>
      <div
        className="ml-auto inline-flex size-6 justify-center gap-1 rounded-full bg-pink-500 text-white transition hover:bg-pink-400"
        aria-hidden
      >
        →
      </div>
    </article>
  </Link>
);

export default Card;
