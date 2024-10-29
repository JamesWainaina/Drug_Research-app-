'use server';


import User from "../database/models/user.model";

import bcrypt from "bcrypt";
import { handleError } from "../utils";
import { connectToDatabase } from "../database/mongoose";
import { revalidatePath } from "next/cache";
import { sendResetPasswordEmail, sendVerificationEmail } from "./email.actions";

export async function createUser(user: CreateUserparams) {
  try {
    await connectToDatabase();

    // Check for existing user
    const existingUser = await User.findOne({
      email: user.email,
    });

    // Log a message instead of throwing an error
    if (existingUser) {
      console.log(
        "User already exists with this email. Proceeding with registration anyway.",
      );
      // Optionally, you could choose to update some user data instead of creating a new record
      // For example:
      // return existingUser; // If you want to return the existing user instead
    }

    // Create new user regardless of existing users
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);

    const newUser = await User.create({
      ...user,
      password: hashedPassword,
      userBio: user.userBio || "",
    });

    const verificationUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/verify-email?token=${newUser._id}`;
    await sendVerificationEmail(
      newUser.email,
      newUser.firstName || "User",
      verificationUrl,
    );

    // Return the newly created user
    return JSON.parse(JSON.stringify(newUser));
  } catch (error: any) {
    console.error("Error creating user:", error);
    throw new Error(
      error.message || "An error occurred during user registration",
    );
  }
}

export async function loginUser(email: string, password: string) {
    try {
        await connectToDatabase();
        const user = await User.findOne({email});
        if (!user) throw new Error("Invalid credentials");

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new Error("Invalid credentials");

        return JSON.parse(JSON.stringify(user));
    } catch(error) {
        handleError(error);
    }
}

export async function verifyEmail(token: string) {
    try {
        await connectToDatabase();

        const user = await User.findById(token);
        if(!user) throw new Error("Invalid token or user not found");

        user.isEmailVerified = true;
        await user.save();

        return JSON.parse(JSON.stringify(user));
    } catch (error) {
        handleError(error);
    }
}

export async function requestPasswordReset(email: string) {
    try {
        await connectToDatabase();

        const user = await User.findOne({ email });
        if(!user) throw new Error("User not found");
        const resetUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/reset-password?token=${user._id}`;
        await sendResetPasswordEmail(
            user.email,
            user.firstName || 'User',
            resetUrl,
        );
        return true;
    } catch (error) {
        console.log(error);
        throw Error;
    }
}

export async function resetPassword(token: string, newPassword: string) {
    try {
        await connectToDatabase();
        const user = await User.findById(token);
        if(!user) throw new Error("Invalid token or user not found");
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        user.password = hashedPassword;
        await user.save();

        return JSON.parse(JSON.stringify(user));
    } catch (error) {
        handleError(error);
    }
}


export async function getUserById(userId: string) {
    try {
        await connectToDatabase();
        const user = await User.findOne({Id: userId});
        if (!user) throw new Error("User not found");
        return JSON.parse(JSON.stringify(user));
    }catch (error) {
        handleError(error);
    }
}

export async function updateUser(Id: string, user: UpdateUserParams){
    try {
        await connectToDatabase();
        const updatedUser = await User.findByIdAndUpdate(
            {_id: Id }, user, {new: true,}
        )
        if (!updatedUser) throw new Error ("User update failed");
        return JSON.parse(JSON.stringify(updatedUser));
    } catch (error) {
        handleError(error);
    }
}

export async function deleteUser(Id: string) {
    try {
        await connectToDatabase();

        const userToDelete = await User.findOne({Id});
        if(!userToDelete) {
            throw new Error("User not found");
        }
        const deletedUser = await User.findByIdAndDelete(userToDelete._id);
        revalidatePath('/');

        return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null;
    } catch (error) {
        handleError(error);
    }
}

export async function updateCredits(userId: string, creditFee: number) {
    try {
        await connectToDatabase();
        
        const updateUserCredits = await User.findOneAndUpdate(
            {_id: userId},
            { $inc: { credits: creditFee }},
            { new: true },
        );

        if (!updateUserCredits) throw new Error("User credits update failed");
        return JSON.parse(JSON.stringify(updateUserCredits));
    } catch(error) {
        handleError(error);
    }
}

export async function getUserByEmail(email: string) {
    try {
        await connectToDatabase();
        const user = await User.findOne({ email });
        if (!user) throw new Error("User not found");
        return JSON.parse(JSON.stringify(user));
    } catch (error) {
        handleError(error);
    }
}
