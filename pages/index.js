import HeaderSection from '@/components/sections/HeaderSection'
import MenuSection from '@/components/sections/MenuSection'
import ServiceSection from '@/components/sections/ServiceSection'
import Layout from '@/layout/Layout'

export default function Home() {
  return (
    <Layout title="Home">
      {/* Header Section Example */}
      <HeaderSection />
      {/* Service Section  */}
      <ServiceSection />
      {/* Menu Section */}
      <MenuSection></MenuSection>
    </Layout>
  )
}
