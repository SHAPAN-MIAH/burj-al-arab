// import { ControlPointDuplicateOutlined } from '@material-ui/icons';
import React, { useContext } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebaseConfig';
import {UserContext} from '../../App'
import { useHistory, useLocation } from 'react-router';


firebase.initializeApp(firebaseConfig);

const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    const handelGoogleSignIn = () => {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
        .signInWithPopup(provider)
        .then((result) => {
            const {displayName, email} = result.user;
            const signedInUser = {name: displayName, email};
            setLoggedInUser(signedInUser);
            history.replace(from);
        }).catch((error) => {
            console.log(error)
        });
    }
    return (
        <div>
            <h1>This is Login</h1>
            <button onClick={handelGoogleSignIn}>Google Sign in</button>
        </div>
    );
};

export default Login;