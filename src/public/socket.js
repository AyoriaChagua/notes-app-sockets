const socket = io()

export const loadNotes = (callback) => {
    socket.on('server:load-notes', callback)
}

export const saveNote = (title, description) => {
    socket.emit('client:save-note', {
        title,
        description
    })
}

export const onNewNote = (callback) => {
    socket.on('server:save-note', callback)
}

export const deleteNote = id => {
    socket.emit('client:delete-note', id)
}

export const getNoteById = id => {
    socket.emit('client:get-note', id)
}

export const onSelected = (callback) => {
    socket.on('server:selected-note', callback)
}

export const updateNote = (id, title, description) => {
    socket.emit('client:update-note', {
        _id: id,
        title,
        description
    })
}