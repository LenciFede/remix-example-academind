import {
  redirect,
  type ActionFunctionArgs,
  type LinksFunction,
} from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import NewNote, { links as newNotesLinks } from "~/components/NewNote";
import NoteList, { links as newNotesLists } from "~/components/NoteList";

import { getStoredNotes, storeNotes } from "~/data/notes";

export default function NotesPage() {
  const notes = useLoaderData();
  console.log("notes: ", notes);
  return (
    <main>
      <NewNote />
      <NoteList notes={notes} />
    </main>
  );
}

export const loader = async () => {
  const notes = await getStoredNotes();
  return notes;
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData: FormData = await request.formData();
  const noteData = Object.fromEntries(formData);
  const existingNotes = await getStoredNotes();
  noteData.id = new Date().toISOString();
  const updateNotes = existingNotes.concat(noteData);
  await storeNotes(updateNotes);
  return redirect("/notes");
};

export const links: LinksFunction = () => {
  return [...newNotesLinks(), ...newNotesLists()];
};
