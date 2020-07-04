import * as actions from './actions';
import cartItems from './cart-items';

const initialStore = {
  cart: cartItems,
  total: 0,
  amount: 0,
};

export default function reducer(state = initialStore, action) {
  switch (action.type) {
    case actions.CLEAR_CART:
      return { ...state, cart: [] };
    case actions.DECREASE:
      let decreaseItem = state.cart.map((cartItem) => {
        if (cartItem.id === action.payload.id) {
          cartItem = { ...cartItem, amount: cartItem.amount - 1 };
        }
        return cartItem;
      });
      return { ...state, cart: decreaseItem };
    case actions.INCREASE:
      let increaseItem = state.cart.map((cartItem) => {
        if (cartItem.id === action.payload.id) {
          cartItem = { ...cartItem, amount: cartItem.amount + 1 };
        }
        return cartItem;
      });
      return { ...state, cart: increaseItem };
    case actions.REMOVE:
      return {
        ...state,
        cart: state.cart.filter((cartItem) => cartItem.id !== action.payload.id),
      };
    case actions.GET_TOTALS:
      let { total, amount } = state.cart.reduce(
        (cartTotal, cartItem) => {
          const { price, amount } = cartItem;
          const itemTotal = price * amount;
          cartTotal.total += itemTotal;
          cartTotal.amount += amount;
          return cartTotal;
        },
        { total: 0, amount: 0 },
      );
      total = parseFloat(total.toFixed(2));
      return { ...state, total, amount };
    case actions.TOGGLE_AMOUNT:
      return {
        ...state,
        cart: state.cart.map((cartItem) => {
          if (cartItem.id === action.payload.id) {
            if (action.payload.toggle === 'increase') {
              return (cartItem = { ...cartItem, amount: cartItem.amount + 1 });
            }
            if (action.payload.toggle === 'decrease') {
              return (cartItem = { ...cartItem, amount: cartItem.amount - 1 });
            }
          }
          return cartItem;
        }),
      };
    default:
      return state;
  }
}
