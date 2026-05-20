(function() {
  "use strict";

  var root = document.querySelector("[data-champion-explorer]");
  if (!root) return;

  var SERVICE_URL = "https://services6.arcgis.com/BZn8g8tzu5WfMokL/arcgis/rest/services/TreeChampionData_2019/FeatureServer/0";
  var ALBA_ID = 246;
  var MAX_LIST_ITEMS = 90;
  var ATLANTA_CENTER = [33.765, -84.38];
  var ALBA_CENTER = [33.749066, -84.340521];
  var JOURNEYS = {
    nearest: {
      title: "Closest public tree",
      text: "Filtered to alive public or park records, so the result is more likely to be walkable."
    },
    alba: {
      title: "Start with Alba",
      text: "A named white oak in Edgewood. Start here because the list turns into a real place."
    },
    champions: {
      title: "Show me the biggest",
      text: "These are the highest-scoring record trees. The score blends trunk size, height, and canopy spread."
    },
    public: {
      title: "I want a public tree",
      text: "Parks and public places first. This is the easiest path from map to walk."
    },
    "white-oaks": {
      title: "More like Alba",
      text: "Other white oaks around Atlanta, sorted by trunk size."
    },
    dead: {
      title: "What used to be here?",
      text: "Some records stay after the tree is gone. They make the map feel like a memory layer."
    },
    "first-place": {
      title: "Top of its kind",
      text: "A first-place tree is the largest known example of that kind in this city list."
    },
    reset: {
      title: "Find a big tree worth walking to",
      text: "Search a street, park, or kind of tree. Pick one. Add two more only if they make the walk better."
    },
    custom: {
      title: "Find a big tree worth walking to",
      text: "Use the filters to narrow the list. Save a tree when it feels worth a walk."
    }
  };

  var fields = [
    "OBJECTID",
    "Genus",
    "Species",
    "CommonName",
    "YearNominated",
    "Ranking",
    "TotalPointsEarned",
    "LocationType",
    "LocationNotes",
    "CircumferenceFT",
    "CircumferenceIN",
    "HeightFT",
    "SpreadFT",
    "Status",
    "StatusDate",
    "StatusComments",
    "AdditionalComments"
  ];

  var state = {
    records: [],
    filtered: [],
    selectedId: null,
    compareIds: [],
    journey: "alba",
    userLocation: null,
    nearest: {
      id: null,
      miles: null
    },
    filters: {
      search: "",
      ranking: "all",
      status: "all",
      access: "all",
      sort: "points"
    }
  };

  var el = {
    status: root.querySelector("[data-load-status]"),
    map: root.querySelector("[data-map]"),
    mapFrame: root.querySelector(".champion-map-frame"),
    mapActivate: root.querySelector("[data-map-activate]"),
    fallback: root.querySelector("[data-map-fallback]"),
    search: root.querySelector('[data-filter="search"]'),
    ranking: root.querySelector('[data-filter="ranking"]'),
    statusFilter: root.querySelector('[data-filter="status"]'),
    access: root.querySelector('[data-filter="access"]'),
    sort: root.querySelector('[data-filter="sort"]'),
    list: root.querySelector("[data-results-list]"),
    note: root.querySelector("[data-results-note]"),
    detail: root.querySelector("[data-detail]"),
    compare: root.querySelector("[data-compare-list]"),
    journeyTitle: root.querySelector("[data-journey-title]"),
    journeyText: root.querySelector("[data-journey-text]"),
    nearestButton: root.querySelector('[data-action="find-nearest"]'),
    nearestPanel: root.querySelector("[data-nearest-panel]"),
    nearestStatus: root.querySelector("[data-nearest-status]"),
    nearestTitle: root.querySelector("[data-nearest-title]"),
    nearestMeta: root.querySelector("[data-nearest-meta]"),
    nearestActions: root.querySelector("[data-nearest-actions]"),
    nearestDirections: root.querySelector("[data-nearest-directions]"),
    advancedToggle: root.querySelector('[data-action="toggle-advanced"]'),
    visibleStat: root.querySelector('[data-stat="visible"]'),
    totalStat: root.querySelector('[data-stat="total"]'),
    speciesStat: root.querySelector('[data-stat="species"]')
  };

  var map = null;
  var markers = new Map();
  var markerLayer = null;
  var mapActive = false;

  function text(value) {
    return value === null || value === undefined ? "" : String(value).trim();
  }

  function number(value) {
    var parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }

  function formatNumber(value, digits) {
    var parsed = number(value);
    if (parsed === null) return "n/a";
    return parsed.toLocaleString(undefined, {
      maximumFractionDigits: digits === undefined ? 1 : digits,
      minimumFractionDigits: 0
    });
  }

  function formatDistance(miles) {
    if (!Number.isFinite(miles)) return "";
    if (miles < 0.15) return Math.round(miles * 5280) + " ft";
    if (miles < 10) return miles.toFixed(1) + " mi";
    return Math.round(miles) + " mi";
  }

  function escapeHtml(value) {
    return text(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function normalizeSearch(value) {
    return text(value).toLowerCase().replace(/\s+/g, " ");
  }

  function speciesLabel(record) {
    var common = text(record.CommonName) || "Unknown tree";
    var genus = text(record.Genus);
    var species = text(record.Species);
    return {
      common: common,
      latin: [genus, species].filter(Boolean).join(" ")
    };
  }

  function accessKind(record) {
    var type = normalizeSearch(record.LocationType);
    var place = normalizeSearch(record.LocationNotes);
    if (type.indexOf("private") !== -1) return "private";
    if (type.indexOf("public") !== -1 || type.indexOf("park") !== -1 || place.indexOf("park") !== -1) return "public";
    return "other";
  }

  function rankingValue(record) {
    return text(record.Ranking) || "unranked";
  }

  function recordSearchText(record) {
    var label = speciesLabel(record);
    return normalizeSearch([
      record.OBJECTID,
      label.common,
      label.latin,
      record.Ranking,
      record.Status,
      record.LocationType,
      record.LocationNotes,
      record.YearNominated,
      record.AdditionalComments,
      record.StatusComments
    ].join(" "));
  }

  function normalizeFeature(feature) {
    var props = feature.properties || feature.attributes || {};
    var geometry = feature.geometry || {};
    var coords = geometry.coordinates || [geometry.x, geometry.y];
    return Object.assign({}, props, {
      OBJECTID: number(props.OBJECTID),
      lat: number(coords[1]),
      lng: number(coords[0])
    });
  }

  function hasGeometry(record) {
    return Number.isFinite(record.lat) && Number.isFinite(record.lng);
  }

  function distanceMiles(origin, record) {
    if (!origin || !hasGeometry(record)) return Infinity;
    var earthMiles = 3958.8;
    var lat1 = origin.lat * Math.PI / 180;
    var lat2 = record.lat * Math.PI / 180;
    var deltaLat = (record.lat - origin.lat) * Math.PI / 180;
    var deltaLng = (record.lng - origin.lng) * Math.PI / 180;
    var sinLat = Math.sin(deltaLat / 2);
    var sinLng = Math.sin(deltaLng / 2);
    var a = sinLat * sinLat + Math.cos(lat1) * Math.cos(lat2) * sinLng * sinLng;
    return earthMiles * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }

  function isNearestCandidate(record) {
    return hasGeometry(record) && text(record.Status) === "Alive" && accessKind(record) === "public";
  }

  function directionsUrl(record) {
    if (hasGeometry(record)) {
      return "https://www.google.com/maps/dir/?api=1&travelmode=walking&destination=" + encodeURIComponent(record.lat + "," + record.lng);
    }

    var destination = [
      text(record.LocationNotes),
      "Atlanta GA"
    ].filter(Boolean).join(", ");
    return "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(destination);
  }

  function recordById(id) {
    return state.records.find(function(record) {
      return record.OBJECTID === Number(id);
    }) || null;
  }

  function updateStatus(message, tone) {
    if (!el.status) return;
    el.status.textContent = message;
    el.status.dataset.tone = tone || "neutral";
  }

  function updateNearest(status, record, miles, tone) {
    if (!el.nearestStatus || !el.nearestTitle || !el.nearestMeta) return;
    if (el.nearestPanel) el.nearestPanel.dataset.tone = tone || "neutral";
    el.nearestStatus.textContent = status;

    if (!record) {
      el.nearestTitle.textContent = "No tree selected yet.";
      el.nearestMeta.textContent = "Closest public result will show here.";
      if (el.nearestActions) el.nearestActions.hidden = true;
      if (el.nearestDirections) el.nearestDirections.removeAttribute("href");
      return;
    }

    var label = speciesLabel(record);
    var location = text(record.LocationNotes) || text(record.LocationType) || "mapped location";
    el.nearestTitle.textContent = label.common;
    el.nearestMeta.textContent = formatDistance(miles) + " away / " + location;
    if (el.nearestDirections) el.nearestDirections.href = directionsUrl(record);
    if (el.nearestActions) el.nearestActions.hidden = false;
  }

  function setAdvancedView(active) {
    var isAdvanced = Boolean(active);
    root.classList.toggle("is-advanced", isAdvanced);
    if (el.advancedToggle) {
      el.advancedToggle.setAttribute("aria-expanded", isAdvanced ? "true" : "false");
      el.advancedToggle.textContent = isAdvanced ? "simple" : "advanced";
    }
    if (map) window.setTimeout(function() { map.invalidateSize(); }, 80);
  }

  function setJourney(name) {
    var journey = JOURNEYS[name] || JOURNEYS.custom;
    state.journey = name;
    root.dataset.journey = name;
    if (el.journeyTitle) el.journeyTitle.textContent = journey.title;
    if (el.journeyText) el.journeyText.textContent = journey.text;

    root.querySelectorAll("[data-preset]").forEach(function(button) {
      button.classList.toggle("is-active", button.getAttribute("data-preset") === name);
    });
  }

  function initializeMap() {
    if (!window.L || !el.map || map) return;

    map = L.map(el.map, {
      center: ATLANTA_CENTER,
      zoom: 11,
      dragging: false,
      scrollWheelZoom: false,
      touchZoom: false,
      zoomControl: true
    });

    L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}", {
      maxZoom: 18,
      attribution: "Tiles &copy; Esri"
    }).addTo(map);

    L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Reference/MapServer/tile/{z}/{y}/{x}", {
      maxZoom: 18,
      attribution: "Powered by Esri ArcGIS"
    }).addTo(map);

    var wheelTarget = el.mapFrame || el.map;
    wheelTarget.addEventListener("wheel", function(event) {
      window.scrollBy({
        top: event.deltaY,
        left: 0,
        behavior: "auto"
      });
      event.preventDefault();
    }, { passive: false });

    markerLayer = L.layerGroup().addTo(map);
    setMapActive(false);
  }

  function setMapActive(active) {
    mapActive = Boolean(active);
    if (el.mapFrame) el.mapFrame.classList.toggle("is-map-active", mapActive);
    if (el.mapActivate) {
      el.mapActivate.setAttribute("aria-pressed", mapActive ? "true" : "false");
      el.mapActivate.textContent = mapActive ? "release map" : "move map";
    }
    if (!map) return;
    if (mapActive) {
      map.dragging.enable();
      map.touchZoom.enable();
    } else {
      map.dragging.disable();
      map.touchZoom.disable();
    }
  }

  function markerOptions(record, selected) {
    var points = number(record.TotalPointsEarned) || 0;
    var radius = Math.max(3.5, Math.min(7, 3 + points / 90));
    var isAlba = record.OBJECTID === ALBA_ID;
    var focus = selected || isAlba;

    return {
      radius: focus ? radius + 2.5 : radius,
      color: focus ? "#100f0f" : "rgba(16, 15, 15, 0.34)",
      weight: selected ? 2.5 : isAlba ? 2 : 0.9,
      fillColor: focus ? "#8d2f20" : "#5f675f",
      fillOpacity: selected ? 0.9 : isAlba ? 0.82 : 0.38,
      className: isAlba ? "champion-marker champion-marker-alba" : "champion-marker"
    };
  }

  function popupHtml(record) {
    var label = speciesLabel(record);
    var rank = rankingValue(record);
    return [
      '<div class="champion-popup">',
      '<p class="champion-popup-label">' + (record.OBJECTID === ALBA_ID ? "Alba / " : "") + escapeHtml(rank) + '</p>',
      "<h3>" + escapeHtml(label.common) + "</h3>",
      label.latin ? "<p><em>" + escapeHtml(label.latin) + "</em></p>" : "",
      '<dl>',
      "<div><dt>score</dt><dd>" + escapeHtml(formatNumber(record.TotalPointsEarned, 2)) + "</dd></div>",
      "<div><dt>trunk</dt><dd>" + escapeHtml(formatNumber(record.CircumferenceIN, 1)) + " in</dd></div>",
      "<div><dt>height</dt><dd>" + escapeHtml(formatNumber(record.HeightFT, 1)) + " ft</dd></div>",
      "<div><dt>canopy</dt><dd>" + escapeHtml(formatNumber(record.SpreadFT, 1)) + " ft</dd></div>",
      "</dl>",
      record.LocationNotes ? "<p>" + escapeHtml(record.LocationNotes) + "</p>" : "",
      "</div>"
    ].join("");
  }

  function renderMarkers() {
    if (!markerLayer) return;
    markerLayer.clearLayers();
    markers.clear();

    state.filtered.forEach(function(record) {
      if (!hasGeometry(record)) return;
      var marker = L.circleMarker([record.lat, record.lng], markerOptions(record, record.OBJECTID === state.selectedId));
      var label = speciesLabel(record);
      marker.bindTooltip(label.common, {
        direction: "top",
        offset: [0, -6],
        opacity: 0.95
      });
      marker.bindPopup(popupHtml(record), { maxWidth: 280 });
      marker.on("click", function() {
        selectRecord(record.OBJECTID, { pan: false });
      });
      markerLayer.addLayer(marker);
      markers.set(record.OBJECTID, marker);
    });
  }

  function sortRecords(records) {
    var mode = state.filters.sort;
    var copy = records.slice();
    copy.sort(function(a, b) {
      if (mode === "species") {
        return speciesLabel(a).common.localeCompare(speciesLabel(b).common);
      }
      var key = mode === "circumference" ? "CircumferenceIN" :
        mode === "height" ? "HeightFT" :
        mode === "spread" ? "SpreadFT" :
        "TotalPointsEarned";
      return (number(b[key]) || -1) - (number(a[key]) || -1);
    });
    return copy;
  }

  function passesFilters(record) {
    var search = state.filters.search;
    if (search && recordSearchText(record).indexOf(search) === -1) return false;

    if (state.filters.ranking !== "all") {
      var rank = rankingValue(record);
      if (state.filters.ranking === "unranked" && rank !== "unranked") return false;
      if (state.filters.ranking !== "unranked" && rank !== state.filters.ranking) return false;
    }

    if (state.filters.status !== "all" && text(record.Status) !== state.filters.status) return false;
    if (state.filters.access !== "all" && accessKind(record) !== state.filters.access) return false;

    return true;
  }

  function applyFilters() {
    state.filtered = sortRecords(state.records.filter(passesFilters));
    if (state.selectedId && !state.filtered.some(function(record) { return record.OBJECTID === state.selectedId; })) {
      state.selectedId = null;
    }
    renderAll();
  }

  function renderStats() {
    var species = new Set(state.records.map(function(record) {
      var label = speciesLabel(record);
      return label.latin || label.common;
    }));
    el.visibleStat.textContent = String(state.filtered.length);
    el.totalStat.textContent = String(state.records.length);
    el.speciesStat.textContent = String(species.size);
  }

  function createMetric(label, value) {
    var item = document.createElement("p");
    var strong = document.createElement("strong");
    var small = document.createElement("small");
    strong.textContent = value;
    small.textContent = label;
    item.append(strong, small);
    return item;
  }

  function renderDetail() {
    var record = state.selectedId ? recordById(state.selectedId) : null;
    el.detail.replaceChildren();

    var eyebrow = document.createElement("p");
    eyebrow.className = "champion-card-label";
    eyebrow.textContent = record && record.OBJECTID === ALBA_ID ? "Selected tree / Alba" : "Selected tree";
    el.detail.append(eyebrow);

    if (!record) {
      var emptyTitle = document.createElement("h2");
      emptyTitle.textContent = "Select a tree";
      var emptyText = document.createElement("p");
      emptyText.textContent = "Choose a row or marker. Save it if it seems worth walking toward.";
      el.detail.append(emptyTitle, emptyText);
      return;
    }

    var label = speciesLabel(record);
    var title = document.createElement("h2");
    title.textContent = label.common;
    el.detail.append(title);

    if (label.latin) {
      var latin = document.createElement("p");
      var em = document.createElement("em");
      em.textContent = label.latin;
      latin.appendChild(em);
      el.detail.append(latin);
    }

    var location = document.createElement("p");
    location.className = "champion-location";
    location.textContent = text(record.LocationNotes) || text(record.LocationType) || "No location note.";
    el.detail.append(location);

    var metrics = document.createElement("div");
    metrics.className = "champion-detail-metrics";
    metrics.append(
      createMetric("score", formatNumber(record.TotalPointsEarned, 2)),
      createMetric("trunk", formatNumber(record.CircumferenceIN, 1) + " in"),
      createMetric("height", formatNumber(record.HeightFT, 1) + " ft"),
      createMetric("canopy", formatNumber(record.SpreadFT, 1) + " ft")
    );
    el.detail.append(metrics);

    var meta = document.createElement("p");
    meta.className = "champion-meta-line";
    meta.textContent = [
      rankingValue(record),
      text(record.Status) || "status unknown",
      text(record.LocationType) || "access unknown",
      "record " + record.OBJECTID,
      state.nearest.id === record.OBJECTID ? formatDistance(state.nearest.miles) + " from you" : ""
    ].filter(Boolean).join(" / ");
    el.detail.append(meta);

    var actions = document.createElement("div");
    actions.className = "champion-detail-actions";

    var compare = document.createElement("button");
    compare.type = "button";
    compare.className = "champion-text-button";
    compare.textContent = state.compareIds.indexOf(record.OBJECTID) === -1 ? "Save tree" : "Saved";
    compare.addEventListener("click", function() {
      addCompare(record.OBJECTID);
    });
    actions.appendChild(compare);

    var directions = document.createElement("a");
    directions.className = "champion-text-button champion-link-button";
    directions.href = directionsUrl(record);
    directions.target = "_blank";
    directions.rel = "noopener";
    directions.textContent = "Walk there";
    actions.appendChild(directions);

    if (record.OBJECTID === ALBA_ID) {
      var meet = document.createElement("a");
      meet.className = "champion-text-button champion-link-button";
      meet.href = "https://meetalba.org/";
      meet.target = "_blank";
      meet.rel = "noopener";
      meet.textContent = "Meet Alba";
      actions.appendChild(meet);
    }

    el.detail.append(actions);
  }

  function renderList() {
    el.list.replaceChildren();
    var visible = state.filtered.slice(0, MAX_LIST_ITEMS);
    var remaining = state.filtered.length - visible.length;
    el.note.textContent = remaining > 0 ?
      "Showing " + visible.length + " of " + state.filtered.length + " trees." :
      "Showing " + visible.length + " trees.";

    visible.forEach(function(record, index) {
      var label = speciesLabel(record);
      var li = document.createElement("li");
      li.className = "champion-list-item";
      if (record.OBJECTID === state.selectedId) li.classList.add("is-selected");
      if (record.OBJECTID === ALBA_ID) li.classList.add("is-alba");

      var button = document.createElement("button");
      button.type = "button";
      button.className = "champion-record-button";
      button.addEventListener("click", function() {
        selectRecord(record.OBJECTID, { pan: true });
      });

      var row = document.createElement("span");
      row.className = "champion-record-row";
      var name = document.createElement("strong");
      name.textContent = (index + 1) + ". " + (record.OBJECTID === ALBA_ID ? "Alba / " : "") + label.common;
      var metric = document.createElement("span");
      metric.textContent = formatNumber(record.TotalPointsEarned, 2) + " score";
      row.append(name, metric);

      var sub = document.createElement("span");
      sub.className = "champion-record-sub";
      sub.textContent = [
        label.latin,
        rankingValue(record),
        text(record.LocationNotes) || text(record.LocationType)
      ].filter(Boolean).join(" / ");

      button.append(row, sub);

      var add = document.createElement("button");
      add.type = "button";
      add.className = "champion-mini-button";
      add.textContent = state.compareIds.indexOf(record.OBJECTID) === -1 ? "save" : "saved";
      add.addEventListener("click", function(event) {
        event.stopPropagation();
        addCompare(record.OBJECTID);
      });

      li.append(button, add);
      el.list.appendChild(li);
    });
  }

  function renderCompare() {
    el.compare.replaceChildren();
    if (!state.compareIds.length) {
      var empty = document.createElement("p");
      empty.className = "champion-empty";
      empty.textContent = "Save one tree. Add two more only if they make the walk better.";
      el.compare.appendChild(empty);
      return;
    }

    state.compareIds.forEach(function(id) {
      var record = recordById(id);
      if (!record) return;
      var label = speciesLabel(record);
      var card = document.createElement("article");
      card.className = "champion-compare-card";

      var title = document.createElement("h3");
      title.textContent = (record.OBJECTID === ALBA_ID ? "Alba / " : "") + label.common;
      var latin = document.createElement("p");
      latin.textContent = [
        label.latin || "kind unknown",
        state.nearest.id === record.OBJECTID ? formatDistance(state.nearest.miles) + " from you" : ""
      ].filter(Boolean).join(" / ");
      var metrics = document.createElement("dl");
      metrics.append(
        compareMetric("score", formatNumber(record.TotalPointsEarned, 2)),
        compareMetric("trunk", formatNumber(record.CircumferenceIN, 1) + " in"),
        compareMetric("height", formatNumber(record.HeightFT, 1) + " ft"),
        compareMetric("canopy", formatNumber(record.SpreadFT, 1) + " ft")
      );

      var remove = document.createElement("button");
      remove.type = "button";
      remove.className = "champion-mini-button";
      remove.textContent = "remove";
      remove.addEventListener("click", function() {
        state.compareIds = state.compareIds.filter(function(existing) { return existing !== id; });
        renderAll();
      });

      var directions = document.createElement("a");
      directions.className = "champion-mini-button champion-link-button";
      directions.href = directionsUrl(record);
      directions.target = "_blank";
      directions.rel = "noopener";
      directions.textContent = "walk there";

      var actions = document.createElement("div");
      actions.className = "champion-compare-actions";
      actions.append(directions, remove);

      card.append(title, latin, metrics, actions);
      el.compare.appendChild(card);
    });
  }

  function compareMetric(label, value) {
    var wrap = document.createElement("div");
    var dt = document.createElement("dt");
    var dd = document.createElement("dd");
    dt.textContent = label;
    dd.textContent = value;
    wrap.append(dt, dd);
    return wrap;
  }

  function renderAll() {
    renderStats();
    renderMarkers();
    renderList();
    renderDetail();
    renderCompare();
  }

  function addCompare(id) {
    id = Number(id);
    if (!recordById(id)) return;
    if (state.compareIds.indexOf(id) === -1) {
      if (state.compareIds.length >= 3) state.compareIds.shift();
      state.compareIds.push(id);
    }
    renderAll();
  }

  function firstFilteredIds(count) {
    return state.filtered.slice(0, count).map(function(record) {
      return record.OBJECTID;
    });
  }

  function selectRecord(id, options) {
    id = Number(id);
    var record = recordById(id);
    if (!record) return;
    state.selectedId = id;
    renderAll();

    if (map && hasGeometry(record) && (!options || options.pan !== false)) {
      map.flyTo([record.lat, record.lng], Math.max(map.getZoom(), id === ALBA_ID ? 15 : 13), {
        animate: !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
        duration: 0.6
      });
    }

    var marker = markers.get(id);
    if (marker && options && options.openPopup) marker.openPopup();
  }

  function readLocationOverride() {
    var params = new URLSearchParams(window.location.search);
    var lat = number(params.get("nearestLat"));
    var lng = number(params.get("nearestLng"));
    if (lat === null || lng === null) return null;
    return { lat: lat, lng: lng, source: "url" };
  }

  function requestLocation() {
    var override = readLocationOverride();
    if (override) return Promise.resolve(override);

    if (!navigator.geolocation) {
      return Promise.reject(new Error("Geolocation is not available in this browser."));
    }

    return new Promise(function(resolve, reject) {
      navigator.geolocation.getCurrentPosition(function(position) {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          source: "browser"
        });
      }, reject, {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      });
    });
  }

  function findNearestRecord(origin) {
    return state.records
      .filter(isNearestCandidate)
      .map(function(record) {
        return {
          record: record,
          miles: distanceMiles(origin, record)
        };
      })
      .filter(function(item) {
        return Number.isFinite(item.miles);
      })
      .sort(function(a, b) {
        return a.miles - b.miles;
      })[0] || null;
  }

  function showNearestFromLocation(origin) {
    var nearest = findNearestRecord(origin);
    if (!nearest) {
      updateNearest("No alive public or park records were found.", null, null, "error");
      return;
    }

    state.userLocation = origin;
    state.nearest = {
      id: nearest.record.OBJECTID,
      miles: nearest.miles
    };
    state.filters = { search: "", ranking: "all", status: "Alive", access: "public", sort: "points" };
    syncControlsFromState();
    setJourney("nearest");
    applyFilters();
    addCompare(nearest.record.OBJECTID);
    selectRecord(nearest.record.OBJECTID, { pan: true, openPopup: true });
    updateNearest("nearest public tree found", nearest.record, nearest.miles, "success");
  }

  function findNearestToUser() {
    if (!state.records.length) {
      updateNearest("Still loading the tree records.", null, null, "neutral");
      return;
    }

    if (el.nearestButton) {
      el.nearestButton.disabled = true;
      el.nearestButton.textContent = "Finding...";
    }
    updateNearest("checking coordinates...", null, null, "neutral");

    requestLocation()
      .then(showNearestFromLocation)
      .catch(function(error) {
        updateNearest("Location was not available.", null, null, "error");
        if (error && error.code === undefined) console.debug("[champion-trees] nearest location", error);
      })
      .finally(function() {
        if (el.nearestButton) {
          el.nearestButton.disabled = false;
          el.nearestButton.textContent = "big ol' trees near you";
        }
      });
  }

  function applyPreset(name) {
    setJourney(name);

    if (name === "reset") {
      state.filters = { search: "", ranking: "all", status: "all", access: "all", sort: "points" };
      state.selectedId = ALBA_ID;
      state.compareIds = [ALBA_ID];
    }
    if (name === "alba") {
      state.filters = { search: "1428 vaughn", ranking: "all", status: "all", access: "all", sort: "points" };
      state.selectedId = ALBA_ID;
      state.compareIds = [ALBA_ID];
    }
    if (name === "champions") {
      state.filters = { search: "", ranking: "all", status: "all", access: "all", sort: "points" };
    }
    if (name === "white-oaks") {
      state.filters = { search: "quercus alba", ranking: "all", status: "all", access: "all", sort: "circumference" };
    }
    if (name === "first-place") {
      state.filters = { search: "", ranking: "1st", status: "all", access: "all", sort: "points" };
    }
    if (name === "public") {
      state.filters = { search: "", ranking: "all", status: "Alive", access: "public", sort: "points" };
    }
    if (name === "dead") {
      state.filters = { search: "", ranking: "all", status: "Dead", access: "all", sort: "points" };
    }

    syncControlsFromState();
    applyFilters();

    if (name === "alba") {
      selectRecord(ALBA_ID, { pan: true, openPopup: true });
      return;
    }

    if (name === "champions" || name === "public" || name === "dead" || name === "first-place") {
      state.compareIds = firstFilteredIds(3);
      if (state.compareIds.length) selectRecord(state.compareIds[0], { pan: true, openPopup: true });
      return;
    }

    if (name === "white-oaks") {
      var whiteOakIds = firstFilteredIds(3);
      if (whiteOakIds.indexOf(ALBA_ID) === -1 && recordById(ALBA_ID)) whiteOakIds.unshift(ALBA_ID);
      state.compareIds = whiteOakIds.slice(0, 3);
      selectRecord(ALBA_ID, { pan: true, openPopup: true });
    }
  }

  function syncControlsFromState() {
    el.search.value = state.filters.search;
    el.ranking.value = state.filters.ranking;
    el.statusFilter.value = state.filters.status;
    el.access.value = state.filters.access;
    el.sort.value = state.filters.sort;
  }

  function bindControls() {
    [
      [el.search, "search", function(value) { return normalizeSearch(value); }],
      [el.ranking, "ranking", text],
      [el.statusFilter, "status", text],
      [el.access, "access", text],
      [el.sort, "sort", text]
    ].forEach(function(item) {
      var input = item[0];
      var key = item[1];
      var normalize = item[2];
      input.addEventListener(input.type === "search" ? "input" : "change", function() {
        state.filters[key] = normalize(input.value);
        setJourney("custom");
        applyFilters();
      });
    });

    root.querySelectorAll("[data-preset]").forEach(function(button) {
      button.addEventListener("click", function() {
        applyPreset(button.getAttribute("data-preset"));
      });
    });

    root.querySelector('[data-action="spotlight-alba"]').addEventListener("click", function() {
      applyPreset("alba");
    });

    if (el.nearestButton) {
      el.nearestButton.addEventListener("click", findNearestToUser);
    }

    if (el.advancedToggle) {
      el.advancedToggle.addEventListener("click", function() {
        setAdvancedView(!root.classList.contains("is-advanced"));
      });
    }

    root.querySelector('[data-action="clear-compare"]').addEventListener("click", function() {
      state.compareIds = [];
      renderAll();
    });

    if (el.mapActivate) {
      el.mapActivate.addEventListener("click", function() {
        setMapActive(!mapActive);
      });
    }

    document.addEventListener("keydown", function(event) {
      if (event.key === "Escape" && mapActive) setMapActive(false);
    });
  }

  function fetchWithEsriLeaflet() {
    return new Promise(function(resolve, reject) {
      if (!window.L || !L.esri || !L.esri.query) {
        reject(new Error("Esri Leaflet query API unavailable"));
        return;
      }
      L.esri.query({
        url: SERVICE_URL
      })
        .where("1=1")
        .fields(fields)
        .returnGeometry(true)
        .run(function(error, featureCollection) {
          if (error) {
            reject(error);
            return;
          }
          resolve(featureCollection);
        });
    });
  }

  function fetchGeoJsonFallback() {
    var params = new URLSearchParams({
      f: "geojson",
      where: "1=1",
      outFields: fields.join(","),
      returnGeometry: "true",
      resultRecordCount: "2000"
    });
    return fetch(SERVICE_URL + "/query?" + params.toString()).then(function(response) {
      if (!response.ok) throw new Error("FeatureServer request failed: " + response.status);
      return response.json();
    });
  }

  function loadData() {
    updateStatus("Loading Trees Atlanta data...");
    return fetchWithEsriLeaflet()
      .catch(fetchGeoJsonFallback)
      .then(function(featureCollection) {
        var records = (featureCollection.features || [])
          .map(normalizeFeature)
          .filter(function(record) {
            return record.OBJECTID && hasGeometry(record);
          });
        state.records = records;
        state.selectedId = ALBA_ID;
        state.compareIds = [ALBA_ID];
        if (el.nearestButton) el.nearestButton.disabled = false;
        updateStatus("Loaded " + records.length + " champion tree records.", "success");
        applyFilters();
        selectRecord(ALBA_ID, { pan: true });
      })
      .catch(function(error) {
        updateStatus("Could not load Trees Atlanta data.", "error");
        if (el.fallback) el.fallback.hidden = false;
        console.error("[champion-trees]", error);
      });
  }

  bindControls();
  initializeMap();
  loadData();
})();
