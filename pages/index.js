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
  await dbConnect()
  const res = await fetch('http://localhost:3000/api/products')
  const data = await res.json()
  return {
    props: {
      menuList: data,
    },
  }
}
