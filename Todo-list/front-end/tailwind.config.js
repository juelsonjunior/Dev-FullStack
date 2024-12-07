/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'searchImg': "url('/bgSearchTask.svg')",
        'importantImg': "url('/bgTaskImprtant.svg')",
        'doneImg': "url('/bgTaskDone.svg')",
        'homeImg': "url('/bgListTasks.svg')"
      }
    },
  },
  plugins: [],
}