export function getNotes() {

  return new Promise((resolve) => {
    chrome.storage.sync.get(['notes'], function (result) {
      resolve(result.notes)
    });
  })
}

export function saveNote(note = {}, isNew) {

  return new Promise((resolve) => {
    
    getNotes().then((_notes = []) => {
      if (isNew) {
        note.id = `${new Date().getTime()}`;
        _notes.push(note);
      } else {
        let { title, content, id } = note;
        let _note = _notes.find(n => n.id === id);
        _note.title = title;
        _note.content = content;
      }

      chrome.storage.sync.set({ notes: _notes }, function () {
        resolve();
      });

    })

  });

}


export function deleteNote(id = '') {

  if (!id) {
    return;
  }

  return new Promise((resolve) => {

    getNotes().then((_notes) => {
      _notes = _notes.filter(n => n.id !== id);

      chrome.storage.sync.set({ notes: _notes }, function () {
        resolve();
      });
    })

  });

}