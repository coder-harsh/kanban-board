import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from "@material-tailwind/react";
import { ChakraProvider } from '@chakra-ui/react'
import { TasksProvider } from "./Context/TasksContext.jsx"
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <ChakraProvider>
        <TasksProvider>
          <App />
        </TasksProvider>
      </ChakraProvider>
    </ThemeProvider>
  </StrictMode>,
)
