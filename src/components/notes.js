import { Fragment, h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { getNotes, saveNote, deleteNote } from '../storage';
import Modal from './modal';

const Notes = () => {
  let [notes, setNotes] = useState([]);
  let [fetching, setFetching] = useState(true);

  useEffect(() => {
    getNotes().then((_notes = []) => {
      setNotes(_notes);
      setFetching(false);
    });
  }, [])

  console.log(notes.length);

  return (
    <div class="notes-list mt-8">
      <h2 class="text-center text-xl my-4"> My Notes </h2>

      {
        fetching ? null : (
            notes.length ? (
              <div class="flex flex-wrap">
                {
                  notes.map((note) => <Note note={note} />)
                }
                <Note newTitle={true} />
              </div>
            ) : (
              <div class="text-gray-400 text-xl text-center mt-20"> 
                You don't have any notes added. 
                <br /> 
                <Note newTitle={true}>
                  <span class="text-xl m-4 mt-10 inline-block px-4 py-1 bg-indigo-500 text-white rounded">+ Add New Note</span>
                </Note>
              
              </div>
            )
        )
      }
      
    </div>
  )
};

const Note = (props) => {
  let { note = {}, newTitle, children } = props;
  let { title, content, id } = note;

  let [canShowEditPopup, setModalState] = useState(false);

  function handleClose(event) {
    setModalState(false);
    event.stopPropagation();
  }

  function handleSave(event, _note, isNew) {
    setModalState(false);
    saveNote(_note, isNew);
    window.location.reload();
    event.stopPropagation();
  }

  function _deleteNote(event, id) {
    let canDelete = window.confirm('Are you sure to delete?');

    if (canDelete) {
      deleteNote(id)
      window.location.reload();
    }

    event.stopPropagation();
  }

  return (
    <Fragment>
      {
        children ? (
          <div onClick={() => setModalState(true)}>
            {children}
          </div>
        ) : (
          <div class="rounded-md shadow-md p-3 bg-indigo-400 note cursor-pointer relative" onClick={() => setModalState(true)}>
            {
              newTitle ? <AddNote /> : (
                <div>
                  <h3 class="text-base font-semibold mb-2">{title}</h3>
                  <p class="description">
                    {content}
                  </p>
                </div>
              )
            }
            {
              newTitle ? null : (
                <a class="absolute bottom-0 right-0 p-2 m-2 rounded-full bg-white note-delete text-red-400" onClick={(e) => _deleteNote(e, id)}>
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                  </svg>
                </a>
              )
            }
          </div>
        )
      }
      {
        canShowEditPopup ?
          <Modal
            isNew={newTitle}
            note={note}
            onClose={handleClose}
            onSave={handleSave}
          /> : null
      }
    </Fragment>
  )
};

const AddNote = () => {
  return (
    <div class="flex items-center justify-center h-full text-6xl cursor-pointer">
      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-file-plus">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
        <polyline points="14 2 14 8 20 8"></polyline>
        <line x1="12" y1="18" x2="12" y2="12"></line>
        <line x1="9" y1="15" x2="15" y2="15"></line>
      </svg>
    </div>
  )
}

export default Notes;
