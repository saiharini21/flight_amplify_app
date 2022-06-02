import "@aws-amplify/ui-react/styles.css";
import {
  withAuthenticator,
  Button
} from "@aws-amplify/ui-react";
import "./style.css"
import {
  BrowserRouter,
  Routes,
  Route, Navigate
} from "react-router-dom";
import Form from "./Form";
import Find from "./Find";

function App({signOut}) {
  return (
    <div>
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Form />} />
          <Route path="/display" element={<Find />} />
          <Route
            path="*"
            element={<Navigate to="/" replace />}
          />
        </Routes>
      </BrowserRouter>

    </div>
          <Button onClick={signOut}>Sign Out</Button>
          </div>


  );
}

export default (App);