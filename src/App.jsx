import { ChakraProvider } from '@chakra-ui/react'
import Admin from './Admin'
import './App.css'

function App() {

  return (
        <ChakraProvider>
            <Admin />
        </ChakraProvider>
    )
}

export default App
