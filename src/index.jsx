import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactDOM from 'react-dom';
import Asp from "./components/Asp";
import './index.css';

ReactDOM.render(<App />, document.getElementById('root'));

function App() {
  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container">
          {/*  ئەم بەشە ناڤ باڕ و تووڵەکەی سەرەوەی تیایە دەس بنێی
                     بە هەر کامێکیانا لە کۆتاییا ئەو بەشەت بۆ ئەکرێتەوە */}
          {/* Toggle button */}
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          {/* Toggle button */}

          <div class="collapse navbar-collapse justify-content-center" id="navbarNav">
            <ul class="navbar-nav ">
              <li class="nav-item">
                <a class="nav-link" href="asp">ASP</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="php">PHP</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="python">PYTHON</a>
              </li>
            </ul>
          </div>

        </div>
      </nav>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<h1>Main</h1>} />
          <Route exact path="/asp" element={<Asp />} />
          <Route exact path="/php" element={<h1>PHP</h1>} />
          <Route exact path="/python" element={<h1>Python</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}