import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { Toaster } from 'react-hot-toast'; // Import Toaster from react-hot-toast

function App() {
    return (
        <Router>
            <Toaster />
            <Routes>
                <Route path="/" element={<HomePage/>} />
            </Routes>
        </Router>
    );
}

export default App;
