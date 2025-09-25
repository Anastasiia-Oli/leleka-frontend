"use client";

import { useState } from "react";
import AddDiaryEntryModal from "../../components/Diary/AddDiaryEntryModal/AddDiaryEntryModal";

export default function TestModalPage() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setOpen(true)}>Відкрити модалку</button>
      {open && <AddDiaryEntryModal mode="create" />}
    </div>
  );
}
