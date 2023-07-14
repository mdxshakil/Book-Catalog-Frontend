import { useEffect } from "react";
import MainLayout from "./layout/MainLayout";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { setLoading, setUser } from "./redux/features/auth/authSlice";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/firebase";
import Spinner from "./components/Spinner";
import { Toaster } from "react-hot-toast";

function App() {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(setLoading(true));
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser(user?.email));
        dispatch(setLoading(false));
      } else {
        dispatch(setLoading(false));
      }
    });
  }, [dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <Toaster />
      <MainLayout />
    </>
  );
}

export default App;
