import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import Markdown from "react-markdown";
import { Issue } from "@prisma/client";
import { IssueStatusBadge } from "@/app/components";

const IssueDetails = ({ issue }: { issue: Issue }) => {
  return (
    <>
      <Heading>{issue.title}</Heading>
      <Flex my="2" className="space-x-3">
        <IssueStatusBadge status={issue.status} />
        <Text>{issue.createdAt.toDateString()}</Text>
      </Flex>
      <Card className="prose ">
        <Markdown>{issue.description}</Markdown>
      </Card>
    </>
  );
};
export default IssueDetails;
