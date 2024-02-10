import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import IssueForm from "../../_components/IssueForm";

interface Props {
  params: { id: string };
}

// eslint-disable-next-line @next/next/no-async-client-component
const EditIssuePage = async ({ params }: Props) => {
  const issue = await prisma.issue?.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!issue) return notFound();
  return (
    <>
      <IssueForm issue={issue} />
    </>
  );
};

export default EditIssuePage;
