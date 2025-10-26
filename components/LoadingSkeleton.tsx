export default function LoadingSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header Skeleton */}
      <div className="text-center animate-pulse">
        <div className="h-8 bg-gray-700 rounded-lg w-64 mx-auto mb-4"></div>
        <div className="h-6 bg-gray-700 rounded-lg w-96 mx-auto mb-2"></div>
        <div className="h-6 bg-gray-700 rounded-lg w-80 mx-auto"></div>
      </div>

      {/* Tab Navigation Skeleton */}
      <div className="flex justify-center">
        <div className="bg-gray-800 rounded-xl p-2 flex space-x-2">
          <div className="h-12 bg-gray-700 rounded-lg w-32"></div>
          <div className="h-12 bg-gray-700 rounded-lg w-32"></div>
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="bg-gray-800 rounded-2xl p-8 animate-pulse">
            <div className="flex items-start space-x-6">
              <div className="w-16 h-16 bg-gray-700 rounded-xl"></div>
              <div className="flex-1 space-y-3">
                <div className="h-6 bg-gray-700 rounded-lg w-3/4"></div>
                <div className="h-4 bg-gray-700 rounded-lg w-full"></div>
                <div className="h-4 bg-gray-700 rounded-lg w-5/6"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Chart loading skeleton
export function ChartSkeleton() {
  return (
    <div className="bg-gray-700/50 rounded-xl p-4 animate-pulse">
      <div className="h-64 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-crypto-gold"></div>
      </div>
    </div>
  )
}

// Card loading skeleton
export function CardSkeleton() {
  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700/50 animate-pulse">
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-10 h-10 bg-gray-700 rounded-xl"></div>
        <div className="h-6 bg-gray-700 rounded w-24"></div>
      </div>
      <div className="space-y-3">
        <div className="h-4 bg-gray-700 rounded w-3/4"></div>
        <div className="h-4 bg-gray-700 rounded w-1/2"></div>
        <div className="h-4 bg-gray-700 rounded w-2/3"></div>
      </div>
    </div>
  )
}


