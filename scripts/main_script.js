function switch_frame(frame) {
    var link = "./frames/" + frame + ".html";
    document.getElementById("frame_content").src = link;
}