function SkeletonBox({className = ""}:{className? : string}) {
  return (
    <div
      className={`animate-shimmer rounded-md bg-linear-to-r from-gray-100 via-gray-200 to-gray-100 bg-size-[600px_100%] ${className}`}
    />
  )
}

function ProfileCard() {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-black/20 p-5">
      <div className="flex items-center gap-3">
        <SkeletonBox className="size-9 shrink-0 rounded-full" />
        <div className="flex flex-1 flex-col gap-1.5">
          <SkeletonBox className="h-3 w-[55%]" />
          <SkeletonBox className="h-2.5 w-[35%]" />
        </div>
      </div>
      <SkeletonBox className="h-2.5 w-full" />
      <SkeletonBox className="h-2.5 w-[80%]" />
      <SkeletonBox className="h-2.5 w-[90%]" />
      <div className="mt-1 flex gap-2">
        <SkeletonBox className="h-7 flex-1 rounded-md" />
        <SkeletonBox className="size-7 rounded-md" />
      </div>
    </div>
  )
}

function StatCard() {
  return (
    <div className="flex flex-col gap-2.5 rounded-xl border border-gray-200 bg-black/20 p-5">
      <SkeletonBox className="h-2.5 w-[45%]" />
      <SkeletonBox className="h-5 w-[60%]" />
      <SkeletonBox className="h-2 w-[30%] rounded-full" />
    </div>
  )
}

function TableRowSkeleton() {
  return (
    <div className="grid grid-cols-3 gap-6">
      <div className="flex flex-col gap-1.5">
        <SkeletonBox className="h-2.5 w-[70%]" />
        <SkeletonBox className="h-2.5 w-full" />
        <SkeletonBox className="h-2.5 w-[85%]" />
      </div>
      <div className="flex flex-col gap-1.5">
        <SkeletonBox className="h-2.5 w-[60%]" />
        <SkeletonBox className="h-2.5 w-full" />
        <SkeletonBox className="h-2.5 w-[75%]" />
      </div>
      <div className="flex flex-col gap-1.5">
        <SkeletonBox className="h-2.5 w-[80%]" />
        <SkeletonBox className="h-2.5 w-full" />
        <SkeletonBox className="h-2.5 w-[90%]" />
      </div>
    </div>
  )
}

export default function FallBack() {
  return (
    <section className="w-full space-y-3 p-4 md:p-6 bg-white">

      {/* Label */}
      <p className="text-[11px] font-medium uppercase tracking-widest text-gray-400">
        Loading
      </p>

      {/* Tier 1 — Profile / content cards (wide, 2-col) */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <ProfileCard />
        <ProfileCard />
      </div>

      {/* Tier 2 — Stat cards (4-col, collapses to 2 then 1) */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard />
        <StatCard />
        <StatCard />
        <StatCard />
      </div>

      {/* Tier 3 — Table / detail row */}
      <div className="rounded-xl border border-gray-100 bg-black/20 p-5">
        <SkeletonBox className="mb-4 h-3 w-[25%]" />
        <TableRowSkeleton />
      </div>

    </section>
  )
}