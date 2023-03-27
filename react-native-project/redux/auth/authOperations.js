import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../../firebase/config";
import { authSlice } from "./authReducer";
const { updateUserProfile, authSignOut, authStateChange } = authSlice.actions;


const authRegistration =
  ({ login, email, password, userPhoto }) =>
  async (dispatch, getState) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(auth.currentUser, {
        displayName: login,
        photoURL: userPhoto,
      });

      const { displayName, uid, photoURL } = await auth.currentUser;

      dispatch(
        updateUserProfile({
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
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error(error);
      console.error(error.message);
    }
    };
  
const authLogout = () => async (dispatch, getState) => {
  try {
    await signOut(auth);
    dispatch(authSignOut());
  } catch (error) {
    console.error(error);
    console.error(error.message);
  }
};

const authStateChangeUser = () => async (dispatch, getState) => {
  await onAuthStateChanged(auth, (user) => {
    const { displayName, uid, photoURL, email } = auth.currentUser;
    if (user) {
      dispatch(
        updateUserProfile({
          userId: uid,
          nickname: displayName,
          userPhoto: photoURL,
          email: email,
        })
      );
      dispatch(authStateChange({ stateChange: true }));
    }
  });
};

export { authRegistration, authLogin, authLogout, authStateChangeUser };
