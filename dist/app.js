"use strict";

const icons = {
  "arrow-right": '<path d="M4 12h15m-6-6 6 6-6 6"/>',
  "arrow-up-right": '<path d="M6 18 18 6M8 6h10v10"/>',
  bookmark: '<path d="M6 5a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v15l-6-4-6 4z"/>',
  install: '<path d="M12 3v12m-5-5 5 5 5-5M5 16v4h14v-4"/>',
  calculator: '<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M8 7h8M8 11h2m4 0h2m-8 4h2m4 0h2m-8 3h2m4 0h2"/>',
  calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18m-13 5h2m4 0h2"/>',
  compass: '<circle cx="12" cy="12" r="9"/><path d="m16 8-2.5 5.5L8 16l2.5-5.5z"/>',
  card: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18M7 15h4"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5m0-8h.01"/>',
  book: '<path d="M12 6c-3-2-5-2-9-2v15c4 0 6 0 9 2 3-2 5-2 9-2V4c-4 0-6 0-9 2v15z"/>',
  hotel: '<path d="M3 20h18M6 20V6l12-3v17M9 9h.01m6-1h.01M9 13h.01m6-1h.01M9 17h.01m6-1h.01"/>',
  plane: '<path d="M17 20l-2-7 4-4c1.5-1.5 2-3.5 1-4.5s-3-.5-4.5 1l-4 4-7-2L3 9l6 4-2 3-3-.5-1 1.5 4 2 2 3 1.5-1-.5-3 3-2 4 6z"/>',
  globe: '<circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="4" ry="9"/><path d="M3 12h18"/>',
  ticket: '<path d="M4 5h16a1 1 0 0 1 1 1v3a3 3 0 1 0 0 6v3a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-3a3 3 0 1 0 0-6V6a1 1 0 0 1 1-1zm10 3v1m0 3v1m0 3v1"/>',
  x: '<path d="m6 6 12 12M18 6 6 18"/>'
};

const byId = (id) => document.getElementById(id);
const cashFormat = new Intl.NumberFormat("en-US", {style: "currency", currency: "USD"});
const numberFormat = new Intl.NumberFormat("en-US");
const dateFormat = new Intl.DateTimeFormat("en-US", {month: "short", day: "numeric", year: "numeric", timeZone: "UTC"});
const storageKey = "point-atlas-comparisons-v1";
const calcForm = byId("calc-form");
const quoteSelect = byId("calc-program");
const dialog = byId("detail-dialog");
const detailContent = byId("detail-content");

function paintIcons(root) {
  for (const node of root.querySelectorAll("[data-icon]:empty")) {
    const path = icons[node.dataset.icon];
    if (path) {
      node.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + path + '</svg>';
    }
  }
}

function escapeHTML(value) {
  return String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#39;");
}

function sourceLink(key) {
  const [name, url] = sources[key];
  return `<a href="${url}" target="_blank" rel="noopener noreferrer">${name} ↗</a>`;
}

function linkedSources(keys) {
  return `<div class="source-links">${keys.map(sourceLink).join("")}</div>`;
}

function firstOf(items, id) {
  return items.find((item) => item.id === id);
}

function renderPrograms(filter = "all") {
  const list = byId("program-list");
  list.innerHTML = programs.filter((program) => filter === "all" || program.type === filter).map((program) => `
    <article class="program-card ${program.id}">
      <div class="program-top"><span class="program-symbol" data-icon="${program.icon}"></span><span class="tag">${program.type === "hotel" ? "Hotel" : "Airline"}</span></div>
      <h3>${program.name}</h3>
      <p>${program.summary}</p>
      <div class="program-meta"><span><strong>${program.target.toFixed(2)}¢</strong> target</span><button type="button" class="text-button" data-program="${program.id}" aria-label="View ${program.name} guide">View guide <span data-icon="arrow-right"></span></button></div>
    </article>`).join("");
  paintIcons(list);
}

