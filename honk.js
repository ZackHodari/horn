honk = {
	init: function(buffer) {
		console.log(buffer)
		honk.buffer = buffer
		window.AudioContext = window.AudioContext || window.webkitAudioContext;
		var context = honk.context = new AudioContext()
		honk.setupEvents()
	},

	setupEvents: function() {
		var handleClick = function(e) {
				e.preventDefault()
				e.stopPropagation()
				var y = e.touches ? e.touches[e.touches.length-1].clientY : e.clientY
				honk.honk(y*5/window.innerHeight+0.1)
			}
			
		document.addEventListener('click', handleClick, false)
		document.addEventListener('touchstart', handleClick, false)
	},

	lastSound: null,

	honk: function(pitch) {
		if(honk.lastSound) {
			honk.lastSound[honk.lastSound.stop ? 'stop' : 'noteOff'](0)
		}
		var sound = honk.lastSound = honk.context.createBufferSource()
		sound.buffer = honk.buffer
		sound.connect(honk.context.destination)
		sound.playbackRate.value = pitch
		sound[sound.start ? 'start' : 'noteOn'](0)
	}
}
