import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../../firebase/config";
import { authSlice } from "./authReducer";

const authRegistration =
  ({ login, email, password, photo }) =>
  async (dispatch, getState) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(auth.currentUser, {
        displayName: login,
        photoURL: photo,
      });

      const { displayName, uid, photoURL } = await auth.currentUser;

      dispatch(
        authSlice.actions.updateUserProfile({
          userId: uid,
          nickname: displayName,
          userPhoto: photoURL,
          email,
        })
      );
    } catch (error) {
      console.error(error);
      console.error(error.message);
    }
  };
  
const authLogin =
  ({ email, password }) =>
      async (dispatch, getState) => {
       try {
         const { user } = await signInWithEmailAndPassword(
           auth,
           email,
           password
         );
       } catch (error) {
        console.error(error);
        console.error(error.message);
       }
  };
const authLogout = () => async (dispatch, getState) => {
    try {
      await signOut(auth);
      dispatch(authSlice.actions.authSignOut());
    } catch (error) {
      console.error(error);
      console.error(error.message);
    }
 };

const authStateChangeUser = () => async (dispatch, getState) => {
  await auth.onAuthStateChanged((user) => {
    const { displayName, uid, photoURL, email } = auth.currentUser;
    if (user) {
      dispatch(
        authSlice.actions.updateUserProfile({
          userId: uid,
          nickname: displayName,
          userPhoto: photoURL,
          email: email,
        })
      );
      dispatch(authSlice.actions.authStateChange({ stateChange: true }));
    }
  });
};

export { authRegistration, authLogin, authLogout, authStateChangeUser };
