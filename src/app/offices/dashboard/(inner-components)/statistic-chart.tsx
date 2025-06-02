"use client"

import { useTheme } from 'next-themes'
import React from 'react'
import { Chart, AxisOptions } from 'react-charts'



const colors = ['#ff5733', '#3498db', '#2ecc71', '#f37c54']


export default function StatisticChart({ data }: { data: any[] }) {

    const { theme } = useTheme();


    const primaryAxis = React.useMemo<AxisOptions<any>>(
        () => ({
            getValue: datum => datum.month,
            scaleType: 'band',
        }),
        []
    )

    const secondaryAxes = React.useMemo<AxisOptions<any>[]>(
        () => [
            {
                getValue: datum => datum.value,
                elementType: 'line',

            },
        ],
        []
    )


    return (
        <div className="flex flex-col gap-2">
            <div className="flex flex-wrap gap-6 justify-between">
                {/* Légende */}
                <div className="mt-4 flex gap-6">
                    {data.map((series, i) => (
                        <div key={series.label} className="flex items-center gap-2">
                            <span
                                className="w-4 h-4 rounded-sm"
                                style={{ backgroundColor: colors[i % colors.length] }}
                            />
                            <span className="text-sm text-gray-700 dark:text-zinc-300">{series.label}</span>
                        </div>
                    ))}
                </div>
            </div>
            <div className="w-full h-[60dvh]">
                <Chart
                    options={{
                        data: data,
                        primaryAxis,
                        secondaryAxes,
                        // defaultColors: ['#f37c54'],
                        dark: theme === 'dark',
                        getSeriesStyle: (series) => {
                            const index = series.index ?? 0
                            return {
                                color: colors[index % colors.length],
                                fill: colors[index % colors.length],
                            }
                        }
                    }}
                />
            </div>
        </div>
    )
}
