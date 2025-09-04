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
import { toast } from "sonner";

function CreateSchoolForm() {
  
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
      image: undefined,
    },
    
  });

  async function onSubmit(values) {
    
    const formData = new FormData();

    Object.keys(values).forEach(key => {
     
      formData.append(key, values[key])
    });

    //  Call the server action with the FormData object
    const result = await createSchoolAction(formData);

   

    //  Handle the structured response from the server action
    if (result.success) {
       toast("New School successfully created.")
     
      router.push('/'); // Redirect only on success
    } else {
      toast("School creation unsuccessful")
      console.error("Failed to create school:", result.error);
     
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
