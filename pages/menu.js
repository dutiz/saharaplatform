import Product from 'models/Product'
import dbConnect from 'utils/mongo'

import Layout from '@/components/layout/Layout'
import MenuItem from '@/components/MenuItem'

export default function menu({ menuList }) {
  return (
    <Layout title="Menu">
      <div className="bg-blue-100">
        <div className="container py-16">
          <div className="row">
            <div className="col-12">
              <h1 className="text-center text-white font-extrabold text-5xl">Menu</h1>
            </div>
          </div>
          <div className="row">
            {menuList.map((menu) => (
              <MenuItem key={menu._id} menu={menu} href={`/products/${menu._id}`} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export async function getServerSideProps() {
  try {
    await dbConnect()
    const res = await Product.find()
    return {
      props: {
        menuList: JSON.parse(JSON.stringify(res)),
      },
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error)
    return {
      notFound: true,
    }
  }
}
