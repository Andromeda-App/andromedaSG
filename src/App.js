import './App.css';
import React, { useState, useEffect } from "react";
import API from "./utils/api.js"
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import Navbar from './components/NavBar';
import { BrowserRouter as BrowserRouter, Routes, Route, Link, Redirect } from "react-router-dom"
import Home from "./pages/Home";
import Preferences from "./pages/Preferences";
import Profile from "./pages/Profile";
import './App.css'

function App() {
  // User Login
  const [userState, setUserState] = useState({
    email: "",
    id: 0
  });
  // Token 
  const [token, setToken] = useState("")
  // Login Form
  const [loginFormState, setLoginFormState] = useState({
    email: "",
    password: ""
  });
  // Signup Form
  const [signupFormState, setSignupFormState] = useState({
    email: "",
    password: ""
  })
  // Navbar
  return (
    <div className="App">
      <Navbar />
    </div>
  )

  useEffect(() => {
    const myToken = localStorage.getItem("token");
    console.log("Token:" + myToken)
    if (myToken) {
      API.getProfile(myToken).then(res => {
        console.log("worked")
        setToken(myToken)
        setUserState({
          email: res.data.email,
          id: res.data.id
        })
      }).catch(err => {
        console.log("failed")
        console.log(err)
        localStorage.removeItem('token')
      })
    }
  }, [])

  const handleLoginChange = event => {
    if (event.target.name === "email") {
      setLoginFormState({
        ...loginFormState,
        email: event.target.value
      })
    } else {
      setLoginFormState({
        ...loginFormState,
        password: event.target.value
      })
    }
  }
  const handleSignupChange = event => {
    if (event.target.name === "email") {
      setSignupFormState({
        ...signupFormState,
        email: event.target.value
      })
    } else {
      setSignupFormState({
        ...signupFormState,
        password: event.target.value
      })
    }
  }

  const handleLoginSubmit = e => {
    e.preventDefault();
    API.login(loginFormState).then(res => {
      console.log(res.data)
      setUserState({
        email: res.data.user.email,
        id: res.data.user.id
      })
      setToken(res.data.token)
      localStorage.setItem("token", res.data.token)
    }).catch(err => {
      console.log(err);
    })

  }
  const handleSignupSubmit = e => {
    e.preventDefault();
    API.signup(signupFormState).then(res => {
      API.login(signupFormState).then(res => {
        console.log(res.data)
        setUserState({
          email: res.data.user.email,
          id: res.data.user.id
        })
        setToken(res.data.token)
        localStorage.setItem("token", res.data.token)
      }).catch(err => {
        console.log(err);
      })
    })
  }

  const logMeOut = () => {
    setUserState({ email: '', id: 0 })
    setToken("");
    localStorage.removeItem("token")
  }

  return (
    <BrowserRouter>
      {!userState.email ? (
        <div>
          <LoginForm submit={handleLoginSubmit} change={handleLoginChange} loginState={loginFormState} />
          <SignupForm submit={handleSignupSubmit} change={handleSignupChange} signupState={signupFormState} />
        </div>
      ) : (
        <div>
          <h1>Ready to go stargazing, {userState.user_name}?</h1>
          <button onClick={logMeOut}>Logout</button>
          <Link to="/">Home</Link>
          <Link to={`/profile/${userState.id}`}>Profile</Link>
        </div>
      )}
      <div className="App">
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Home />} user={userState} token={token} />
          <Route exact path='/preferences' element={<Preferences />} user={userState} token={token} />
          <Route exact path='/profile' element={<Profile />} user={userState} token={token} />
        </Routes>
      </div>
    </BrowserRouter>);
<<<<<<< HEAD
  // <Router>
  {/* {!userState.email ? ( */ }
  {/* <div> */ }
  {/* Show Login Form if not Logged In */ }
  {/* <div class="navBar">Andromeda</div> */ }
  {/* <LoginForm submit={handleLoginSubmit} change={handleLoginChange} loginState={loginFormState} /> */ }
  {/* <SignupForm submit={handleSignupSubmit} change={handleSignupChange} signupState={signupFormState} /> */ }
  {/* </div> */ }
  {/* ) : ( */ }
  {/* //Otherwise show user page */ }
  {/* <div> */ }
  {/* <h1>Read to go stargazing, {userState.email}?</h1> */ }
  {/* <button onClick={logMeOut}>Logout</button> */ }
  {/* <Link to="/">Home</Link> */ }
  {/* <Link to={`/profile/${userState.id}`}>Profile</Link> */ }
  {/* </div> */ }
  {/* )} */ }
  {/* <Routes>
        <Route exact path="/">
          <><Home user={userState} token={token} /></>
        </Route>
        <Route exact path="/profile/:id">
          <Profile user={userState} token={token} />
        </Route>
      </Routes>
    </Router> */}
=======
>>>>>>> dev
}

export default App;
