import { createBrowserRouter } from "react-router-dom";
import PersonasView from '../pages/persona'

export const Router = createBrowserRouter([
  {
    path: "/",
    element: <PersonasView />,
    errorElement: <div>Not found</div>
  }
]);