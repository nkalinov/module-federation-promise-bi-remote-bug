import LocalButton from "./Button";
import React from "react";

import RemoteButton from "app2/Button";
import RemoteTest from "app2/Test";

const App = () => (
  <div>
    <h1>Bi-Directional</h1>
    <h2>App 1</h2>
    <LocalButton />
    <RemoteButton />
    <hr />
    <RemoteTest />
  </div>
);

export default App;
