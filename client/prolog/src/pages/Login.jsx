import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../components/login/Axios";
import { useRecoilValue, useSetRecoilState, useRecoilState } from "recoil";
import loginedUser from "../components/store/atom";
import "./Login.css";
import { IoHome } from "react-icons/io5";
// const BASE_URL = "http://localhost:8080";
const BASE_URL = "https://i10b112.p.ssafy.io";

function KakaoLogin({ path }) {
  // 현재 위치한 페이지 저장

  // sessionStorage.setItem("preLoginUrl", loginRedirectUrl);

  return (
    <a href={`${BASE_URL}/api/oauth2/authorization/kakao?redirect_uri=${path}&mode=login`}>
      <img
        src="/src/assets/kakao_login.png"
        alt="카카오 로그인"
        width="350"
        height="52"
        // onClick={handleKakaoLogin}
      />
    </a>
  );
}

function NaverLogin({ path }) {
  const naverLink = `${BASE_URL}/api/oauth2/authorization/naver?redirect_uri=${path}&mode=login`;

  return (
    <div
      className="naverLogins"
      onClick={() => (window.location.href = naverLink)}
      style={{ backgroundColor: "white" }}
    >
      <div className="naverLogo">
        <img src="/src/assets/naver_login.png" alt="네이버 로그인" width="45" height="45" />
      </div>
      <div className="naverLogin">네이버 로그인</div>
    </div>
  );
}

