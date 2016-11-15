import $ from 'jquery'
import router from './router'
import check from './utils/check'
import homeTpl from './templates/home.hbs'
import contactTpl from './templates/contact.hbs'
import playerTpl from './templates/player.hbs'
import notFoundTpl from './templates/not-found.hbs'

const $app = $('#app')

if (!check.isPushStateAvailable()) {
    throw new Error('Your browser does not support this routing.');
}

function index() {
    $app.html(homeTpl())
}

function contact() {
    $app.html(contactTpl())
}

function player(context) {
    $app.html(playerTpl(context.params))
}

function notFound() {
    $app.html(notFoundTpl())
}

router
    .on('/', index)
    .on('/contact', contact)
    .on('/player/:name', player)
    .on('*', notFound)
    .start()
