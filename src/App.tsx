import { useState } from "react";
import ValentineCard from "./components/ValentineCard";
import Background from "./components/Background";
import SongQR from "./components/SongQR";

function App() {
  const [showQR, setShowQR] = useState(false);

  return (
    <>
      <Background />
      <ValentineCard onYes={() => setShowQR(true)} />
      {showQR && <SongQR />}
    </>
  );
}

export default App;
