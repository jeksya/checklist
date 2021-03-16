module.exports = {
	env: {
		browser: true,
		node: true,
		commonjs: true,
		es2020: true,
	},
	parserOptions: {
		ecmaVersion: 2020,
		ecmaFeatures: {
			jsx: true,
		},
		sourceType: "module",
	},
	plugins: ["react", "react-hooks"],
	extends: [
		"eslint:recommended",
		"plugin:react/recommended",
		"plugin:react-hooks/recommended",
	],
	settings: {
		react: {
			version: "detect",
		},
	},
	rules: {
		"react/prop-types": "off",
		"react/no-unescaped-entities": ["error", { forbid: [">", "}"] }],
		"no-trailing-spaces":  [2, { "skipBlankLines": false }],
		"no-multi-spaces": 2,
		"indent": ["error"
			, "tab"
			, { "SwitchCase": 1 }]
	}
};