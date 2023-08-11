import React from "react";
import "../styles.scss";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "../features/counterSlice";

const App = () => {
  const counter = useSelector((state) => state.counter);
  const dispatch = useDispatch();

  const handleIncrement = () => {
    dispatch(increment());
  };

  const handleDecrement = () => {
    dispatch(decrement());
  };

  return (
    <div className="app">
      <div>Counter: {counter}</div>
      <button onClick={handleIncrement}>Increment</button>
      <button onClick={handleDecrement}>Decrement</button>
    </div>
  );
};

export default App;
