import { Router } from 'itty-router'

// Create a new router
const router = Router()

let headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
  "Access-Control-Max-Age": "86400",
  "Cache-Control": "no-store, max-age=0",
}


router.get("/new-board",  async request => {
  try {
    const json = await BINGO_API.get("collectables")
    const collectables = JSON.parse(json)
    const selection = collectables.sort(() => Math.random() - 0.5).slice(0, 25)
    return new Response(JSON.stringify(selection, null, 2), {headers: headers})
  } catch (e) {
    console.dir(e)
    return "error :("
  }  
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
