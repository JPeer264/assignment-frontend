import $ from 'jquery'
import router from './router'
import homeTpl from './templates/home.hbs'
import playerTpl from './templates/player.hbs'
import contactTpl from './templates/contact.hbs'
import notFoundTpl from './templates/not-found.hbs'
import playerData from './data/player.json'

const $app = $('#app')

function index() {
  $app.html(homeTpl())
}

function contact() {
  $app.html(contactTpl())
}

function players(ctx) {
  $app.html(playerTpl(playerData[ctx.params.player]))
}

function notFound() {
  $app.html(notFoundTpl())
}

router('/', index)
router('/players/:player', players)
router('/contact', contact)
router('*', notFound)
router()
