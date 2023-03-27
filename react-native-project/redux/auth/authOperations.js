import db from "../../firebase/config";
// import {
//   createUserWithEmailAndPassword,
//   updateProfile,
//   signInWithEmailAndPassword,
//   signOut,
// } from "firebase/auth";
// import { auth } from "../../firebase/config";
import { authSlice } from "./authReducer";
const { updateUserProfile, authSignOut, authStateChange } = authSlice.actions;


const authRegistration =
  ({ login, email, password, userPhoto }) =>
  async (dispatch, getState) => {
    try {
      // await createUserWithEmailAndPassword(auth, email, password);
      await db.auth().createUserWithEmailAndPassword(email, password);

      const user = await db.auth().currentUser;

      // await updateProfile(auth.currentUser, {
      //   displayName: login,
      //   photoURL: photo,
      // });

      await user.updateProfile({
        displayName: login,
        photoURL: photo,
      });

      // const { displayName, uid, photoURL } = await auth.currentUser;

      const { uid, displayName, photoURL } = await db.auth().currentUser;

      // dispatch(
      //   authSlice.actions.updateUserProfile({
      //     userId: uid,
      //     nickname: displayName,
      //     userPhoto: photoURL,
      //     email,
      //   })
      // );

      dispatch(
        updateUserProfile({
          userId: uid,
          nickname: displayName,
          email,
          userPhoto: photoURL,
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
      const user = await db.auth().signInWithEmailAndPassword(email, password);
      // const { user } = await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error(error);
      console.error(error.message);
    }
    };
  
const authLogout = () => async (dispatch, getState) => {
  try {
    await db.auth().signOut();
    dispatch(authSignOut());
    // await signOut(auth);
    // dispatch(authSlice.actions.authSignOut());
  } catch (error) {
    console.error(error);
    console.error(error.message);
  }
};

const authStateChangeUser = () => async (dispatch, getState) => {
  // await auth.onAuthStateChanged((user) => {
  //   const { displayName, uid, photoURL, email } = auth.currentUser;
  //   if (user) {
  //     dispatch(
  //       authSlice.actions.updateUserProfile({
  //         userId: uid,
  //         nickname: displayName,
  //         userPhoto: photoURL,
  //         email: email,
  //       })
  //     );
  //     dispatch(authSlice.actions.authStateChange({ stateChange: true }));
  //   }
  // });
   await db.auth().onAuthStateChanged((user) => {
     if (user) {
       updateUserProfile({
         userId: user.uid,
         nickname: user.displayName,
         email: user.email,
         userPhoto: user.photoURL,
       });

       dispatch(authStateChange({ stateChange: true }));
     }
   });
};

export { authRegistration, authLogin, authLogout, authStateChangeUser };
