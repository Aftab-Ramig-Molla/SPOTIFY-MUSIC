
//initialize the variables
 let songIndex = 0;
 let audioElement = new Audio('music/1.mp3');
 let masterPlay = document.getElementById('masterPlay');
 let myprogressBar = document.getElementById('myprogressBar');
 let gif=document.getElementById('gif');
 let songItems=Array.from(document.getElementsByClassName('songItem'));
 let musterSongName=document.getElementById('masterSongName');
 let songItemPlay = Array.from(document.getElementsByClassName('songItemPlay'));
let songs = [
    {songName: "Agar Tum Saath Ho (Tamasha (2015)", filePath: "music/1.mp3", coverPath: "cover/1.jpg" },
    {songName: "Apna Bana Le (Bhediya (2022)", filePath: "music/2.mp3", coverPath: "cover/2.jpg" },
    {songName: "Kesariya (Brahmāstra: Part One – Shiva (2022)", filePath: "music/3.mp3", coverPath: "cover/3.jpg" },
    {songName: "Main Dhoondne Ko Zamaane Mein (Heartless (2014)", filePath: "music/4.mp3", coverPath: "cover/4.jpg" },
    {songName: "Muskurane Ki Wajah Tum Ho (Citylights (2014)", filePath: "music/5.mp3", coverPath: "cover/5.jpg" },
    {songName: "Phir Bhi Tumko Chaahunga (Half Girlfriend (2017)", filePath: "music/6.mp3", coverPath: "cover/6.jpg" },
    {songName: "Zalima  (Raees(2016)", filePath: "music/7.mp3", coverPath: "cover/7.jpg" },
    {songName: "Ek khwab mein aakar aankh khuli hai", filePath: "music/8.mp3", coverPath: "cover/8.jpg" },
    {songName: "Tere Hawaale (Laal Singh Chaddha (2022)", filePath: "music/9.mp3", coverPath: "cover/9.jpg" },
    {songName: "Uska Hi Banana (1920: Evil Returns (2012)", filePath: "music/10.mp3", coverPath: "cover/10.jpg"},
]

songItems.forEach((element,i)=> {
   
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText=songs[i].songName;
});


const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.classList.remove('fa-pause-circle');
    element.classList.add('fa-circle-play');
});
}

songItemPlay.forEach((element) => {
    element.addEventListener('click', (e) => {
        const songIndex = parseInt(e.target.id);  // Get the index of the clicked song
        if (audioElement.src.includes(`music/${songIndex + 1}.mp3`)) {
            // If the clicked song is the current song
            if (audioElement.paused || audioElement.currentTime <= 0) {
                // If the song is paused, play it
                audioElement.play();
                
                e.target.classList.remove('fa-circle-play');
                e.target.classList.add('fa-pause-circle');
                gif.style.opacity = 1;
                masterPlay.classList.remove('fa-circle-play');
                masterPlay.classList.add('fa-pause-circle');
            } else {
                // If the song is playing, pause it
                audioElement.pause();
                
                e.target.classList.remove('fa-pause-circle');
                e.target.classList.add('fa-circle-play');
                gif.style.opacity = 0;
                masterPlay.classList.remove('fa-pause-circle');
                masterPlay.classList.add('fa-circle-play');
            }
        } else {
            // If a different song is clicked
            makeAllPlays(); // Reset all buttons to play icon
            audioElement.src = `music/${songIndex + 1}.mp3`;  // Set the new song
            masterSongName.innerText = songs[songIndex].songName;
            audioElement.currentTime = 0;  // Start the song from the beginning
            audioElement.play();
            gif.style.opacity = 1;
            e.target.classList.remove('fa-circle-play');
            e.target.classList.add('fa-pause-circle');
            masterPlay.classList.remove('fa-circle-play');
            masterPlay.classList.add('fa-pause-circle');
        }
    });
});

/// Handle play/pause click on masterPlay
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        // If the song is paused, play it
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-pause-circle');
        
        // Update the corresponding songItemPlay icon to "pause"
        document.getElementById(songIndex).classList.remove('fa-circle-play');
        document.getElementById(songIndex).classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    } else {
        // If the song is playing, pause it
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-circle-play');

        // Update the corresponding songItemPlay icon to "play"
        document.getElementById(songIndex).classList.remove('fa-pause-circle');
        document.getElementById(songIndex).classList.add('fa-circle-play');    
        gif.style.opacity = 0;
    }
});

//Listen to Events
audioElement.addEventListener('timeupdate',()=>{
    //console.log('timeupdate');
    //Update Seekbar
   let progress = parseInt((audioElement.currentTime/audioElement.duration)* 100);
   console.log(progress);
   myprogressBar.value =progress;
});

myprogressBar.addEventListener('change',()=>{
    audioElement.currentTime=(myprogressBar.value*audioElement.duration/100);
});

// Handle Next button click
document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= 9) {
        songIndex = 0;  // Loop back to the first song
    } else {
        songIndex += 1;
    }

    audioElement.src = `music/${songIndex + 1}.mp3`;  // Set the new song
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;  // Start the song from the beginning
    audioElement.play();  // Play the new song
    gif.style.opacity = 1;

    // Update the master play button to "pause"
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-pause-circle');

    // Reset all play buttons to "fa-circle-play"
    makeAllPlays();

    // Update the current song's play icon to "fa-pause-circle"
    document.getElementById(songIndex).classList.remove('fa-circle-play');
    document.getElementById(songIndex).classList.add('fa-pause-circle');
});

// Handle Previous button click
document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = 9;  // Loop back to the last song
    } else {
        songIndex -= 1;
    }

    audioElement.src = `music/${songIndex + 1}.mp3`;  // Set the new song
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;  // Start the song from the beginning
    audioElement.play();  // Play the new song
    gif.style.opacity = 1;

    // Update the master play button to "pause"
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-pause-circle');

    // Reset all play buttons to "fa-circle-play"
    makeAllPlays();

    // Update the current song's play icon to "fa-pause-circle"
    document.getElementById(songIndex).classList.remove('fa-circle-play');
    document.getElementById(songIndex).classList.add('fa-pause-circle');
});


