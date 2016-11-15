import $ from 'jquery'
import router from './router'
import check from './utils/check'
import homeTpl from './templates/home.hbs'
import contactTpl from './templates/contact.hbs'
import playerTpl from './templates/player.hbs'
import notFoundTpl from './templates/not-found.hbs'

const $app = $('#app')

function index() {
    $app.html(homeTpl())
}

function contact() {
    $app.html(contactTpl())
}

function notFound() {
    $app.html(notFoundTpl())
}

function player(context) {
    $app.html(playerTpl(context.params))
}

router.registerRoute('/', index)
router.registerRoute('/contact', contact)
router.registerRoute('/player/:name', player)
router.registerRoute('*', notFound)
router.registerRoute()

router.start()
