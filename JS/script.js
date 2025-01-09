let currFolder;
async function getSongs(folder) {
    currFolder = folder;
    let a = await fetch(`/${folder}/`)
    let response = await a.text();
    let div = document.createElement("div");
    div.innerHTML = response;

    let as = div.getElementsByTagName('a');
    songs = []

    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split(`/${folder}/`)[1])
        }
    }

    let songsUl = document.querySelector(".songsList").getElementsByTagName("ul")[0];
    songsUl.innerHTML = " "
    playMusic(songs[0], true);
    for (const song of songs) {
        songsUl.innerHTML = songsUl.innerHTML + `<li class="rounded">
                                <img src="images/music.svg" alt="">
                                <div class="songInfo">
                                    <p>${song.split("-")[0].replaceAll("%20", " ")}</p>
                                    <p>${song.split("-")[1].replaceAll("%20", " ").replaceAll(".mp3", " ").replaceAll("%2C", ",")}</p>
                                </div>
                                <div class="musicPlay">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="35" height="35">
                                        <!-- Circle with green fill and no border -->
                                        <circle cx="12" cy="12" r="10" fill="rgb(47, 194, 81)" />
                                        <!-- Play button with solid black fill -->
                                        <path
                                            d="M9.5 11.1998V12.8002C9.5 14.3195 9.5 15.0791 9.95576 15.3862C10.4115 15.6932 11.0348 15.3535 12.2815 14.6741L13.7497 13.8738C15.2499 13.0562 16 12.6474 16 12C16 11.3526 15.2499 10.9438 13.7497 10.1262L12.2815 9.32594C11.0348 8.6465 10.4115 8.30678 9.95576 8.61382C9.5 8.92086 9.5 9.6805 9.5 11.1998Z"
                                            fill="black" />
                                    </svg>
        
                                </div>

                            </li>`
    }

    // Adding Event listener for playlists
    Array.from(document.querySelector(".songsList").getElementsByTagName("li")).forEach(e => {
        let firstName = e.querySelector(".songInfo").firstElementChild.innerHTML;
        let lastName = e.querySelector(".songInfo").lastElementChild.innerHTML;


        e.addEventListener("click", () => {
            let music = firstName + "-" + lastName
            let musicName = music.trim()
            console.log(musicName + ".mp3")
            playMusic(musicName + ".mp3")
        })
    })

}

function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}

let currentSong = new Audio();

let songs;

const playMusic = (track, pause = false) => {
    currentSong.src = (`/${currFolder}/` + track.trim())
    if (!pause) {
        currentSong.play();
        playBtn.innerHTML = pausesvg;
    }
    document.querySelector(".songname").innerHTML = track.replaceAll("%20", " ").replaceAll("%2C", ",");
    document.querySelector(".songtime").innerHTML = "00:00/00:00"
}

async function displayAlbums() {
    let a = await fetch(`/songs/`)
    let response = await a.text();
    let div = document.createElement("div");
    div.innerHTML = response;
    let cardContainer = document.querySelector(".cardContainer")
    Array.from(div.getElementsByTagName("a")).forEach(async (e) => {
        if (e.href.includes("/songs/")) {
            let folder = e.href.split("/songs/")[1]
            let details = await fetch(`/songs/${folder}/info.json`)
            let response = await details.json();
            cardContainer.innerHTML = cardContainer.innerHTML + `<div data-folder= "${folder}" class="card rounded">
                        <div class="play">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="56" height="56">
                                <!-- Circle with green fill and no border -->
                                <circle cx="12" cy="12" r="10" fill="rgb(47, 194, 81)" />
                                <!-- Play button with solid black fill -->
                                <path
                                    d="M9.5 11.1998V12.8002C9.5 14.3195 9.5 15.0791 9.95576 15.3862C10.4115 15.6932 11.0348 15.3535 12.2815 14.6741L13.7497 13.8738C15.2499 13.0562 16 12.6474 16 12C16 11.3526 15.2499 10.9438 13.7497 10.1262L12.2815 9.32594C11.0348 8.6465 10.4115 8.30678 9.95576 8.61382C9.5 8.92086 9.5 9.6805 9.5 11.1998Z"
                                    fill="black" />
                            </svg>

                        </div>
                        <img class="rounded" src="${response.image}"
                            alt="">
                        <p>${response.title}</p>
                    </div>`
        }


    })



}