function renderCreditCards(filter = "all") {
  const list = byId("credit-list");
  list.innerHTML = creditCards.filter((card) => filter === "all" || card.kind === filter).map((card) => `
    <article class="credit-card">
      <div class="credit-top"><span class="tag">${card.kind === "flexible" ? "Flexible points" : "Co-branded"}</span><span class="credit-fee">${card.fee}</span></div>
      <h3>${card.name}</h3><p>${card.summary}</p>
      <button type="button" class="text-button" data-card="${card.id}" aria-label="View ${card.name} details">Card details <span data-icon="arrow-right"></span></button>
    </article>`).join("");
  paintIcons(list);
}

function renderDestinations() {
  const list = byId("destination-list");
  list.innerHTML = destinations.map((place) => `
    <article class="destination-card">
      <div class="destination-image"><img class="destination-photo" src="./assets/${place.photo}" alt="${place.alt}" width="512" height="870" loading="lazy"></div>
      <div class="destination-copy"><span class="tag">${place.season}</span><h3>${place.name}</h3><p>${place.summary}</p>
      <button type="button" class="text-button" data-destination="${place.id}" aria-label="View ${place.name} trip strategy">Trip strategy <span data-icon="arrow-right"></span></button></div>
    </article>`).join("");
  paintIcons(list);
}

function renderFlightExamples() {
  const list = byId("route-list");
  list.innerHTML = flightExamples.map((route) => {
    const program = firstOf(programs, route.program);
    const {cash, points, fees} = route.quote;
    const unit = route.program === "southwest" ? "points" : "miles";
    const value = centsPerPoint(route.quote).toFixed(2);
    const targetCash = fees + points * program.target / 100;

    return `
      <article class="route-card ${route.program}">
        <div class="route-top">
          <span class="route-airports">${route.from} <span data-icon="arrow-right"></span> ${route.to}</span>
          <span class="tag">${route.basis}</span>
        </div>
        <h3>${route.title}</h3>
        <p class="route-program">${program.name}</p>
        <p class="route-price"><strong>${route.approximatePoints ? "~" : ""}${numberFormat.format(points)}</strong> ${unit} <span>+ ${cashFormat.format(fees)}${route.estimatedFees ? " est." : ""}</span></p>
        <p>${route.observation}</p>
        <p><strong>How to find it.</strong> ${route.search}</p>
        <div class="route-value">
          <p><strong>${value}¢ per ${unit === "points" ? "point" : "mile"}</strong> at a ${cashFormat.format(cash)} cash fare</p>
          <p>${cashFormat.format(targetCash)} cash fare meets the ${program.target.toFixed(2)}¢ target</p>
        </div>
        ${linkedSources(route.links)}
        <div class="route-actions">
          <button type="button" class="text-button" data-use-flight="${route.id}" aria-label="Compare ${route.title} in the calculator">Run the numbers <span data-icon="calculator"></span></button>
          <a class="text-button" href="${sources[route.booking][1]}" target="_blank" rel="noopener noreferrer" aria-label="Search awards for ${route.title}">Search awards <span data-icon="arrow-up-right"></span></a>
        </div>
      </article>`;
  }).join("");
  paintIcons(list);
}

function dayRange(days) {
  return days.length === 1 ? `${days[0]}+ days` : `${days[0]}–${days[1]} days`;
}

function renderTimeline() {
  byId("timeline-list").innerHTML = `
    <table aria-label="Typical lead times before departure"><thead><tr><th scope="col">Trip type</th><th scope="col">Cash low-fare range</th><th scope="col">When to search awards</th></tr></thead>
    <tbody>${timelines.map((item) => `<tr><th scope="row">${item.label}</th><td>${dayRange(item.cash)}</td><td>${dayRange(item.award)}</td></tr>`).join("")}</tbody></table>`;
  byId("date-type").innerHTML = timelines.map((item) => `<option value="${item.id}">${item.label}</option>`).join("");
  const now = new Date();
  const localToday = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  byId("date-input").min = localToday;
}

