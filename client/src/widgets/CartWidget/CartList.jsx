import { useEffect, useState } from "react";
import { axiosInstance } from "../../shared/lib/axiosInstance";

export default function CartList({ user }) {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await axiosInstance.get(`/users/${user.id}/cart`);

        console.log("cart:", response.data);

        // наш сервис возвращает массив CartItems
        setCart(response.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [user]);

  async function handleRemove(itemId) {
    try {
      await axiosInstance.delete(`/cart/items/${itemId}`);

      setCart((prev) => prev.filter((item) => item.id !== itemId));
    } catch (error) {
      console.log(error);
    }
  }

  async function handleUpdateQuantity(itemId, newQuantity) {
    if (newQuantity < 1) return;

    try {
      await axiosInstance.patch(`/cart/items/${itemId}`, {
        quantity: newQuantity,
      });

      setCart((prev) =>
        prev.map((item) =>
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        )
      );
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <ul role="list" className="-my-6 divide-y divide-gray-200">
      {Array.isArray(cart) && cart.map((product) => {
        const design = product.design;

        return (
          <li key={product.id} className="flex py-6">
            {/* PREVIEW */}
            <div className="size-32 shrink-0 overflow-hidden rounded-md border border-gray-200">
              <img
                alt="preview"
                src={design.preview || "/placeholder.png"}
                className="size-full object-cover"
              />
            </div>

            {/* INFO */}
            <div className="ml-4 flex flex-1 flex-col">
              <div>
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <h3>Носки</h3>
                </div>

                <p className="mt-1 text-sm text-gray-500">
                  Цвет: <span style={{ color: design.colorHex }}>{design.colorHex}</span>
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  Узор: {design.patternName || "нет"}
                </p>

                {design.patternColorHex && (
                  <p className="mt-1 text-sm text-gray-500">
                    Цвет узора:{" "}
                    <span style={{ color: design.patternColorHex }}>
                      {design.patternColorHex}
                    </span>
                  </p>
                )}

                {design.image && (
                  <p className="mt-1 text-sm text-gray-500">
                    Эмоджи: {design.image}
                  </p>
                )}
              </div>

              {/* QUANTITY + REMOVE */}
              <div className="flex flex-1 items-end justify-between text-sm mt-2">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      handleUpdateQuantity(product.id, product.quantity - 1)
                    }
                    className="px-2 py-1 bg-gray-200 rounded"
                  >
                    –
                  </button>

                  <span>{product.quantity} шт</span>

                  <button
                    onClick={() =>
                      handleUpdateQuantity(product.id, product.quantity + 1)
                    }
                    className="px-2 py-1 bg-gray-200 rounded"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => handleRemove(product.id)}
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Удалить
                </button>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
