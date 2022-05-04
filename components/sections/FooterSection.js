import SVG from 'react-inlinesvg'

export default function FooterSection() {
  return (
    <>
      <div className="bg-blue-100">
        <div className="container py-11">
          <div className="row">
            <div className="flex flex-col items-center order-last my-10 lg:col-4 lg:my-0 md:items-start md:order-none">
              <SVG src="./svg/logo.svg" className="w-20 h-auto" />
            </div>
            <div className="lg:col-4 md:col-6 md:mt-0">
              <h1 className="mb-5 font-semibold text-3xl">Contact Us</h1>
              <div className="flex flex-col space-y-5">
                <div className="inline-flex items-center">
                  <SVG src="./svg/location.svg" className="w-6 h-6 mr-3" />
                  <p className="text-sm">Street 57 , Gostivar</p>
                </div>
                <div className="inline-flex items-center">
                  <SVG src="./svg/phone.svg" className="w-6 h-6 mr-3" />
                  <p className="text-sm">+389 77 777777</p>
                </div>
                <div className="inline-flex items-center">
                  <SVG src="./svg/mail.svg" className="w-6 h-6 mr-3" />
                  <p className="text-sm">em23@gmail.com</p>
                </div>
              </div>
            </div>
            <div className="lg:col-4 md:col-6 mt-8 md:mt-0">
              <h1 className="font-semibold text-3xl mb-5 ">Delivery Time</h1>
              <div className="flex flex-row">
                <div className="flex flex-col">
                  <SVG src="./svg/clock.svg" className="w-6 h-6 mr-3" />
                </div>
                <div className="flex flex-col space-y-5">
                  <p className="text-sm ">Mon to Fri : 10am to 15 am</p>
                  <p className="text-sm mt-5">Sat : 8am to 13am</p>
                  <p className="text-sm mt-5">Sun : Holiday</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-red-500">
        <div className="container py-8">
          <div className="row">
            <p className="text-white text-sm md:text-base">
              &copy; 2022 Sahara Platform , All Rights Reservered , UpHigh Dev.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
