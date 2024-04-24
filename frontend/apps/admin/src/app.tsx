import { Toaster } from "react-hot-toast";
import AppRouter from "./router/app.router";

function App() {
  return (
    <>
      <AppRouter />
      <Toaster position="top-center" reverseOrder={true} />
    </>
  );
}

export default App;
