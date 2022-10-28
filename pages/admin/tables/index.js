import axios from 'axios'
import Link from 'next/link'
import SVG from 'react-inlinesvg'

import Admin from '@/components/layout/Admin'

export default function tables({ tables }) {
  return (
    <Admin title="Tables">
      <div className="row">
        <div className="col-12">
          <h1 className="font-bold text-3xl">Tables</h1>
        </div>
      </div>
      <div className="row mt-5">
        {tables.map((table) => (
          <div className="col-3" key={table._id}>
            <Link href={`/admin/tables/${table._id}`} legacyBehavior>
              <a className="inline-block ">
                <SVG src="/svg/table.svg" className=" w-10 h-10" />
              </a>
            </Link>
          </div>
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
  const res = await axios.get('http://localhost:3000/api/tables')
  return {
    props: {
      tables: res.data,
    },
  }
}