function renderSources() {
  byId("source-list").innerHTML = referenceGroups.map(([name, keys]) => `
    <details><summary>${name}</summary><ul>${keys.map((key) => `<li>${sourceLink(key)}</li>`).join("")}</ul></details>`).join("") + `
    <details><summary>How we compare value</summary><p>Targets are editable starting points. Compare the same cabin or room type, baggage, flexibility, and unavoidable fees. Cash outlay avoided is the cash offer less any cash due on the award. If shopping with bank points, compare the total bank points required after the transfer ratio and check the issuer’s cash or portal rate. Confirm award availability before making any final transfer.</p><p>Example prices and destination imagery are illustrative. Cash booking windows summarize Google Flights data. Award timelines are suggested search periods and depend on when a carrier releases its schedule or seats.</p></details>`;
}

function bindFilter(id, render) {
  const group = byId(id);
  group.addEventListener("click", (event) => {
    const selected = event.target.closest("[data-filter]");
    if (!selected) return;
    for (const button of group.querySelectorAll("button")) {
      button.setAttribute("aria-pressed", String(button === selected));
    }
    render(selected.dataset.filter);
  });
}

function showDetail(kicker, title, content) {
  byId("detail-kicker").textContent = kicker;
  byId("detail-title").textContent = title;
  detailContent.innerHTML = content;
  paintIcons(detailContent);
  if (!dialog.open) dialog.showModal();
}

function showProgram(program) {
  showDetail(program.type === "hotel" ? "HOTEL PROGRAM" : "AIRLINE PROGRAM", program.name, `
    <p>${program.summary}</p>
    <h3>How to earn</h3><p>${program.earn}</p>
    <h3>How to book for value</h3><ol>${program.steps.map((step) => `<li>${step}</li>`).join("")}</ol>
    <div class="example-box"><p><strong>Illustrative redemption</strong></p><p>${program.example}</p><button class="text-button" type="button" data-use-program="${program.id}">Try this in the calculator <span data-icon="arrow-right"></span></button></div>
    <h3>Official sources</h3>${linkedSources(program.links)}`);
}

function showCard(card) {
  showDetail(card.kind === "flexible" ? "FLEXIBLE POINTS CARD" : "CO-BRANDED CARD", card.name, `
    <p><strong>${card.fee}</strong></p>
    <h3>Who it suits</h3><p>${card.fit}</p>
    <h3>Earning and perks</h3><p>${card.perks}</p>
    <h3>Welcome offer</h3><p>${card.terms}</p>
    <h3>Issuer terms</h3>${linkedSources(card.links)}`);
}

function showDestination(place) {
  showDetail(place.season, place.name, `
    <p>${place.strategy}</p>
    <div class="example-box"><p><strong>Example to price</strong></p><p>${place.example}</p><button class="text-button" type="button" data-use-destination="${place.id}">Try this in the calculator <span data-icon="arrow-right"></span></button></div>
    <h3>Trip references</h3>${linkedSources(place.links)}`);
}

function readQuote() {
  const numbers = ["cash", "points", "fees", "target"];
  if (!numbers.every((field) => byId("calc-" + field).validity.valid)) return null;
  return {
    program: quoteSelect.value,
    label: byId("calc-label").value.trim(),
    cash: byId("calc-cash").valueAsNumber,
    points: byId("calc-points").valueAsNumber,
    fees: byId("calc-fees").valueAsNumber,
    target: byId("calc-target").valueAsNumber
  };
}

function centsPerPoint(quote) {
  return (quote.cash - quote.fees) / quote.points * 100;
}

function updateCalculation() {
  const quote = readQuote();
  byId("save-status").textContent = "";
  if (!quote) {
    byId("cpp").textContent = "—";
    byId("verdict-title").textContent = "Enter valid amounts";
    byId("verdict-detail").textContent = "Use a positive points amount and target.";
    return;
  }

  const value = centsPerPoint(quote);
  const rounded = Number(value.toFixed(2));
  const avoided = quote.cash - quote.fees;
  byId("cpp").textContent = value.toFixed(2);
  byId("verdict-title").textContent = rounded === quote.target ? "At your target" : rounded > quote.target ? "Above your target" : "Below your target";
  byId("verdict-detail").textContent = avoided < 0 ? `${cashFormat.format(-avoided)} more in award cash costs` : `${cashFormat.format(avoided)} in cash avoided`;
}

