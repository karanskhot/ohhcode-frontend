import SnippetClient from './_components/SnippetClient';

const SnippetPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  return <SnippetClient snippetId={id} />;
};
export default SnippetPage;
