import './App.css';
import React, { useState, useEffect } from "react";
import API from "./utils/api.js"
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import Navbar from './components/NavBar';
import { BrowserRouter as BrowserRouter, Routes, Route, Link } from "react-router-dom"
import Home from "./pages/Home";
import Preferences from "./pages/Preferences";
import Profile from "./pages/Profile";
<<<<<<< HEAD
// kp Map & axios
import Map from "./components/IssCard/Map";
// import axios from 'axios';

// try 2 kp
// function App() {
//   return (
//     <div className="App">
//       <h3>ISS Tracker</h3>
//       <Maps />
//     </div>

//   );
// }

// try 2 kp

// kp TRY 1
// function App() {
//   const [loading, SetLoading] = useState(false)
//   const [longitude, setLongitude] = useState(122.3321)
//   const [latitude, setLatitude] = useState(47.6062)

//   useEffect(() => {
//     getLocation()

//   }, [])

//   const getLocation = async () => {
//       try {
//         SetLoading(true)
//         const res = await axios.get('http://api.open-notify.org/iss-now.json')
//         const { longitude, latitude } = await res.data.iss_position

//         setLongitude(parseFloat(longitude))
//         setLatitude(parseFloat(latitude))
//         SetLoading(false)
//       }
//       catch (error) {
//         throw new Error(error)
//       }
//   }

//   return <div className='App'>
//     {!loading ? (
//       <IssCard center={{ lat: latitude, lng: longitude }} zoom={6} />
//     ) : (
//       <h1>Loading</h1>
//     )}
//   </div>
// }
// kp TRY 1
=======
import './App.css'
import Donki from "./Donki"
import NasaPhoto from './components/Apod/NasaPhoto';
>>>>>>> fb26e951ab7ecb1de8986b60f83f38ad13318aee

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
<<<<<<< HEAD
  // Navbar
  // return (
  //   <div className="App">
  //     <Navbar />
  //   </div>
  // )
=======
>>>>>>> fb26e951ab7ecb1de8986b60f83f38ad13318aee

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

  const [donki, setDonki] = useState()


  useEffect(() => {
    Donki.getDonki().then(donkiData => {
      console.log(donkiData.data)
      if (donkiData.data[33].cmeAnalyses[0].enlilList[0].estimatedShockArrivalTime === null) {
        setDonki("No upcoming event")
      } else {
        setDonki(donkiData.data[33].cmeAnalyses[0].enlilList[0].estimatedShockArrivalTime)
      }
    })
  }, [])

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
<<<<<<< HEAD
          <div className="App">
      <h3>ISS Tracker</h3>
      <Map />
    </div>

  );
          <Map></Map>
=======
          <div style={{ maxWidth: 900, padding: 30 }}>
            {donki && (
              <article>
                <header>
                  {donki}
                </header>
                {/* <img src="" alt="DONKI" width="800" height="auto" /> */}
                {/* <p>{donki.explanation}</p> */}
                <pre
                  style={{
                    overflowX: "auto",
                    whiteSpace: "pre-wrap",
                    wordWrap: "break-word",
                  }}
                >
                  <hr />
                  {JSON.stringify(donki, null, 2)}
                </pre>
              </article>
            )}
          </div>
>>>>>>> fb26e951ab7ecb1de8986b60f83f38ad13318aee
        </div>

        
      )}
      <div className="App">
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Home />} user={userState} token={token} />
          <Route exact path='/preferences' element={<Preferences />} user={userState} token={token} />
          <Route exact path='/profile' element={<Profile />} user={userState} token={token} />
          {/* <Route path="/" element={<Home />}></Route> */}
          {/* <Route path="/nasaphoto" element={<NasaPhoto />}></Route> */}
        </Routes>
 
      </div>
    </BrowserRouter>);

}

export default App;
