import { formatTable } from './bundle-size';
import { describe, test, expect } from "vitest"

describe("formatTable", () => {
    const subject = formatTable;
    test("should return a markdown table", () => {
        const result = subject("name", [
            { page: "new-page", type: "added", size: 1337, diff: 0 },
            { page: "change-decrease", type: "changed", size: 5134, diff: -1234 },
            { page: "change-increase", type: "changed", size: 5134, diff: +2123 },
            { page: "change-large-increase", type: "changed", size: 15134, diff: +5134 },
            { page: "change-very-large-increase", type: "changed", size: 55134, diff: +22134 },
        ]);
        expect(result).toMatchInlineSnapshot(`
          "| name | Size (gzipped) | Diff |
          | --- | --- | --- |
          | \`new-page\` | 1.34 kB | added |
          | \`change-decrease\` | 5.13 kB | -1.23&nbsp;kB&nbsp;(🟢&nbsp;-24.04%) |
          | \`change-increase\` | 5.13 kB | +2.12&nbsp;kB&nbsp;(🟡&nbsp;41.35%) |
          | \`change-large-increase\` | 15.1 kB | +5.13&nbsp;kB&nbsp;(🔴&nbsp;33.92%) |
          | \`change-very-large-increase\` | 55.1 kB | +22.1&nbsp;kB&nbsp;(💥&nbsp;40.15%) |"
        `)
    })
})