function loadQuote(quote) {
  if (dialog.open) dialog.close();
  quoteSelect.value = quote.program;
  for (const field of ["cash", "points", "fees", "target", "label"]) {
    byId("calc-" + field).value = quote[field];
  }
  updateCalculation();
  byId("calculator").scrollIntoView();
  byId("calc-cash").focus({preventScroll: true});
}

function readSaved() {
  try {
    const list = JSON.parse(localStorage.getItem(storageKey) || "[]");
    if (!Array.isArray(list)) return [];
    return list.filter((entry) => entry && typeof entry.id === "string" && typeof entry.label === "string" &&
      firstOf(programs, entry.program) && ["cash", "points", "fees", "target"].every((key) => Number.isFinite(entry[key])) &&
      entry.points > 0 && entry.target > 0);
  } catch {
    return [];
  }
}

function remember(list) {
  try {
    localStorage.setItem(storageKey, JSON.stringify(list));
    updateCount(list.length);
    return true;
  } catch {
    return false;
  }
}

function updateCount(count) {
  const badge = byId("saved-count");
  badge.textContent = count;
  badge.hidden = count === 0;
}

function showSaved() {
  const entries = readSaved();
  const content = entries.length ? `<div class="saved-list">${entries.map((entry) => {
    const id = escapeHTML(entry.id);
    return `<article class="saved-entry"><h3>${escapeHTML(entry.label)}</h3>
      <p>${firstOf(programs, entry.program).name} · ${numberFormat.format(entry.points)} points or miles · ${centsPerPoint(entry).toFixed(2)}¢ per point</p>
      <button type="button" class="text-button" data-reopen="${id}">Open comparison</button>
      <button type="button" class="text-button" data-remove="${id}">Remove</button></article>`;
  }).join("")}</div><p id="saved-message" role="status"></p>` : "<p>Save a cash-versus-points comparison in the calculator and it’ll appear here.</p>";
  showDetail("YOUR SHORTLIST", "Saved comparisons", content);
  updateCount(entries.length);
}

function dateBefore(date, days) {
  const earlier = new Date(date);
  earlier.setUTCDate(earlier.getUTCDate() - days);
  return dateFormat.format(earlier);
}

function bookingWindow(date, days) {
  return days.length === 1 ? `By ${dateBefore(date, days[0])}` : `${dateBefore(date, days[1])} – ${dateBefore(date, days[0])}`;
}

function setupInstall() {
  if (!("serviceWorker" in navigator)) return;

  const installButton = byId("install-app");
  const standalone = window.matchMedia("(display-mode: standalone)");
  let installPrompt;
  let installed = false;

  const updateButton = () => {
    installButton.hidden = installed || standalone.matches || navigator.standalone === true;
  };
  const updateOfflineStatus = () => {
    const status = byId("offline-status");
    if (status && navigator.serviceWorker.controller) status.textContent = "This copy is ready to use offline.";
  };
  const showInstallHelp = () => {
    showDetail("HOME SCREEN", "Install Point Atlas", `
      <h3>iPhone or iPad</h3><p>In Safari, tap Share, then <strong>Add to Home Screen</strong>. Turn on <strong>Open as Web App</strong> if shown, then tap <strong>Add</strong>.</p>
      <h3>Android</h3><p>In Chrome, open the ⋮ menu and choose <strong>Install app</strong> or <strong>Install and create shortcut</strong>.</p>
      <p id="offline-status" role="status">Open the app once while online to prepare it for offline use.</p>
      <p>Airline, hotel, and other external links require a connection.</p>`);
    updateOfflineStatus();
  };

  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    installPrompt = event;
  });
  window.addEventListener("appinstalled", () => {
    installed = true;
    installPrompt = undefined;
    updateButton();
  });
  standalone.addEventListener("change", updateButton);
  installButton.addEventListener("click", async () => {
    const prompt = installPrompt;
    installPrompt = undefined;
    if (prompt) {
      try {
        await prompt.prompt();
        return;
      } catch {
        // The browser can discard its prompt before the button is clicked.
      }
    }
    showInstallHelp();
  });
  updateButton();
  navigator.serviceWorker.addEventListener("controllerchange", updateOfflineStatus);
  navigator.serviceWorker.register("./sw.js", {updateViaCache: "none"}).catch((error) => {
    console.warn("Point Atlas offline setup failed.", error);
  });
}

