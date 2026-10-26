const { test } = require("node:test")
const assert = require("node:assert/strict")
const fs = require("node:fs")
const vm = require("node:vm")
const ts = require("typescript")
const { JSDOM } = require("jsdom")
const React = require("react")
const data = require("../src/data/gallery.json")

function setup() {
  const dom = new JSDOM('<div id="root"></div>', {
    url: "https://ochaworth.com/gallery",
  })
  global.window = dom.window
  global.document = dom.window.document
  global.HTMLElement = dom.window.HTMLElement
  global.IS_REACT_ACT_ENVIRONMENT = true
  dom.window.HTMLDialogElement.prototype.showModal = function () {
    this.setAttribute("open", "")
    this.querySelector("[autofocus],button")?.focus()
  }
  dom.window.HTMLDialogElement.prototype.close = function () {
    this.removeAttribute("open")
  }
  const code = ts.transpileModule(
    fs.readFileSync("src/pages/GalleryBrowser.tsx", "utf8"),
    {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        jsx: ts.JsxEmit.ReactJSX,
        target: ts.ScriptTarget.ES2020,
        esModuleInterop: true,
      },
    },
  ).outputText
  const module = { exports: {} }
  vm.runInNewContext(code, {
    module,
    exports: module.exports,
    require: (name) =>
      name === "@/data/gallery.json"
        ? data
        : name === "@/components/shared"
          ? new Proxy({}, { get: () => () => null })
          : name.endsWith(".css")
            ? {}
            : require(name),
    document: dom.window.document,
    window: dom.window,
  })
  const { createRoot } = require("react-dom/client")
  const root = createRoot(document.getElementById("root"))
  return {
    dom,
    root,
    api: module.exports,
    render: async (props) =>
      React.act(async () =>
        root.render(React.createElement(module.exports.GalleryGrid, props)),
      ),
    click: async (el) => React.act(async () => el.click()),
    done: async () => {
      await React.act(async () => root.unmount())
      dom.window.close()
    },
  }
}

test("campaign data has 157 distinct uploads, earlier photos and real optimised assets", () => {
  const campaign = data.photos.filter(
      (p) => p.album === "October 2026 campaign",
    ),
    earlier = data.photos.filter((p) => p.album === "Earlier activities")
  assert.equal(campaign.length, 157)
  assert.equal(earlier.length, 13)
  assert.equal(
    new Set(data.photos.map((p) => p.image)).size,
    data.photos.length,
  )
  for (const p of campaign) {
    assert.ok(p.alt)
    assert.ok(p.width > 0 && p.height > 0)
    for (const file of [p.image, p.thumbnail]) {
      const b = fs.readFileSync("public" + file)
      assert.equal(b.toString("ascii", 0, 4), "RIFF")
      assert.equal(b.toString("ascii", 8, 12), "WEBP")
    }
  }
  assert.ok(fs.existsSync("public" + data.hero.image))
  assert.ok(!data.hero.image.includes("unsplash"))
})

test("collections, topic filters and load-more reset without mixing the campaign and earlier activities", async () => {
  const h = setup()
  try {
    await h.render()
    assert.equal(document.querySelectorAll(".gallery-photo").length, 18)
    assert.match(
      document.querySelector(".gallery-results").textContent,
      /18 of 157/,
    )
    await h.click(document.querySelector(".gallery-more button"))
    assert.equal(document.querySelectorAll(".gallery-photo").length, 36)
    const album = (label) =>
      [...document.querySelectorAll(".gallery-albums button")].find((b) =>
        b.textContent.startsWith(label),
      )
    await h.click(album("Earlier activities"))
    assert.equal(document.querySelectorAll(".gallery-photo").length, 13)
    assert.equal(document.querySelector(".gallery-more"), null)
    const topic = document.querySelector("select"),
      choice = topic.options[1].value
    await React.act(async () => {
      topic.value = choice
      topic.dispatchEvent(new window.Event("change", { bubbles: true }))
    })
    assert.equal(
      document.querySelectorAll(".gallery-photo").length,
      data.photos.filter(
        (p) => p.album === "Earlier activities" && p.category === choice,
      ).length,
    )
    await h.click(album("October 2026 campaign"))
    assert.equal(document.querySelectorAll(".gallery-photo").length, 18)
    assert.equal(document.querySelector("select"), null)
    await h.click(album("All photos"))
    assert.match(
      document.querySelector(".gallery-results").textContent,
      /18 of 170/,
    )
  } finally {
    await h.done()
  }
})

test("viewer opens the original, wraps across the whole collection, handles keyboard and restores focus/scroll", async () => {
  const h = setup()
  try {
    await h.render()
    const opener = document.querySelector(".gallery-photo")
    opener.focus()
    document.body.style.overflow = "auto"
    await h.click(opener)
    assert.ok(document.querySelector("dialog[open]"))
    assert.equal(document.body.style.overflow, "hidden")
    assert.equal(
      document.querySelector("dialog img").getAttribute("src"),
      data.photos[0].image,
    )
    await h.click(document.querySelector('[aria-label="Previous photo"]'))
    assert.match(
      document.querySelector(".gallery-viewer-header p").textContent,
      /157 of 157/,
    )
    await React.act(async () =>
      document
        .querySelector("dialog")
        .dispatchEvent(
          new window.KeyboardEvent("keydown", {
            key: "ArrowRight",
            bubbles: true,
          }),
        ),
    )
    assert.match(
      document.querySelector(".gallery-viewer-header p").textContent,
      /1 of 157/,
    )
    await React.act(async () =>
      document
        .querySelector("dialog")
        .dispatchEvent(new window.Event("cancel", { cancelable: true })),
    )
    assert.equal(document.querySelector("dialog"), null)
    assert.equal(document.body.style.overflow, "auto")
    assert.ok(document.activeElement === opener, "Focus should return to the photo opener")
    assert.ok(
      document
        .querySelector(".gallery-photo img")
        .getAttribute("src")
        .includes("-preview.webp"),
    )
  } finally {
    await h.done()
  }
})

test("CMS photos without optional metadata and an empty gallery remain usable", async () => {
  const h = setup()
  try {
    const photos = [
      { image: "/old.jpg", caption: "Earlier photo", category: "Community" },
    ]
    await h.render({ photos, featuredAlbum: "" })
    assert.equal(h.api.albumOf(photos[0]), "Earlier activities")
    assert.equal(
      h.api.filterPhotos(photos, "Earlier activities", "Community").length,
      1,
    )
    assert.equal(
      document.querySelector(".gallery-photo img").getAttribute("src"),
      "/old.jpg",
    )
    await h.click(document.querySelector(".gallery-photo"))
    assert.ok(document.querySelector('[aria-label="Next photo"]').disabled)
    await h.click(document.querySelector('[aria-label="Close photo viewer"]'))
    await h.render({ photos: [], featuredAlbum: "" })
    assert.equal(document.querySelectorAll(".gallery-photo").length, 0)
    assert.ok(document.querySelector(".gallery-empty"))
    assert.equal(document.querySelector(".gallery-more"), null)
  } finally {
    await h.done()
  }
})
