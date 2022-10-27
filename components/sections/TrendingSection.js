import { useEffect, useState } from 'react'

import TrendingCard from '../TrendingCard'

export default function TrendingSection({ dailyOrdersFinded, order, p }) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])
  return mounted ? (
    <div className="col-4">
      <div className="bg-white rounded-md p-3">
        <h2 className="text-xl font-semibold">Daily Trending Menus</h2>
        <div className="row">
          <div className="col-12">
            {dailyOrdersFinded.length === 0 ? (
              <p className="my-5">There are no Products to show</p>
            ) : (
              <ul>
                {Object.entries(order)
                  .sort((a, b) => b[1] - a[1])
                  .map((count) =>
                    p.map(
                      (prod) =>
                        count[0] === prod._id && (
                          <TrendingCard key={count[0]} count={count} prod={prod} />
                        )
                    )
                  )}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div />
  )
}
