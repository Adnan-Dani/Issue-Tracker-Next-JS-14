import { IssueStatusBadge } from "@/app/components";
import prisma from "@/prisma/client";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import Markdown from "react-markdown";

interface Props {
  params: { id: string };
}
const IssueDetailPage = async ({ params }: Props) => {
  // if (typeof params.id !== "number") notFound();

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!issue) return notFound();
  return (
    <div>
      <Heading>{issue.title}</Heading>
      <Flex my="2" className="space-x-3">
        <IssueStatusBadge status={issue.status} />
        <Text>{issue.createdAt.toDateString()}</Text>
      </Flex>
      <Card className="prose ">
        <Markdown>{issue.description}</Markdown>
      </Card>
    </div>
  );
};
export default IssueDetailPage;