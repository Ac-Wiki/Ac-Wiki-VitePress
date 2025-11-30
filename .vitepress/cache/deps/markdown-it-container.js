import "./chunk-V4OQ3NZ2.js";

// node_modules/markdown-it-container/index.mjs
function container_plugin(md, name, options) {
  function validateDefault(params) {
    return params.trim().split(" ", 2)[0] === name;
  }
  function renderDefault(tokens, idx, _options, env, slf) {
    if (tokens[idx].nesting === 1) {
      tokens[idx].attrJoin("class", name);
    }
    return slf.renderToken(tokens, idx, _options, env, slf);
  }
  options = options || {};
  const min_markers = 3;
  const marker_str = options.marker || ":";
  const marker_char = marker_str.charCodeAt(0);
  const marker_len = marker_str.length;
  const validate = options.validate || validateDefault;
  const render = options.render || renderDefault;
  function container(state, startLine, endLine, silent) {
    let pos;
    let auto_closed = false;
    let start = state.bMarks[startLine] + state.tShift[startLine];
    let max = state.eMarks[startLine];
    if (marker_char !== state.src.charCodeAt(start)) {
      return false;
    }
    for (pos = start + 1; pos <= max; pos++) {
      if (marker_str[(pos - start) % marker_len] !== state.src[pos]) {
        break;
      }
    }
    const marker_count = Math.floor((pos - start) / marker_len);
    if (marker_count < min_markers) {
      return false;
    }
    pos -= (pos - start) % marker_len;
    const markup = state.src.slice(start, pos);
    const params = state.src.slice(pos, max);
    if (!validate(params, markup)) {
      return false;
    }
    if (silent) {
      return true;
    }
    let nextLine = startLine;
    for (; ; ) {
      nextLine++;
      if (nextLine >= endLine) {
        break;
      }
      start = state.bMarks[nextLine] + state.tShift[nextLine];
      max = state.eMarks[nextLine];
      if (start < max && state.sCount[nextLine] < state.blkIndent) {
        break;
      }
      if (marker_char !== state.src.charCodeAt(start)) {
        continue;
      }
      if (state.sCount[nextLine] - state.blkIndent >= 4) {
        continue;
      }
      for (pos = start + 1; pos <= max; pos++) {
        if (marker_str[(pos - start) % marker_len] !== state.src[pos]) {
          break;
        }
      }
      if (Math.floor((pos - start) / marker_len) < marker_count) {
        continue;
      }
      pos -= (pos - start) % marker_len;
      pos = state.skipSpaces(pos);
      if (pos < max) {
        continue;
      }
      auto_closed = true;
      break;
    }
    const old_parent = state.parentType;
    const old_line_max = state.lineMax;
    state.parentType = "container";
    state.lineMax = nextLine;
    const token_o = state.push("container_" + name + "_open", "div", 1);
    token_o.markup = markup;
    token_o.block = true;
    token_o.info = params;
    token_o.map = [startLine, nextLine];
    state.md.block.tokenize(state, startLine + 1, nextLine);
    const token_c = state.push("container_" + name + "_close", "div", -1);
    token_c.markup = state.src.slice(start, pos);
    token_c.block = true;
    state.parentType = old_parent;
    state.lineMax = old_line_max;
    state.line = nextLine + (auto_closed ? 1 : 0);
    return true;
  }
  md.block.ruler.before("fence", "container_" + name, container, {
    alt: ["paragraph", "reference", "blockquote", "list"]
  });
  md.renderer.rules["container_" + name + "_open"] = render;
  md.renderer.rules["container_" + name + "_close"] = render;
}
export {
  container_plugin as default
};
//# sourceMappingURL=markdown-it-container.js.map
