import { createRoot } from 'react-dom/client';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Services from './components/Services/Services';
import Projects from './components/Projects/Projects';
import Contact from './components/Contact/Contact';
createRoot(document.getElementById('root')!).render(<><Hero /><About /><Services /><Projects /><Contact /></>);
