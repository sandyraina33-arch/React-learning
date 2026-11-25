# TaskFlow — React Task Manager

A medium-level React project for practising frontend fundamentals and preparing for entry-level frontend interviews.

## Features
- Dashboard summary cards (total, to do, in progress, completed)
- Create, edit, delete and update tasks
- Search by title, description or category
- Filter by status and priority
- Form validation and reusable components
- Persistent browser storage with `localStorage`
- Responsive layout for desktop, tablet and mobile
- Accessible labels, dialog semantics and button names

## Run locally
1. Install Node.js (LTS).
2. Extract the project ZIP and open this folder in VS Code.
3. Open a terminal in this folder and run:

   ```bash
   npm install
   npm run dev
   ```

4. Open the local URL printed by Vite (usually `http://localhost:5173`).

## Build for production
```bash
npm run build
npm run preview
```

## Project structure
```text
src/
  components/
    EmptyState.jsx
    StatCard.jsx
    TaskCard.jsx
    TaskForm.jsx
  data/
    initialTasks.js
  hooks/
    useTasks.js
  App.jsx
  main.jsx
  styles.css
```

## Suggested interview topics
Be ready to explain component composition, props, state, controlled forms, event handling, list keys, conditional rendering, `useEffect`, `useMemo`, custom hooks, `localStorage`, responsive CSS and accessibility.

## Stretch goals
- Add sorting by due date and priority.
- Add a task details page using React Router.
- Add unit tests with Vitest and React Testing Library.
- Replace localStorage with a REST API and loading/error states.
- Add dark mode and pagination.
