"use server";
import {z} from "zod";
import prisma from './db';
import { schoolSchema } from './schoolSchema';
import { uploadToCloudinaryFromFile } from "@/lib/cloudinary-upload";
import { revalidatePath } from 'next/cache';

export async function createSchoolAction(formData) {
  //  Convert FormData to a plain object
  const values = Object.fromEntries(formData.entries());

  // Use `safeParse` for validation without throwing errors
  const validatedFields = schoolSchema.safeParse(values);

  if (!validatedFields.success) {
     console.error("Validation Error:",z.prettifyError(validatedFields.error ));
    return { success: false, error: "Invalid form data." };
  }
  
  
  const { image: file, ...schoolData } = validatedFields.data;

  try {
    let imageUrl = null; 

    //  Process the image upload if a file exists
    if (file && file.size > 0) {
      const uploaded = await uploadToCloudinaryFromFile(file, { folder: "schools-images" });
      imageUrl = uploaded.secure_url;
    } else {
      
        return { success: false, error: "An image is required to create a school."}
    }

    
    const school = await prisma.school.create({
      data: {
        ...schoolData, 
        image: imageUrl, 
      },
    });

  
    revalidatePath('/');

    return { success: true, data: school };

  } catch (error) {
    console.error("Action Error:", error);
    
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
    
    return { success: false, error: "Failed to fetch schools.", data: [] };
  }
}
