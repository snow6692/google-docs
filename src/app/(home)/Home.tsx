"use client";
import { usePaginatedQuery } from "convex/react";
import HomeNavbar from "../documents/[documentId]/HomeNavbar";
import TemplatesGallery from "./TemplatesGallery";
import { api } from "../../../convex/_generated/api";
import DocumentsTable from "./DocumentsTable";
import { useSearchParam } from "@/hooks/useSearchParams";

function Home() {
  const [search] = useSearchParam("search");
  const { results, status, loadMore } = usePaginatedQuery(
    api.documents.get,
    { search },
    { initialNumItems: 5 }
  );
 
  return (
    <div className="min-h-screen flex flex-col">
      <div className=" fixed top-0 left-0 right-0 z-10 h-16  bg-white p-4">
        <HomeNavbar  />
      </div>
      <div className=" mt-16">
        <TemplatesGallery />
        <DocumentsTable
          documents={results}
          loadMore={loadMore}
          status={status}
        />
      </div>
    </div>
  );
}

export default Home;
