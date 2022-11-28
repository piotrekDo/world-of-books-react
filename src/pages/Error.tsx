import { useRouteError } from "react-router-dom";
import Navigation from "../components/Navigation";

function ErrorPage() {
    const error: any = useRouteError();
  
    return (
      <>
        <Navigation />
        <main id="error-content">
          <h1>An error occurred!</h1>
          <p>{error.statusText}</p>
        </main>
      </>
    );
  }
  
  export default ErrorPage;