import  ReactDOM  from 'react-dom/client';
import App from '@components/App.jsx'
import './assets/styles/index.scss'
import { VolumeProvider } from './context/VolumeContext';
import { SectionProvider } from './context/SectionContext';
import { SelectionProvider } from './context/SelectionContext';
import { DeviceProvider } from './context/DeviceContext';
import { OptionsProvider } from './context/OptionsContext';

const container = document.getElementById('root')
const root = ReactDOM.createRoot(container)

root.render(

    <DeviceProvider>
        <VolumeProvider>
            <SectionProvider>
                <SelectionProvider>
                    <OptionsProvider>
                        <App />
                    </OptionsProvider>
                </SelectionProvider>
            </SectionProvider>
        </VolumeProvider>
    </DeviceProvider>
)