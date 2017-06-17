socket.on("start", data => {
    console.log("CHECK");
    const txts = data.txts;
    const txt = document.getElementById("txt");
    const text = document.getElementById("text"); 

    for(let i = txts.length-1; i >= 0; i--){
        let p = document.createElement("p");
        p.innerHTML = txts[i];
        text.appendChild(p);
    }
});

function submit(){
    console.log("CHECL");
    let data = {
        txt: txt.value,
    }
    socket.emit("txt", data);
    location.reload();
}