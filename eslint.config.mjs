import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import { plugin as shadcn } from "@shadcn/lint";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    plugins: { shadcn },
    rules: {
      "shadcn/no-restyle": ["warn", { allow: ["layout"] }],
      "shadcn/no-arbitrary-values": [
        "warn",
        {
          allow: [
            "typography",
            "spacing",
            "shape",
            "color",
            "effects",
            "motion",
            "layout",
          ],
        },
      ],
      "shadcn/no-raw-colors": [
        "warn",
        {
          allow: [
            "*-amber-*",
            "*-blue-*",
            "*-emerald-*",
            "*-indigo-*",
            "*-purple-*",
            "*-violet-*",
            "*-rose-*",
            "*-red-*",
            "text-white",
            "bg-white",
            "border-white",
            "fill-white",
            "ring-*",
            "hover:*",
          ],
        },
      ],
      "shadcn/no-inline-styles": "off",
      "shadcn/no-unknown-classes": "warn",
      "shadcn/require-static-classes": "warn",
    },
  },
  // Scoped exemption for UI definition components & shared wrappers
  {
    files: ["components/ui/**", "components/shared/responsive-dialog.tsx"],
    rules: {
      "shadcn/no-restyle": "off",
      "shadcn/require-static-classes": "off",
    },
  },
]);

export default eslintConfig;
