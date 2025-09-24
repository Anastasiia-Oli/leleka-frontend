import AddDiaryEntryModal from "../../../../../../components/Diary/AddDiaryEntryModal/AddDiaryEntryModal";

interface Props {
  params: { entryId: string };
}

export default function EditDiaryEntryModalPage({ params }: Props) {
  return <AddDiaryEntryModal mode="edit" entryId={params.entryId} />;
}
