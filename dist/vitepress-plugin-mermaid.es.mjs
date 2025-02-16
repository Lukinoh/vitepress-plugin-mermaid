const M = (n) => {
  const a = (u) => {
    function t(r, e) {
      for (; r.length < e; )
        r = "0" + r;
      return r;
    }
    function i(r, e) {
      var d, l, o;
      if (e.length === 0)
        return r;
      for (d = 0, o = e.length; d < o; d++)
        l = e.charCodeAt(d), r = (r << 5) - r + l, r |= 0;
      return r < 0 ? r * -2 : r;
    }
    function p(r, e, d) {
      return Object.keys(e).sort().reduce(l, r);
      function l(o, s) {
        return f(o, e[s], s, d);
      }
    }
    function f(r, e, d, l) {
      var o = i(i(i(r, d), c(e)), typeof e);
      return e === null ? i(o, "null") : e === void 0 ? i(o, "undefined") : typeof e == "object" ? l.indexOf(e) !== -1 ? i(o, "[Circular]" + d) : (l.push(e), p(o, e, l)) : i(o, e.toString());
    }
    function c(r) {
      return Object.prototype.toString.call(r);
    }
    return t(f(0, u, "", []).toString(16), 8);
  }, m = n.renderer.rules.fence.bind(n.renderer.rules);
  n.renderer.rules.fence = (u, t, i, p, f) => {
    const c = u[t];
    if (c.info.trim() === "mermaid")
      try {
        const r = c.content.trim();
        return `<Mermaid id="${`mermaid_${a(t)}`}"  graph="${encodeURIComponent(
          r
        )}"></Mermaid>`;
      } catch (r) {
        return `<pre>${r}</pre>`;
      }
    return c.info.trim() === "mmd" && (u[t].info = "mermaid"), m(u, t, i, p, f);
  };
}, g = {
  //We set loose as default here because is needed to load images
  securityLevel: "loose",
  startOnLoad: !1
};
function v(n) {
  const a = {
    ...g,
    ...n
  }, m = "virtual:mermaid-config", u = "\0" + m;
  return {
    name: "vite-plugin-mermaid",
    enforce: "post",
    transform(t, i) {
      if (i.includes("vitepress/dist/client/app/index.js"))
        return t = `
import Mermaid from 'vitepress-plugin-mermaid/Mermaid.vue';
` + t, t = t.replace(
          "// install global components",
          `// install global components
		app.component('Mermaid', Mermaid);
`
        ), {
          code: t,
          map: null
          // provide source map if available
        };
    },
    async resolveId(t) {
      if (t === m)
        return u;
    },
    async load(t) {
      if (t === u)
        return `export default ${JSON.stringify(a)};`;
    }
  };
}
const y = (n) => {
  n.markdown || (n.markdown = {});
  const a = n.markdown.config || (() => {
  });
  return n.markdown.config = (...m) => {
    M(...m), a(...m);
  }, n.vite || (n.vite = {}), n.vite.plugins || (n.vite.plugins = []), n.vite.plugins.push(v(n.mermaid)), n;
};
export {
  M as MermaidMarkdown,
  v as MermaidPlugin,
  y as withMermaid
};
