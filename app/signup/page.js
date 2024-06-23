import SelectCountry from "../_components/SelectCountry";
import SignInButton from "../_components/SignInButton";
import SignInByCredential from "../_components/SignInByCredential";
import SignUpForm from "../_components/SignUpForm";
import { auth } from "../_lib/auth";

export const metadata = {
  title: "SignUp",
};

export default async function Page() {
  const session = await auth();
  if (session) throw new Error("You can not sign up while logging in");

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-4">
        Create your guest profile
      </h2>

      <p className="text-lg mb-8 text-primary-200">
        Providing the following information will make your check-in process
        faster and smoother. See you soon!
      </p>

      <SignUpForm>
        <SelectCountry
          name="nationality"
          id="nationality"
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
        />
      </SignUpForm>
    </div>
  );
}
