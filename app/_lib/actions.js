"use server";
import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";
import { getBookings, getGuest } from "./data-service";
import { redirect } from "next/navigation";
import { AuthError } from "next-auth";
import { genSaltSync, hashSync } from "bcryptjs";

export async function updateProfile(formData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = formData.get("nationality").split("%");

  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID))
    throw new Error("Please provide a valid national ID");

  const updateData = { nationalID, nationality, countryFlag };

  const { data, error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", session.user.guestId);

  if (error) {
    console.log(error);
    throw new Error("Guest could not be updated");
  }

  revalidatePath("/account/profile");
}

export async function createBooking(bookingData, formData) {
  const session = await auth();

  if (!session) throw new Error("You must be logged in");

  //Object.entries(formData.entries())

  const newBooking = {
    ...bookingData,
    guestId: session.user.guestId,
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations").slice(0, 1000),
    extrasPrice: 0,
    totalPrice: bookingData.cabinPrice,
    isPaid: false,
    hasBreakfast: false,
    status: "unconfirmed",
  };

  const { error } = await supabase.from("bookings").insert([newBooking]);

  if (error) throw new Error("Booking could not be created");

  revalidatePath(`/cabins/${newBooking.cabinId}`);
  // revalidatePath(`/account/reservations`);
  redirect("/cabins/thankyou");
}

export async function deleteBooking(bookingId) {
  // //For Testing
  // await new Promise((res) => setTimeout(res, 2000));
  // throw new Error();

  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingIds.includes(bookingId))
    throw new Error("You are not allowed to delete this booking");

  const { data, error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }

  revalidatePath("/account/reservations");
}

export async function updateBooking(formData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const bookingId = Number(formData.get("bookingId"));

  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);
  if (!guestBookingIds.includes(465))
    throw new Error("You are not allowed to update the booking");
  const updatedFields = {
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations").slice(0, 1000),
  };

  const { data, error } = await supabase
    .from("bookings")
    .update(updatedFields)
    .eq("id", bookingId)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }

  // revalidatePath("/account/reservations");
  revalidatePath(`/account/reservations/edit/${bookingId}`);
  redirect("/account/reservations");
}

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signInCredentialsAction(previousState, formData) {
  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirectTo: "/account",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      console.log("error", error.type, error);
      return "Invalid credentials.";
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

export async function signUpGuest(formData) {
  const session = await auth();
  if (session) throw new Error("You must be logged out to sign Up.");

  //check the email was not duplicated
  const existingUser = await getGuest(formData.get("email"));
  if (existingUser) {
    throw new Error(
      `The user (email: ${formData.get(
        "email"
      )}) has already been exist. Please use another email.`
    );
  }

  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = formData.get("nationality").split("%");

  if (nationalID && !/^[a-zA-Z0-9]{6,12}$/.test(nationalID))
    throw new Error("Please provide a valid national ID");

  const salt = genSaltSync(10);
  const hashPassword = hashSync(formData.get("password"), salt);

  const newGuest = {
    fullName: formData.get("fullName"),
    email: formData.get("email"),
    nationalID,
    nationality,
    countryFlag,
    password: hashPassword,
  };

  console.log(newGuest);

  //Object.entries(formData.entries())

  const { error } = await supabase.from("guests").insert([newGuest]);

  if (error) throw new Error("Guest could not be created");

  revalidatePath("/account/signup");
  redirect("/login");
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
