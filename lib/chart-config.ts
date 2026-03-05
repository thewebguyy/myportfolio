import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler,
    RadialLinearScale,
} from 'chart.js'

let registered = false

export const registerChartComponents = () => {
    if (registered) return

    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        BarElement,
        Title,
        Tooltip,
        Legend,
        Filler,
        RadialLinearScale
    )

    registered = true
}
