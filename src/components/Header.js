import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { auth, provider } from "../firebase";
import { useNavigate, useLocation } from "react-router-dom";
import {
  selectUserEmail,
  selectUserName,
  selectUserPhoto,
  setSignOutState,
  setUserLoginDetails,
} from "../features/user/user-slice";
import { useEffect } from "react";

const Header = (props) => {
  const dispatch = useDispatch();
  const userName = useSelector(selectUserName);
  const userEmail = useSelector(selectUserEmail);
  const userPhoto = useSelector(selectUserPhoto);
  const navigate = useNavigate();
  const location = useLocation();

  const setUser = (user) => {
    dispatch(
      setUserLoginDetails({
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
      })
    );
  };

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
        if (location.pathname === "/") navigate("/home", { replace: true });
      } else {
        navigate("/");
      }
    });
  }, [userName]);

  const handleAuth = async () => {
    if (!userName) {
      try {
        const response = await auth.signInWithPopup(provider);
        setUser(response.user);
      } catch (error) {
        console.log(error);
      }
    } else if (userName) {
      try {
        await auth.signOut();
        dispatch(setSignOutState());
        navigate("/", { replace: true });
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <Nav>
      <Logo>
        <img src="/images/logo.svg"></img>
      </Logo>
      {!userName ? (
        <Login onClick={handleAuth}>Login</Login>
      ) : (
        <>
          <NavMenu>
            <a href="/home">
              <img src="/images/home-icon.svg" alt="home" />
              <span>HOME</span>
            </a>
            <a href="/search">
              <img src="/images/search-icon.svg" alt="search" />
              <span>SEARCH</span>
            </a>
            <a href="/watchlist">
              <img src="/images/watchlist-icon.svg" alt="watchlist" />
              <span>WATCHLIST</span>
            </a>
            <a href="/originals">
              <img src="/images/original-icon.svg" alt="originals" />
              <span>ORIGINALS</span>
            </a>
            <a href="/movies">
              <img src="/images/movie-icon.svg" alt="movies" />
              <span>MOVIES</span>
            </a>
            <a href="/series">
              <img src="/images/series-icon.svg" alt="series" />
              <span>SERIES</span>
            </a>
          </NavMenu>
          <SignOut>
            <UserImg src={userPhoto} alt="user photo" />
            <DropDown>
              <span onClick={handleAuth}>Sign Out</span>
            </DropDown>
          </SignOut>
        </>
      )}
    </Nav>
  );
};

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #090b13;
  padding: 0 36px;
  letter-spacing: 12px;
  z-index: 3;
`;

const Logo = styled.a`
  padding: 0;
  width: 80px;
  margin-top: 4px;
  max-height: 70px;
  font-size: 0;
  display: inline-block;
  img {
    display: block;
    width: 100%;
  }
`;

const NavMenu = styled.div`
  align-items: center;
  display: flex;
  flex-flow: row nowrap;
  height: 100%;
  justify-content: flex-end;
  position: relative;
  margin-right: auto;
  margin-left: 25px;

  a {
    display: flex;
    align-items: center;
    padding: 0 12px;

    img {
      height: 20px;
      min-width: 20px;
      width: 20px;
    }

    span {
      color: rgb(249, 249, 249);
      font-size: 13px;
      letter-spacing: 1.42px;
      line-height: 1.08;
      padding: 2px 0px;
      white-space: nowrap;
      position: relative;

      &:before {
        content: "";
        background-color: rgb(249, 249, 249);
        border-radius: 0px 0px 4px 4px;
        bottom: -6px;
        height: 2px;
        left: 0px;
        opacity: 1;
        position: absolute;
        right: 0px;
        transform-origin: left center;
        transform: scaleX(0);
        transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
        visibility: hidden;
        width: auto;
      }
    }

    &:hover {
      span:before {
        transform: scaleX(1);
        visibility: visible;
        opacity: 1 !important;
      }
    }
  }

  /* @media (max-width: 760px) {
    display: none;
  } */
`;

const Login = styled.a`
  background-color: rgba(0, 0, 0, 0.6);
  padding: 8px 16px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  border: 1px solid #f9f9f9;
  transition: all 0.2s ease 0s;

  &:hover {
    background-color: #f9f9f9;
    color: #000;
    border-color: transparent;
  }
`;

const UserImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
`;

const DropDown = styled.div`
  width: 105px;
  position: absolute;
  top: 48px;
  right: 10px;
  background: rgb(29, 29, 29);
  border: 1px solid rgba(151, 151, 151, 0.3);
  border-radius: 4px;
  box-shadow: rgb(0 0 0 / 69%) 0px 0px 18px 0px;
  padding: 10px;
  font-size: 14px;
  letter-spacing: 3px;
  opacity: 0;
  text-align: center;
`;

const SignOut = styled.div`
  position: relative;
  height: 48px;
  width: 48px;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;

  &:hover {
    ${DropDown} {
      opacity: 1;
      transition-duration: 1s;
    }
  }
`;

export default Header;
