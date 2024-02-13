import prisma from "@/prisma/client";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import IssueFormSkeleton from "./laoding";
const IssueForm = dynamic(() => import("../../_components/IssueForm"), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});

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
