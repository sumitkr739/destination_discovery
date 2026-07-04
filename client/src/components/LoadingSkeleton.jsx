export function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-[#09090B] py-12 px-6 overflow-hidden relative">
      {/* Background gradients */}
      <div className="absolute top-0 right-0 w-[50%] h-[40%] bg-purple-500/5 blur-[120px] pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-0 left-0 w-[50%] h-[50%] bg-cyan-500/5 blur-[120px] pointer-events-none animate-pulse-slower" />

      <div className="max-w-7xl mx-auto space-y-8 relative z-10">
        
        {/* Navigation Action bar skeleton */}
        <div className="flex justify-between items-center border-b border-white/5 pb-6">
          <div className="flex items-center gap-3">
            <div className="animate-shimmer h-10 w-24 rounded-full" />
            <div className="animate-shimmer h-8 w-32 rounded-lg" />
          </div>
          <div className="flex gap-2">
            <div className="animate-shimmer h-10 w-24 rounded-full" />
            <div className="animate-shimmer h-10 w-24 rounded-full" />
          </div>
        </div>

        {/* Hero Banner skeleton */}
        <div className="p-8 rounded-[28px] border border-white/[0.08] bg-[#111214]/65 space-y-4 h-[200px] flex flex-col justify-center">
          <div className="animate-shimmer h-4 w-32 rounded-full" />
          <div className="animate-shimmer h-12 w-3/4 rounded-2xl" />
          <div className="flex gap-2 mt-4">
            <div className="animate-shimmer h-6 w-20 rounded-full" />
            <div className="animate-shimmer h-6 w-20 rounded-full" />
            <div className="animate-shimmer h-6 w-20 rounded-full" />
          </div>
        </div>
        
        {/* Grid skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Story skeleton */}
          <div className="md:col-span-2 p-6 rounded-[24px] border border-white/[0.08] bg-[#111214]/65 space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="animate-shimmer h-8 w-8 rounded-lg" />
              <div className="animate-shimmer h-6 w-48 rounded" />
            </div>
            <div className="animate-shimmer h-4 w-full rounded" />
            <div className="animate-shimmer h-4 w-full rounded" />
            <div className="animate-shimmer h-4 w-5/6 rounded" />
            <div className="animate-shimmer h-4 w-4/5 rounded" />
          </div>

          {/* Map skeleton */}
          <div className="md:col-span-1 p-6 rounded-[24px] border border-white/[0.08] bg-[#111214]/65 space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="animate-shimmer h-8 w-8 rounded-lg" />
              <div className="animate-shimmer h-6 w-32 rounded" />
            </div>
            <div className="animate-shimmer h-[250px] w-full rounded-2xl" />
          </div>

          {/* Inner cards skeleton */}
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-6 rounded-[24px] border border-white/[0.08] bg-[#111214]/65 space-y-4">
              <div className="flex items-center gap-3">
                <div className="animate-shimmer h-6 w-6 rounded-full" />
                <div className="animate-shimmer h-5 w-32 rounded" />
              </div>
              <div className="animate-shimmer h-4 w-full rounded" />
              <div className="animate-shimmer h-4 w-3/4 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

