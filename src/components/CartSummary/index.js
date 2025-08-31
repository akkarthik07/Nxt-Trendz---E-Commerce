// Write your code here
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'

import CartContext from '../../context/CartContext'
import PaymentSection from '../PaymentSection'
import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      let total = 0
      let totalItems = 0
      cartList.forEach(eachCartItem => {
        total += eachCartItem.price * eachCartItem.quantity
        totalItems += eachCartItem.quantity
      })

      return (
        <>
          <div className="cart-summary-container">
            <h1 className="order-total-value">
              <span className="order-total-label">Order Total: </span> Rs{' '}
              {total}
              /-
            </h1>
            <p className="total-items">{cartList.length} Items in cart</p>

            {/* Popup code */}
            <Popup
              modal
              overlayStyle={{background: 'rgba(0,0,0,0.4)'}}
              contentStyle={{
                padding: 0,
                border: 'none',
                background: 'transparent',
                width: '100%',
                maxWidth: '600px', // make it wider (try 600–700px)
                borderRadius: '12px',
              }}
              trigger={
                <button type="button" className="checkout-button">
                  Checkout
                </button>
              }
            >
              {close => (
                <PaymentSection
                  close={close}
                  total={total}
                  totalItems={totalItems}
                />
              )}
            </Popup>
          </div>
        </>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
