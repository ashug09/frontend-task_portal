import "@/styles/globals.css";
import { Toaster } from "react-hot-toast";
import Nav_options from "./nav_options";
import "../../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState } from "react";
import Landing from "./landing";
import { useRouter } from "next/router";
import { PrimeReactProvider } from "primereact/api";

import "primereact/resources/themes/lara-light-cyan/theme.css";

export default function App({ Component, pageProps }) {
  const auth = getAuth();
  const router = useRouter();
  const [user, setUser] = useState(null);
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const uid = user.uid;
      sessionStorage.setItem("user", JSON.stringify(user));

      setUser(user);
      // ...
    } else {
      // User is signed out
      // ...
    }
  });
  if (user) {
    return (
      <>
        <div className="lg:mx-10">
          <PrimeReactProvider>
            <Nav_options />
            <Component {...pageProps} />
          </PrimeReactProvider>
          <Toaster />
        </div>
      </>
    );
  } else {
    return (
      <div>
        <Landing />
      </div>
    );
  }
}
