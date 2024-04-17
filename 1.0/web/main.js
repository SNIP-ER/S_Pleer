const player = document.querySelector('.player'),
	  playBtn = document.querySelector('.play'),
	  prevBtn = document.querySelector('.prev'),
	  nextBtn = document.querySelector('.next'),
	  audio = document.querySelector('.audio'),
	  progressContainer = document.querySelector('.progress_container'),
	  progress = document.querySelector('.progress'),
	  tittle = document.querySelector('.song'),
	  cover = document.querySelector('.cover_img'),
	  imgSrc = document.querySelector('.img_src')

// Песни
const songs = ['Тарковчанин', 'Девочка с ПорнХаба', 'Ночь на двенадцать', 'По приколу', 'Полюбил', 'Социальный долбаеб', 'Школьная любовь']

// По умолчанию
let songIndex = 0



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



function nextSong2() {
	songIndex++

	if (songIndex > songs.length - 1) {
		songIndex = 0
	}

	loadSong(songs[songIndex])
	playSong()
}

audio.addEventListener('ended', nextSong2)