import Product from 'models/Product'
import dbConnect from 'utils/mongo'

import HeaderSection from '@/components/sections/HeaderSection'
import MenuSection from '@/components/sections/MenuSection'
import ServiceSection from '@/components/sections/ServiceSection'
import Layout from '@/layout/Layout'

export default function Home({ menuList }) {
  return (
    <Layout title="Home">
      {/* Header Section Example */}
      <HeaderSection />
      {/* Service Section  */}
      <ServiceSection />
      {/* Menu Section */}
      <MenuSection menuList={menuList}></MenuSection>
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
