import prisma from "@/prisma/client";
import { Box, Grid, Flex } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";
import DeleteIssueButton from "./DeleteIssueButton";

interface Props {
  params: { id: string };
}
const IssueDetailPage = async ({ params }: Props) => {
  const issue = await prisma.issue?.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!issue) return notFound();
  return (
    <Grid gap="5" columns={{ initial: "1", sm: "5" }}>
      <Box className="lg:col-span-4">
        <IssueDetails issue={issue} />
      </Box>
      <Box>
        <Flex gap="4" direction="column">
          <EditIssueButton issueId={issue.id} />
          <DeleteIssueButton issueId={issue.id} />
        </Flex>
      </Box>
    </Grid>
  );
};
export default IssueDetailPage;
