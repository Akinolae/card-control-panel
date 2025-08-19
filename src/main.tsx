import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Auth0Provider
    domain="dev-0fbgz5a4.us.auth0.com"
    clientId="rZToNbuwdgiR1NdTZQki6n0s6L8qVfA7"
    authorizationParams={{
      redirect_uri: "https://app.flexfinance.ai/",
    }}
  >
    <App />
  </Auth0Provider>
);
