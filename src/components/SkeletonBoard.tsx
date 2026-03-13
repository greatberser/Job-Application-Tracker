export default function SkeletonBoard() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {Array.from({ length: 4 }).map((_, col) => (
        <div key={col} className="flex flex-col gap-3">
          {/* column header */}
          <div className="flex items-center justify-between">
            <div className="h-3 w-20 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-5 bg-gray-200 rounded-full animate-pulse" />
          </div>
          {/* cards */}
          {Array.from({ length: col === 0 ? 3 : col === 1 ? 2 : 1 }).map((_, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-xl p-4 space-y-3">
              <div className="flex justify-between">
                <div className="space-y-1.5">
                  <div className="h-2.5 w-16 bg-gray-200 rounded animate-pulse" />
                  <div className="h-3.5 w-32 bg-gray-200 rounded animate-pulse" />
                </div>
                <div className="h-5 w-14 bg-gray-200 rounded-full animate-pulse" />
              </div>
              <div className="h-2.5 w-24 bg-gray-200 rounded animate-pulse" />
              <div className="space-y-1.5 pt-2 border-t border-gray-100">
                <div className="h-2.5 w-full bg-gray-200 rounded animate-pulse" />
                <div className="h-2.5 w-3/4 bg-gray-200 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
