import HeaderSection from '@/components/sections/HeaderSection'
import ServiceSection from '@/components/sections/ServiceSection'
import Layout from '@/layout/Layout'

export default function Home() {
  return (
    <Layout title="Home">
      {/* Header Section Example */}
      <HeaderSection />
      {/* Service Section  */}
      <ServiceSection />
    </Layout>
  )
}
