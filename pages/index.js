import axios from 'axios'

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
  const res = await axios.get('http://sahara-food.netlify.app/api/products')
  return {
    props: {
      menuList: res.data,
    },
  }
}
