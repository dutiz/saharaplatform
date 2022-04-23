import Button from '../Button'

export default function HeaderSection() {
  return (
    <div
      style={{
        background: `url('./images/header-img.png') no-repeat center center / cover`,
        height: '750px',
      }}
      className="flex items-center"
    >
      <div className="container py-10">
        <div className="row justify-end">
          <div className="col-6">
            <h1 className="font-extrabold text-6xl">Meet , Eat , Enjoy the true taste</h1>
            <p className="mt-5 font-sansserif">
              Making a resevation is easy and takes just a couple of minutes
            </p>
            <Button islink className="mt-4" href="/about">
              Our Menu
            </Button>
            
          </div>
        </div>
      </div>
    </div>
  )
}
