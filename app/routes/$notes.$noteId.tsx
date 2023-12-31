import { Link, useLoaderData } from "@remix-run/react";

import { getStoredNotes } from "~/data/notes";
import styles from "~/styles/note-details.css";

export default function NoteDetailsPage() {
  const note: any = useLoaderData();

  return (
    <main id="note-details">
      <header>
        <nav>
          <Link to="/notes">Back to all Notes</Link>
        </nav>
        <h1>{note.title}</h1>
      </header>
      <p id="note-details-content">{note.content}</p>
    </main>
  );
}

export async function loader({ params }: any) {
  const notes = await getStoredNotes();
  const noteId = params.noteId;
  const selectedNote = notes.find((note: any) => note.id === noteId);
  return selectedNote;
}

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}
