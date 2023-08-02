const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));

const bsOffcanvas = new bootstrap.Offcanvas("#offcanvasExample");
let notes = [
    {
        title: "Shopping List",
        content: "Milk, bread, fruits"
    },
    {
        title: "Cleaning",
        content: "Clean the house"
    },
    {
        title: "Reminder for Meeting",
        content: "Meeting at 14:00"
    },
    {
        title: "Cinema night",
        content: "After 21:00 do not forget go to cinema"
    }
];

uploadData();
let selectedNote = null;
$("#btnNew").click(newClicked);
$("#btnDelete").click(deleteClicked);
$("#frmNote").submit(formSubmit);
$("#offcanvasExample").on("show.bs.offcanvas", openCanvas);
$("#offcanvasExample").on("hide.bs.offcanvas", closeCanvas);



function list(futureSelectedNote = null) {
    $("#lstNotes").html("");
    for(const note of notes){
       $("<a/>")
        .prop("note", note)
        .click(clickTitle)
        .attr("href", "#")
        .text(note.title)
        .addClass("list-group-item list-group-item-action")
        .addClass( note == futureSelectedNote ? "active" : "")
        .appendTo("#lstNotes");
    }
}


function clickTitle(e) {
    e.preventDefault(); //url sonundaki # kaldırdık
    let note = $(this).prop("note");
    selectedNote = note;
    $("#lstNotlar>a").removeClass("active");
    $(this).addClass("active");
    $("#txtTitle").val(note.title);
    $("#txtContent").val(note.content);
    bsOffcanvas.hide();
}


function newClicked(e) {
   reset();
   bsOffcanvas.hide();
}


function deleteClicked(){
    if (selectedNote) {
        let index = notes.indexOf(selectedNote);
        notes.splice(index, 1);
        $("#lstNotes>a.active").remove();
        saveData();
    }

    reset();
}



function formSubmit(e) {
    e.preventDefault();

    if (selectedNote){
        selectedNote.title = $("#txtTitle").val();
        selectedNote.content = $("#txtContent").val();
        $("#lstNotes>a.active").text(selectedNote.title);
    }
    else {
        let newNote = {
            title: $("#txtTitle").val(),
            content: $("#txtContent").val()
        };
        notes.unshift(newNote);
        list(newNote);
        selectedNote = newNote;
    }
    saveData();
}


function reset() {
    selectedNote = null;
    $("#lstNotes>a").removeClass("active");
    $("#txtTitle").val("").focus();
    $("#txtContent").val("");
}


function saveData() {
    let json = JSON.stringify(notes);
    localStorage["veri"] = json;
}




function uploadData() {
    if (localStorage["veri"]) {
        notes = JSON.parse(localStorage["veri"]);
    }
}


function openCanvas(e){
    $("#offcanvasBody").html($("#leftPart"));
}


function closeCanvas(e){
    $("#solSutun").html($("#leftPart"));
}

list();