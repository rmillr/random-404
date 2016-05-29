/* global speak XMLHttpRequest */
(() => {
  const json = 'http://www.reddit.com/r/wheredidthesodago/new/.json'
  const l = window.location
  const r = /[/.-]/g
  const d = decodeURIComponent
  const h = 'hostname'
  const p = 'pathname'
  const q = l[h].split('.').length === 3 ? d((l[h].split('.').shift() + l[p]).replace(r, ' ')) : d(l[p].replace(r, ' '))

  const $ = (selector) => document.querySelector(selector)

  const getSingle = (arr) => {
    const urls = arr.filter((v) => (/\imgur\b.*\gif|gifv\b/.test(v.data.url))).map((v) => v.data.url.replace(/gifv/, 'gif'))
    return urls[Math.floor(urls.length * Math.random())]
  }

  const load = (req) => {
    if (req.status >= 200 && req.status < 400) {
      const res = JSON.parse(req.responseText)
      const url = getSingle(res.data.children)
      setBG(url)
    }
  }

  const request = (url) => {
    const req = new XMLHttpRequest()
    req.open('GET', url, true)
    req.addEventListener('load', event => load(req))
    req.send()
  }

  const setBG = (url) => {
    const style = `background-image: url('${url}')`
    $('body').setAttribute('style', style)
    $('body').innerHTML = $('title').innerHTML = q
    speak(q)
  }

  const queryParam = /\?lol=/
  const queryMatch = l.search.split(queryParam)
  if (queryMatch.length > 1) {
    setBG(queryMatch[1])
  } else {
    request(json)
  }
})()
