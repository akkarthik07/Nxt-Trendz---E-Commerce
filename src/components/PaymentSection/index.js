import {Component} from 'react'
import CartContext from '../../context/CartContext'
import './index.css'

const paymentOptionsList = [
  {
    id: 'CARD',
    displayText: 'Card',
    isDisabled: true,
  },
  {
    id: 'NET BANKING',
    displayText: 'Net Banking',
    isDisabled: true,
  },
  {
    id: 'UPI',
    displayText: 'UPI',
    isDisabled: true,
  },
  {
    id: 'WALLET',
    displayText: 'Wallet',
    isDisabled: true,
  },
  {
    id: 'CASH ON DELIVERY',
    displayText: 'Cash on Delivery',
    isDisabled: false,
  },
]

class PaymentSection extends Component {
  state = {
    paymentMethod: '',
    isOrderPlaced: false,
  }

  updatePaymentMethod = event => {
    const {id} = event.target
    this.setState({paymentMethod: id})
  }

  onPlaceOrder = () => {
    this.setState({isOrderPlaced: true})
  }

  getTotalPrice = cartList =>
    cartList.reduce((acc, item) => acc + item.quantity * item.price, 0)

  getTotalQuantity = cartList =>
    cartList.reduce((acc, item) => acc + item.quantity, 0)

  renderPaymentMethodsInput = () => (
    <ul className="payment-method-inputs">
      {paymentOptionsList.map(eachMethod => (
        <li key={eachMethod.id} className="payment-method-input-container">
          <input
            className="payment-method-input"
            id={eachMethod.id}
            type="radio"
            name="paymentMethod"
            disabled={eachMethod.isDisabled}
            onChange={this.updatePaymentMethod}
          />
          <label
            className={`payment-method-label ${
              eachMethod.isDisabled ? 'disabled-label' : ''
            }`}
            htmlFor={eachMethod.id}
          >
            {eachMethod.displayText}
          </label>
        </li>
      ))}
    </ul>
  )

  render() {
    const {paymentMethod, isOrderPlaced} = this.state

    return (
      <CartContext.Consumer>
        {value => {
          const {cartList} = value
          const totalPrice = this.getTotalPrice(cartList)
          const totalQuantity = this.getTotalQuantity(cartList)

          return (
            <div className="payment-container">
              {isOrderPlaced ? (
                <p className="success-message">
                  Your order has been placed successfully
                </p>
              ) : (
                <>
                  <h1 className="payment-heading">Payment Details</h1>
                  <p className="payment-sub-heading">Payment Method</p>
                  {this.renderPaymentMethodsInput()}
                  <div className="order-details">
                    <p className="payments-sub-heading">Order details:</p>
                    <p>Quantity: {totalQuantity}</p>
                    <p>Total Price: RS {totalPrice}/-</p>
                  </div>
                  <button
                    disabled={paymentMethod !== 'CASH ON DELIVERY'}
                    type="button"
                    className="confirm-order-button"
                    onClick={this.onPlaceOrder}
                  >
                    Confirm Order
                  </button>
                </>
              )}
            </div>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default PaymentSection
