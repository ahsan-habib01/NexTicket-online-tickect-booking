import { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { auth } from './../Firebase/firebase.config';
import { userAPI } from '../utils/api'; // 🆕 Import userAPI

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🆕 Helper function to save user to MongoDB
  const saveUserToDB = async userData => {
    try {
      const response = await userAPI.saveUser({
        name: userData.displayName || userData.name,
        email: userData.email,
        photoURL:
          userData.photoURL || 'https://i.ibb.co/album/default-avatar.png',
      });
      console.log('✅ User saved to MongoDB:', response);
      return response;
    } catch (error) {
      console.error('❌ Error saving user to MongoDB:', error);
      // Don't throw error - allow authentication to continue even if DB save fails
    }
  };

  const createUser = async (email, password) => {
    setLoading(true);
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      return result;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const profileUpdate = async (displayName, photoURL) => {
    setLoading(true);
    try {
      await updateProfile(auth.currentUser, { displayName, photoURL });

      // Update React context user state
      const updatedUser = {
        ...auth.currentUser,
        displayName,
        photoURL,
      };
      setUser(updatedUser);

      // 🆕 Save/update user in MongoDB
      await saveUserToDB(updatedUser);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const signIn = async (email, password) => {
    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);

      // 🆕 Save/update user in MongoDB (in case they exist in Firebase but not MongoDB)
      await saveUserToDB(result.user);

      return result;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const googleSignIn = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setUser(result.user);

      // 🆕 Save user to MongoDB
      await saveUserToDB(result.user);

      return result;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const signOutUser = () => {
    setLoading(true);
    return signOut(auth);
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async currentUser => {
      setUser(currentUser);

      // 🆕 If user exists, ensure they're in MongoDB
      if (currentUser) {
        await saveUserToDB(currentUser);
      }

      setLoading(false);
    });
    return () => unSubscribe();
  }, []);

  const authInfo = {
    user,
    setUser,
    createUser,
    profileUpdate,
    signIn,
    googleSignIn,
    signOutUser,
    loading,
    setLoading,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
