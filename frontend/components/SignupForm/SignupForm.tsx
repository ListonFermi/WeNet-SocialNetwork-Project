import React from "react";
import Button from "../Button";

function SignupForm() {
  return (
    <form>
      <input type="text" placeholder="Username" />
      <input type="text" placeholder="First Name" />
      <input type="text" placeholder="Last Name" />
      <input type="text" placeholder="Password" />
      <input type="text" placeholder="Confirm Password" />
      <Button text={"Signup"} />
    </form>
  );
}

export default SignupForm;
