import React, { useEffect, useState } from "react";
import api from "../../api";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState("");
  const [itemToRemove, setItemToRemove] = useState(null);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await api.get("/cart");
        setCartItems(response.data);
      } catch (error) {
        setError("Error fetching cart items. Are u registered?");
      }
    };

    fetchCartItems();
  }, []);

  const handleRemoveFromCart = async () => {
    try {
      await api.delete(`/cart/remove-from-cart/${itemToRemove}`);
      setCartItems(cartItems.filter((item) => item.plantId._id !== itemToRemove));
      setItemToRemove(null);
    } catch (error) {
      setError("Error removing item from cart");
    }
  };

  const totalPrice = cartItems.reduce((total, item) => total + item.plantId.price * item.quantity, 0);

  return (
    <div className="container mt-5">
      <br></br>
      <h1>My Cart</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.plantId._id}>
                  <td>{item.plantId.name}</td>
                  <td>{item.quantity}</td>
                  <td>${item.plantId.price}</td>
                  <td>${item.plantId.price * item.quantity}</td>
                  <td>
                    <button
                      onClick={() => setItemToRemove(item.plantId._id)}
                      className="btn btn-danger btn-sm"
                      data-bs-toggle="modal"
                      data-bs-target="#removeItemModal"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
        </>
      )}

      {/* Remove Item Modal */}
      <div className="modal fade" id="removeItemModal" tabIndex="-1" aria-labelledby="removeItemModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="removeItemModalLabel">Remove Item</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              Are you sure you want to remove this item from your cart?
              {error && <div className="alert alert-danger mt-2">{error}</div>}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={handleRemoveFromCart}>
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;