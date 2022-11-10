export default function OrderedProductsSection({ orderedProducts }) {
  return (
    <div className="row">
      <div className="col-12">
        <h2 className="text-lg my-4">Ordered Products: </h2>
        <table className="w-full text-left">
          <tbody>
            <tr className="bg-gray-300">
              <th className="px-6 py-5 text-xl">Product</th>
              <th className="px-6 py-5 text-xl">Price</th>
              <th className="px-6 py-5 text-xl">Quantity</th>
              <th className="px-6 py-5 text-xl">Total</th>
            </tr>
            {orderedProducts.map((Orproduct) => (
              <tr key={Orproduct._id}>
                <td className="py-4 flex items-center">
                  <p className="ml-6 text-xl">{Orproduct.title}</p>
                </td>
                <td className="px-6 text-xl font-semibold">
                  {new Intl.NumberFormat("en-US", {
                    style: 'currency',
                    currency: 'USD',
                  }).format(Orproduct.price)}
                </td>
                <td className="px-6 text-xl">{Orproduct.quantity}</td>
                <td className="px-6 text-xl font-semibold">
                  {new Intl.NumberFormat("en-US", {
                    style: 'currency',
                    currency: 'USD',
                  }).format(Orproduct.price * Orproduct.quantity)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
