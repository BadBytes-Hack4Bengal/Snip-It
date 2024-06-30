import { API_AUTH_LOGIN_URL } from "@src/constants";
import AuthContext from "@src/contexts/AuthContext";
import { useContext, useEffect, useRef } from "react";
import { Button, Input, Modal } from "react-daisyui";
import { Link, useNavigate } from "react-router-dom";

const SignInPage = () => {
  const [authDetails, setAuthDetails] = useContext(AuthContext);
  const usernameRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const submitForm = async () => {
    try {
      const res = await fetch(API_AUTH_LOGIN_URL, {
        method: "POST",
        mode: "cors",
        body: JSON.stringify({
          username: usernameRef.current!.value,
          password: passwordRef.current!.value
        }),
        headers: {
          "Content-Type": "application/json"
        }
      });
      let data = await res.json();
      if (data.status != "success") {
        throw new Error("unsuccessful auth");
      }
      data = data.data;
      setAuthDetails({
        loggedIn: true,
        username: data.username,
        token: data.token
      });
      navigate("/");
    } catch (e) {
      modalRef.current?.showModal();
    }
  };
  const navigate = useNavigate();
  const modalRef = useRef<HTMLDialogElement | null>(null);
  useEffect(() => {
    if (authDetails.loggedIn) navigate("/");
  }, [authDetails, navigate]);
  return (
    <div className="p-4 flex flex-col h-full items-center justify-center">
      <div className="w-96 flex flex-col gap-4">
        <h1 className="text-4xl text-center my-4">Sign In</h1>
        <Input ref={usernameRef} className="w-full" placeholder="Username" />
        <Input ref={passwordRef} className="w-full" placeholder="Password" type="password" />
        <Button
          color="neutral"
          onClick={() => {
            submitForm();
          }}
        >
          Sign In
        </Button>
        <Link to="/register" className="text-sm text-center underline">
          New here? You might want to register.
        </Link>
      </div>
      <Modal ref={modalRef}>
        <Modal.Header className="font-bold">Error</Modal.Header>
        <Modal.Body>Something went wrong with your sign in attempt.</Modal.Body>
        <Modal.Actions>
          <form method="dialog">
            <Button>Close</Button>
          </form>
        </Modal.Actions>
      </Modal>
    </div>
  );
};

export default SignInPage;
