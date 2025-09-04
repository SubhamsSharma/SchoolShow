'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

import { Form } from '@/components/ui/form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { CustomFormField } from './FormComponent';
import { schoolSchema } from '@/lib/schoolSchema';
import { createSchoolAction } from '@/lib/actions';
import { toast } from "sonner"

// Optional: For showing success/error messages
// import { useToast } from '@/components/ui/use-toast';

function CreateSchoolForm() {
  // const { toast } = useToast();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(schoolSchema),
    defaultValues: {
      name: '',
      address: '',
      city: '',
      state: '',
      contact: '',
      email_id: '',
      // It's better to use undefined for file inputs, but react-hook-form is robust
      image: undefined,
    },
    
  });

  // This is the updated submission handler

  async function onSubmit(values) {
    // 1. Create a FormData object to handle the file upload
    const formData = new FormData();
    
    // 2. Append all form values to the FormData object
    // We iterate over the values object to do this dynamically
    Object.keys(values).forEach(key => {
      // if (key === 'image') {
      //   // The 'image' field is a FileList, so we append the first file
      //   formData.append(key, values.image[0]);
      // } else {
      //   formData.append(key, values[key]);
      // }
      formData.append(key, values[key])
    });

    // 3. Call the server action with the FormData object
    const result = await createSchoolAction(formData);

    toast("New School successfully created.")

    // 4. Handle the structured response from the server action
    if (result.success) {
      // toast({ description: 'School created successfully!' }); // Optional success message
      router.push('/'); // Redirect only on success
    } else {
      toast("School creation unsuccessful")
      console.error("Failed to create school:", result.error);
      // toast({ variant: 'destructive', description: result.error }); // Optional error message
    }
  }

  return (
    <Form {...form}>
      <form
        className='bg-muted p-8 rounded'
         onSubmit={form.handleSubmit(onSubmit)}
      >
        <h2 className='capitalize font-semibold text-4xl mb-6 text-center'>Add School</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <CustomFormField name='name' control={form.control} />
          <CustomFormField name='address' control={form.control} />
          <CustomFormField name='city' control={form.control} />
          <CustomFormField name='state' control={form.control} />
          <CustomFormField name='contact' control={form.control} />
          <CustomFormField name='email_id' control={form.control} />
          <div className="md:col-span-2"> {/* Make file input span both columns */}
       <FormField
          control={form.control}
          name="image"
          render={({ field: { value, onChange, ...fieldProps } }) => (
            <FormItem>
              <FormLabel>School Image</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => onChange(e.target.files?.[0])}
                  {...fieldProps}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        </div>
        </div>

        <div className='mt-6 flex justify-center'>
          <Button
            type='submit'
            className='capitalize w-full md:w-auto'
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? 'Creating School...' : 'Create School'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
export default CreateSchoolForm;
