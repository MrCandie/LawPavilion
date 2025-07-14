import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import Wrapper from "../../components/Wrapper";

export default function Dashboard() {
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    // mock api call
    setTimeout(() => {
      setMetrics({
        monthlyUsers: 1280,
        revenue: 563000,
        churnRate: 4.6,
        chartData: [
          { month: "Jan", users: 800 },
          { month: "Feb", users: 950 },
          { month: "Mar", users: 1100 },
          { month: "Apr", users: 1250 },
          { month: "May", users: 1280 },
        ],
      });
    }, 1000);
  }, []);

  if (!metrics) {
    return (
      <Wrapper>
        <div className="p-6 text-gray-600 dark:text-gray-300">
          Loading metrics...
        </div>
      </Wrapper>
    );
  }

  return (
    <Wrapper title="Home">
      <div className="space-y-6 text-gray-800 dark:text-gray-100">
        {/* Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Metric
            title="Monthly Users"
            text={metrics.monthlyUsers.toLocaleString()}
          />
          <Metric
            title="Monthly Revenue"
            text={`₦${metrics.revenue.toLocaleString()}`}
          />

          <Metric title="Churn Rate" text={`${metrics.churnRate}%`} />
        </div>

        {/* Chart */}
        <div className="p-4 bg-white dark:bg-gray-800 shadow rounded-lg">
          <h4 className="text-md font-semibold mb-4">Monthly Users Growth</h4>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={metrics.chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="users"
                stroke="#f97316"
                strokeWidth={2}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Wrapper>
  );
}

function Metric({ title, text }) {
  return (
    <div className="p-4 bg-white dark:bg-gray-800 shadow rounded-lg">
      <h4 className="text-sm font-medium">{title}</h4>
      <p className="text-2xl font-semibold">{text}</p>
    </div>
  );
}
