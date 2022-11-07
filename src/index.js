import  ReactDOM  from 'react-dom/client';
import App from '@components/App.jsx'
import './assets/styles/index.scss'
import { VolumeProvider } from './context/VolumeContext';
import { SectionProvider } from './context/SectionContext';

const container = document.getElementById('root')
const root = ReactDOM.createRoot(container)

root.render(
    <VolumeProvider>
        <SectionProvider>
            <App />
        </SectionProvider>
    </VolumeProvider>
)