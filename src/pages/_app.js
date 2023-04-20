import { AuthProvider } from "../auth/AuthContext"
import Navigation from "@/components/navigation";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Navigation />
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;