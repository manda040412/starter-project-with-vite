import { openDB } from "idb";

export const dbPromise = openDB("life-story-db", 1, {
  upgrade(db) {
    db.createObjectStore("stories", { keyPath: "id" });
  }
});

export async function saveStory(story) {
  const db = await dbPromise;
  await db.put("stories", story);
}

export async function getStories() {
  const db = await dbPromise;
  return db.getAll("stories");
}

export async function deleteStory(id) {
  const db = await dbPromise;
  await db.delete("stories", id);
}