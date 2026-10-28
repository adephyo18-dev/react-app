import React from 'react';
import './Counter.css';

function Counter({ count, setCount }) {

    const interval = React.useRef(null);

    function incrementCount() {
        setCount(count + 1);
    }

    function resetCount() {
        setCount(0);
    }


    function increment() {
        setCount(count + 1);
    }

    React.useEffect(() => {
        interval.current = setInterval(increment, 1000);
        return () => clearInterval(interval.current);
    }, [count]);

    return (
        <div className="counter-container">
        <button onClick={incrementCount} className="counter-button">
            Clicked {count} 
            {count <= 1 ? ' time' : ' times'}
        </button>
        <button onClick={resetCount} className="counter-button">
            Reset
        </button>
        <button className="counter-button" onClick={increment}>Auto Click</button>
        </div>
    );
}

export default Counter;