import type { CustomThemeConfig } from '@skeletonlabs/tw-plugin';

export const paldashTheme: CustomThemeConfig = {
    name: 'paldash',
    properties: {
		// =~= Theme Properties =~=
		// "--theme-font-family-base": `inter`,
		// "--theme-font-family-heading": `poppins`,
		"--theme-font-family-base": `system-ui`,
		"--theme-font-family-heading": `system-ui`,
		"--theme-font-color-base": "0 0 0",
		"--theme-font-color-dark": "255 255 255",
		"--theme-rounded-base": "9999px",
		"--theme-rounded-container": "24px",
		"--theme-border-base": "1px",
		// =~= Theme On-X Colors =~=
		"--on-primary": "255 255 255",
		"--on-secondary": "255 255 255",
		"--on-tertiary": "255 255 255",
		"--on-success": "0 0 0",
		"--on-warning": "0 0 0",
		"--on-error": "255 255 255",
		"--on-surface": "var(--color-tertiary-50)",
		// =~= Theme Colors  =~=
		// primary | #4423c7 
		"--color-primary-50": "227 222 247", // #e3def7
		"--color-primary-100": "218 211 244", // #dad3f4
		"--color-primary-200": "208 200 241", // #d0c8f1
		"--color-primary-300": "180 167 233", // #b4a7e9
		"--color-primary-400": "124 101 216", // #7c65d8
		"--color-primary-500": "68 35 199", // #4423c7
		"--color-primary-600": "61 32 179", // #3d20b3
		"--color-primary-700": "51 26 149", // #331a95
		"--color-primary-800": "41 21 119", // #291577
		"--color-primary-900": "33 17 98", // #211162
		// secondary | #3223DB 
		"--color-secondary-50": "224 222 250", // #e0defa
		"--color-secondary-100": "214 211 248", // #d6d3f8
		"--color-secondary-200": "204 200 246", // #ccc8f6
		"--color-secondary-300": "173 167 241", // #ada7f1
		"--color-secondary-400": "112 101 230", // #7065e6
		"--color-secondary-500": "50 35 219", // #3223DB
		"--color-secondary-600": "45 32 197", // #2d20c5
		"--color-secondary-700": "38 26 164", // #261aa4
		"--color-secondary-800": "30 21 131", // #1e1583
		"--color-secondary-900": "25 17 107", // #19116b
		// tertiary | #1c7c7d 
		"--color-tertiary-50": "221 235 236", // #ddebec
		"--color-tertiary-100": "210 229 229", // #d2e5e5
		"--color-tertiary-200": "198 222 223", // #c6dedf
		"--color-tertiary-300": "164 203 203", // #a4cbcb
		"--color-tertiary-400": "96 163 164", // #60a3a4
		"--color-tertiary-500": "28 124 125", // #1c7c7d
		"--color-tertiary-600": "25 112 113", // #197071
		"--color-tertiary-700": "21 93 94", // #155d5e
		"--color-tertiary-800": "17 74 75", // #114a4b
		"--color-tertiary-900": "14 61 61", // #0e3d3d
		// success | #84cc16 
		"--color-success-50": "237 247 220", // #edf7dc
		"--color-success-100": "230 245 208", // #e6f5d0
		"--color-success-200": "224 242 197", // #e0f2c5
		"--color-success-300": "206 235 162", // #ceeba2
		"--color-success-400": "169 219 92", // #a9db5c
		"--color-success-500": "132 204 22", // #84cc16
		"--color-success-600": "119 184 20", // #77b814
		"--color-success-700": "99 153 17", // #639911
		"--color-success-800": "79 122 13", // #4f7a0d
		"--color-success-900": "65 100 11", // #41640b
		// warning | #EAB308 
		"--color-warning-50": "252 244 218", // #fcf4da
		"--color-warning-100": "251 240 206", // #fbf0ce
		"--color-warning-200": "250 236 193", // #faecc1
		"--color-warning-300": "247 225 156", // #f7e19c
		"--color-warning-400": "240 202 82", // #f0ca52
		"--color-warning-500": "234 179 8", // #EAB308
		"--color-warning-600": "211 161 7", // #d3a107
		"--color-warning-700": "176 134 6", // #b08606
		"--color-warning-800": "140 107 5", // #8c6b05
		"--color-warning-900": "115 88 4", // #735804
		// error | #D41976 
		"--color-error-50": "249 221 234", // #f9ddea
		"--color-error-100": "246 209 228", // #f6d1e4
		"--color-error-200": "244 198 221", // #f4c6dd
		"--color-error-300": "238 163 200", // #eea3c8
		"--color-error-400": "225 94 159", // #e15e9f
		"--color-error-500": "212 25 118", // #D41976
		"--color-error-600": "191 23 106", // #bf176a
		"--color-error-700": "159 19 89", // #9f1359
		"--color-error-800": "127 15 71", // #7f0f47
		"--color-error-900": "104 12 58", // #680c3a
		// surface | #2b264b 
		"--color-surface-50": "223 222 228", // #dfdee4
		"--color-surface-100": "213 212 219", // #d5d4db
		"--color-surface-200": "202 201 210", // #cac9d2
		"--color-surface-300": "170 168 183", // #aaa8b7
		"--color-surface-400": "107 103 129", // #6b6781
		"--color-surface-500": "43 38 75", // #2b264b
		"--color-surface-600": "39 34 68", // #272244
		"--color-surface-700": "32 29 56", // #201d38
		"--color-surface-800": "26 23 45", // #1a172d
		"--color-surface-900": "21 19 37", // #151325
	}
}