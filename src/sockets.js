import Note from "./models/Note"

export default (io)=>{
    io.on('connection',  (socket)=>{
        
        const emitNotes = async () => {
            const notes = await Note.find()
            io.emit('server:load-notes', notes)
        } 

        emitNotes()

        socket.on('client:save-note', async data => {
            const newNote = new Note(data)
            const saveNote = await newNote.save()
            io.emit('server:save-note', saveNote)
        })

        socket.on('client:delete-note', async (id) => {
            await Note.findByIdAndDelete(id)
            emitNotes()
        })

        socket.on('client:get-note', async id => {
            const note = await Note.findById(id)
            io.emit('server:selected-note', note)
        })
        socket.on('client:update-note', async (updatedNote) => {
            await Note.findByIdAndUpdate(updatedNote._id, {
                title: updatedNote.title,
                description: updatedNote.description
            })
            emitNotes()
        })
    })
    
}