import { signOut } from "@/lib/actions/sign-out.action";

const SignOut = () => {
  return (
    <form action={signOut}>
      <button type="submit">Sign Out</button>
    </form>
  );
};

export default SignOut;
