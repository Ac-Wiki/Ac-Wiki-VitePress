import "./chunk-V4OQ3NZ2.js";

// node_modules/markdown-it-sup/index.mjs
var UNESCAPE_RE = /\\([ \\!"#$%&'()*+,./:;<=>?@[\]^_`{|}~-])/g;
function superscript(state, silent) {
  const max = state.posMax;
  const start = state.pos;
  if (state.src.charCodeAt(start) !== 94) {
    return false;
  }
  if (silent) {
    return false;
  }
  if (start + 2 >= max) {
    return false;
  }
  state.pos = start + 1;
  let found = false;
  while (state.pos < max) {
    if (state.src.charCodeAt(state.pos) === 94) {
      found = true;
      break;
    }
    state.md.inline.skipToken(state);
  }
  if (!found || start + 1 === state.pos) {
    state.pos = start;
    return false;
  }
  const content = state.src.slice(start + 1, state.pos);
  if (content.match(/(^|[^\\])(\\\\)*\s/)) {
    state.pos = start;
    return false;
  }
  state.posMax = state.pos;
  state.pos = start + 1;
  const token_so = state.push("sup_open", "sup", 1);
  token_so.markup = "^";
  const token_t = state.push("text", "", 0);
  token_t.content = content.replace(UNESCAPE_RE, "$1");
  const token_sc = state.push("sup_close", "sup", -1);
  token_sc.markup = "^";
  state.pos = state.posMax + 1;
  state.posMax = max;
  return true;
}
function sup_plugin(md) {
  md.inline.ruler.after("emphasis", "sup", superscript);
}
export {
  sup_plugin as default
};
//# sourceMappingURL=markdown-it-sup.js.map
