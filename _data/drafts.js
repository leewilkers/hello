const fs = require("fs");
const path = require("path");

module.exports = function() {
  const dir = path.join(__dirname, "..", "drafts");
  if (!fs.existsSync(dir)) return {};
  const map = {};
  for (const file of fs.readdirSync(dir)) {
    if (file === "drafts.json") continue;
    if (!/\.(njk|md|html)$/.test(file)) continue;
    const raw = fs.readFileSync(path.join(dir, file), "utf8");
    const match = raw.match(/^---[\s\S]*?\nshadows:\s*(.+?)\s*(?:\n|$)/m);
    if (!match) continue;
    const liveUrl = match[1].trim().replace(/^["']|["']$/g, "");
    const slug = file.replace(/\.(njk|md|html)$/, "");
    map[liveUrl] = `/_drafts/${slug}/`;
  }
  return map;
};