renderPrograms();
renderCreditCards();
renderDestinations();
renderFlightExamples();
renderTimeline();
renderSources();
paintIcons(document);
bindFilter("program-filters", renderPrograms);
bindFilter("card-filters", renderCreditCards);
quoteSelect.innerHTML = programs.map((program) => `<option value="${program.id}">${program.name}</option>`).join("");
quoteSelect.value = "united";
updateCalculation();
updateCount(readSaved().length);
setupInstall();

calcForm.addEventListener("input", (event) => {
  if (event.target === quoteSelect) {
    byId("calc-target").value = firstOf(programs, quoteSelect.value).target.toFixed(2);
  }
  updateCalculation();
});

calcForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const quote = readQuote();
  if (!quote) return;
  quote.id = globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`;
  quote.label ||= `${firstOf(programs, quote.program).name} comparison`;
  const saved = remember([quote, ...readSaved()]);
  byId("save-status").textContent = saved ? "Saved in this browser." : "This browser could not store the comparison.";
});

byId("date-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const date = new Date(byId("date-input").valueAsNumber);
  if (!Number.isFinite(date.getTime())) return;
  const item = firstOf(timelines, byId("date-type").value);
  const result = byId("date-result");
  result.innerHTML = `<p><strong>Cash fare window</strong><br>${bookingWindow(date, item.cash)}</p>
    <p><strong>Start searching awards</strong><br>${bookingWindow(date, item.award)}</p><p>${item.tip}</p>`;
  result.hidden = false;
});

byId("open-saved").addEventListener("click", showSaved);
dialog.addEventListener("click", (event) => {
  if (event.target === dialog || event.target.closest("[data-close]")) dialog.close();
});

document.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;
  const action = button.dataset;

  if (action.program) showProgram(firstOf(programs, action.program));
  if (action.card) showCard(firstOf(creditCards, action.card));
  if (action.destination) showDestination(firstOf(destinations, action.destination));
  if (action.useProgram) {
    const program = firstOf(programs, action.useProgram);
    loadQuote({...program.quote, program: program.id, target: program.target, label: `${program.name} example`});
  }
  if (action.useDestination) {
    const place = firstOf(destinations, action.useDestination);
    loadQuote({...place.quote, program: place.program, target: firstOf(programs, place.program).target, label: `${place.name} example`});
  }
  if (action.useFlight) {
    const route = firstOf(flightExamples, action.useFlight);
    loadQuote({...route.quote, program: route.program, target: firstOf(programs, route.program).target, label: `${route.from}–${route.to} example`});
  }
  if (action.reopen) {
    const quote = readSaved().find((entry) => entry.id === action.reopen);
    if (quote) loadQuote(quote);
    else showSaved();
  }
  if (action.remove) {
    const remaining = readSaved().filter((entry) => entry.id !== action.remove);
    if (remember(remaining)) {
      showSaved();
      dialog.querySelector("[data-close]").focus();
    } else {
      byId("saved-message").textContent = "This browser could not remove the comparison.";
    }
  }
});

window.addEventListener("storage", (event) => {
  if (event.key === storageKey || event.key === null) updateCount(readSaved().length);
});
