import { useAuth } from "context/auth-context";
import { UnauthenticatedApp } from "unauthenticated-app";
import { AuthenticatedApp } from "authenticated-app";
import { ErrorBoundary } from "components/error-boundary";
import { FullPageErrorFallback } from "components/lib";
import "App.css";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  const { user } = useAuth();
  return (
    <Router>
      <div className="App">
        <ErrorBoundary fallbackRender={FullPageErrorFallback}>
          {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
        </ErrorBoundary>
      </div>
    </Router>
  );
}

export default App;
