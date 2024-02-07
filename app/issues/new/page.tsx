"use client";
import "easymde/dist/easymde.min.css";
import SimpleMDE from "react-simplemde-editor";
import { TextField, Button, Callout , Text } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema } from "@/app/validationSchema";
import { z } from 'zod';
import ErrorMessage from '@/app/components/ErrorMessage'
import Spinner from "@/app/components/Spinner";

type IssueForm =  z.infer<typeof createIssueSchema>

const NewIssuePage = () => {
  const { register, control, handleSubmit  , formState : { errors}} = useForm<IssueForm>( {
    resolver: zodResolver(createIssueSchema)
  });
  const router = useRouter();
  const [error, setError] = useState("");
  const  [ isSubmit , setIsSubmit] = useState(false)

  const onSubmit = async (data: IssueForm) => {
    try {
        setIsSubmit(true)
      await axios.post("/api/issues", data);
      router.push("/issues");
    } catch (err) {
        setIsSubmit(false)
      setError("Something went wrong.");
    }
  };
  return (
    <>
      {error && (
        <Callout.Root>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        className="max-w-xl space-y-3"
        onSubmit={handleSubmit((data) => onSubmit(data))}
      >
        <TextField.Root>
          <TextField.Input placeholder="Title" {...register("title")} />
        </TextField.Root>
         <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
          <ErrorMessage>{errors.description?.message}</ErrorMessage>

        <Button disabled={isSubmit}>Submit New Issue{isSubmit && <Spinner/>}</Button>
      </form>
    </>
  );
};

export default NewIssuePage;
