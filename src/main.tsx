import ReactDOM from 'react-dom/client'

import { RouterProvider } from "react-router-dom";
import router from "./pages/router";
import GlobalStylesWrapper from "./styles/global";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <RouterProvider router={router} />
    <GlobalStylesWrapper />
  </>,
)
