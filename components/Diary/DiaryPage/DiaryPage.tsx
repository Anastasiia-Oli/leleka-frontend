"use client";

import React, { useState } from "react";
import { DiaryEntry, Note } from "../Diary.types";
import { mockEntries, mockNotes } from "../Diary.mock";
import DiaryList from "../DiaryList/DiaryList";
import DiaryEntryDetails from "../DiaryEntryDetails/DiaryEntryDetails";
import NotesList from "../NotesList/NotesList";
import GreetingBlock from "../GreetingBlock/GreetingBlock";
import css from "./DiaryPage.module.css";

const DiaryPage: React.FC = () => {
  const [entries] = useState<DiaryEntry[]>(mockEntries);
  const [notes] = useState<Note[]>(mockNotes);
  const [selectedEntry, setSelectedEntry] = useState<DiaryEntry | null>(entries[0] || null);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  const handleEntryClick = (entry: DiaryEntry) => {
    // Use window.matchMedia for safe size checking
    if (typeof window !== 'undefined' && window.matchMedia('(max-width: 1023px)').matches) {
      // On mobile devices, go to a separate page
      window.location.href = `/diary/${entry.id}`;
    } else {
      // On the desktop, show the details in the right pane
      setSelectedEntry(entry);
      setSelectedNote(null);
    }
  };

  const handleNoteClick = (note: Note) => {
    setSelectedNote(note);
    setSelectedEntry(null);
  };

  const handleAddEntry = () => {
    console.log('Open AddDiaryEntryModal');
  };

  const handleAddNote = () => {
    console.log('Open AddNoteModal');
  };

  const handleEditEntry = () => {
    console.log('Open AddDiaryEntryModal for editing', selectedEntry);
  };

  const handleDeleteEntry = () => {
    console.log('Open ConfirmationModal for deletion', selectedEntry);
  };

  return (
    <div className={css.container}>
      <GreetingBlock />
      
      {/* Mobile version - show only the list */}
      <div className={css.mobileLayout}>
        <div className={css.mobileGrid}>
          <DiaryList 
            entries={entries}
            onEntryClick={handleEntryClick}
            onAddEntry={handleAddEntry}
          />
          <NotesList
            notes={notes}
            onNoteClick={handleNoteClick}
            onAddNote={handleAddNote}
          />
        </div>
      </div>

      {/* Desktop version - show everything in one grid */}
      <div className={css.desktopLayout}>
        <div className={css.desktopGrid}>
          <DiaryList 
            entries={entries}
            onEntryClick={handleEntryClick}
            selectedEntryId={selectedEntry?.id}
            onAddEntry={handleAddEntry}
          />
          
          <DiaryEntryDetails 
            entry={selectedEntry}
            onEdit={handleEditEntry}
            onDelete={handleDeleteEntry}
          />
          
          {/* <NotesList
            notes={notes}
            onNoteClick={handleNoteClick}
            selectedNoteId={selectedNote?.id}
            onAddNote={handleAddNote}
          /> */}
        </div>
      </div>
    </div>
  );
};

export default DiaryPage;