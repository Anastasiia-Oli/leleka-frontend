"use client";

import React from "react";
import { useRouter } from "next/navigation";
import DiaryEntryCard from "@/components/Diary/DiaryEntryCard/DiaryEntryCard"

interface PageProps {
    params: {
        entryId: string;
    };
}

const DiaryEntryPage = ({ params }: PageProps) => {
    const router = useRouter();

    const handleBack = () => {
        router.push('/diary');
    };

    return (
        <div style={{
            minHeight: "100vh",
            background: "var(--pastel-pink-lighter)",
            padding: "16px"
        }}>
            {/* <GreetingBlock /> */}
            <div style={{ maxWidth: "100%", margin: "0 auto" }}>

                {/* <DiaryEntryDetails
          entry={entry || null}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onBack={handleBack}
        /> */}
            </div>
        </div>
    );
};

export default DiaryEntryPage;