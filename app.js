ts = document.querySelector('#ts')
ip = document.querySelector('#input')
bs = document.querySelector('#btn-start')
bp = document.querySelector('#btn-pause')
bc = document.querySelector('#btn-cont')

timer = null
clearInterval(timer)

targetTime = null
tempSec = null

ts.innerHTML = '00:00'
bs.style.display = ''
bp.style.display = 'none'
bc.style.display = 'none'

document.addEventListener(
  'click',
  e => {
    if (e.target === bs && ip.value !== '') {
      timerStart(ip.value)
    } else if (e.target === bp) {
      timerPause()
    } else if (e.target === bc) {
      timerStart(tempSec)
    }
  },
  false
)
ip.addEventListener('keyup', e => {
  if (e.keyCode === 13 && ip.value !== '') {
    timerStart(ip.value)
  }
})

function timerStart(t) {
  if (timer) {
    clearInterval(timer)
  }
  setTargetTime(t)
  tempSec = null
  timer = setInterval(timerRepeat.bind(this), 47)
  bs.style.display = 'none'
  bp.style.display = ''
  bc.style.display = 'none'
}

function timerRepeat() {
  const t = new Date().getTime()
  if (t >= targetTime) {
    timerStop()
  } else {
    ts.innerHTML = miliToClock(targetTime - t)
    document.title = ts.innerHTML.slice(0, -4)
  }
}

function timerStop() {
  clearInterval(timer)
  ts.innerHTML = '00:00 Done'
bs.style.display = ''
bp.style.display = 'none'
bc.style.display = 'none'
  setTimeout(() => {
    alert('done')
  }, 100)
}

function timerPause() {
  clearInterval(timer)
  const tempSecond = targetTime - new Date().getTime()
  tempSec = tempSecond / 1000
  bs.style.display = ''
  bp.style.display = 'none'
  bc.style.display = ''
}

function setTargetTime(t) {
  const ct = new Date().getTime()
  if (t < 100) {
    targetTime = ct + t * 1000
  } else {
    const min = Math.floor(t / 100)
    targetTime = ct + min * 60 * 1000 + (t - min * 100) * 1000
  }
}

function miliToClock(t) {
  let second = [0, 0, 0]
  second[0] = Math.floor(t / 1000 / 60)
  second[1] = Math.floor((t - second[0] * 60 * 1000) / 1000)
  second[2] = t - second[0] * 60 * 1000 - second[1] * 1000
  return `${second[0]
    .toString()
    .padStart(2, '0')}:${second[1]
    .toString()
    .padStart(2, '0')}.${second[2].toString().padStart(3, '0')}`
}
