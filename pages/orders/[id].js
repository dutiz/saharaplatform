import axios from 'axios'
import Image from 'next/image'
import dbConnect from 'utils/mongo'

import Layout from '@/components/layout/Layout'

import styles from '../../styles/Order.module.css'

export default function Order({ order }) {
  const status = order.status
  const statusClass = (index) => {
    if (index - status < 1) return styles.done
    if (index - status === 1) return styles.inProgress
    if (index - status > 1) return styles.undone
  }
  return (
    <Layout title="Order">
      <div className={styles.container}>
        <div className={styles.left}>
          <div className={styles.row}>
            <table className={styles.table}>
              <tbody>
                <tr className={styles.trTitle}>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Address</th>
                  <th>Total</th>
                </tr>
                <tr className={styles.tr}>
                  <td>
                    <span className={styles.id}>{order._id}</span>
                  </td>
                  <td>
                    <span className={styles.name}>{order.customer}</span>
                  </td>
                  <td>
                    <span className={styles.address}>{order.address}</span>
                  </td>
                  <td>
                    <span className={styles.total}>$ {order.total}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          \
          <div className={styles.row}>
            <div className={statusClass(0)}>
              <Image src="/images/paid.png" width={30} height={30} alt="" />
              <span>Payment</span>
              <div className={styles.checkedIcon}>
                <Image
                  className={styles.checkedIcon}
                  src="/images/checked.png"
                  width={20}
                  height={20}
                  alt=""
                />
              </div>
            </div>
            <div className={statusClass(1)}>
              <Image src="/images/bake.png" width={30} height={30} alt="" />
              <span>Preparing</span>
              <div className={styles.checkedIcon}>
                <Image
                  className={styles.checkedIcon}
                  src="/images/checked.png"
                  width={20}
                  height={20}
                  alt=""
                />
              </div>
            </div>
            <div className={statusClass(2)}>
              <Image src="/images/bike.png" width={30} height={30} alt="" />
              <span>On the way</span>
              <div className={styles.checkedIcon}>
                <Image
                  className={styles.checkedIcon}
                  src="/images/checked.png"
                  width={20}
                  height={20}
                  alt=""
                />
              </div>
            </div>
            <div className={statusClass(3)}>
              <Image src="/images/delivered.png" width={30} height={30} alt="" />
              <span>Delivered</span>
              <div className={styles.checkedIcon}>
                <Image
                  className={styles.checkedIcon}
                  src="/images/checked.png"
                  width={20}
                  height={20}
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.wrapper}>
            <h2 className={styles.title}>CART TOTAL</h2>
            <div className={styles.totalText}>
              <b className={styles.totalTextTitle}>Subtotal:</b>${order.total}
            </div>
            <div className={styles.totalText}>
              <b className={styles.totalTextTitle}>Discount:</b>$0.00
            </div>
            <div className={styles.totalText}>
              <b className={styles.totalTextTitle}>Total:</b>${order.total}
            </div>
            <button disabled className={styles.button}>
              {order.method === 0 ? 'CASH' : 'PAID'}
            </button>
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
              {order.orderedProducts.map((product) => (
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
  try {
    await dbConnect()
    const res = await axios.get(`https://sahara-food.netlify.app/api/orders/${params.id}`)
    return {
      props: {
        order: res.data,
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
