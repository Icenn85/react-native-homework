import React, { useEffect, useState } from "react";
import { useRoute } from "../router";
import { NavigationContainer } from "@react-navigation/native";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config";
import { useDispatch, useSelector } from "react-redux";
import { authStateChangeUser } from "../redux/auth/authOperations";

export const Main = () => {
    const [user, setUser] = useState(null);

    const { stateChange } = useSelector((state) => state.auth);
    
    const dispatch = useDispatch();
    
  useEffect(() => {
    dispatch(authStateChangeUser());
  }, []);
    
    onAuthStateChanged(auth, (user) => setUser(user));
    
  const routing = useRoute(stateChange);

  return <NavigationContainer>{routing}</NavigationContainer>;
};