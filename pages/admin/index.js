import Chart from 'react-google-charts'

import DashboardCart from '@/components/DashboardCart'
import Admin from '@/components/layout/Admin'

export const HistogramData = [
  ['Dinosaur', 'Length'],
  ['Acrocanthosaurus (top-spined lizard)', 0.3],
  ['Albertosaurus (Alberta lizard)', 0.9],
  ['Allosaurus (other lizard)', 7.5],
  ['Apatosaurus (deceptive lizard)', 0.9],
  ['Archaeopteryx (ancient wing)', 0.9],
  ['Argentinosaurus (Argentina lizard)', 36.6],
  ['Baryonyx (heavy claws)', 9.1],
  ['Brachiosaurus (arm lizard)', 30.5],
  ['Ceratosaurus (horned lizard)', 6.1],
  ['Coelophysis (hollow form)', 2.7],
  ['Compsognathus (elegant jaw)', 0.9],
  ['Deinonychus (terrible claw)', 2.7],
  ['Diplodocus (double beam)', 27.1],
  ['Dromicelomimus (emu mimic)', 3.4],
  ['Gallimimus (fowl mimic)', 5.5],
  ['Mamenchisaurus (Mamenchi lizard)', 21.0],
  ['Megalosaurus (big lizard)', 7.9],
  ['Microvenator (small hunter)', 1.2],
  ['Ornithomimus (bird mimic)', 4.6],
  ['Oviraptor (egg robber)', 1.5],
  ['Plateosaurus (flat lizard)', 7.9],
  ['Sauronithoides (narrow-clawed lizard)', 2.0],
  ['Seismosaurus (tremor lizard)', 45.7],
  ['Spinosaurus (spiny lizard)', 12.2],
  ['Supersaurus (super lizard)', 30.5],
  ['Tyrannosaurus (tyrant lizard)', 15.2],
  ['Ultrasaurus (ultra lizard)', 30.5],
  ['Velociraptor (swift robber)', 1.8],
]

export const HistogramOptions = {
  title: 'Earnings',
  legend: { position: 'none' },
  colors: ['#4285F4'],
  chartArea: { width: 401 },
  hAxis: {
    ticks: [-1, -0.75, -0.5, -0.25, 0, 0.25, 0.5, 0.75, 1],
  },
  bar: { gap: 0 },
  histogram: {
    bucketSize: 5,
    maxNumBuckets: 200,
    minValue: 0,
    maxValue: 30,
  },
}
export const PieData = [
  ['Pizza', 'Popularity'],
  ['Pepperoni', 34],
  ['Hawaiian', 30],
  ['Mushroom', 22],
  ['Sausage', 10], // Below limit.
  ['Anchovies', 9], // Below limit.
  ['PiePorch', 14],
]

export const PieOptions = {
  title: 'Popularity of Types of Pizza',
  sliceVisibilityThreshold: 0.1, // 20%
}

export default function index({ products, orders }) {
  return (
    <Admin title="Dashboard Admin - Next">
      <div className="row">
        <div className="col-12">
          <h3 className="text-xl font-semibold text-red-500">Dashboard</h3>
          <p className="mt-5">Welcome to Sahara Admin!</p>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-6">
          <Chart
            chartType="Histogram"
            width="100%"
            height="400px"
            data={HistogramData}
            options={HistogramOptions}
          />
        </div>
        <div className="col-6">
          <div className="row">
            <DashboardCart />
            <DashboardCart />
            <DashboardCart />
            <DashboardCart />
          </div>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-6">
          <div className="bg-gray-300">
            <h3 className="text-xl font-semibold text-red-500"> Orders Summary</h3>
            <Chart
              chartType="PieChart"
              data={PieData}
              options={PieOptions}
              width={'100%'}
              height={'400px'}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <p className="text-lg">Orders</p>
            {orders.map((order) => (
              <p key={order._id}>{order.customer}</p>
            ))}
          </div>
        </div>
      </div>
      <div className="col-6">
        <p className="text-lg">Products</p>
        {products.map((product) => (
          <p key={product._id}>{product.title}</p>
        ))}
      </div>
    </Admin>
  )
}
export async function getServerSideProps(ctx) {
  const myCookie = ctx.req?.cookies || ''

  if (myCookie.token !== process.env.TOKEN) {
    return {
      redirect: {
        destination: '/admin/login',
        permanent: false,
      },
    }
  }
  const menuOrders = await fetch('http://sahara-food.netlify.app/api/orders')
  const menuProducts = await fetch('http://sahara-food.netlify.app/api/products')

  const ordersData = await menuOrders.json()
  const productsData = await menuProducts.json()

  return {
    props: {
      orders: ordersData,
      products: productsData,
    },
  }
}
