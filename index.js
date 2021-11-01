import { Router } from 'itty-router'

// Create a new router
const router = Router()

let headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
  "Access-Control-Max-Age": "86400",
}


router.get("/new-board", () => {
  let i = 0;
  let collectables = [
    {"id": ++i, "description":  "See a cow"},
    {"id": ++i, "description":  "See a sheep"},
    {"id": ++i, "description":  "See a pink car"},
    {"id": ++i, "description":  "See a yellow car"},
    {"id": ++i, "description":  "See a red car"},
    {"id": ++i, "description":  "See a green lorry"},
    {"id": ++i, "description":  "See a red lorry"},
    {"id": ++i, "description":  "See a tanker lorry"},
    {"id": ++i, "description":  "See a recovery lorry"},
    {"id": ++i, "description":  "See a police car"},
    {"id": ++i, "description":  "See a fire engine"},
    {"id": ++i, "description":  "See a motorbike"},
    {"id": ++i, "description":  "See a caravan"},
    {"id": ++i, "description":  "See a campervan"},
    {"id": ++i, "description":  "See a boat"},
    {"id": ++i, "description":  "See a 2 door sports car"},
    {"id": ++i, "description":  "Average speed camera"},
    {"id": ++i, "description":  "Flashing blue lights"},
    {"id": ++i, "description":  "Flashing orange lights"},
    {"id": ++i, "description":  "Thunderstorm"},
    {"id": ++i, "description":  "Snow"},
    {"id": ++i, "description":  "Diversion!"},
    {"id": ++i, "description":  "Road works!"},
    {"id": ++i, "description":  "Broken down car!"},
    {"id": ++i, "description":  "Are we there yet?!"},
    {"id": ++i, "description":  "Took a wrong turn!"},
    {"id": ++i, "description":  "See a passenger train"},
    {"id": ++i, "description":  "See a freight train"},
    {"id": ++i, "description":  "See a bus"},
    {"id": ++i, "description":  "See a purple car"},
  ];
  let board = {
    name: "New Board",
    collectables: collectables.sort(() => .5 - Math.random()).slice(0,25)
  }
  return new Response(JSON.stringify(board, null, 2), {headers: headers})
})

/*
This is the last route we define, it will match anything that hasn't hit a route we've defined
above, therefore it's useful as a 404 (and avoids us hitting worker exceptions, so make sure to include it!).

Visit any page that doesn't exist (e.g. /foobar) to see it in action.
*/
router.all("*", () => new Response("404, not found!", { status: 404 }))

/*
This snippet ties our worker to the router we deifned above, all incoming requests
are passed to the router where your routes are called and the response is sent.
*/
addEventListener('fetch', (e) => {
  e.respondWith(router.handle(e.request))
})
