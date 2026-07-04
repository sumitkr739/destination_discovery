export function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-12 px-4">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header skeleton */}
        <div className="skeleton h-12 w-64 rounded-xl mx-auto" />
        
        {/* Story skeleton */}
        <div className="glass rounded-2xl p-8 space-y-4">
          <div className="skeleton h-8 w-48 rounded-lg" />
          <div className="skeleton h-4 w-full rounded" />
          <div className="skeleton h-4 w-full rounded" />
          <div className="skeleton h-4 w-3/4 rounded" />
        </div>

        {/* Cards skeleton */}
        <div className="grid md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="glass rounded-2xl p-6 space-y-4">
              <div className="skeleton h-6 w-32 rounded" />
              <div className="skeleton h-4 w-full rounded" />
              <div className="skeleton h-4 w-2/3 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
