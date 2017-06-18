let txt, txts, text, socket;

window.onload = () => {

    socket = io();

    socket.on("start", data => {
        last = data.last;
        txt = document.getElementById("txt");
        text = document.getElementById("text"); 

        let p = document.createElement("p");
        p.innerHTML = last;
        text.appendChild(p);
    });
    socket.on("update", () => {location.reload();});

}

function submit(){
    let data = {
        txt: txt.value,
    }
    socket.emit("txt", data);
    location.reload();
}