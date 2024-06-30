import { Button, Input } from "react-daisyui";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  return (
    <div className="p-4 flex flex-col h-full items-center justify-center">
      <div className="w-96 flex flex-col gap-4">
        <h1 className="text-4xl text-center my-4">Register</h1>
        <Input className="w-full" placeholder="Username" type="email" />
        <Input className="w-full" placeholder="Username" />
        <Input className="w-full" placeholder="Password" type="password" />
        <Button color="neutral">Sign In</Button>
        <Link to="/signin" className="text-sm text-center underline">Already have an account? Log in here.</Link>
      </div>
    </div>
  );
};

export default RegisterPage;
