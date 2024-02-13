"use client";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { z } from "zod";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { issueSchema } from "@/app/validationSchema";
import dynamic from "next/dynamic";
import { TextField, Button, Callout } from "@radix-ui/themes";
import { ErrorMessage, Spinner } from "@/app/components";
import { Issue } from "@prisma/client";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

type IssueFormData = z.infer<typeof issueSchema>;

const IssueForm = ({ issue }: { issue?: Issue }) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(issueSchema),
  });
  const router = useRouter();
  const [error, setError] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsSubmit(true);
      if (issue) await axios.patch("/api/issues/" + issue.id, data);
      else await axios.post("/api/issues", data);
      router.push("/issues");
    } catch (err) {
      setIsSubmit(false);
      setError("Something went wrong.");
    }
  });
  return (
    <>
      {error && (
        <Callout.Root>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className="max-w-xl space-y-3" onSubmit={onSubmit}>
        <TextField.Root>
          <TextField.Input
            defaultValue={issue?.title}
            placeholder="Title"
            {...register("title")}
          />
        </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          defaultValue={issue?.description}
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>

        <Button disabled={isSubmit}>
          {issue ? "Update Issue" : "Submit New Issue"}{" "}
          {isSubmit && <Spinner />}
        </Button>
      </form>
    </>
  );
};

export default IssueForm;
