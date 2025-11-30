import globals from "globals";
import js from "@eslint/js";
import stylistic from "@stylistic/eslint-plugin";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
	globalIgnores([
		"node_modules/*",
		".git/*",
		"docker-compose.yml"
	]),
	{ 
		files: ["**/*.{js,mjs,cjs}"], 
		languageOptions: { 
			globals: globals.node 
		},
		plugins: {
			"@stylistic": stylistic,
			js
		},
		extends: ["js/recommended"],
		rules: {
			"@stylistic/indent": ["error", "tab"],
			"@stylistic/quotes" : ["error", "double", 
				{"allowTemplateLiterals": "always"}
			],
			"@stylistic/comma-style": ["error", "last"],
			"@stylistic/semi": ["error", "always"],
			"no-unused-vars": "warn",
			"no-undef": "warn",
			"no-unassigned-vars": "error",
			"no-unexpected-multiline": "warn"
		}
	},
  
]);
