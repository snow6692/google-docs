import Editor from "../../../components/Editor";
import Navbar from "../../../components/navbar/Navbar";
import Toolbar from "../../../components/tools/Toolbar";
import { Room } from "./Room";

interface DocumentPageProps {
  params: Promise<{ documentId: string }>;
}

async function DocumentPage({ params }: DocumentPageProps) {
  const { documentId } = await params;
  console.log(documentId);

  return (
    <Room>
      <div className="min-h-screen bg-[#fafbfd]">
        <div className=" flex flex-col px-4 pt-2 gap-y-2 fixed top-0 left-0 right-0 z-10 bg-[#fafbfd] print:hidden">
          <Navbar />
          <Toolbar />
        </div>
        <div className=" pt-[114px] print:pt-0 ">
          <Editor />
        </div>
      </div>
    </Room>
  );
}

export default DocumentPage;
