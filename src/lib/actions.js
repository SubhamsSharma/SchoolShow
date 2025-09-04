"use server";
import {z} from "zod";
import prisma from './db';
import { schoolSchema } from './schoolSchema';
import { uploadToCloudinaryFromFile } from "@/lib/cloudinary-upload";
import { revalidatePath } from 'next/cache';

export async function createSchoolAction(formData) {
  // 1. Convert FormData to a plain object
  const values = Object.fromEntries(formData.entries());

  // 2. Use `safeParse` for validation without throwing errors
  const validatedFields = schoolSchema.safeParse(values);

  if (!validatedFields.success) {
     console.error("Validation Error:",z.prettifyError(validatedFields.error ));
    return { success: false, error: "Invalid form data." };
  }
  
  // Destructure the validated data, not the raw form data
  const { image: file, ...schoolData } = validatedFields.data;

  try {
    let imageUrl = null; // Default to null if no image is uploaded

    // 3. Process the image upload if a file exists
    if (file && file.size > 0) {
      const uploaded = await uploadToCloudinaryFromFile(file, { folder: "schools-images" });
      imageUrl = uploaded.secure_url;
    } else {
        // Handle case where image is required but not provided
        return { success: false, error: "An image is required to create a school."}
    }

    // 4. Create the school record using the validated data and new image URL
    // This is now outside the `if` block and uses safe, validated data.
    const school = await prisma.school.create({
      data: {
        ...schoolData, // Spread the validated text fields
        image: imageUrl, // Add the Cloudinary URL
      },
    });

    // 5. Revalidate the path to update the UI instantly
    revalidatePath('/');

    return { success: true, data: school };

  } catch (error) {
    console.error("Action Error:", error);
    // Return a structured error for better client-side handling
    return { success: false, error: "Something went wrong, failed to create school." };
  }
}

export async function getAllSchoolsAction() {
  try {
    const schools = await prisma.school.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    return { success: true, data: schools };
  } catch (e) {
    console.error("Get All Schools Error:", e);
    // Return a consistent error structure
    return { success: false, error: "Failed to fetch schools.", data: [] };
  }
}
