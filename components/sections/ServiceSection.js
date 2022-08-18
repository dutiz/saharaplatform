import site from '../../content/site'
import ServiceItem from '../ServiceItem'

export default function ServiceSection() {
  return (
    <div className="container py-24">
      <div className="row">
        <div className="col-12">
          <h1 className="font-extrabold text-center text-5xl">Best way to eat healthy</h1>
        </div>
      </div>
      <div className="row mt-20">
        {site.services.map((service, index) => {
          return (
            <ServiceItem key={index} svg={service.svg} title={service.title}>
              {service.description}
            </ServiceItem>
          )
        })}
      </div>
    </div>
  )
}
