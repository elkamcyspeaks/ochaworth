const { test } = require("node:test")
const assert = require("node:assert/strict")
const fs = require("node:fs"),
  path = require("node:path"),
  vm = require("node:vm"),
  ts = require("typescript")
const React = require("react"),
  { JSDOM } = require("jsdom")

function setup(route = "/") {
  const dom = new JSDOM('<div id="root"></div>', {
    url: "https://ochaworth.com" + route,
  })
  global.window = dom.window
  global.document = dom.window.document
  global.HTMLElement = dom.window.HTMLElement
  global.IS_REACT_ACT_ENVIRONMENT = true
  dom.window.scrollTo = () => {}
  let calls = [],
    pending = null
  const fetch = async (url, options) => {
    calls.push({ url, options })
    if (pending) return pending
    return { ok: true, status: 200, json: async () => ({}) }
  }
  const cache = {}
  function load(file) {
    file = path.resolve(file)
    if (cache[file]) return cache[file].exports
    if (file.endsWith(".json")) return JSON.parse(fs.readFileSync(file, "utf8"))
    if (file.endsWith(".css") || file.endsWith(".png")) return {}
    const mod = { exports: {} }
    cache[file] = mod
    let code = ts.transpileModule(fs.readFileSync(file, "utf8"), {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        jsx: ts.JsxEmit.ReactJSX,
        target: ts.ScriptTarget.ES2020,
        esModuleInterop: true,
      },
    }).outputText
    if (file.endsWith("BlogPage.tsx")) {
      const modules = Object.fromEntries(
        fs
          .readdirSync("src/data/blog")
          .map((f) => [
            "../data/blog/" + f,
            {
              default: JSON.parse(
                fs.readFileSync("src/data/blog/" + f, "utf8"),
              ),
            },
          ]),
      )
      code = code.replace(
        /import\.meta\.glob\([^;]+?\)/,
        JSON.stringify(modules),
      )
    }
    vm.runInNewContext(code, {
      module: mod,
      exports: mod.exports,
      require: (name) => {
        if (name.startsWith("@/") || name.startsWith(".")) {
          let f = name.startsWith("@/")
            ? path.resolve("src", name.slice(2))
            : path.resolve(path.dirname(file), name)
          if (!path.extname(f))
            f = [".tsx", ".ts", ".json"]
              .map((ext) => f + ext)
              .find((f) => fs.existsSync(f))
          return load(f)
        }
        return require(name)
      },
      window: dom.window,
      document: dom.window.document,
      FormData: dom.window.FormData,
      URLSearchParams,
      fetch,
      console,
      setTimeout,
      clearTimeout,
      setInterval,
      clearInterval,
      Intl,
      Date,
    })
    return mod.exports
  }
  const { MemoryRouter, Routes, Route } = require("react-router-dom")
  const { createRoot } = require("react-dom/client"),
    root = createRoot(document.getElementById("root"))
  return {
    dom,
    load,
    calls,
    setPending: (p) => (pending = p),
    render: async (file, pattern = "/") =>
      React.act(async () => {
        root.render(
          React.createElement(
            MemoryRouter,
            { initialEntries: [route] },
            React.createElement(
              Routes,
              null,
              React.createElement(Route, {
                path: pattern,
                element: React.createElement(load(file).default),
              }),
            ),
          ),
        )
      }),
    click: async (el) => React.act(async () => el.click()),
    submit: async (form) =>
      React.act(async () =>
        form.dispatchEvent(
          new dom.window.Event("submit", { bubbles: true, cancelable: true }),
        ),
      ),
    done: async () => {
      await React.act(async () => root.unmount())
      dom.window.close()
    },
  }
}
test("program date boundaries and stable URLs", () => {
  const app = setup()
  const { programs, datedStatus, programPath } = app.load("src/lib/programs.ts")
  const p = programs.find((p) => p.title === "Breast Cancer Awareness")
  assert.equal(datedStatus(p, "2026-09-30"), "upcoming")
  assert.equal(datedStatus(p, "2026-10-01"), "ongoing")
  assert.equal(datedStatus(p, "2026-10-31"), "ongoing")
  assert.equal(datedStatus(p, "2026-11-01"), "completed")
  assert.equal(programPath(p), "/programs/breast-cancer-awareness")
  assert.equal(new Set(programs.map(programPath)).size, programs.length)
  app.dom.window.close()
})
test("every program opens directly, including entries without optional arrays", async () => {
  const data = require("../src/data/programsPage.json")
  for (const p of data.programs) {
    const slug =
      p.slug ||
      p.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "")
    const app = setup("/programs/" + slug)
    await app.render("src/pages/ProgramsPage.tsx", "/programs/:slug?")
    assert.equal(document.querySelector("h1").textContent.trim(), p.title)
    if (p.galleryCollection)
      assert.ok(
        [...document.querySelectorAll("a")].some((a) =>
          a.getAttribute("href")?.startsWith("/gallery?collection="),
        ),
      )
    await app.done()
  }
})
test("related program links open the selected program and unknown URLs have a useful fallback", async () => {
  const app = setup("/programs/pad-a-girl-child")
  await app.render("src/pages/ProgramsPage.tsx", "/programs/:slug?")
  const link = [...document.querySelectorAll("h3 a")][0]
  assert.ok(link)
  const title = link.textContent
  await app.click(link)
  assert.equal(document.querySelector("h1").textContent.trim(), title)
  await app.done()
  const missing = setup("/programs/does-not-exist")
  await missing.render("src/pages/ProgramsPage.tsx", "/programs/:slug?")
  assert.match(document.querySelector("h1").textContent, /Program not found/)
  assert.equal(document.querySelector("a").getAttribute("href"), "/programs")
  await missing.done()
})
test("homepage keeps hero first, working chapter links and the deferred donation section", async () => {
  const app = setup()
  await app.render("src/pages/Home.tsx")
  const sections = [...document.querySelectorAll("section")]
  assert.ok(sections[0].querySelector("h1"))
  assert.ok(document.getElementById("donate"))
  assert.equal(
    document.querySelectorAll(".experience-chapters article").length,
    6,
  )
  assert.ok(
    [...document.querySelectorAll("a")].some(
      (a) => a.getAttribute("href") === "/programs/breast-cancer-awareness",
    ),
  )
  assert.equal(document.querySelectorAll('img[alt="World map"]').length, 0)
  assert.equal(
    document.querySelectorAll(".experience-chapters button").length,
    0,
  )
  await app.done()
})
test("contact has labelled fields, actionable details and enforced keyboard-accessible consent", async () => {
  const app = setup("/contact?subject=Partnership&location=Abuja")
  await app.render("src/pages/ContactPage.tsx", "/contact")
  assert.equal(document.getElementById("contact-subject").value, "Partnership")
  assert.match(document.getElementById("contact-message").value, /Abuja/)
  for (const key of [
    "name",
    "email",
    "phone",
    "subject",
    "message",
    "agreed",
  ]) {
    const input = document.getElementById("contact-" + key)
    assert.ok(document.querySelector('label[for="' + input.id + '"]'))
  }
  assert.equal(
    document.querySelector('a[href^="tel:"]').getAttribute("href"),
    "tel:+2348080655923",
  )
  assert.ok(document.querySelector('a[href="mailto:ochaworthlacdi@gmail.com"]'))
  const form = document.querySelector("form[name=contact]")
  assert.equal(form.checkValidity(), false)
  await app.submit(form)
  assert.equal(app.calls.length, 0)
  assert.equal(document.getElementById("contact-agreed").required, true)
  await app.click(document.getElementById("contact-agreed"))
  await app.submit(form)
  assert.equal(app.calls[0].url, "/")
  assert.equal(
    new URLSearchParams(app.calls[0].options.body).get("agreed"),
    "yes",
  )
  assert.match(
    document.querySelector('[role="status"]').textContent,
    /follow up by email/,
  )
  assert.equal(document.querySelector("form[name=contact]"), null)
  assert.equal(document.activeElement.getAttribute("role"), "status")
  await app.done()
})
test("joining pages explain the process, associate labels and preserve form names", async () => {
  for (const [file, route, name] of [
    ["BecomeMemberPage", "/become-a-member", "become-a-member"],
    ["BecomeVolunteerPage", "/become-a-volunteer", "become-a-volunteer"],
  ]) {
    const app = setup(route)
    await app.render("src/pages/" + file + ".tsx", route)
    assert.equal(
      document.querySelectorAll(".experience-joining-guide li").length,
      3,
    )
    if (file === "BecomeMemberPage")
      assert.match(
        document.querySelector(".experience-joining-guide").textContent,
        /not confirmation of membership or appointment/,
      )
    const form = document.querySelector('form[name="' + name + '"]')
    for (const input of form.querySelectorAll(
      "input:not([type=hidden]):not([name=bot-field]),textarea",
    )) {
      assert.ok(input.id)
      assert.ok(form.querySelector('label[for="' + input.id + '"]'))
    }
    await app.submit(form)
    assert.match(
      document.querySelector('[role="status"]').textContent,
      /contact you about the next steps/,
    )
    assert.equal(form.hidden, true)
    await app.done()
  }
})

test("contact delivery failure retains the form and allows a retry", async () => {
  const app = setup("/contact")
  await app.render("src/pages/ContactPage.tsx", "/contact")
  await app.click(document.getElementById("contact-agreed"))
  app.setPending(Promise.resolve({ ok: false, status: 503 }))
  await app.submit(document.querySelector("form[name=contact]"))
  assert.match(
    document.querySelector('[role="alert"]').textContent,
    /try again/,
  )
  assert.ok(document.getElementById("contact-message"))
  assert.equal(document.querySelector('[role="status"]'), null)
  app.setPending(null)
  await app.submit(document.querySelector("form[name=contact]"))
  assert.match(
    document.querySelector('[role="status"]').textContent,
    /received/,
  )
  await app.done()
})
test("campaign collection links open the requested gallery collection", async () => {
  const app = setup("/gallery?collection=Earlier%20activities")
  await app.render("src/pages/GalleryBrowser.tsx", "/gallery")
  assert.match(document.querySelector(".gallery-section").textContent, /13/)
  assert.equal(document.querySelectorAll(".gallery-masonry button").length, 13)
  await app.done()
})
