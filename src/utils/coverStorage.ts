// IndexedDB storage helper for portfolio project cover images (supports .gif, .png, .jpg, .webp)

const DB_NAME = 'ricardo_portfolio_assets';
const STORE_NAME = 'project_covers';
const DB_VERSION = 1;

let dbPromise: Promise<IDBDatabase> | null = null;

function getDB(): Promise<IDBDatabase> {
  if (!dbPromise) {
    dbPromise = new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME);
        }
      };
    });
  }
  return dbPromise;
}

export async function getStoredCover(projectId: string): Promise<string | null> {
  try {
    const db = await getDB();
    return new Promise((resolve) => {
      const transaction = db.transaction([STORE_NAME], 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.get(projectId);
      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => resolve(null);
    });
  } catch (err) {
    console.error('Failed to get cover from IndexedDB:', err);
    return null;
  }
}

export async function setStoredCover(projectId: string, dataUrl: string): Promise<void> {
  try {
    const db = await getDB();
    await new Promise<void>((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.put(dataUrl, projectId);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
    window.dispatchEvent(new CustomEvent('portfolio_cover_updated', { detail: { projectId, dataUrl } }));
  } catch (err) {
    console.error('Failed to set cover in IndexedDB:', err);
  }
}

export async function removeStoredCover(projectId: string): Promise<void> {
  try {
    const db = await getDB();
    await new Promise<void>((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.delete(projectId);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
    window.dispatchEvent(new CustomEvent('portfolio_cover_updated', { detail: { projectId, dataUrl: null } }));
  } catch (err) {
    console.error('Failed to remove cover from IndexedDB:', err);
  }
}

export async function getAllStoredCovers(): Promise<Record<string, string>> {
  try {
    const db = await getDB();
    return new Promise((resolve) => {
      const transaction = db.transaction([STORE_NAME], 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.openCursor();
      const results: Record<string, string> = {};
      request.onsuccess = (event) => {
        const cursor = (event.target as IDBRequest<IDBCursorWithValue>).result;
        if (cursor) {
          results[cursor.key as string] = cursor.value;
          cursor.continue();
        } else {
          resolve(results);
        }
      };
      request.onerror = () => resolve({});
    });
  } catch (err) {
    console.error('Failed to get all covers:', err);
    return {};
  }
}
