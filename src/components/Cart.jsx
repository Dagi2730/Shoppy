import React, { useState } from 'react';
import { MdOutlineCancel } from 'react-icons/md';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import { useStateContext } from '../contexts/ContextProvider';
import { cartData } from '../data/dummy';
import { Button } from '.';

const Cart = () => {
  const { currentColor, setPlacedOrders, placedOrders } = useStateContext();
  const [quantities, setQuantities] = useState(cartData.map(() => 1));

  const handleQuantityChange = (index, type) => {
    const newQuantities = [...quantities];
    if (type === 'inc') newQuantities[index] += 1;
    else if (type === 'dec' && newQuantities[index] > 0) newQuantities[index] -= 1;
    setQuantities(newQuantities);
  };

  const getSubtotal = () =>
    cartData.reduce((acc, item, index) =>
      acc + parseFloat(item.price.replace('$', '')) * quantities[index], 0
    );

  const handlePlaceOrder = () => {
    const newOrders = cartData.map((item, index) => ({
      ...item,
      quantity: quantities[index],
      total: parseFloat(item.price.replace('$', '')) * quantities[index],
    }));
    setPlacedOrders([...placedOrders, ...newOrders]);
    alert('Order placed successfully!');
  };

  return (
    <div className="bg-half-transparent w-full fixed nav-item top-0 right-0">
      <div className="float-right h-screen dark:text-gray-200 dark:bg-[#484B52] bg-white md:w-400 p-8">
        <div className="flex justify-between items-center">
          <p className="font-semibold text-lg">Shopping Cart</p>
          <Button
            icon={<MdOutlineCancel />}
            color="rgb(153, 171, 180)"
            bgHoverColor="light-gray"
            size="2xl"
            borderRadius="50%"
          />
        </div>
        {cartData.map((item, index) => (
          <div key={index} className="flex items-center leading-8 gap-5 border-b-1 border-color dark:border-gray-600 p-4">
            <img className="rounded-lg h-80 w-24" src={item.image} alt={item.name} />
            <div>
              <p className="font-semibold">{item.name}</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm font-semibold">{item.category}</p>
              <div className="flex gap-4 mt-2 items-center">
                <p className="font-semibold text-lg">{item.price}</p>
                <div className="flex items-center border-1 border-color rounded">
                  <p className="p-2 border-r-1 text-red-600 cursor-pointer" onClick={() => handleQuantityChange(index, 'dec')}><AiOutlineMinus /></p>
                  <p className="p-2 border-r-1 text-green-600">{quantities[index]}</p>
                  <p className="p-2 text-green-600 cursor-pointer" onClick={() => handleQuantityChange(index, 'inc')}><AiOutlinePlus /></p>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="mt-3 mb-3">
          <div className="flex justify-between items-center">
            <p className="text-gray-500 dark:text-gray-200">Sub Total</p>
            <p className="font-semibold">${getSubtotal().toFixed(2)}</p>
          </div>
          <div className="flex justify-between items-center mt-3">
            <p className="text-gray-500 dark:text-gray-200">Total</p>
            <p className="font-semibold">${getSubtotal().toFixed(2)}</p>
          </div>
        </div>
        <div className="mt-5">
          <Button
            color="white"
            bgColor={currentColor}
            text="Place Order"
            borderRadius="10px"
            width="full"
            onClick={handlePlaceOrder}
          />
        </div>
      </div>
    </div>
  );
};

export default Cart;