let playBtn = document.getElementById("mainMusicPlay")
let playsvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="45" height="45">
                                <!-- Circle with green fill and no border -->
                                <circle cx="12" cy="12" r="10" fill="rgb(47, 194, 81)" />
                                <!-- Play button with solid black fill -->
                                <path
                                    d="M9.5 11.1998V12.8002C9.5 14.3195 9.5 15.0791 9.95576 15.3862C10.4115 15.6932 11.0348 15.3535 12.2815 14.6741L13.7497 13.8738C15.2499 13.0562 16 12.6474 16 12C16 11.3526 15.2499 10.9438 13.7497 10.1262L12.2815 9.32594C11.0348 8.6465 10.4115 8.30678 9.95576 8.61382C9.5 8.92086 9.5 9.6805 9.5 11.1998Z"
                                    fill="black" />
                            </svg>`
let pausesvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#ffffff" fill="none">
    <path d="M4 7C4 5.58579 4 4.87868 4.43934 4.43934C4.87868 4 5.58579 4 7 4C8.41421 4 9.12132 4 9.56066 4.43934C10 4.87868 10 5.58579 10 7V17C10 18.4142 10 19.1213 9.56066 19.5607C9.12132 20 8.41421 20 7 20C5.58579 20 4.87868 20 4.43934 19.5607C4 19.1213 4 18.4142 4 17V7Z" stroke="currentColor" stroke-width="1.5" />
    <path d="M14 7C14 5.58579 14 4.87868 14.4393 4.43934C14.8787 4 15.5858 4 17 4C18.4142 4 19.1213 4 19.5607 4.43934C20 4.87868 20 5.58579 20 7V17C20 18.4142 20 19.1213 19.5607 19.5607C19.1213 20 18.4142 20 17 20C15.5858 20 14.8787 20 14.4393 19.5607C14 19.1213 14 18.4142 14 17V7Z" stroke="currentColor" stroke-width="1.5" />
</svg>`

async function main() {
    await displayAlbums()
    await getSongs("songs/favourites")
    // let songUrl = `/${folder}/${songs[0]}`;


    //Adding event listener for play pause, previous and next song


    playBtn.addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play();
            playBtn.innerHTML = pausesvg;
        }

        else {
            currentSong.pause();
            playBtn.innerHTML = playsvg;
        }
    })

    //Add event listener for song duration

    currentSong.addEventListener("timeupdate", () => {
        document.querySelector(".songtime").innerHTML = `${secondsToMinutesSeconds(currentSong.currentTime)} / ${secondsToMinutesSeconds(currentSong.duration)}`
        document.querySelector(".circle").style.left = currentSong.currentTime / currentSong.duration * 100 + "%";

    })

    //Add event listener after song ends
    currentSong.addEventListener("ended", () => {
        // Reset the song time to 00:00
        document.querySelector(".songtime").innerHTML = "00:00/00:00";

        // Change the play button back to the play icon
        playBtn.innerHTML = playsvg;
    });

    // Add event listener for seekbar
    document.querySelector(".seekbar").addEventListener("click", (e) => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".circle").style.left = percent + "%";
        currentSong.currentTime = (currentSong.duration * percent) / 100
    })

    //Add event listener to display left portion
    document.querySelector(".hamburger").addEventListener("click", () => {
        document.querySelector(".left").style.left = "0"
    })

    //Add event listener to hide left portion
    document.querySelector(".close").addEventListener("click", () => {
        document.querySelector(".left").style.left = "-110%"
    })

    //Add event listener for next song
    document.getElementById("next").addEventListener("click", () => {
        let index = songs.indexOf(currentSong.src.split(`/${currFolder}/`)[1])
        if ((index + 1) < songs.length) {
            playMusic(songs[index + 1])
        }
    })

    //Add event listener for previous song
    document.getElementById("previous").addEventListener("click", () => {
        let index = songs.indexOf(currentSong.src.split(`/${currFolder}/`)[1])
        if ((index - 1) >= 0) {
            playMusic(songs[index - 1])
        }
    })

    // Add event listener to albums

    Array.from(document.getElementsByClassName("card")).forEach( e =>{
        e.addEventListener("click", async (item)=>{
            await getSongs(`songs/${item.currentTarget.dataset.folder}`)
            playMusic(songs[0])

        } )
    })

        


}

main()