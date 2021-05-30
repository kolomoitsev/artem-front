import React from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import Title from "./Title.components";

const Chart = ({ registrations, subscriptions }) => {
  const data = [
    ...registrations.map((register) => {
      return {
        name: new Date(register.date).toDateString(),
        registrations: register.registrations_count,
      };
    }),
  ];

  const data2 = [
    ...subscriptions.map((subscription) => {
      return {
        name: new Date(subscription.date).toDateString(),
        subscriptions: subscription.subscriptions_count,
      };
    }),
  ];

  return (
    <React.Fragment>
      <Title>Stats on chart</Title>
      <ResponsiveContainer>
        <LineChart margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Line
            data={data}
            type="monotone"
            dataKey="registrations"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          <Line
            data={data2}
            type="monotone"
            dataKey="subscriptions"
            stroke="#82ca9d"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
};

export default Chart;
