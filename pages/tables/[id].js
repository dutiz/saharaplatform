import axios from 'axios'
import Layout from '@/components/layout/Layout'
import styles from '../../styles/Order.module.css'

export default function tables({ table }) {
  return (
    <Layout title="Table">
      <div className="container">
        <div className="row my-5">
          <div className="col-12">
            <h1 className="text-xl">Table id {table._id}</h1>
            <h1 className="text-xl mt-5">Table No: {table.tableNo}</h1>
            <h1 className="text-xl mt-5">Customer Name: {table.customer}</h1>
            <h1 className="text-xl mt-5">Table Total: {table.total}</h1>
            <h1 className="text-xl mt-5">Ordered Products:</h1>
          </div>
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.row}>
          <table className={styles.table}>
            <tbody>
              <tr className={styles.trTitle}>
                <th>Product title</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Extras</th>
              </tr>
              {table.orderedProducts.map((product) => (
                <tr key={product._id} className={styles.tr}>
                  <td>
                    <span className={styles.id}>{product.title}</span>
                  </td>
                  <td>
                    <span className={styles.name}>{product.quantity}</span>
                  </td>
                  <td>
                    <span className={styles.address}>{product.price}</span>
                  </td>
                  <td>
                    {product.extras.map((extra) => (
                      <span key={extra._id} className={styles.total}>
                        {extra.text} ,
                      </span>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  )
}

export async function getServerSideProps({ params }) {
  const res = await axios.get(`http://localhost:3000/api/tables/${params.id}`)
  return {
    props: { table: res.data },
  }
}
