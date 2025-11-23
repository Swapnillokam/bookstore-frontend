import React, { createContext, useContext, useEffect, useState } from 'react'
import { auth } from '../firebase/firebase.config'
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth'
import { use } from 'react'

const AuthContext = createContext()

export const useAuth = () => {
    return (
        useContext(AuthContext)
    )
}

const googleProvider = new GoogleAuthProvider();

//auth provider
export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null)
    const [loading, setLoading] = useState(true)

    //register a user
    const registerUser = async (email, password) => {
        return await createUserWithEmailAndPassword(auth, email, password)
    }

    //login a user
    const logInUser = async (email, password) => {
        return await signInWithEmailAndPassword(auth, email, password)
    }

    //signUp with google
    const signInWIthGoogle = async () => {
        return await signInWithPopup(auth, googleProvider)
    }

    //signUp with google
    const logOutUser = async () => {
        return await signOut(auth)
    }

    //manage user 
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user)
            setLoading(false)

            if (user) {
                const { email, displayName, photoURL, emailVerified } = user
                const userData = { email, displayName, photoURL, emailVerified }
            }
        })
        return () => unSubscribe();
    }, [])


    const value = {
        currentUser,
        registerUser,
        logInUser,
        signInWIthGoogle,
        logOutUser
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
