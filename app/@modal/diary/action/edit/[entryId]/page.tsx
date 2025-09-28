import AddDiaryEntryModal from "../../../../../../components/Diary/AddDiaryEntryModal/AddDiaryEntryModal";

interface EditDiaryEntryModalPageProps {
  params: { entryId: string };
}

export default function EditDiaryEntryModalPage({
  params,
}: EditDiaryEntryModalPageProps) {
  return <AddDiaryEntryModal mode="edit" entryId={params.entryId} />;
}
