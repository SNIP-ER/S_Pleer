const player = document.querySelector('.player'),
	  playBtn = document.querySelector('.play'),
	  prevBtn = document.querySelector('.prev'),
	  nextBtn = document.querySelector('.next'),
	  audio = document.querySelector('.audio'),
	  progressContainer = document.querySelector('.progress_container'),
	  progress = document.querySelector('.progress'),
	  tittle = document.querySelector('.song'),
	  cover = document.querySelector('.cover_img'),
	  imgSrc = document.querySelector('.img_src'),
	  progressContainer2 = document.querySelector('.progress_container_2'),
	  progress2 = document.querySelector('.progress_2')
	  zvuk = document.querySelector('.zvuk_img')

// Песни
const songs = ['Тарковчанин', 'Девочка с ПорнХаба', 'Ночь на двенадцать', 'По приколу', 'Полюбил', 'Социальный долбаеб', 'Школьная любовь']

// По умолчанию
let songIndex = 0
audio.volume = 0.3
progress2.style.height = `30%`



function loadSong(song) {
	tittle.innerHTML = song
	audio.src = `music/${song}.mp3`
	cover.src = `img/cover${songIndex+1}.jpg`
}

loadSong(songs[songIndex])



function playSong() {
	player.classList.add('play')
	cover.classList.add('active')
	imgSrc.src = 'Image/stop.png'
	audio.play()
}



function pauseSong() {
	player.classList.remove('play')
	cover.classList.remove('active')
	imgSrc.src = 'Image/play.png'
	audio.pause()
}

playBtn.addEventListener('click', () => {
	const isPlaying = player.classList.contains('play')
	if (isPlaying) {
		pauseSong()
	} else {
		playSong()
	}
})



function zvukis() {
	player.classList.add('zvuchis')
	audio.muted = false;
	zvuk.src = 'Image/zvuk.png'
}

function mutis() {
	player.classList.remove('zvuchis')
	audio.muted = true;
	zvuk.src = 'Image/mute.png'
}

zvuk.addEventListener('click', () => {
	const isZvuking = player.classList.contains('zvuchis')
	if (isZvuking) {
		mutis()
	} else {
		zvukis()
	}
})



function nextSong() {
	songIndex++

	if (songIndex > songs.length - 1) {
		songIndex = 0
	}

	loadSong(songs[songIndex])
	pauseSong()
}

nextBtn.addEventListener('click', nextSong)



function prevSong() {
	songIndex--

	if (songIndex < 0) {
		songIndex = songs.length - 1
	}

	loadSong(songs[songIndex])
	pauseSong()
}

prevBtn.addEventListener('click', prevSong)



function updateProgress(e) {
	const {duration, currentTime} = e.srcElement
	const progressPercent = (currentTime/duration) * 100
	progress.style.width = `${progressPercent}%`
}
audio.addEventListener('timeupdate', updateProgress)

function setProgress(e) {
	const width = this.clientWidth
	const clickX = e.offsetX
	const duration = audio.duration

	audio.currentTime = (clickX/width) * duration
}
progressContainer.addEventListener('click', setProgress)



//function volue(e) {
//	const clickY2 = (e.offsetY)/100
//	audio.volume = clickY2
//
//	const clickY = e.offsetY
//	progress2.style.height = `${clickY}%`
//}
//progressContainer2.addEventListener('click', volue)
let isDragging = false;

function startDragging(e) {
  isDragging = true;
  volue(e);
}

function stopDragging() {
  isDragging = false;
}

function volue(e) {
  if (isDragging) {
    const clickY2 = (e.offsetY) / 100;
    audio.volume = clickY2;

    const clickY = e.offsetY;
    progress2.style.height = `${clickY}%`;
  }
}

progressContainer2.addEventListener('mousedown', startDragging);
progressContainer2.addEventListener('mousemove', volue);
document.addEventListener('mouseup', stopDragging);



function nextSong2() {
	songIndex++

	if (songIndex > songs.length - 1) {
		songIndex = 0
	}

	loadSong(songs[songIndex])
	playSong()
}

audio.addEventListener('ended', nextSong2)