export default function Logins() {
  // 로그인한 사용자의 정보 가져오기
  const setLoginedUser = useSetRecoilState(loginedUser);
  const loginedUserInfo = useRecoilValue(loginedUser);
  const [value, setValue] = useRecoilState(loginedUser);
  const [loginRedirectUrl, setLoginRedirectUrl] = useState(BASE_URL);

  const navigate = useNavigate();

  useEffect(() => {
    // URL에서 쿼리 파라미터 확인
    const searchParams = new URLSearchParams(window.location.search);
    // 로그인 성공
    if (searchParams.get("login") === "success") {
      // 사용자 정보 가져오기
      fetchUserDetails();
      // 메인페이지로 이동
      navigate("/");
    }

    const path = searchParams.get("path");
    setLoginRedirectUrl(path);
  }, []);

  const fetchUserDetails = async () => {
    try {
      const response = await api.get(`${BASE_URL}/api/user/profile`);
      // setLoginedUser(response.data);
      // const updateLoginedUser = () => setLoginedUser((prev) => response.data);
      // updateLoginedUser();
      setValue(response.data);
    } catch (error) {
      console.error("사용자 정보 가져오기 실패", error);
    }
  };

  function goMainPage() {
    navigate("/");
  }

  return (
    <div className="login">
      <svg
        width="110"
        height="40"
        viewBox="0 0 208 63"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        onClick={goMainPage}
      >
        <path
          d="M13.432 5.136C20.0453 5.136 25.1227 6.30933 28.664 8.656C32.2053 10.96 33.976 14.7573 33.976 20.048C33.976 25.3813 32.184 29.2427 28.6 31.632C25.016 33.9787 19.896 35.152 13.24 35.152H10.104V50H0.12V6.288C2.296 5.86133 4.6 5.56267 7.032 5.392C9.464 5.22133 11.5973 5.136 13.432 5.136ZM14.072 13.648C13.3467 13.648 12.6213 13.6693 11.896 13.712C11.2133 13.7547 10.616 13.7973 10.104 13.84V26.64H13.24C16.696 26.64 19.2987 26.1707 21.048 25.232C22.7973 24.2933 23.672 22.544 23.672 19.984C23.672 18.7467 23.4373 17.7227 22.968 16.912C22.5413 16.1013 21.9013 15.4613 21.048 14.992C20.2373 14.48 19.2347 14.1387 18.04 13.968C16.8453 13.7547 15.5227 13.648 14.072 13.648ZM60.9555 24.784C60.1022 24.5707 59.0995 24.3573 57.9475 24.144C56.7955 23.888 55.5582 23.76 54.2355 23.76C53.6382 23.76 52.9128 23.824 52.0595 23.952C51.2488 24.0373 50.6302 24.144 50.2035 24.272V50H40.6675V18.128C42.3742 17.5307 44.3795 16.976 46.6835 16.464C49.0302 15.9093 51.6328 15.632 54.4915 15.632C55.0035 15.632 55.6222 15.6747 56.3475 15.76C57.0728 15.8027 57.7982 15.888 58.5235 16.016C59.2488 16.1013 59.9742 16.2293 60.6995 16.4C61.4248 16.528 62.0435 16.6987 62.5555 16.912L60.9555 24.784ZM98.5305 33.104C98.5305 35.7493 98.1465 38.1813 97.3785 40.4C96.6105 42.576 95.5012 44.4533 94.0505 46.032C92.5998 47.568 90.8505 48.7627 88.8025 49.616C86.7972 50.4693 84.5358 50.896 82.0185 50.896C79.5438 50.896 77.2825 50.4693 75.2345 49.616C73.2292 48.7627 71.5012 47.568 70.0505 46.032C68.5998 44.4533 67.4692 42.576 66.6585 40.4C65.8478 38.1813 65.4425 35.7493 65.4425 33.104C65.4425 30.4587 65.8478 28.048 66.6585 25.872C67.5118 23.696 68.6638 21.84 70.1145 20.304C71.6078 18.768 73.3572 17.5733 75.3625 16.72C77.4105 15.8667 79.6292 15.44 82.0185 15.44C84.4505 15.44 86.6692 15.8667 88.6745 16.72C90.7225 17.5733 92.4718 18.768 93.9225 20.304C95.3732 21.84 96.5038 23.696 97.3145 25.872C98.1252 28.048 98.5305 30.4587 98.5305 33.104ZM88.8025 33.104C88.8025 30.16 88.2052 27.856 87.0105 26.192C85.8585 24.4853 84.1945 23.632 82.0185 23.632C79.8425 23.632 78.1572 24.4853 76.9625 26.192C75.7678 27.856 75.1705 30.16 75.1705 33.104C75.1705 36.048 75.7678 38.3947 76.9625 40.144C78.1572 41.8507 79.8425 42.704 82.0185 42.704C84.1945 42.704 85.8585 41.8507 87.0105 40.144C88.2052 38.3947 88.8025 36.048 88.8025 33.104ZM113.324 44.944C113.324 46.864 112.705 48.336 111.468 49.36C110.273 50.3413 108.908 50.832 107.372 50.832C105.836 50.832 104.449 50.3413 103.212 49.36C102.017 48.336 101.42 46.864 101.42 44.944C101.42 43.024 102.017 41.5733 103.212 40.592C104.449 39.568 105.836 39.056 107.372 39.056C108.908 39.056 110.273 39.568 111.468 40.592C112.705 41.5733 113.324 43.024 113.324 44.944ZM133.17 50.64C130.397 50.5973 128.135 50.2987 126.386 49.744C124.679 49.1893 123.314 48.4213 122.29 47.44C121.309 46.416 120.626 45.2 120.242 43.792C119.901 42.3413 119.73 40.72 119.73 38.928V1.872L129.266 0.335999V37.008C129.266 37.8613 129.33 38.6293 129.458 39.312C129.586 39.9947 129.821 40.5707 130.162 41.04C130.546 41.5093 131.079 41.8933 131.762 42.192C132.445 42.4907 133.362 42.6827 134.514 42.768L133.17 50.64ZM171.468 33.104C171.468 35.7493 171.084 38.1813 170.316 40.4C169.548 42.576 168.439 44.4533 166.988 46.032C165.537 47.568 163.788 48.7627 161.74 49.616C159.735 50.4693 157.473 50.896 154.956 50.896C152.481 50.896 150.22 50.4693 148.172 49.616C146.167 48.7627 144.439 47.568 142.988 46.032C141.537 44.4533 140.407 42.576 139.596 40.4C138.785 38.1813 138.38 35.7493 138.38 33.104C138.38 30.4587 138.785 28.048 139.596 25.872C140.449 23.696 141.601 21.84 143.052 20.304C144.545 18.768 146.295 17.5733 148.3 16.72C150.348 15.8667 152.567 15.44 154.956 15.44C157.388 15.44 159.607 15.8667 161.612 16.72C163.66 17.5733 165.409 18.768 166.86 20.304C168.311 21.84 169.441 23.696 170.252 25.872C171.063 28.048 171.468 30.4587 171.468 33.104ZM161.74 33.104C161.74 30.16 161.143 27.856 159.948 26.192C158.796 24.4853 157.132 23.632 154.956 23.632C152.78 23.632 151.095 24.4853 149.9 26.192C148.705 27.856 148.108 30.16 148.108 33.104C148.108 36.048 148.705 38.3947 149.9 40.144C151.095 41.8507 152.78 42.704 154.956 42.704C157.132 42.704 158.796 41.8507 159.948 40.144C161.143 38.3947 161.74 36.048 161.74 33.104ZM186.983 32.08C186.983 37.4133 189.138 40.08 193.447 40.08C194.428 40.08 195.346 39.952 196.199 39.696C197.052 39.44 197.778 39.1413 198.375 38.8V23.568C197.906 23.4827 197.351 23.4187 196.711 23.376C196.071 23.2907 195.324 23.248 194.471 23.248C191.954 23.248 190.076 24.08 188.839 25.744C187.602 27.408 186.983 29.52 186.983 32.08ZM207.911 45.776C207.911 51.28 206.503 55.3547 203.687 58C200.914 60.688 196.604 62.032 190.759 62.032C188.711 62.032 186.663 61.84 184.615 61.456C182.567 61.1147 180.668 60.6453 178.919 60.048L180.583 52.048C182.076 52.6453 183.634 53.1147 185.255 53.456C186.919 53.7973 188.796 53.968 190.887 53.968C193.618 53.968 195.538 53.3707 196.647 52.176C197.799 50.9813 198.375 49.4453 198.375 47.568V46.352C197.351 46.8213 196.284 47.184 195.175 47.44C194.108 47.6533 192.935 47.76 191.655 47.76C187.004 47.76 183.442 46.3947 180.967 43.664C178.492 40.8907 177.255 37.0293 177.255 32.08C177.255 29.6053 177.639 27.3653 178.407 25.36C179.175 23.312 180.284 21.5627 181.735 20.112C183.228 18.6613 185.042 17.552 187.175 16.784C189.308 15.9733 191.719 15.568 194.407 15.568C195.559 15.568 196.732 15.632 197.927 15.76C199.164 15.8453 200.38 15.9733 201.575 16.144C202.77 16.3147 203.9 16.528 204.967 16.784C206.076 16.9973 207.058 17.232 207.911 17.488V45.776Z"
          fill="#003D84"
        />
      </svg>
      <div style={{ fontSize: "14px" }}>소셜 계정으로 로그인</div>
      <KakaoLogin path={loginRedirectUrl} />
      <NaverLogin path={loginRedirectUrl} />
      <IoHome size="50" style={{ paddingTop: "20px", color: "003D84" }} onClick={goMainPage} />
    </div>
  );
}
