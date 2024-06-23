import SignInButton from "../_components/SignInButton";
import SignInByCredential from "../_components/SignInByCredential";

export const metadata = {
  title: "Login",
};

export default async function Page() {
  return (
    <div className="flex flex-col gap-6 mt-10 items-center">
      <h2 className="text-3xl font-semibold">
        Sign in to access your guest area
      </h2>
      <SignInByCredential />
      <SignInButton />
    </div>
  );
}
