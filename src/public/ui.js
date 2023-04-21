import {saveNote, deleteNote, getNoteById, updateNote} from './socket.js'

const notesList = document.querySelector("#notes")

const description = document.querySelector("#description")
const title = document.querySelector('#title')

let saveId = ""

const noteUI = note => {

    const div = document.createElement('div')

    div.innerHTML += `
                    <div class="card card-body border-0 shadow rounded-0 bg-light m-2 p-3 animate__animated animate__fadeInUp">
                        <div class= "d-flex justify-content-between">
                            <h1>${note.title}</h1>
                            <div>
                                <button class="btn btn-danger btm-sm delete" data-id="${note._id}">Delete</button>
                                <button class="btn btn-primary btm-sm update" data-id="${note._id}">Update</button>
                            </div>
                        </div>
                        <p>${note.description}</p>
                    </div>
    `

    const btnDelete = div.querySelector('.delete') 
    const btnUpdate = div.querySelector('.update')

    btnDelete.addEventListener('click', e => deleteNote(btnDelete.dataset.id))
    btnUpdate.addEventListener('click', e => getNoteById(btnDelete.dataset.id))

    return div
}

export const fillForm = note => {
    title.value = note.title
    description.value = note.description
    saveId = note._id
}

export const renderNotes = notes  => {
    notesList.innerHTML = ""
    notes.forEach(note => notesList.append(noteUI(note)))
}

export const onHandleSubmit = (event) => {

    event.preventDefault()
    
    if(saveId){
        updateNote(saveId, title.value, description.value)
    }else{
        saveNote(title.value, description.value)
    }
    saveId = ""
    title.value = ""
    description.value = ""

}

export const appendNote = note => {
    notesList.append(noteUI(note))
}