import { useEffect, useState } from "react";
import { supabase } from "../supabase";
import BackButton from "../components/BackButton";
import Toast from "../components/Toast";

function ViewBooks() {
  const [books, setBooks] = useState([]);
  const [snippets, setSnippets] = useState([]);
  const [activeBook, setActiveBook] = useState(null);

  const [editBook, setEditBook] = useState(null);
  const [editSnippet, setEditSnippet] = useState(null);

  const [toast, setToast] = useState(null);

  const loadBooks = async () => {
    const { data, error } = await supabase.from("books").select("*");
    if (error) {
      setToast({ msg: "Failed to load books", type: "error" });
    } else {
      setBooks(data || []);
    }
  };

  useEffect(() => {
    loadBooks();
  }, []);

  const loadSnippets = async (book) => {
    setActiveBook(book);
    const { data, error } = await supabase
      .from("snippets")
      .select("*")
      .eq("book_id", book.id);

    if (error) {
      setToast({ msg: "Failed to load snippets", type: "error" });
    } else {
      setSnippets(data || []);
    }
  };

  /* ---------- BOOK ---------- */
  const updateBook = async () => {
    const { error } = await supabase
      .from("books")
      .update({
        name: editBook.name,
        priority: editBook.priority,
      })
      .eq("id", editBook.id);

    if (error) {
      setToast({ msg: "Book update failed", type: "error" });
    } else {
      setToast({ msg: "Book updated", type: "success" });
      setEditBook(null);
      loadBooks();
    }
  };

  const deleteBook = async (id) => {
    if (!confirm("Delete book?")) return;

    const { error } = await supabase.from("books").delete().eq("id", id);

    if (error) {
      setToast({ msg: "Book delete failed", type: "error" });
    } else {
      setToast({ msg: "Book deleted", type: "info" });
      setActiveBook(null);
      loadBooks();
    }
  };

  /* ---------- SNIPPET ---------- */
  const updateSnippet = async () => {
    const { error } = await supabase
      .from("snippets")
      .update({
        title: editSnippet.title,
        code: editSnippet.code,
        description: editSnippet.description,
        tags: editSnippet.tags,
        book_id: editSnippet.book_id,
      })
      .eq("id", editSnippet.id);

    if (error) {
      setToast({ msg: "Snippet update failed", type: "error" });
    } else {
      setToast({ msg: "Snippet updated", type: "success" });
      setEditSnippet(null);
      loadSnippets(activeBook);
    }
  };

  const deleteSnippet = async (id) => {
    if (!confirm("Delete snippet?")) return;

    const { error } = await supabase.from("snippets").delete().eq("id", id);

    if (error) {
      setToast({ msg: "Snippet delete failed", type: "error" });
    } else {
      setToast({ msg: "Snippet deleted", type: "info" });
      loadSnippets(activeBook);
    }
  };

  return (
    <div className="page">
      <BackButton />
      <h3>Books</h3>

      {books.map((book) => (
        <div key={book.id} className="book-card">
          <div onClick={() => loadSnippets(book)}>
            📘 {book.name} ({book.priority})
          </div>

          <div>
            <button onClick={() => setEditBook(book)}>Edit</button>
            <button className="logout" onClick={() => deleteBook(book.id)}>
              Delete
            </button>
          </div>
        </div>
      ))}

      {/* ---------- EDIT BOOK ---------- */}
      {editBook && (
        <>
          <h4>Edit Book</h4>

          <input
            value={editBook.name}
            onChange={(e) =>
              setEditBook({ ...editBook, name: e.target.value })
            }
          />

          <select
            value={editBook.priority}
            onChange={(e) =>
              setEditBook({ ...editBook, priority: e.target.value })
            }
          >
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>

          <button onClick={updateBook}>Update Book</button>
        </>
      )}

      {/* ---------- SNIPPETS ---------- */}
      {activeBook && (
        <>
          <h4>Snippets in {activeBook.name}</h4>

          {snippets.map((s) => (
            <div key={s.id} className="snippet-card">
              <b>{s.title}</b>
              <pre>{s.code}</pre>
              <small>{s.tags}</small>

              <div>
                <button onClick={() => setEditSnippet(s)}>Edit</button>
                <button className="logout" onClick={() => deleteSnippet(s.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </>
      )}

      {/* ---------- EDIT SNIPPET ---------- */}
      {editSnippet && (
        <>
          <h4>Edit Snippet</h4>

          <input
            value={editSnippet.title}
            onChange={(e) =>
              setEditSnippet({ ...editSnippet, title: e.target.value })
            }
          />

          <select
            value={editSnippet.book_id}
            onChange={(e) =>
              setEditSnippet({
                ...editSnippet,
                book_id: e.target.value,
              })
            }
          >
            {books.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))}
          </select>

          <textarea
            rows="6"
            value={editSnippet.code}
            onChange={(e) =>
              setEditSnippet({ ...editSnippet, code: e.target.value })
            }
          />

          <input
            value={editSnippet.description}
            onChange={(e) =>
              setEditSnippet({
                ...editSnippet,
                description: e.target.value,
              })
            }
          />

          <input
            value={editSnippet.tags}
            onChange={(e) =>
              setEditSnippet({ ...editSnippet, tags: e.target.value })
            }
          />

          <button onClick={updateSnippet}>Update Snippet</button>
        </>
      )}

      {/* ---------- TOAST ---------- */}
      {toast && (
        <Toast
          message={toast.msg}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}

export default ViewBooks;
