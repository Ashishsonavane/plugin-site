import { bench, describe } from "vitest";
import { cleanTitle, formatPercentage } from "../plugins/plugin-site/src/commons/helper.js";
import ucFirst from "../plugins/plugin-site/src/utils/ucfirst.js";
import forceArray from "../plugins/plugin-site/src/utils/forceArray.mjs";
import { fixGitHubUrl, sortVersions } from "../plugins/gatsby-source-jenkinsplugins/utils.mjs";

describe("cleanTitle", () => {
    bench("removes Jenkins prefix", () => {
        cleanTitle("Jenkins Git Plugin");
    });

    bench("removes Plugin suffix", () => {
        cleanTitle("Blue Ocean Plugin");
    });

    bench("handles null input", () => {
        cleanTitle(undefined);
    });

    bench("cleans multiple patterns", () => {
        cleanTitle("Jenkins Pipeline Plug-in for Jenkins");
    });
});

describe("formatPercentage", () => {
    bench("formats high percentage", () => {
        formatPercentage(95.45);
    });

    bench("formats low percentage", () => {
        formatPercentage(0.9577);
    });

    bench("formats single digit percentage", () => {
        formatPercentage(5.678);
    });
});

describe("ucFirst", () => {
    bench("capitalizes lowercase string", () => {
        ucFirst("hello");
    });

    bench("handles already capitalized", () => {
        ucFirst("Hello");
    });

    bench("handles uppercase string", () => {
        ucFirst("HELLO WORLD");
    });
});

describe("forceArray", () => {
    bench("wraps non-array value", () => {
        forceArray("value");
    });

    bench("passes through array", () => {
        forceArray(["value1", "value2"]);
    });

    bench("wraps object value", () => {
        forceArray({ key: "value" });
    });
});

describe("fixGitHubUrl", () => {
    bench("fixes GitHub URL with subpath", () => {
        fixGitHubUrl("https://github.com/jenkinsci/git-plugin/src/main/docs", "master");
    });

    bench("preserves URL with tree path", () => {
        fixGitHubUrl("https://github.com/jenkinsci/git-plugin/tree/main/docs", "main");
    });

    bench("handles null URL", () => {
        fixGitHubUrl(null, "master");
    });
});

describe("sortVersions", () => {
    const versions = {
        0: "1.0",
        1: "1.1",
        2: "2.0",
        3: "1.5",
        4: "3.0",
        5: "2.5",
        6: "1.2",
        7: "4.0",
        8: "3.5",
        9: "5.0",
    };

    bench("sorts 10 version entries", () => {
        sortVersions(versions);
    });

    const manyVersions = {};
    for (let i = 0; i < 100; i++) {
        manyVersions[i] = `${Math.floor(i / 10)}.${i % 10}`;
    }

    bench("sorts 100 version entries", () => {
        sortVersions(manyVersions);
    });
});
