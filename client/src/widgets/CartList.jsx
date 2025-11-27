import { useEffect, useState } from 'react';
import { axiosInstance } from '../shared/lib/axiosInstance';

export default function CartList({ user }) {
  const [cart, setCart] = useState([]);
  

  useEffect(() => {
    (async () => {
      try {
        const response = await axiosInstance.get(`/users/${user.id}/cart`);
        console.log(response.data.cart.items);

        setCart(response.data.cart.items);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [user]);

  return (
    <ul role="list" className="-my-6 divide-y divide-gray-200">
      {cart.map((product) => (
        <li key={product.id} className="flex py-6">
          <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
            <img
              alt='image'
              src={'bla'}
              className="size-full object-cover"
            />
          </div>

          <div className="ml-4 flex flex-1 flex-col">
            <div>
              <div className="flex justify-between text-base font-medium text-gray-900">
                <h3>
                  <a href={product.href}>{product.id}</a>
                </h3>
                <p className="ml-4">{product.quantity}</p>
              </div>
              <p className="mt-1 text-sm text-gray-500">{product.design.color_id}</p>
            </div>
            <div className="flex flex-1 items-end justify-between text-sm">
              <p className="text-gray-500">Qty {product.quantity}</p>

              <div className="flex">
                <button
                  type="button"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
