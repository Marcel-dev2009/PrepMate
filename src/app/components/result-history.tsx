/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "@/lib/api";
import { Result } from "@/types/type";
import { Suspense, use } from "react";
import dynamic from "next/dynamic";

const FallBackUI = dynamic(() => import("./fallback-loader"))

function ResultCard({ result }: { result: Result }) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-mist-300 p-5">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="size-9 shrink-0 rounded-full bg-black/40 border border-emerald-500/30 flex items-center justify-center">
          <span className="text-emerald-400 text-xs font-bold">
            {result.username?.charAt(0).toUpperCase()}
          </span>
        </div>
        <div className="flex flex-col gap-0.5">
          <p className="text-black text-sm font-semibold">{result.username}</p>
          <p className="text-black/40 text-xs">{result.email}</p>
        </div>
      </div>

      {/* Subject */}
      <div className="flex items-center justify-between">
        <span className="text-black/50 text-xs uppercase tracking-widest">Subject</span>
        <span className="text-black text-sm font-medium capitalize">{result.subject}</span>
      </div>

      {/* Score bar */}
      <div className="flex flex-col gap-1.5">
        <div className="flex justify-between">
          <span className="text-black text-xs uppercase tracking-widest">Score</span>
          <span className="text-emerald-400 text-xs font-bold">
            {result.score} / {result.total}
          </span>
        </div>
        <div className="h-1.5 w-full rounded-full bg-white/50 backdrop-blur-sm">
          <div
            className="h-1.5 w-auto max-w-50 rounded-full bg-linear-to-r from-emerald-500 to-green-400"
            style={{ width: `${Math.round((result.score / (result.total ?? 1)) * 100)}%` }}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-1">
        <span className="text-black/30 text-xs">
          {result.taken_at
            ? new Date(result.taken_at).toLocaleDateString("en-GB", {
                day: "numeric", month: "short", year: "numeric",
              })
            : "—"}
        </span>
        <span
          className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
            result.score / (result.total ?? 1) >= 0.5
              ? "bg-emerald-500/20 text-emerald-400"
              : "bg-red-500/20 text-red-400"
          }`}
        >
          {result.score / (result.total ?? 1) >= 0.5 ? "Passed" : "Failed"}
        </span>
      </div>
    </div>
  )
}

function StatBadge({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex flex-col gap-2.5 rounded-xl border border-gray-200 bg-mist-400 p-5">
      <p className="text-black/40 text-xs uppercase tracking-widest">{label}</p>
      <p className="text-black text-lg font-bold">{value}</p>
    </div>
  )
}

function ResultList({ promise }: { promise: Promise<any> }) {
  const data = use(promise)
  const results: Result[] = data.result ?? []

  if (results.length === 0) return (
    <p className="text-white/60 p-4">You haven&apos;t taken any tests yet.</p>
  )

  const avgScore = Math.round(
    results.reduce((acc, r) => acc + r.score / (r.total ?? 1), 0) / results.length * 100
  )
  const highestScore = Math.max(...results.map(r => r.score))
  const totalAttempts = results.length
  const passed = results.filter(r => r.score / (r.total ?? 1) >= 0.5).length

  return (
    <div className="w-full p-4 md:p-6 bg-white">

      {/* Label */}
      <p className="text-[11px] font-medium uppercase tracking-widest text-black">
        Result History
      </p>

      {/* Tier 1 — Result cards 2-col grid */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {results.map((result) => (
          <ResultCard key={result.id} result={result} />
        ))}
      </div>

      {/* Tier 2 — Stat badges 4-col */}
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatBadge label="Attempts" value={totalAttempts} />
        <StatBadge label="Avg Score" value={`${avgScore}%`} />
        <StatBadge label="Highest" value={highestScore} />
        <StatBadge label="Passed" value={passed} />
      </div>

      {/* Tier 3 — Summary row */}
      <div className="mt-2 rounded-xl border border-gray-100 bg-mist-400 p-5">
        <p className="text-[11px] font-medium uppercase tracking-widest text-black mb-4">
          Subject Breakdown
        </p>
        <div className="grid grid-cols-3 gap-6">
          {results.slice(0, 3).map((result) => (
            <div key={result.id} className="flex flex-col gap-1.5">
              <p className="text-black/50 text-xs capitalize">{result.subject}</p>
              <p className="text-black text-sm font-bold">{result.score}/{result.total}</p>
              <p className="text-black/30 text-xs">
                {Math.round((result.score / (result.total ?? 1)) * 100)}%
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

export default function ResultHistory() {
  const resultPromise = api.getResult();
  return (
    <Suspense fallback={<FallBackUI />}>
        <ResultList promise={resultPromise} />
    </Suspense>
  )
}