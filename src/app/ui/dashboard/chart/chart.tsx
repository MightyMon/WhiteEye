'use client'
import styles from "./chart.module.css"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
    {
      name: 'Day 1',
      uv: 4,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Day 2',
      uv: 3,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Day 3',
      uv: 2,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page 4',
      uv: 2,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page 5',
      uv: 1,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page 6',
      uv: 2,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Page 7',
      uv: 3,
      pv: 4300,
      amt: 2100,
    },
  ];

const Chart = () => {
    
    return(
        <div className={styles.container}>
            <h2 className={styles.title}>Daily usage</h2>
            <ResponsiveContainer width="90%" height="100%" >
        <AreaChart
          width={500}
          height={400}
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
        </AreaChart>
      </ResponsiveContainer>
        </div>
    )
}

export default Chart