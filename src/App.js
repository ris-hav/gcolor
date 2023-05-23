import React, { useState, useEffect } from "react";
import SingleColor from "./SingleColor";

import Values from "values.js";

function App() {
  const [color, setColor] = useState("");
  const [error, setError] = useState(false);
  const [list, setList] = useState(new Values("#a07e7e").all(10));

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      let colors = new Values(color).all(10);
      setList(colors);
    } catch (error) {
      setError(true);
      console.log(error);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setError(false);
    }, 200);
    return () => clearTimeout(timeout);
  }, [color]);

  useEffect(() => {
    document.getElementById("next").style.backgroundColor = "black";
  }, []);

  return (
    <>
      <section className="container">
        <h3>color generator</h3>
        <input
          id="next"
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          style={{ backgroundColor: color, width: 42, height: 42, padding: 0 }}
        />
        <div class="color-preview" style={{ backgroundColor: color }}></div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            placeholder="#a07e7e"
            className={error && "error"}
          />
          <button
            className="btn"
            type="submit"
            style={{ backgroundColor: color }}
          >
            submit
          </button>
        </form>
      </section>
      <section className="colors">
        {list.map((color, index) => {
          return (
            <SingleColor key={index} {...color} index={index} hex={color.hex} />
          );
        })}
      </section>
    </>
  );
}

export default App;
