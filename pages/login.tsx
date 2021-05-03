import { Login, GetUserInfo } from "../src/actions/userActions";
import { useDispatch, useSelector } from "react-redux";

export default function LoginPage() {
  const user = useSelector((state: any) => state.user);
  console.log(user.token);

  const dispatch = useDispatch();
  const login = () => {
    Login(dispatch, "asd", "aasd");
  };
  const getUserInfo = () => {
    GetUserInfo(dispatch, user.token);
  };
  return (
    <div>
      <p>Login</p>
      <button
        onClick={() => {
          login();
        }}
      >
        LOGIN NAPPULA
      </button>

      <button
        onClick={() => {
          getUserInfo();
        }}
      >
        USER INFO
      </button>
    </div>
  );
}
